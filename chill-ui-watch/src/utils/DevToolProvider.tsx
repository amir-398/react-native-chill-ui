import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Box } from '../components';
import DevToolAction from './DevToolAction';
import { view } from '../../.storybook/storybook.requires';

export default function DevToolProvider({ children }: { children: React.ReactNode }) {
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
  const [isStorybook, setIsStorybook] = useState(false);

  const handleToggleStorybook = () => {
    setIsStorybook(!isStorybook);
  };

  return (
    <Box className="flex-1">
      <DevToolAction handleToggleStorybook={handleToggleStorybook} />
      {isStorybook ? <StorybookUIRoot /> : children}
    </Box>
  );
}
