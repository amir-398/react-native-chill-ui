import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, memo } from 'react';
import {
  Dimensions,
  FlatList,
  I18nManager,
  Keyboard,
  KeyboardEvent,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import cn from '@/components/cn';
import { Box } from '@/components/box';
import String from '@/components/string';
import Input from '@/components/inputs/Input';

import { useDetectDevice, useDeviceOrientation } from '../utils';
import { IDropdownRef, SelectDropdownProps } from '../../../types';
import { get, debounce, assign, isEqual, findIndex, differenceWith } from '../../../utils';

const { isTablet } = useDetectDevice;

const statusBarHeight: number = StatusBar.currentHeight || 0;

// default config
const DEFAULT_CONFIG = {
  DEBOUNCE_DELAY: 200,
  FALLBACK_THRESHOLD: 100,
  MAX_HEIGHT: 340,
  MIN_HEIGHT: 0,
  PLACEHOLDER: 'Select item',
  SCROLL_THRESHOLD: 150,
} as const;

// types
interface Position {
  top: number;
  left: number;
  width: number;
  bottom: number;
  height: number;
  isFull: boolean;
}

interface DropdownState {
  listData: any[];
  visible: boolean;
  currentValue: any;
  searchText: string;
  keyboardHeight: number;
  position: Position | null;
}

const InputDropdown = React.forwardRef<IDropdownRef, SelectDropdownProps<any>>((props, currentRef) => {
  const orientation = useDeviceOrientation();

  const {
    autoScroll = true,
    closeModalWhenSelectedItem = true,
    confirmSelectItem,
    customDropdownItem,
    customInputSearch,
    dataSet = [],
    disable = false,
    dropdownItemProps,
    dropdownPosition = 'auto',
    dropdownProps,
    excludeItems = [],
    excludeSearchItems = [],
    hasSearch = false,
    inputProps,
    keyboardAvoiding = true,
    maxHeight = DEFAULT_CONFIG.MAX_HEIGHT,
    minHeight = DEFAULT_CONFIG.MIN_HEIGHT,
    mode = 'default',
    onBlur,
    onConfirmSelectItem,
    onFocus,
    onSelectItem,
    searchField,
    searchInputProps,
    searchQuery,
    valueField,
  } = props;

  const ref = useRef<View>(null);
  const refList = useRef<FlatList>(null);
  const inputRef = useRef<any>(null);

  const [state, setState] = useState<DropdownState>({
    currentValue: null,
    keyboardHeight: 0,
    listData: dataSet,
    position: null,
    searchText: '',
    visible: false,
  });

  const { height: H, width: W } = Dimensions.get('window');

  const styleHorizontal: ViewStyle = useMemo(
    () => ({
      alignSelf: 'center',
      width: orientation === 'LANDSCAPE' ? W / 2 : '100%',
    }),
    [W, orientation],
  );

  // Fonction utilitaire pour exclure les données
  const excludeData = useCallback(
    (dataToFilter: any[]) => {
      if (excludeItems.length === 0) return dataToFilter || [];

      return (
        differenceWith(dataToFilter, excludeItems, (obj1, obj2) =>
          isEqual(get(obj1, valueField), get(obj2, valueField)),
        ) || []
      );
    },
    [excludeItems, valueField],
  );

  // perform search with debounce
  const performSearch = useCallback(
    (text: string) => {
      if (text.length === 0) {
        const filterData = excludeData(dataSet);
        setState(prev => ({ ...prev, listData: filterData }));
        return;
      }

      const createSearchFilter = () => {
        if (searchQuery) {
          return (e: any) => {
            const labelText = get(e, searchField || valueField);
            return searchQuery(text, labelText);
          };
        }

        return (e: any) => {
          const item = get(e, searchField || valueField)
            ?.toLowerCase()
            .replace(/\s/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
          const key = text
            .toLowerCase()
            .replace(/\s/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

          return item?.indexOf(key) >= 0;
        };
      };

      const searchFilter = createSearchFilter();
      const dataSearch = dataSet.filter(searchFilter);
      if (excludeSearchItems.length > 0 || excludeItems.length > 0) {
        const excludeSearchData = differenceWith(dataSearch, excludeSearchItems, (obj1, obj2) =>
          isEqual(get(obj1, valueField), get(obj2, valueField)),
        );
        const filterData = excludeData(excludeSearchData);
        setState(prev => ({ ...prev, listData: filterData }));
      } else {
        setState(prev => ({ ...prev, listData: dataSearch }));
      }
    },
    [dataSet, searchQuery, excludeSearchItems, excludeItems, searchField, valueField, excludeData],
  );

  // Gestion de la recherche avec debounce
  const debouncedSearch = useMemo(() => debounce(performSearch, DEFAULT_CONFIG.DEBOUNCE_DELAY), [performSearch]);

  // Effet pour la synchronisation des données
  useEffect(() => {
    if (dataSet && state.searchText.length === 0) {
      const filterData = excludeData(dataSet);
      setState(prev => ({ ...prev, listData: [...filterData] }));
    }

    if (state.searchText) {
      debouncedSearch(state.searchText);
    }

    // Cleanup debounce
    return () => {
      debouncedSearch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSet, state.searchText]);

  // Fonction de mesure des dimensions
  const measureComponent = useCallback(() => {
    if (!ref.current) return;

    ref.current.measureInWindow((pageX, pageY, width, height) => {
      const isFull = isTablet ? false : mode === 'modal' || orientation === 'LANDSCAPE';
      const isAutoMode = mode === 'auto';

      const top = isFull && !isAutoMode ? 20 : height + pageY;
      const bottom = H - top + height;
      const left = I18nManager.isRTL ? W - width - pageX : pageX;

      setState(prev => ({
        ...prev,
        position: {
          bottom: Math.floor(bottom - statusBarHeight),
          height: Math.floor(height),
          isFull: isFull && !isAutoMode,
          left: Math.floor(left),
          top: Math.floor(top + statusBarHeight),
          width: Math.floor(width),
        },
      }));
    });
  }, [H, W, orientation, mode]);

  // Gestion des événements d'ouverture/fermeture
  const eventOpen = useCallback(() => {
    if (disable) return;

    measureComponent();
    setState(prev => ({ ...prev, visible: true }));
    onFocus?.();

    if (state.searchText.length > 0) {
      performSearch(state.searchText);
    }
  }, [disable, onFocus, state.searchText, performSearch, measureComponent]);

  const eventClose = useCallback(() => {
    if (disable) return;

    setState(prev => ({ ...prev, visible: false }));
    onBlur?.();
  }, [disable, onBlur]);

  // Méthodes d'interface exposées
  useImperativeHandle(
    currentRef,
    () => ({
      close: eventClose,
      open: eventOpen,
    }),
    [eventClose, eventOpen],
  );
  // Gestion du clavier
  const handleKeyboardShow = useCallback(
    (e: KeyboardEvent) => {
      measureComponent();
      setState(prev => ({ ...prev, keyboardHeight: e.endCoordinates.height }));
    },
    [measureComponent],
  );

  const handleKeyboardHide = useCallback(() => {
    setState(prev => ({ ...prev, keyboardHeight: 0 }));
    measureComponent();
  }, [measureComponent]);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      keyboardShowListener?.remove();
      keyboardHideListener?.remove();
    };
  }, [handleKeyboardShow, handleKeyboardHide]);

  // Gestion de la valeur sélectionnée
  const updateCurrentValue = useCallback(() => {
    const defaultValue = typeof inputProps?.value === 'object' ? get(inputProps?.value, valueField) : inputProps?.value;
    const selectedItem = dataSet.find((e: any) => isEqual(defaultValue, get(e, valueField)));

    setState(prev => ({ ...prev, currentValue: selectedItem || null }));
  }, [dataSet, inputProps?.value, valueField]);

  useEffect(() => {
    updateCurrentValue();
  }, [updateCurrentValue]);

  // Scroll automatique avec debounce
  const scrollToSelectedIndex = useMemo(
    () =>
      debounce(() => {
        if (!autoScroll || !dataSet?.length || state.listData?.length !== dataSet?.length) return;
        if (!refList?.current) return;

        const defaultValue =
          typeof inputProps?.value === 'object' ? get(inputProps?.value, valueField) : inputProps?.value;
        const index = findIndex(state.listData, e => isEqual(defaultValue, get(e, valueField)));

        if (index > -1 && index < state.listData.length) {
          try {
            refList.current.scrollToIndex({
              animated: false,
              index,
            });
          } catch (error) {
            console.warn(`scrollToIndex error: ${error}`);
          }
        }
      }, DEFAULT_CONFIG.DEBOUNCE_DELAY),
    [autoScroll, dataSet?.length, state.listData, inputProps?.value, valueField],
  );

  // Toggle du dropdown
  const toggleDropdown = useCallback(() => {
    if (disable) return;

    const willBeVisible = !state.visible;

    // handle keyboard
    if (state.keyboardHeight > 0 && !willBeVisible) {
      Keyboard.dismiss();
      return;
    }

    // reset search when close
    if (!willBeVisible) {
      setState(prev => ({ ...prev, searchText: '' }));
      performSearch('');
    }

    measureComponent();
    setState(prev => ({ ...prev, visible: willBeVisible }));

    // update dataSet
    if (dataSet) {
      const filterData = excludeData(dataSet);
      setState(prev => ({ ...prev, listData: filterData }));
    }

    // callbacks
    if (willBeVisible) {
      onFocus?.();
    } else {
      onBlur?.();
    }

    // search if necessary
    if (state.searchText.length > 0) {
      performSearch(state.searchText);
    }
  }, [
    disable,
    state.visible,
    state.keyboardHeight,
    state.searchText,
    measureComponent,
    dataSet,
    excludeData,
    onFocus,
    onBlur,
    performSearch,
  ]);

  // Sélection d'un élément
  const selectItem = useCallback(
    (item: any) => {
      if (confirmSelectItem && onConfirmSelectItem) {
        return onConfirmSelectItem(item);
      }

      setState(prev => ({ ...prev, currentValue: item }));
      onSelectItem?.(item);

      if (closeModalWhenSelectedItem) {
        setState(prev => ({ ...prev, searchText: '', visible: false }));
        performSearch('');
        onBlur?.();
      }
      return undefined;
    },
    [confirmSelectItem, onSelectItem, onConfirmSelectItem, performSearch, closeModalWhenSelectedItem, onBlur],
  );

  // handle search text change
  const handleSearchTextChange = useCallback(
    (text: string) => {
      searchInputProps?.onChangeText?.(text);
      setState(prev => ({ ...prev, searchText: text }));
      performSearch(text);

      // Ouvrir le dropdown au début de la saisie
      if (!state.visible) {
        eventOpen();
      }
    },
    [performSearch, searchInputProps, state.visible, eventOpen],
  );

  console.log('state.searchText', state.searchText);

  const renderInput = useCallback(() => {
    const isSelected = state.currentValue && get(state.currentValue, valueField);

    return (
      <Input
        placeholder={inputProps?.placeholder ?? DEFAULT_CONFIG.PLACEHOLDER}
        value={state.searchText || (isSelected ? get(state.currentValue, valueField) : undefined)}
        onChangeText={handleSearchTextChange}
        {...inputProps}
      />
    );
  }, [inputProps, state.currentValue, state.searchText, valueField, handleSearchTextChange]);

  // Rendu d'un élément de la liste - mémorisé pour les performances
  const renderListItem = useCallback(
    ({ index, item }: { item: any; index: number }) => {
      const isSelected = state.currentValue && get(state.currentValue, valueField);
      const selected = isEqual(get(item, valueField), isSelected);
      assign(item, { _index: index });

      return (
        <TouchableHighlight
          key={index.toString()}
          onPress={() => selectItem(item)}
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
    [dropdownItemProps, state.currentValue, valueField, selectItem, customDropdownItem],
  );

  const renderList = useCallback(
    () => (
      <TouchableWithoutFeedback>
        <Box className="flex-shrink">
          <FlatList
            {...dropdownProps}
            keyboardShouldPersistTaps="handled"
            ref={refList}
            onContentSizeChange={scrollToSelectedIndex}
            onScrollToIndexFailed={scrollToSelectedIndex}
            data={state.listData}
            renderItem={renderListItem}
            keyExtractor={(_item, index) => index.toString()}
            removeClippedSubviews
            maxToRenderPerBatch={10}
            windowSize={10}
          />
        </Box>
      </TouchableWithoutFeedback>
    ),
    [renderListItem, dropdownProps, state.listData, scrollToSelectedIndex],
  );

  // Rendu du modal
  const renderModal = useCallback(() => {
    if (!state.visible || !state.position) return null;

    const { bottom, height, isFull, left, top, width } = state.position;

    const shouldPositionTop = () => {
      if (state.keyboardHeight > 0) {
        return bottom < state.keyboardHeight + height;
      }
      return bottom < (hasSearch ? DEFAULT_CONFIG.SCROLL_THRESHOLD : DEFAULT_CONFIG.FALLBACK_THRESHOLD);
    };

    if (!width || !top || !bottom) return null;

    const styleVertical: ViewStyle = {
      left,
      maxHeight,
      minHeight,
    };

    const isTopPosition = dropdownPosition === 'auto' ? shouldPositionTop() : dropdownPosition === 'top';
    let extendHeight = !isTopPosition ? top : bottom;

    if (keyboardAvoiding && state.keyboardHeight > 0 && isTopPosition && dropdownPosition === 'auto') {
      extendHeight = state.keyboardHeight;
    }
    return (
      <Modal
        transparent
        statusBarTranslucent
        visible={state.visible}
        supportedOrientations={['landscape', 'portrait']}
        onRequestClose={toggleDropdown}
      >
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <Box className={cn('flex-1', { 'items-center bg-black/50': isFull })}>
            <Box
              className="absolute"
              style={{
                left,
                top: top - height,
                width,
                zIndex: 1000,
              }}
            >
              {renderInput()}
            </Box>
            <Box
              className={cn('flex-1', { 'items-center justify-center': isFull })}
              style={StyleSheet.flatten([
                !isTopPosition
                  ? { paddingTop: extendHeight }
                  : {
                      justifyContent: 'flex-end',
                      paddingBottom: extendHeight,
                    },
              ])}
            >
              <Box
                className={cn(
                  'elevation-lg flex-shrink rounded-lg border border-[#E5E7EB] bg-white',
                  dropdownProps?.className,
                )}
                style={StyleSheet.flatten([
                  isFull ? styleHorizontal : styleVertical,
                  { width },
                  dropdownProps?.hasShadow && {
                    shadowColor: '#000',
                    shadowOffset: {
                      height: 1,
                      width: 0,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                  },
                ])}
              >
                {renderList()}
              </Box>
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }, [
    state.visible,
    state.position,
    state.keyboardHeight,
    dropdownProps?.hasShadow,
    hasSearch,
    maxHeight,
    minHeight,
    dropdownPosition,
    keyboardAvoiding,
    toggleDropdown,
    styleHorizontal,
    renderList,
    dropdownProps?.className,
    renderInput,
  ]);

  // Cleanup effect
  useEffect(
    () => () => {
      debouncedSearch.cancel();
      scrollToSelectedIndex.cancel();
    },
    [debouncedSearch, scrollToSelectedIndex],
  );

  return (
    <View className={cn('justify-center', inputProps?.containerClassName)} ref={ref} onLayout={measureComponent}>
      {renderInput()}
      {renderModal()}
    </View>
  );
});

InputDropdown.displayName = 'InputDropdown';

export default memo(InputDropdown);
