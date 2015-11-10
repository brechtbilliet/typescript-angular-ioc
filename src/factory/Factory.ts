export class Factory<T> {
    constructor(private ctor: any, private dependencies: Array<any>) {
    }

    public create(otherDependencies: Array<string> = []): T {
        var returnObj: any = Object.create(this.ctor.prototype);
        this.ctor.apply(returnObj, this.dependencies.concat(otherDependencies));
        return returnObj;
    }
}