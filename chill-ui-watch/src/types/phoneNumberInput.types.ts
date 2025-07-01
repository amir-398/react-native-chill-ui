import type { MaskedInputProps } from './input.types';

import { CountryCodesProps } from '../components/phoneNumberInput/countryCodes';

export type AutocompleteDropdownItem = CountryCodesProps & { id: string };

export type PhoneNumberTextInputOnPhoneNumberChange = {
  countryCode: CountryCodesProps['code'];
  countrySuffix: string;
  phoneNumber: string;
  phoneNumberWithSuffix: string;
  phoneNumberWithSuffixMasked: string;
  phoneWithMask: string;
  isValid: boolean;
};

export type PhoneNumberTextInputOnError = {
  errorMessage: string | null;
  isValid: boolean;
};

export type PhoneNumberTextInputProps = {
  allowedCountries?: CountryCodesProps['code'][];
  defaultCountry?: CountryCodesProps['code'];
  onCountryChange?: (country: CountryCodesProps) => void;
  onPhoneNumberChange?: (phoneNumber: PhoneNumberTextInputOnPhoneNumberChange) => void;
  language?: 'fr' | 'en';
  onError?: (error: PhoneNumberTextInputOnError) => void;
  hasErrorOnChange?: boolean;
  dropdownProps?: Partial<any>;
} & Omit<MaskedInputProps, 'onChangeText' | 'mask'>;
