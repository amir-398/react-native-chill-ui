import { useCallback } from 'react';
import { Keyboard } from 'react-native';

import { DropdownActions } from '../types';

interface DropdownActionsParams {
  visible: boolean;
  disabled: boolean;
  searchText: string;
  onOpen?: () => void;
  onClose?: () => void;
  keyboardHeight: number;
  onMeasure?: () => void;
  onResetSearch?: () => void;
  getDropdownPosition: () => void;
  setVisible: (visible: boolean) => void;
  onPerformSearch?: (text: string) => void;
}

export default function useDropdownActions({
  disabled,
  getDropdownPosition,
  keyboardHeight,
  onClose,
  onMeasure,
  onOpen,
  onPerformSearch,
  onResetSearch,
  searchText,
  setVisible,
  visible,
}: DropdownActionsParams): DropdownActions {
  const eventOpen = useCallback(() => {
    if (disabled) return;
    getDropdownPosition();
    onMeasure?.();
    setVisible(true);
    onOpen?.();

    if (searchText.length > 0) {
      onPerformSearch?.(searchText);
    }
  }, [disabled, getDropdownPosition, onMeasure, setVisible, onOpen, searchText, onPerformSearch]);

  const eventClose = useCallback(() => {
    if (disabled) return;

    setVisible(false);
    onClose?.();
  }, [disabled, setVisible, onClose]);

  const toggleDropdown = useCallback(() => {
    if (disabled) return;

    getDropdownPosition();

    const willBeVisible = !visible;

    // Handle keyboard
    if (keyboardHeight > 0 && !willBeVisible) {
      Keyboard.dismiss();
      return;
    }

    // Reset search when closing
    if (!willBeVisible) {
      onResetSearch?.();
      onPerformSearch?.('');
    }

    onMeasure?.();
    setVisible(willBeVisible);

    // Callbacks
    if (willBeVisible) {
      onOpen?.();
    } else {
      onClose?.();
    }

    // Search if necessary
    if (searchText.length > 0) {
      onPerformSearch?.(searchText);
    }
  }, [
    disabled,
    visible,
    keyboardHeight,
    getDropdownPosition,
    onResetSearch,
    onPerformSearch,
    onMeasure,
    setVisible,
    onOpen,
    onClose,
    searchText,
  ]);

  return {
    eventClose,
    eventOpen,
    toggleDropdown,
  };
}
