(function (BindingType) {
    BindingType[BindingType["singleton"] = 0] = "singleton";
    BindingType[BindingType["newInstance"] = 1] = "newInstance";
    BindingType[BindingType["factory"] = 2] = "factory";
})(exports.BindingType || (exports.BindingType = {}));
var BindingType = exports.BindingType;
