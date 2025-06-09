import { ComponentType } from 'react';

import { Box } from '@/components';

import PhoneNumberTextInput from '../src/components/inputs/phoneNumberInput/PhoneNumberInput';

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
    language: {
      control: 'select',
      options: ['fr', 'en'],
    },
  },
  component: PhoneNumberTextInput,
  decorators: [
    (Story: ComponentType) => (
      <Box className="items-start justify-start px-3">
        <Story />
      </Box>
    ),
  ],
  title: 'Components/Inputs/PhoneNumberTextInput',
};

export const Default = {
  args: {
    defaultCountry: 'US',
    language: 'en',
  },
};

export const WithInitialValue = {
  args: {
    phoneNumber: '06 12 34 56 78',
  },
};

export const WithAllowedCountries = {
  args: {
    allowedCountries: ['FR', 'US', 'GB'],
  },
};

export const WithDefaultCountry = {
  args: {
    defaultCountry: 'US',
  },
};

export const WithEnglishLanguage = {
  args: {
    language: 'en',
  },
};
