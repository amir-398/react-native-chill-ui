import { ComponentType, useState } from 'react';

import UiPresentation from './storybook';
import { String } from '../src/components';
import PhoneNumberInput from '../src/components/phoneNumberInput/PhoneNumberInput';
import { PhoneNumberInputOnPhoneNumberChange, PhoneNumberInputProps } from '../src/types/phoneNumberInput.types';

export default {
  argTypes: {
    allowedCountries: {
      control: 'multi-select',
      description: 'List of allowed country codes',
      options: ['FR', 'US', 'GB', 'CA', 'DE', 'IT', 'ES', 'AU', 'JP', 'CN'],
    },
    defaultCountry: {
      control: 'select',
      description: 'Default selected country',
      options: ['FR', 'US', 'GB', 'CA', 'DE', 'IT', 'ES', 'AU', 'JP', 'CN'],
    },
    dropdownPosition: {
      control: 'select',
      description: 'Position of the dropdown',
      options: ['auto', 'top', 'bottom'],
    },
    dropdownProps: {
      control: 'object',
      description: 'Additional props for the dropdown',
    },
    errorMessage: {
      control: 'text',
      description: 'Custom error message',
    },
    hasErrorOnChange: {
      control: 'boolean',
      description: 'Show error state while typing',
    },
    inputProps: {
      control: 'object',
      description: 'Additional props for the input',
    },
    language: {
      control: 'select',
      description: 'Language for country names display',
      options: ['fr', 'en'],
    },
    maxHeight: {
      control: { max: 500, min: 100, step: 10, type: 'number' },
      description: 'Maximum height of the dropdown',
    },
    minHeight: {
      control: { max: 300, min: 50, step: 10, type: 'number' },
      description: 'Minimum height of the dropdown',
    },
    offsetX: {
      control: { max: 50, min: -50, step: 1, type: 'number' },
      description: 'Horizontal offset for dropdown positioning',
    },
    offsetY: {
      control: { max: 50, min: -50, step: 1, type: 'number' },
      description: 'Vertical offset for dropdown positioning',
    },
    onBlur: {
      action: 'onBlur',
    },
    onCountryChange: {
      action: 'onCountryChange',
    },
    onError: {
      action: 'onError',
    },
    onFocus: {
      action: 'onFocus',
    },
    onPhoneNumberChange: {
      action: 'onPhoneNumberChange',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    value: {
      control: 'text',
      description: 'Initial value for the phone number',
    },
  },
  component: PhoneNumberInput,
  decorators: [
    (Story: ComponentType) => (
      <UiPresentation className="items-start justify-start px-3">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/Inputs/PhoneNumberInput',
};

function DefaultPhoneNumber(args: PhoneNumberInputProps) {
  const [phoneNumber, setPhoneNumber] = useState<{
    countryCode: string;
    countrySuffix: string;
    isValid: boolean;
    phoneNumber: string;
    phoneNumberWithSuffix: string;
    phoneNumberWithSuffixMasked: string;
    phoneWithMask: string;
  }>({
    countryCode: '',
    countrySuffix: '',
    isValid: false,
    phoneNumber: '',
    phoneNumberWithSuffix: '',
    phoneNumberWithSuffixMasked: '',
    phoneWithMask: '',
  });

  const handlePhoneNumberChange = (phoneChange: PhoneNumberInputOnPhoneNumberChange) => {
    setPhoneNumber(phoneChange);
  };

  return (
    <>
      <PhoneNumberInput {...args} onPhoneNumberChange={handlePhoneNumberChange} />

      <String>phoneNumber: {phoneNumber?.phoneNumber}</String>
      <String>phoneNumberWithSuffix: {phoneNumber.phoneNumberWithSuffix}</String>
      <String>phoneNumberWithSuffixMasked: {phoneNumber.phoneNumberWithSuffixMasked}</String>
      <String>phoneWithMask: {phoneNumber.phoneWithMask}</String>
      <String>isValid: {phoneNumber.isValid.toString()}</String>
      <String>countryCode: {phoneNumber.countryCode}</String>
      <String>countrySuffix: {phoneNumber.countrySuffix}</String>
    </>
  );
}

export const Default = {
  args: {
    defaultCountry: 'US',
    dropdownPosition: 'auto',
    dropdownProps: {
      hasSearch: true,
    },
    hasErrorOnChange: true,
    language: 'en',
    placeholder: '06 12 34 56 78',
  },
  render: DefaultPhoneNumber,
};

export const WithInitialValue = {
  args: {
    value: '06 12 34 56 78',
  },
};

export const WithAllowedCountries = {
  args: {
    allowedCountries: ['FR', 'US', 'GB'],
    placeholder: '06 12 34 56 78',
  },
};

export const WithFrenchLanguage = {
  args: {
    language: 'fr',
    placeholder: '06 12 34 56 78',
  },
};

export const DropdownWithoutSearch = {
  args: {
    dropdownProps: {
      hasSearch: false,
    },
    placeholder: '06 12 34 56 78',
  },
};

export const WithCustomError = {
  args: {
    defaultCountry: 'FR',
    errorMessage: 'Veuillez saisir un numéro de téléphone valide',
    hasErrorOnChange: true,
    language: 'fr',
    placeholder: '06 12 34 56 78',
    value: '123', // Invalid number to trigger error
  },
};
