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
        Inject_1.inject(["$http"])
    ], CarService);
    return CarService;
})();
var FooComponent = (function () {
    function FooComponent() {
        this.restrict = "E";
        this.template = "hello world";
        this.scope = true;
    }
    return FooComponent;
})();
describe("on bindFactory", function () {
    var bootstrap;
    var dummyModuleName = "app";
    var ngModuleWrapper;
    var mod = angular.module(dummyModuleName, []);
    var compile;
    var rootScope;
    beforeEach(angular.mock.inject(function ($compile, $rootScope) {
        compile = $compile;
        rootScope = $rootScope;
        mod = angular.module(dummyModuleName, []);
        ngModuleWrapper = new AngularModuleWrapper_1.AngularModuleWrapper(mod);
        bootstrap = function () {
            angular.bootstrap(angular.copy(document), [mod.name], {
                strictDi: true
            });
        };
    }));
    describe("on inject", function () {
        var getInjectedFactory;
        beforeEach(function () {
            ngModuleWrapper.bindFactory("CarServiceFactory", CarService);
            getInjectedFactory = function (cb) {
                angular.module("app").run(startFunc);
                startFunc.$inject = ["CarServiceFactory"];
                function startFunc(carServiceFactory) {
                    cb(carServiceFactory);
                }
            };
        });
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
    describe("on bindService", function () {
        var getInjectedService;
        beforeEach(function () {
            ngModuleWrapper.bindService("ICarService", CarService);
            getInjectedService = function (cb) {
                angular.module("app").run(startFunc);
                startFunc.$inject = ["ICarService"];
                function startFunc(carService) {
                    cb(carService);
                }
            };
        });
        it("should bind the service to angular", function () {
            getInjectedService(function (carService) {
                expect(carService.constructor.name).toBe("CarService");
                expect(carService["$http"].prototype.constructor.name).toBe("$http");
            });
            bootstrap();
        });
    });
});
