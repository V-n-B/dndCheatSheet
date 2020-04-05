import { Container, injectable as inversifyInjectable, interfaces } from 'inversify';


export const container = new Container({
    skipBaseClassChecks: true,
});

/**
 * Binding Scopes:
 * - default: Every class that has a dependency to this class will receive a new instance. Instances will never be injected multiple times.
 *            Very safe when the instance has local state. Use Default unless you have a specific reason and are positive this is secure.
 * - None: No binding will be created. The class can only be injected into others when an explicit binding is created somewhere else,
 *         (for example in the Mediatsr if we need that). Use this when the DI should never create an instance of the class by itself.
 * - Singleton: A single instance is created and is injected into all classes haveing a depencendy to this class. This results in a global
 *              singelton, so different users doing different http request will all use the same instance.
 */

export enum BindingScope {
    None, Singleton,
}

export function injectable(scope?: BindingScope) {
    return <T>(target: interfaces.Newable<T>) => {
        switch (scope) {
            case BindingScope.Singleton:
                container.bind(target).toSelf().inSingletonScope();
                break;
            default:
                container.bind(target).toSelf().inTransientScope();
        }

        inversifyInjectable()(target);
    };
}
