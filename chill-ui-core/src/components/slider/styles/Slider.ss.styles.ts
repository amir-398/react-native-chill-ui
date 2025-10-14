import { sv } from '@utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  label: {
    alignItems: 'center',
    backgroundColor: '#3f3f3f',
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
  },

  range: {
    backgroundColor: '#3f3f3f',
    borderRadius: 6,
    height: 6,
    position: 'absolute',
  },
  root: {
    height: 40,
    justifyContent: 'center',
  },
  rootVertical: {
    transform: [{ rotate: '-90deg' }],
  },
  thumb: {
    backgroundColor: '#3f3f3f',
    borderRadius: 10,
    height: 16,
    position: 'absolute',
    width: 16,
  },
  thumbOpacity: {
    opacity: 0.3,
  },
  touchOverlay: {
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  track: {
    backgroundColor: '#b3b3b3',
    borderRadius: 9999,
    height: 4,
  },
});

export const sliderLabelSv = sv({
  variants: {
    position: {
      bottom: {
        top: 30,
      },
      top: {
        bottom: 30,
      },
    },
  },
});
