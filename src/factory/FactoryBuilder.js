var _ = require("lodash");
var Factory_1 = require("./Factory");
var FactoryBuilder = (function () {
    function FactoryBuilder($injector) {
        this.$injector = $injector;
    }
    FactoryBuilder.prototype.build = function (ctor) {
        var _this = this;
        var dependencies = [];
        _.forEach(ctor.$inject, function (dependency) {
            dependencies.push(_this.$injector.get(dependency));
        });
        return new Factory_1.Factory(ctor, dependencies);
    };
    FactoryBuilder.$inject = ["$injector"];
    return FactoryBuilder;
})();
exports.FactoryBuilder = FactoryBuilder;
//# sourceMappingURL=FactoryBuilder.js.map