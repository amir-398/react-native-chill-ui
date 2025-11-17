import { StyleSheet, ViewStyle, TextStyle, ImageStyle, StyleProp } from 'react-native';

// Pas besoin de définir Falsy, utilisez directement StyleProp
export const flattenStyle = <T extends ViewStyle | TextStyle | ImageStyle>(styles: StyleProp<T>): T | undefined =>
  StyleSheet.flatten(styles) as T | undefined;
