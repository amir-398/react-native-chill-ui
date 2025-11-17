import type { DialogTitlePropsTw } from '@types';

import { cn, isString } from '@utils';
import { StringTw } from '@components/string';

import { twStyles } from '../styles/Dialog.tw.styles';

/**
 * DialogTitle component that renders a styled title section.
 * Can accept string children directly or custom React elements.
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
  const { children, className, ...rest } = props;

  return isString(children) ? (
    <StringTw className={cn(twStyles.title, className)} size="lg" font="primarySemiBold" {...rest}>
      {children}
    </StringTw>
  ) : (
    children
  );
}

DialogTitle.displayName = 'DialogTitle';
