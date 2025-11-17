import { sv } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#7DD3FC',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipWithIcons: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconLeft: {
    marginRight: 6,
  },
  iconRight: {
    marginLeft: 6,
  },
  pointerEventsNone: {
    pointerEvents: 'none',
  },
});

export const chipSv = sv({
  base: {
    borderRadius: 6,
  },
  variants: {
    position: {
      center: {
        alignSelf: 'center',
      },
      left: {
        alignSelf: 'flex-start',
      },
      right: {
        alignSelf: 'flex-end',
      },
    },
    variant: {
      contained: {},
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
      },
    },
  },
});
