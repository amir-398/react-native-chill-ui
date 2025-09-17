import { cn } from '@utils';
import { tv } from 'tailwind-variants';
import { Modal, Pressable, TouchableOpacity } from 'react-native';
import React, { useEffect, cloneElement, useImperativeHandle } from 'react';

import { classNamePropsHandler } from '@/utils/hybrid/classNamePropsHandler';

import Icon from '../icon';
import { Box } from '../box';
import dialogVariants from './Dialog.variants';
import { ToastProvider, useToast } from '../toast';
import { isNativeWindInstalled } from '../../utils';
import { RipplePressable } from '../ripplePressable';
import { ToastProps } from '../../types/toast.types';
import createDialogStyles from './utils/createStyles';
import { DialogProvider, useDialog } from './DialogContext';
import {
  DialogBackdropProps,
  DialogCloseProps,
  DialogContentProps,
  DialogProps,
  DialogTriggerProps,
} from '../../types/dialog.types';

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
 * Automatically detects NativeWind availability and adapts styling accordingly.
 *
 * @example
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
 * <DialogTrigger as="touchable-opacity">
 *   <Button title="Touchable Trigger" />
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
 *
 * @param as - Type of touchable component to use (default: 'pressable')
 * @param asChild - Whether to clone the child element
 * @param children - Trigger element that will open the dialog
 * @param className - Custom CSS classes (NativeWind only)
 * @returns Touchable trigger component with proper event handling
 */
export function DialogTrigger(props: DialogTriggerProps) {
  classNamePropsHandler(props, 'DialogTrigger');
  const { as, asChild, children, className } = props;
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
        className={isNativeWindInstalled() ? cn('bg-white', className) : undefined}
        style={!isNativeWindInstalled() ? { backgroundColor: 'white' } : undefined}
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
        className={isNativeWindInstalled() ? cn('relative z-50', className) : undefined}
        style={!isNativeWindInstalled() ? { position: 'relative', zIndex: 50 } : undefined}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      // @ts-ignore
      className={isNativeWindInstalled() ? cn('relative z-50', className) : undefined}
      style={!isNativeWindInstalled() ? { position: 'relative', zIndex: 50 } : undefined}
    >
      {children}
    </Pressable>
  );
}

DialogTrigger.displayName = 'DialogTrigger';

/**
 * Internal DialogBackdrop component that handles backdrop interactions.
 * Automatically closes the dialog when backdrop is pressed if enabled.
 * Automatically detects NativeWind availability and adapts styling accordingly.
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
      className={
        isNativeWindInstalled() ? cn('absolute inset-0 flex-1 items-center justify-center bg-black/50') : undefined
      }
      style={
        [
          !isNativeWindInstalled() && {
            alignItems: 'center' as const,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            bottom: 0,
            flex: 1,
            justifyContent: 'center' as const,
            left: 0,
            position: 'absolute' as const,
            right: 0,
            top: 0,
          },
          backdropColor && { backgroundColor: backdropColor },
        ].filter(Boolean) as any
      }
      onPress={handlePress}
    />
  );
}

const closeMarkPositionVariants = tv({
  variants: {
    position: {
      left: 'left-2',
      right: 'right-2',
    },
  },
});

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
    animation = 'fade',
    backdropColor,
    children,
    className,
    closeMarkPosition = 'right',
    closeMarkProps,
    closeOnBackdropPress = true,
    closeOnGoBack = true,
    defaultOpen,
    hasCloseMark,
    hasOverlay = true,
    onOpenChange,
    onRequestClose,
    onShow,
    rounded = 'lg',
    size = 'md',
    style,
    useDefaultContainer = true,
    ...rest
  } = props;
  const { close, isOpen, open } = useDialog();
  const isNativeWind = isNativeWindInstalled();
  const dialogStyles = !isNativeWind ? createDialogStyles(size, rounded) : null;

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

  const getCloseMarkStyle = () => {
    if (isNativeWind) return undefined;
    return closeMarkPosition === 'left' ? dialogStyles?.closeMarkLeft : dialogStyles?.closeMarkRight;
  };

  const renderDialogBox = () => (
    <Box
      className={isNativeWind ? cn(dialogVariants({ rounded, size }), className) : undefined}
      style={isNativeWind ? undefined : [dialogStyles?.dialog, style]}
      {...rest}
    >
      {hasCloseMark && (
        <Box
          className={
            isNativeWind
              ? cn(closeMarkPositionVariants({ position: closeMarkPosition }), 'absolute top-2 z-10')
              : undefined
          }
          style={getCloseMarkStyle()}
        >
          <Icon name="xmark-solid" hasPressEffect onPress={handleClose} {...closeMarkProps} />
        </Box>
      )}
      {children}
    </Box>
  );

  const renderContainer = () => (
    <Box
      className={isNativeWind ? 'flex-1 items-center justify-center' : undefined}
      style={isNativeWind ? undefined : dialogStyles?.container}
    >
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
 * Automatically detects NativeWind availability and adapts styling accordingly.
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
export function DialogClose({ as, asChild, children }: DialogCloseProps) {
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
