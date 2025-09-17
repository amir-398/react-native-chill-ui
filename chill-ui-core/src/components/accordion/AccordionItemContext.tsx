import { createContext, useContext, ReactNode, useMemo } from 'react';

interface AccordionItemContextType {
  value: string;
  disabled?: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined);

interface AccordionItemProviderProps {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

export function AccordionItemProvider({ children, disabled, value }: AccordionItemProviderProps) {
  const contextValue = useMemo(() => ({ disabled, value }), [disabled, value]);

  return <AccordionItemContext.Provider value={contextValue}>{children}</AccordionItemContext.Provider>;
}

export function useAccordionItem() {
  const context = useContext(AccordionItemContext);
  if (context === undefined) {
    throw new Error('useAccordionItem must be used within an AccordionItem');
  }
  return context;
}
