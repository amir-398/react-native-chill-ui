import type { AccordionPropsTw } from '@types';

import { AccordionProviderProps } from './types';

export const accordionDefaultProps: Partial<AccordionPropsTw> = {
  collapsible: false,
  defaultValue: undefined,
  disabled: false,
  expandIcon: 'angle-down-solid',
  hasCollapseIcon: true,
  iconPosition: 'right',
  type: 'single',
};

export const accordionProviderDefaultProps: Partial<AccordionProviderProps> = {
  animationDuration: 300,
  collapsible: false,
  disabled: false,
  expandIcon: 'angle-down-solid',
  hasAnimation: true,
  hasCollapseIcon: true,
  type: 'single',
};
