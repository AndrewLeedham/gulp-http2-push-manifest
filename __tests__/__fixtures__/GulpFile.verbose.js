const gulp = require('gulp');
const manifest = require('../../index.js');

function generateManifest() {
  return gulp.src('two.html').pipe(manifest({ verbose: true }));
}

gulp.task('example', gulp.series(generateManifest));
