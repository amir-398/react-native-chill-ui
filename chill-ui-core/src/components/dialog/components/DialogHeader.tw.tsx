import type { DialogHeaderPropsTw } from '@types';

import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { IconTw } from '@components/icon';

import { DialogClose } from './DialogClose.tw';
import { dialogHeaderTv } from '../styles/Dialog.tw.styles';

/**
 * DialogHeader component that renders a styled header section at the top of the dialog.
 * Can include a close mark when hasCloseMark is true.
 *
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogHeader hasCloseMark>
 *     <DialogTitle>Confirm Action</DialogTitle>
 *   </DialogHeader>
 *   <String>Are you sure you want to proceed?</String>
 * </DialogContent>
 * ```
 *
 * @param children - Header content (typically DialogTitle)
 * @param closeMarkProps - Custom close mark props
 * @param hasCloseMark - Whether to show close mark in header
 * @param className - (only NativeWind) Additional CSS classes for the header
 * @param style - Style object for the header container
 */
export function DialogHeader({ children, className, closeMarkProps, hasCloseMark, ...rest }: DialogHeaderPropsTw) {
  return (
    <BoxTw className={cn(dialogHeaderTv({ children: !!children, hasCloseMark }), className)} {...rest}>
      {children}
      {hasCloseMark && (
        <DialogClose asChild>
          <IconTw name="xmark-solid" size="sm" {...closeMarkProps} />
        </DialogClose>
      )}
    </BoxTw>
  );
}

DialogHeader.displayName = 'DialogHeader';
