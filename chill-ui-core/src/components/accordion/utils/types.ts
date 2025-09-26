import { ReactNode } from 'react';
import { TIcons } from '@constants';

export type AccordionType = 'single' | 'multiple';

export interface AccordionContextType {
  disabled: boolean;
  type: AccordionType;
  collapsible: boolean;
  hasAnimation: boolean;
  openItems: Set<string>;
  expandIcon: keyof TIcons;
  hasCollapseIcon: boolean;
  animationDuration: number;
  collapseIcon: keyof TIcons;
  iconPosition: 'left' | 'right';
  toggleItem: (value: string) => void;
  isItemOpen: (value: string) => boolean;
}

export interface AccordionProviderProps {
  disabled?: boolean;
  children: ReactNode;
  type: AccordionType;
  collapsible?: boolean;
  hasAnimation?: boolean;
  expandIcon?: keyof TIcons;
  hasCollapseIcon?: boolean;
  animationDuration?: number;
  collapseIcon?: keyof TIcons;
  iconPosition?: 'left' | 'right';
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}
