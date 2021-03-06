var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var Inject_1 = require("../Inject");
var Kernel_1 = require("../Kernel");
var FirstLevel = (function () {
    function FirstLevel(secondLevel) {
        this.secondLevel = secondLevel;
        console.log(this.secondLevel);
    }
    FirstLevel = __decorate([
        Inject_1.inject(["ISecondLevel"])
    ], FirstLevel);
    return FirstLevel;
})();
var SecondLevel = (function () {
    function SecondLevel(thirdLevel) {
        this.thirdLevel = thirdLevel;
        console.log(this.thirdLevel);
    }
    SecondLevel = __decorate([
        Inject_1.inject(["IThirdLevel"])
    ], SecondLevel);
    return SecondLevel;
})();
var CapitalLevel = (function () {
    function CapitalLevel(secondLevel, thirdLevel) {
        this.secondLevel = secondLevel;
        this.thirdLevel = thirdLevel;
        console.log(this.secondLevel);
        console.log(this.thirdLevel);
    }
    CapitalLevel = __decorate([
        Inject_1.Inject("ISecondLevel", "IThirdLevel")
    ], CapitalLevel);
    return CapitalLevel;
})();
var ThirdLevel = (function () {
    function ThirdLevel() {
    }
    ThirdLevel.prototype.bar = function () {
    };
    return ThirdLevel;
})();
var kernel;
beforeEach(function () {
    kernel = new Kernel_1.Kernel()
        .bind("IFirstLevel").toSingleton(FirstLevel)
        .bind("ISecondLevel").toSingleton(SecondLevel)
        .bind("IThirdLevel").toSingleton(ThirdLevel)
        .bind("ICapitalLevel").toSingleton(CapitalLevel);
});
describe("When using the @inject annotation", function () {
    it("should add the injections correctly", function () {
        var firstLevel = kernel.retrieve("IFirstLevel");
        expect(firstLevel.secondLevel.constructor.name).toBe("SecondLevel");
        expect(firstLevel.secondLevel.thirdLevel.constructor.name).toBe("ThirdLevel");
    });
});
describe("when using the @Inject annotation (with spread notation)", function () {
    it("should add the injections correctly", function () {
        var capitalLevel = kernel.retrieve("ICapitalLevel");
        expect(capitalLevel.secondLevel.constructor.name).toBe("SecondLevel");
        expect(capitalLevel.thirdLevel.constructor.name).toBe("ThirdLevel");
    });
});
