import { Image } from 'react-native';
import { Box } from '@components/box';
import { Icon } from '@components/icon';
import { Input } from '@components/input';
import { String } from '@components/string';
import { classNameHandler, cn, styleHandler } from '@utils';
import { InputDropdownModal } from '@components/inputDropdown';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PhoneNumberInputCountryCodesProps, PhoneNumberInputProps } from '@types';

import * as flags from '../flags';
import { countryCodes } from '../utils/countryCodes';
import { styles } from '../styles/PhoneNumberInput.ss.styles';
import { twStyles } from '../styles/PhoneNumberInput.tw.styles';
import { phoneNumberInputDefaultProps } from '../utils/defaultProps';
import { useInputSelectDropdown } from '../../inputSelectDropdown/hooks';
import { applyMaskPhoneNumber, getPhoneNumberWithSuffix, isValidNumber } from '../utils/phone';

/**
 * Gets the flag image for a given country code
 * @param code - The country code (e.g., 'US', 'FR')
 * @returns The flag image source or undefined if not found
 */
function getFlag(code?: string) {
  if (!code) return undefined;
  return (flags as Record<string, any>)[code.toLowerCase()];
}

/**
 * Gets the initial country based on default country and allowed countries
 * @param defaultCountry - The default country code
 * @param allowedCountries - Array of allowed country codes
 * @returns The initial country object or undefined
 */
const getInitialCountry = (
  defaultCountry: string | undefined,
  allowedCountries: string[] | undefined,
): PhoneNumberInputCountryCodesProps | undefined => {
  let candidates = countryCodes;
  if (allowedCountries) {
    candidates = candidates.filter(c => allowedCountries.includes(c.code));
  }
  return (
    candidates.find(c => c.code === (defaultCountry || phoneNumberInputDefaultProps.defaultCountry)) || candidates[0]
  );
};

/**
 * The `<PhoneNumberInput />` component provides a complete phone number input experience.
 * It features country selection with flags, phone number formatting, validation, and international support.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { PhoneNumberInput } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <PhoneNumberInput
 *   defaultCountry="FR"
 *   allowedCountries={['FR', 'US', 'GB']}
 *   onPhoneNumberChange={(data) => {
 *     if (data.isValid) {
 *       console.log('Valid phone:', data.phoneNumberWithSuffix);
 *     }
 *   }}
 *   onError={(error) => {
 *     if (!error.isValid) {
 *       console.log('Error:', error.errorMessage);
 *     }
 *   }}
 * />
 * ```
 *
 * @param allowedCountries - Array of allowed country codes (e.g., ['US', 'FR', 'GB'])
 * @param customDropdownItem - Custom render function for dropdown items
 * @param defaultCountry - Default country code to select initially
 * @param defaultOpen - Default open state (uncontrolled)
 * @param dropdownPosition - Position of the country dropdown ('auto' | 'top' | 'bottom')
 * @param dropdownProps - Props for the dropdown component
 * @param errorMessage - Custom error message for invalid phone numbers
 * @param hasErrorOnChange - Whether to show error immediately on change
 * @param inputProps - Props to pass to the underlying Input component
 * @param language - Language for country names ('en' | 'fr')
 * @param maxHeight - Maximum height of the dropdown
 * @param minHeight - Minimum height of the dropdown
 * @param offsetX - Horizontal offset for dropdown positioning
 * @param offsetY - Vertical offset for dropdown positioning
 * @param onBlur - Callback when input loses focus
 * @param onCountryChange - Callback when country selection changes
 * @param onError - Callback when validation error occurs
 * @param onFocus - Callback when input gains focus
 * @param onOpenChange - Callback when dropdown open state changes
 * @param onPhoneNumberChange - Callback when phone number changes
 * @param open - Whether the dropdown is open (controlled)
 * @param placeholder - Placeholder text for the input
 * @param searchInputProps - Props for the search input in dropdown
 * @param value - Initial phone number value
 * @returns PhoneNumberInput component with country selection and validation
 */
