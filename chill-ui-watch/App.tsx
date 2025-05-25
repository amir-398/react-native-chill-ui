import { Text, View } from 'react-native';

import DevToolProvider from '@/utils/DevToolProvider';

import './global.css';

export default function App() {
  return (
    <DevToolProvider>
      <View className="flex-1">
        <Text>Hello</Text>
      </View>
    </DevToolProvider>
  );
}
