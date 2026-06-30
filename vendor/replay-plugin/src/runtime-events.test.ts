import { describe, expect, it } from 'bun:test';

import { createReplayRuntimeEventSink } from './runtime-events.ts';

describe('createReplayRuntimeEventSink', () => {
    it('should reject when the workspace is not initialized', async () => {
        await expect(
            createReplayRuntimeEventSink({
                emitterVersion: '0.0.0-test',
                source: 'shibuk-replay',
                workspaceRoot: '/tmp/shibuk-missing-workspace',
            }),
        ).rejects.toThrow('Workspace is not initialized: missing /tmp/shibuk-missing-workspace/.lab/lab.json.');
    });
});
