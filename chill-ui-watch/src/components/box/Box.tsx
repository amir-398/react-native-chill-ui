import type { ViewProps } from 'react-native';

import { View as NativeView } from './View';

export default function Box(props: ViewProps) {
  return <NativeView {...props} />;
}
