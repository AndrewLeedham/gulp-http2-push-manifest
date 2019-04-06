const shellMatchers = require('jest-shell-matchers');

const date = '\\[[0-9]{2}:[0-9]{2}:[0-9]{2}\\]';
const time = '[0-9]{1,3} ms';
const version = 'v?[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}';
const yarn = (task) => `yarn run ${version}\\s*\\$ gulp ${task}.+`;
const using = `${date} Using gulpfile.+`;
const starting = (task) => `${date} Starting '${task}'\\.\\.\\.`;
const finished = (task) => `${date} Finished '${task}' after ${time}`;
const done = 'Done in [0-9]{1,2}\\.[0-9]{1,3}s\\.';

jest.setTimeout(10000);

beforeAll(() => {
  shellMatchers();
});

test('running with gulp 3.9.1', async () => {
  const options = { env: { GULP_MODULE_NAME: `gulp-3.9.1` } };
  const input = [
    'yarn',
    ['run', `gulp`, 'example', '--gulpfile', `./GulpFile.3.9.1.js`],
    options
  ];
  const output = {
    code: 0,
    signal: '',
    stdout: new RegExp(
      `^${yarn('example')}\\s*${using}\\s*${starting('example')}\\s*${finished(
        'example'
      )}\\s*${done}\\s*$`
    )
  };
  await expect(input).toHaveMatchingSpawnOutput(output);
});

test('running with gulp 4.0.0', async () => {
  const options = { env: { GULP_MODULE_NAME: `gulp-4.0.0` } };
  const input = [
    'yarn',
    ['run', `gulp`, 'example', '--gulpfile', `./GulpFile.4.0.0.js`],
    options
  ];
  const output = {
    code: 0,
    signal: '',
    stdout: new RegExp(
      `^${yarn('example')}\\s*${using}\\s*${starting('example')}\\s*${starting(
        'generateManifest'
      )}\\s*${finished('generateManifest')}\\s*${finished(
        'example'
      )}\\s*${done}\\s*$`
    )
  };
  await expect(input).toHaveMatchingSpawnOutput(output);
});
