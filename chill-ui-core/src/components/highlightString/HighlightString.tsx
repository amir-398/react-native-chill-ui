import { cn } from '@utils';
import { memo } from 'react';

import { classNamePropsHandler } from '@/utils/hybrid/classNamePropsHandler';
import { classNameHandler, styleHandler } from '@/utils/hybrid/propsHandlers';

import { String } from '../string';
import { HighlightStringProps } from '../../types/highlightString.types';
import { isNativeWindInstalled } from '../../utils/hybrid/nativewindDetector';

/**
 * HighlightString component that highlights specific terms within text.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // With NativeWind
 * <HighlightString
 *   text="Hello world, welcome to the world of programming"
 *   highlightTerm="world"
 *   className="text-base text-gray-800"
 *   highlightClassName="bg-yellow-200 font-bold"
 * />
 *
 * // Without NativeWind (fallback)
 * <HighlightString
 *   text="Hello world, welcome to the world of programming"
 *   highlightTerm="world"
 *   style={{ fontSize: 16, color: '#374151' }}
 *   highlightStyle={{ backgroundColor: '#FEF3C7', fontWeight: 'bold' }}
 * />
 * ```
 *
 * @param text - The full text to display
 * @param highlightTerm - The term to highlight within the text
 * @param className - Custom CSS classes for the container (NativeWind only)
 * @param highlightClassName - Custom CSS classes for highlighted text (NativeWind only)
 * @param style - Custom styles for the container (StyleSheet only)
 * @param highlightStyle - Custom styles for highlighted text (StyleSheet only)
 * @param stringProps - Props for the main string component
 * @param highlightStringProps - Props for the highlighted string component
 * @returns Text with highlighted terms
 */
function HighlightString(props: HighlightStringProps) {
  classNamePropsHandler(props, 'HighlightString');

  const {
    className,
    highlightClassName,
    highlightStringProps,
    highlightStyle,
    highlightTerm,
    stringProps,
    style,
    text,
  } = props;
  const isNativeWind = isNativeWindInstalled();

  const defaultHighlightStyle = {
    backgroundColor: '#FFE4B5',
  };

  if (!highlightTerm.trim()) {
    return (
      <String
        className={isNativeWind ? className : undefined}
        style={isNativeWind ? undefined : style}
        {...stringProps}
      >
        {text}
      </String>
    );
  }

  const escapedHighlightTerm = highlightTerm.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlightTerm})`, 'gi');
  const parts = text.split(regex);

  return (
    <String useFastText={false} {...classNameHandler(className)} {...styleHandler({ style })} {...stringProps}>
      {parts.map((part, i) => {
        if (part.toLowerCase() === highlightTerm.toLowerCase()) {
          return (
            <String
              key={i}
              useFastText={false}
              {...classNameHandler(cn({ 'bg-[#FFE4B5]': !highlightClassName }, highlightClassName))}
              {...styleHandler({ defaultStyle: highlightStyle ?? defaultHighlightStyle, style: highlightStyle })}
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
