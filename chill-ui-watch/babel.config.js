module.exports = function babelConfig(api) {
  api.cache(true);
  const plugins = ['@babel/plugin-transform-class-static-block'];

  return {
    plugins,

    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
  };
};
