import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import { PhoneNumberInput } from '../src/components/phoneNumberInput';

const meta: Meta<typeof PhoneNumberInput> = {
  argTypes: {
    // Basic props
    allowedCountries: {
      control: 'object',
      description: 'Array of allowed country codes',
      table: {
        type: {
          detail: "Array of country codes like ['US', 'FR', 'GB']",
          summary: 'CountryCode[]',
        },
      },
    },
    defaultCountry: {
      control: 'select',
      description: 'Default country code to select initially',
      options: ['US', 'FR', 'GB', 'CA', 'AU', 'DE', 'IT', 'ES', 'JP', 'CN'],
    },
    language: {
      control: 'select',
      description: 'Language for country names',
      options: ['en', 'fr'],
    },
    placeholder: { control: 'text', description: 'Placeholder text for the input' },
    value: { control: 'text', description: 'Initial phone number value' },

    // Dropdown props
    defaultOpen: { control: 'boolean', description: 'Default open state (uncontrolled)' },
    dropdownPosition: {
      control: 'select',
      description: 'Position of dropdown relative to input',
      options: ['auto', 'top', 'bottom'],
    },
    dropdownProps: {
      control: 'object',
      description: 'Additional props for dropdown component',
      table: {
        type: {
          summary: 'Partial<InputDropdownProps>',
        },
      },
    },
    maxHeight: { control: 'number', description: 'Maximum height of dropdown' },
    minHeight: { control: 'number', description: 'Minimum height of dropdown' },
    offsetX: { control: 'number', description: 'Horizontal offset for dropdown positioning' },
    offsetY: { control: 'number', description: 'Vertical offset for dropdown positioning' },

    // Validation props
    errorMessage: { control: 'text', description: 'Custom error message for invalid phone numbers' },
    hasErrorOnChange: { control: 'boolean', description: 'Whether to show error immediately on change' },

    // Input props
    inputProps: {
      control: 'object',
      description: 'Props to pass to the underlying Input component',
      table: {
        type: {
          summary: 'InputProps',
        },
      },
    },
    searchInputProps: {
      control: 'object',
      description: 'Props for the search input in dropdown',
      table: {
        type: {
          summary: 'InputProps',
        },
      },
    },

    // Callbacks
    onBlur: { action: 'onBlur', description: 'Callback when input loses focus' },
    onCountryChange: { action: 'onCountryChange', description: 'Callback when country selection changes' },
    onError: { action: 'onError', description: 'Callback when validation error occurs' },
    onFocus: { action: 'onFocus', description: 'Callback when input gains focus' },
    onOpenChange: { action: 'onOpenChange', description: 'Callback when dropdown open state changes' },
    onPhoneNumberChange: { action: 'onPhoneNumberChange', description: 'Callback when phone number changes' },

    // Controlled mode
    open: { control: 'boolean', description: 'Whether the dropdown is open (controlled)' },

    // Custom rendering
    customDropdownItem: {
      control: false,
      description: 'Custom render function for dropdown items',
      table: {
        type: {
          summary: '(country: PhoneNumberInputCountryCodesProps) => ReactElement',
        },
      },
    },
  },
  component: PhoneNumberInput,
  decorators: [
    (Story: any) => (
      <UiPresentation className="items-start justify-start px-3">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/Inputs/PhoneNumberInput',
};

export default meta;
type Story = StoryObj<typeof PhoneNumberInput>;

// Basic PhoneNumberInput
export const Default: Story = {
  args: {
    placeholder: 'Enter your phone number',
  },
};

export const WithDefaultCountry: Story = {
  args: {
    defaultCountry: 'FR',
    placeholder: 'Enter your phone number',
  },
};

export const WithValue: Story = {
  args: {
    defaultCountry: 'US',
    placeholder: 'Enter your phone number',
    value: '1234567890',
  },
};

// Country Restrictions
export const WithAllowedCountries: Story = {
  args: {
    allowedCountries: ['US', 'CA', 'GB', 'AU'],
    defaultCountry: 'US',
    placeholder: 'Enter your phone number',
  },
};

export const WithEuropeanCountries: Story = {
  args: {
    allowedCountries: ['FR', 'DE', 'IT', 'ES', 'GB', 'NL', 'BE'],
    defaultCountry: 'FR',
    placeholder: 'Enter your phone number',
  },
};

// Language Support
export const FrenchLanguage: Story = {
  args: {
    defaultCountry: 'FR',
    language: 'fr',
    placeholder: 'Entrez votre numéro de téléphone',
  },
};

// Validation Examples
export const WithValidation: Story = {
  args: {
    defaultCountry: 'US',
    errorMessage: 'Please enter a valid phone number',
    hasErrorOnChange: true,
    placeholder: 'Enter your phone number',
  },
};

export const WithCustomErrorMessage: Story = {
  args: {
    defaultCountry: 'FR',
    errorMessage: 'Veuillez entrer un numéro de téléphone valide',
    hasErrorOnChange: true,
    language: 'fr',
    placeholder: 'Entrez votre numéro de téléphone',
  },
};

// Dropdown Positioning
export const DropdownTop: Story = {
  args: {
    defaultCountry: 'US',
    dropdownPosition: 'top',
    placeholder: 'Enter your phone number',
  },
};

export const DropdownBottom: Story = {
  args: {
    defaultCountry: 'US',
    dropdownPosition: 'bottom',
    placeholder: 'Enter your phone number',
  },
};

export const DropdownAuto: Story = {
  args: {
    defaultCountry: 'US',
    dropdownPosition: 'auto',
    placeholder: 'Enter your phone number',
  },
};

// Custom Styling
export const WithCustomInputProps: Story = {
  args: {
    defaultCountry: 'US',
    inputProps: {
      placeholder: 'Enter your mobile number',
      size: 'lg',
    },
    placeholder: 'Enter your phone number',
  },
};

export const WithCustomDropdownProps: Story = {
  args: {
    defaultCountry: 'US',
    dropdownProps: {
      maxHeight: 300,
      minHeight: 150,
    },
    placeholder: 'Enter your phone number',
  },
};

export const WithCustomSearchProps: Story = {
  args: {
    defaultCountry: 'US',
    language: 'fr',
    placeholder: 'Enter your phone number',
    searchInputProps: {
      placeholder: 'Rechercher un pays...',
      size: 'md',
    },
  },
};

// Controlled Mode
export const ControlledMode: Story = {
  args: {
    defaultCountry: 'US',
    open: false,
    placeholder: 'Enter your phone number',
  },
};

// Different Sizes
export const SmallSize: Story = {
  args: {
    defaultCountry: 'US',
    inputProps: {
      size: 'sm',
    },
    placeholder: 'Enter your phone number',
  },
};

export const LargeSize: Story = {
  args: {
    defaultCountry: 'US',
    inputProps: {
      size: 'lg',
    },
    placeholder: 'Enter your phone number',
  },
};

export const ExtraLargeSize: Story = {
  args: {
    defaultCountry: 'US',
    inputProps: {
      size: 'xl',
    },
    placeholder: 'Enter your phone number',
  },
};

// Advanced Examples
export const WithDisabledState: Story = {
  args: {
    defaultCountry: 'US',
    inputProps: {
      isDisabled: true,
    },
    placeholder: 'This input is disabled',
  },
};

export const WithCustomOffset: Story = {
  args: {
    defaultCountry: 'US',
    offsetX: 10,
    offsetY: 15,
    placeholder: 'Enter your phone number',
  },
};

export const WithMaxHeight: Story = {
  args: {
    defaultCountry: 'US',
    maxHeight: 200,
    placeholder: 'Enter your phone number',
  },
};

export const WithMinHeight: Story = {
  args: {
    defaultCountry: 'US',
    minHeight: 100,
    placeholder: 'Enter your phone number',
  },
};

// International Examples
export const USPhoneNumber: Story = {
  args: {
    allowedCountries: ['US'],
    defaultCountry: 'US',
    placeholder: 'Enter your US phone number',
  },
};

export const UKPhoneNumber: Story = {
  args: {
    allowedCountries: ['GB'],
    defaultCountry: 'GB',
    placeholder: 'Enter your UK phone number',
  },
};

export const FrenchPhoneNumber: Story = {
  args: {
    allowedCountries: ['FR'],
    defaultCountry: 'FR',
    language: 'fr',
    placeholder: 'Entrez votre numéro français',
  },
};

export const GermanPhoneNumber: Story = {
  args: {
    allowedCountries: ['DE'],
    defaultCountry: 'DE',
    placeholder: 'Enter your German phone number',
  },
};

export const JapanesePhoneNumber: Story = {
  args: {
    allowedCountries: ['JP'],
    defaultCountry: 'JP',
    placeholder: 'Enter your Japanese phone number',
  },
};

// Multi-Country Examples
export const NorthAmerica: Story = {
  args: {
    allowedCountries: ['US', 'CA', 'MX'],
    defaultCountry: 'US',
    placeholder: 'Enter your North American phone number',
  },
};

export const EuropeanUnion: Story = {
  args: {
    allowedCountries: ['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'IE', 'FI'],
    defaultCountry: 'FR',
    language: 'en',
    placeholder: 'Enter your EU phone number',
  },
};

export const AsiaPacific: Story = {
  args: {
    allowedCountries: ['JP', 'KR', 'CN', 'AU', 'NZ', 'SG', 'HK', 'TW'],
    defaultCountry: 'JP',
    placeholder: 'Enter your Asia-Pacific phone number',
  },
};

// Error States
export const WithErrorState: Story = {
  args: {
    defaultCountry: 'US',
    errorMessage: 'Invalid phone number format',
    hasError: true,
    hasErrorOnChange: true,
    placeholder: 'Enter your phone number',
  },
};

export const WithCustomErrorIcon: Story = {
  args: {
    defaultCountry: 'US',
    errorMessage: 'Please enter a valid phone number',
    hasError: true,
    hasErrorOnChange: true,
    inputProps: {
      errorIconName: 'exclamation-triangle-solid',
    },
    placeholder: 'Enter your phone number',
  },
};

// Interactive Examples
export const WithCallbacks: Story = {
  args: {
    defaultCountry: 'US',
    onBlur: () => console.log('Input blurred'),
    onCountryChange: country => console.log('Country changed:', country),
    onError: error => console.log('Error:', error),
    onFocus: () => console.log('Input focused'),
    onOpenChange: open => console.log('Dropdown open:', open),
    onPhoneNumberChange: data => console.log('Phone changed:', data),
    placeholder: 'Enter your phone number',
  },
};

// Custom Rendering Example (commented out as it requires custom component)
export const WithCustomDropdownItem: Story = {
  args: {
    defaultCountry: 'US',
    placeholder: 'Enter your phone number',
    // customDropdownItem: (country) => (
    //   <Box className="flex-row items-center gap-2 p-2">
    //     <Image source={getFlag(country.code)} className="h-4 w-6" />
    //     <String>{country.en}</String>
    //     <String className="text-gray-500">{country.dial_code}</String>
    //   </Box>
    // ),
  },
};

// Form Integration Example
export const FormIntegration: Story = {
  args: {
    defaultCountry: 'US',
    placeholder: 'Enter your phone number',
    // This would typically be used with form libraries like react-hook-form
    // value: formData.phoneNumber,
    // onPhoneNumberChange: (data) => {
    //   setFormData(prev => ({ ...prev, phoneNumber: data.phoneNumberWithSuffix }));
    // },
  },
};
