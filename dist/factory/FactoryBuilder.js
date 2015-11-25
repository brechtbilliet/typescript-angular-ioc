import * as _ from "lodash";
import { Factory } from "./Factory";
export class FactoryBuilder {
    constructor($injector) {
        this.$injector = $injector;
    }
    build(ctor) {
        var dependencies = [];
        _.forEach(ctor.$inject, (dependency) => {
            dependencies.push(this.$injector.get(dependency));
        });
        return new Factory(ctor, dependencies);
    }
}
FactoryBuilder.$inject = ["$injector"];
