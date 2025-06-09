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

export function Dialog({ children }: DialogProps) {
  return <DialogProvider>{children}</DialogProvider>;
}

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
