import type { Meta, StoryObj } from '@storybook/react';

import UiPresentation from './storybook';
import { Input } from '../src/components/input';

const meta: Meta<typeof Input> = {
  argTypes: {
    // Basic props
    editable: { control: 'boolean', description: 'Whether the input is editable' },
    maxLength: { control: 'number', description: 'Maximum length of the input' },
    multiline: { control: 'boolean', description: 'Whether the input is multiline' },
    placeholder: { control: 'text', description: 'The placeholder text' },
    value: { control: 'text', description: 'The value of the input' },

    // Label and error
    allow: {
      control: 'select',
      description: 'Input validation type',
      options: ['all', 'numbers', 'letters', 'lettersWithoutSpecialCharacters'],
    },
    customRegex: { control: 'text', description: 'Custom regex pattern for validation' },
    errorClassName: { control: 'text', description: 'Custom class for error message (NativeWind only)' },
    errorIconName: { control: 'text', description: 'Icon name for error state' },
    errorMessage: { control: 'text', description: 'Error message to display' },
    hasError: { control: 'boolean', description: 'Whether the input has an error' },
    label: { control: 'text', description: 'Label text above the input' },
    labelStringProps: { control: 'object', description: 'Props for the label String component' },

    // Icons
    clearIconProps: { control: 'object', description: 'Props for the clear icon component' },
    eyeIconProps: { control: 'object', description: 'Props for the eye/eye-slash icon component' },
    hasClearIcon: { control: 'boolean', description: 'Whether to show clear icon' },
    inputClassName: { control: 'text', description: 'Custom class for the input field (NativeWind only)' },
    leftIconAction: {
      control: 'object',
      description: 'Configuration for left icon action',
      table: {
        type: {
          summary:
            '{ iconName?: string, iconColor?: string, iconSize?: string, customIcon?: ReactNode, iconPress?: () => void }',
        },
      },
    },
    rightIconAction: {
      control: 'object',
      description: 'Configuration for right icon action',
      table: {
        type: {
          summary:
            '{ iconName?: string, iconColor?: string, iconSize?: string, customIcon?: ReactNode, iconPress?: () => void }',
        },
      },
    },

    // Security
    hasSecureTextEntry: { control: 'boolean', description: 'Whether the input is a password field' },

    // Interaction
    clickableAs: {
      control: 'select',
      description: 'Animation type when input is pressed',
      options: ['scale', undefined],
    },
    onPress: { action: 'pressed', description: 'Function called when input is pressed' },

    // Styling
    className: { control: 'text', description: 'Custom class for the input container (NativeWind only)' },
    font: { control: 'text', description: 'Font family variant for the input text (StyleSheet only)' },
    isDisabled: { control: 'boolean', description: 'Whether input is disabled' },
    isStretchable: { control: 'boolean', description: 'Whether input should stretch to full width' },
    size: {
      control: 'select',
      description: 'Size of the input',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },

    // Features
    errorStringProps: { control: 'object', description: 'Props for the error message String component' },
    lengthStringProps: { control: 'object', description: 'Props for the character count String component' },
    showLength: { control: 'boolean', description: 'Whether to show character count' },

    // Refs
    wrapperRef: { control: false, description: 'Reference to the input container wrapper' },
  },
  component: Input,
  decorators: [
    (Story: any) => (
      <UiPresentation className="items-start justify-start px-3">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/Inputs/TextInput',
};

export default meta;
type Story = StoryObj<typeof Input>;

// Basic Inputs
export const Default: Story = {
  args: {
    placeholder: 'Enter your text',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    value: 'John Doe',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
  },
};

// Password Input
export const Password: Story = {
  args: {
    hasSecureTextEntry: true,
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

// Icon Variations
export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    leftIconAction: {
      iconName: 'magnifying-glass-solid',
    },
    placeholder: 'Search...',
  },
};

export const WithClearIcon: Story = {
  args: {
    hasClearIcon: true,
    label: 'Clearable Input',
    placeholder: 'Type something...',
    value: 'Clearable text',
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Search with Clear',
    leftIconAction: {
      iconName: 'magnifying-glass-solid',
    },
    placeholder: 'Search with clear option',
    rightIconAction: {
      iconName: 'xmark-solid',
    },
    value: 'Search text',
  },
};

// Error States
export const WithError: Story = {
  args: {
    errorIconName: 'exclamation-triangle-solid',
    errorMessage: 'Please enter a valid email address',
    hasError: true,
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

// Features
export const WithCharacterCount: Story = {
  args: {
    label: 'Bio',
    maxLength: 100,
    placeholder: 'Tell us about yourself',
    showLength: true,
    value: 'This is a sample bio text',
  },
};

export const Multiline: Story = {
  args: {
    isStretchable: true,
    label: 'Message',
    multiline: true,
    placeholder: 'Enter your message',
    value: 'This is a multiline input that can stretch to full width.',
  },
};

// Interactive Inputs
export const Clickable: Story = {
  args: {
    clickableAs: 'scale',
    editable: false,
    label: 'Clickable Input',
    onPress: () => {
      // eslint-disable-next-line no-alert
      alert('Input clicked!');
    },
    placeholder: 'Click me (scale effect)',
  },
};

// Size Variations
export const ExtraSmall: Story = {
  args: {
    label: 'Extra Small',
    placeholder: 'Extra small input',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    placeholder: 'Small input',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium',
    placeholder: 'Medium input',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    placeholder: 'Large input',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    label: 'Extra Large',
    placeholder: 'Extra large input',
    size: 'xl',
  },
};

// Validation Examples
export const NumbersOnly: Story = {
  args: {
    allow: 'numbers',
    label: 'Phone Number',
    placeholder: 'Enter numbers only',
  },
};

export const LettersOnly: Story = {
  args: {
    allow: 'letters',
    label: 'First Name',
    placeholder: 'Enter letters only',
  },
};

export const Alphanumeric: Story = {
  args: {
    allow: 'lettersWithoutSpecialCharacters',
    label: 'Username',
    placeholder: 'Enter alphanumeric characters',
  },
};

export const CustomValidation: Story = {
  args: {
    customRegex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    label: 'Email',
    placeholder: 'Enter a valid email',
  },
};

// Advanced Examples
export const WithCustomIconProps: Story = {
  args: {
    eyeIconProps: {
      color: '#007AFF',
      size: 'lg',
    },
    hasSecureTextEntry: true,
    label: 'Password with Custom Eye Icon',
    placeholder: 'Enter your password',
  },
};

export const WithCustomClearIconProps: Story = {
  args: {
    clearIconProps: {
      color: '#FF3B30',
      size: 'lg',
    },
    hasClearIcon: true,
    label: 'Input with Custom Clear Icon',
    placeholder: 'Type something...',
    value: 'Clearable text',
  },
};

export const WithCustomStringProps: Story = {
  args: {
    errorStringProps: {
      colorVariant: 'error',
      size: 'sm',
    },
    label: 'Input with Custom Label Styling',
    labelStringProps: {
      colorVariant: 'primary',
      size: 'lg',
    },
    lengthStringProps: {
      colorVariant: 'secondary',
      size: 'xs',
    },
    maxLength: 50,
    placeholder: 'Enter your text',
    showLength: true,
    value: 'Sample text',
  },
};
