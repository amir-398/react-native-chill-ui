import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

export type AccordionType = 'single' | 'multiple';

interface AccordionContextType {
  disabled: boolean;
  expandIcon: string;
  type: AccordionType;
  collapsible: boolean;
  collapseIcon: string;
  hasAnimation: boolean;
  openItems: Set<string>;
  hasCollapseIcon: boolean;
  animationDuration: number;
  iconPosition: 'left' | 'right';
  toggleItem: (value: string) => void;
  isItemOpen: (value: string) => boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

interface AccordionProviderProps {
  disabled?: boolean;
  children: ReactNode;
  type: AccordionType;
  expandIcon?: string;
  collapsible?: boolean;
  collapseIcon?: string;
  hasAnimation?: boolean;
  hasCollapseIcon?: boolean;
  animationDuration?: number;
  iconPosition?: 'left' | 'right';
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

export function AccordionProvider({
  animationDuration = 300,
  children,
  collapseIcon = 'angle-down-solid',
  collapsible = false,
  defaultValue,
  disabled = false,
  expandIcon = 'angle-down-solid',
  hasAnimation = true,
  hasCollapseIcon = true,
  iconPosition = 'right',
  onValueChange,
  type,
}: AccordionProviderProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (defaultValue) {
      if (Array.isArray(defaultValue)) {
        return new Set(defaultValue);
      }
      return new Set([defaultValue]);
    }
    return new Set();
  });

  const toggleItem = useCallback(
    (value: string) => {
      setOpenItems(prev => {
        const newOpenItems = new Set(prev);

        if (newOpenItems.has(value)) {
          // Item is open, close it
          if (type === 'single' && !collapsible) {
            // Can't close the only open item in single non-collapsible mode
            return prev;
          }
          newOpenItems.delete(value);
        } else {
          // Item is closed, open it
          if (type === 'single') {
            // In single mode, close all other items
            newOpenItems.clear();
          }
          newOpenItems.add(value);
        }

        // Call onValueChange with the new value
        if (onValueChange) {
          if (type === 'single') {
            const newValue = newOpenItems.size > 0 ? Array.from(newOpenItems)[0] : '';
            onValueChange(newValue);
          } else {
            onValueChange(Array.from(newOpenItems));
          }
        }

        return newOpenItems;
      });
    },
    [type, collapsible, onValueChange],
  );

  const isItemOpen = useCallback((value: string) => openItems.has(value), [openItems]);

  const value = useMemo(
    () => ({
      animationDuration,
      collapseIcon,
      collapsible,
      disabled,
      expandIcon,
      hasAnimation,
      hasCollapseIcon,
      iconPosition,
      isItemOpen,
      openItems,
      toggleItem,
      type,
    }),
    [
      type,
      collapsible,
      openItems,
      disabled,
      hasAnimation,
      animationDuration,
      hasCollapseIcon,
      iconPosition,
      expandIcon,
      collapseIcon,
      toggleItem,
      isItemOpen,
    ],
  );

  return <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>;
}

export function useAccordion() {
  const context = useContext(AccordionContext);
  if (context === undefined) {
    throw new Error('useAccordion must be used within an Accordion');
  }
  return context;
}
