import * as _ from "lodash";
export class FactoryBuilder {
    public static $inject: Array<string> = ["$injector"];

    constructor(private $injector: any) {

    }

    public build<T>(ctor: any): Factory<T> {
        var dependencies: Array<any> = [];
        _.forEach(ctor.$inject, (dependency: string) => {
            dependencies.push(this.$injector.get(dependency));
        })
        return new Factory<T>(ctor, dependencies);
    }
}

export class Factory<T> {
    constructor(private ctor: any, private dependencies: Array<any>) {

    }

    public create(): T {
        var returnObj: any = Object.create(this.ctor.prototype);
        this.ctor.apply(returnObj, this.dependencies);
        return returnObj;
    }
}