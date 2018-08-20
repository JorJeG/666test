const gulp = require('gulp'),
      pug = require('gulp-pug'),
      del = require('del');

function buildHTML() {
  return gulp.src('./src/templates/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./build'));
};

function cleanHTML() {
  return del(['build/index.html']);
}

gulp.task('pug', gulp.series(cleanHTML, buildHTML));