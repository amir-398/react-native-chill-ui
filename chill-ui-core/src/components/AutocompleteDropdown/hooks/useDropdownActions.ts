import { useCallback } from 'react';
import { Keyboard } from 'react-native';

interface DropdownActionsParams {
  disabled: boolean;
  position?: 'auto' | 'top' | 'bottom';
  setDropdownPosition: (pos: any) => void;
  setShowDropdown: (show: boolean) => void;
  getDropdownPosition: () => Promise<void>;
  state: {
    showDropdown: boolean;
    keyboardHeight: number;
  } & Record<string, any>;
}

const useDropdownActions = ({
  disabled,
  getDropdownPosition,
  position,
  setDropdownPosition,
  setShowDropdown,
  state,
}: DropdownActionsParams) => {
  const eventOpen = useCallback(async () => {
    if (disabled) {
      return;
    }

    setShowDropdown(true);
    if ((position ?? 'auto') === 'auto') {
      await getDropdownPosition();
    } else {
      setDropdownPosition(position);
    }
  }, [disabled, setDropdownPosition, position, setShowDropdown, getDropdownPosition]);

  const eventClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowDropdown(false);
  }, [disabled, setShowDropdown]);

  const toggleDropdown = useCallback(() => {
    if (disabled) {
      return;
    }

    const willBeVisible = !state.showDropdown;

    if (state.keyboardHeight > 0 && !willBeVisible) {
      Keyboard.dismiss();
      return;
    }

    setShowDropdown(willBeVisible);
  }, [disabled, state.showDropdown, state.keyboardHeight, setShowDropdown]);

  return { eventClose, eventOpen, toggleDropdown };
};

export default useDropdownActions;
