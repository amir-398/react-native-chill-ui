import { View } from 'react-native';
import { useImperativeHandle, useRef, useCallback, useState, useEffect } from 'react';

import useDropdownMenuPosition from './useDropdownMenuPosition';
import { useDropdownKeyboard } from '../../inputSelectDropdown/hooks';
import { DropdownMenuItemProps } from '../../../types/dropdownMenu.types';
import useCalculateDropdownMenuPosition from './useCalculateDropdownMenuPosition';

interface DropdownMenuHookParams {
  offsetX?: number;
  offsetY?: number;
  disabled?: boolean;
  onBlur?: () => void;
  hasScroll?: boolean;
  onFocus?: () => void;
  dropdownWidth: number;
  items: DropdownMenuItemProps[];
  selectedItem?: DropdownMenuItemProps;
  closeModalWhenSelectedItem?: boolean;
  verticalPosition: 'top' | 'bottom' | 'auto';
  onSelectItem?: (item: DropdownMenuItemProps) => void;
  horizontalPosition: 'left' | 'right' | 'center' | 'auto';
}

export default function useDropdownMenu(
  {
    closeModalWhenSelectedItem = true,
    disabled = false,
    dropdownWidth,
    hasScroll = true,
    horizontalPosition,
    offsetX = 0,
    offsetY = 0,
    onBlur,
    onFocus,
    onSelectItem,
    verticalPosition,
  }: DropdownMenuHookParams,
  currentRef: React.Ref<any>,
) {
  const inputRef = useRef<any>(null);
  const wrapperRef = useRef<View | null>(null);
  const dropdownRef = useRef<View | null>(null);
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

  const toggleDropdown = useCallback(() => {
    if (disabled) return;

    if (visible) {
      setVisible(false);
      onBlur?.();
    } else {
      setVisible(true);
      onFocus?.();
    }
  }, [disabled, visible, onBlur, onFocus]);

  const eventOpen = useCallback(() => {
    if (disabled) return;
    setVisible(true);
    onFocus?.();
  }, [disabled, onFocus]);

  const eventClose = useCallback(() => {
    setVisible(false);
    onBlur?.();
  }, [onBlur]);

  const handleSelectItem = useCallback(
    (item: DropdownMenuItemProps) => {
      onSelectItem?.(item);
      item.onPress?.();

      if (closeModalWhenSelectedItem) {
        setVisible(false);
        onBlur?.();
      }
    },
    [onSelectItem, closeModalWhenSelectedItem, onBlur],
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
    wrapperRef,

    // Actions
    dropdownStyles,
    eventClose,
    eventOpen,
    handleSelectItem,
    toggleDropdown,

    // Utils
    calculatePosition,
  };
}
