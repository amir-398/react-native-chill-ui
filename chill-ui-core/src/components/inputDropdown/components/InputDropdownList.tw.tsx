import { useCallback } from 'react';
import { BoxTw } from '@components/box';
import { StringTw } from '@components/string';
import { RipplePressable } from '@components/ripplePressable';
import { FlatList, TouchableOpacity, Pressable, TouchableHighlight } from 'react-native';

import { LoadingIndicator } from '@/components/loadingIndicatorsKit';

import type { InputDropdownListProps } from '../../../types/inputDropdown/inputDropdown.tw.types';

import { emptyContainerClassname, loadingContainerClassname } from '../styles/InputDropdownList.tw.styles';

/**
 * InputDropdownList component with Tailwind CSS styling.
 * Renders a scrollable list of dropdown items with loading states, empty states, and customizable item rendering.
 * Uses Tailwind CSS classes for flexible and responsive design with utility-first approach.
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
  itemClickableAs = 'TouchableHighlight',
  loadingIndicatorProps,
  onSelectItem,
}: InputDropdownListProps) {
  const { name = 'spinner', ...loadingIndicatorPropsRest } = loadingIndicatorProps || {};

  const renderListItem = useCallback(
    ({ index, item }: { item: any; index: number }): React.ReactElement | null => {
      if (DropdownItemRender?.(item)) {
        switch (itemClickableAs) {
          case 'TouchableOpacity':
            return (
              <TouchableOpacity
                key={item?.id ?? index.toString()}
                onPress={() => onSelectItem?.(item)}
                activeOpacity={0.7}
              >
                {DropdownItemRender(item)}
              </TouchableOpacity>
            );

          case 'Pressable':
            return (
              <Pressable
                key={item?.id ?? index.toString()}
                onPress={() => onSelectItem?.(item)}
                android_ripple={{ color: dropdownItemProps?.activeBackgroundColor ?? '#F6F7F8' }}
              >
                {DropdownItemRender(item)}
              </Pressable>
            );

          case 'TouchableHighlight':
            return (
              <TouchableHighlight
                key={item?.id ?? index.toString()}
                onPress={() => onSelectItem?.(item)}
                underlayColor={dropdownItemProps?.activeBackgroundColor ?? '#F6F7F8'}
              >
                {DropdownItemRender(item)}
              </TouchableHighlight>
            );

          case 'RipplePressable':
            return (
              <RipplePressable key={item?.id ?? index.toString()} onPress={() => onSelectItem?.(item)}>
                {DropdownItemRender(item)}
              </RipplePressable>
            );

          default:
            return <>{DropdownItemRender(item)}</>;
        }
      }
      return (
        <BoxTw key={item?.id ?? index.toString()}>
          <StringTw>{item?.label}</StringTw>
        </BoxTw>
      );
    },
    [DropdownItemRender, itemClickableAs, dropdownItemProps, onSelectItem],
  );

  const ListEmptyComponent = useCallback(() => {
    if (customEmpty) return customEmpty();
    if (!emptyText) return null;
    return (
      <BoxTw className={emptyContainerClassname}>
        <StringTw position="center">{emptyText}</StringTw>
      </BoxTw>
    );
  }, [emptyText, customEmpty]);

  if (isLoading) {
    return (
      <BoxTw className={loadingContainerClassname}>
        {customLoadingIndicator ? (
          customLoadingIndicator()
        ) : (
          <LoadingIndicator name={name} {...loadingIndicatorPropsRest} />
        )}
      </BoxTw>
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
