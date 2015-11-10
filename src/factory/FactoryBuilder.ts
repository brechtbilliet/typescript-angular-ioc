import * as _ from "lodash";
import {Factory} from "./Factory";
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