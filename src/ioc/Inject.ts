export function inject(dependencies: Array<string>): any {
    return function (target: any): any {
        target.$inject = dependencies;
        return target;
    };
}