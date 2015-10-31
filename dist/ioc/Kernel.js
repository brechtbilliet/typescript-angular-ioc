var _ = require("lodash");
var Bindable_1 = require("./Bindable");
var BindingType_1 = require("./BindingType");
var Kernel = (function () {
    function Kernel() {
        this.bindings = new Array();
    }
    Kernel.prototype.bind = function (iocVal) {
        return new Bindable_1.Bindable(iocVal, this);
    };
    Kernel.prototype.retrieve = function (key) {
        var found = this.fetchBinding(key);
        var instanceToReturn;
        switch (found.bindingType) {
            case BindingType_1.BindingType.singleton:
                if (found.singleTonInstance === undefined) {
                    found.singleTonInstance = this.createInstance(found);
                }
                instanceToReturn = found.singleTonInstance;
                break;
            case BindingType_1.BindingType.newInstance:
                instanceToReturn = this.createInstance(found);
                break;
            default:
        }
        return instanceToReturn;
    };
    Kernel.prototype.fetchBinding = function (key) {
        var found = _.find(this.bindings, function (binding) {
            return binding.key === key;
        });
        if (found === undefined) {
            throw Error("Module has no binding registered with the key<" + key + ">");
        }
        return found;
    };
    Kernel.prototype.createInstance = function (binding) {
        var _this = this;
        if (binding.val.$inject !== undefined && binding.val.$inject !== null) {
            var dependencies = binding.val.$inject;
            var args = new Array();
            _.forEach(dependencies, function (dependency) {
                args.push(_this.createInstance(_this.fetchBinding(dependency)));
            });
        }
        return this.construct(binding.val, args);
    };
    Kernel.prototype.construct = function (constructor, args) {
        function F() {
            constructor.apply(this, args);
        }
        F.prototype = constructor.prototype;
        return new F();
    };
    return Kernel;
})();
exports.Kernel = Kernel;
