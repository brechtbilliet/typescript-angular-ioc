function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./ioc/Bindable"));
__export(require("./ioc/Binding"));
__export(require("./ioc/BindingType"));
__export(require("./factory/Factory"));
__export(require("./factory/AngularModuleWrapper"));
__export(require("./factory/FactoryBuilder"));
__export(require("./ioc/Inject"));
__export(require("./ioc/Kernel"));
