import { useCallback, useEffect } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

interface DropdownKeyboardParams {
  onMeasure?: () => void;
  onKeyboardHide: () => void;
  onKeyboardShow: (height: number) => void;
}

export default function useDropdownKeyboard({ onKeyboardHide, onKeyboardShow, onMeasure }: DropdownKeyboardParams) {
  const handleKeyboardShow = useCallback(
    (e: KeyboardEvent) => {
      onMeasure?.();
      onKeyboardShow(e.endCoordinates.height);
    },
    [onKeyboardShow, onMeasure],
  );

  const handleKeyboardHide = useCallback(() => {
    onKeyboardHide();
    onMeasure?.();
  }, [onKeyboardHide, onMeasure]);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      keyboardShowListener?.remove();
      keyboardHideListener?.remove();
    };
  }, [handleKeyboardShow, handleKeyboardHide]);

  return {
    handleKeyboardHide,
    handleKeyboardShow,
  };
}
