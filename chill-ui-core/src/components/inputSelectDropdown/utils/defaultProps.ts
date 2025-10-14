import { InputDropdownProps, InputSelectDropdownProps } from '@types';

export const inputSelectDropdownDefaultProps = {
  closeModalWhenSelectedItem: true,
  dataSet: [],
  debounceDelay: 200,
  defaultOpen: false,
  dropdownPosition: 'auto' as InputSelectDropdownProps<any>['dropdownPosition'],
  excludeItems: [],
  excludeSearchItems: [],
  hasHighlightString: true,
  hasSearch: false,
  itemClickableAs: 'touchable-opacity' as InputDropdownProps['itemClickableAs'],
  maxHeight: 340,
  minHeight: 0,
  offsetX: 0,
  offsetY: 5,
  placeholder: 'Select item',
};
