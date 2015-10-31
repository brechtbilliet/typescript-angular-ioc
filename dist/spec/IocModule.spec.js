var BindingType_1 = require("../ioc/BindingType");
var Kernel_1 = require("../ioc/Kernel");
var FirstLevel = (function () {
    function FirstLevel(secondLevel) {
        this.secondLevel = secondLevel;
    }
    FirstLevel.$inject = ["ISecondLevel"];
    return FirstLevel;
})();
var SecondLevel = (function () {
    function SecondLevel(thirdLevel) {
        this.thirdLevel = thirdLevel;
    }
    SecondLevel.$inject = ["IThirdLevel"];
    return SecondLevel;
})();
var ThirdLevel = (function () {
    function ThirdLevel() {
    }
    ThirdLevel.prototype.bar = function () {
    };
    return ThirdLevel;
})();
describe("Kernel", function () {
    var kernel;
    beforeEach(function () {
        kernel = new Kernel_1.Kernel();
    });
    describe("on bind()", function () {
        it("should return a bindable object", function () {
            expect(kernel.bind("IFirstLevel").constructor.name).toBe("Bindable");
        });
    });
    describe("on toSingleton()", function () {
        var binding;
        beforeEach(function () {
            binding = kernel.bind("IFirstLevel");
        });
        it("should create a binding with the correct BindingType", function () {
            binding.toSingleton(FirstLevel);
            expect(kernel.bindings[0].bindingType === BindingType_1.BindingType.singleton);
        });
        it("should add the binding to the bindings array", function () {
            binding.toSingleton(FirstLevel);
            expect(kernel.bindings.length).toBe(1);
            expect(kernel.bindings[0].key).toBe("IFirstLevel");
        });
        it("should should be chainable", function () {
            expect(binding.toSingleton(FirstLevel)).toBe(kernel);
        });
    });
    describe("on toNewInstance()", function () {
        var binding;
        beforeEach(function () {
            binding = kernel.bind("IFirstLevel");
        });
        it("should create a binding with the correct BindingType", function () {
            binding.toNewInstance(FirstLevel);
            expect(kernel.bindings[0].bindingType === BindingType_1.BindingType.newInstance);
        });
        it("should add the binding to the bindings array", function () {
            binding.toNewInstance(FirstLevel);
            expect(kernel.bindings.length).toBe(1);
            expect(kernel.bindings[0].key).toBe("IFirstLevel");
        });
        it("should should be chainable", function () {
            expect(binding.toNewInstance(FirstLevel)).toBe(kernel);
        });
    });
    describe("on toFactory()", function () {
        var binding;
        beforeEach(function () {
            binding = kernel.bind("IFirstLevel");
        });
        it("should create a binding with the correct BindingType", function () {
            binding.toFactory(FirstLevel);
            expect(kernel.bindings[0].bindingType === BindingType_1.BindingType.factory);
        });
        it("should add the binding to the bindings array", function () {
            binding.toFactory(FirstLevel);
            expect(kernel.bindings.length).toBe(1);
            expect(kernel.bindings[0].key).toBe("IFirstLevel");
        });
        it("should should be chainable", function () {
            expect(binding.toFactory(FirstLevel)).toBe(kernel);
        });
    });
    describe("on retrieve()", function () {
        describe("given the key is not registered", function () {
            it("should throw the correct error", function () {
                kernel.bind("IFirstLevel").toSingleton(FirstLevel);
                expect(function () { return kernel.retrieve("IFirstLevel"); })
                    .toThrow(new Error("Module has no binding registered with the key<ISecondLevel>"));
            });
        });
        describe("given a singleton is correctly registered", function () {
            it("should retrieve the correct singleton", function () {
                kernel.bind("IFirstLevel").toSingleton(FirstLevel);
                kernel.bind("ISecondLevel").toSingleton(SecondLevel);
                kernel.bind("IThirdLevel").toSingleton(ThirdLevel);
                var retrievedObj = kernel.retrieve("IFirstLevel");
                expect(retrievedObj.constructor.name).toBe("FirstLevel");
                expect(retrievedObj).toBe(kernel.retrieve("IFirstLevel"));
            });
        });
        describe("given a newInstance is correctly registered", function () {
            it("should retrieve the correct newInstance", function () {
                kernel.bind("IFirstLevel").toNewInstance(FirstLevel);
                kernel.bind("ISecondLevel").toSingleton(SecondLevel);
                kernel.bind("IThirdLevel").toSingleton(ThirdLevel);
                var retrievedObj = kernel.retrieve("IFirstLevel");
                expect(retrievedObj.constructor.name).toBe("FirstLevel");
                expect(retrievedObj).not.toBe(kernel.retrieve("IFirstLevel"));
                expect(retrievedObj).toEqual(kernel.retrieve("IFirstLevel"));
            });
        });
        describe("given the instance has injections", function () {
            it("they should be injected automatically", function () {
                kernel.bind("IFirstLevel").toSingleton(FirstLevel);
                kernel.bind("ISecondLevel").toSingleton(SecondLevel);
                kernel.bind("IThirdLevel").toSingleton(ThirdLevel);
                var retrievedObj = kernel.retrieve("IFirstLevel");
                expect(retrievedObj.secondLevel.constructor.name).toBe("SecondLevel");
                retrievedObj.secondLevel.thirdLevel.bar();
            });
        });
    });
});
