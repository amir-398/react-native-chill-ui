import { memo } from 'react';
import { String } from '@components/string';
import { HighlightStringPropsTw } from '@types';
import { classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import { styles } from '../styles/HightlightString.ss.styles';
import { twStyles } from '../styles/HightlightString.tw.styles';

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
 *   className="text-base text-gray-800"
 *   highlightClassName="bg-yellow-200 font-bold"
 * />
 * ```
 *
 * @param className - Custom CSS classes for the container (NativeWind)
 * @param content - The full text to display
 * @param highlightClassName - Custom CSS classes for highlighted text (NativeWind)
 * @param highlightStringProps - Props for the highlighted string component
 * @param highlightStyle - Custom styles for highlighted text
 * @param highlightTerm - The term to highlight within the text
 * @param stringProps - Props for the main string component
 * @param style - Custom styles for the container
 */
function HighlightStringImpl(props: HighlightStringPropsTw) {
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

HighlightStringImpl.displayName = 'HighlightString';

export const HighlightString = memo(HighlightStringImpl);
