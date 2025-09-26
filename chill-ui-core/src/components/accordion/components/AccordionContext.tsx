import { createContext, useContext, useState, useMemo, useCallback } from 'react';

import { accordionProviderDefaultProps } from '../utils/defaultProps';
import { AccordionContextType, AccordionProviderProps } from '../utils/types';

export type AccordionType = 'single' | 'multiple';

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export function AccordionProvider({
  animationDuration = accordionProviderDefaultProps.animationDuration,
  children,
  collapseIcon = accordionProviderDefaultProps.collapseIcon,
  collapsible = accordionProviderDefaultProps.collapsible,
  defaultValue,
  disabled = accordionProviderDefaultProps.disabled,
  expandIcon = accordionProviderDefaultProps.expandIcon,
  hasAnimation = accordionProviderDefaultProps.hasAnimation,
  hasCollapseIcon = accordionProviderDefaultProps.hasCollapseIcon,
  iconPosition = accordionProviderDefaultProps.iconPosition,
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
      animationDuration: animationDuration!,
      collapseIcon: collapseIcon!,
      collapsible: collapsible!,
      disabled: disabled!,
      expandIcon: expandIcon!,
      hasAnimation: hasAnimation!,
      hasCollapseIcon: hasCollapseIcon!,
      iconPosition: iconPosition!,
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
