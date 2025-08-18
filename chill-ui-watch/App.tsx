import { Box } from '@/components';

// Import global.css only if NativeWind is available
try {
  require('nativewind');
  require('./global.css');
} catch {
  // NativeWind is not available, skip CSS import
  console.log('NativeWind not available, skipping global.css import');
}

export default function App() {
  // const StorybookUIRoot = view.getStorybookUI({
  //   storage: {
  //     getItem(key: string) {
  //       return AsyncStorage.getItem(key);
  //     },
  //     setItem(key: string, value: string) {
  //       return AsyncStorage.setItem(key, value);
  //     },
  //   },
  // });
  return <Box />;
}
