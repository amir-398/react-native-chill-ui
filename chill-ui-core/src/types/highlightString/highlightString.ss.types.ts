import { StringPropsSs } from '../string';

/**
 * Props for the HighlightString component
 */
export interface HighlightStringProps {
  /** The full text to display */
  content: string;
  /** The term to highlight within the text */
  highlightTerm: string;
  /** Custom styles for the container */
  style?: StringPropsSs['style'];
  /** Custom styles for the highlighted text */
  highlightStyle?: StringPropsSs['style'];
  /** Props for the main string component */
  stringProps?: Omit<StringPropsSs, 'children' | 'style'>;
  /** Props for the highlighted string component */
  highlightStringProps?: Omit<StringPropsSs, 'children' | 'style'>;
}
