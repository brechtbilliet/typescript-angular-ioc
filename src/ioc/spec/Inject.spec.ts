import {inject, Inject} from "../Inject";
import {Kernel} from "../Kernel";

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
interface ICapitalLevel {
    firstLevel: IFirstLevel;
    secondLevel: ISecondLevel;
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

@Inject("ISecondLevel", "IThirdLevel")
class CapitalLevel {
    constructor(public secondLevel: ISecondLevel, public thirdLevel: IThirdLevel) {
        console.log(this.secondLevel);
        console.log(this.thirdLevel);
    }
}

class ThirdLevel implements IThirdLevel {
    public foo: string;

    public bar(): void {
    }
}
var kernel: Kernel;
beforeEach(() => {
    kernel = new Kernel()
        .bind("IFirstLevel").toSingleton(FirstLevel)
        .bind("ISecondLevel").toSingleton(SecondLevel)
        .bind("IThirdLevel").toSingleton(ThirdLevel)
        .bind("ICapitalLevel").toSingleton(CapitalLevel);
});

describe("When using the @inject annotation", () => {
    it("should add the injections correctly", () => {
        var firstLevel: IFirstLevel = kernel.retrieve<IFirstLevel>("IFirstLevel");
        expect((<any>firstLevel.secondLevel.constructor).name).toBe("SecondLevel");
        expect((<any>firstLevel.secondLevel.thirdLevel.constructor).name).toBe("ThirdLevel");
    });

    // todo, add decorations the the dependency injection of angular
});

describe("when using the @Inject annotation (with spread notation)", () => {
    it("should add the injections correctly", () => {
        var capitalLevel: CapitalLevel = kernel.retrieve<CapitalLevel>("ICapitalLevel");
        expect((<any>capitalLevel.secondLevel.constructor).name).toBe("SecondLevel");
        expect((<any>capitalLevel.thirdLevel.constructor).name).toBe("ThirdLevel");
    });
});