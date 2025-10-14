import type { DialogHeaderPropsTw } from '@types';

import { Box } from '@components/box';
import { Icon } from '@components/icon';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import { DialogClose } from './DialogClose';
import { dialogHeaderSv } from '../styles/Dialog.ss.styles';
import { dialogHeaderTv } from '../styles/Dialog.tw.styles';

/**
 * DialogHeader component that renders a styled header section at the top of the dialog.
 * Can include a close mark when hasCloseMark is true.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
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
 * @param className - (only NativeWind) Additional CSS classes for the header
 * @param style - Style object for the header container
 */
export function DialogHeader(props: DialogHeaderPropsTw) {
  classNamePropsHandler(props, 'DialogHeader');
  const { children, className, closeMarkProps, hasCloseMark, style, ...rest } = props;
  return (
    <Box
      {...classNameHandler(cn(dialogHeaderTv({ children: !!children, hasCloseMark }), className))}
      {...styleHandler({ defaultStyle: [dialogHeaderSv({ children: !!children, hasCloseMark })], style })}
      {...rest}
    >
      {children}
      {hasCloseMark && (
        <DialogClose asChild>
          <Icon name="xmark-solid" size="sm" {...closeMarkProps} />
        </DialogClose>
      )}
    </Box>
  );
}

DialogHeader.displayName = 'DialogHeader';
