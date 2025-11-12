import { TIcons } from '@/constants';

export const accordionDefaultProps = {
  collapsible: false,
  defaultValue: undefined,
  disabled: false,
  expandIcon: 'angle-down-solid' as keyof TIcons,
  hasCollapseIcon: true,
  iconPosition: 'right' as 'right' | 'left',
  type: 'single' as 'single' | 'multiple',
};

export const accordionProviderDefaultProps = {
  animationDuration: 300,
  collapsible: false,
  disabled: false,
  expandIcon: 'angle-down-solid' as keyof TIcons,
  hasAnimation: true,
  hasCollapseIcon: true,
  type: 'single',
};
