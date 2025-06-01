import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import UiPresentation from './storybook/UiPresentation';
import ButtonIcon from '../src/components/buttonIcon/buttonIcon';

const meta: Meta<typeof ButtonIcon> = {
  argTypes: {
    accessibilityLabel: {
      control: 'text',
      description: 'The accessibility label of the button',
    },
    iconColor: {
      control: 'color',
      description: 'The color of the icon',
    },
    iconColorPressed: {
      control: 'color',
      description: 'The color of the icon when pressed',
    },
    iconName: {
      control: 'select',
      description: 'The name of the icon to display',
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
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    onPress: {
      action: 'pressed',
      description: 'Function called when the button is pressed',
    },
    size: {
      control: 'select',
      description: 'The size of the icon',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
  },
  component: ButtonIcon,
  decorators: [
    Story => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/ButtonIcon',
};

export default meta;

type Story = StoryObj<typeof ButtonIcon>;

export const Default: Story = {
  args: {
    iconColor: '#000000',
    iconColorPressed: '#666666',
    iconName: 'bell-solid',
    isDisabled: false,
    isLoading: false,
    onPress: action('onPress'),
    size: 'md',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    iconColor: '#FF0000',
    iconColorPressed: '#990000',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};
