'use strict'

// ---- includes
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var del = require('del');
var debug = require('gulp-debug');
var mainBowerFiles = require('main-bower-files');
var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var scss = require('postcss-scss');
var strip = require('gulp-strip-comments');
var ngrok = require('ngrok');
var psi = require('psi');
var site = '';

// ---- config
var config = {
  app: 'app/',
	dev: 'dev/',
  prod: 'prod/',
	dist: 'dist/',
  scss: 'scss/',
	bowerDir: 'bower_components/',
	bowerJS: mainBowerFiles('**/*.js'),
	bowerSCSS: mainBowerFiles('**/*.scss'),
	bowerCSS: mainBowerFiles('**/*.css')
};

// ---- browsersync
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'prod'
    }
  })
});

// ---- watchers
gulp.task('watch', function() {
  gulp.watch(config.app + '/scss/**/*.scss', ['sass'], browserSync.reload);
  gulp.watch(config.app + '/stylesheets/*.css', ['stylesheets'], browserSync.reload);
  gulp.watch(config.app + '/css/*.css', ['css'], browserSync.reload);
  gulp.watch(config.app + '/*.html', ['index'], browserSync.reload);
  gulp.watch(config.app + '/js/**/*.js', ['js'], browserSync.reload);
  gulp.watch(config.app + '/images/*', ['images'], browserSync.reload);
});

// ---- google page speed insights
gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(3000, function (err, url) {
    site = url;
    console.log('Serving your tunnel from: ' + site);
    cb();
  });
});

gulp.task('psi-desktop', function (cb) {
  psi(site, {
    nokey: 'true',
    strategy: 'desktop'
  }, cb);
});

gulp.task('psi-mobile', function (cb) {
  psi(site, {
    nokey: 'true',
    strategy: 'mobile'
  }, cb);
});

// ---- tasks
gulp.task('move-bower-js', function() {
    return gulp.src(config.bowerJS, { base: config.bowerDir })
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(config.prod + '/minified/js/'))
});

gulp.task('move-bower-scss', function() {
    return gulp.src(config.bowerSCSS, { base: config.bowerDir })
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(debug())
      .pipe(concatCss('vendor.min.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(config.prod + '/minified/css'))
});

gulp.task('move-bower-css', function() {
    return gulp.src(config.bowerCSS, { base: config.bowerDir })
      .pipe(debug())
      .pipe(concatCss('normalize.min.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(config.prod + '/minified/css'))
});

gulp.task('move-bower-dir', function() {
    return gulp.src(config.bowerDir + '/**')
      .pipe(gulp.dest(config.prod + 'bower_components/'))
});

gulp.task('images', function() {
  return gulp.src(config.app + '/images/*')
    .pipe(gulp.dest(config.prod + '/images'))
});

gulp.task('sass', function() {
  return gulp.src(config.app + 'scss/**/*.scss')
    .pipe(sass())
    .pipe(postcss([
        autoprefixer({
          browsers: ['last 5 versions']
        })
    ], {syntax: scss}))
    .pipe(gulp.dest(config.app + '/css'))
    .pipe(gulp.dest(config.prod + '/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('stylesheets', ['move-bower-css', 'move-bower-scss', 'sass'], function() {
  return gulp.src(config.app + '/stylesheets/*.css')
    .pipe(concatCss('bundle.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.prod + '/minified/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('css', ['move-bower-css', 'move-bower-scss', 'sass'], function() {
  return gulp.src(config.app + '/css/*.css')
    .pipe(concatCss('bundle.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.prod + '/minified/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', ['move-bower-js'], function() {
  return gulp.src(config.app + '/js/*.js')
    .pipe(gulp.dest(config.prod + '/js/'))
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.prod + '/minified/js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('minify-css', function () {
   return gulp.src(config.app + '/css/*.css')
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.prod + '/minified/css/'))
        .pipe(browserSync.reload({
            stream: true
          }));
});

gulp.task('minify-js', function () {
   return gulp.src(config.app + '/js/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.prod + '/minified/js/'))
        .pipe(browserSync.reload({
            stream: true
          }));
});

gulp.task('minify-html', function () {
   return gulp.src(config.app + '*.html')
        .pipe(htmlmin({
          caseSensitive: true,
          collapseWhitespace: true,
          removeComments: true
          }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.prod + '/minified/'))
        .pipe(browserSync.reload({
            stream: true
          }));
});

gulp.task('clean:prod', function() {
  return del.sync('prod');
})


// ---- bower inject
gulp.task('index', function() {
  var target = gulp.src(config.app + '*.html');
  var sources = gulp.src([config.prod + '/minified/**/vendor.min.js', config.prod + 'minified/**/*.js', config.prod + 'minified/**/*.css'], {read: false}, {relative: false});
  return target.pipe(inject(sources, {ignorePath: config.prod}))
      .pipe(strip())
      .pipe(gulp.dest(config.prod))
      .pipe(browserSync.reload({
        stream: true
      }));
});

// ---- task commands
gulp.task('default', function(cb){
	runSequence('clean:prod', ['css', 'js', 'move-bower-dir', 'images', 'minify-css', 'minify-js', 'minify-html'], 'index', cb);
});

gulp.task('launch', function(cb) {
  runSequence('default', ['browserSync'], 'watch', cb)
});

gulp.task('dev', function(cb) {
  runSequence('default', ['browserSync'], 'watch', cb)
});

gulp.task('psi', function(cb) {
  runSequence('default', ['ngrok-url', 'psi-desktop', 'psi-mobile'], cb);
});
