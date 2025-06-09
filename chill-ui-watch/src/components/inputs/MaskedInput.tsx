import { useCallback, useEffect, useState } from 'react';

import Input from './Input';
import { MaskedInputProps } from '../../types';

const applyMask = (text: string, mask: string): string => {
  let result = '';
  let textIndex = 0;

  for (let i = 0; i < mask.length && textIndex < text.length; i += 1) {
    if (mask[i] === '9') {
      const char = text[textIndex];
      if (char !== undefined && /\d/.test(char)) {
        result += char;
        textIndex += 1;
      }
    } else {
      result += mask[i];
      if (text[textIndex] === mask[i]) {
        textIndex += 1;
      }
    }
  }

  return result;
};

export const removeMask = (text: string): string => text.replace(/\D/g, '');

export const handleApplyMask = (text: string | undefined, mask: string) => {
  if (!text) {
    return '';
  }

  const maskedText = applyMask(text, mask);
  return maskedText;
};

export default function MaskedInput({ mask, onChangeText, value, ...props }: MaskedInputProps) {
  const [inputValue, setInputValue] = useState(handleApplyMask(value, mask));
  const maxDigits = mask.length;

  const handleChangeText = useCallback(
    (text: string) => {
      const removedMaskText = removeMask(text);
      const maskedText = handleApplyMask(removedMaskText, mask);
      setInputValue(maskedText);
      onChangeText?.({ maskedText, unmaskedText: removedMaskText });
    },
    [mask, onChangeText],
  );

  useEffect(() => {
    setInputValue(handleApplyMask(value, mask));
  }, [value, mask]);

  return <Input value={inputValue} onChangeText={handleChangeText} maxLength={maxDigits} {...props} />;
}
