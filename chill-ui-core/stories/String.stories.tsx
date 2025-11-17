import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { fn } from 'storybook/test';

import UiPresentation from './storybook/UiPresentation';
import { StringTw as String } from '../src/components/string';

const meta: Meta<typeof String> = {
  args: {
    colorVariant: 'primary',
  },
  argTypes: {
    colorVariant: {
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    position: {
      table: {
        defaultValue: {
          summary: 'left',
        },
      },
    },
    size: {
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    useFastText: {
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    variant: {
      table: {
        defaultValue: {
          summary: 'body-1',
        },
      },
    },
  },
  component: String,
  decorators: [
    (Story: any) => (
      <UiPresentation className="items-center">
        <Story />
      </UiPresentation>
    ),
  ],
  tags: ['autodocs'],
  title: 'CONTENT/String',
};

export default meta;
type Story = StoryObj<typeof String>;

export const Default: Story = {
  args: {
    children: 'Default Text',
    colorVariant: 'primary',
    font: 'primary',
    position: 'left',
    size: 'md',
    useFastText: true,
    variant: 'body-1',
  },
};

export const Clickable: Story = {
  args: {
    children: 'Click me!',
    colorVariant: 'primary',
    font: 'primary',
    onPress: fn(),
    position: 'left',
    size: 'md',
    useFastText: true,
    variant: 'body-1',
  },
};

export const ClickableTitle: Story = {
  args: {
    children: 'Clickable Title',
    colorVariant: 'primary',
    font: 'primary',
    onPress: fn(),
    position: 'left',
    size: 'xl',
    useFastText: true,
    variant: 'title-1',
  },
};

// Color Variant Examples
export const SuccessText: Story = {
  args: {
    children: 'Success Message',
    colorVariant: 'success',
    size: 'md',
    variant: 'body-1',
  },
};

export const ErrorText: Story = {
  args: {
    children: 'Error Message',
    colorVariant: 'error',
    size: 'md',
    variant: 'body-1',
  },
};

export const WarningText: Story = {
  args: {
    children: 'Warning Message',
    colorVariant: 'warning',
    size: 'md',
    variant: 'body-1',
  },
};

// Weight Examples
export const LightText: Story = {
  args: {
    children: 'Light Weight Text',
    colorVariant: 'primary',
    size: 'lg',
    variant: 'body-1',
  },
};

export const BoldText: Story = {
  args: {
    children: 'Bold Weight Text',
    colorVariant: 'primary',
    size: 'lg',
    variant: 'body-1',
  },
};

export const ItalicText: Story = {
  args: {
    children: 'Italic Weight Text',
    colorVariant: 'primary',
    size: 'lg',
    variant: 'body-1',
  },
};

// Size Examples
export const ExtraSmall: Story = {
  args: {
    children: 'Extra Small Text',
    colorVariant: 'primary',
    size: 'xs',
    variant: 'body-xs',
  },
};

export const ExtraLarge: Story = {
  args: {
    children: 'Extra Large Text',
    colorVariant: 'primary',
    size: '4xl',
    variant: 'title-1',
  },
};

// Position Examples
export const CenterText: Story = {
  args: {
    children: 'Centered Text',
    colorVariant: 'primary',
    position: 'center',
    size: 'lg',
    variant: 'body-1',
  },
};

export const RightText: Story = {
  args: {
    children: 'Right Aligned Text',
    colorVariant: 'primary',
    position: 'right',
    size: 'lg',
    variant: 'body-1',
  },
};

// Custom Color Example
export const CustomColor: Story = {
  args: {
    children: 'Custom Color Text',
    color: '#FF6B6B',
    size: 'lg',
    variant: 'body-1',
  },
};

// Custom Style Example
export const CustomStyle: Story = {
  args: {
    children: 'Custom Styled Text',
    colorVariant: 'primary',
    size: 'lg',
    style: {
      letterSpacing: 2,
      textDecorationLine: 'underline',
    },
    variant: 'body-1',
  },
};

// Number of Lines Example
export const TruncatedText: Story = {
  args: {
    children:
      'This is a very long text that should be truncated after two lines to demonstrate the numberOfLines prop functionality.',
    colorVariant: 'primary',
    numberOfLines: 2,
    size: 'md',
    variant: 'body-1',
  },
};
