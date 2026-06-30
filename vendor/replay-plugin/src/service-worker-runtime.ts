import { resolveActiveStripDecisions } from './strip-runtime.ts';
import type { ReplayServiceWorker, ReplayStripDecision } from './types.ts';

type ServiceWorkerPolicyOptions = {
    serviceWorkers: ReplayServiceWorker[];
    stripDecisions: ReplayStripDecision[];
};

const toWorkerRequestKey = (value: string, pageHref: string) => {
    const workerUrl = new URL(value, pageHref);
    return `${workerUrl.pathname}${workerUrl.search}`;
};

const buildNeutralizedRegistration = (worker: ReplayServiceWorker | null, requestedScope: string | undefined) => {
    return {
        __shibukNeutralized: true,
        active: {
            postMessage() {},
            scriptURL: worker?.scriptUrl ?? '',
            state: 'activated',
        },
        addEventListener() {},
        getNotifications: async () => [],
        installing: null,
        navigationPreload: undefined,
        onupdatefound: null,
        periodicSync: {
            register: async () => undefined,
        },
        pushManager: {
            getSubscription: async () => null,
            permissionState: async () => 'denied',
            subscribe: async () => {
                throw new DOMException('Service worker registration has been disabled.', 'NotAllowedError');
            },
        },
        removeEventListener() {},
        scope: requestedScope || worker?.scope || window.location.origin,
        showNotification: async () => undefined,
        sync: {
            register: async () => undefined,
        },
        unregister: async () => true,
        update: async () => undefined,
        updateViaCache: 'none',
        waiting: null,
    } as unknown as ServiceWorkerRegistration;
};

const resolveWorkerByPath = (serviceWorkers: ReplayServiceWorker[], value: string, pageHref: string) => {
    try {
        const requestKey = toWorkerRequestKey(value, pageHref);
        return (
            serviceWorkers.find((worker) => {
                return toWorkerRequestKey(worker.scriptUrl, pageHref) === requestKey;
            }) ?? null
        );
    } catch {
        return null;
    }
};

const resolveDecisionForWorker = ({
    pageHref,
    serviceWorkerDecisions,
    worker,
}: {
    pageHref: string;
    serviceWorkerDecisions: ReplayStripDecision[];
    worker: ReplayServiceWorker;
}) => {
    return (
        serviceWorkerDecisions.find((decision) => {
            if (decision.target.value === worker.scriptUrl) {
                return true;
            }

            try {
                return (
                    toWorkerRequestKey(decision.target.value, pageHref) ===
                    toWorkerRequestKey(worker.scriptUrl, pageHref)
                );
            } catch {
                return false;
            }
        }) ?? null
    );
};

const tryAssignMethod = (
    target: Record<string, unknown> | null,
    name: 'getRegistration' | 'getRegistrations' | 'register',
    value: unknown,
) => {
    if (!target) {
        return false;
    }

    try {
        target[name] = value as unknown;
        return target[name] === value;
    } catch {
        return false;
    }
};

const tryDefineMethod = (
    target: Record<string, unknown> | null,
    name: 'getRegistration' | 'getRegistrations' | 'register',
    value: unknown,
) => {
    if (!target) {
        return false;
    }

    try {
        Object.defineProperty(target, name, {
            configurable: true,
            value: value as unknown,
            writable: true,
        });
        return true;
    } catch {
        return false;
    }
};

export const installServiceWorkerPolicy = ({ serviceWorkers, stripDecisions }: ServiceWorkerPolicyOptions) => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.serviceWorker) {
        return;
    }

    const serviceWorkerDecisions = resolveActiveStripDecisions(stripDecisions).filter(
        (decision) => decision.category === 'service-worker',
    );
    if (serviceWorkerDecisions.length === 0) {
        return;
    }

    const pageHref = window.location.href;
    const serviceWorkerContainer = navigator.serviceWorker;
    const serviceWorkerPrototype = Object.getPrototypeOf(serviceWorkerContainer) as Record<string, unknown> | null;
    const originalRegister =
        typeof serviceWorkerContainer.register === 'function'
            ? serviceWorkerContainer.register.bind(serviceWorkerContainer)
            : null;
    const originalGetRegistration =
        typeof serviceWorkerContainer.getRegistration === 'function'
            ? serviceWorkerContainer.getRegistration.bind(serviceWorkerContainer)
            : null;
    const originalGetRegistrations =
        typeof serviceWorkerContainer.getRegistrations === 'function'
            ? serviceWorkerContainer.getRegistrations.bind(serviceWorkerContainer)
            : null;
    const neutralizeOnly = serviceWorkerDecisions.every((decision) => decision.action === 'neutralise');
    const replaceMethod = (name: 'getRegistration' | 'getRegistrations' | 'register', value: unknown) => {
        const targets = [serviceWorkerContainer as unknown as Record<string, unknown>, serviceWorkerPrototype] as const;

        for (const target of targets) {
            if (tryAssignMethod(target, name, value) || tryDefineMethod(target, name, value)) {
                return;
            }
        }
    };
    const replaceReady = (value: unknown) => {
        try {
            Object.defineProperty(serviceWorkerContainer, 'ready', {
                configurable: true,
                enumerable: false,
                get() {
                    return value;
                },
            });
            return;
        } catch {}

        try {
            if (serviceWorkerPrototype) {
                Object.defineProperty(serviceWorkerPrototype, 'ready', {
                    configurable: true,
                    enumerable: false,
                    get() {
                        return value;
                    },
                });
            }
        } catch {}
    };

    replaceMethod('register', async (scriptURL: string | URL, options: RegistrationOptions = {}) => {
        const worker = resolveWorkerByPath(serviceWorkers, String(scriptURL ?? ''), pageHref);
        if (!worker || !originalRegister) {
            return originalRegister
                ? await originalRegister(scriptURL, options)
                : buildNeutralizedRegistration(null, options.scope);
        }

        const decision = resolveDecisionForWorker({
            pageHref,
            serviceWorkerDecisions,
            worker,
        });
        if (!decision || decision.action === 'preserve') {
            return await originalRegister(scriptURL, options);
        }

        if (decision.action === 'replay-script') {
            const workerUrl = new URL(worker.scriptUrl);
            return await originalRegister(workerUrl.pathname + workerUrl.search, {
                ...options,
                scope: options.scope || worker.scope,
            });
        }

        console.warn('[shibuk-replay] serviceWorker.register neutralised:', worker.scriptUrl);
        return buildNeutralizedRegistration(worker, options.scope);
    });

    if (neutralizeOnly) {
        replaceMethod('getRegistration', async (value?: string | URL) => {
            if (value && originalGetRegistration) {
                return await originalGetRegistration(value);
            }
            return undefined;
        });
        replaceMethod('getRegistrations', async () => []);
        replaceReady(
            Promise.resolve(buildNeutralizedRegistration(serviceWorkers[0] ?? null, serviceWorkers[0]?.scope)),
        );
        return;
    }

    if (originalGetRegistrations) {
        replaceMethod('getRegistrations', originalGetRegistrations);
    }
};
