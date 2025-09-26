import { sv } from '@utils';
import { StyleSheet } from 'react-native';

// StyleSheet styles for fallback without NativeWind
export const styles = StyleSheet.create({
  iconBase: {
    alignSelf: 'flex-start',
    flexShrink: 1,
  },
});

export const iconSizeSv = sv({
  variants: {
    size: {
      '2xl': { height: 36, width: 36 },
      '2xs': { height: 12, width: 12 },
      '3xl': { height: 40, width: 40 },
      lg: { height: 28, width: 28 },
      md: { height: 24, width: 24 },
      sm: { height: 20, width: 20 },
      xl: { height: 32, width: 32 },
      xs: { height: 16, width: 16 },
    },
  },
});

export const iconPaddingSv = sv({
  base: { padding: 8 },
  variants: {
    pressEffectSize: {
      '2xl': { padding: 20 },
      '2xs': { padding: 1 },
      '3xl': { padding: 24 },
      lg: { padding: 12 },
      md: { padding: 8 },
      sm: { padding: 6 },
      xl: { padding: 16 },
      xs: { padding: 2 },
    },
  },
});

export const iconPressEffectSv = sv({
  base: { borderRadius: 999 },
  variants: {
    pressed: {
      false: { backgroundColor: 'transparent' },
      true: { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
    },
  },
});
