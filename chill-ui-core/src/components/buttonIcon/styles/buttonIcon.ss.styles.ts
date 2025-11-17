import { sv } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pointerEventsNone: {
    pointerEvents: 'none',
  },
});

export const buttonIconSv = sv({
  base: {
    alignItems: 'center',
    backgroundColor: '#7DD3FC',
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    padding: 8,
  },
  variants: {
    isDisabled: {
      true: {
        opacity: 0.4,
      },
    },
    isLoading: {
      true: {
        opacity: 0.4,
      },
    },
    rounded: {
      circle: {
        borderRadius: 9999,
      },
      square: {
        borderRadius: 6,
      },
    },
    variant: {
      contained: {
        borderColor: 'transparent',
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: '#7DD3FC',
      },
    },
  },
});
