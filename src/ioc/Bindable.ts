import {Kernel} from "./Kernel";
import {Binding} from "./Binding";
import {BindingType} from "./BindingType";
export interface IBindable {
    toSingleton<T>(ctor: any): Kernel;
    toNewInstance<T>(ctor: any): Kernel;
    toFactory<T>(ctor: any): Kernel;
}
export class Bindable implements IBindable {
    constructor(private iocVal: string, private module: Kernel) {

    }

    public toSingleton<T>(ctor: any): Kernel {
        this.module.bindings.push(new Binding(this.iocVal, ctor, BindingType.singleton));
        return this.module;
    }

    public toNewInstance<T>(ctor: any): Kernel {
        this.module.bindings.push(new Binding(this.iocVal, ctor, BindingType.newInstance));
        return this.module;
    }

    public toFactory<T>(ctor: any): Kernel {
        this.module.bindings.push(new Binding(this.iocVal, ctor, BindingType.factory));
        return this.module;
    }
}