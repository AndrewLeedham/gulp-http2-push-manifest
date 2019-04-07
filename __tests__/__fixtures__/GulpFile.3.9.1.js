const gulp = require('gulp-3.9.1');
const manifest = require('../../index.js');

gulp.task('example', () => {
  return gulp.src('two.html').pipe(manifest());
});
