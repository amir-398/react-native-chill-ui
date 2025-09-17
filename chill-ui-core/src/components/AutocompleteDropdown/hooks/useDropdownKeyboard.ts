import { useCallback, useEffect } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export default function useDropdownKeyboard(onKeyboardShow: (height: number) => void, onKeyboardHide: () => void) {
  const handleKeyboardShow = useCallback(
    (e: KeyboardEvent) => {
      onKeyboardShow(e.endCoordinates.height);
    },
    [onKeyboardShow],
  );

  const handleKeyboardHide = useCallback(() => {
    onKeyboardHide();
  }, [onKeyboardHide]);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      keyboardShowListener?.remove();
      keyboardHideListener?.remove();
    };
  }, [handleKeyboardShow, handleKeyboardHide]);
}
