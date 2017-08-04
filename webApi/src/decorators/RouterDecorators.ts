import * as express from 'express';

interface Router {
    RootPath: string | RegExp | (string | RegExp)[]
}
export function Router(config: Router) {
    return function classDecorator<T extends { new (...args: any[]): {} }>(constructorClass: T) {
        class classRouter extends constructorClass {
            App: express.Router
            constructor(...args: any[]) {
                super(...args);
                console.log("装饰器运行，", this.App);
                this.__RootRouterInit(constructorClass);
            }
            /**
             * 处理 当前 类 所有的 方法
             * @param RootRouter 
             */
            private __RootRouterInit(RootRouter: any) {
                console.log("RootRouter", Object.getOwnPropertyNames(RootRouter));
                for (var key in RootRouter.prototype) {
                    // if (RootRouter.hasOwnProperty(key)) {
                    var ele = RootRouter.prototype[key];
                    console.log("装饰器运行---", key, ele.Type);
                    // }
                }
            }
            static RootRouter = {
                RootPath: config.RootPath
            }
        }
        return classRouter;
    }
}
interface RouterMatcher {
}
export function RouterMatcher(config: RouterMatcher) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("这是装饰器", descriptor);
    };
}
export function Get(config?: RouterMatcher) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value.Type="Get"
        console.log("这是装饰器Get", target, propertyKey, descriptor);
        
    };
}