export function inject(dependencies) {
    return function (target) {
        target.$inject = dependencies;
        return target;
    };
}
