import type {
  DialogBackdropPropsSs as DialogBackdropProps,
  DialogClosePropsSs as DialogCloseProps,
  DialogContentPropsSs as DialogContentProps,
  DialogFooterPropsSs as DialogFooterProps,
  DialogPropsSs as DialogProps,
  DialogTitlePropsSs as DialogTitleProps,
  DialogTriggerPropsSs as DialogTriggerProps,
  ToastProps,
} from '@types';

import { BoxSs } from '@components/box';
import { IconSs } from '@components/icon';
import { ToastProvider, useToast } from '@components/toast';
import { RipplePressableSs } from '@components/ripplePressable';
import { Modal, Pressable, TouchableOpacity } from 'react-native';
import React, { cloneElement, useEffect, useImperativeHandle } from 'react';

import { isString } from '@/utils';
import { StringSs } from '@/components/string';
import { DialogHeaderProps } from '@/types/dialog/dialog.ss.types';

import { dialogDefaultProps } from '../utils/defaultProps';
import { DialogProvider, useDialog } from '../DialogContext';
import { dialogHeaderSv, dialogSv, styles } from '../styles/Dialog.ss.styles';

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
 * StyleSheet version using React Native StyleSheet for styling.
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
 * StyleSheet version using React Native StyleSheet for styling.
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
 * StyleSheet version using React Native StyleSheet for styling.
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
 * ```
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Trigger element that will open the dialog
 * @returns Touchable trigger component with proper event handling
 */
export function DialogTrigger(props: DialogTriggerProps) {
  const { as = dialogDefaultProps.as, asChild, children } = props;
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
      <RipplePressableSs onPress={handlePress} style={styles.triggerRipple}>
        {children}
      </RipplePressableSs>
    );
  }

  if (as === 'touchable-opacity') {
    return (
      <TouchableOpacity onPress={handlePress} style={styles.triggerBase}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <Pressable onPress={handlePress} style={styles.triggerBase}>
      {children}
    </Pressable>
  );
}

DialogTrigger.displayName = 'DialogTrigger';

/**
 * Internal DialogBackdrop component that handles backdrop interactions.
 * Automatically closes the dialog when backdrop is pressed if enabled.
 * StyleSheet version using React Native StyleSheet for styling.
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
    <Pressable style={[styles.backdrop, backdropColor && { backgroundColor: backdropColor }]} onPress={handlePress} />
  );
}

/**
 * DialogContent component that renders the modal content with customizable options.
 * Supports animations, backdrop customization, close marks, and toast integration.
 * StyleSheet version using React Native StyleSheet for styling.
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
 * // With StyleSheet styling
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
 * @param style - Additional inline styles
 * @param useDefaultContainer - Use default white container (default: true)
 * @returns Styled dialog content with consistent layout and behavior
 */
export function DialogContent(props: DialogContentProps) {
  const {
    animation = dialogDefaultProps.animation,
    backdropColor,
    children,
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
    <BoxSs style={[dialogSv({ rounded, size }), style]} {...rest}>
      {children}
    </BoxSs>
  );

  const renderContainer = () => (
    <BoxSs style={styles.container}>
      {hasOverlay && <DialogBackdrop closeOnBackdropPress={closeOnBackdropPress} backdropColor={backdropColor} />}
      {renderDialogBox()}
    </BoxSs>
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
 * StyleSheet version using React Native StyleSheet for styling.
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
    return <RipplePressableSs onPress={handleClose}>{children}</RipplePressableSs>;
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
 * StyleSheet version using React Native StyleSheet for styling.
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
 * @param style - Additional inline styles
 * @returns Styled header component
 */
export function DialogHeader({ children, closeMarkProps, hasCloseMark, style, ...rest }: DialogHeaderProps) {
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

/**
 * DialogTitle component that renders a styled title section.
 * Can accept string children directly or custom React elements.
 * StyleSheet version using React Native StyleSheet for styling.
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
 *     <StringSs style={{ fontSize: 20, fontWeight: 'bold' }}>Custom Title</StringSs>
 *   </DialogTitle>
 * </DialogHeader>
 * ```
 *
 * @param children - Title content (string or React element)
 * @param style - Additional inline styles
 * @returns Styled title component
 */
export function DialogTitle({ children, style, ...rest }: DialogTitleProps) {
  return isString(children) ? (
    <StringSs style={[styles.title, style]} {...rest}>
      {children}
    </StringSs>
  ) : (
    children
  );
}

DialogTitle.displayName = 'DialogTitle';

/**
 * DialogFooter component that renders a styled footer section at the bottom of the dialog.
 * Typically used for action buttons. Automatically styled with top border and proper padding.
 * StyleSheet version using React Native StyleSheet for styling.
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
 * @param style - Additional inline styles
 * @returns Styled footer component
 */
export function DialogFooter({ children, style, ...rest }: DialogFooterProps) {
  return (
    <BoxSs style={[styles.footer, style]} {...rest}>
      {children}
    </BoxSs>
  );
}

DialogFooter.displayName = 'DialogFooter';
