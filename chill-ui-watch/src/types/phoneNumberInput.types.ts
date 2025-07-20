import { InputProps } from './input.types';
import { InputDropdownProps } from './dropdown.types';
import { CountryCodesProps } from '../components/phoneNumberInput/countryCodes';

/**
 * Autocomplete dropdown item with country code data
 */
export type AutocompleteDropdownItem = CountryCodesProps & { id: string };

/**
 * Phone number change callback data
 */
export type PhoneNumberInputOnPhoneNumberChange = {
  /** Country code */
  countryCode: CountryCodesProps['code'];
  /** Country suffix */
  countrySuffix: string;
  /** Phone number without suffix */
  phoneNumber: string;
  /** Phone number with suffix */
  phoneNumberWithSuffix: string;
  /** Phone number with suffix and mask */
  phoneNumberWithSuffixMasked: string;
  /** Phone number with mask */
  phoneWithMask: string;
  /** Whether the phone number is valid */
  isValid: boolean;
};

/**
 * Phone number input error data
 */
export type PhoneNumberTextInputOnError = {
  /** Error message */
  errorMessage: string | null;
  /** Whether the input is valid */
  isValid: boolean;
};

/**
 * Props for the PhoneNumberInput component
 */
export type PhoneNumberInputProps = {
  /** List of allowed country codes */
  allowedCountries?: CountryCodesProps['code'][];
  /** Default country code */
  defaultCountry?: CountryCodesProps['code'];
  /** Callback when country changes */
  onCountryChange?: (country: CountryCodesProps) => void;
  /** Callback when phone number changes */
  onPhoneNumberChange?: (phoneNumber: PhoneNumberInputOnPhoneNumberChange) => void;
  /** Language for localization */
  language?: 'fr' | 'en';
  /** Callback when error occurs */
  onError?: (error: PhoneNumberTextInputOnError) => void;
  /** Whether to show error on change */
  hasErrorOnChange?: boolean;
  /** Custom error message */
  errorMessage?: string;
  /** Position of the dropdown */
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  /** Maximum height of the dropdown */
  maxHeight?: number;
  /** Minimum height of the dropdown */
  minHeight?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Callback when input loses focus */
  onBlur?: () => void;
  /** Callback when input gains focus */
  onFocus?: () => void;
  /** Horizontal offset for dropdown */
  offsetX?: number;
  /** Vertical offset for dropdown */
  offsetY?: number;
  /** Current value */
  value?: string;
  /** Props for the dropdown component */
  dropdownProps?: Partial<Omit<InputDropdownProps, 'data' | 'valueField' | 'onSelectItem'>>;
  /** Props for the input component */
  inputProps?: Omit<InputProps, 'placeholder' | 'value'>;
};
