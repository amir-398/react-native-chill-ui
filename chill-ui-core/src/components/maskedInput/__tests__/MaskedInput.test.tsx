import { applyMask, removeMask, handleApplyMask } from '../utils/maskUtils';

describe('MaskedInput Utils', () => {
  describe('applyMask', () => {
    it('applies phone mask correctly', () => {
      expect(applyMask('1234567890', '(999) 999-9999')).toBe('(123) 456-7890');
    });

    it('applies SSN mask correctly', () => {
      expect(applyMask('123456789', '999-99-9999')).toBe('123-45-6789');
    });

    it('applies credit card mask correctly', () => {
      expect(applyMask('1234567890123456', '9999 9999 9999 9999')).toBe('1234 5678 9012 3456');
    });

    it('applies date mask correctly', () => {
      expect(applyMask('12312023', '99/99/9999')).toBe('12/31/2023');
    });

    it('handles partial input', () => {
      expect(applyMask('123', '(999) 999-9999')).toBe('(123');
    });

    it('handles empty input', () => {
      expect(applyMask('', '(999) 999-9999')).toBe('');
    });

    it('handles input longer than mask', () => {
      expect(applyMask('12345678901234567890', '(999) 999-9999')).toBe('(123) 456-7890');
    });

    it('handles complex mask with literals', () => {
      expect(applyMask('1234567', '$999,999.99')).toBe('$123,456.7');
    });

    it('handles mask with spaces', () => {
      expect(applyMask('1234567890', '999 999 9999')).toBe('123 456 7890');
    });

    it('handles mask with dashes', () => {
      expect(applyMask('123456789', '999-99-9999')).toBe('123-45-6789');
    });
  });

  describe('removeMask', () => {
    it('removes all non-digit characters', () => {
      expect(removeMask('(123) 456-7890')).toBe('1234567890');
    });

    it('removes complex formatting', () => {
      expect(removeMask('$123,456.78')).toBe('12345678');
    });

    it('handles empty string', () => {
      expect(removeMask('')).toBe('');
    });

    it('handles string with no digits', () => {
      expect(removeMask('abc-def-ghi')).toBe('');
    });
  });

  describe('handleApplyMask', () => {
    it('applies mask to valid text', () => {
      expect(handleApplyMask('1234567890', '(999) 999-9999')).toBe('(123) 456-7890');
    });

    it('handles undefined input', () => {
      expect(handleApplyMask(undefined, '(999) 999-9999')).toBe('');
    });

    it('handles null input', () => {
      expect(handleApplyMask(null, '(999) 999-9999')).toBe('');
    });

    it('handles empty string', () => {
      expect(handleApplyMask('', '(999) 999-9999')).toBe('');
    });

    it('filters non-digit characters before applying mask', () => {
      expect(handleApplyMask('abc123def456', '(999) 999-9999')).toBe('() -');
    });
  });

  describe('Edge cases', () => {
    it('handles zero input', () => {
      expect(applyMask('0000000000', '(999) 999-9999')).toBe('(000) 000-0000');
    });

    it('handles single digit', () => {
      expect(applyMask('5', '(999) 999-9999')).toBe('(5');
    });

    it('handles special characters', () => {
      expect(applyMask('!@#123$%^456&*()7890', '(999) 999-9999')).toBe('() -');
    });

    it('handles mixed alphanumeric', () => {
      expect(applyMask('a1b2c3d4e5f6g7h8i9j0', '(999) 999-9999')).toBe('() -');
    });

    it('handles rapid changes', () => {
      expect(applyMask('1', '(999) 999-9999')).toBe('(1');
      expect(applyMask('12', '(999) 999-9999')).toBe('(12');
      expect(applyMask('123', '(999) 999-9999')).toBe('(123');
      expect(applyMask('1234', '(999) 999-9999')).toBe('(123) 4');
    });
  });
});
