require("angular");
var FactoryBuilder_1 = require("./FactoryBuilder");
var AngularModuleWrapper = (function () {
    function AngularModuleWrapper(mod) {
        this.mod = mod;
    }
    AngularModuleWrapper.prototype.bindFactory = function (name, object) {
        this.mod.service(name, registerFn);
        registerFn.$inject = ["$injector"];
        function registerFn($injector) {
            return new FactoryBuilder_1.FactoryBuilder($injector).build(object);
        }
    };
    return AngularModuleWrapper;
})();
exports.AngularModuleWrapper = AngularModuleWrapper;
//# sourceMappingURL=AngularModuleWrapper.js.map