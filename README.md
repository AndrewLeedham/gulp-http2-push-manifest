# gulp-http2-push-manifest

> Generate a push manifest from a stream of html files. Wraps [http2-push-manifest][http2pm-link] into a [Gulp][gulp-link] plugin.

[![GitHub Actions Status][ci-badge]][ci-link] [![npm package][npm-badge]][npm-link] [![license MIT][license-badge]][license-link] [![commit style angular][commit-style-badge]][commit-style-link] [![semantic-release][semantic-release-badge]][semantic-release-link] [![Dependabot Status][dependabot-badge]][dependabot-link]

# Usage
gulp-http2-push-manifest provides a simple wrapper around [http2-push-manifest][http2pm-link] which generates a `push_manifest.json` file, listing static resources found on a web page.
```javascript
var manifest = require("gulp-http2-push-manifest");
 
// Generate push_manifest.json
gulp.src("./src/*.html")
  .pipe(manifest()); // Will generate push_manifest.json in the cwd, based on all streamed html files

// Generate push.json
gulp.src("./src/*.html")
  .pipe(manifest({manifestName: "push.json"})); // Will generate push.json in the cwd, based on all streamed html files

// Verbose output
gulp.src("./src/*.html")
  .pipe(manifest({verbose: true})); // Will allow http2-push-manifest's progress to be logged
```

---
[LICENSE][license-link] | [CHANGELOG][changelog-link] | [ISSUES][issues-link]

[ci-badge]: https://flat.badgen.net/github/status/AndrewLeedham/gulp-http2-push-manifest/master/Github%20Actions
[ci-link]: https://github.com/AndrewLeedham/gulp-http2-push-manifest/actions

[npm-badge]: https://flat.badgen.net/npm/v/gulp-http2-push-manifest?color=cyan
[npm-link]: https://www.npmjs.com/package/gulp-http2-push-manifest

[license-badge]: https://flat.badgen.net/npm/license/gulp-http2-push-manifest

[commit-style-badge]: https://flat.badgen.net/badge/commit%20style/angular/purple
[commit-style-link]: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines

[semantic-release-badge]: https://flat.badgen.net/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80/semantic%20release/e10079
[semantic-release-link]: https://github.com/semantic-release/semantic-release

[dependabot-badge]: https://api.dependabot.com/badges/status?host=github&repo=AndrewLeedham/gulp-http2-push-manifest
[dependabot-link]: https://dependabot.com


[gulp-link]: https://gulpjs.com/
[http2pm-link]: https://github.com/GoogleChromeLabs/http2-push-manifest
[license-link]: ./LICENSE
[changelog-link]: ./CHANGELOG.md
[issues-link]: https://github.com/AndrewLeedham/gulp-http2-push-manifest/issues
