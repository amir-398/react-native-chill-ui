import { DialogTitlePropsTw } from '@types';
import { StringTw } from '@components/string';
import { classNameHandler, classNamePropsHandler, cn, isString, styleHandler } from '@utils';

import { styles } from '../styles/Dialog.ss.styles';
import { twStyles } from '../styles/Dialog.tw.styles';

/**
 * DialogTitle component that renders a styled title section.
 * Can accept string children directly or custom React elements.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <DialogTitle>Confirm Action</DialogTitle>
 * ```
 *
 * @param children - Title content (string or React element)
 * @param className - (only NativeWind) Additional CSS classes for the title
 * @param style - Style object for the title container
 */
export function DialogTitle(props: DialogTitlePropsTw) {
  classNamePropsHandler(props, 'DialogTitle');
  const { children, className, style, ...rest } = props;
  return isString(children) ? (
    <StringTw
      size="lg"
      font="primarySemiBold"
      {...classNameHandler(cn(twStyles.title, className))}
      {...styleHandler({ defaultStyle: styles.title, style })}
      {...rest}
    >
      {children}
    </StringTw>
  ) : (
    children
  );
}

DialogTitle.displayName = 'DialogTitle';
