import { memo } from 'react';
import { StringTw } from '@components/string';
import { HighlightStringPropsTw } from '@types';

import { twStyles } from '../styles/HightlightString.variants';

/**
 * HighlightString component that highlights specific terms within text.
 *
 * @example
 * ```tsx
 * <HighlightString
 *   content="Hello world, welcome to the world of programming"
 *   highlightTerm="world"
 *   className="text-base text-gray-800"
 *   highlightClassName="bg-yellow-200 font-bold"
 * />
 * ```
 *
 * @param content - The full text to display
 * @param highlightTerm - The term to highlight within the text
 * @param className - Custom CSS classes for the container
 * @param highlightClassName - Custom CSS classes for highlighted text
 * @param style - Custom styles for the container
 * @param highlightStyle - Custom styles for highlighted text (StyleSheet only)
 * @param stringProps - Props for the main string component
 * @param highlightStringProps - Props for the highlighted string component
 * @returns Text with highlighted terms
 */
function HighlightString(props: HighlightStringPropsTw) {
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
      <StringTw className={className} style={style} {...stringProps}>
        {content}
      </StringTw>
    );
  }

  const escapedHighlightTerm = highlightTerm.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlightTerm})`, 'gi');
  const parts = content.split(regex);

  return (
    <StringTw useFastText={false} className={className} style={style} {...stringProps}>
      {parts.map((part, i) => {
        if (part.toLowerCase() === highlightTerm.toLowerCase()) {
          return (
            <StringTw
              key={i}
              useFastText={false}
              className={highlightClassName ?? twStyles.defaultHighlightClassName}
              style={highlightStyle}
              {...highlightStringProps}
            >
              {part}
            </StringTw>
          );
        }
        return part;
      })}
    </StringTw>
  );
}

HighlightString.displayName = 'HighlightString';

export default memo(HighlightString);
