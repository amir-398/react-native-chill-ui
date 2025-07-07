import { Image } from 'react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Icon from '../icon';
import { Box } from '../box';
import String from '../string';
import * as flags from './flags';
import Input from '../inputs/Input';
import { PhoneNumberInputProps } from '../../types';
import { DEFAULT_CONFIG } from '../inputSelectDropdown/types';
import InputDropdownModal from '../inputDrodown/InputDropdownModal';
import { countryCodes, type CountryCodesProps } from './countryCodes';
import { useInputSelectDropdown } from '../inputSelectDropdown/hooks';
import { applyMaskPhoneNumber, getPhoneNumberWithSuffix, isValidNumber } from './utils';

function getFlag(code?: string) {
  if (!code) return undefined;
  return (flags as Record<string, any>)[code.toLowerCase()];
}

const DEFAULT_LANG = 'en';
const DEFAULT_COUNTRY_CODE = 'US';
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

function PhoneNumberInput({
  allowedCountries,
  defaultCountry,
  dropdownPosition = 'auto',
  dropdownProps = { hasSearch: true },
  errorMessage,
  hasErrorOnChange = true,
  inputProps,
  language = DEFAULT_LANG,
  maxHeight = DEFAULT_CONFIG.MAX_HEIGHT,
  minHeight = DEFAULT_CONFIG.MIN_HEIGHT,
  offsetX = 0,
  offsetY = DEFAULT_CONFIG.HEADER_OFFSET_Y,
  onBlur,
  onCountryChange,
  onError,
  onFocus,
  onPhoneNumberChange,
  placeholder = DEFAULT_CONFIG.PHONE_NUMBER_INPUT_PLACEHOLDER,
  value,
}: PhoneNumberInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryCodesProps | undefined>(() =>
    getInitialCountry(defaultCountry, allowedCountries),
  );
  const [phoneNumber, setPhoneNumber] = useState(value ?? '');
  const [isValid, setIsValid] = useState(true);

  // Préparer les données pour le dropdown
  const filteredCountries = useMemo(() => {
    let list = countryCodes;
    if (allowedCountries) {
      list = list.filter(c => allowedCountries.includes(c.code));
    }
    return list;
  }, [allowedCountries]);

  // Fonction de recherche personnalisée pour rechercher dans plusieurs champs

  // Filtrage côté client pour rechercher dans plusieurs champs
  const getFilteredCountries = useCallback(
    (countries: CountryCodesProps[], searchText: string) => {
      if (!searchText) return countries;

      const q = searchText.toLowerCase();
      return countries.filter(
        country =>
          (language === 'fr' ? country.fr : country.en).toLowerCase().includes(q) ||
          country.dial_code.includes(q) ||
          country.code.toLowerCase().includes(q),
      );
    },
    [language],
  );

  // Utilisation du hook principal
  const { dropdownRef, dropdownStyles, handleSelectItem, inputRef, setSearchText, state, toggleDropdown, wrapperRef } =
    useInputSelectDropdown(
      {
        closeModalWhenSelectedItem: true,
        dataSet: filteredCountries,
        excludeItems: [],
        excludeSearchItems: [],
        inputValue: selectedCountry,
        offsetX,
        offsetY,
        onBlur,
        onFocus,
        onSelectItem: (country: CountryCodesProps) => {
          setSelectedCountry(country);
          onCountryChange?.(country);
        },
        position: dropdownPosition,
        searchField: language === 'fr' ? 'fr' : 'en',
        searchQuery: () => true,
        valueField: 'code',
      },
      null,
    );

  const displayedCountries = useMemo(
    () => getFilteredCountries(state.listData, state.searchText),
    [state.listData, state.searchText, getFilteredCountries],
  );

  // Render d'un item pays dans la dropdown
  const customDropdownItem = useCallback(
    (item: CountryCodesProps) => (
      <Box className="flex-row items-center gap-2 p-3">
        <Image source={getFlag(item?.code)} className="h-6 w-9 border border-[#D9D9D9]" />
        <String className="flex-1">{language === 'fr' ? item?.fr : item?.en}</String>
        <String>{item?.dial_code}</String>
      </Box>
    ),
    [language],
  );

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

  useEffect(() => {
    setSelectedCountry(getInitialCountry(defaultCountry, allowedCountries));
  }, [allowedCountries, defaultCountry]);

  return (
    <>
      <Input
        wrapperRef={inputRef}
        value={phoneNumber}
        placeholder={placeholder}
        onChangeText={handleChangeText}
        onFocus={() => setIsValid(true)}
        keyboardType="numeric"
        hasError={!isValid && hasErrorOnChange}
        errorMessage={hasErrorOnChange ? (errorMessage ?? DEFAULT_ERROR_MESSAGE) : undefined}
        leftIconAction={{
          customIcon: leftCustomIcon,
          iconPress: toggleDropdown,
        }}
        {...inputProps}
      />
      {dropdownStyles && (
        <InputDropdownModal
          dropdownRef={dropdownRef}
          wrapperRef={wrapperRef}
          dropdownPosition={dropdownStyles}
          toggleDropdown={toggleDropdown}
          dropdownProps={{
            customDropdownItem,
            customSearchInput: undefined,
            data: displayedCountries,
            dropdownItemProps: undefined,
            hasSearch: dropdownProps?.hasSearch ?? true,
            maxHeight,
            minHeight,
            onSelectItem: handleSelectItem,
            searchInputProps: {
              onChangeText: setSearchText,
              placeholder: 'Rechercher un pays...',
              value: state.searchText,
            },
            valueField: 'code',
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
      )}
    </>
  );
}

export default PhoneNumberInput;
