import { PhoneNumberInputCountryCodesProps } from '@types';

let hasLibrary: boolean = false;
let parsePhoneNumberLib: any;
let AsYouType: any;
let isValidPhoneNumber: any;

try {
  const libphonenumber = require('libphonenumber-js');
  if (libphonenumber) {
    hasLibrary = true;
    parsePhoneNumberLib = libphonenumber.parsePhoneNumber;
    AsYouType = libphonenumber.AsYouType;
    isValidPhoneNumber = libphonenumber.isValidPhoneNumber;
  }
} catch {
  console.error(
    'libphonenumber-js is not installed. To use phone number input, please install it: npm/yarn/bun install/add libphonenumber-js',
  );
}

const safeParsePhoneNumber = (number: string, options?: any) => {
  try {
    return parsePhoneNumberLib(number, options);
  } catch {
    return null;
  }
};

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleanedText = phoneNumber.replace(/\D/g, '');
  const formattedText = cleanedText.replace(/(\d{2})/g, '$1 ').trim();
  return formattedText;
};

export const getPhoneNumberWithSuffix = (
  countryCode: PhoneNumberInputCountryCodesProps['code'] = 'FR',
  phoneNumber: string | undefined = '',
) => {
  if (!hasLibrary) {
    return phoneNumber;
  }
  const parsedNumber = safeParsePhoneNumber(phoneNumber, { defaultCountry: countryCode });
  return parsedNumber?.formatInternational();
};

export const getCountryCode = (phoneNumber: string | undefined = '') => {
  if (!hasLibrary) {
    return '';
  }
  const parsedNumber = safeParsePhoneNumber(phoneNumber);
  return parsedNumber?.country;
};

export const isValidNumber = (number: string, countryCode: PhoneNumberInputCountryCodesProps['code']): boolean => {
  if (!hasLibrary) {
    return true;
  }
  try {
    const cleanNumber = number.replace(/\s+/g, '');
    const parsedNumber = safeParsePhoneNumber(cleanNumber);
    if (!parsedNumber) return false;

    return isValidPhoneNumber(cleanNumber, countryCode);
  } catch {
    return false;
  }
};

export const isValidNumberWithSuffix = (number: string) => {
  if (!hasLibrary) {
    return true;
  }

  const cleanNumber = number.replace(/\s+/g, '');
  const parsedNumber = safeParsePhoneNumber(cleanNumber);
  if (!parsedNumber) return false;
  return isValidPhoneNumber(cleanNumber, parsedNumber.countryCallingCode);
};

export const getPhoneNumberWithoutSuffix = (phoneNumber: string | undefined = '') => {
  if (!hasLibrary) {
    return phoneNumber;
  }
  const parsedNumber = safeParsePhoneNumber(phoneNumber);
  return parsedNumber?.nationalNumber || '';
};

export const applyMaskPhoneNumber = (
  countryCode?: PhoneNumberInputCountryCodesProps['code'],
  phoneNumber: string | undefined = '',
) => {
  if (!hasLibrary) {
    return phoneNumber;
  }
  const formatAsYouType = new AsYouType(countryCode ?? undefined);
  const maskedPhone = formatAsYouType.input(phoneNumber);
  return maskedPhone;
};

export const removeSuffixWhenMasked = (phoneNumber: string | undefined = '') => {
  if (!phoneNumber) {
    return '';
  }
  const parts = phoneNumber.split(' ');
  if (parts.length > 0 && parts[0]?.startsWith('+')) {
    parts.shift();
  }
  return parts.join(' ');
};
