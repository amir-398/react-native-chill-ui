import type {
  DialogBackdropPropsTw as DialogBackdropProps,
  DialogClosePropsTw as DialogCloseProps,
  DialogContentPropsTw as DialogContentProps,
  DialogFooterPropsTw as DialogFooterProps,
  DialogHeaderPropsTw as DialogHeaderProps,
  DialogPropsTw as DialogProps,
  DialogTitlePropsTw as DialogTitleProps,
  DialogTriggerPropsTw as DialogTriggerProps,
  ToastProps,
} from '@types';

import { Box } from '@components/box';
import { Icon } from '@components/icon';
import { StringTw } from '@components/string';
import { ToastProvider, useToast } from '@components/toast';
import { RipplePressable } from '@components/ripplePressable';
import { Modal, Pressable, TouchableOpacity } from 'react-native';
import React, { cloneElement, useEffect, useImperativeHandle } from 'react';
import { classNameHandler, classNamePropsHandler, cn, isString, styleHandler } from '@utils';

import { dialogDefaultProps } from '../utils/defaultProps';
import { DialogProvider, useDialog } from '../DialogContext';
import { dialogHeaderSv, dialogSv, styles } from '../styles/Dialog.ss.styles';
import { dialogHeaderTv, dialogTv, twStyles } from '../styles/Dialog.tw.styles';

type DialogToasterProps = {
  position: ToastProps['position'];
  message: ToastProps['message'];
  variant: ToastProps['variant'];
};

export interface DialogToasterRef {
  showToast: (props: DialogToasterProps) => void;
}

/**
 * DialogToaster component that provides toast functionality within a dialog.
 * Must be used inside a DialogContent component to work properly.
 * Integrates seamlessly with the Toast system for consistent user experience.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * function DialogWithToast() {
 *   const toasterRef = useRef<DialogToasterRef>(null);
 *
 *   const handleShowToast = () => {
 *     toasterRef.current?.showToast({
 *       message: 'Hello from dialog!',
 *       position: 'top',
 *       variant: 'success',
 *     });
 *   };
 *
 *   return (
 *     <Dialog>
 *       <DialogTrigger>
 *         <Button title="Open Dialog" />
 *       </DialogTrigger>
 *       <DialogContent>
 *         <DialogToaster ref={toasterRef} />
 *         <String>Dialog content</String>
 *         <Button title="Show Toast" onPress={handleShowToast} />
 *       </DialogContent>
 *     </Dialog>
 *   );
 * }
 * ```
 *
 * @returns Toast functionality component for dialogs
 */
export const DialogToaster = React.forwardRef<DialogToasterRef>((_, ref) => {
  const { toast } = useToast();

  useImperativeHandle(ref, () => ({
    showToast: ({ message, position, variant }: DialogToasterProps) => {
      toast({ message, position, variant });
    },
  }));

  return null;
});

DialogToaster.displayName = 'DialogToaster';

/**
 * Root Dialog component that provides context for all dialog sub-components.
 * Must wrap all dialog-related components.
 * Automatically manages dialog state and provides context for all sub-components.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>
 *     <Button title="Open Dialog" />
 *   </DialogTrigger>
 *   <DialogContent>
 *     <String>Dialog content</String>
 *   </DialogContent>
 * </Dialog>
 * ```
 *
 * @param children - Dialog content and triggers
 * @returns Dialog context provider component
 */
export function Dialog({ children }: DialogProps) {
  return <DialogProvider>{children}</DialogProvider>;
}

/**
 * DialogTrigger component that opens the dialog when pressed.
 * Supports different touchable types and can clone child elements.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DialogTrigger>
 *   <Button title="Open Dialog" />
 * </DialogTrigger>
 *
 * // With different touchable types
 * <DialogTrigger as="ripple-pressable">
 *   <Button title="Ripple Trigger" />
 * </DialogTrigger>
 *
 * // Clone child element
 * <DialogTrigger asChild>
 *   <Button title="Cloned Trigger" />
 * </DialogTrigger>
 *
 * // With NativeWind styling
 * <DialogTrigger className="bg-blue-500 hover:bg-blue-600">
 *   <Button title="Styled Trigger" />
 * </DialogTrigger>
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Trigger element that will open the dialog
 * @param className - Custom CSS classes (NativeWind only)
 * @returns Touchable trigger component with proper event handling
 */
