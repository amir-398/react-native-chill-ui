import { sv } from '@utils';
import { StyleSheet } from 'react-native';

const AvatarSv = sv({
  base: {
    alignItems: 'center',
    backgroundColor: '#7DD3FC',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  defaultVariants: {
    size: 'md',
    variant: 'circle',
  },
  variants: {
    size: {
      '2xl': { height: 112, width: 112 },
      '2xs': { height: 24, width: 24 },
      '3xl': { height: 128, width: 128 },
      lg: { height: 64, width: 64 },
      md: { height: 56, width: 56 },
      sm: { height: 48, width: 48 },
      xl: { height: 80, width: 80 },
      xs: { height: 36, width: 36 },
    },
    variant: {
      circle: { borderRadius: 9999 },
      square: { borderRadius: 8 },
    },
  },
});

const styles = StyleSheet.create({
  image: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
});

export { AvatarSv, styles };
