import React, { useCallback } from 'react';
import { FlatList, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

import cn from '../../../cn';
import { Box } from '../../../box';
import String from '../../../string';
import { get, isEqual } from '../../../../utils';
import { LoadingIndicatorProps } from '../../../../types';
import LoadingIndicator from '../../../loadingIndicatorsKit/LoadingIndicator';

interface DropdownListProps {
  data: any[];
  currentValue: any;
  valueField: string;
  emptyText?: string;
  dropdownProps?: any;
  isLoading?: boolean;
  onContentSizeChange?: () => void;
  onSelectItem: (item: any) => void;
  onScrollToIndexFailed?: () => void;
  customEmpty?: () => React.ReactNode;
  loadingIndicatorProps?: LoadingIndicatorProps;
  customLoadingIndicator?: () => React.ReactNode;
  customDropdownItem?: (item: any, selected: boolean) => React.ReactNode;
  dropdownItemProps?: {
    activeBackgroundColor?: string;
    className?: string;
    textItemProps?: any;
  };
}

export default function DropdownList({
  currentValue,
  customDropdownItem,
  customEmpty,
  customLoadingIndicator,
  data,
  dropdownItemProps,
  dropdownProps,
  emptyText,
  isLoading,
  loadingIndicatorProps,
  onContentSizeChange,
  onScrollToIndexFailed,
  onSelectItem,
  valueField,
}: DropdownListProps) {
  const { name = 'spinner', ...rest } = loadingIndicatorProps || {};
  const renderListItem = useCallback(
    ({ index, item }: { item: any; index: number }) => {
      const isSelected = currentValue && get(currentValue, valueField);
      const selected = isEqual(get(item, valueField), isSelected);

      return (
        <TouchableHighlight
          key={index.toString()}
          onPress={() => onSelectItem(item)}
          underlayColor={dropdownItemProps?.activeBackgroundColor ?? '#F6F7F8'}
        >
          <Box>
            {customDropdownItem ? (
              customDropdownItem(item, selected)
            ) : (
              <Box className={cn('p-3', dropdownItemProps?.className)}>
                <String {...dropdownItemProps?.textItemProps}>{get(item, valueField)}</String>
              </Box>
            )}
          </Box>
        </TouchableHighlight>
      );
    },
    [dropdownItemProps, currentValue, valueField, onSelectItem, customDropdownItem],
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
    <TouchableWithoutFeedback>
      <Box className="flex-shrink">
        <FlatList
          {...dropdownProps}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={onContentSizeChange}
          onScrollToIndexFailed={onScrollToIndexFailed}
          data={data}
          renderItem={renderListItem}
          ListEmptyComponent={ListEmptyComponent}
          keyExtractor={(_item, index) => index.toString()}
          removeClippedSubviews
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      </Box>
    </TouchableWithoutFeedback>
  );
}
