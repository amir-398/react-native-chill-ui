import { DialogContentPropsTw } from '@types';

/**
 * Default props for Dialog component
 */
export const dialogDefaultProps = {
  animation: 'fade' as DialogContentPropsTw['animation'],
  as: 'pressable' as const,
  closeOnBackdropPress: true,
  closeOnGoBack: true,
  hasBackdrop: true,
  size: 'md' as DialogContentPropsTw['size'],
  useDefaultContainer: true,
};
