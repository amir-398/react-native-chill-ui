import { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: ['../stories/**/*.stories.mdx','../stories/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
    '@storybook/addon-ondevice-notes',
    "@storybook/addon-docs",
  ],
};

export default main;
