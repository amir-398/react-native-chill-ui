import type { DialogFooterPropsTw } from '@types';

import { Box } from '@components/box';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import { styles } from '../styles/Dialog.ss.styles';
import { twStyles } from '../styles/Dialog.tw.styles';

/**
 * DialogFooter component that renders a styled footer section at the bottom of the dialog.
 * Typically used for action buttons. Automatically styled with top border and proper padding.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
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
export function DialogFooter(props: DialogFooterPropsTw) {
  classNamePropsHandler(props, 'DialogFooter');
  const { children, className, style, ...rest } = props;

  return (
    <Box
      {...classNameHandler(cn(twStyles.footer, className))}
      {...styleHandler({ defaultStyle: styles.footer, style })}
      {...rest}
    >
      {children}
    </Box>
  );
}

DialogFooter.displayName = 'DialogFooter';
