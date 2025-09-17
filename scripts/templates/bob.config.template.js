// Bob configuration for {{CORE_NAME}}
module.exports = {
  exclude: ['example/**', '.storybook/**', 'stories/**', 'node_modules/**', 'dist/**', 'assets/**', '.expo/**'],
  output: 'lib',
  source: 'src',
  targets: [
    'commonjs',
    'module',
    [
      'typescript',
      {
        project: 'tsconfig.json',
        tsc: '../../node_modules/.bin/tsc',
      },
    ],
  ],
};
