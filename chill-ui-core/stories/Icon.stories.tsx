import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { action } from 'storybook/actions';

import UiPresentation from './storybook/UiPresentation';
import { Icon, IconProvider } from '../src/components/icon';

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
        'angle-down-solid',
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
      <UiPresentation className="items-center">
        <Story />
      </UiPresentation>
    ),
  ],
  subcomponents: {
    IconProvider,
  },
  title: 'DATA DISPLAY/Icon',
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    color: '#000',
    name: 'angle-down-solid',
    size: 'md',
  },
};

export const WithPorivider: Story = {
  render: (_args: any) => {
    const ICONS = {
      'agenda-solid': {
        path: [
          'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z',
        ],
        viewBox: '0 0 512 512',
      },
      'xmark-solid': {
        path: [
          'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z',
        ],
        viewBox: '0 0 384 512',
      },
    } as const;

    type TIcons = typeof ICONS;

    return (
      <IconProvider icons={ICONS}>
        <Icon<TIcons> name="xmark-solid" onPress={action('pressable')} as="pressable" />
      </IconProvider>
    );
  },
};

export const Small: Story = {
  args: {
    color: '#000',
    name: 'angle-down-solid',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    color: '#000',
    name: 'angle-down-solid',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    color: '#000',
    name: 'angle-down-solid',
    size: 'xl',
  },
};

export const DifferentColors: Story = {
  args: {
    color: '#FF0000',
    name: 'angle-down-solid',
    size: 'md',
  },
};

export const PressableVariants: Story = {
  render: () => (
    <UiPresentation>
      <Icon name="angle-down-solid" onPress={action('pressable')} as="pressable" />
      <Icon name="angle-down-solid" onPress={action('touchable-opacity')} as="touchable-opacity" />
      <Icon name="angle-down-solid" onPress={action('ripple-pressable')} as="ripple-pressable" />
    </UiPresentation>
  ),
};

export const WithoutPressEffect: Story = {
  args: {
    color: '#000',
    hasPressEffect: false,
    name: 'angle-down-solid',
    onPress: action('onPress'),
    size: 'md',
  },
};
