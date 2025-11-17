import { sv } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
    zIndex: 50,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export const wrapperSv = sv({
  compoundVariants: [
    {
      fill: true,
      grow: true,
      style: {
        flex: 0,
        flexGrow: 1,
      },
    },
  ],
  defaultVariants: {
    fill: true,
    px: 'md',
  },
  variants: {
    fill: {
      true: {
        flex: 1,
      },
    },
    grow: {
      true: {
        flexGrow: 1,
      },
    },
    /**
     * Padding horizontal
     */
    px: {
      lg: {
        paddingHorizontal: 24,
      },
      md: {
        paddingHorizontal: 16,
      },
      none: {
        paddingHorizontal: 0,
      },
      sm: {
        paddingHorizontal: 8,
      },
      xl: {
        paddingHorizontal: 32,
      },
      xs: {
        paddingHorizontal: 4,
      },
    },
  },
});
