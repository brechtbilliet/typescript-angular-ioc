declare module 'typescript-angular-ioc/ioc/BindingType' {
	export enum BindingType {
	    singleton = 0,
	    newInstance = 1,
	    factory = 2,
	}

}
declare module 'typescript-angular-ioc/ioc/Binding' {
	import { BindingType } from 'typescript-angular-ioc/ioc/BindingType';
	export class Binding<T> {
	    key: string;
	    val: any;
	    bindingType: BindingType;
	    singleTonInstance: T;
	    constructor(key: string, val: any, bindingType: BindingType);
	}

}
declare module 'typescript-angular-ioc/ioc/Kernel' {
	import { IBindable } from 'typescript-angular-ioc/ioc/Bindable';
	import { Binding } from 'typescript-angular-ioc/ioc/Binding';
	export class Kernel {
	    bindings: Array<Binding<any>>;
	    constructor();
	    bind<T>(iocVal: string): IBindable;
	    retrieve<T>(key: string): T;
	    private fetchBinding<T>(key);
	    private createInstance<T>(binding);
	    private construct(constructor, args);
	}

}
declare module 'typescript-angular-ioc/ioc/Bindable' {
	import { Kernel } from 'typescript-angular-ioc/ioc/Kernel';
	export interface IBindable {
	    toSingleton<T>(ctor: any): Kernel;
	    toNewInstance<T>(ctor: any): Kernel;
	    toFactory<T>(ctor: any): Kernel;
	}
	export class Bindable implements IBindable {
	    private iocVal;
	    private module;
	    constructor(iocVal: string, module: Kernel);
	    toSingleton<T>(ctor: any): Kernel;
	    toNewInstance<T>(ctor: any): Kernel;
	    toFactory<T>(ctor: any): Kernel;
	}

}
declare module 'typescript-angular-ioc/ioc/Factory' {
	export class FactoryBuilder {
	    private $injector;
	    static $inject: Array<string>;
	    constructor($injector: any);
	    build<T>(ctor: any): Factory<T>;
	}
	export class Factory<T> {
	    private ctor;
	    private dependencies;
	    constructor(ctor: any, dependencies: Array<any>);
	    create(): T;
	}

}
declare module 'typescript-angular-ioc/ioc/Inject' {
	export function inject(dependencies: Array<string>): any;

}
declare module 'typescript-angular-ioc/index' {
	export * from 'typescript-angular-ioc/ioc/Bindable';
	export * from 'typescript-angular-ioc/ioc/Binding';
	export * from 'typescript-angular-ioc/ioc/BindingType';
	export * from 'typescript-angular-ioc/ioc/Factory';
	export * from 'typescript-angular-ioc/ioc/Inject';
	export * from 'typescript-angular-ioc/ioc/Kernel';

}
declare module 'typescript-angular-ioc' {
	import main = require('index');
	export = main;
}
