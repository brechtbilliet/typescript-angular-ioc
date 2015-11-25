var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
import "angular";
import "angular-mocks";
import { AngularModuleWrapper } from "../AngularModuleWrapper";
import { inject } from "../../ioc/Inject";
let CarService = class {
    constructor($http, foo = "selffilled") {
        this.$http = $http;
        this.foo = foo;
    }
    drive(speed) {
    }
    stop() {
    }
};
CarService = __decorate([
    inject(["$http"])
], CarService);
class FooComponent {
    constructor() {
        this.restrict = "E";
        this.template = "hello world";
        this.scope = true;
    }
}
describe("on bindFactory", () => {
    var bootstrap;
    var dummyModuleName = "app";
    var ngModuleWrapper;
    var mod = angular.module(dummyModuleName, []);
    var compile;
    var rootScope;
    beforeEach(angular.mock.inject(($compile, $rootScope) => {
        compile = $compile;
        rootScope = $rootScope;
        mod = angular.module(dummyModuleName, []);
        ngModuleWrapper = new AngularModuleWrapper(mod);
        bootstrap = function () {
            angular.bootstrap(angular.copy(document), [mod.name], {
                strictDi: true
            });
        };
    }));
    describe("on inject", () => {
        var getInjectedFactory;
        beforeEach(() => {
            ngModuleWrapper.bindFactory("CarServiceFactory", CarService);
            getInjectedFactory = function (cb) {
                angular.module("app").run(startFunc);
                startFunc.$inject = ["CarServiceFactory"];
                function startFunc(carServiceFactory) {
                    cb(carServiceFactory);
                }
            };
        });
        it("should get the correct instance", () => {
            getInjectedFactory((carServiceFactory) => {
                var carService = carServiceFactory.create();
                expect(carService.constructor.name).toBe("CarService");
            });
            bootstrap();
        });
        it("should have injected the properties that are decorated", () => {
            getInjectedFactory((carServiceFactory) => {
                var carService = carServiceFactory.create();
                expect(carService["$http"].prototype.constructor.name).toBe("$http");
                expect(carService.foo).toBe("selffilled");
            });
            bootstrap();
        });
        it("should have merged the injected properties and the passed properties", () => {
            getInjectedFactory((carServiceFactory) => {
                var carService = carServiceFactory.create(["bar"]);
                expect(carService["$http"].prototype.constructor.name).toBe("$http");
                expect(carService.foo).toBe("bar");
            });
            bootstrap();
        });
    });
    describe("on bindService", () => {
        var getInjectedService;
        beforeEach(() => {
            ngModuleWrapper.bindService("ICarService", CarService);
            getInjectedService = function (cb) {
                angular.module("app").run(startFunc);
                startFunc.$inject = ["ICarService"];
                function startFunc(carService) {
                    cb(carService);
                }
            };
        });
        it("should bind the service to angular", () => {
            getInjectedService((carService) => {
                expect(carService.constructor.name).toBe("CarService");
                expect(carService["$http"].prototype.constructor.name).toBe("$http");
            });
            bootstrap();
        });
    });
});
