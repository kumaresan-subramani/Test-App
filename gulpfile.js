'use strict';

var gulp = require('gulp');

/** 
 * Compile TypeScript to JS
 */
gulp.task('compile', gulp.series(function(done) {
    var ts = require('gulp-typescript');
    // Default typescript config
    var defaultConfig = {
        typescript: require('typescript')
    };
    var tsProject, tsResult;
    // Create the typescript project
    tsProject = ts.createProject('tsconfig.json', defaultConfig);
    // Get typescript result
    tsResult = gulp.src(['./src/**/*.ts','./component/*.ts'], { base: '.' })
        .pipe(ts(tsProject))
        .pipe(gulp.dest('./'))
        .on('error', function(e) {
            done(e);
            process.exit(1);
        }).on('end', function() {
            done();
        });
}));

/**
 * Load the sample in src/app/index
 */
gulp.task('start', gulp.series('compile', function(done) {
    var browserSync = require('browser-sync');
    var bs = browserSync.create('Essential JS 2');
    var options = {
        server: {
            baseDir: ['./src', './']
        },
        ui: false
    };
    bs.init(options, done);

    /**
    * Watching typescript file changes
    */
    gulp.watch('src/**/*.ts', gulp.series('compile', bs.reload)).on('change', reportChanges);
}));



function reportChanges(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}
