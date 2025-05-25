import type { StringProps } from '../../types';

import cn from '../cn';
import { Text as NativeText } from './Text';
import { textColorVr, textFontVr, textPositionVr, textSizeVr, textVariantVr } from './styleVatiants';

export default function String(props: StringProps) {
  const { children, className, color, font, position, size, variant, weight } = props;

  const dynamicClasses = cn(
    'flex-shrink',
    textSizeVr({ size }),
    textFontVr({ font, weight }),
    textColorVr({ color }),
    textPositionVr({ position }),
    textVariantVr({ variant }),
    className,
  );

  return (
    <NativeText {...props} className={dynamicClasses}>
      {children}
    </NativeText>
  );
}
