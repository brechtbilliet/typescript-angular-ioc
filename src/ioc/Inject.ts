import * as angular from "angular";

export function inject(...dependencies: Array<string|string[]>): any {
    if(dependencies.length === 1 && angular.isArray(dependencies[0])) {
        dependencies = <string[]>dependencies[0];
    }

    return function (target: any): any {
        target.$inject = dependencies;
        return target;
    };
}

export const Inject = inject;