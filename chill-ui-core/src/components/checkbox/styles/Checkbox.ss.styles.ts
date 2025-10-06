import { sv } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  contentCheckBox: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    padding: 4,
  },
  isDisabled: {
    opacity: 0.5,
  },
  label: {
    color: '#000000',
    marginLeft: 8,
  },
  pointerEventsNone: {
    pointerEvents: 'none',
  },
  pressable: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export const checkboxSv = sv({
  base: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    padding: 4,
  },
  variants: {
    isChecked: {
      false: {
        backgroundColor: '#FFFFFF',
        borderColor: '#D1D5DB',
      },
      true: {
        backgroundColor: '#7DD3FC',
        borderColor: '#7DD3FC',
      },
    },
    isDisabled: {
      true: {
        opacity: 0.5,
      },
    },
    size: {
      '2xl': {
        height: 28,
        width: 28,
      },
      lg: {
        height: 24,
        width: 24,
      },
      md: {
        height: 20,
        width: 20,
      },
      sm: {
        height: 16,
        width: 16,
      },
      xl: {
        height: 28,
        width: 28,
      },
      xs: {
        height: 12,
        width: 12,
      },
    },
    variant: {
      circle: {
        borderRadius: 9999,
      },
      square: {
        borderRadius: 4,
      },
    },
  },
});
