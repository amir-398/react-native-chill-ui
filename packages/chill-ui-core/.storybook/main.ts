import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": ['@storybook/addon-docs'],
  "framework": {
    "name": "@storybook/react-native-web-vite",
    "options": {
      pluginReactOptions: {
        jsxImportSource: "nativewind",
      },
    }
  }
};
export default config

