import { useCallback } from 'react';
import { FlatList, TouchableOpacity, Pressable, TouchableHighlight } from 'react-native';

import { Box } from '../box';
import { String } from '../string';
import { RipplePressable } from '../ripplePressable';
import { InputDropdownListProps } from '../../types/dropdown.types';
import LoadingIndicator from '../loadingIndicatorsKit/LoadingIndicator';

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
  const { name = 'spinner', ...rest } = loadingIndicatorProps || {};

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
        <Box key={item?.id ?? index.toString()}>
          <String>{item?.label}</String>
        </Box>
      );
    },
    [DropdownItemRender, itemClickableAs, dropdownItemProps, onSelectItem],
  );

  const ListEmptyComponent = useCallback(() => {
    if (customEmpty) {
      return customEmpty();
    }
    if (!emptyText) return null;
    return (
      <Box className="p-3">
        <String position="center">{emptyText}</String>
      </Box>
    );
  }, [emptyText, customEmpty]);

  if (isLoading) {
    return (
      <Box className="flex-shrink items-center justify-center p-3">
        {customLoadingIndicator ? customLoadingIndicator() : <LoadingIndicator name={name} {...rest} />}
      </Box>
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
