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

export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}
