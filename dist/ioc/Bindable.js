import { Binding } from "./Binding";
import { BindingType } from "./BindingType";
export class Bindable {
    constructor(iocVal, module) {
        this.iocVal = iocVal;
        this.module = module;
    }
    toSingleton(ctor) {
        this.module.bindings.push(new Binding(this.iocVal, ctor, BindingType.singleton));
        return this.module;
    }
    toNewInstance(ctor) {
        this.module.bindings.push(new Binding(this.iocVal, ctor, BindingType.newInstance));
        return this.module;
    }
    toFactory(ctor) {
        this.module.bindings.push(new Binding(this.iocVal, ctor, BindingType.factory));
        return this.module;
    }
}
