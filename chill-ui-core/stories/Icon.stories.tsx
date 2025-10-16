import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { action } from 'storybook/actions';

import { Icon } from '../src/components/icon';
import UiPresentation from './storybook/UiPresentation';

const meta: Meta<typeof Icon> = {
  args: {
    color: '#000',
    hasPressEffect: true,
    size: 'md',
  },
  argTypes: {
    color: {
      table: {
        defaultValue: {
          summary: '#000',
        },
      },
    },
    hasPressEffect: {
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    name: {
      control: 'select',
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
    },
    pressEffectSize: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    size: {
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
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
