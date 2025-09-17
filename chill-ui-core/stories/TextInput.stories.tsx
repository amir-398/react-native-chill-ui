import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../src/components';
import UiPresentation from './storybook';
import TextInput from '../src/components/inputs/Input';

const meta: Meta<typeof TextInput> = {
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
      description: 'Allow only numbers, letters, or letters without special characters',
      options: ['numbers', 'letters', 'lettersWithoutSpecialCharacters', 'all'],
    },
    errorClassName: { control: 'text', description: 'Custom class for error message' },
    errorIconName: { control: 'text', description: 'Icon name for error state' },
    errorMessage: { control: 'text', description: 'Error message to display' },
    hasError: { control: 'boolean', description: 'Whether the input has an error' },
    label: { control: 'text', description: 'Label text above the input' },
    labelClassName: { control: 'text', description: 'Custom class for the label' },

    // Icons
    hasClearIcon: { control: 'boolean', description: 'Whether to show clear icon' },
    // Icon actions
    inputClassName: { control: 'text', description: 'Custom class for the input' },
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
      description: 'Type of pressable effect to use',
      options: ['scale', 'pressable'],
    },
    onPress: { action: 'pressed', description: 'Function called when input is pressed' },

    // Styling
    className: { control: 'text', description: 'Custom class for the input' },
    size: {
      control: 'select',
      description: 'Size of the input',
      options: ['xs', 'sm', 'md', 'lg'],
    },

    // Features
    showLength: { control: 'boolean', description: 'Whether to show character count' },
  },
  component: TextInput,
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
type Story = StoryObj<typeof TextInput>;

// Basic Inputs
export const Default: Story = {
  args: {
    placeholder: 'Enter your text',
    placeholderTextColor: 'grey',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Enter your text',
    value: 'Existing text',
  },
};

export const Disabled: Story = {
  args: {
    editable: false,
    placeholder: 'Disabled input',
  },
};

// Password Input
export const Password: Story = {
  args: {
    hasSecureTextEntry: true,
    placeholder: 'Enter your password',
  },
};

// Icon Variations
export const WithLeftIcon: Story = {
  args: {
    leftIconAction: {
      iconName: 'user-solid',
    },
    placeholder: 'Enter your text',
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Enter your text',
    rightIconAction: {
      iconName: 'user-solid',
    },
  },
};

export const WithRightAndLeftIcon: Story = {
  args: {
    leftIconAction: {
      iconName: 'user-solid',
    },
    placeholder: 'Enter your text',
    rightIconAction: {
      iconName: 'user-solid',
    },
  },
};

export const WithCustomRightAndLeftIcon: Story = {
  args: {
    leftIconAction: {
      customIcon: <Icon name="angle-down-solid" />,
    },
    rightIconAction: {
      customIcon: <Icon name="angle-up-solid" />,
    },
  },
};

// Error States
export const WithError: Story = {
  args: {
    errorIconName: 'warning-solid',
    errorMessage: 'Text error',
    hasError: true,
    placeholder: 'Enter your text',
  },
};

// Features
export const WithLength: Story = {
  args: {
    maxLength: 30,
    placeholder: 'Enter your text',
    showLength: true,
    value: 'Texte existant',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Enter your text',
    placeholder: 'Enter your text',
  },
};

// Interactive Inputs
export const ClickableAsScale: Story = {
  args: {
    clickableAs: 'scale',
    editable: false,
    onPress: () => {
      // eslint-disable-next-line no-alert
      alert('input clicked');
    },
    placeholder: 'Click me (scale effect)',
  },
};

export const ClickableAsPressable: Story = {
  args: {
    clickableAs: 'pressable',
    editable: false,
    onPress: () => {
      // eslint-disable-next-line no-alert
      alert('input clicked');
    },
    placeholder: 'Click me (pressable effect)',
  },
};

// Size Variations
export const ExtraSmall: Story = {
  args: {
    placeholder: 'Extra small input',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small input',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Medium input',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large input',
    size: 'lg',
  },
};

export const MultilineStretchable: Story = {
  args: {
    isStretchable: true,
    multiline: true,
    placeholder: 'Medium input',
    size: 'md',
    value: 'Medium input',
  },
};

export const MultilineNotStretchable: Story = {
  args: {
    isStretchable: false,
    multiline: true,
    placeholder: 'Medium input',
    size: 'sm',
    value: 'Medium input',
  },
};

export const AllowNumbers: Story = {
  args: {
    allow: 'numbers',
    placeholder: 'Enter your text',
  },
};

export const AllowLetters: Story = {
  args: {
    allow: 'letters',
    placeholder: 'Enter your text',
  },
};

export const AllowLettersWithoutSpecialCharacters: Story = {
  args: {
    allow: 'lettersWithoutSpecialCharacters',
    placeholder: 'Enter your text',
  },
};
