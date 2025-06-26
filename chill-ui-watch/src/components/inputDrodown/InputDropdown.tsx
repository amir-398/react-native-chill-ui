import { InputDropdownPropsBis } from '@/types';

import DropdownBase from './InputDropdownBase';
import DropdownList from './InputDropdownList';

export default function InputDropdown(props: InputDropdownPropsBis) {
  const {
    className,
    currentValue,
    customDropdownItem,
    data,
    dropdownItemProps,
    dropdownProps,
    isLoading,
    maxHeight,
    minHeight,
    onSelectItem,
    valueField,
    visible,
  } = props;

  console.log('dropdownProps', dropdownProps);

  return (
    <DropdownBase
      visible={visible}
      maxHeight={maxHeight}
      minHeight={minHeight}
      className={className}
      {...dropdownProps}
    >
      <DropdownList
        data={data}
        valueField={String(valueField)}
        currentValue={currentValue}
        onSelectItem={onSelectItem}
        dropdownItemProps={dropdownItemProps}
        customDropdownItem={customDropdownItem}
        dropdownProps={dropdownProps}
        isLoading={isLoading}
      />
    </DropdownBase>
  );
}
