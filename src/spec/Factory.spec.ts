import "angular";
import "angular-mocks";
import {Factory} from "../ioc/Factory";
import {FactoryBuilder} from "../ioc/Factory";

interface ICarService {
    drive(speed: number): void;
    stop(): void;
}
class CarService implements ICarService {
    public static $inject: Array<string> = ["$http"];

    public foo: string = "bar";

    public drive(speed: number): void {
    }

    public stop(): void {
    }

    constructor(private $http: ng.IHttpService) {

    }
}
describe("on factory", () => {
    beforeEach(() => {
        angular.module("app", [])
            .service("CarServiceFactory", registerFn);

        registerFn.$inject = ["$injector"];
        function registerFn($injector: any): any {
            return new FactoryBuilder($injector).build<ICarService>(CarService);
        }
    });

    describe("on inject", () => {
        it("should get the correct instance", () => {
            angular.module("app").run(startFunc);

            startFunc.$inject = ["CarServiceFactory"];
            function startFunc(CarServiceFactory: Factory<ICarService>): void {
                console.log(CarServiceFactory.create());
            }

            angular.bootstrap(document, ["app"], {
                strictDi: true
            });
        });
    });
});