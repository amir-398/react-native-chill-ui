import { useCallback } from 'react';
import { BoxSs } from '@components/box';
import { StringSs } from '@components/string';
import { LoadingIndicator } from '@components/loadingIndicatorsKit';
import { FlatList, TouchableOpacity, Pressable, TouchableHighlight } from 'react-native';

import type { InputDropdownListProps } from '../../../types/inputDropdown/inputDropdown.ss.types';

import { styles } from '../styles/InputDropdownList.ss.styles';

/**
 * InputDropdownList component with StyleSheet styling.
 * Renders a scrollable list of dropdown items with loading states, empty states, and customizable item rendering.
 * Uses React Native StyleSheet for optimal performance and consistent styling across platforms.
 *
 * @example
 * ```tsx
 * <InputDropdownList
 *   data={options}
 *   onSelectItem={(item) => handleSelect(item)}
 *   isLoading={loading}
 *   emptyText="No options available"
 *   itemClickableAs="TouchableOpacity"
 *   DropdownItemRender={({ item }) => <Text>{item.label}</Text>}
 * />
 * ```
 *
 * @param data - Array of data items to display in the list
 * @param onSelectItem - Callback function when an item is selected
 * @param isLoading - Whether the list is in a loading state
 * @param emptyText - Text to display when the data array is empty
 * @param customEmpty - Custom component to render when the list is empty
 * @param customLoadingIndicator - Custom loading indicator component
 * @param DropdownItemRender - Custom render function for dropdown items
 * @param dropdownItemProps - Props to pass to each dropdown item component
 * @param loadingIndicatorProps - Props for the default loading indicator
 * @param dropdownListProps - Props to pass to the underlying FlatList component
 * @param itemClickableAs - Type of touchable component for items ('TouchableOpacity' | 'Pressable' | 'TouchableHighlight' | 'RipplePressable' | 'none')
 * @returns Scrollable list component with items, loading, and empty states
 */
export default function InputDropdownList({
  customEmpty,
  customLoadingIndicator,
  data,
  dropdownItemProps,
  DropdownItemRender,
  dropdownListProps,
  emptyText,
  isLoading,
  itemClickableAs,
  loadingIndicatorProps,
  onSelectItem,
}: InputDropdownListProps) {
  const { name = 'spinner', ...loadingIndicatorPropsRest } = loadingIndicatorProps || {};

  const renderListItem = useCallback(
    ({ index, item }: { item: any; index: number }): React.ReactElement | null => {
      if (DropdownItemRender?.(item)) {
        switch (itemClickableAs) {
          case 'touchable-opacity':
            return (
              <TouchableOpacity
                key={item?.id ?? index.toString()}
                onPress={() => onSelectItem?.(item)}
                activeOpacity={0.7}
              >
                {DropdownItemRender(item)}
              </TouchableOpacity>
            );

          case 'pressable':
            return (
              <Pressable
                key={item?.id ?? index.toString()}
                onPress={() => onSelectItem?.(item)}
                android_ripple={{ color: dropdownItemProps?.activeBackgroundColor ?? '#F6F7F8' }}
              >
                {DropdownItemRender(item)}
              </Pressable>
            );

          case 'touchable-highlight':
            return (
              <TouchableHighlight
                key={item?.id ?? index.toString()}
                onPress={() => onSelectItem?.(item)}
                underlayColor={dropdownItemProps?.activeBackgroundColor ?? '#F6F7F8'}
              >
                {DropdownItemRender(item)}
              </TouchableHighlight>
            );

          default:
            return <>{DropdownItemRender(item)}</>;
        }
      }
      return (
        <BoxSs key={item?.id ?? index.toString()}>
          <StringSs>{item?.label}</StringSs>
        </BoxSs>
      );
    },
    [DropdownItemRender, itemClickableAs, dropdownItemProps, onSelectItem],
  );

  const ListEmptyComponent = useCallback(() => {
    if (customEmpty) return customEmpty();
    if (!emptyText) return null;
    return (
      <BoxSs style={styles.emptyContainer}>
        <StringSs position="center">{emptyText}</StringSs>
      </BoxSs>
    );
  }, [emptyText, customEmpty]);

  if (isLoading) {
    return (
      <BoxSs style={styles.loadingContainer}>
        {customLoadingIndicator ? (
          customLoadingIndicator()
        ) : (
          <LoadingIndicator name={name} {...loadingIndicatorPropsRest} />
        )}
      </BoxSs>
    );
  }

  return (
    <FlatList
      {...dropdownListProps}
      keyboardShouldPersistTaps="handled"
      data={data}
      renderItem={renderListItem}
      ListEmptyComponent={ListEmptyComponent}
      keyExtractor={(item, index) => item?.id || index.toString()}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      windowSize={10}
      nestedScrollEnabled
    />
  );
}
