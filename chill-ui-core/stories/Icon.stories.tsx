import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import Icon from '../src/components/icon/Icon';
import UiPresentation from './storybook/UiPresentation';

const meta: Meta<typeof Icon> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'The class name of the icon',
    },
    color: {
      control: 'color',
      description: 'The color of the icon',
    },
    hasPressEffect: {
      control: 'boolean',
      description: 'Adds padding and press effect to the icon',
    },
    name: {
      control: 'select',
      description: 'The name of the icon',
      options: [
        'angle-down-solid',
        'angle-left-solid',
        'angle-right-solid',
        'angle-up-solid',
        'angles-up-solid',
        'arrow-left-solid',
        'ban-solid',
        'bank-solid',
        'bell-solid',
        'xmark-solid',
      ],
    },
    padding: {
      control: 'select',
      description: 'The padding of the icon',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    pressEffectClassName: {
      control: 'text',
      description: 'The class name of the press effect',
    },
    pressEffectSize: {
      control: 'select',
      description: 'The size of the press effect',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    size: {
      control: 'select',
      description: 'The size of the icon',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
  },
  component: Icon,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'UI/Icon',
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    color: '#000',
    name: 'bell-solid',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    color: '#000',
    name: 'bell-solid',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    color: '#000',
    name: 'bell-solid',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    color: '#000',
    name: 'bell-solid',
    size: 'xl',
  },
};

export const Clickable: Story = {
  args: {
    color: '#000',
    hasPressEffect: true,
    name: 'bell-solid',
    onPress: action('onPress'),
    size: 'md',
  },
};

export const DifferentColors: Story = {
  args: {
    color: '#FF0000',
    name: 'bell-solid',
    size: 'md',
  },
};

export const DifferentIcons: Story = {
  render: () => (
    <UiPresentation>
      <Icon name="angle-down-solid" color="#000" size="md" />
      <Icon name="angle-left-solid" color="#000" size="md" />
      <Icon name="angle-right-solid" color="#000" size="md" />
      <Icon name="angle-up-solid" color="#000" size="md" />
      <Icon name="angles-up-solid" color="#000" size="md" />
    </UiPresentation>
  ),
};
