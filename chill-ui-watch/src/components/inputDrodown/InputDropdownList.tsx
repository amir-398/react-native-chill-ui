import { useCallback } from 'react';
import { FlatList, TouchableHighlight } from 'react-native';

import cn from '../cn';
import { Box } from '../box';
import String from '../string';
import { get, isEqual } from '../../utils';
import HighlightString from '../highlightString';
import { InputDropdownListProps } from '../../types';
import LoadingIndicator from '../loadingIndicatorsKit/LoadingIndicator';

export default function InputDropdownList({
  currentValue,
  customDropdownItem,
  customEmpty,
  customLoadingIndicator,
  data,
  dropdownItemProps,
  dropdownListProps,
  emptyText,
  hasHighlightString = true,
  highlightStringProps,
  isLoading,
  loadingIndicatorProps,
  onSelectItem,
  valueField,
}: InputDropdownListProps) {
  const { name = 'spinner', ...rest } = loadingIndicatorProps || {};

  const renderListItem = useCallback(
    ({ index, item }: { item: any; index: number }) => {
      const isSelected = currentValue && valueField && get(currentValue, valueField);
      const selected = valueField ? isEqual(get(item, valueField), isSelected) : false;

      return (
        <TouchableHighlight
          key={index.toString()}
          onPress={() => onSelectItem?.(item)}
          underlayColor={dropdownItemProps?.activeBackgroundColor ?? '#F6F7F8'}
        >
          <Box>
            {customDropdownItem ? (
              customDropdownItem(item, selected)
            ) : (
              <Box className={cn('p-3', dropdownItemProps?.className)} style={{ flex: 1 }}>
                {hasHighlightString ? (
                  <HighlightString
                    text={valueField ? get(item, valueField) : item}
                    highlightTerm={highlightStringProps?.highlightTerm ?? ''}
                    stringProps={dropdownItemProps?.stringItemProps ?? {}}
                    {...highlightStringProps}
                  />
                ) : (
                  <String {...dropdownItemProps?.stringItemProps}>{valueField ? get(item, valueField) : item}</String>
                )}
              </Box>
            )}
          </Box>
        </TouchableHighlight>
      );
    },
    [
      dropdownItemProps,
      currentValue,
      valueField,
      onSelectItem,
      customDropdownItem,
      highlightStringProps,
      hasHighlightString,
    ],
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
