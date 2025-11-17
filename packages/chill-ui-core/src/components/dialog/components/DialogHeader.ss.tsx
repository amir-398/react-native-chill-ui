import type { DialogHeaderPropsSs } from '@types';

import { BoxSs } from '@components/box';
import { IconSs } from '@components/icon';

import { DialogClose } from './DialogClose.ss';
import { dialogHeaderSv } from '../styles/Dialog.ss.styles';

/**
 * DialogHeader component that renders a styled header section at the top of the dialog.
 * Can include a close mark when hasCloseMark is true.
 *
 * @example
 * ```tsx
 * <DialogHeader hasCloseMark>
 *   <DialogTitle>Confirm Action</DialogTitle>
 * </DialogHeader>
 * ```
 *
 * @param children - Header content (typically DialogTitle)
 * @param closeMarkProps - Custom close mark props
 * @param hasCloseMark - Whether to show close mark in header
 * @param style - Style object for the header container
 */
export function DialogHeader(props: DialogHeaderPropsSs) {
  const { children, closeMarkProps, hasCloseMark, style, ...rest } = props;
  return (
    <BoxSs style={[dialogHeaderSv({ children: !!children, hasCloseMark }), style]} {...rest}>
      {children}
      {hasCloseMark && (
        <DialogClose asChild>
          <IconSs name="xmark-solid" size="sm" {...closeMarkProps} />
        </DialogClose>
      )}
    </BoxSs>
  );
}

DialogHeader.displayName = 'DialogHeader';
