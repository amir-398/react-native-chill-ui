const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { generate } = require('@storybook/react-native/scripts/generate');

generate({
  configPath: path.resolve(__dirname, './.storybook'),
});

module.exports = (() => {
  const config = getDefaultConfig(__dirname, {
    isCSSEnabled: false,
  });

  const { resolver, transformer } = config;

  config.transformer = {
    ...transformer,
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg', 'mjs'],
  };

  // add storybook support
  config.resolver.resolverMainFields.unshift('sbmodern');

  // remove console.log
  config.transformer.minifierConfig.compress.drop_console = true;

  // storybook conf
  config.transformer.unstable_allowRequireContext = true;

  // Check if NativeWind is available and apply configuration if it is
  try {
    const { withNativeWind } = require('nativewind/metro');
    return withNativeWind(config, { input: './global.css' });
  } catch {
    // NativeWind is not available, return config without NativeWind
    console.log('NativeWind not found, skipping NativeWind configuration');

    // Add CSS handling for when NativeWind is not available
    config.resolver.assetExts.push('css');
    config.transformer.assetPlugins = config.transformer.assetPlugins || [];
    config.transformer.assetPlugins.push('expo-asset/tools/hashAssetFiles');

    return config;
  }
})();
