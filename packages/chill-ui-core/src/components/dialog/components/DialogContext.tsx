import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

interface DialogContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProviderProps {
  open?: boolean;
  visible?: boolean;
  onOpen?: () => void;
  children: ReactNode;
  onClose?: () => void;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * DialogProvider component that manages dialog state and provides context to child components.
 * This is the internal provider used by the Dialog component.
 *
 * @param children - Child components that will have access to dialog context
 * @param visible - Initial visibility state (optional, deprecated - use defaultOpen instead)
 * @param defaultOpen - Initial open state for uncontrolled mode
 * @param open - Controlled open state
 * @param onOpenChange - Callback when open state changes
 * @param onOpen - Callback when dialog opens
 * @param onClose - Callback when dialog closes
 */
export function DialogProvider({
  children,
  defaultOpen,
  onClose,
  onOpen,
  onOpenChange,
  open: controlledOpen,
  visible,
}: DialogProviderProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? visible ?? false);

  // Use controlled state if open prop is provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const open = useCallback(() => {
    if (controlledOpen === undefined) {
      setInternalOpen(true);
    }
    onOpenChange?.(true);
    onOpen?.();
  }, [controlledOpen, onOpenChange, onOpen]);

  const close = useCallback(() => {
    if (controlledOpen === undefined) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
    onClose?.();
  }, [controlledOpen, onOpenChange, onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  const value = useMemo(
    () => ({
      close,
      isOpen,
      onClose,
      onOpen,
      onOpenChange,
      open,
      toggle,
    }),
    [isOpen, open, close, toggle, onOpenChange, onOpen, onClose],
  );

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

/**
 * useDialog hook that provides access to dialog state and actions.
 * Must be used within a DialogProvider (wrapped by Dialog component).
 *
 * @example
 * ```tsx
 * function MyDialogComponent() {
 *   const { isOpen, open, close, toggle } = useDialog();
 *
 *   return (
 *     <Box>
 *       <Button title="Toggle Dialog" onPress={toggle} />
 *       <String>Dialog is {isOpen ? 'open' : 'closed'}</String>
 *     </Box>
 *   );
 * }
 * ```
 *
 * @returns Dialog context with isOpen, open, close, and toggle functions
 * @throws Error if used outside of DialogProvider
 */
export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}
