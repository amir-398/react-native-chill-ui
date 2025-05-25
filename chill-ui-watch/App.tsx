import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { view } from './.storybook/storybook.requires';
import './global.css';

export default function App() {
  const StorybookUIRoot = view.getStorybookUI({
    storage: {
      getItem(key) {
        return AsyncStorage.getItem(key);
      },
      setItem(key, value) {
        return AsyncStorage.setItem(key, value);
      },
    },
  });
  return (
    <View className="flex-1">
      <StorybookUIRoot />
    </View>
  );
}
