import { FlatList, View } from 'react-native';
import { useImperativeHandle, useRef, useCallback, useState, useEffect } from 'react';

import { DropdownMenuItem } from '../../../types';
import useDropdownMenuPosition from './useDropdownMenuPosition';
import useDropdownMenuSelection from './useDropdownMenuSelection';
import { useDropdownKeyboard } from '../../inputSelectDropdown/hooks';
import useCalculateDropdownMenuPosition from './useCalculateDropdownMenuPosition';

interface DropdownMenuHookParams {
  offsetX?: number;
  offsetY?: number;
  disabled?: boolean;
  onBlur?: () => void;
  hasScroll?: boolean;
  onFocus?: () => void;
  dropdownWidth: number;
  hasAutoScroll?: boolean;
  items: DropdownMenuItem[];
  selectedItem?: DropdownMenuItem;
  closeModalWhenSelectedItem?: boolean;
  verticalPosition: 'top' | 'bottom' | 'auto';
  onSelectItem?: (item: DropdownMenuItem) => void;
  horizontalPosition: 'left' | 'right' | 'center' | 'auto';
}

export default function useDropdownMenu(
  {
    closeModalWhenSelectedItem = true,
    disabled = false,
    dropdownWidth,
    hasAutoScroll = false,
    hasScroll = true,
    horizontalPosition,
    items = [],
    offsetX = 0,
    offsetY = 0,
    onBlur,
    onFocus,
    onSelectItem,
    selectedItem,
    verticalPosition,
  }: DropdownMenuHookParams,
  currentRef: React.Ref<any>,
) {
  const inputRef = useRef<any>(null);
  const wrapperRef = useRef<View | null>(null);
  const dropdownRef = useRef<View | null>(null);
  const refList = useRef<FlatList | null>(null);
  const [visible, setVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [calculatedVerticalPosition, setCalculatedVerticalPosition] = useState<'top' | 'bottom'>('bottom');
  const [calculatedHorizontalPosition, setCalculatedHorizontalPosition] = useState<'left' | 'right' | 'center'>('left');

  const { getDropdownPosition } = useDropdownMenuPosition({
    dropdownWidth,
    horizontalPosition,
    inputRef,
    setDropdownPosition: (vertical, horizontal) => {
      setCalculatedVerticalPosition(vertical);
      setCalculatedHorizontalPosition(horizontal);
    },
    verticalPosition,
    waitForKeyboard: false,
  });

  const { calculatePosition, dropdownStyles } = useCalculateDropdownMenuPosition({
    dropdownWidth,
    horizontalPosition: calculatedHorizontalPosition,
    inputRef,
    offsetX,
    offsetY,
    verticalPosition: calculatedVerticalPosition,
    wrapperRef,
  });

  // Callback pour l'auto-scroll
  const handleScrollToIndex = useCallback(
    (index: number) => {
      if (refList.current && hasAutoScroll) {
        try {
          refList.current.scrollToIndex({
            animated: true,
            index,
            viewPosition: 0.5, // Centrer l'élément dans la vue
          });
        } catch (error) {
          console.warn(`scrollToIndex error: ${error}`);
          // Fallback: scroll to offset
          try {
            refList.current.scrollToOffset({
              animated: true,
              offset: index * 60, // Estimation de la hauteur d'un élément
            });
          } catch (fallbackError) {
            console.warn(`scrollToOffset fallback error: ${fallbackError}`);
          }
        }
      }
    },
    [hasAutoScroll],
  );

  const {
    handleDropdownOpen,
    handleSelectItem: handleSelectionItem,
    scrollToSelectedIndex,
  } = useDropdownMenuSelection({
    hasAutoScroll,
    items,
    onItemSelect: onSelectItem,
    onScrollToIndex: handleScrollToIndex,
    selectedItem,
  });

  const toggleDropdown = useCallback(() => {
    if (disabled) return;

    if (visible) {
      setVisible(false);
      onBlur?.();
    } else {
      setVisible(true);
      onFocus?.();
      // Déclencher l'auto-scroll après l'ouverture
      handleDropdownOpen();
    }
  }, [disabled, visible, onBlur, onFocus, handleDropdownOpen]);

  const eventOpen = useCallback(() => {
    if (disabled) return;
    setVisible(true);
    onFocus?.();
    handleDropdownOpen();
  }, [disabled, onFocus, handleDropdownOpen]);

  const eventClose = useCallback(() => {
    setVisible(false);
    onBlur?.();
  }, [onBlur]);

  const handleSelectItem = useCallback(
    (item: DropdownMenuItem) => {
      handleSelectionItem(item);
      item.onPress?.();

      if (closeModalWhenSelectedItem) {
        setVisible(false);
        onBlur?.();
      }
    },
    [handleSelectionItem, closeModalWhenSelectedItem, onBlur],
  );

  useEffect(() => {
    const calculate = async () => {
      if (visible) {
        const [newVerticalPosition, newHorizontalPosition] = await getDropdownPosition();
        calculatePosition(newVerticalPosition, newHorizontalPosition);
      }
    };
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useDropdownKeyboard({
    onKeyboardHide: () => setKeyboardHeight(0),
    onKeyboardShow: setKeyboardHeight,
    onMeasure: () => calculatePosition(),
  });

  useImperativeHandle(
    currentRef,
    () => ({
      close: eventClose,
      open: eventOpen,
    }),
    [eventClose, eventOpen],
  );

  return {
    // state
    hasScroll,
    keyboardHeight,
    visible,

    // Refs
    dropdownRef,
    inputRef,
    refList,
    wrapperRef,

    // Actions
    dropdownStyles,
    eventClose,
    eventOpen,
    handleSelectItem,
    toggleDropdown,

    // Selection
    scrollToSelectedIndex,

    // Utils
    calculatePosition,
  };
}
