import { DialogPropsSs } from '@types';
import { PropsWithChildren } from 'react';

import { DialogProvider } from './DialogContext';

/**
 * Root Dialog component that provides context for all dialog sub-components.
 * Must wrap all dialog-related components.
 * Automatically manages dialog state and provides context for all sub-components.
 * StyleSheet version using React Native StyleSheet for styling.
 *
 * @example
 * ```tsx
 * // Uncontrolled mode
 * <Dialog defaultOpen={false}>
 *   <DialogTrigger>
 *     <Button title="Open Dialog" />
 *   </DialogTrigger>
 *   <DialogContent>
 *     <String>Dialog content</String>
 *   </DialogContent>
 * </Dialog>
 *
 * // Controlled mode
 * <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
export function Dialog(props: PropsWithChildren<DialogPropsSs>) {
  const { children, defaultOpen, onClose, onOpen, onOpenChange, open } = props;
  return (
    <DialogProvider defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange} onOpen={onOpen} onClose={onClose}>
      {children}
    </DialogProvider>
  );
}

Dialog.displayName = 'Dialog';
