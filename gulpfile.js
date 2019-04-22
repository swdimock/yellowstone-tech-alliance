var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('styles', function(){
    gulp.src(['assets/stylesheets/lib/**/*.scss'])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('assets/stylesheets/dist/'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
    return gulp.src('assets/scripts/lib/**/*.js')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/scripts/dist/'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['browser-sync'], function(){
    gulp.watch("assets/stylesheets/lib/**/*.scss", ['styles']);
    gulp.watch("assets/scripts/lib/**/*.js", ['scripts']);
    gulp.watch("*.html", ['bs-reload']);
});