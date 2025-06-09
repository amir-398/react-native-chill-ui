import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TextInput, Image, ListRenderItem, Pressable } from 'react-native';

import Icon from '@/components/icon';

import { Box } from '../../box';
import * as flags from './flags';
import String from '../../string';
import { InputDropdown } from './InputDropdown';
import MaskedInput, { removeMask } from '../MaskedInput';
import { countryCodes, type CountryCodesProps } from './countryCodes';

type PhoneNumberTextInputProps = {
  allowedCountries?: CountryCodesProps['code'][];
  defaultCountry?: CountryCodesProps['code'];
  onCountryChange?: (country: CountryCodesProps) => void;
  onPhoneNumberChange?: ({
    phoneNumber,
    phoneNumberWithSuffix,
    phoneWithMask,
  }: {
    phoneNumber: string;
    phoneNumberWithSuffix: string;
    phoneWithMask: string;
  }) => void;
  language?: 'fr' | 'en';
};

export const removeLeadingZero = (text: string): string =>
  text.startsWith('0') ? removeMask(text.slice(1)) : removeMask(text);

export const addLeadingZero = (text: string): string =>
  text.startsWith('0') ? removeMask(text) : `0${removeMask(text)}`;

export default function PhoneNumberTextInput({
  allowedCountries,
  defaultCountry,
  language = 'fr',
  onCountryChange,
  onPhoneNumberChange,
}: PhoneNumberTextInputProps) {
  const ref = useRef<TextInput>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCodesProps | null>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleDefaultCountry = useCallback(() => {
    const defaultCountryCode = filteredCountries.find(country => country.code === (defaultCountry || 'FR'));
    setSelectedCountry(defaultCountryCode);
  }, [defaultCountry, filteredCountries]);

  useEffect(() => {
    handleDefaultCountry();
  }, [handleDefaultCountry]);

  const renderItem: ListRenderItem<CountryCodesProps> = ({ item }) => (
    <Pressable
      className="flex-row items-center gap-2 p-1"
      onPress={() => {
        setSelectedCountry(item);
        setIsDropdownOpen(false);
        onCountryChange?.(item);
      }}
    >
      <Image
        source={flags[item.code.toLowerCase() as keyof typeof flags]}
        className="h-6 w-9 border border-[#D9D9D9]"
      />
      <String>{language === 'fr' ? item.fr : item.en}</String>
      <String>{item.dial_code}</String>
    </Pressable>
  );

  const rightCustomIcon = useMemo(
    () => (
      <Box className="flex-row items-center gap-1">
        <Image
          source={flags[selectedCountry?.code.toLowerCase() as keyof typeof flags]}
          className="h-4 w-6 border border-[#D9D9D9]"
        />
        <Icon name="angle-down-solid" size="xs" color="black" className="text-black" />
      </Box>
    ),
    [selectedCountry],
  );

  return (
    <Box className="relative">
      <MaskedInput
        inputRef={ref}
        mask={selectedCountry?.phoneMask || '99 99 99 99 99'}
        placeholder="6 12 34 56 78"
        value={phoneNumber}
        onChangeText={({ maskedText, unmaskedText }) => {
          setPhoneNumber(maskedText);
          onPhoneNumberChange?.({
            phoneNumber: addLeadingZero(maskedText),
            phoneNumberWithSuffix: (selectedCountry?.dial_code || '') + removeLeadingZero(unmaskedText),
            phoneWithMask: maskedText,
          });
        }}
        keyboardType="numeric"
        leftIconAction={{
          customIcon: rightCustomIcon,
          iconPress: () => {
            setIsDropdownOpen(!isDropdownOpen);
            ref.current?.focus();
          },
        }}
      />
      {isDropdownOpen && (
        <InputDropdown dataSet={filteredCountries} renderItem={renderItem} onSearch={setSearchQuery} />
      )}
    </Box>
  );
}
