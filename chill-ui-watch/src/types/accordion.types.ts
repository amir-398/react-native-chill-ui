import type { ReactNode } from 'react';
import type { ViewProps, TouchableOpacityProps } from 'react-native';

import type { TIcons } from '../constants/ICONS';

import { StringProps } from './string.types';

// Legacy types for backward compatibility
export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
};

export type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  multiple?: boolean; // Allow multiple items to be open at once
  defaultOpenItems?: string[]; // IDs of items that should be open by default
  onItemToggle?: (itemId: string, isOpen: boolean) => void;
  hasAnimation?: boolean;
  animationDuration?: number;
  headerClassName?: string;
  contentClassName?: string;
  iconPosition?: 'left' | 'right';
  expandIcon?: keyof TIcons;
  collapseIcon?: keyof TIcons;
  disabled?: boolean;
} & ViewProps;

export type AccordionItemComponentProps = {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  hasAnimation?: boolean;
  animationDuration?: number;
  headerClassName?: string;
  contentClassName?: string;
  iconPosition?: 'left' | 'right';
  expandIcon?: keyof TIcons;
  collapseIcon?: keyof TIcons;
} & TouchableOpacityProps;

// New compositional API types

/** Accordion behavior type - single allows only one item open, multiple allows several */
export type AccordionType = 'single' | 'multiple';

/**
 * Props for the main Accordion component
 * @example
 * ```tsx
 * <Accordion type="single" collapsible hasCollapseIcon={true}>
 *   {children}
 * </Accordion>
 * ```
 */
export type NewAccordionProps = {
  /** Child AccordionItem components */
  children: ReactNode;
  /** Whether single or multiple items can be open at once */
  type: AccordionType;
  /** Whether items can be collapsed when type is 'single' - default: false */
  collapsible?: boolean;
  /** Default open items (string for single, array for multiple) */
  defaultValue?: string | string[];
  /** Disable the entire accordion - default: false */
  disabled?: boolean;
  /** Whether to show collapse/expand icons - default: true */
  hasCollapseIcon?: boolean;
  /** Position of the expand/collapse icon - default: 'right' */
  iconPosition?: 'left' | 'right';
  /** Icon to show when item is collapsed */
  expandIcon?: keyof TIcons;
  /** Icon to show when item is expanded */
  collapseIcon?: keyof TIcons;
  /** Callback fired when accordion state changes */
  onValueChange?: (value: string | string[]) => void;
  /** Custom CSS classes */
  className?: string;
} & ViewProps;

/**
 * Props for AccordionItem component
 * @example
 * ```tsx
 * <AccordionItem value="item-1" disabled={false}>
 *   {children}
 * </AccordionItem>
 * ```
 */
export type AccordionItemProps = {
  /** Child AccordionTrigger and AccordionContent components */
  children: ReactNode;
  /** Unique identifier for this accordion item */
  value: string;
  /** Whether this specific item is disabled - default: false */
  disabled?: boolean;
  /** Custom CSS classes */
  className?: string;
} & ViewProps;

/**
 * Props for AccordionTrigger component
 * @example
 * ```tsx
 * <AccordionTrigger as="TouchableOpacity">
 *   Click me to toggle
 * </AccordionTrigger>
 * ```
 */
export type AccordionTriggerProps = {
  /** Content to display in the trigger */
  children: ReactNode;
  /** Custom CSS classes */
  className?: string;
  /** Props to pass to String component when children is a string */
  stringProps?: StringProps;
  /** Component type to use for the trigger - default: 'TouchableOpacity' */
  as?: 'TouchableOpacity' | 'TouchableHighlight' | 'Pressable' | 'RipplePressable';
  /** Use the child component as the trigger element instead of wrapping it */
  asChild?: boolean;
} & TouchableOpacityProps;

/**
 * Props for AccordionContent component
 * @example
 * ```tsx
 * <AccordionContent>
 *   <String>This content will be shown when expanded</String>
 * </AccordionContent>
 * ```
 */
export type AccordionContentProps = {
  /** Content to display when accordion item is expanded */
  children: ReactNode;
  /** Custom CSS classes */
  className?: string;
} & ViewProps;
