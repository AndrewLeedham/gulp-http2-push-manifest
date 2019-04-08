const shellMatchers = require('jest-shell-matchers');

const date = '\\[[0-9]{2}:[0-9]{2}:[0-9]{2}\\]';
const name = 'gulp-http2-push-manifest:';
const time = '[0-9]{1,3} ms';
const version = 'v?[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}';
const yarn = (task) => `yarn run ${version}\\s*\\$ gulp ${task}.+`;
const working = `${date} Working directory changed to.+`;
const using = `${date} Using gulpfile.+`;
const starting = (task) => `${date} Starting '${task}'\\.\\.\\.`;
const found = `${name}  Found 2 resource URLs in two.html:\\s*${name}\\s*/styles.css\\s*${name}\\s*/script.js`;
const finished = (task) => `${date} Finished '${task}' after ${time}`;
const done = 'Done in [0-9]{1,2}\\.[0-9]{1,3}s\\.';

beforeAll(() => {
  shellMatchers();
});

test(`console output`, async () => {
  const input = [
    'yarn',
    [
      'run',
      'gulp',
      'example',
      '--gulpfile',
      `./__tests__/__fixtures__/GulpFile.js`
    ]
  ];
  const output = {
    code: 0,
    signal: '',
    stdout: new RegExp(
      `^${yarn('example')}\\s*${working}\\s*${using}\\s*${starting(
        'example'
      )}\\s*${starting('generateManifest')}\\s*${finished(
        'generateManifest'
      )}\\s*${finished('example')}\\s*${done}\\s*$`
    )
  };
  await expect(input).toHaveMatchingSpawnOutput(output);
});

test(`verbose console output`, async () => {
  const input = [
    'yarn',
    [
      'run',
      'gulp',
      'example',
      '--gulpfile',
      `./__tests__/__fixtures__/GulpFile.verbose.js`
    ]
  ];
  const output = {
    code: 0,
    signal: '',
    stdout: new RegExp(
      `^${yarn('example')}\\s*${working}\\s*${using}\\s*${starting(
        'example'
      )}\\s*${starting('generateManifest')}\\s*${found}\\s*${finished(
        'generateManifest'
      )}\\s*${finished('example')}\\s*${done}\\s*$`
    )
  };
  await expect(input).toHaveMatchingSpawnOutput(output);
});
