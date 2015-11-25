import { BindingType } from "../BindingType";
import { Kernel } from "../Kernel";
class FirstLevel {
    constructor(secondLevel) {
        this.secondLevel = secondLevel;
    }
}
FirstLevel.$inject = ["ISecondLevel"];
class SecondLevel {
    constructor(thirdLevel) {
        this.thirdLevel = thirdLevel;
    }
}
SecondLevel.$inject = ["IThirdLevel"];
class ThirdLevel {
    bar() {
    }
}
describe("Kernel", () => {
    var kernel;
    beforeEach(() => {
        kernel = new Kernel();
    });
    describe("on bind()", () => {
        it("should return a bindable object", () => {
            expect(kernel.bind("IFirstLevel").constructor.name).toBe("Bindable");
        });
    });
    describe("on toSingleton()", () => {
        var binding;
        beforeEach(() => {
            binding = kernel.bind("IFirstLevel");
        });
        it("should create a binding with the correct BindingType", () => {
            binding.toSingleton(FirstLevel);
            expect(kernel.bindings[0].bindingType === BindingType.singleton);
        });
        it("should add the binding to the bindings array", () => {
            binding.toSingleton(FirstLevel);
            expect(kernel.bindings.length).toBe(1);
            expect(kernel.bindings[0].key).toBe("IFirstLevel");
        });
        it("should should be chainable", () => {
            expect(binding.toSingleton(FirstLevel)).toBe(kernel);
        });
    });
    describe("on toNewInstance()", () => {
        var binding;
        beforeEach(() => {
            binding = kernel.bind("IFirstLevel");
        });
        it("should create a binding with the correct BindingType", () => {
            binding.toNewInstance(FirstLevel);
            expect(kernel.bindings[0].bindingType === BindingType.newInstance);
        });
        it("should add the binding to the bindings array", () => {
            binding.toNewInstance(FirstLevel);
            expect(kernel.bindings.length).toBe(1);
            expect(kernel.bindings[0].key).toBe("IFirstLevel");
        });
        it("should should be chainable", () => {
            expect(binding.toNewInstance(FirstLevel)).toBe(kernel);
        });
    });
    describe("on toFactory()", () => {
        var binding;
        beforeEach(() => {
            binding = kernel.bind("IFirstLevel");
        });
        it("should create a binding with the correct BindingType", () => {
            binding.toFactory(FirstLevel);
            expect(kernel.bindings[0].bindingType === BindingType.factory);
        });
        it("should add the binding to the bindings array", () => {
            binding.toFactory(FirstLevel);
            expect(kernel.bindings.length).toBe(1);
            expect(kernel.bindings[0].key).toBe("IFirstLevel");
        });
        it("should should be chainable", () => {
            expect(binding.toFactory(FirstLevel)).toBe(kernel);
        });
    });
    describe("on retrieve()", () => {
        describe("given the key is not registered", () => {
            it("should throw the correct error", () => {
                kernel.bind("IFirstLevel").toSingleton(FirstLevel);
                expect(() => kernel.retrieve("IFirstLevel"))
                    .toThrow(new Error("Module has no binding registered with the key<ISecondLevel>"));
            });
        });
        describe("given a singleton is correctly registered", () => {
            it("should retrieve the correct singleton", () => {
                kernel.bind("IFirstLevel").toSingleton(FirstLevel);
                kernel.bind("ISecondLevel").toSingleton(SecondLevel);
                kernel.bind("IThirdLevel").toSingleton(ThirdLevel);
                var retrievedObj = kernel.retrieve("IFirstLevel");
                expect(retrievedObj.constructor.name).toBe("FirstLevel");
                expect(retrievedObj).toBe(kernel.retrieve("IFirstLevel"));
            });
        });
        describe("given a newInstance is correctly registered", () => {
            it("should retrieve the correct newInstance", () => {
                kernel.bind("IFirstLevel").toNewInstance(FirstLevel);
                kernel.bind("ISecondLevel").toSingleton(SecondLevel);
                kernel.bind("IThirdLevel").toSingleton(ThirdLevel);
                var retrievedObj = kernel.retrieve("IFirstLevel");
                expect(retrievedObj.constructor.name).toBe("FirstLevel");
                expect(retrievedObj).not.toBe(kernel.retrieve("IFirstLevel"));
                expect(retrievedObj).toEqual(kernel.retrieve("IFirstLevel"));
            });
        });
        describe("given the instance has injections", () => {
            it("they should be injected automatically", () => {
                kernel.bind("IFirstLevel").toSingleton(FirstLevel);
                kernel.bind("ISecondLevel").toSingleton(SecondLevel);
                kernel.bind("IThirdLevel").toSingleton(ThirdLevel);
                var retrievedObj = kernel.retrieve("IFirstLevel");
                expect(retrievedObj.secondLevel.constructor.name).toBe("SecondLevel");
                expect(retrievedObj.secondLevel.thirdLevel.constructor.name).toBe("ThirdLevel");
            });
        });
    });
});
