import "angular";
import {FactoryBuilder} from "./FactoryBuilder";
import {Factory} from "./Factory";
export class AngularModuleWrapper {
    constructor(private mod: ng.IModule) {
    }

    public bindFactory<T>(name: string, object: any): void {
        this.mod.service(name, registerFn);

        registerFn.$inject = ["$injector"];
        function registerFn($injector: any): Factory<T> {
            return new FactoryBuilder($injector).build<T>(object);
        }
    }

    public bindService<T>(name: string, object: any): void {
        this.mod.service(name, object);
    }

    public bindComponent(name: string, object: any): void {
        this.mod.directive(() => new object());
    }
}