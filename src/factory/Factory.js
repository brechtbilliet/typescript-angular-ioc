var Factory = (function () {
    function Factory(ctor, dependencies) {
        this.ctor = ctor;
        this.dependencies = dependencies;
    }
    Factory.prototype.create = function (otherDependencies) {
        if (otherDependencies === void 0) { otherDependencies = []; }
        var returnObj = Object.create(this.ctor.prototype);
        this.ctor.apply(returnObj, this.dependencies.concat(otherDependencies));
        return returnObj;
    };
    return Factory;
})();
exports.Factory = Factory;
//# sourceMappingURL=Factory.js.map