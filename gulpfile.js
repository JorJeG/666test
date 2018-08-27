const gulp = require('gulp'),
      pug = require('gulp-pug'),
      del = require('del'),
      sass = require('gulp-sass'),
      csso = require('gulp-csso'),
      prefixer = require('gulp-autoprefixer'),
      bro = require('gulp-bro'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      browserSync = require('browser-sync');

browserSync.init({
  proxy: 'localhost:3001'
});

function buildHTML() {
  return gulp.src('./src/templates/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./build'));
}

function cleanHTML() {
  return del(['build/index.html']);
}

function buildCSS() {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(prefixer())
    .pipe(csso())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
}

function buildJS() {
  return gulp.src('./src/js/*.js')
    .pipe(bro())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
}

function watch() {
  gulp.watch('./src/sass/**/*.scss', buildCSS);
  gulp.watch('./src/templates/**/*.pug').on('change', browserSync.reload);
}

gulp.task('default', gulp.series(gulp.parallel(buildCSS, buildJS), watch));