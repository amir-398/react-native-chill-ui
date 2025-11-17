import { StringProps } from '../string/string.ss.types';

/**
 * Props for the HighlightString component
 */
export interface HighlightStringProps {
  /** The full text to display */
  content: string;
  /** The term to highlight within the text */
  highlightTerm: string;
  /** Custom styles for the container */
  style?: StringProps['style'];
  /** Custom styles for the highlighted text */
  highlightStyle?: StringProps['style'];
  /** Props for the main string component */
  stringProps?: Omit<StringProps, 'children' | 'style'>;
  /** Props for the highlighted string component */
  highlightStringProps?: Omit<StringProps, 'children' | 'style'>;
}
