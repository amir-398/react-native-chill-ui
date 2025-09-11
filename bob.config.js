// Base Bob configuration
const baseConfig = {
  output: 'lib',
  exclude: ['example/**', '.storybook/**', 'stories/**', 'node_modules/**', 'dist/**', 'assets/**', '.expo/**'],
  targets: [
    'commonjs',
    'module',
    [
      'typescript',
      {
        project: 'tsconfig.build.json',
      },
    ],
  ],
};

// Configuration for different builds
const configs = {
  // Hybrid build (default)
  hybrid: {
    ...baseConfig,
    source: 'chill-ui-watch/src',
    output: 'lib',
  },

  // TailwindCSS only build
  tailwind: {
    ...baseConfig,
    source: 'chill-ui-watch/src',
    output: 'lib-tw',
    // Override source files to use .tw versions
    transforms: {
      // Transform index to use tw version
      'index.js': 'index.tw.js',
    },
  },

  // StyleSheet only build
  stylesheet: {
    ...baseConfig,
    source: 'chill-ui-core/core-stylesheet',
    output: 'lib-ss',
  },
};

// Export based on environment variable
const buildType = process.env.BUILD_TYPE || 'hybrid';
console.log('buildType', buildType);
module.exports = configs[buildType];
