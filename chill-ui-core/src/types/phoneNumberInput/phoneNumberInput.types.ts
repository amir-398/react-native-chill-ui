import { InputProps } from '../input/input.types';
import { InputDropdownProps } from '../inputDropdown/inputDropdown.types';

/**
 * Country code type extracted from countryCodes array
 */
export type PhoneNumberInputCountryCodes =
  | 'AF'
  | 'AX'
  | 'AL'
  | 'DZ'
  | 'AS'
  | 'AD'
  | 'AO'
  | 'AI'
  | 'AQ'
  | 'AG'
  | 'AR'
  | 'AM'
  | 'AW'
  | 'AU'
  | 'AT'
  | 'AZ'
  | 'BS'
  | 'BH'
  | 'BD'
  | 'BB'
  | 'BY'
  | 'BE'
  | 'BZ'
  | 'BJ'
  | 'BM'
  | 'BT'
  | 'BO'
  | 'BA'
  | 'BW'
  | 'BR'
  | 'IO'
  | 'BN'
  | 'BG'
  | 'BF'
  | 'BI'
  | 'KH'
  | 'CM'
  | 'CA'
  | 'CV'
  | 'KY'
  | 'CF'
  | 'TD'
  | 'CL'
  | 'CN'
  | 'CX'
  | 'CC'
  | 'CO'
  | 'KM'
  | 'CG'
  | 'CD'
  | 'CK'
  | 'CR'
  | 'CI'
  | 'HR'
  | 'CU'
  | 'CY'
  | 'CZ'
  | 'DK'
  | 'DJ'
  | 'DM'
  | 'DO'
  | 'EC'
  | 'EG'
  | 'SV'
  | 'GQ'
  | 'ER'
  | 'EE'
  | 'ET'
  | 'FK'
  | 'FO'
  | 'FJ'
  | 'FI'
  | 'FR'
  | 'GF'
  | 'PF'
  | 'GA'
  | 'GM'
  | 'GE'
  | 'DE'
  | 'GH'
  | 'GI'
  | 'GR'
  | 'GL'
  | 'GD'
  | 'GP'
  | 'GU'
  | 'GT'
  | 'GG'
  | 'GN'
  | 'GW'
  | 'GY'
  | 'HT'
  | 'VA'
  | 'HN'
  | 'HK'
  | 'HU'
  | 'IS'
  | 'IN'
  | 'ID'
  | 'IR'
  | 'IQ'
  | 'IE'
  | 'IM'
  | 'IL'
  | 'IT'
  | 'JM'
  | 'JP'
  | 'JE'
  | 'JO'
  | 'KZ'
  | 'KE'
  | 'KI'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KG'
  | 'LA'
  | 'LV'
  | 'LB'
  | 'LS'
  | 'LR'
  | 'LY'
  | 'LI'
  | 'LT'
  | 'LU'
  | 'MO'
  | 'MK'
  | 'MG'
  | 'MW'
  | 'MY'
  | 'MV'
  | 'ML'
  | 'MT'
  | 'MH'
  | 'MQ'
  | 'MR'
  | 'MU'
  | 'YT'
  | 'MX'
  | 'FM'
  | 'MD'
  | 'MC'
  | 'MN'
  | 'ME'
  | 'MS'
  | 'MA'
  | 'MZ'
  | 'MM'
  | 'NA'
  | 'NR'
  | 'NP'
  | 'NL'
  | 'NC'
  | 'NZ'
  | 'NI'
  | 'NE'
  | 'NG'
  | 'NU'
  | 'NF'
  | 'MP'
  | 'NO'
  | 'OM'
  | 'PK'
  | 'PW'
  | 'PS'
  | 'PA'
  | 'PG'
  | 'PY'
  | 'PE'
  | 'PH'
  | 'PN'
  | 'PL'
  | 'PT'
  | 'PR'
  | 'QA'
  | 'RO'
  | 'RU'
  | 'RW'
  | 'RE'
  | 'BL'
  | 'SH'
  | 'KN'
  | 'LC'
  | 'MF'
  | 'PM'
  | 'VC'
  | 'WS'
  | 'SM'
  | 'ST'
  | 'SA'
  | 'SN'
  | 'RS'
  | 'SC'
  | 'SL'
  | 'SG'
  | 'SK'
  | 'SI'
  | 'SB'
  | 'SO'
  | 'ZA'
  | 'SS'
  | 'ES'
  | 'LK'
  | 'SD'
  | 'SR'
  | 'SJ'
  | 'SZ'
  | 'SE'
  | 'CH'
  | 'SY'
  | 'TW'
  | 'TJ'
  | 'TZ'
  | 'TH'
  | 'TL'
  | 'TG'
  | 'TK'
  | 'TO'
  | 'TT'
  | 'TN'
  | 'TR'
  | 'TM'
  | 'TC'
  | 'TV'
  | 'UG'
  | 'UA'
  | 'AE'
  | 'GB'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VU'
  | 'VE'
  | 'VN'
  | 'VG'
  | 'VI'
  | 'WF'
  | 'YE'
  | 'ZM'
  | 'ZW';

