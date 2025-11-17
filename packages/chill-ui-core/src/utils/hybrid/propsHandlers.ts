import { StyleProp } from 'react-native';

import { isNativeWindInstalled } from './nativewindDetector';

const HAS_NATIVEWIND = isNativeWindInstalled();

export const classNameHandler = (className = '') => (HAS_NATIVEWIND ? { className } : undefined);

export const styleHandler = ({ defaultStyle, style }: { style?: StyleProp<any>; defaultStyle?: StyleProp<any> }) => ({
  style: !HAS_NATIVEWIND ? [defaultStyle, style].flat() : style,
});
