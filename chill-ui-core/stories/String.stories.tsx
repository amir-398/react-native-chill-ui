import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { String } from '../src/components/string';
import UiPresentation from './storybook/UiPresentation';

const meta: Meta<typeof String> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    color: {
      control: 'color',
      description: 'Custom color override',
    },
    colorVariant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'error',
        'danger',
        'info',
        'dark',
        'light',
        'white',
        'disabled',
        'inverted',
        'muted',
        'neutral',
      ],
    },
    font: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    numberOfLines: {
      control: 'number',
    },
    position: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
    },
    style: {
      control: 'object',
      description: 'Inline styles',
    },
    useFastText: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      description: 'The variant of the string',
      options: [
        'body-1',
        'body-2',
        'body-3',
        'body-sm',
        'body-xs',
        'title-1',
        'title-2',
        'title-3',
        'title-4',
        'title-5',
        'title-6',
        'title-7',
        'title-8',
      ],
    },
    weight: {
      control: 'select',
      options: ['regular', 'light', 'medium', 'semiBold', 'bold', 'extraLight', 'extraBold', 'thin', 'italic'],
    },
  },
  component: String,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  tags: ['autodocs'],
  title: 'UI/String',
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
    weight: 'regular',
  },
};

export const Clickable: Story = {
  args: {
    children: 'Click me!',
    colorVariant: 'primary',
    font: 'primary',
    onPress: action('onPress'),
    position: 'left',
    size: 'md',
    useFastText: true,
    variant: 'body-1',
    weight: 'regular',
  },
};

export const ClickableTitle: Story = {
  args: {
    children: 'Clickable Title',
    colorVariant: 'primary',
    font: 'primary',
    onPress: action('onPress'),
    position: 'left',
    size: 'xl',
    useFastText: true,
    variant: 'title-1',
    weight: 'bold',
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
    weight: 'light',
  },
};

export const BoldText: Story = {
  args: {
    children: 'Bold Weight Text',
    colorVariant: 'primary',
    size: 'lg',
    variant: 'body-1',
    weight: 'bold',
  },
};

export const ItalicText: Story = {
  args: {
    children: 'Italic Weight Text',
    colorVariant: 'primary',
    size: 'lg',
    variant: 'body-1',
    weight: 'italic',
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
