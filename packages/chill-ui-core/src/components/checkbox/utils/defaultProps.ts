import { TIcons } from '@constants';
import { CheckboxPropsTw } from '@types';

export const checkboxDefaultProps = {
  iconColor: '#FFF',
  iconName: 'check-solid' as keyof TIcons,
  isChecked: false,
  isDisabled: false,
  isLabelPressable: true,
  size: 'md' as CheckboxPropsTw['size'],
  variant: 'square' as CheckboxPropsTw['variant'],
};
