var Binding_1 = require("./Binding");
var BindingType_1 = require("./BindingType");
var Bindable = (function () {
    function Bindable(iocVal, module) {
        this.iocVal = iocVal;
        this.module = module;
    }
    Bindable.prototype.toSingleton = function (ctor) {
        this.module.bindings.push(new Binding_1.Binding(this.iocVal, ctor, BindingType_1.BindingType.singleton));
        return this.module;
    };
    Bindable.prototype.toNewInstance = function (ctor) {
        this.module.bindings.push(new Binding_1.Binding(this.iocVal, ctor, BindingType_1.BindingType.newInstance));
        return this.module;
    };
    Bindable.prototype.toFactory = function (ctor) {
        this.module.bindings.push(new Binding_1.Binding(this.iocVal, ctor, BindingType_1.BindingType.factory));
        return this.module;
    };
    return Bindable;
})();
exports.Bindable = Bindable;
