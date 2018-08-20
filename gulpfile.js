const gulp = require('gulp'),
      pug = require('gulp-pug'),
      del = require('del'),
      sass = require('gulp-sass'),
      prefixer = require('gulp-autoprefixer'),
      sourcemap = require('gulp-sourcemaps');

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
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(sourcemap.write())
    .pipe(prefixer())
    .pipe(gulp.dest('./build'))
}

gulp.task('html', gulp.series(cleanHTML, buildHTML));
gulp.task('css', buildCSS);