import type { DialogFooterPropsTw } from '@types';

import { cn } from '@utils';
import { BoxTw } from '@components/box';

import { twStyles } from '../styles/Dialog.tw.styles';

/**
 * DialogFooter component that renders a styled footer section at the bottom of the dialog.
 * Typically used for action buttons. Automatically styled with top border and proper padding.
 *
 * @example
 * ```tsx
 * <DialogFooter>
 *   <DialogClose asChild>
 *     <Button title="Cancel" />
 *   </DialogClose>
 *   <Button title="Confirm" onPress={handleConfirm} />
 * </DialogFooter>
 * ```
 *
 * @param children - Footer content (typically buttons)
 * @param className - (only NativeWind) Additional CSS classes for the footer
 * @param style - Style object for the footer container
 */
export function DialogFooter({ children, className, style, ...rest }: DialogFooterPropsTw) {
  return (
    <BoxTw className={cn(twStyles.footer, className)} style={style} {...rest}>
      {children}
    </BoxTw>
  );
}

DialogFooter.displayName = 'DialogFooter';
