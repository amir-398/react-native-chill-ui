import { InputProps } from './input.types';
import { InputDropdownProps } from './dropdown.types';
import { CountryCodesProps } from '../components/phoneNumberInput/countryCodes';

export type AutocompleteDropdownItem = CountryCodesProps & { id: string };

export type PhoneNumberInputOnPhoneNumberChange = {
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

export type PhoneNumberInputProps = {
  allowedCountries?: CountryCodesProps['code'][];
  defaultCountry?: CountryCodesProps['code'];
  onCountryChange?: (country: CountryCodesProps) => void;
  onPhoneNumberChange?: (phoneNumber: PhoneNumberInputOnPhoneNumberChange) => void;
  language?: 'fr' | 'en';
  onError?: (error: PhoneNumberTextInputOnError) => void;
  hasErrorOnChange?: boolean;
  errorMessage?: string;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  maxHeight?: number;
  minHeight?: number;
  placeholder?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  offsetX?: number;
  offsetY?: number;
  value?: string;
  dropdownProps?: Partial<Omit<InputDropdownProps, 'data' | 'valueField' | 'onSelectItem'>>;
  inputProps?: Omit<InputProps, 'placeholder' | 'value'>;
};
