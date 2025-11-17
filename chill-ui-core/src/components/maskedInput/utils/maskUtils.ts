/**
 * Applies a mask pattern to the input text
 * @param text - The text to apply mask to
 * @param mask - The mask pattern (use '9' for digits)
 * @returns The masked text
 */
export const applyMask = (text: string, mask: string): string => {
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

/**
 * Removes all non-digit characters from text
 * @param text - The text to remove mask from
 * @returns Text with only digits
 */
export const removeMask = (text: string): string => text.replace(/\D/g, '');

/**
 * Handles applying mask to text with null safety
 * @param text - The text to mask (can be undefined)
 * @param mask - The mask pattern to apply
 * @returns The masked text or empty string if text is undefined
 */
export const handleApplyMask = (text: string | undefined, mask: string): string => {
  if (!text) {
    return '';
  }

  const maskedText = applyMask(text, mask);
  return maskedText;
};
