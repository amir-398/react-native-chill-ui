import type { DialogContentPropsSs } from '@types';

import { BoxSs } from '@components/box';
import React, { useEffect } from 'react';
import { Modal, Pressable } from 'react-native';
import { ToastProvider } from '@components/toast';

import { useDialog } from './DialogContext';
import { DialogToaster } from './DialogToaster';
import { dialogDefaultProps } from '../utils/defaultProps';
import { dialogSv, styles } from '../styles/Dialog.ss.styles';

/**
 * DialogContent component that renders the modal content with customizable options.
 * Supports animations, backdrop customization, close marks, and toast integration.
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
 * @param closeOnBackdropPress - Close when backdrop is pressed (default: true)
 * @param closeOnGoBack - Close when back button is pressed (default: true)
 * @param hasBackdrop - Show backdrop behind dialog (default: true)
 * @param onRequestClose - Callback when dialog is requested to close
 * @param size - Size variant for the dialog (default: 'md')
 * @param style - Style object for the dialog container
 * @param useDefaultContainer - Use default white container (default: true)
 */
export function DialogContent(props: DialogContentPropsSs) {
  const {
    animation = dialogDefaultProps.animation,
    backdropColor,
    children,
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
    <BoxSs style={[dialogSv({ size }), style]} {...rest}>
      {children}
    </BoxSs>
  );

  const renderContainer = () => <BoxSs style={styles.container}>{renderDialogBox()}</BoxSs>;

  const renderOverlay = () => {
    if (!hasBackdrop) return null;

    return (
      <Pressable
        style={[styles.backdrop, { ...(backdropColor && { backgroundColor: backdropColor }) }]}
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
