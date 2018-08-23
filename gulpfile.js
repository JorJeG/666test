const gulp = require('gulp'),
      pug = require('gulp-pug'),
      del = require('del'),
      sass = require('gulp-sass'),
      csso = require('gulp-csso'),
      prefixer = require('gulp-autoprefixer'),
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

gulp.task('html', gulp.series(cleanHTML, buildHTML));
gulp.task('css', buildCSS);

function watch() {
  gulp.watch('./src/sass/**/*.scss', buildCSS);
  gulp.watch('./src/templates/**/*.pug').on('change', browserSync.reload);
}

gulp.task('default', gulp.series(buildCSS, watch));