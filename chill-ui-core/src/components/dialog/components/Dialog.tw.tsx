import { DialogPropsTw } from '@types';
import { PropsWithChildren } from 'react';

import { DialogProvider } from './DialogContext';

/**
 * The `<Dialog />` component provides context for all dialog sub-components.
 * Must wrap all dialog-related components and automatically manages dialog state.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Dialog } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
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
 * @param defaultOpen - Initial open state for uncontrolled mode
 * @param open - Controlled open state
 * @param onOpenChange - Callback when open state changes
 * @param onOpen - Callback when dialog opens
 * @param onClose - Callback when dialog closes
 * @returns Dialog context provider component
 */
export function Dialog({
  children,
  defaultOpen,
  onClose,
  onOpen,
  onOpenChange,
  open,
}: PropsWithChildren<DialogPropsTw>) {
  return (
    <DialogProvider defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange} onOpen={onOpen} onClose={onClose}>
      {children}
    </DialogProvider>
  );
}

Dialog.displayName = 'Dialog';
