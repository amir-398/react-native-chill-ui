import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Base chip styles
  chipBase: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Variant styles
  variantContained: {
    backgroundColor: '#7C9CBF', // primary color fallback
    borderColor: 'transparent',
    borderWidth: 0,
  },
  variantOutlined: {
    backgroundColor: 'transparent',
    borderColor: '#7C9CBF', // primary color fallback
    borderWidth: 1,
  },

  // Padding variants
  paddingFalse: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  paddingTrue: {
    padding: 8,
  },

  // Border radius variants
  rounded2xl: {
    borderRadius: 16,
  },
  rounded3xl: {
    borderRadius: 24,
  },
  roundedFull: {
    borderRadius: 9999,
  },
  roundedLg: {
    borderRadius: 8,
  },
  roundedMd: {
    borderRadius: 6,
  },
  roundedSm: {
    borderRadius: 2,
  },
  roundedXl: {
    borderRadius: 12,
  },

  // Size variants for text
  size2xl: {
    fontSize: 20,
    lineHeight: 28,
  },
  size2xs: {
    fontSize: 10,
    lineHeight: 14,
  },
  sizeLg: {
    fontSize: 16,
    lineHeight: 24,
  },
  sizeMd: {
    fontSize: 14,
    lineHeight: 20,
  },
  sizeSm: {
    fontSize: 12,
    lineHeight: 16,
  },
  sizeXl: {
    fontSize: 18,
    lineHeight: 26,
  },
  sizeXs: {
    fontSize: 11,
    lineHeight: 15,
  },
});

export default styles;
