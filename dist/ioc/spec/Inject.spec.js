var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
import { inject } from "../Inject";
import { Kernel } from "../Kernel";
let FirstLevel = class {
    constructor(secondLevel) {
        this.secondLevel = secondLevel;
        console.log(this.secondLevel);
    }
};
FirstLevel = __decorate([
    inject(["ISecondLevel"])
], FirstLevel);
let SecondLevel = class {
    constructor(thirdLevel) {
        this.thirdLevel = thirdLevel;
        console.log(this.thirdLevel);
    }
};
SecondLevel = __decorate([
    inject(["IThirdLevel"])
], SecondLevel);
class ThirdLevel {
    bar() {
    }
}
var kernel;
beforeEach(() => {
    kernel = new Kernel()
        .bind("IFirstLevel").toSingleton(FirstLevel)
        .bind("ISecondLevel").toSingleton(SecondLevel)
        .bind("IThirdLevel").toSingleton(ThirdLevel);
});
describe("When using the @inject annotation", () => {
    it("should add the injections correctly", () => {
        var firstLevel = kernel.retrieve("IFirstLevel");
        expect(firstLevel.secondLevel.constructor.name).toBe("SecondLevel");
        expect(firstLevel.secondLevel.thirdLevel.constructor.name).toBe("ThirdLevel");
    });
});
