import { FlatList, Keyboard, KeyboardEvent, View } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, memo } from 'react';

import cn from '../cn';
import Input from '../inputs/Input';
import { useDeviceOrientation } from './utils';
import InputDropdownModal from '../inputDrodown/InputDropdownModal';
import { IDropdownRef, InputSelectDropdownProps } from '../../types';
import useCalculateDropDownPosition from './hooks/useCalculateDropdownPosition';
import { get, debounce, isEqual, findIndex, differenceWith } from '../../utils';

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

const InputSelectDropdown = React.forwardRef<IDropdownRef, InputSelectDropdownProps<any>>((props, currentRef) => {
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

  const [state, setState] = useState<DropdownState>({
    currentValue: null,
    keyboardHeight: 0,
    listData: dataSet,
    position: null,
    searchText: '',
    visible: false,
  });

  const { measureComponent, position } = useCalculateDropDownPosition(ref);

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
      console.log('dataSearch', dataSearch);

      if (excludeSearchItems.length > 0 || excludeItems.length > 0) {
        const excludeSearchData = differenceWith(dataSearch, excludeSearchItems, (obj1, obj2) =>
          isEqual(get(obj1, valueField), get(obj2, valueField)),
        );
        const filterData = excludeData(excludeSearchData);
        console.log('filterData', filterData);
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

  const isSelected = state.currentValue && get(state.currentValue, valueField);

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
      <Input
        editable={false}
        onPress={toggleDropdown}
        placeholder={inputProps?.placeholder ?? DEFAULT_CONFIG.PLACEHOLDER}
        value={isSelected ? get(state.currentValue, valueField) : undefined}
        rightIconAction={{
          iconColor: 'black',
          iconName: state.visible ? 'angle-up-solid' : 'angle-down-solid',
          iconPress: toggleDropdown,
        }}
        {...inputProps}
      />
      {/* {renderModal()} */}
      <InputDropdownModal
        dropdownPosition={position}
        toggleDropdown={toggleDropdown}
        dropdownProps={{
          data: state.listData,
          dropdownItemProps,
          hasSearch,
          maxHeight,
          minHeight,
          onSelectItem,
          valueField,
          visible: state.visible,
          ...dropdownProps,
        }}
        modalProps={{
          onRequestClose: () => setState(prev => ({ ...prev, visible: false })),
          statusBarTranslucent: true,
          transparent: true,
          visible: state.visible,
        }}
      />
    </View>
  );
});

InputSelectDropdown.displayName = 'InputSelectDropdown';

export default memo(InputSelectDropdown);
