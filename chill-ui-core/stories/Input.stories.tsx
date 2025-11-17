import type { StoryObj } from '@storybook/react-native-web-vite';

import { fn } from 'storybook/test';

import UiPresentation from './storybook';
import { Input } from '../src/components/input';

const meta = {
  args: {
    allow: 'all',
    clickableAs: 'pressable',
    editable: true,
    font: 'primaryRegular',
    hasClearIcon: true,
    size: 'md',
  },
  argTypes: {
    allow: {
      table: {
        defaultValue: {
          summary: 'all',
        },
      },
    },
    clickableAs: {
      table: {
        defaultValue: {
          summary: 'pressable',
        },
      },
    },
    editable: {
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    font: {
      control: {
        type: 'select',
      },
      description: 'Font variant for the input',
      options: [
        'primaryBold',
        'primaryExtraBold',
        'primaryExtraLight',
        'primaryItalic',
        'primaryLight',
        'primaryMedium',
        'primaryRegular',
        'primarySemiBold',
        'primaryThin',
        'secondaryBold',
        'secondaryExtraBold',
        'secondaryExtraLight',
        'secondaryItalic',
        'secondaryLight',
        'secondaryMedium',
        'secondaryRegular',
        'secondarySemiBold',
        'secondaryThin',
        'tertiaryBold',
        'tertiaryExtraBold',
        'tertiaryExtraLight',
        'tertiaryItalic',
        'tertiaryLight',
        'tertiaryMedium',
        'tertiaryRegular',
        'tertiarySemiBold',
        'tertiaryThin',
      ],
      table: {
        defaultValue: {
          summary: 'primaryRegular',
        },
      },
    },
    hasClearIcon: {
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    placeholderTextColor: {
      table: {
        defaultValue: {
          summary: '#BDBDBD',
        },
      },
    },
    size: {
      control: {
        type: 'select',
      },
      description: 'Input size variant',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
  },
  component: Input,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Forms/Inputs',
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
    onPress: fn(),
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
