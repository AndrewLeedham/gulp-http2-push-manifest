const through = require('through2');
const path = require('path');
const Manifest = require('http2-push-manifest/lib/manifest');
const fs = require('fs');

const PLUGIN_NAME = 'gulp-http2-push-manifest';
const DEFAULT_OPTIONS = {
  verbose: false,
  manifestName: undefined
};
const blocked = ['log', 'warn'];

var original = {};

function namespace(func, verbose) {
  if (!verbose) {
    console[func] = function() {};
  } else {
    console[func] = function() {
      var args = [].slice.call(arguments);
      args.unshift(`${PLUGIN_NAME}: `);
      original[func].apply(console, args);
    };
  }
}

function block(verbose) {
  for (let func of blocked) {
    original[func] = console[func];
    namespace(func, verbose);
  }
}

function unblock(verbose) {
  for (let func of Object.keys(original)) {
    console[func] = original[func];
  }
}

let jsonOutput = {};
// Adapted from https://github.com/GoogleChromeLabs/http2-push-manifest/blob/master/bin/http2-push-manifest#L114
function generateManifest(manifestName, files, singleFile) {
  if (!files.length) {
    return new Promise((resolve) => {
      let manifest = new Manifest({ name: manifestName });
      let fileContent = jsonOutput || manifest.fileContent;
      fs.writeFileSync(manifest.name, JSON.stringify(fileContent, null, 2));
      resolve();
    }).catch((err) => {
      console.warn(`${PLUGIN_NAME} ${err}`);
    });
  }

  let f = files[0];

  // Make a path if one wasn't given. e.g. basic.html -> ./basic.html
  if (f.indexOf(path.sep) === -1) {
    f = `.${path.sep}${f}`;
  }

  let basePath = f.slice(0, f.lastIndexOf(path.sep));
  let inputPath = f.slice(f.lastIndexOf(path.sep) + 1);

  if (!basePath || !inputPath) {
    console.warn(`${PLUGIN_NAME} Invalid path ${f}`);
    return;
  }

  let manifest = new Manifest({ basePath, inputPath, name: manifestName });
  return manifest
    .generate()
    .then((output) => {
      if (singleFile) {
        let fileContent = manifest.fileContent;
        fs.writeFileSync(manifest.name, JSON.stringify(fileContent, null, 2));
        return;
      }

      jsonOutput[inputPath] = output.file;

      // Remove processed file from list and proceed with next.
      files.shift();
      return generateManifest(manifestName, files, singleFile);
    })
    .catch((err) => {
      console.warn(`${PLUGIN_NAME} ${err}`);
    });
}

function gulpHttp2PushManifest(options) {
  var options = Object.assign(Object.create(null), DEFAULT_OPTIONS, options);

  var files = [];
  function transformFunction(file, _, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    var path;
    if (typeof file === 'string') {
      path = file;
    } else if (typeof file.path === 'string') {
      path = file.path;
    } else {
      console.warn(`${PLUGIN_NAME} Missing file path for ${file}`);
      return callback(null, file);
    }
    files.push(path);

    callback(null, file);
  }

  function flushFunction(callback) {
    block(options.verbose);

    generateManifest(options.manifestName, files, files.length < 2).then(
      function() {
        unblock(options.verbose);
        return callback();
      }
    );
  }
  return through.obj(transformFunction, flushFunction);
}

// Exporting the plugin main function
module.exports = gulpHttp2PushManifest;
