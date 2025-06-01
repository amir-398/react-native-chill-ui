import type { StringProps } from '../../types';

import cn from '../cn';
import { Text as NativeText } from './Text';
import { textColorVr, textFontVr, textPositionVr, textSizeVr, textVariantVr } from './styleVatiants';

export default function String(props: StringProps) {
  const { children, className, color, colorVariant = 'primary', font, position, size, variant, weight } = props;

  const dynamicClasses = cn(
    'flex-shrink',
    textSizeVr({ size }),
    textFontVr({ font, weight }),
    textColorVr({ color: colorVariant }),
    textPositionVr({ position }),
    textVariantVr({ variant }),
    className,
  );

  return (
    <NativeText {...props} className={dynamicClasses} style={{ ...(color && { color }) }}>
      {children}
    </NativeText>
  );
}
