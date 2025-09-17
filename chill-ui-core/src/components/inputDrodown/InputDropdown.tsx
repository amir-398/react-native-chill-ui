import DropdownBase from './InputDropdownBase';
import DropdownList from './InputDropdownList';
import { InputDropdownProps } from '../../types/dropdown.types';

export default function InputDropdown(props: InputDropdownProps) {
  const {
    className,
    data,
    dropdownItemProps,
    DropdownItemRender,
    dropdownListProps,
    emptyText,
    hasAnimation,
    hasSearch,
    hasShadow,
    isLoading,
    itemClickableAs,
    maxHeight,
    minHeight,
    onSelectItem,
    searchInputProps,
    visible,
  } = props;

  return (
    <DropdownBase
      visible={visible}
      maxHeight={maxHeight}
      minHeight={minHeight}
      className={className}
      hasShadow={hasShadow}
      hasAnimation={hasAnimation}
      hasSearch={hasSearch}
      searchInputProps={searchInputProps}
    >
      <DropdownList
        data={data}
        onSelectItem={onSelectItem}
        dropdownItemProps={dropdownItemProps}
        DropdownItemRender={DropdownItemRender}
        dropdownListProps={dropdownListProps}
        isLoading={isLoading}
        emptyText={emptyText}
        itemClickableAs={itemClickableAs}
      />
    </DropdownBase>
  );
}
