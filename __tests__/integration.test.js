const shellMatchers = require('jest-shell-matchers');

const date = '\\[[0-9]{2}:[0-9]{2}:[0-9]{2}\\]';
const time = '[0-9]{1,3} ms';
const version = 'v?[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}';
const yarn = (task) => `yarn run ${version}\\s*\\$ gulp ${task}.+`;
const working = `${date} Working directory changed to.+`;
const using = `${date} Using gulpfile.+`;
const starting = (task) => `${date} Starting '${task}'\\.\\.\\.`;
const finished = (task) => `${date} Finished '${task}' after ${time}`;
const done = 'Done in [0-9]{1,2}\\.[0-9]{1,3}s\\.';

beforeAll(() => {
  shellMatchers();
});

const versions = [
  {
    version: '3.9.1',
    match: `^${yarn('example')}\\s*${working}\\s*${using}\\s*${starting(
      'example'
    )}\\s*${finished('example')}\\s*${done}\\s*$`
  },
  {
    version: '4.0.0',
    match: `^${yarn('example')}\\s*${working}\\s*${using}\\s*${starting(
      'example'
    )}\\s*${starting('generateManifest')}\\s*${finished(
      'generateManifest'
    )}\\s*${finished('example')}\\s*${done}\\s*$`
  }
];

for (const { version, match } of versions) {
  test(`running with gulp ${version}`, async () => {
    const options = { env: { GULP_MODULE_NAME: `gulp-${version}` } };
    const input = [
      'yarn',
      [
        'run',
        'gulp',
        'example',
        '--gulpfile',
        `./__tests__/__fixtures__/GulpFile.${version}.js`
      ],
      options
    ];
    const output = {
      code: 0,
      signal: '',
      stdout: new RegExp(match)
    };
    await expect(input).toHaveMatchingSpawnOutput(output);
  });
}
