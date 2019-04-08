const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const through = require('through2');

const consoleLogSpy = jest
  .spyOn(global.console, 'log')
  .mockImplementation(() => {});
const writeFileSyncSpy = jest
  .spyOn(fs, 'writeFileSync')
  .mockImplementation(() => {});
const manifest = require('..');

// Adapted from https://github.com/gulp-community/gulp-concat/blob/master/test/main.js#L12
function fixtures(glob) {
  return path.join(__dirname, '__fixtures__', glob);
}

// Inspired by https://github.com/floatdrop/stream-assert/blob/master/index.js#L49.
function end() {
  return through.obj((chunk, enc, callback) => callback());
}

async function run(file, options = undefined) {
  await new Promise((resolve) => {
    gulp
      .src(fixtures(file))
      .pipe(manifest(options))
      .pipe(end())
      .on('finish', resolve);
  });
}

beforeEach(async () => {
  jest.clearAllMocks();
});

for (const verbose of [true, false]) {
  const v = verbose ? ' - verbose' : '';
  const files = [
    { name: 'zero', number: 0 },
    { name: 'one', number: 1 },
    { name: 'two', number: 2 }
  ];
  for (const { name, number } of files) {
    test(`${number} manifest resources${v}`, async () => {
      await run(`${name}.html`, { verbose });

      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        'push_manifest.json',
        expect.any(String)
      );
      expect(writeFileSyncSpy.mock.calls[0][1]).toMatchSnapshot();
      if (verbose) {
        expect(consoleLogSpy).toHaveBeenCalledTimes(number + 1);
        expect(consoleLogSpy).toHaveBeenCalledWith(
          'gulp-http2-push-manifest: ',
          `Found ${number} resource URLs in ${name}.html:`
        );
      } else {
        expect(consoleLogSpy).not.toHaveBeenCalled();
      }
    });
  }
}

test('custom manifest name', async () => {
  await run('two.html', { manifestName: 'custom.json' });
  expect(writeFileSyncSpy).toHaveBeenCalledWith(
    'custom.json',
    expect.any(String)
  );
  expect(writeFileSyncSpy.mock.calls[0][1]).toMatchSnapshot();
});
