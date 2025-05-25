import { useState } from 'react';
import { Modal } from 'react-native';
import { WebView } from 'react-native-webview';

import DevToolAction from './DevToolAction';

export default function ChillUStorybook() {
  const [isStorybook, setIsStorybook] = useState(false);

  const handleToggleStorybook = () => {
    setIsStorybook(!isStorybook);
  };

  return (
    <DevToolAction handleToggleStorybook={handleToggleStorybook}>
      <Modal visible={isStorybook} onRequestClose={handleToggleStorybook} animationType="slide">
        <WebView source={{ uri: 'http://localhost:8321/' }} style={{ flex: 1 }} useWebView2 />
        <DevToolAction handleToggleStorybook={handleToggleStorybook} />
      </Modal>
    </DevToolAction>
  );
}
