const path = require('path');
const { withNativeWind } = require('nativewind/metro');
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

  return withNativeWind(config, { input: './global.css' });
})();
