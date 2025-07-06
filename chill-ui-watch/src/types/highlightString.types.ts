import { StyleProp, TextStyle } from 'react-native';

import { StringProps } from './string.types';

export interface HighlightStringProps {
  text: string;
  className?: string;
  highlightTerm: string;
  highlightClassName?: string;
  style?: StyleProp<TextStyle>;
  highlightStyle?: StyleProp<TextStyle>;
  stringProps: Omit<StringProps, 'children' | 'style' | 'className'>;
  highlightStringProps?: Omit<StringProps, 'children' | 'style' | 'className'>;
}
