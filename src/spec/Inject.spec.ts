import {inject} from "../ioc/Inject";
import {Kernel} from "../ioc/Kernel";

interface IFirstLevel {
    secondLevel: ISecondLevel;
}
interface ISecondLevel {
    thirdLevel: IThirdLevel;
}
interface IThirdLevel {
    foo: string;
    bar(): void;
}

@inject(["ISecondLevel"])
class FirstLevel implements IFirstLevel {
    constructor(public secondLevel: ISecondLevel) {
        console.log(this.secondLevel);
    }
}

@inject(["IThirdLevel"])
class SecondLevel implements ISecondLevel {
    constructor(public thirdLevel: IThirdLevel) {
        console.log(this.thirdLevel);

    }

}

class ThirdLevel implements IThirdLevel {
    public foo: string;

    public bar(): void {
    }

}

var kernel: Kernel = new Kernel()
    .bind("IFirstLevel").toSingleton(FirstLevel)
    .bind("ISecondLevel").toSingleton(SecondLevel)
    .bind("IThirdLevel").toSingleton(ThirdLevel);

describe("When using the @inject annotation", () => {
    it("should add the injections correctly", () => {
        var firstLevel: IFirstLevel = kernel.retrieve<IFirstLevel>("IFirstLevel");
        expect((<any>firstLevel.secondLevel.constructor).name).toBe("SecondLevel");
        expect((<any>firstLevel.secondLevel.thirdLevel.constructor).name).toBe("ThirdLevel");
    });

    // todo, add decorations the the dependency injection of angular
});