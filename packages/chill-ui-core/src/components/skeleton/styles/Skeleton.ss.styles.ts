import { sv } from '@utils';
import { StyleSheet } from 'react-native';

/**
 * Base StyleSheet styles for Skeleton component
 */
export const styles = StyleSheet.create({
  circle: {
    borderRadius: 32,
    height: 64,
    width: 64,
  },
  pulseAnimation: {
    opacity: 0.5,
  },
  rectangle: {
    borderRadius: 8,
    width: '100%',
  },
  sizeLg: {
    height: 192,
  },
  sizeMd: {
    height: 128,
  },
  sizeSm: {
    height: 96,
  },
  sizeXl: {
    height: 256,
  },
  sizeXs: {
    height: 64,
  },
  skeletonBase: {
    backgroundColor: '#D1D5DB',
  },
  square: {
    borderRadius: 8,
    height: 64,
    width: 64,
  },
  text: {
    borderRadius: 2,
    width: '100%',
  },
  textLg: {
    height: 28,
  },
  textMd: {
    height: 24,
  },
  textSm: {
    height: 20,
  },
  textXl: {
    height: 32,
  },
  textXs: {
    height: 16,
  },
});

/**
 * Skeleton style variants using sv
 */
export const skeletonSv = sv({
  base: {
    backgroundColor: '#D1D5DB',
  },
  compoundVariants: [
    {
      size: 'xs',
      style: { height: 64 },
      variant: 'rectangle',
    },
    {
      size: 'sm',
      style: { height: 96 },
      variant: 'rectangle',
    },
    {
      size: 'md',
      style: { height: 128 },
      variant: 'rectangle',
    },
    {
      size: 'lg',
      style: { height: 192 },
      variant: 'rectangle',
    },
    {
      size: 'xl',
      style: { height: 256 },
      variant: 'rectangle',
    },
    {
      size: 'xs',
      style: { height: 64, width: 64 },
      variant: 'square',
    },
    {
      size: 'sm',
      style: { height: 96, width: 96 },
      variant: 'square',
    },
    {
      size: 'md',
      style: { height: 128, width: 128 },
      variant: 'square',
    },
    {
      size: 'lg',
      style: { height: 192, width: 192 },
      variant: 'square',
    },
    {
      size: 'xl',
      style: { height: 256, width: 256 },
      variant: 'square',
    },
    {
      size: 'xs',
      style: { borderRadius: 32, height: 64, width: 64 },
      variant: 'circle',
    },
    {
      size: 'sm',
      style: { borderRadius: 48, height: 96, width: 96 },
      variant: 'circle',
    },
    {
      size: 'md',
      style: { borderRadius: 64, height: 128, width: 128 },
      variant: 'circle',
    },
    {
      size: 'lg',
      style: { borderRadius: 96, height: 192, width: 192 },
      variant: 'circle',
    },
    {
      size: 'xl',
      style: { borderRadius: 128, height: 256, width: 256 },
      variant: 'circle',
    },
    {
      size: 'xs',
      style: { height: 16 },
      variant: 'text',
    },
    {
      size: 'sm',
      style: { height: 20 },
      variant: 'text',
    },
    {
      size: 'md',
      style: { height: 24 },
      variant: 'text',
    },
    {
      size: 'lg',
      style: { height: 28 },
      variant: 'text',
    },
    {
      size: 'xl',
      style: { height: 32 },
      variant: 'text',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'rectangle',
  },
  variants: {
    size: {
      lg: { height: 192 },
      md: { height: 128 },
      sm: { height: 96 },
      xl: { height: 256 },
      xs: { height: 64 },
    },
    variant: {
      circle: { borderRadius: 64, height: 128, width: 128 },
      rectangle: { borderRadius: 8, width: '100%' },
      square: { borderRadius: 8, height: 128, width: 128 },
      text: { borderRadius: 2, width: '100%' },
    },
  },
});
