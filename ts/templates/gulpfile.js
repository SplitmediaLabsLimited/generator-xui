/* globals require */

(function() {
    'use strict';

    var gulp       = require('gulp'),
        typescript = require('gulp-tsc'),
        fs         = require('fs');

    gulp.task('default', function() {
        var configBuffer = fs.readFileSync('./src/tsconfig.json');
        var config = JSON.parse(configBuffer.toString());

        for (var i = 0; i < config.files.length; i++) {
            if (!config.files[i].match(/bower_components/)) {
                config.files[i] = './src' + config.files[i].substr(1);
            } else {
                config.files[i] = config.files[i].substr(3);
            }
        }

        return gulp.src(config.files)
            .pipe(typescript(config.compilerOptions))
            .pipe(gulp.dest('js/'));
    });
})();