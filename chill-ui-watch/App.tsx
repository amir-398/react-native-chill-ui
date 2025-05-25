import AsyncStorage from '@react-native-async-storage/async-storage';

import './global.css';
import { view } from './.storybook/storybook.requires';

export default function App() {
  const StorybookUIRoot = view.getStorybookUI({
    storage: {
      getItem(key: string) {
        return AsyncStorage.getItem(key);
      },
      setItem(key: string, value: string) {
        return AsyncStorage.setItem(key, value);
      },
    },
  });
  return <StorybookUIRoot />;
}
