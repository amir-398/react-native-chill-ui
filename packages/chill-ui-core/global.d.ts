import { start } from '@storybook/react-native';

declare global {
  // eslint-disable-next-line
  var view: ReturnType<typeof start>;
  // eslint-disable-next-line
  var STORIES: any[];
}
