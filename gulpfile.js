let gulp = require('gulp'),
    pug = require('gulp-pug'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    rjs = require('gulp-requirejs'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect');


gulp.task('connect', () => {
    connect.server({
        port: 1208,
        livereload: 'on',
        root: './dist'
    })
});

gulp.task('js', () => {
    gulp.src('app/js/**/*')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(connect.reload());
});


gulp.task('pug', () => {
    gulp.src('app/**/index.pug')
        .pipe(pug().on('error', function(error) {
            console.log(error)
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('stylus', () => {
    gulp.src('app/styl/**/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true // config for stylus
        }).on('error', function(error) {
            console.log(error)
        }))
        .pipe(sourcemaps.write('./maps')) // folder for *.map files
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});



gulp.task('watch', () => {
    gulp.watch('app/**/*.pug', ['pug']);
    gulp.watch('app/styl/**/*.styl', ['stylus'])
});

gulp.task('default', ['pug', 'connect', 'js', 'stylus', 'watch']);