import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import UiPresentation from './storybook';
import { Avatar, Box } from '../src/components';

const meta: Meta<typeof Avatar> = {
  argTypes: {
    as: {
      control: 'select',
      description: 'Type of pressable component to use when onPress is provided',
      options: ['pressable', 'touchable-opacity', 'ripple-pressable'],
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes (used with NativeWind)',
    },
    color: {
      control: 'color',
      description: 'Custom background color',
    },
    data: {
      control: 'object',
      description: 'User data containing firstname, lastname, and image_url',
    },
    onPress: {
      action: 'pressed',
      description: 'Callback when avatar is pressed',
    },
    size: {
      control: 'select',
      description: 'Size of the avatar',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    stringProps: {
      control: 'object',
      description: 'Props for the String component',
    },
    style: {
      control: 'object',
      description: 'Inline styles',
    },
    variant: {
      control: 'radio',
      description: 'Shape variant of the avatar',
      options: ['circle', 'square'],
    },
  },
  component: Avatar,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'components/Avatar',
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const defaultUser = {
  firstname: 'John',
  lastname: 'Doe',
};

const userWithImage = {
  firstname: 'Jane',
  image_url: 'https://i.pravatar.cc/300',
  lastname: 'Smith',
};

// Basic Examples
export const Default: Story = {
  args: {
    data: defaultUser,
  },
  render: (args: any) => (
    <Box className="gap-4">
      <Avatar {...args} />
    </Box>
  ),
};

export const WithImage: Story = {
  args: {
    data: userWithImage,
  },
};

export const Clickable: Story = {
  args: {
    data: defaultUser,
    onPress: action('onPress'),
  },
};

// Size Variants
export const ExtraSmall: Story = {
  args: {
    data: defaultUser,
    size: '2xs',
  },
};

export const Small: Story = {
  args: {
    data: defaultUser,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    data: defaultUser,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    data: defaultUser,
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    data: defaultUser,
    size: '2xl',
  },
};

// Shape Variants
export const Square: Story = {
  args: {
    data: defaultUser,
    variant: 'square',
  },
};

export const Circle: Story = {
  args: {
    data: defaultUser,
    variant: 'circle',
  },
};

// Special Cases
export const SingleInitial: Story = {
  args: {
    data: {
      firstname: 'John',
    },
  },
};

export const CustomStyle: Story = {
  args: {
    className: 'bg-secondary border-2 border-primary',
    data: defaultUser,
  },
};

export const LargeWithImage: Story = {
  args: {
    data: userWithImage,
    size: '2xl',
  },
};

// Pressable Type Examples
export const RipplePressableAvatar: Story = {
  args: {
    as: 'ripple-pressable',
    data: defaultUser,
    onPress: action('onPress'),
    size: 'lg',
  },
};

export const TouchableOpacityAvatar: Story = {
  args: {
    as: 'touchable-opacity',
    data: defaultUser,
    onPress: action('onPress'),
    size: 'lg',
  },
};

// Custom Color Examples
export const CustomColor: Story = {
  args: {
    color: '#FF6B6B',
    data: defaultUser,
    size: 'lg',
  },
};

export const CustomColorWithImage: Story = {
  args: {
    color: '#4ECDC4',
    data: userWithImage,
    size: 'lg',
  },
};

export const AvatarGrid: Story = {
  decorators: [
    (StoryComponent: any) => (
      <UiPresentation>
        <Box className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <StoryComponent
              key={index}
              args={{
                data: {
                  firstname: `User`,
                  image_url: index % 2 === 0 ? 'https://i.pravatar.cc/300' : undefined,
                  lastname: `${index + 1}`,
                },
                size: (['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const)[index],
              }}
            />
          ))}
        </Box>
      </UiPresentation>
    ),
  ],
};
