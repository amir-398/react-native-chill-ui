import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { Icon } from '../src/components/icon';
import UiPresentation from './storybook/UiPresentation';

const meta: Meta<typeof Icon> = {
  argTypes: {
    as: {
      control: 'select',
      description: 'Component to use when pressable',
      options: ['pressable', 'touchable-opacity', 'ripple-pressable'],
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes (only used with NativeWind)',
    },
    color: {
      control: 'color',
      description: 'The color of the icon',
    },
    hasPressEffect: {
      control: 'boolean',
      description: 'Whether to show press effect when pressed',
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
    onPress: {
      action: 'onPress',
      description: 'Callback function when icon is pressed',
    },
    pressEffectSize: {
      control: 'select',
      description: 'Size of the press effect padding',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    pressEffectStyle: {
      control: 'object',
      description: 'Custom styles for the press effect (only works with NativeWind and Hybrid versions)',
    },
    size: {
      control: 'select',
      description: 'The size of the icon',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    style: {
      control: 'object',
      description: 'Additional inline styles',
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

export const PressableVariants: Story = {
  render: () => (
    <UiPresentation>
      <Icon name="bell-solid" onPress={action('pressable')} as="pressable" />
      <Icon name="bell-solid" onPress={action('touchable-opacity')} as="touchable-opacity" />
      <Icon name="bell-solid" onPress={action('ripple-pressable')} as="ripple-pressable" />
    </UiPresentation>
  ),
};

export const PressEffectSizes: Story = {
  render: () => (
    <UiPresentation>
      <Icon name="heart-solid" onPress={action('small')} pressEffectSize="sm" />
      <Icon name="heart-solid" onPress={action('medium')} pressEffectSize="md" />
      <Icon name="heart-solid" onPress={action('large')} pressEffectSize="lg" />
    </UiPresentation>
  ),
};

export const WithoutPressEffect: Story = {
  args: {
    color: '#000',
    hasPressEffect: false,
    name: 'bell-solid',
    onPress: action('onPress'),
    size: 'md',
  },
};
