var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
require("angular");
require("angular-mocks");
var AngularModuleWrapper_1 = require("../AngularModuleWrapper");
var Inject_1 = require("../../ioc/Inject");
var CarService = (function () {
    function CarService($http, foo) {
        if (foo === void 0) { foo = "selffilled"; }
        this.$http = $http;
        this.foo = foo;
    }
    CarService.prototype.drive = function (speed) {
    };
    CarService.prototype.stop = function () {
    };
    CarService = __decorate([
        Inject_1.inject(['$http'])
    ], CarService);
    return CarService;
})();
describe("on factory", function () {
    var bootstrap;
    var getInjectedFactory;
    beforeEach(function () {
        var mod = angular.module("app", []);
        var ngModuleWrapper = new AngularModuleWrapper_1.AngularModuleWrapper(mod);
        ngModuleWrapper.bindFactory("CarServiceFactory", CarService);
        bootstrap = function () {
            angular.bootstrap(angular.copy(document), ["app"], {
                strictDi: true
            });
        };
        getInjectedFactory = function (cb) {
            angular.module("app").run(startFunc);
            startFunc.$inject = ["CarServiceFactory"];
            var returnObj;
            function startFunc(carServiceFactory) {
                cb(carServiceFactory);
            }
        };
    });
    describe("on inject", function () {
        it("should get the correct instance", function () {
            getInjectedFactory(function (carServiceFactory) {
                var carService = carServiceFactory.create();
                expect(carService.constructor.name).toBe("CarService");
            });
            bootstrap();
        });
        it("should have injected the properties that are decorated", function () {
            getInjectedFactory(function (carServiceFactory) {
                var carService = carServiceFactory.create();
                expect(carService["$http"].prototype.constructor.name).toBe("$http");
                expect(carService.foo).toBe("selffilled");
            });
            bootstrap();
        });
        it("should have merged the injected properties and the passed properties", function () {
            getInjectedFactory(function (carServiceFactory) {
                var carService = carServiceFactory.create(["bar"]);
                expect(carService["$http"].prototype.constructor.name).toBe("$http");
                expect(carService.foo).toBe("bar");
            });
            bootstrap();
        });
    });
});
//# sourceMappingURL=Factory.spec.js.map