export function PhoneNumberInput(props: PhoneNumberInputProps) {
  const {
    allowedCountries,
    customDropdownItem,
    defaultCountry,
    defaultOpen = phoneNumberInputDefaultProps.defaultOpen,
    dropdownPosition = phoneNumberInputDefaultProps.dropdownPosition,
    dropdownProps = phoneNumberInputDefaultProps.dropdownProps,
    errorMessage,
    hasErrorOnChange = phoneNumberInputDefaultProps.hasErrorOnChange,
    inputProps,
    language = phoneNumberInputDefaultProps.defaultLanguage,
    maxHeight = phoneNumberInputDefaultProps.maxHeight,
    minHeight = phoneNumberInputDefaultProps.minHeight,
    offsetX = 0,
    offsetY = phoneNumberInputDefaultProps.offsetY,
    onBlur,
    onCountryChange,
    onError,
    onFocus,
    onOpenChange,
    onPhoneNumberChange,
    open,
    placeholder = phoneNumberInputDefaultProps.inputPlaceholder,
    searchInputProps,
    value,
  } = props;

  const [selectedCountry, setSelectedCountry] = useState<PhoneNumberInputCountryCodesProps | undefined>(() =>
    getInitialCountry(defaultCountry, allowedCountries),
  );
  const [phoneNumber, setPhoneNumber] = useState(value ?? '');
  const [isValid, setIsValid] = useState(true);

  const filteredCountries = useMemo(() => {
    let list = countryCodes;
    if (allowedCountries) {
      list = list.filter(c => allowedCountries.includes(c.code));
    }
    return list;
  }, [allowedCountries]);

  const getFilteredCountries = useCallback(
    (countries: PhoneNumberInputCountryCodesProps[], searchText: string) => {
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

  const { dropdownRef, dropdownStyles, handleSelectItem, inputRef, setSearchText, state, toggleDropdown, wrapperRef } =
    useInputSelectDropdown(
      {
        closeModalWhenSelectedItem: true,
        dataSet: filteredCountries,
        defaultOpen,
        excludeItems: [],
        excludeSearchItems: [],
        inputValue: selectedCountry,
        offsetX,
        offsetY,
        onBlur,
        onFocus,
        onOpenChange,
        onSelectItem: (country: PhoneNumberInputCountryCodesProps) => {
          setSelectedCountry(country);
          onCountryChange?.(country);
        },
        open,
        position: dropdownPosition as 'auto' | 'top' | 'bottom',
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
  const DefaultDropdownItemRender = useCallback(
    (item: PhoneNumberInputCountryCodesProps) => (
      <Box
        {...styleHandler({ defaultStyle: styles.dropdownItemContainer })}
        {...classNameHandler(cn(twStyles.dropdownItemContainer))}
      >
        <Image
          source={getFlag(item?.code)}
          {...styleHandler({ defaultStyle: styles.flagImage })}
          {...classNameHandler(cn(twStyles.flagImage))}
        />
        <String {...styleHandler({ defaultStyle: styles.countryName })} {...classNameHandler(cn(twStyles.countryName))}>
          {language === 'fr' ? item?.fr : item?.en}
        </String>
        <String>{item?.dial_code}</String>
      </Box>
    ),
    [language],
  );

  const DropdownItemRender = useCallback(
    (item: PhoneNumberInputCountryCodesProps) => {
      if (customDropdownItem) {
        return customDropdownItem(item);
      }
      return DefaultDropdownItemRender(item);
    },
    [customDropdownItem, DefaultDropdownItemRender],
  );

  const leftCustomIcon = useMemo(
    () => (
      <Box
        {...styleHandler({ defaultStyle: styles.leftIconContainer })}
        {...classNameHandler(cn(twStyles.leftIconContainer))}
      >
        {selectedCountry && (
          <Image
            source={getFlag(selectedCountry.code)}
            {...styleHandler({ defaultStyle: styles.flagImageSmall })}
            {...classNameHandler(cn(twStyles.flagImageSmall))}
          />
        )}
        <Icon name="angle-down-solid" size="xs" color="black" />
      </Box>
    ),
    [selectedCountry],
  );

  /**
   * Handles phone number text changes with formatting and validation
   * @param raw - The raw phone number input
   */
  const handleChangeText = useCallback(
    (raw: string) => {
      if (!selectedCountry) return;

      if (!raw) {
        setIsValid(true);
        onError?.({ errorMessage: null, isValid: true });
        onPhoneNumberChange?.({
          countryCode: 'US',
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
        errorMessage: valid ? null : errorMessage || phoneNumberInputDefaultProps.defaultErrorMessage,
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
        errorMessage={
          hasErrorOnChange && !isValid ? (errorMessage ?? phoneNumberInputDefaultProps.defaultErrorMessage) : undefined
        }
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
          backdropPress={toggleDropdown}
          dropdownProps={{
            customSearchInput: undefined,
            data: displayedCountries,
            dropdownItemProps: undefined,
            DropdownItemRender,
            hasSearch: dropdownProps?.hasSearch ?? true,
            itemClickableAs: phoneNumberInputDefaultProps.itemAsClickable,
            maxHeight,
            minHeight,
            onSelectItem: handleSelectItem,
            searchInputProps: {
              onChangeText: setSearchText,
              placeholder: phoneNumberInputDefaultProps.inputSearchPlaceholder,
              value: state.searchText,
              ...searchInputProps,
            },
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

PhoneNumberInput.displayName = 'PhoneNumberInput';
