import type { DialogContentPropsTw } from '@types';

import { Box } from '@components/box';
import React, { useEffect } from 'react';
import { Modal, Pressable } from 'react-native';
import { ToastProvider } from '@components/toast';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import { useDialog } from './DialogContext';
import { DialogToaster } from './DialogToaster.hybrid';
import { dialogDefaultProps } from '../utils/defaultProps';
import { dialogSv, styles } from '../styles/Dialog.ss.styles';
import { dialogTv, twStyles } from '../styles/Dialog.tw.styles';

/**
 * DialogContent component that renders the modal content with customizable options.
 * Supports animations, backdrop customization, close marks, and toast integration.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <DialogContent
 *   hasBackdrop
 *   closeOnBackdropPress
 *   size="md"
 *   rounded="lg"
 * >
 *   <DialogHeader hasCloseMark>
 *     <DialogTitle>Confirm Action</DialogTitle>
 *   </DialogHeader>
 *   <String>Are you sure you want to proceed?</String>
 * </DialogContent>
 * ```
 *
 * @param animation - Animation type for the dialog (default: 'fade')
 * @param backdropColor - Custom backdrop color
 * @param children - Dialog content
 * @param className - (only NativeWind) Additional CSS classes for dialog content
 * @param closeOnBackdropPress - Close when backdrop is pressed (default: true)
 * @param closeOnGoBack - Close when back button is pressed (default: true)
 * @param hasBackdrop - Show backdrop behind dialog (default: true)
 * @param onRequestClose - Callback when dialog is requested to close
 * @param size - Size variant for the dialog (default: 'md')
 * @param style - Style object for the dialog container
 * @param useDefaultContainer - Use default white container (default: true)
 */
export function DialogContent(props: DialogContentPropsTw) {
  classNamePropsHandler(props, 'DialogContent');
  const {
    animation = dialogDefaultProps.animation,
    backdropColor,
    children,
    className,
    closeOnBackdropPress = dialogDefaultProps.closeOnBackdropPress,
    closeOnGoBack = dialogDefaultProps.closeOnGoBack,
    hasBackdrop = dialogDefaultProps.hasBackdrop,
    onRequestClose,
    size = dialogDefaultProps.size,
    style,
    useDefaultContainer = dialogDefaultProps.useDefaultContainer,
    ...rest
  } = props;
  const { close, isOpen, onClose, onOpen } = useDialog();

  const handleClose = () => {
    onRequestClose?.();
    close();
  };

  const hasToaster = React.Children.toArray(children).some(
    child => React.isValidElement(child) && child.type === DialogToaster,
  );

  useEffect(() => {
    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen, onOpen, onClose]);

  const renderDialogBox = () => (
    <Box
      {...classNameHandler(cn(dialogTv({ size }), className))}
      {...styleHandler({ defaultStyle: dialogSv({ size }), style })}
      {...rest}
    >
      {children}
    </Box>
  );

  const renderContainer = () => (
    <Box {...classNameHandler(twStyles.container)} {...styleHandler({ defaultStyle: styles.container })}>
      {renderDialogBox()}
    </Box>
  );

  const renderOverlay = () => {
    if (!hasBackdrop) return null;

    return (
      <Pressable
        {...classNameHandler(twStyles.backdrop)}
        {...styleHandler({
          defaultStyle: styles.backdrop,
          style: { ...(backdropColor && { backgroundColor: backdropColor }) },
        })}
        onPress={closeOnBackdropPress ? handleClose : undefined}
      />
    );
  };

  return (
    <Modal
      visible={isOpen}
      onRequestClose={closeOnGoBack ? handleClose : undefined}
      transparent
      animationType={animation}
    >
      {renderOverlay()}
      {useDefaultContainer && (hasToaster ? <ToastProvider>{renderContainer()}</ToastProvider> : renderContainer())}
      {!useDefaultContainer && (hasToaster ? <ToastProvider>{children}</ToastProvider> : children)}
    </Modal>
  );
}

DialogContent.displayName = 'DialogContent';
