import { StyleProp, TextStyle } from 'react-native';

import { StringPropsTw } from '../string';

/**
 * Props for the HighlightString component
 */
export interface HighlightStringProps {
  /** The full text to display */
  content: string;
  /** Custom CSS classes for the container */
  className?: string;
  /** The term to highlight within the text */
  highlightTerm: string;
  /** Custom CSS classes for the highlighted text */
  highlightClassName?: string;
  /** Custom styles for the container */
  style?: StyleProp<TextStyle>;
  /** Custom styles for the highlighted text */
  highlightStyle?: StyleProp<TextStyle>;
  /** Props for the main string component */
  stringProps?: Omit<StringPropsTw, 'children' | 'style' | 'className'>;
  /** Props for the highlighted string component */
  highlightStringProps?: Omit<StringPropsTw, 'children' | 'style' | 'className'>;
}
