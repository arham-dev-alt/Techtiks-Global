/**
 * Replay-plugin runtime-event sink.
 *
 * Appends shape-stub-hit / shape-stub-miss / served-strip-stub events as JSON
 * lines under `<workspaceRoot>/.lab/shibuk/replay-events.jsonl`. Events are
 * batched within a short window and flattened by `(eventType, level, message,
 * source, target, stripDecisionId)` to avoid spamming the log on hot stubs.
 *
 * The replay plugin is shibuk-side runtime telemetry. It does not depend on any
 * orchestrator-side ledger SDK; downstream orchestrators (ushman) import the
 * replay log during their own intake step.
 */

import { appendFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

export type ReplayRuntimeEvent = {
    eventType: 'served-strip-stub' | 'shape-stub-hit' | 'shape-stub-miss';
    level: 'error' | 'info' | 'warn';
    message: string;
    stripDecisionId?: string;
    target: string;
};

export type ReplayRuntimeEventSink = {
    close: () => Promise<void>;
    record: (event: ReplayRuntimeEvent) => void;
};

type PendingReplayRuntimeEvent = {
    count: number;
    event: ReplayRuntimeEvent;
    timer: ReturnType<typeof setTimeout>;
};

const DEFAULT_FLUSH_DELAY_MS = 1_000;

const warnFlushFailure = (error: unknown, context: 'close' | 'timer' = 'timer') => {
    const suffix = context === 'close' ? ' during close' : '';
    console.warn(`[shibuk-replay] runtime-event flush failed${suffix}:`, error);
};

const buildEventKey = (event: ReplayRuntimeEvent, source: string) => {
    return JSON.stringify({
        eventType: event.eventType,
        level: event.level,
        message: event.message,
        source,
        stripDecisionId: event.stripDecisionId ?? null,
        target: event.target,
    });
};

const replayLogFile = (workspaceRoot: string) => path.join(workspaceRoot, '.lab', 'shibuk', 'replay-events.jsonl');

const serializeEvent = ({
    count,
    emitterTool,
    emitterVersion,
    event,
    source,
}: {
    count: number;
    emitterTool: string;
    emitterVersion: string;
    event: ReplayRuntimeEvent;
    source: string;
}) => {
    const record = {
        details: {
            count,
            eventType: event.eventType,
            target: event.target,
        },
        emitter: { tool: emitterTool, version: emitterVersion },
        kind: 'runtime-event' as const,
        level: event.level,
        message: event.message,
        phase: 'replay' as const,
        schemaVersion: 'shibuk-replay-log/v1' as const,
        source,
        ...(event.stripDecisionId ? { stripDecisionId: event.stripDecisionId } : {}),
        summary: event.message,
        ts: new Date().toISOString(),
    };
    return `${JSON.stringify(record)}\n`;
};

const ensureWorkspaceInitialized = async (workspaceRoot: string) => {
    const labManifestPath = path.join(workspaceRoot, '.lab', 'lab.json');
    try {
        await stat(labManifestPath);
    } catch {
        throw new Error(`Workspace is not initialized: missing ${labManifestPath}.`);
    }
};

export const createReplayRuntimeEventSink = async ({
    emitterTool = 'shibuk-replay-plugin',
    emitterVersion,
    flushDelayMs = DEFAULT_FLUSH_DELAY_MS,
    source,
    workspaceRoot,
}: {
    emitterTool?: string;
    emitterVersion: string;
    flushDelayMs?: number;
    source: string;
    workspaceRoot: string;
}): Promise<ReplayRuntimeEventSink> => {
    await ensureWorkspaceInitialized(workspaceRoot);

    const logPath = replayLogFile(workspaceRoot);
    await mkdir(path.dirname(logPath), { recursive: true });

    const pendingEvents = new Map<string, PendingReplayRuntimeEvent>();
    const flushingKeys = new Set<string>();
    let closed = false;

    const flushKey = async (key: string) => {
        if (flushingKeys.has(key)) {
            return;
        }
        const pendingEvent = pendingEvents.get(key);
        if (!pendingEvent) {
            return;
        }
        flushingKeys.add(key);
        pendingEvents.delete(key);
        clearTimeout(pendingEvent.timer);
        try {
            const line = serializeEvent({
                count: pendingEvent.count,
                emitterTool,
                emitterVersion,
                event: pendingEvent.event,
                source,
            });
            await appendFile(logPath, line, { encoding: 'utf8' });
        } finally {
            flushingKeys.delete(key);
        }
    };

    return {
        close: async () => {
            closed = true;
            const results = await Promise.allSettled(
                Array.from(pendingEvents.keys()).map(async (key) => flushKey(key)),
            );
            for (const result of results) {
                if (result.status === 'rejected') {
                    warnFlushFailure(result.reason, 'close');
                }
            }
        },
        record: (event) => {
            if (closed) {
                return;
            }
            const key = buildEventKey(event, source);
            const existing = pendingEvents.get(key);
            if (existing) {
                existing.count += 1;
                return;
            }
            const timer = setTimeout(() => {
                void flushKey(key).catch((error) => {
                    warnFlushFailure(error);
                });
            }, flushDelayMs);
            timer.unref?.();
            pendingEvents.set(key, {
                count: 1,
                event,
                timer,
            });
        },
    };
};
