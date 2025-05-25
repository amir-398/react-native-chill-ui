import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import String from './String';
import UiPresentation from '../storybook/UiPresentation';

const meta: Meta<typeof String> = {
  argTypes: {
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'light',
        'tertiary',
        'danger',
        'dark',
        'error',
        'info',
        'success',
        'warning',
        'white',
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
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
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
        'body-4',
        'body-xl',
        'subtitle-1',
        'subtitle-2',
        'subtitle-3',
        'subtitle-4',
        'title-1',
        'title-2',
        'title-3',
        'title-4',
      ],
    },
    weight: {
      control: 'select',
      options: ['regular', 'bold', 'light', 'medium', 'semiBold'],
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
    color: 'primary',
    font: 'primary',
    position: 'left',
    size: 'md',
    useFastText: true,
    variant: 'body-1',
    weight: 'regular',
  },
};

export const title1: Story = {
  args: {
    children: 'title-1 Text',
    color: 'primary',
    font: 'primary',
    position: 'left',
    size: 'xl',
    useFastText: true,
    variant: 'title-1',
    weight: 'bold',
  },
};

export const title2: Story = {
  args: {
    children: 'title-2 Text',
    color: 'primary',
    font: 'primary',
    position: 'left',
    size: 'xl',
    useFastText: true,
    variant: 'title-2',
    weight: 'bold',
  },
};

export const title3: Story = {
  args: {
    children: 'title-3 Text',
    color: 'primary',
    font: 'primary',
    position: 'left',
    size: 'xl',
    useFastText: true,
    variant: 'title-3',
    weight: 'bold',
  },
};

export const title4: Story = {
  args: {
    children: 'title-4 Text',
    color: 'primary',
    font: 'primary',
    position: 'left',
    size: 'xl',
    useFastText: true,
    variant: 'title-4',
    weight: 'bold',
  },
};

export const body1: Story = {
  args: {
    children: 'body-1 Text',
    color: 'primary',
    font: 'primary',
    position: 'left',
    useFastText: true,
    variant: 'body-1',
    weight: 'regular',
  },
};

export const body2: Story = {
  args: {
    children: 'body-2 Text',
    color: 'primary',
    font: 'primary',
    position: 'left',

    useFastText: true,
    variant: 'body-2',
    weight: 'regular',
  },
};

export const body3: Story = {
  args: {
    children: 'body-3 Text',
    color: 'primary',
    font: 'primary',
    position: 'left',
    useFastText: true,
    variant: 'body-3',
    weight: 'regular',
  },
};

export const body4: Story = {
  args: {
    children: 'body-4 Text',
    color: 'primary',
    font: 'primary',
    position: 'left',
    useFastText: true,
    variant: 'body-4',
    weight: 'regular',
  },
};

export const subtitle1: Story = {
  args: {
    children: 'subtitle-1 Text',
    color: 'primary',
    position: 'left',
    useFastText: true,
    variant: 'subtitle-1',
    weight: 'bold',
  },
};

export const subtitle2: Story = {
  args: {
    children: 'subtitle-2 Text',
    color: 'primary',
    position: 'left',
    useFastText: true,
    variant: 'subtitle-2',
    weight: 'bold',
  },
};

export const subtitle3: Story = {
  args: {
    children: 'subtitle-3 Text',
    color: 'primary',
    position: 'left',
    useFastText: true,
    variant: 'subtitle-3',
    weight: 'bold',
  },
};

export const subtitle4: Story = {
  args: {
    children: 'subtitle-4 Text',
    color: 'primary',
    position: 'left',
    useFastText: true,
    variant: 'subtitle-4',
    weight: 'bold',
  },
};

export const Clickable: Story = {
  args: {
    children: 'Click me!',
    color: 'primary',
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
    color: 'primary',
    font: 'primary',
    onPress: action('onPress'),
    position: 'left',
    size: 'xl',
    useFastText: true,
    variant: 'title-1',
    weight: 'bold',
  },
};
