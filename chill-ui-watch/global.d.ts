import { start } from '@storybook/react-native';

declare global {
  let view: ReturnType<typeof start>;
  let STORIES: any[];
}
