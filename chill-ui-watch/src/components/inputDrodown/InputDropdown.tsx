import { InputDropdownProps } from '@/types';

import DropdownBase from './InputDropdownBase';
import DropdownList from './InputDropdownList';

export default function InputDropdown(props: InputDropdownProps) {
  const {
    className,
    currentValue,
    customDropdownItem,
    data,
    dropdownItemProps,
    dropdownListProps,
    dropdownProps,
    isLoading,
    maxHeight,
    minHeight,
    onSelectItem,
    valueField,
    visible,
  } = props;

  return (
    <DropdownBase
      visible={visible}
      maxHeight={maxHeight}
      minHeight={minHeight}
      className={className}
      hasShadow={dropdownProps?.hasShadow}
      withAnimation={dropdownProps?.withAnimation}
      hasSearch={dropdownProps?.hasSearch}
      searchInputProps={dropdownProps?.searchInputProps}
    >
      <DropdownList
        data={data}
        valueField={String(valueField)}
        currentValue={currentValue}
        onSelectItem={onSelectItem}
        dropdownItemProps={dropdownItemProps}
        customDropdownItem={customDropdownItem}
        dropdownListProps={dropdownListProps}
        isLoading={isLoading}
        emptyText={dropdownProps?.emptyText}
      />
    </DropdownBase>
  );
}
