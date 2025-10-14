import { InputDropdownProps, PhoneNumberInputProps } from '@types';

export const phoneNumberInputDefaultProps = {
  defaultCountry: 'US',
  defaultErrorMessage: 'the phone number is invalid',
  defaultLanguage: 'en',
  defaultOpen: false,
  dropdownPosition: 'auto' as PhoneNumberInputProps['dropdownPosition'],
  dropdownProps: { hasSearch: true },
  hasErrorOnChange: true,
  inputPlaceholder: 'Enter your phone number',
  inputSearchPlaceholder: 'Search a country...',
  itemAsClickable: 'touchable-opacity' as InputDropdownProps['itemClickableAs'],
  maxHeight: 340,
  minHeight: 0,
  offsetY: 5,
};
