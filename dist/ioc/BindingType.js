export var BindingType;
(function (BindingType) {
    BindingType[BindingType["singleton"] = 0] = "singleton";
    BindingType[BindingType["newInstance"] = 1] = "newInstance";
    BindingType[BindingType["factory"] = 2] = "factory";
})(BindingType || (BindingType = {}));
