import { View } from 'react-native';
import { DropdownMenuItemPropsTw } from '@types';
import { useImperativeHandle, useRef, useCallback, useState, useEffect } from 'react';

import useDropdownMenuPosition from './useDropdownMenuPosition';
import { useDropdownKeyboard } from '../../inputSelectDropdown/hooks';
import useCalculateDropdownMenuPosition from './useCalculateDropdownMenuPosition';

interface DropdownMenuHookParams {
  open?: boolean;
  offsetX?: number;
  offsetY?: number;
  disabled?: boolean;
  onBlur?: () => void;
  hasScroll?: boolean;
  onFocus?: () => void;
  defaultOpen?: boolean;
  dropdownWidth: number;
  closeModalWhenSelectedItem?: boolean;
  selectedItem?: DropdownMenuItemPropsTw;
  onOpenChange?: (open: boolean) => void;
  verticalPosition: 'top' | 'bottom' | 'auto';
  onSelectItem?: (item: DropdownMenuItemPropsTw) => void;
  horizontalPosition: 'left' | 'right' | 'center' | 'auto';
}

export default function useDropdownMenu(
  {
    closeModalWhenSelectedItem = true,
    defaultOpen = false,
    disabled = false,
    dropdownWidth,
    hasScroll = true,
    horizontalPosition,
    offsetX = 0,
    offsetY = 0,
    onBlur,
    onFocus,
    onOpenChange,
    onSelectItem,
    open,
    verticalPosition,
  }: DropdownMenuHookParams,
  currentRef: React.Ref<any>,
) {
  const inputRef = useRef<any>(null);
  const wrapperRef = useRef<View | null>(null);
  const dropdownRef = useRef<View | null>(null);
  const [internalVisible, setInternalVisible] = useState(defaultOpen || false);
  const visible = open !== undefined ? open : internalVisible;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [calculatedVerticalPosition, setCalculatedVerticalPosition] = useState<'top' | 'bottom'>('bottom');
  const [calculatedHorizontalPosition, setCalculatedHorizontalPosition] = useState<'left' | 'right' | 'center'>('left');
  const [actualDropdownWidth, setActualDropdownWidth] = useState(dropdownWidth);
  const [actualVerticalPosition, setActualVerticalPosition] = useState(verticalPosition);
  const [actualHorizontalPosition, setActualHorizontalPosition] = useState(horizontalPosition);
  const [actualOffsetX, setActualOffsetX] = useState(offsetX);
  const [actualOffsetY, setActualOffsetY] = useState(offsetY);

  const { getDropdownPosition } = useDropdownMenuPosition({
    dropdownWidth: actualDropdownWidth,
    horizontalPosition: actualHorizontalPosition,
    inputRef,
    setDropdownPosition: (vertical, horizontal) => {
      setCalculatedVerticalPosition(vertical);
      setCalculatedHorizontalPosition(horizontal);
    },
    verticalPosition: actualVerticalPosition,
    waitForKeyboard: false,
  });

  const { calculatePosition, dropdownStyles } = useCalculateDropdownMenuPosition({
    dropdownWidth: actualDropdownWidth,
    horizontalPosition: calculatedHorizontalPosition,
    inputRef,
    offsetX: actualOffsetX,
    offsetY: actualOffsetY,
    verticalPosition: calculatedVerticalPosition,
    wrapperRef,
  });

  const toggleDropdown = useCallback(() => {
    if (disabled) return;

    if (open !== undefined) {
      // Si open est contrôlé de l'extérieur, on appelle seulement onOpenChange
      onOpenChange?.(!visible);
    } else {
      // Si open n'est pas fourni, on gère l'état interne
      if (visible) {
        setInternalVisible(false);
        onBlur?.();
      } else {
        setInternalVisible(true);
        onFocus?.();
      }
      onOpenChange?.(!visible);
    }
  }, [disabled, visible, onBlur, onFocus, onOpenChange, open]);

  const eventOpen = useCallback(() => {
    if (disabled) return;

    if (open !== undefined) {
      onOpenChange?.(true);
    } else {
      setInternalVisible(true);
      onFocus?.();
      onOpenChange?.(true);
    }
  }, [disabled, onFocus, onOpenChange, open]);

  const eventClose = useCallback(() => {
    if (open !== undefined) {
      onOpenChange?.(false);
    } else {
      setInternalVisible(false);
      onBlur?.();
      onOpenChange?.(false);
    }
  }, [onBlur, onOpenChange, open]);

  const handleSelectItem = useCallback(
    (item: DropdownMenuItemPropsTw) => {
      onSelectItem?.(item);
      item.onPress?.();

      if (closeModalWhenSelectedItem) {
        if (open !== undefined) {
          onOpenChange?.(false);
        } else {
          setInternalVisible(false);
          onBlur?.();
        }
      }
    },
    [onSelectItem, closeModalWhenSelectedItem, onBlur, onOpenChange, open],
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
    setDropdownPosition: (vertical: 'top' | 'bottom' | 'auto', horizontal: 'left' | 'right' | 'center' | 'auto') => {
      setActualVerticalPosition(vertical);
      setActualHorizontalPosition(horizontal);
    },
    setDropdownWidth: setActualDropdownWidth,
    setOffsets: (newOffsetX: number, newOffsetY: number) => {
      setActualOffsetX(newOffsetX);
      setActualOffsetY(newOffsetY);
    },
  };
}
