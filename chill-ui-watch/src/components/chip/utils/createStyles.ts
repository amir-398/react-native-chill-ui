import { StyleSheet } from 'react-native';

import styles from '../Chip.style';

/**
 * Creates StyleSheet styles equivalent to NativeWind classes
 * Used as fallback when NativeWind is not available
 */
const createChipStyles = (
  variant: string,
  rounded: string,
  size: string,
  badgeColor?: string,
  isChipHasIcon?: boolean,
) => {
  // Variant mapping
  const variantMap: Record<string, any> = {
    contained: styles.variantContained,
    outlined: styles.variantOutlined,
  };

  // Padding mapping - toujours le même padding comme en Tailwind (px-3 py-2)
  const paddingStyle = styles.padding;

  // Border radius mapping
  const roundedMap: Record<string, any> = {
    '2xl': styles.rounded2xl,
    '3xl': styles.rounded3xl,
    full: styles.roundedFull,
    lg: styles.roundedLg,
    md: styles.roundedMd,
    sm: styles.roundedSm,
    xl: styles.roundedXl,
  };

  // Size mapping for text
  const sizeMap: Record<string, any> = {
    '2xl': styles.size2xl,
    '2xs': styles.size2xs,
    lg: styles.sizeLg,
    md: styles.sizeMd,
    sm: styles.sizeSm,
    xl: styles.sizeXl,
    xs: styles.sizeXs,
  };

  const variantStyle = variantMap[variant] || styles.variantContained;
  const roundedStyle = roundedMap[rounded] || styles.roundedMd;
  const sizeStyle = sizeMap[size] || styles.sizeMd;

  return StyleSheet.create({
    chip: {
      ...styles.chipBase,
      ...variantStyle,
      ...paddingStyle,
      ...roundedStyle,
      backgroundColor: badgeColor || (variant === 'outlined' ? 'transparent' : '#7C9CBF'),
      borderColor: badgeColor || '#7C9CBF',
      flexDirection: isChipHasIcon ? 'row' : 'column',
    },
    text: {
      ...sizeStyle,
      color: variant === 'outlined' ? badgeColor || '#7C9CBF' : '#FFFFFF',
      fontWeight: '600',
    },
  });
};

export default createChipStyles;
