import * as _ from "lodash";
import {IBindable} from "./Bindable";
import {Bindable} from "./Bindable";
import {Binding} from "./Binding";
import {BindingType} from "./BindingType";

export class Kernel {
    public bindings: Array<Binding<any>>;

    constructor() {
        this.bindings = new Array<Binding<any>>();
    }

    public bind<T>(iocVal: string): IBindable {
        return new Bindable(iocVal, this);
    }

    public retrieve<T>(key: string): T {
        var found: Binding<T> = this.fetchBinding<T>(key);
        var instanceToReturn: T;
        switch (found.bindingType) {
            case BindingType.singleton:
                if (found.singleTonInstance === undefined) {
                    found.singleTonInstance = this.createInstance<T>(found);
                }
                instanceToReturn = found.singleTonInstance;
                break;
            case BindingType.newInstance:
                instanceToReturn = this.createInstance<T>(found);
                break;
            default:
        }
        return instanceToReturn;
    }

    private fetchBinding<T>(key: string): Binding<T> {
        var found: Binding<T> = _.find(this.bindings, (binding: Binding<T>) => {
            return binding.key === key;
        });
        if (found === undefined) {
            throw Error("Module has no binding registered with the key<" + key + ">");
        }
        return found;
    }

    private createInstance<T>(binding: Binding<T>): T {
        if (binding.val.$inject !== undefined && binding.val.$inject !== null) {
            var dependencies: Array<string> = binding.val.$inject;
            var args: Array<any> = new Array<any>();
            _.forEach(dependencies, (dependency: string) => {
                args.push(this.createInstance(this.fetchBinding<any>(dependency)));
            });
        }

        return this.construct(binding.val, args);
    }

    private construct(constructor: any, args: any): any {
        function F(): void {
            constructor.apply(this, args);
        }

        F.prototype = constructor.prototype;
        return new F();
    }

}

