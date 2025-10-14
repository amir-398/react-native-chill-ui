import { memo } from 'react';
import { String } from '@components/string';
import { HighlightStringPropsTw } from '@types';
import { classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import { styles } from '../styles/HightlightString.styles';
import { twStyles } from '../styles/HightlightString.variants';

/**
 * HighlightString component that highlights specific terms within text.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // With NativeWind
 * <HighlightString
 *   content="Hello world, welcome to the world of programming"
 *   highlightTerm="world"
 *   className="text-base text-gray-800"
 *   highlightClassName="bg-yellow-200 font-bold"
 * />
 *
 * // Without NativeWind (fallback)
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
 * @param className - Custom CSS classes for the container (NativeWind only)
 * @param highlightClassName - Custom CSS classes for highlighted text (NativeWind only)
 * @param style - Custom styles for the container
 * @param highlightStyle - Custom styles for highlighted text
 * @param stringProps - Props for the main string component
 * @param highlightStringProps - Props for the highlighted string component
 * @returns Text with highlighted terms with hybrid styling support
 */
function HighlightString(props: HighlightStringPropsTw) {
  classNamePropsHandler(props, 'HighlightString');

  const {
    className,
    content,
    highlightClassName,
    highlightStringProps,
    highlightStyle,
    highlightTerm,
    stringProps,
    style,
  } = props;

  if (!highlightTerm.trim()) {
    return (
      <String {...classNameHandler(className)} {...styleHandler({ style })} {...stringProps}>
        {content}
      </String>
    );
  }

  const escapedHighlightTerm = highlightTerm.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlightTerm})`, 'gi');
  const parts = content.split(regex);

  return (
    <String useFastText={false} {...classNameHandler(className)} {...styleHandler({ style })} {...stringProps}>
      {parts.map((part, i) => {
        if (part.toLowerCase() === highlightTerm.toLowerCase()) {
          return (
            <String
              key={i}
              useFastText={false}
              {...classNameHandler(highlightClassName ?? twStyles.defaultHighlightClassName)}
              {...styleHandler({ defaultStyle: highlightStyle ?? styles.defaultHighlightStyle, style: highlightStyle })}
              {...highlightStringProps}
            >
              {part}
            </String>
          );
        }
        return part;
      })}
    </String>
  );
}

HighlightString.displayName = 'HighlightString';

export default memo(HighlightString);
