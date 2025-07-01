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
    emptyText,
    hasSearch,
    hasShadow,
    isLoading,
    maxHeight,
    minHeight,
    onSelectItem,
    searchInputProps,
    valueField,
    visible,
    withAnimation,
  } = props;

  return (
    <DropdownBase
      visible={visible}
      maxHeight={maxHeight}
      minHeight={minHeight}
      className={className}
      hasShadow={hasShadow}
      withAnimation={withAnimation}
      hasSearch={hasSearch}
      searchInputProps={searchInputProps}
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
        emptyText={emptyText}
      />
    </DropdownBase>
  );
}
