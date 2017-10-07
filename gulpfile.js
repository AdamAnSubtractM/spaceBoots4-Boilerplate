'use strict'
// Gulp Dependencies
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const scss = require('postcss-scss');
const replace = require('gulp-replace');
const rename = require("gulp-rename");
const autoprefixer = require('autoprefixer');
const htmlmin = require('gulp-htmlmin');
const strip = require('gulp-strip-comments');
const stripCssComments = require('gulp-strip-css-comments');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const notify = require('gulp-notify');
const del = require('del');
const runSequence = require('run-sequence');
const inject = require('gulp-inject');
const dom = require("gulp-jsdom");
const jshint = require('gulp-jshint');
const fs = require('fs');
// Include for Nunjucks Later
// const nunjucksRender = require('gulp-nunjucks-render');
// const data = require('gulp-data');

// Folder Structure
var config = {
    src: 'src',
    dist: 'dist'
};
// Browsersync to allow page preview to auto-update on changes
gulp.task('browserSync', function () {
    browserSync({
        //Prevents screen mirror from being manipulated by other users
        ghostMode: false,
        //Auto open the page
        open: true,
        //Default to Google Chrome
        browser: "google chrome",
        //Dont minify the client script in case of errors
        minify: false,
        server: {
            baseDir: 'dist'
        }
    })
});
// Watch these directiories/files for changes
gulp.task('watch', function () {
    gulp.watch(config.src + '/**/*.scss', ['css']);
    gulp.watch(config.src + '/*.html', ['html']);
    gulp.watch(config.src + '/**/*.html', ['html']);
    gulp.watch(config.src + '/*.php', ['php']);
    gulp.watch(config.src + '/**/*.php', ['php']);
    gulp.watch(config.src + '/**/**/.php', ['php']);
    gulp.watch(config.src + '/**/*.js', ['js']);
    gulp.watch(config.src + '/**/*.json', ['data']);
    gulp.watch(config.src + '/images/*', ['images']);
});
//HTML Processing
gulp.task('html', function () {
   return gulp.src(config.src + '/*.html')
        .pipe(gulp.dest(config.dist))
        .pipe(htmlmin({
          caseSensitive: true,
          collapseWhitespace: true,
          removeComments: true
          }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.dist + '/minified/'))
        .pipe(browserSync.stream());
});
//PHP Processing
gulp.task('php', function () {
   return gulp.src(config.src + '/*.php')
        .pipe(gulp.dest(config.dist))
        .pipe(browserSync.stream());
});
// SASS Processing
gulp.task('sass', function () {
    return gulp.src(config.src + '/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 5 versions']
            })
        ], { syntax: scss }))
        .pipe(gulp.dest(config.src + '/css'))
        .pipe(browserSync.stream());
})
//Spit SASS into CSS and minfiy it
gulp.task('css', ['sass'], function () {
    return gulp.src(config.src + '/css/*.css')
        .pipe(stripCssComments())
        .pipe(gulp.dest(config.dist + '/css/'))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.dist + '/minified/css/'))
        .pipe( notify( { message: 'Stylesheet Compiled! 💯', onLast: true } ) )
        .pipe(browserSync.stream());

});
//Spit JS out and make a minified version
gulp.task('js', function () {
    return gulp.src(config.src + '/js/*.js')
        .pipe(strip())
        .pipe(gulp.dest(config.dist + '/js/'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.dist + '/minified/js/'))
        .pipe( notify( { message: 'JS Compiled! 💯', onLast: true } ) )
        .pipe(browserSync.stream());
});
//Spit SASS into CSS and make a bundled version
gulp.task('cssBundle', ['sass'], function () {
    return gulp.src(config.src + '/css/*.css')
        .pipe(gulp.dest(config.dist + '/css/'))
        .pipe(concatCss('bundle.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.dist + '/minified/css/'))
        .pipe(browserSync.stream());
});
//Spit JS out and make a bundled version
gulp.task('jsBundle', function () {
    return gulp.src(config.src + '/js/*.js')
        .pipe(gulp.dest(config.dist + '/js/'))
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.dist + '/minified/js/'))
        .pipe(browserSync.stream());
});
//Lint the JS, Check for Errors
gulp.task('lint', function () {
    return gulp.src(config.src + '/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
//Check for images
gulp.task('images', function() {
    return gulp.src(config.src + '/images/*')
        .pipe(gulp.dest(config.dist + '/images'))
});
//Delete any existent code in the distribution folder
//to prevent old code from sticking around
gulp.task('clean:dist', function () {
    return del.sync('dist');
});
// Gulp Task CMD's
gulp.task('default', function (cb) {
    runSequence('clean:dist', ['css', 'cssBundle', 'js', 'jsBundle'], 'images', 'html', 'php', cb);
});
// For those use to using the 'gulp dev' CMD
gulp.task('dev', function (cb) {
    runSequence('default', ['browserSync', 'watch'], cb)
});
// Staying true to the mySpaceBase theme ;)
gulp.task('launch', function (cb) {
    runSequence('default', ['browserSync', 'watch'], cb)
});