/**
 * Phone number input country codes props
 */
export type PhoneNumberInputCountryCodesProps = {
  id: string;
  code: PhoneNumberInputCountryCodes;
  dial_code: string;
  fr: string;
  en: string;
};

/**
 * Autocomplete dropdown item with country code data
 */
export type AutocompleteDropdownItem = PhoneNumberInputCountryCodesProps & { id: string };

/**
 * Phone number change callback data
 */
export type PhoneNumberInputOnPhoneNumberChange = {
  /** Country code */
  countryCode: PhoneNumberInputCountryCodesProps['code'];
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
export type PhoneNumberInputOnError = {
  /** Error message */
  errorMessage: string | null;
  /** Whether the input is valid */
  isValid: boolean;
};

/**
 * Props for the PhoneNumberInput component
 */
export type PhoneNumberInputProps = {
  /** List of allowed country codes. Common options:
   * - `'FR'` (France) | `'US'` (USA) | `'GB'` (UK) | `'DE'` (Germany) | `'IT'` (Italy)
   * - `'ES'` (Spain) | `'PT'` (Portugal) | `'BE'` (Belgium) | `'CH'` (Switzerland) | `'CA'` (Canada)
   * - `'JP'` (Japan) | `'CN'` (China) | `'IN'` (India) | `'BR'` (Brazil) | `'AU'` (Australia)
   * Full list of ISO 3166-1 alpha-2 country codes is available in the type definition.
   */
  allowedCountries?: PhoneNumberInputCountryCodesProps['code'][];
  /** Default country code. Common options:
   * - `'FR'` (France) | `'US'` (USA) | `'GB'` (UK) | `'DE'` (Germany) | `'IT'` (Italy)
   * - `'ES'` (Spain) | `'PT'` (Portugal) | `'BE'` (Belgium) | `'CH'` (Switzerland) | `'CA'` (Canada)
   * - `'JP'` (Japan) | `'CN'` (China) | `'IN'` (India) | `'BR'` (Brazil) | `'AU'` (Australia)
   * Full list of ISO 3166-1 alpha-2 country codes is available in the type definition.
   */
  defaultCountry?: PhoneNumberInputCountryCodesProps['code'];
  /** Callback when country changes */
  onCountryChange?: (country: PhoneNumberInputCountryCodesProps) => void;
  /** Callback when phone number changes */
  onPhoneNumberChange?: (phoneNumber: PhoneNumberInputOnPhoneNumberChange) => void;
  /** Language for localization :
   * - 'fr' for French
   * - 'en' for English
   */
  language?: 'fr' | 'en';
  /** Callback when error occurs */
  onError?: (error: PhoneNumberInputOnError) => void;
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
  /** Whether the dropdown is open (controlled) */
  open?: boolean;
  /** Callback when dropdown open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;

  /** Props for the search input */
  searchInputProps?: InputProps;

  /** Custom render function for dropdown items */
  customDropdownItem?: (item: PhoneNumberInputCountryCodesProps) => React.ReactElement | null;
};
