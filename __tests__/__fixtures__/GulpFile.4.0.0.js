const gulp = require('gulp-4.0.0');
const manifest = require('../../index.js');

function generateManifest() {
  return gulp.src('two.html').pipe(manifest());
}

gulp.task('example', gulp.series(generateManifest));
