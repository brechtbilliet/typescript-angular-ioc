import {IBindable} from "../ioc/Bindable";
import {BindingType} from "../ioc/BindingType";
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
class FirstLevel implements IFirstLevel {
    public static $inject: Array<string> = ["ISecondLevel"];

    constructor(public secondLevel: ISecondLevel) {

    }
}

class SecondLevel implements ISecondLevel {
    public static $inject: Array<string> = ["IThirdLevel"];

    constructor(public thirdLevel: IThirdLevel) {
    }
}

class ThirdLevel implements IThirdLevel {
    public foo: string;

    public bar(): void {
    }

}

describe("Kernel", () => {
    var kernel: Kernel;
    beforeEach(() => {

        kernel = new Kernel();

    });
    describe("on bind()", () => {
        it("should return a bindable object", () => {
            expect((<any>kernel.bind("IFirstLevel").constructor).name).toBe("Bindable");
        });
    })
    describe("on toSingleton()", () => {
        var binding: IBindable;
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
        var binding: IBindable;
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
        var binding: IBindable;
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
                expect(() => kernel.retrieve<IFirstLevel>("IFirstLevel"))
                    .toThrow(new Error("Module has no binding registered with the key<ISecondLevel>"));
            });
        });
        describe("given a singleton is correctly registered", () => {
            it("should retrieve the correct singleton", () => {
                kernel.bind("IFirstLevel").toSingleton(FirstLevel);
                kernel.bind("ISecondLevel").toSingleton(SecondLevel);
                kernel.bind("IThirdLevel").toSingleton(ThirdLevel);
                var retrievedObj: IFirstLevel = kernel.retrieve<IFirstLevel>("IFirstLevel");
                expect((<any>retrievedObj.constructor).name).toBe("FirstLevel");
                expect(retrievedObj).toBe(kernel.retrieve<IFirstLevel>("IFirstLevel"));
            });
        });
        describe("given a newInstance is correctly registered", () => {
            it("should retrieve the correct newInstance", () => {
                kernel.bind("IFirstLevel").toNewInstance(FirstLevel);
                kernel.bind("ISecondLevel").toSingleton(SecondLevel);
                kernel.bind("IThirdLevel").toSingleton(ThirdLevel);
                var retrievedObj: IFirstLevel = kernel.retrieve<IFirstLevel>("IFirstLevel");
                expect((<any>retrievedObj.constructor).name).toBe("FirstLevel");
                expect(retrievedObj).not.toBe(kernel.retrieve<IFirstLevel>("IFirstLevel"));
                expect(retrievedObj).toEqual(kernel.retrieve<IFirstLevel>("IFirstLevel"));
            });
        });
        describe("given the instance has injections", () => {
            it("they should be injected automatically", () => {
                kernel.bind("IFirstLevel").toSingleton(FirstLevel);
                kernel.bind("ISecondLevel").toSingleton(SecondLevel);
                kernel.bind("IThirdLevel").toSingleton(ThirdLevel);
                var retrievedObj: IFirstLevel = kernel.retrieve<IFirstLevel>("IFirstLevel");
                expect((<any>retrievedObj.secondLevel.constructor).name).toBe("SecondLevel");
                retrievedObj.secondLevel.thirdLevel.bar();
            });
        });
    });
});