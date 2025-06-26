import type { LayoutChangeEvent } from 'react-native';

import { FlatList } from 'react-native';
import { memo, useCallback, useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { InputDropdownProps } from '../../types';

import { Box } from '../box';
import { Input } from '../inputs';

function ItemSeparator() {
  return <Box className="h-px w-full bg-neutral-200" />;
}

function InputDropdown(props: InputDropdownProps) {
  const [footerHeight, setFooterHeight] = useState(0);
  const [searchText, setSearchText] = useState('');
  const {
    dataSet,
    footer,
    hasItemSeparator,
    hasSearch = false,
    ItemSeparatorComponent,
    onSearch,
    renderItem,
    searchInputProps,
    searchRef,
    suggestionsListMaxHeight,
    withAnimation = true,
    ...rest
  } = props;

  const maxHeight = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: maxHeight.value,
  }));

  const getFooterHeight = useCallback((event: LayoutChangeEvent) => {
    setFooterHeight(event.nativeEvent.layout.height);
  }, []);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchText(text);
      onSearch?.(text);
    },
    [onSearch],
  );

  useEffect(() => {
    if (withAnimation) {
      maxHeight.value = withTiming(suggestionsListMaxHeight ?? 250, {
        duration: 200,
      });
    }
  }, [suggestionsListMaxHeight, maxHeight, withAnimation]);

  return (
    <Animated.View
      className="absolute top-full z-50 mt-1 w-full rounded-lg border border-neutral-200 bg-white p-2 shadow-md"
      style={[withAnimation ? animatedStyle : {}, { paddingBottom: footerHeight }]}
    >
      {hasSearch && (
        <Input
          inputRef={searchRef}
          placeholder="Rechercher un pays..."
          value={searchText}
          onChangeText={handleSearch}
          size="xs"
          className="mb-1"
          {...searchInputProps}
        />
      )}

      <FlatList
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        data={dataSet}
        style={{ maxHeight: suggestionsListMaxHeight }}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={
          ItemSeparatorComponent || hasItemSeparator ? (ItemSeparatorComponent ?? ItemSeparator) : undefined
        }
        {...rest}
      />
      {footer && (
        <Box className="absolute bottom-0 left-0 right-0" onLayout={getFooterHeight}>
          {footer}
        </Box>
      )}
    </Animated.View>
  );
}

export default memo(InputDropdown);
