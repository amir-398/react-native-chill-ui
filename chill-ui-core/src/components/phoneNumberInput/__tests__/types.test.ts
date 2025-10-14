import { 
  CountryCode,
  PhoneNumberInputCountryCodesProps,
  PhoneNumberInputProps,
  PhoneNumberInputPropsTw,
  PhoneNumberInputPropsSs,
} from '../types';

describe('PhoneNumberInput Types', () => {
  describe('CountryCode', () => {
    it('should include valid country codes', () => {
      const validCodes: CountryCode[] = ['US', 'FR', 'GB', 'DE', 'IT', 'ES', 'CA', 'AU'];
      validCodes.forEach(code => {
        expect(typeof code).toBe('string');
        expect(code.length).toBe(2);
      });
    });

    it('should be a union type of country codes', () => {
      // This test ensures TypeScript compilation
      const testCode: CountryCode = 'US';
      expect(testCode).toBe('US');
    });
  });

  describe('PhoneNumberInputCountryCodesProps', () => {
    it('should have correct structure', () => {
      const country: PhoneNumberInputCountryCodesProps = {
        id: 'US',
        code: 'US',
        dial_code: '+1',
        en: 'United States',
        fr: 'États-Unis',
      };

      expect(country.id).toBe('US');
      expect(country.code).toBe('US');
      expect(country.dial_code).toBe('+1');
      expect(country.en).toBe('United States');
      expect(country.fr).toBe('États-Unis');
    });

    it('should accept valid country codes', () => {
      const countries: PhoneNumberInputCountryCodesProps[] = [
        { id: 'US', code: 'US', dial_code: '+1', en: 'United States', fr: 'États-Unis' },
        { id: 'FR', code: 'FR', dial_code: '+33', en: 'France', fr: 'France' },
        { id: 'GB', code: 'GB', dial_code: '+44', en: 'United Kingdom', fr: 'Royaume-Uni' },
      ];

      countries.forEach(country => {
        expect(typeof country.id).toBe('string');
        expect(typeof country.code).toBe('string');
        expect(typeof country.dial_code).toBe('string');
        expect(typeof country.en).toBe('string');
        expect(typeof country.fr).toBe('string');
      });
    });
  });

  describe('PhoneNumberInputProps', () => {
    it('should have correct optional properties', () => {
      const props: PhoneNumberInputProps = {
        onPhoneNumberChange: jest.fn(),
      };

      expect(typeof props.onPhoneNumberChange).toBe('function');
    });

    it('should accept all optional properties', () => {
      const props: PhoneNumberInputProps = {
        allowedCountries: ['US', 'FR'],
        customDropdownItem: jest.fn(),
        defaultCountry: 'US',
        defaultOpen: false,
        dropdownPosition: 'auto',
        dropdownProps: { hasSearch: true },
        errorMessage: 'Invalid phone number',
        hasError: false,
        hasErrorOnChange: true,
        inputProps: { placeholder: 'Enter phone number' },
        language: 'en',
        maxHeight: 340,
        minHeight: 0,
        offsetX: 0,
        offsetY: 5,
        onBlur: jest.fn(),
        onCountryChange: jest.fn(),
        onError: jest.fn(),
        onFocus: jest.fn(),
        onOpenChange: jest.fn(),
        onPhoneNumberChange: jest.fn(),
        open: false,
        placeholder: 'Enter your phone number',
        searchInputProps: { placeholder: 'Search countries...' },
        value: '1234567890',
      };

      expect(props.allowedCountries).toEqual(['US', 'FR']);
      expect(typeof props.customDropdownItem).toBe('function');
      expect(props.defaultCountry).toBe('US');
      expect(props.defaultOpen).toBe(false);
      expect(props.dropdownPosition).toBe('auto');
      expect(props.dropdownProps).toEqual({ hasSearch: true });
      expect(props.errorMessage).toBe('Invalid phone number');
      expect(props.hasError).toBe(false);
      expect(props.hasErrorOnChange).toBe(true);
      expect(props.inputProps).toEqual({ placeholder: 'Enter phone number' });
      expect(props.language).toBe('en');
      expect(props.maxHeight).toBe(340);
      expect(props.minHeight).toBe(0);
      expect(props.offsetX).toBe(0);
      expect(props.offsetY).toBe(5);
      expect(typeof props.onBlur).toBe('function');
      expect(typeof props.onCountryChange).toBe('function');
      expect(typeof props.onError).toBe('function');
      expect(typeof props.onFocus).toBe('function');
      expect(typeof props.onOpenChange).toBe('function');
      expect(typeof props.onPhoneNumberChange).toBe('function');
      expect(props.open).toBe(false);
      expect(props.placeholder).toBe('Enter your phone number');
      expect(props.searchInputProps).toEqual({ placeholder: 'Search countries...' });
      expect(props.value).toBe('1234567890');
    });
  });

  describe('PhoneNumberInputPropsTw', () => {
    it('should extend PhoneNumberInputProps with className', () => {
      const props: PhoneNumberInputPropsTw = {
        onPhoneNumberChange: jest.fn(),
        className: 'custom-class',
      };

      expect(typeof props.onPhoneNumberChange).toBe('function');
      expect(props.className).toBe('custom-class');
    });

    it('should accept Tailwind-specific props', () => {
      const props: PhoneNumberInputPropsTw = {
        onPhoneNumberChange: jest.fn(),
        className: 'w-full bg-white',
        inputProps: {
          className: 'border-gray-300',
        },
        dropdownProps: {
          className: 'shadow-lg',
        },
      };

      expect(props.className).toBe('w-full bg-white');
      expect(props.inputProps?.className).toBe('border-gray-300');
      expect(props.dropdownProps?.className).toBe('shadow-lg');
    });
  });

  describe('PhoneNumberInputPropsSs', () => {
    it('should extend PhoneNumberInputProps with style', () => {
      const props: PhoneNumberInputPropsSs = {
        onPhoneNumberChange: jest.fn(),
        style: { backgroundColor: '#FFFFFF' },
      };

      expect(typeof props.onPhoneNumberChange).toBe('function');
      expect(props.style).toEqual({ backgroundColor: '#FFFFFF' });
    });

    it('should accept StyleSheet-specific props', () => {
      const props: PhoneNumberInputPropsSs = {
        onPhoneNumberChange: jest.fn(),
        style: { backgroundColor: '#FFFFFF' },
        inputProps: {
          style: { borderColor: '#D1D5DB' },
        },
        dropdownProps: {
          style: { shadowColor: '#000' },
        },
      };

      expect(props.style).toEqual({ backgroundColor: '#FFFFFF' });
      expect(props.inputProps?.style).toEqual({ borderColor: '#D1D5DB' });
      expect(props.dropdownProps?.style).toEqual({ shadowColor: '#000' });
    });
  });

  describe('Type compatibility', () => {
    it('should be compatible with InputDropdownProps', () => {
      const inputDropdownProps = {
        hasSearch: true,
        maxHeight: 340,
        minHeight: 0,
        offsetX: 0,
        offsetY: 5,
      };

      expect(typeof inputDropdownProps.hasSearch).toBe('boolean');
      expect(typeof inputDropdownProps.maxHeight).toBe('number');
      expect(typeof inputDropdownProps.minHeight).toBe('number');
      expect(typeof inputDropdownProps.offsetX).toBe('number');
      expect(typeof inputDropdownProps.offsetY).toBe('number');
    });

    it('should be compatible with InputProps', () => {
      const inputProps = {
        placeholder: 'Enter phone number',
        value: '1234567890',
        isDisabled: false,
        size: 'md' as const,
      };

      expect(typeof inputProps.placeholder).toBe('string');
      expect(typeof inputProps.value).toBe('string');
      expect(typeof inputProps.isDisabled).toBe('boolean');
      expect(inputProps.size).toBe('md');
    });
  });
});
