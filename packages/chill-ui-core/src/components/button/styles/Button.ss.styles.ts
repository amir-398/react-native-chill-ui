import { sv } from '@utils';
import { StyleSheet } from 'react-native';

// Main Button StyleSheet Variant
export const ButtonSv = sv({
  base: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
  },
  defaultVariants: {
    isDisabled: false,
    isLoading: false,
    position: 'center',
    size: 'md',
    variant: 'contained',
  },
  variants: {
    isDisabled: {
      true: { opacity: 0.4 },
    },
    isLoading: {
      true: { opacity: 0.4 },
    },
    position: {
      auto: { alignSelf: 'auto' },
      center: { alignSelf: 'center' },
      left: { alignSelf: 'flex-start' },
      right: { alignSelf: 'flex-end' },
    },
    size: {
      '2xl': { height: 64 },
      '2xs': { height: 28 },
      lg: { height: 48 },
      md: { height: 40 },
      sm: { height: 36 },
      xl: { height: 56 },
      xs: { height: 32 },
    },
    variant: {
      contained: {
        backgroundColor: '#7C9CBF',
        borderColor: 'transparent',
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: '#7C9CBF',
      },
      text: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
    },
  },
});

// Icon Container StyleSheet Variant
export const IconContainerSv = sv({
  compoundVariants: [
    {
      isAbsolute: false,
      position: 'left',
      style: { marginRight: 8 },
    },
    {
      isAbsolute: false,
      position: 'right',
      style: { marginLeft: 8 },
    },
    {
      isAbsolute: true,
      position: 'left',
      style: { left: 12 },
    },
    {
      isAbsolute: true,
      position: 'right',
      style: { right: 12 },
    },
  ],
  variants: {
    isAbsolute: {
      true: { position: 'absolute' },
    },
    position: {
      left: {},
      right: {},
    },
  },
});

export const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  pointerEventsNone: {
    pointerEvents: 'none',
  },
  stringContainer: {
    flex: 1,
    pointerEvents: 'none',
  },
});
