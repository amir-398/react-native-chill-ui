import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

interface DialogContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProviderProps {
  visible?: boolean;
  children: ReactNode;
}

/**
 * DialogProvider component that manages dialog state and provides context to child components.
 * This is the internal provider used by the Dialog component.
 *
 * @param children - Child components that will have access to dialog context
 * @param visible - Initial visibility state (optional)
 */
export function DialogProvider({ children, visible }: DialogProviderProps) {
  const [isOpen, setIsOpen] = useState(visible ?? false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const value = useMemo(
    () => ({
      close,
      isOpen,
      open,
      toggle,
    }),
    [isOpen, toggle],
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
