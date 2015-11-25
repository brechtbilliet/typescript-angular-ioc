import * as _ from "lodash";
import { Bindable } from "./Bindable";
import { BindingType } from "./BindingType";
export class Kernel {
    constructor() {
        this.bindings = new Array();
    }
    bind(iocVal) {
        return new Bindable(iocVal, this);
    }
    retrieve(key) {
        var found = this.fetchBinding(key);
        var instanceToReturn;
        switch (found.bindingType) {
            case BindingType.singleton:
                if (found.singleTonInstance === undefined) {
                    found.singleTonInstance = this.createInstance(found);
                }
                instanceToReturn = found.singleTonInstance;
                break;
            case BindingType.newInstance:
                instanceToReturn = this.createInstance(found);
                break;
            default:
        }
        return instanceToReturn;
    }
    fetchBinding(key) {
        var found = _.find(this.bindings, (binding) => {
            return binding.key === key;
        });
        if (found === undefined) {
            throw Error("Module has no binding registered with the key<" + key + ">");
        }
        return found;
    }
    createInstance(binding) {
        if (binding.val.$inject !== undefined && binding.val.$inject !== null) {
            var dependencies = binding.val.$inject;
            var args = new Array();
            _.forEach(dependencies, (dependency) => {
                args.push(this.createInstance(this.fetchBinding(dependency)));
            });
        }
        return this.construct(binding.val, args);
    }
    construct(constructor, args) {
        function F() {
            constructor.apply(this, args);
        }
        F.prototype = constructor.prototype;
        return new F();
    }
}
