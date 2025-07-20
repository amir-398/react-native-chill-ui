import { tv } from 'tailwind-variants';
import { Modal, Pressable, TouchableOpacity } from 'react-native';
import React, { useEffect, cloneElement, useImperativeHandle } from 'react';

import cn from '../cn';
import Icon from '../icon';
import { Box } from '../box';
import RipplePressable from '../ripple-pressable';
import { ToastProvider, useToast } from '../toast';
import { DialogProvider, useDialog } from './DialogContext';
import {
  DialogBackdropProps,
  DialogCloseProps,
  DialogContentProps,
  DialogProps,
  DialogTriggerProps,
  ToastProps,
} from '../../types';

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
 */
export function Dialog({ children }: DialogProps) {
  return <DialogProvider>{children}</DialogProvider>;
}

/**
 * DialogTrigger component that opens the dialog when pressed.
 * Supports different touchable types and can clone child elements.
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
 * <DialogTrigger as="touchable-opacity">
 *   <Button title="Touchable Trigger" />
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
 */
export function DialogTrigger({ as, asChild, children }: DialogTriggerProps) {
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
      <RipplePressable onPress={handlePress} className="bg-white">
        {children}
      </RipplePressable>
    );
  }

  if (as === 'touchable-opacity') {
    return (
      <TouchableOpacity onPress={handlePress} className="relative z-50">
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <Pressable onPress={handlePress} className="relative z-50">
      {children}
    </Pressable>
  );
}

DialogTrigger.displayName = 'DialogTrigger';

/**
 * Internal DialogBackdrop component that handles backdrop interactions.
 * Automatically closes the dialog when backdrop is pressed if enabled.
 *
 * @param backdropClassName - Custom CSS classes for the backdrop
 * @param backdropColor - Custom backdrop color
 * @param closeOnBackdropPress - Whether to close dialog when backdrop is pressed
 */
function DialogBackdrop({ backdropClassName, backdropColor, closeOnBackdropPress }: DialogBackdropProps) {
  const { close } = useDialog();
  const handlePress = () => {
    if (closeOnBackdropPress) {
      close();
    }
  };

  return (
    <Pressable
      className={cn('absolute inset-0 flex-1 items-center justify-center bg-black/50', backdropClassName)}
      style={{ ...(backdropColor && { backgroundColor: backdropColor }) }}
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
 * ```
 *
 * @param animation - Animation type for the dialog (default: 'fade')
 * @param backdropClassName - Custom CSS classes for the backdrop
 * @param backdropColor - Custom backdrop color
 * @param children - Dialog content
 * @param className - Custom CSS classes for dialog content
 * @param closeMarkClassName - Custom CSS classes for close mark
 * @param closeMarkColor - Color of the close mark
 * @param closeMarkPosition - Position of the close mark (default: 'right')
 * @param closeMarkSize - Size of the close mark (default: 'sm')
 * @param closeOnBackdropPress - Close when backdrop is pressed (default: true)
 * @param closeOnGoBack - Close when back button is pressed (default: true)
 * @param defaultOpen - Initial open state
 * @param hasCloseMark - Show close button in top corner (default: false)
 * @param hasOverlay - Show overlay behind dialog (default: true)
 * @param onOpenChange - Callback when open state changes
 * @param onRequestClose - Callback when dialog is requested to close
 * @param onShow - Callback when dialog is shown
 * @param useDefaultContainer - Use default white container (default: true)
 */
export function DialogContent({
  animation = 'fade',
  backdropClassName,
  backdropColor,
  children,
  className,
  closeMarkClassName,
  closeMarkColor,
  closeMarkPosition = 'right',
  closeMarkSize = 'sm',
  closeOnBackdropPress = true,
  closeOnGoBack = true,
  defaultOpen,
  hasCloseMark,
  hasOverlay = true,
  onOpenChange,
  onRequestClose,
  onShow,
  useDefaultContainer = true,
}: DialogContentProps) {
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

  return (
    <Modal
      visible={isOpen}
      onRequestClose={closeOnGoBack ? handleClose : undefined}
      transparent
      animationType={animation}
      onShow={onShow}
    >
      {useDefaultContainer &&
        (hasToaster ? (
          <ToastProvider>
            <Box className="flex-1 items-center justify-center">
              {hasOverlay && (
                <DialogBackdrop
                  closeOnBackdropPress={closeOnBackdropPress}
                  backdropColor={backdropColor}
                  backdropClassName={backdropClassName}
                />
              )}
              <Box className={cn('relative w-5/6 rounded-xl border bg-white', className)}>
                {hasCloseMark && (
                  <Box
                    className={cn(
                      closeMarkPositionVariants({ position: closeMarkPosition }),
                      'absolute top-2 z-10',
                      closeMarkClassName,
                    )}
                  >
                    <Icon
                      name="xmark-solid"
                      hasPressEffect
                      onPress={handleClose}
                      color={closeMarkColor}
                      size={closeMarkSize}
                    />
                  </Box>
                )}

                {children}
              </Box>
            </Box>
          </ToastProvider>
        ) : (
          <Box className="flex-1 items-center justify-center">
            {hasOverlay && (
              <DialogBackdrop
                closeOnBackdropPress={closeOnBackdropPress}
                backdropColor={backdropColor}
                backdropClassName={backdropClassName}
              />
            )}
            <Box className={cn('relative w-5/6 rounded-xl border bg-white', className)}>
              {hasCloseMark && (
                <Box
                  className={cn(
                    closeMarkPositionVariants({ position: closeMarkPosition }),
                    'absolute top-2 z-10',
                    closeMarkClassName,
                  )}
                >
                  <Icon
                    name="xmark-solid"
                    hasPressEffect
                    onPress={handleClose}
                    color={closeMarkColor}
                    size={closeMarkSize}
                  />
                </Box>
              )}
              {children}
            </Box>
          </Box>
        ))}
      {!useDefaultContainer &&
        (hasToaster ? (
          <ToastProvider>
            {hasOverlay && (
              <DialogBackdrop
                closeOnBackdropPress={closeOnBackdropPress}
                backdropColor={backdropColor}
                backdropClassName={backdropClassName}
              />
            )}
            {children}
          </ToastProvider>
        ) : (
          <>
            {hasOverlay && (
              <DialogBackdrop
                closeOnBackdropPress={closeOnBackdropPress}
                backdropColor={backdropColor}
                backdropClassName={backdropClassName}
              />
            )}
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
