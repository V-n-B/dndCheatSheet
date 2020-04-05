import { Container, injectable as inversifyInjectable, interfaces } from 'inversify';


export const container = new Container({
    skipBaseClassChecks: true,
});

export enum BindingScope {
    Request, Singleton,
}

export function injectable(scope?: BindingScope) {
    return <T>(target: interfaces.Newable<T>) => {

        switch (scope) {
            case BindingScope.Request:
                container.bind(target).toSelf().inRequestScope();
                break;
            case BindingScope.Singleton:
                container.bind(target).toSelf().inSingletonScope();
                break;
            default:
                container.bind(target).toSelf().inTransientScope();
        }

        inversifyInjectable()(target);
    };
}
