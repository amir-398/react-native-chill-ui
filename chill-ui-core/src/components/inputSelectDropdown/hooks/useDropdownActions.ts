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

  onResetSearch?: () => void;
  setVisible: (visible: boolean) => void;
  onPerformSearch?: (text: string) => void;
}

export default function useDropdownActions({
  disabled,
  keyboardHeight,
  onClose,
  onOpen,
  onPerformSearch,
  onResetSearch,

  searchText,
  setVisible,
  visible,
}: DropdownActionsParams): DropdownActions {
  const eventOpen = useCallback(() => {
    if (disabled) return;
    setVisible(true);
    onOpen?.();

    if (searchText.length > 0) {
      onPerformSearch?.(searchText);
    }
  }, [disabled, setVisible, onOpen, searchText, onPerformSearch]);

  const eventClose = useCallback(() => {
    if (disabled) return;

    setVisible(false);
    onClose?.();
  }, [disabled, setVisible, onClose]);

  const toggleDropdown = useCallback(() => {
    if (disabled) return;

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
  }, [disabled, visible, keyboardHeight, onResetSearch, onPerformSearch, setVisible, onOpen, onClose, searchText]);

  return {
    eventClose,
    eventOpen,
    toggleDropdown,
  };
}
