module.exports = function babelConfig(api) {
  api.cache(true);
  const plugins = ['@babel/plugin-transform-class-static-block'];

  // Check if NativeWind is available
  const isNativeWindAvailable = (() => {
    try {
      require('nativewind/babel');
      return true;
    } catch {
      return false;
    }
  })();

  const presets = [['babel-preset-expo', { jsxImportSource: isNativeWindAvailable ? 'nativewind' : undefined }]];

  // Add NativeWind preset only if available
  if (isNativeWindAvailable) {
    presets.push('nativewind/babel');
  }

  return {
    plugins,
    presets,
  };
};
