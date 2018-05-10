const gulp     = require("gulp");
const manifest = require("gulp-http2-push-manifest");

gulp.task("example", () => {
    return gulp.src("index.html")
        .pipe(manifest());
});