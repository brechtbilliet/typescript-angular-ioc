var angular = require("angular");
function inject() {
    var dependencies = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        dependencies[_i - 0] = arguments[_i];
    }
    if (dependencies.length === 1 && angular.isArray(dependencies[0])) {
        dependencies = dependencies[0];
    }
    return function (target) {
        target.$inject = dependencies;
        return target;
    };
}
exports.inject = inject;
exports.Inject = inject;
