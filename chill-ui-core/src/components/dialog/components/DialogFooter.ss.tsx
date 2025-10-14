import type { DialogFooterPropsSs } from '@types';

import { BoxSs } from '@components/box';

import { styles } from '../styles/Dialog.ss.styles';

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
 * @param style - Style object for the footer container
 */
export function DialogFooter({ children, style, ...rest }: DialogFooterPropsSs) {
  return (
    <BoxSs style={[styles.footer, style]} {...rest}>
      {children}
    </BoxSs>
  );
}

DialogFooter.displayName = 'DialogFooter';
