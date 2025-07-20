import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import UiPresentation from './storybook/UiPresentation';
import ButtonIcon from '../src/components/buttonIcon/buttonIcon';

const meta: Meta<typeof ButtonIcon> = {
  argTypes: {
    as: {
      control: 'select',
      description: 'Type of touchable component to use',
      options: ['TouchableOpacity', 'Pressable', 'RipplePressable'],
    },
    iconColor: {
      control: 'color',
      description: 'Color of the icon',
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
        'gear-solid',
        'heart-solid',
        'home-solid',
        'star-solid',
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
    as: 'RipplePressable',
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

export const ColoredIcons: Story = {
  args: {
    ...Default.args,
    iconColor: '#007AFF',
  },
  parameters: {
    docs: {
      description: {
        story: 'ButtonIcon with custom icon color',
      },
    },
  },
};

export const IconColorVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different icon colors for various use cases',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      <ButtonIcon iconName="bell-solid" iconColor="#007AFF" onPress={action('Blue icon pressed')} size="md" />
      <ButtonIcon iconName="home-solid" iconColor="#34C759" onPress={action('Green icon pressed')} size="md" />
      <ButtonIcon iconName="gear-solid" iconColor="#FF3B30" onPress={action('Red icon pressed')} size="md" />
      <ButtonIcon iconName="star-solid" iconColor="#FF9500" onPress={action('Orange icon pressed')} size="md" />
      <ButtonIcon iconName="heart-solid" iconColor="#AF52DE" onPress={action('Purple icon pressed')} size="md" />
    </div>
  ),
};

export const TouchableOpacity: Story = {
  args: {
    ...Default.args,
    as: 'TouchableOpacity',
  },
  parameters: {
    docs: {
      description: {
        story: 'ButtonIcon using TouchableOpacity with opacity effect on press',
      },
    },
  },
};

export const Pressable: Story = {
  args: {
    ...Default.args,
    as: 'Pressable',
  },
  parameters: {
    docs: {
      description: {
        story: 'ButtonIcon using Pressable with native Android ripple effect',
      },
    },
  },
};

export const RipplePressable: Story = {
  args: {
    ...Default.args,
    as: 'RipplePressable',
  },
  parameters: {
    docs: {
      description: {
        story: 'ButtonIcon using RipplePressable with custom ripple animation',
      },
    },
  },
};

export const TouchableComparison: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different touchable components - try pressing each button to see the different effects',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      <ButtonIcon as="TouchableOpacity" iconName="bell-solid" onPress={action('TouchableOpacity pressed')} size="md" />
      <ButtonIcon as="Pressable" iconName="bell-solid" onPress={action('Pressable pressed')} size="md" />
      <ButtonIcon as="RipplePressable" iconName="bell-solid" onPress={action('RipplePressable pressed')} size="md" />
    </div>
  ),
};
