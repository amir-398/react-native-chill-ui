import { ComponentType, useState } from 'react';

import { String } from '@/components';
import { PhoneNumberTextInputOnPhoneNumberChange } from '@/types';

import UiPresentation from './storybook';
import PhoneNumberTextInput from '../src/components/phoneNumberInput/PhoneNumberInput';

export default {
  argTypes: {
    allowedCountries: {
      control: 'select',
      options: ['FR', 'US', 'GB'],
    },
    defaultCountry: {
      control: 'select',
      options: 'FR',
    },
    errorMessage: {
      control: 'text',
    },
    hasErrorOnChange: {
      control: 'boolean',
    },

    language: {
      control: 'select',
      options: ['fr', 'en'],
    },
    onCountryChange: {
      action: 'onCountryChange',
    },
    onError: {
      action: 'onError',
    },
    onPhoneNumberChange: {
      action: 'onPhoneNumberChange',
    },
    placeholder: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
  },
  component: PhoneNumberTextInput,
  decorators: [
    (Story: ComponentType) => (
      <UiPresentation className="items-start justify-start px-3">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/Inputs/PhoneNumberTextInput',
};

function DefaultPhoneNumber() {
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

  const handlePhoneNumberChange = (phoneChange: PhoneNumberTextInputOnPhoneNumberChange) => {
    setPhoneNumber(phoneChange);
  };

  return (
    <>
      <PhoneNumberTextInput
        defaultCountry="FR"
        hasErrorOnChange
        language="en"
        onPhoneNumberChange={handlePhoneNumberChange}
        placeholder="06 12 34 56 78"
      />
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
    hasErrorOnChange: true,
    language: 'en',
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

export const WithDefaultCountry = {
  args: {
    defaultCountry: 'US',
    placeholder: '(465) 123-4567',
  },
};

export const WithFrenchLanguage = {
  args: {
    language: 'fr',
    placeholder: '06 12 34 56 78',
  },
};

export const dropdownWithoutSearch = {
  args: {
    dropdownProps: {
      hasSearch: false,
    },
    placeholder: '06 12 34 56 78',
  },
};
