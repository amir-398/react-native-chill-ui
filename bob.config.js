// Base Bob configuration
const baseConfig = {
  exclude: ['example/**', '.storybook/**', 'stories/**', 'node_modules/**', 'dist/**', 'assets/**', '.expo/**'],
  output: 'lib',
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
    output: 'generated/core-hybrid/lib',
    source: 'chill-ui-core/src',
  },

  // TailwindCSS only build
  tailwind: {
    ...baseConfig,
    output: 'generated/core-tailwind/lib',
    source: 'chill-ui-core/src',
    // Override source files to use .tw versions
    transforms: {
      // Transform index to use tw version
      'index.js': 'index.tw.js',
    },
  },

  // StyleSheet only build
  stylesheet: {
    ...baseConfig,
    output: 'lib',
    source: '../../chill-ui-core/src',
    // Override source files to use .ss versions
    transforms: {
      // Transform index to use ss version
      'index.js': 'index.ss.js',
    },
  },
};

// Export based on environment variable
const buildType = process.env.BUILD_TYPE || 'hybrid';
console.log('buildType', buildType);
module.exports = configs[buildType];
