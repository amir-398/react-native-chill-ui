import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import { MaskedInput } from '../src/components/maskedInput';

const meta: Meta<typeof MaskedInput> = {
  argTypes: {
    // Basic props
    mask: {
      control: 'text',
      description: 'Mask pattern (use 9 for digits)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'required' },
      },
    },
    placeholder: { control: 'text', description: 'The placeholder text' },
    value: { control: 'text', description: 'The value of the input' },
    defaultValue: { control: 'text', description: 'Default value for uncontrolled input' },
    onChangeText: { action: 'onChangeText', description: 'Callback when input text changes' },

    // Label and error
    label: { control: 'text', description: 'Label text above the input' },
    hasError: { control: 'boolean', description: 'Whether the input has an error' },
    errorMessage: { control: 'text', description: 'Error message to display' },
    errorIconName: { control: 'text', description: 'Icon name for error state' },
    errorClassName: { control: 'text', description: 'Custom class for error message (NativeWind only)' },
    errorStyle: { control: 'object', description: 'Custom style for error message (StyleSheet only)' },
    errorStringProps: { control: 'object', description: 'Props for the error message String component' },

    // Icons
    leftIconAction: {
      control: 'object',
      description: 'Configuration for left icon action',
      table: {
        type: {
          summary:
            '{ iconName?: string, iconColor?: string, iconSize?: string, customIcon?: ReactNode, iconPress?: () => void, hasPressEffect?: boolean }',
        },
      },
    },
    rightIconAction: {
      control: 'object',
      description: 'Configuration for right icon action',
      table: {
        type: {
          summary:
            '{ iconName?: string, iconColor?: string, iconSize?: string, customIcon?: ReactNode, iconPress?: () => void, hasPressEffect?: boolean }',
        },
      },
    },

    // Interaction
    editable: { control: 'boolean', description: 'Whether the input is editable' },
    isDisabled: { control: 'boolean', description: 'Whether input is disabled' },
    maxLength: { control: 'number', description: 'Maximum length (auto-calculated from mask)' },

    // Styling
    className: { control: 'text', description: 'Custom class for the input container (NativeWind only)' },
    style: { control: 'object', description: 'Custom style object' },
    inputClassName: { control: 'text', description: 'Custom class for the input field (NativeWind only)' },
    inputStyle: { control: 'object', description: 'Custom style for the input field (StyleSheet only)' },
    size: {
      control: 'select',
      description: 'Size of the input',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },

    // String components
    labelStringProps: { control: 'object', description: 'Props for the label String component' },

    // Refs
    wrapperRef: { control: false, description: 'Reference to the input container wrapper' },
  },
  component: MaskedInput,
  decorators: [
    (Story: any) => (
      <UiPresentation className="items-start justify-start px-3">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/Inputs/MaskedInput',
};

export default meta;
type Story = StoryObj<typeof MaskedInput>;

// Basic MaskedInputs
export const Default: Story = {
  args: {
    mask: '(999) 999-9999',
    placeholder: 'Enter phone number',
  },
};

export const WithLabel: Story = {
  args: {
    mask: '(999) 999-9999',
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
  },
};

export const WithValue: Story = {
  args: {
    mask: '(999) 999-9999',
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    value: '(555) 123-4567',
  },
};

export const Disabled: Story = {
  args: {
    mask: '(999) 999-9999',
    isDisabled: true,
    label: 'Disabled Phone Input',
    placeholder: 'This input is disabled',
    value: '(555) 123-4567',
  },
};

// Different Mask Patterns
export const PhoneNumber: Story = {
  args: {
    mask: '(999) 999-9999',
    label: 'US Phone Number',
    placeholder: '(555) 123-4567',
  },
};

export const CreditCard: Story = {
  args: {
    mask: '9999 9999 9999 9999',
    label: 'Credit Card',
    placeholder: '1234 5678 9012 3456',
  },
};

export const SocialSecurityNumber: Story = {
  args: {
    mask: '999-99-9999',
    label: 'Social Security Number',
    placeholder: '123-45-6789',
  },
};

export const DateInput: Story = {
  args: {
    mask: '99/99/9999',
    label: 'Birth Date',
    placeholder: 'MM/DD/YYYY',
  },
};

export const CurrencyInput: Story = {
  args: {
    mask: '$999,999.99',
    label: 'Amount',
    placeholder: '$1,234.56',
  },
};

export const ZipCode: Story = {
  args: {
    mask: '99999',
    label: 'ZIP Code',
    placeholder: '12345',
  },
};

// Icon Variations
export const WithLeftIcon: Story = {
  args: {
    mask: '(999) 999-9999',
    label: 'Phone Number',
    leftIconAction: {
      iconName: 'phone-solid',
      iconSize: 'md',
    },
    placeholder: 'Enter phone number',
  },
};

export const WithRightIcon: Story = {
  args: {
    mask: '(999) 999-9999',
    label: 'Phone Number',
    placeholder: 'Enter phone number',
    rightIconAction: {
      iconName: 'checkmark-solid',
      iconPress: () => {
        // eslint-disable-next-line no-alert
        alert('Phone number validated!');
      },
      hasPressEffect: true,
    },
  },
};

export const WithBothIcons: Story = {
  args: {
    mask: '(999) 999-9999',
    label: 'Phone Number',
    leftIconAction: {
      iconName: 'phone-solid',
      iconSize: 'md',
    },
    placeholder: 'Enter phone number',
    rightIconAction: {
      iconName: 'xmark-solid',
      iconPress: () => {
        // eslint-disable-next-line no-alert
        alert('Clear phone number');
      },
      hasPressEffect: true,
    },
    value: '(555) 123-4567',
  },
};

// Error States
export const WithError: Story = {
  args: {
    mask: '(999) 999-9999',
    errorIconName: 'exclamation-triangle-solid',
    errorMessage: 'Please enter a valid phone number',
    hasError: true,
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
  },
};

export const WithErrorAndValue: Story = {
  args: {
    mask: '(999) 999-9999',
    errorIconName: 'exclamation-triangle-solid',
    errorMessage: 'Phone number is incomplete',
    hasError: true,
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    value: '(555) 123',
  },
};

// Size Variations
export const ExtraSmall: Story = {
  args: {
    mask: '(999) 999-9999',
    label: 'Extra Small',
    placeholder: 'Extra small input',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    mask: '(999) 999-9999',
    label: 'Small',
    placeholder: 'Small input',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    mask: '(999) 999-9999',
    label: 'Medium',
    placeholder: 'Medium input',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    mask: '(999) 999-9999',
    label: 'Large',
    placeholder: 'Large input',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    mask: '(999) 999-9999',
    label: 'Extra Large',
    placeholder: 'Extra large input',
    size: 'xl',
  },
};

// Advanced Examples
export const CustomMaskPattern: Story = {
  args: {
    mask: 'ABC-999-XYZ',
    label: 'Custom Code',
    placeholder: 'ABC-123-XYZ',
  },
};

export const LicensePlate: Story = {
  args: {
    mask: '999-AAA',
    label: 'License Plate',
    placeholder: '123-ABC',
  },
};

export const InternationalPhone: Story = {
  args: {
    mask: '+999 999 999 9999',
    label: 'International Phone',
    placeholder: '+1 555 123 4567',
  },
};

export const WithCustomStringProps: Story = {
  args: {
    errorStringProps: {
      colorVariant: 'error',
      size: 'sm',
    },
    label: 'Phone with Custom Styling',
    labelStringProps: {
      colorVariant: 'primary',
      size: 'lg',
    },
    mask: '(999) 999-9999',
    placeholder: 'Enter your phone number',
  },
};

export const WithPressEffectIcons: Story = {
  args: {
    label: 'Phone with Press Effect Icons',
    leftIconAction: {
      iconName: 'phone-solid',
      iconPress: () => {
        // eslint-disable-next-line no-alert
        alert('Phone icon pressed!');
      },
      hasPressEffect: true,
    },
    mask: '(999) 999-9999',
    placeholder: 'Enter phone number',
    rightIconAction: {
      iconName: 'checkmark-solid',
      iconPress: () => {
        // eslint-disable-next-line no-alert
        alert('Validate icon pressed!');
      },
      hasPressEffect: true,
    },
    value: '(555) 123-4567',
  },
};

// Complex Examples
export const MultipleMaskedInputs: Story = {
  render: () => (
    <div className="space-y-4">
      <MaskedInput mask="(999) 999-9999" label="Phone Number" placeholder="Enter phone number" />
      <MaskedInput mask="999-99-9999" label="Social Security Number" placeholder="Enter SSN" />
      <MaskedInput mask="9999 9999 9999 9999" label="Credit Card" placeholder="Enter card number" />
      <MaskedInput mask="99/99/9999" label="Birth Date" placeholder="MM/DD/YYYY" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
      <MaskedInput
        mask="(999) 999-9999"
        label="Phone Number"
        placeholder="Enter your phone number"
        leftIconAction={{
          iconName: 'phone-solid',
          iconSize: 'sm',
        }}
      />
      <MaskedInput
        mask="999-99-9999"
        label="Social Security Number"
        placeholder="Enter your SSN"
        leftIconAction={{
          iconName: 'lock-solid',
          iconSize: 'sm',
        }}
      />
      <MaskedInput
        mask="99999"
        label="ZIP Code"
        placeholder="Enter ZIP code"
        leftIconAction={{
          iconName: 'map-pin-solid',
          iconSize: 'sm',
        }}
      />
    </div>
  ),
};
