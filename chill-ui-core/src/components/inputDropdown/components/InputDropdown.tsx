import { InputDropdownProps } from '@types';
import { classNamePropsHandler } from '@utils';

import DropdownBase from './InputDropdownBase';
import DropdownList from './InputDropdownList';

/**

 * Provides a comprehensive dropdown list with search functionality, loading states, and customizable styling.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <InputDropdown
 *   visible={isOpen}
 *   data={options}
 *   hasSearch
 *   searchInputProps={{ placeholder: "Search options..." }}
 *   isLoading={loading}
 *   onSelectItem={(item) => setSelectedItem(item)}
 *   maxHeight={400}
 *   className="bg-white rounded-lg shadow-lg"
 * />
 * ```
 *
 * @param visible - Whether the dropdown is visible and should be rendered
 * @param data - Array of data items to display in the dropdown list
 * @param maxHeight - Maximum height of the dropdown container (required)
 * @param minHeight - Minimum height of the dropdown container
 * @param onSelectItem - Callback function when an item is selected from the list
 * @param className - Custom CSS classes for the dropdown container (Tailwind/CSS)
 * @param style - Custom style object for the dropdown container
 * @param hasShadow - Whether to apply shadow styling to the dropdown
 * @param hasSearch - Whether to show a search input at the top of the dropdown
 * @param hasAnimation - Whether to enable opening/closing animations (default: true)
 * @param searchInputProps - Props to pass to the search Input component
 * @param customSearchInput - Custom search input component to replace the default
 * @param emptyText - Text to display when the data array is empty
 * @param isLoading - Whether the dropdown is in a loading state
 * @param customEmpty - Custom component to render when the list is empty
 * @param customLoadingIndicator - Custom loading indicator component
 * @param dropdownItemProps - Props to pass to each dropdown item component
 * @param loadingIndicatorProps - Props for the default loading indicator
 * @param DropdownItemRender - Custom render function for dropdown items
 * @param dropdownListProps - Props to pass to the underlying FlatList component
 * @param itemClickableAs - Type of touchable component for items ('TouchableOpacity' | 'Pressable' | 'TouchableHighlight' | 'RipplePressable' | 'none')
 * @returns Styled dropdown component with search, loading states, and item selection
 */
export default function InputDropdown(props: InputDropdownProps) {
  classNamePropsHandler(props, 'InputDropdown');
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
    style,
    visible,
  } = props;

  return (
    <DropdownBase
      visible={visible}
      maxHeight={maxHeight}
      minHeight={minHeight}
      className={className}
      hasShadow={hasShadow}
      style={style}
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
