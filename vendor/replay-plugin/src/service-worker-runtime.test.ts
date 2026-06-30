import { describe, expect, it, mock } from 'bun:test';
import { installServiceWorkerPolicy } from './service-worker-runtime.ts';
import type { ReplayServiceWorker, ReplayStripDecision } from './types.ts';

type GlobalKey = 'navigator' | 'window';
type ServiceWorkerStub = {
    getRegistration: (...args: unknown[]) => Promise<unknown>;
    getRegistrations: (...args: unknown[]) => Promise<unknown[]>;
    ready?: Promise<unknown>;
    register: (scriptURL?: unknown, options?: RegistrationOptions) => Promise<unknown>;
};

const replaceGlobal = <T>(key: GlobalKey, value: T) => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, {
        configurable: true,
        value,
        writable: true,
    });

    return () => {
        if (descriptor) {
            Object.defineProperty(globalThis, key, descriptor);
            return;
        }

        Reflect.deleteProperty(globalThis, key);
    };
};

const createWorker = (): ReplayServiceWorker => ({
    capturedScript: 'self.addEventListener("fetch", () => {});',
    detectionEvidence: [],
    purpose: 'asset-cache',
    registeredFrom: ['https://fixture.example.test/assets/app.js'],
    scope: '/app/',
    scriptUrl: 'https://fixture.example.test/sw.js?v=2',
});

const createDecision = (action: ReplayStripDecision['action']): ReplayStripDecision => ({
    action,
    category: 'service-worker',
    id: `sw-${action}`,
    rationale: action,
    supersedes: null,
    target: {
        kind: 'service-worker',
        value: 'https://fixture.example.test/sw.js?v=2',
    },
    tier: 'deterministic',
});

describe('installServiceWorkerPolicy', () => {
    it('should neutralise matching registrations without calling the native register method', async () => {
        const originalRegister = mock(async () => ({ native: true }));
        const serviceWorker: ServiceWorkerStub = {
            getRegistration: async () => 'original-registration',
            getRegistrations: async () => ['original-list'],
            register: originalRegister,
        };
        const restoreWindow = replaceGlobal('window', {
            location: {
                href: 'https://fixture.example.test/app/index.html',
                origin: 'https://fixture.example.test',
            },
        });
        const restoreNavigator = replaceGlobal('navigator', { serviceWorker });

        try {
            installServiceWorkerPolicy({
                serviceWorkers: [createWorker()],
                stripDecisions: [createDecision('neutralise')],
            });

            const registration = (await serviceWorker.register('/sw.js?v=2', {
                scope: '/custom/',
            })) as {
                __shibukNeutralized: boolean;
                scope: string;
            };

            expect(originalRegister).not.toHaveBeenCalled();
            expect(registration.__shibukNeutralized).toBeTrue();
            expect(registration.scope).toBe('/custom/');
            expect(await serviceWorker.getRegistrations()).toEqual([]);
        } finally {
            restoreNavigator();
            restoreWindow();
        }
    });

    it('should preserve the native register path for replay-script decisions', async () => {
        const originalRegister = mock(async (scriptURL?: unknown, options?: RegistrationOptions) => ({
            options,
            scriptURL,
        }));
        const serviceWorker: ServiceWorkerStub = {
            getRegistration: async () => undefined,
            getRegistrations: async () => [],
            register: originalRegister,
        };
        const restoreWindow = replaceGlobal('window', {
            location: {
                href: 'https://fixture.example.test/app/index.html',
                origin: 'https://fixture.example.test',
            },
        });
        const restoreNavigator = replaceGlobal('navigator', { serviceWorker });

        try {
            installServiceWorkerPolicy({
                serviceWorkers: [createWorker()],
                stripDecisions: [createDecision('replay-script')],
            });

            await serviceWorker.register('https://fixture.example.test/sw.js?v=2');

            expect(originalRegister).toHaveBeenCalledWith('/sw.js?v=2', {
                scope: '/app/',
            });
        } finally {
            restoreNavigator();
            restoreWindow();
        }
    });
});
