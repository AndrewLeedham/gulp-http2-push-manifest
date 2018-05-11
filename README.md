# gulp-http2-push-manifest
A wrapper around [http2-push-manifest](https://github.com/GoogleChromeLabs/http2-push-manifest) for [gulp](https://github.com/wearefractal/gulp).

[![NPM](https://nodei.co/npm/gulp-http2-push-manifest.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-http2-push-manifest/)

[![devDependency Status](https://david-dm.org/AndrewLeedham/gulp-http2-push-manifest/dev-status.svg)](https://david-dm.org/AndrewLeedham/gulp-http2-push-manifest#info=devDependencies)

# Usage
gulp-http2-push-manifest provides a simple wrapper around [http2-push-manifest](https://github.com/GoogleChromeLabs/http2-push-manifest) which generates a `push_manifest.json` file, listing static resources found on a web page.
```javascript
var manifest = require("gulp-http2-push-manifest");
 
// Generate push_manifest.json
gulp.src("./src/*.html")
  .pipe(manifest()); // Will generate push_manifest.json in the cwd, based on all passed html files

// Generate push.json
gulp.src("./src/*.html")
  .pipe(manifest({manifestName: "push.json"})); // Will generate push.json in the cwd, based on all passed html files

// Verbose output
gulp.src("./src/*.html")
  .pipe(manifest({verbose: true})); // Will allow http2-push-manifest's progress to be logged
```

## License
[MIT License](LICENSE)

## TODO
- [x] Add basic implementation
- [x] Add usage to README
- [ ] Add unit testing
- [ ] Allow weights to be specified