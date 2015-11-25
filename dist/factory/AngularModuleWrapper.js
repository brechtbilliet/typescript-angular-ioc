import { FactoryBuilder } from "./FactoryBuilder";
export class AngularModuleWrapper {
    constructor(mod) {
        this.mod = mod;
    }
    bindFactory(name, object) {
        this.mod.service(name, registerFn);
        registerFn.$inject = ["$injector"];
        function registerFn($injector) {
            return new FactoryBuilder($injector).build(object);
        }
    }
    bindService(name, object) {
        this.mod.service(name, object);
    }
}
