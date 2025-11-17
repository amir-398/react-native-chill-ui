import { memo } from 'react';
import { StringSs } from '@components/string';
import { HighlightStringPropsSs } from '@types';

import { styles } from '../styles/HightlightString.ss.styles';

/**
 * The `<HighlightString />` component highlights specific terms within text.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { HighlightString } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <HighlightString
 *   content="Hello world, welcome to the world of programming"
 *   highlightTerm="world"
 *   style={{ fontSize: 16, color: '#374151' }}
 *   highlightStyle={{ backgroundColor: '#FEF3C7', fontWeight: 'bold' }}
 * />
 * ```
 *
 * @param content - The full text to display
 * @param highlightTerm - The term to highlight within the text
 * @param style - Custom styles for the container (StyleSheet only)
 * @param highlightStyle - Custom styles for highlighted text (StyleSheet only)
 * @param stringProps - Props for the main string component
 * @param highlightStringProps - Props for the highlighted string component
 * @returns Text with highlighted terms
 */
function HighlightStringImpl(props: HighlightStringPropsSs) {
  const { content, highlightStringProps, highlightStyle, highlightTerm, stringProps, style } = props;

  if (!highlightTerm.trim()) {
    return (
      <StringSs style={style} {...stringProps}>
        {content}
      </StringSs>
    );
  }

  const escapedHighlightTerm = highlightTerm.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlightTerm})`, 'gi');
  const parts = content.split(regex);

  return (
    <StringSs useFastText={false} style={style} {...stringProps}>
      {parts.map((part, i) => {
        if (part.toLowerCase() === highlightTerm.toLowerCase()) {
          return (
            <StringSs
              key={i}
              useFastText={false}
              style={highlightStyle ?? styles.defaultHighlightStyle}
              {...highlightStringProps}
            >
              {part}
            </StringSs>
          );
        }
        return part;
      })}
    </StringSs>
  );
}

HighlightStringImpl.displayName = 'HighlightString';

export const HighlightString = memo(HighlightStringImpl);
