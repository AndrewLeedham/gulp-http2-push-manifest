const gulp = require('gulp-4.0.0');
const manifest = require('./index.js');

function generateManifest() {
  return gulp.src('./fixtures/index.html').pipe(manifest());
}

gulp.task('example', gulp.series(generateManifest));
