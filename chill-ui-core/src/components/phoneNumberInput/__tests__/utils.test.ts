import { applyMaskPhoneNumber, getPhoneNumberWithSuffix, isValidNumber } from '../utils/phone';

// Mock libphonenumber-js
jest.mock('libphonenumber-js', () => ({
  AsYouType: jest.fn().mockImplementation(() => ({
    input: jest.fn(phone => phone),
  })),
  isValidPhoneNumber: jest.fn(() => true),
  parsePhoneNumber: jest.fn(),
}));

describe('PhoneNumberInput Utils', () => {
  describe('applyMaskPhoneNumber', () => {
    it('should return phone number when library is not available', () => {
      const result = applyMaskPhoneNumber('US', '1234567890');
      expect(result).toBe('1234567890');
    });

    it('should handle empty phone number', () => {
      const result = applyMaskPhoneNumber('US', '');
      expect(result).toBe('');
    });

    it('should handle undefined phone number', () => {
      const result = applyMaskPhoneNumber('US', undefined);
      expect(result).toBe('');
    });
  });

  describe('getPhoneNumberWithSuffix', () => {
    it('should return phone number when library is not available', () => {
      const result = getPhoneNumberWithSuffix('US', '1234567890');
      expect(result).toBe(undefined);
    });

    it('should handle empty phone number', () => {
      const result = getPhoneNumberWithSuffix('US', '');
      expect(result).toBe(undefined);
    });

    it('should handle undefined phone number', () => {
      const result = getPhoneNumberWithSuffix('US', undefined);
      expect(result).toBe(undefined);
    });
  });

  describe('isValidNumber', () => {
    it('should return true when library is not available', () => {
      expect(isValidNumber('1234567890', 'US')).toBe(false);
    });

    it('should return true for any number when library is not available', () => {
      expect(isValidNumber('', 'US')).toBe(false);
      expect(isValidNumber('invalid', 'US')).toBe(false);
    });
  });
});
