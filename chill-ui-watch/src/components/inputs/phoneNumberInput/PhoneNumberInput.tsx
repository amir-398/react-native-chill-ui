import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TextInput, Image, ListRenderItem, Pressable } from 'react-native';

import Input from '../Input';
import Icon from '../../icon';
import { Box } from '../../box';
import * as flags from './flags';
import String from '../../string';
import InputDropdown from './InputDropdown';
import { PhoneNumberTextInputProps } from '../../../types';
import { countryCodes, type CountryCodesProps } from './countryCodes';
import { applyMaskPhoneNumber, getPhoneNumberWithSuffix, isValidNumber } from './utils';

function getFlag(code?: string) {
  return code ? (flags as Record<string, any>)[code.toLowerCase()] : undefined;
}

export default function PhoneNumberTextInput({
  allowedCountries,
  defaultCountry,
  dropdownProps = { hasSearch: true },
  errorMessage,
  hasErrorOnChange = true,
  language = 'fr',
  onCountryChange,
  onError,
  onPhoneNumberChange,
  value,
  ...props
}: PhoneNumberTextInputProps) {
  const ref = useRef<TextInput>(null);
  const searchRef = useRef<TextInput>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCodesProps | null>();
  const [phoneNumber, setPhoneNumber] = useState(value ?? '');
  const [searchQuery, setSearchQuery] = useState('');
  const [isValid, setIsValid] = useState(true);

  const filteredCountries = useMemo(() => {
    let countries = countryCodes;
    if (allowedCountries) {
      countries = countries.filter(country => allowedCountries.includes(country.code));
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      countries = countries.filter(
        country =>
          (language === 'fr' ? country.fr : country.en).toLowerCase().includes(query) ||
          country.dial_code.includes(query) ||
          country.code.toLowerCase().includes(query),
      );
    }
    return countries;
  }, [allowedCountries, searchQuery, language]);

  console.log('selectedCountry', selectedCountry);
  console.log('defaultCountry', defaultCountry);

  const handleDefaultCountry = useCallback(() => {
    const defaultCountryCode = filteredCountries.find(country => country.code === (defaultCountry || 'FR'));
    setSelectedCountry(defaultCountryCode);
  }, [defaultCountry, filteredCountries]);

  useEffect(() => {
    handleDefaultCountry();
  }, [handleDefaultCountry]);

  useEffect(() => {
    if (isDropdownOpen) {
      searchRef.current?.focus();
    }
  }, [isDropdownOpen]);

  const renderItem: ListRenderItem<CountryCodesProps> = ({ item }) => (
    <Pressable
      className="flex-row items-center gap-2 p-1"
      onPress={() => {
        setSelectedCountry(item);
        setIsDropdownOpen(false);
        onCountryChange?.(item);
      }}
    >
      <Image source={getFlag(item.code)} className="h-6 w-9 border border-[#D9D9D9]" />
      <String>{language === 'fr' ? item.fr : item.en}</String>
      <String>{item.dial_code}</String>
    </Pressable>
  );

  const rightCustomIcon = useMemo(
    () => (
      <Box className="flex-row items-center gap-1">
        <Image source={getFlag(selectedCountry?.code)} className="h-4 w-6 border border-[#D9D9D9]" />
        <Icon name="angle-down-solid" size="xs" color="black" className="text-black" />
      </Box>
    ),
    [selectedCountry],
  );

  const handleChangeText = useCallback(
    (text: string) => {
      if (text === '') {
        setIsValid(true);
        onError?.({ errorMessage: null, isValid: true });
        onPhoneNumberChange?.({
          countryCode: '',
          countrySuffix: '',
          isValid: true,
          phoneNumber: '',
          phoneNumberWithSuffix: '',
          phoneNumberWithSuffixMasked: '',
          phoneWithMask: '',
        });
        setPhoneNumber('');
        return;
      }

      const maskedText = applyMaskPhoneNumber(selectedCountry?.code, text);
      const numberWithSuffix = getPhoneNumberWithSuffix(selectedCountry?.code, text);
      const phoneIsValid = isValidNumber(numberWithSuffix, selectedCountry?.dial_code ?? '');
      setIsValid(phoneIsValid);
      onError?.({ errorMessage: errorMessage || 'the phone number is invalid', isValid: phoneIsValid });
      onPhoneNumberChange?.({
        countryCode: selectedCountry?.code ?? '',
        countrySuffix: selectedCountry?.dial_code ?? '',
        isValid: phoneIsValid,
        phoneNumber: maskedText.replace(/\s+/g, ''),
        phoneNumberWithSuffix: numberWithSuffix?.replace(/\s+/g, ''),
        phoneNumberWithSuffixMasked: numberWithSuffix,
        phoneWithMask: maskedText,
      });
      setPhoneNumber(maskedText);
    },
    [selectedCountry?.code, selectedCountry?.dial_code, onPhoneNumberChange, onError, errorMessage],
  );

  const handleBlur = useCallback(() => {
    console.log('handleBlur', dropdownProps?.hasSearch, isDropdownOpen);
    if (!dropdownProps?.hasSearch) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  }, [dropdownProps?.hasSearch, isDropdownOpen]);

  return (
    <Box className="relative">
      <Input
        inputRef={ref}
        value={phoneNumber}
        onChangeText={handleChangeText}
        onFocus={() => setIsValid(true)}
        onBlur={handleBlur}
        keyboardType="numeric"
        hasError={!isValid && hasErrorOnChange}
        errorMessage={hasErrorOnChange ? errorMessage || 'the phone number is invalid' : undefined}
        leftIconAction={{
          customIcon: rightCustomIcon,
          iconPress: () => {
            setIsDropdownOpen(!isDropdownOpen);
            ref.current?.focus();
          },
        }}
        {...props}
      />
      {isDropdownOpen && (
        <InputDropdown
          searchRef={searchRef}
          dataSet={filteredCountries}
          renderItem={renderItem}
          onSearch={setSearchQuery}
          searchInputProps={{
            onBlur: () => {
              setIsDropdownOpen(false);
            },
          }}
          {...dropdownProps}
        />
      )}
    </Box>
  );
}