export function DialogTrigger(props: DialogTriggerProps) {
  classNamePropsHandler(props, 'DialogTrigger');
  const { as = dialogDefaultProps.as, asChild, children, className } = props;
  const { open } = useDialog();
  const handlePress = () => {
    open();
  };

  if (asChild) {
    const cloneChildren = cloneElement(children, { onPress: handlePress });
    return cloneChildren;
  }

  if (as === 'ripple-pressable') {
    return (
      <RipplePressable
        onPress={handlePress}
        {...classNameHandler(cn(twStyles.triggerRipple, className))}
        {...styleHandler({ defaultStyle: styles.triggerRipple })}
      >
        {children}
      </RipplePressable>
    );
  }

  if (as === 'touchable-opacity') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        // @ts-ignore
        {...classNameHandler(cn(twStyles.triggerBase, className))}
        {...styleHandler({ defaultStyle: styles.triggerBase })}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      // @ts-ignore
      {...classNameHandler(cn(twStyles.triggerBase, className))}
      {...styleHandler({ defaultStyle: styles.triggerBase })}
    >
      {children}
    </Pressable>
  );
}

DialogTrigger.displayName = 'DialogTrigger';

/**
 * Internal DialogBackdrop component that handles backdrop interactions.
 * Automatically closes the dialog when backdrop is pressed if enabled.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @param backdropColor - Custom backdrop color
 * @param closeOnBackdropPress - Whether to close dialog when backdrop is pressed
 */
function DialogBackdrop({ backdropColor, closeOnBackdropPress }: DialogBackdropProps) {
  const { close } = useDialog();
  const handlePress = () => {
    if (closeOnBackdropPress) {
      close();
    }
  };

  return (
    <Pressable
      // @ts-ignore
      {...classNameHandler(cn(twStyles.backdrop))}
      {...styleHandler({
        defaultStyle: styles.backdrop,
        style: backdropColor && { backgroundColor: backdropColor },
      })}
      onPress={handlePress}
    />
  );
}

/**
 * DialogContent component that renders the modal content with customizable options.
 * Supports animations, backdrop customization, close marks, and toast integration.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic dialog content
 * <DialogContent>
 *   <String>Basic dialog content</String>
 * </DialogContent>
 *
 * // With close mark and custom animation
 * <DialogContent
 *   hasCloseMark
 *   animation="slide"
 *   closeMarkPosition="left"
 * >
 *   <String>Dialog with close button</String>
 * </DialogContent>
 *
 * // With NativeWind styling
 * <DialogContent
 *   className="mx-auto max-w-md bg-white rounded-lg shadow-lg"
 * >
 *   <String>Styled with Tailwind classes</String>
 * </DialogContent>
 *
 * // With StyleSheet styling (fallback)
 * <DialogContent
 *   style={{
 *     marginHorizontal: 'auto',
 *     maxWidth: 400,
 *     backgroundColor: 'white',
 *     borderRadius: 8,
 *   }}
 * >
 *   <String>Styled with StyleSheet</String>
 * </DialogContent>
 * ```
 *
 * @param animation - Animation type for the dialog (default: 'fade')
 * @param backdropColor - Custom backdrop color
 * @param children - Dialog content
 * @param className - Custom CSS classes for dialog content (NativeWind only)
 * @param closeMarkPosition - Position of the close mark (default: 'right')
 * @param closeMarkProps - Custom close mark props
 * @param closeOnBackdropPress - Close when backdrop is pressed (default: true)
 * @param closeOnGoBack - Close when back button is pressed (default: true)
 * @param defaultOpen - Initial open state
 * @param hasCloseMark - Show close button in top corner (default: false)
 * @param hasOverlay - Show overlay behind dialog (default: true)
 * @param onOpenChange - Callback when open state changes
 * @param onRequestClose - Callback when dialog is requested to close
 * @param onShow - Callback when dialog is shown
 * @param rounded - Border radius variant for the dialog (default: 'lg')
 * @param size - Size variant for the dialog (default: 'md')
 * @param style - Additional inline styles (StyleSheet only)
 * @param useDefaultContainer - Use default white container (default: true)
 * @returns Styled dialog content with consistent layout and behavior
 */
