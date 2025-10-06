import { DialogContentProps } from '@types';

/**
 * Default props for Dialog component
 */
export const dialogDefaultProps = {
  animation: 'fade' as DialogContentProps['animation'],
  as: 'pressable' as const,
  closeMarkPosition: 'right' as DialogContentProps['closeMarkPosition'],
  closeOnBackdropPress: true,
  closeOnGoBack: true,
  hasOverlay: true,
  rounded: 'lg' as DialogContentProps['rounded'],
  size: 'md' as DialogContentProps['size'],
  useDefaultContainer: true,
};
