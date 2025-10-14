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
