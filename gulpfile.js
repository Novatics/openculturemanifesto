var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    uglifyjs = require('gulp-uglifyjs'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sequence = require('run-sequence'),
    jshint = require('gulp-jshint');

// CSS tasks
gulp.task('css-prepare', function () {
  return gulp.src(['content/css/import.scss', 'content/css/base.scss'])
    .pipe(sass())
    .pipe(gulp.dest('content/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss({ processImport: false }))
    .pipe(gulp.dest('content'));
});
gulp.task('css-combine', function() {
  return gulp.src(['content/import.min.css', 'content/normalize.min.css', 'content/base.min.css'])
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('content'));
});

// Watch and rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch('content/css/*.scss', ['watch-css']);
});
gulp.task('watch-css', function (callback) {
    sequence('css-prepare','css-combine', callback);
});

// The default task (called when you run `gulp` from cli)
// Using 'run-sequence' to run tasks in order
gulp.task('default', function (callback) {
  sequence('css-prepare', 'css-combine', 'watch', callback);
});