export function DialogContent(props: DialogContentProps) {
  classNamePropsHandler(props, 'DialogContent');
  const {
    animation = dialogDefaultProps.animation,
    backdropColor,
    children,
    className,
    closeOnBackdropPress = dialogDefaultProps.closeOnBackdropPress,
    closeOnGoBack = dialogDefaultProps.closeOnGoBack,
    defaultOpen,
    hasOverlay = dialogDefaultProps.hasOverlay,
    onOpenChange,
    onRequestClose,
    onShow,
    rounded = dialogDefaultProps.rounded,
    size = dialogDefaultProps.size,
    style,
    useDefaultContainer = dialogDefaultProps.useDefaultContainer,
    ...rest
  } = props;
  const { close, isOpen, open } = useDialog();

  const handleClose = () => {
    onRequestClose?.();
    close();
  };

  const hasToaster = React.Children.toArray(children).some(
    child => React.isValidElement(child) && child.type === DialogToaster,
  );

  useEffect(() => {
    if (typeof defaultOpen === 'boolean') {
      if (defaultOpen) {
        open();
      } else {
        close();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultOpen]);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const renderDialogBox = () => (
    <Box
      {...classNameHandler(cn(dialogTv({ rounded, size }), className))}
      {...styleHandler({ defaultStyle: dialogSv({ rounded, size }), style })}
      {...rest}
    >
      {children}
    </Box>
  );

  const renderContainer = () => (
    <Box {...classNameHandler(twStyles.container)} {...styleHandler({ defaultStyle: styles.container })}>
      {hasOverlay && <DialogBackdrop closeOnBackdropPress={closeOnBackdropPress} backdropColor={backdropColor} />}
      {renderDialogBox()}
    </Box>
  );

  return (
    <Modal
      visible={isOpen}
      onRequestClose={closeOnGoBack ? handleClose : undefined}
      transparent
      animationType={animation}
      onShow={onShow}
    >
      {useDefaultContainer && (hasToaster ? <ToastProvider>{renderContainer()}</ToastProvider> : renderContainer())}
      {!useDefaultContainer &&
        (hasToaster ? (
          <ToastProvider>
            {hasOverlay && <DialogBackdrop closeOnBackdropPress={closeOnBackdropPress} backdropColor={backdropColor} />}
            {children}
          </ToastProvider>
        ) : (
          <>
            {hasOverlay && <DialogBackdrop closeOnBackdropPress={closeOnBackdropPress} backdropColor={backdropColor} />}
            {children}
          </>
        ))}
    </Modal>
  );
}

DialogContent.displayName = 'DialogContent';

/**
 * DialogClose component that closes the dialog when pressed.
 * Supports different touchable types and can clone child elements.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DialogClose>
 *   <Button title="Close" />
 * </DialogClose>
 *
 * // With different touchable types
 * <DialogClose as="ripple-pressable">
 *   <Button title="Ripple Close" />
 * </DialogClose>
 *
 * // Clone child element
 * <DialogClose asChild>
 *   <Button title="Cloned Close" />
 * </DialogClose>
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Close trigger element
 * @returns Touchable close component with proper event handling
 */
export function DialogClose({ as = dialogDefaultProps.as, asChild, children }: DialogCloseProps) {
  const { close } = useDialog();
  const handleClose = () => {
    close();
  };

  if (asChild) {
    const cloneChildren = cloneElement(children, { onPress: handleClose });
    return cloneChildren;
  }

  if (as === 'ripple-pressable') {
    return <RipplePressable onPress={handleClose}>{children}</RipplePressable>;
  }
  if (as === 'touchable-opacity') {
    return <TouchableOpacity onPress={handleClose}>{children}</TouchableOpacity>;
  }
  return <Pressable onPress={handleClose}>{children}</Pressable>;
}

DialogClose.displayName = 'DialogClose';

/**
 * DialogHeader component that renders a styled header section at the top of the dialog.
 * Can include a close mark when hasCloseMark is true.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
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
 * @param hasCloseMark - Whether to show close mark in header
 * @param className - Custom CSS classes (NativeWind only)
 * @param style - Additional inline styles
 * @returns Styled header component
 */
export function DialogHeader({ children, className, closeMarkProps, hasCloseMark, style, ...rest }: DialogHeaderProps) {
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

/**
 * DialogTitle component that renders a styled title section.
 * Can accept string children directly or custom React elements.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <DialogHeader>
 *   <DialogTitle>Confirm Action</DialogTitle>
 * </DialogHeader>
 *
 * // Or with custom styling
 * <DialogHeader>
 *   <DialogTitle>
 *     <String className="text-xl font-bold">Custom Title</String>
 *   </DialogTitle>
 * </DialogHeader>
 * ```
 *
 * @param children - Title content (string or React element)
 * @param className - Custom CSS classes (NativeWind only)
 * @param style - Additional inline styles
 * @returns Styled title component
 */
export function DialogTitle({ children, className, style, ...rest }: DialogTitleProps) {
  return isString(children) ? (
    <StringTw
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

/**
 * DialogFooter component that renders a styled footer section at the bottom of the dialog.
 * Typically used for action buttons. Automatically styled with top border and proper padding.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogTitle>Confirm Action</DialogTitle>
 *   <String>Are you sure you want to proceed?</String>
 *   <DialogFooter>
 *     <DialogClose asChild>
 *       <Button title="Cancel" />
 *     </DialogClose>
 *     <Button title="Confirm" onPress={handleConfirm} />
 *   </DialogFooter>
 * </DialogContent>
 * ```
 *
 * @param children - Footer content (typically buttons)
 * @param className - Custom CSS classes (NativeWind only)
 * @param style - Additional inline styles
 * @returns Styled footer component
 */
export function DialogFooter({ children, className, style, ...rest }: DialogFooterProps) {
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
