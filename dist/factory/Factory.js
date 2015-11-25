export class Factory {
    constructor(ctor, dependencies) {
        this.ctor = ctor;
        this.dependencies = dependencies;
    }
    create(otherDependencies = []) {
        var returnObj = Object.create(this.ctor.prototype);
        this.ctor.apply(returnObj, this.dependencies.concat(otherDependencies));
        return returnObj;
    }
}
