import { DropdownMenuContentPropsTw, DropdownMenuItemPropsTw, DropdownMenuTriggerPropsTw } from '@types';

export const dropdownMenuContentDefaultProps = {
  align: 'auto' as DropdownMenuContentPropsTw['align'],
  closeWhenInteractedOutside: true,
  offsetX: 0,
  offsetY: 5,
  side: 'auto' as DropdownMenuContentPropsTw['side'],
};

export const dropdownMenuItemDefaultProps = {
  as: 'touchable-highlight' as DropdownMenuItemPropsTw['as'],
  closeOnSelect: true,
  isDisabled: false,
  underlayColor: '#f0f0f0',
};

export const dropdownMenuTriggerDefaultProps = {
  as: 'pressable' as DropdownMenuTriggerPropsTw['as'],
};
