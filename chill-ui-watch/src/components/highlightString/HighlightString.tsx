import { memo } from 'react';

import String from '../string';
import { HighlightStringProps } from '../../types';

function HighlithString({
  className,
  highlightClassName,
  highlightStringProps,
  highlightStyle,
  highlightTerm,
  stringProps,
  style,
  text,
}: HighlightStringProps) {
  if (!highlightTerm.trim()) {
    return (
      <String className={className} style={style} {...stringProps}>
        {text}
      </String>
    );
  }

  const escapedHighlightTerm = highlightTerm.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlightTerm})`, 'gi');
  const parts = text.split(regex);

  return (
    <String useFastText={false} style={style} className={className} {...stringProps}>
      {parts.map((part, i) => {
        if (part.toLowerCase() === highlightTerm.toLowerCase()) {
          return (
            <String
              key={i}
              useFastText={false}
              className={highlightClassName}
              style={highlightStyle ?? { backgroundColor: '#FFE4B5' }}
              {...stringProps}
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

HighlithString.displayName = 'HighlithString';

export default memo(HighlithString);
