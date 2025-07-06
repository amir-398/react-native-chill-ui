import { TextInput, Image, ListRenderItem, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useCalculateDropDownPosition from '@/components/inputSelectDropdown/hooks/useCalculateDropdownPosition';

import Icon from '../icon';
import { Box } from '../box';
import String from '../string';
import * as flags from './flags';
import Input from '../inputs/Input';
import { PhoneNumberTextInputProps } from '../../types';
import InputDropdownModal from '../inputDrodown/InputDropdownModal';
import { countryCodes, type CountryCodesProps } from './countryCodes';
import { applyMaskPhoneNumber, getPhoneNumberWithSuffix, isValidNumber } from './utils';

function getFlag(code?: string) {
  if (!code) return undefined;
  return (flags as Record<string, any>)[code.toLowerCase()];
}

const DEFAULT_LANG = 'fr';
const DEFAULT_COUNTRY_CODE = 'FR';
const DEFAULT_ERROR_MESSAGE = 'the phone number is invalid';

const getInitialCountry = (
  defaultCountry: string | undefined,
  allowedCountries: string[] | undefined,
): CountryCodesProps | undefined => {
  let candidates = countryCodes;
  if (allowedCountries) {
    candidates = candidates.filter(c => allowedCountries.includes(c.code));
  }
  return candidates.find(c => c.code === (defaultCountry || DEFAULT_COUNTRY_CODE)) || candidates[0];
};

function PhoneNumberTextInput({
  allowedCountries,
  defaultCountry,
  dropdownProps = { hasSearch: true },
  errorMessage,
  hasErrorOnChange = true,
  language = DEFAULT_LANG,
  onCountryChange,
  onError,
  onPhoneNumberChange,
  value,
  ...props
}: PhoneNumberTextInputProps) {
  const inputRef = useRef<TextInput | null>(null);
  const searchRef = useRef<TextInput>(null);
  const { measureComponent, position } = useCalculateDropDownPosition(inputRef);

  useEffect(() => {
    measureComponent();
  }, [measureComponent]);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCodesProps | undefined>(() =>
    getInitialCountry(defaultCountry, allowedCountries),
  );
  const [phoneNumber, setPhoneNumber] = useState(value ?? '');
  const [searchQuery, setSearchQuery] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setSelectedCountry(getInitialCountry(defaultCountry, allowedCountries));
  }, [allowedCountries, defaultCountry]);

  // Clean search input when dropdown state changes
  useEffect(() => {
    if (isDropdownOpen) {
      searchRef.current?.focus();
    } else {
      setSearchQuery('');
    }
  }, [isDropdownOpen]);

  const filteredCountries = useMemo(() => {
    let list = countryCodes;
    if (allowedCountries) {
      list = list.filter(c => allowedCountries.includes(c.code));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        c =>
          (language === 'fr' ? c.fr : c.en).toLowerCase().includes(q) ||
          c.dial_code.includes(q) ||
          c.code.toLowerCase().includes(q),
      );
    }
    return list;
  }, [allowedCountries, searchQuery, language]);

  // Sélection d'un pays dans la dropdown
  const onSelectCountry = useCallback(
    (country: CountryCodesProps) => {
      setSelectedCountry(country);
      setDropdownOpen(false);
      onCountryChange?.(country);
    },
    [onCountryChange],
  );

  // Render d'un item pays dans la dropdown
  const renderItem: ListRenderItem<CountryCodesProps> = useCallback(
    item => (
      <Box className="flex-row items-center gap-2 p-1">
        <Image source={getFlag(item?.code)} className="h-6 w-9 border border-[#D9D9D9]" />
        <String>{language === 'fr' ? item?.fr : item?.en}</String>
        <String>{item?.dial_code}</String>
      </Box>
    ),
    [onSelectCountry, language],
  );

  // Icone à gauche de l'input
  const leftCustomIcon = useMemo(
    () => (
      <Box className="flex-row items-center gap-1">
        {selectedCountry && (
          <Image source={getFlag(selectedCountry.code)} className="h-4 w-6 border border-[#D9D9D9]" />
        )}
        <Icon name="angle-down-solid" size="xs" color="black" className="text-black" />
      </Box>
    ),
    [selectedCountry],
  );

  // Gestion du changement d'input téléphone
  const handleChangeText = useCallback(
    (raw: string) => {
      if (!selectedCountry) return;

      if (!raw) {
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

      const masked = applyMaskPhoneNumber(selectedCountry.code, raw);
      const numberWithSuffix = getPhoneNumberWithSuffix(selectedCountry.code, raw);
      const valid = isValidNumber(numberWithSuffix, selectedCountry.dial_code);
      setIsValid(valid);

      onError?.({
        errorMessage: valid ? null : errorMessage || DEFAULT_ERROR_MESSAGE,
        isValid: valid,
      });
      onPhoneNumberChange?.({
        countryCode: selectedCountry.code,
        countrySuffix: selectedCountry.dial_code,
        isValid: valid,
        phoneNumber: masked.replace(/\s+/g, ''),
        phoneNumberWithSuffix: numberWithSuffix?.replace(/\s+/g, ''),
        phoneNumberWithSuffixMasked: numberWithSuffix,
        phoneWithMask: masked,
      });
      setPhoneNumber(masked);
    },
    [selectedCountry, onError, onPhoneNumberChange, errorMessage],
  );

  // Gestion du blur
  const handleBlur = useCallback(() => {
    if (!dropdownProps?.hasSearch) setDropdownOpen(false);
  }, [dropdownProps?.hasSearch]);

  // Toggle dropdown au clic sur l'icone
  const handleToggleDropdown = () => {
    setDropdownOpen(open => !open);
    inputRef.current?.focus();
  };
  return (
    <View ref={inputRef}>
      <Input
        value={phoneNumber}
        onChangeText={handleChangeText}
        onFocus={() => setIsValid(true)}
        onBlur={handleBlur}
        keyboardType="numeric"
        hasError={!isValid && hasErrorOnChange}
        errorMessage={hasErrorOnChange ? errorMessage || DEFAULT_ERROR_MESSAGE : undefined}
        leftIconAction={{
          customIcon: leftCustomIcon,
          iconPress: handleToggleDropdown,
        }}
        {...props}
      />
      <InputDropdownModal
        dropdownRef={dropdownRef}
        wrapperRef={wrapperRef}
        dropdownPosition={dropdownStyles}
        toggleDropdown={toggleDropdown}
        dropdownProps={{
          customDropdownItem,
          customSearchInput,
          data: state.listData,
          dropdownItemProps,
          hasSearch,
          maxHeight,
          minHeight,
          onSelectItem: handleSelectItem,
          searchInputProps: {
            ...searchInputProps,
            onChangeText: setSearchText,
            value: state.searchText,
          },

          valueField,
          visible: state.visible,
          ...dropdownProps,
        }}
        modalProps={{
          onRequestClose: toggleDropdown,
          statusBarTranslucent: true,
          transparent: true,
          visible: state.visible,
        }}
      />
    </View>
  );
}

export default PhoneNumberTextInput;
