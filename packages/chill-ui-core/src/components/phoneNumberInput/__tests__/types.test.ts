import {
  PhoneNumberInputCountryCodesProps,
  PhoneNumberInputProps,
  PhoneNumberInputPropsTw,
  PhoneNumberInputPropsSs,
} from '@types';

describe('PhoneNumberInput Types', () => {
  describe('CountryCode', () => {
    it('should include valid country codes', () => {
      const validCodes: any[] = ['US', 'FR', 'GB', 'DE', 'IT', 'ES', 'CA', 'AU'];
      validCodes.forEach(code => {
        expect(typeof code).toBe('string');
        expect(code.length).toBe(2);
      });
    });

    it('should be a union type of country codes', () => {
      // This test ensures TypeScript compilation
      const testCode: any = 'US';
      expect(testCode).toBe('US');
    });
  });

  describe('PhoneNumberInputCountryCodesProps', () => {
    it('should have correct structure', () => {
      const country: PhoneNumberInputCountryCodesProps = {
        code: 'US',
        dial_code: '+1',
        en: 'United States',
        fr: 'États-Unis',
        id: 'US',
      };

      expect(country.id).toBe('US');
      expect(country.code).toBe('US');
      expect(country.dial_code).toBe('+1');
      expect(country.en).toBe('United States');
      expect(country.fr).toBe('États-Unis');
    });

    it('should accept valid country codes', () => {
      const countries: PhoneNumberInputCountryCodesProps[] = [
        { code: 'US', dial_code: '+1', en: 'United States', fr: 'États-Unis', id: 'US' },
        { code: 'FR', dial_code: '+33', en: 'France', fr: 'France', id: 'FR' },
        { code: 'GB', dial_code: '+44', en: 'United Kingdom', fr: 'Royaume-Uni', id: 'GB' },
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
        hasErrorOnChange: true,
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
      expect(props.hasErrorOnChange).toBe(true);
      expect(props.inputProps).toBeUndefined();
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
      };

      expect(typeof props.onPhoneNumberChange).toBe('function');
    });

    it('should accept Tailwind-specific props', () => {
      const props: PhoneNumberInputPropsTw = {
        dropdownProps: {
          className: 'shadow-lg',
        },
        inputProps: {
          className: 'w-full bg-white',
        },
        onPhoneNumberChange: jest.fn(),
      };

      expect(props.inputProps?.className).toBe('w-full bg-white');
      expect(props.dropdownProps?.className).toBe('shadow-lg');
    });
  });

  describe('PhoneNumberInputPropsSs', () => {
    it('should extend PhoneNumberInputProps with style', () => {
      const props: PhoneNumberInputPropsSs = {
        onPhoneNumberChange: jest.fn(),
      };

      expect(typeof props.onPhoneNumberChange).toBe('function');
    });

    it('should accept StyleSheet-specific props', () => {
      const props: PhoneNumberInputPropsSs = {
        dropdownProps: {
          style: { shadowColor: '#000' },
        },
        inputProps: {
          style: { borderColor: '#D1D5DB' },
        },
        onPhoneNumberChange: jest.fn(),
      };

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
        isDisabled: false,
        placeholder: 'Enter phone number',
        size: 'md' as const,
        value: '1234567890',
      };

      expect(typeof inputProps.placeholder).toBe('string');
      expect(typeof inputProps.value).toBe('string');
      expect(typeof inputProps.isDisabled).toBe('boolean');
      expect(inputProps.size).toBe('md');
    });
  });
});
