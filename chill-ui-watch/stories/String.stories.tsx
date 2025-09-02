import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import String from '../src/components/string/String';
import UiPresentation from './storybook/UiPresentation';

const meta: Meta<typeof String> = {
  argTypes: {
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
    Story => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
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
