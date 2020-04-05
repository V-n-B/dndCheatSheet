import { getGlobal } from './globalTypedKnex';

export function withTypedKnex<T extends { new(...args: any[]): {} }>(oldConstructor: T) {
    return class extends oldConstructor {
        protected readonly typedKnex = getGlobal();
    };
}
