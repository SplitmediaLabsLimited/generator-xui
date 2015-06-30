/* globals require */

(function() {
    'use strict';

    var gulp        = require('gulp'),
        typescript  = require('gulp-tsc'),
        browserSync = require('browser-sync').create(),
        fs          = require('fs');

    gulp.task('compile', function() {
        var configBuffer = fs.readFileSync('./src/tsconfig.json');
        var config = JSON.parse(configBuffer.toString());

        for (var i = 0; i < config.files.length; i++) {
            config.files[i] = './src' + config.files[i].substr(1);
        }

        return gulp.src(config.files)
            .pipe(typescript(config.compilerOptions))
            .pipe(gulp.dest('js/'));
    });

    gulp.task('default', function() {
        browserSync.init({
            open: false,
            port: 9001,
            server: {
                baseDir: './'
            }
        });

        gulp.watch(['src/**/*.ts'], ['compile']).on('change', browserSync.reload);
    });
})();
