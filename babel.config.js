module.exports = function babelConfig(api) {
  api.cache(true);
  const plugins = [];

  return {
    plugins,
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
  };
};
