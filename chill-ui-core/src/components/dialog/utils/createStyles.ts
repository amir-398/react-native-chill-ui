import { StyleSheet } from 'react-native';

import styles from '../Dialog.style';

/**
 * Creates StyleSheet styles equivalent to NativeWind classes
 * Used as fallback when NativeWind is not available
 */
const createDialogStyles = (size: string, rounded: string) => {
  // Size mapping
  const sizeMap: Record<string, any> = {
    full: styles.sizeFull,
    lg: styles.sizeLg,
    md: styles.sizeMd,
    sm: styles.sizeSm,
    xl: styles.sizeXl,
  };

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

  const sizeStyle = sizeMap[size] || styles.sizeMd;
  const roundedStyle = roundedMap[rounded] || styles.roundedXl;

  return StyleSheet.create({
    backdrop: styles.backdrop,
    closeMarkLeft: styles.closeMarkLeft,
    closeMarkRight: styles.closeMarkRight,
    container: styles.container,
    dialog: {
      ...styles.dialogBase,
      ...sizeStyle,
      ...roundedStyle,
    },
  });
};

export default createDialogStyles;
