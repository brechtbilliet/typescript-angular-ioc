import "angular";
import "angular-mocks";

import {AngularModuleWrapper} from "../AngularModuleWrapper";
import {Factory} from "../Factory";
import {inject} from "../../ioc/Inject";

interface ICarService {
    foo: string;
    drive(speed: number): void;
    stop(): void;
}

@inject(["$http"])
class CarService implements ICarService {
    public drive(speed: number): void {
    }

    public stop(): void {
    }

    constructor(private $http: ng.IHttpService, public foo: string = "selffilled") {
    }
}

class FooComponent implements ng.IDirective {
    public restrict: string = "E";
    public template: string = "hello world";
    public scope: boolean = true;
}

describe("on bindFactory", () => {
    var bootstrap: Function;
    var dummyModuleName: string = "app";
    var ngModuleWrapper: AngularModuleWrapper;
    var mod: ng.IModule = angular.module(dummyModuleName, []);
    var compile: ng.ICompileService;
    var rootScope: ng.IRootScopeService;
    beforeEach(angular.mock.inject(($compile: ng.ICompileService, $rootScope: ng.IRootScopeService) => {
        compile = $compile;
        rootScope = $rootScope;
        mod = angular.module(dummyModuleName, []);
        ngModuleWrapper = new AngularModuleWrapper(mod);
        bootstrap = function (): void {
            angular.bootstrap(angular.copy(document), [mod.name], {
                strictDi: true
            });
        };
    }));
    describe("on inject", () => {
        var getInjectedFactory: Function;
        beforeEach(() => {
            ngModuleWrapper.bindFactory<ICarService>("CarServiceFactory", CarService);
            getInjectedFactory = function (cb: Function): void {
                angular.module("app").run(startFunc);

                startFunc.$inject = ["CarServiceFactory"];
                function startFunc(carServiceFactory: Factory<ICarService>): void {
                    cb(carServiceFactory);
                }
            };
        });
        it("should get the correct instance", () => {
            getInjectedFactory((carServiceFactory: Factory<ICarService>) => {
                var carService: ICarService = carServiceFactory.create();
                expect((<any>carService.constructor).name).toBe("CarService");
            });
            bootstrap();

        });
        it("should have injected the properties that are decorated", () => {
            getInjectedFactory((carServiceFactory: Factory<ICarService>) => {
                var carService: ICarService = carServiceFactory.create();
                expect(carService["$http"].prototype.constructor.name).toBe("$http")
                expect(carService.foo).toBe("selffilled");
            });
            bootstrap();
        });
        it("should have merged the injected properties and the passed properties", () => {
            getInjectedFactory((carServiceFactory: Factory<ICarService>) => {
                var carService: ICarService = carServiceFactory.create(["bar"]);
                expect(carService["$http"].prototype.constructor.name).toBe("$http")
                expect(carService.foo).toBe("bar");
            });
            bootstrap();
        });
    });

    describe("on bindService", () => {
        var getInjectedService: Function;
        beforeEach(() => {
            ngModuleWrapper.bindService<ICarService>("ICarService", CarService);
            getInjectedService = function (cb: Function): void {
                angular.module("app").run(startFunc);
                startFunc.$inject = ["ICarService"];
                function startFunc(carService: ICarService): void {
                    cb(carService);
                }
            };
        });
        it("should bind the service to angular", () => {
            getInjectedService((carService: ICarService) => {
                expect((<any>carService.constructor).name).toBe("CarService");
                expect(carService["$http"].prototype.constructor.name).toBe("$http");
            });
            bootstrap();
        });
    });
});