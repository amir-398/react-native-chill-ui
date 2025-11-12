import type { ToastPropsTw } from '@types';

import { useToast } from '@components/toast';
import React, { useImperativeHandle } from 'react';

type DialogToasterProps = {
  position: ToastPropsTw['position'];
  message: ToastPropsTw['message'];
  variant: ToastPropsTw['variant'];
};

export interface DialogToasterRef {
  showToast: (props: DialogToasterProps) => void;
}

/**
 * DialogToaster component that provides toast functionality within a dialog.
 * Must be used inside a DialogContent component to work properly.
 * Integrates seamlessly with the Toast system for consistent user experience.
 * Tailwind version using NativeWind for styling.
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
