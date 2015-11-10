var dts = require('dts-generator');
dts.generate({
    name: 'typescript-angular-ioc',
    baseDir: 'src',
    files: [
        'index.ts'
    ],
    out: 'dist/typescript-angular-ioc.d.ts',
    main: "index"
});