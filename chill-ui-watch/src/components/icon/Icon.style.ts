import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Base styles
  base: {},

  // Icon size variants
  size2xl: {
    height: 36,
    width: 36,
  },
  size2xs: {
    height: 12,
    width: 12,
  },
  size3xl: {
    height: 40,
    width: 40,
  },
  sizeLg: {
    height: 28,
    width: 28,
  },
  sizeMd: {
    height: 24,
    width: 24,
  },
  sizeSm: {
    height: 20,
    width: 20,
  },
  sizeXl: {
    height: 32,
    width: 32,
  },
  sizeXs: {
    height: 16,
    width: 16,
  },

  // Padding variants for press effect
  padding2xl: {
    padding: 20,
  },
  padding2xs: {
    padding: 1,
  },
  padding3xl: {
    padding: 24,
  },
  paddingLg: {
    padding: 12,
  },
  paddingMd: {
    padding: 8,
  },
  paddingSm: {
    padding: 6,
  },
  paddingXl: {
    padding: 16,
  },
  paddingXs: {
    padding: 2,
  },

  pressableBase: {
    alignSelf: 'flex-start',
    flexShrink: 1,
  },

  pressableContainer: {
    borderRadius: 999,
  },

  // Press effect styles
  pressEffectDefault: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  transparent: {
    backgroundColor: 'transparent',
  },
});

export default styles;
