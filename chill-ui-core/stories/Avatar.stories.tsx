import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { fn } from 'storybook/test';

import UiPresentation from './storybook';
import { AvatarTw as Avatar, Box } from '../src/components';

const meta: Meta<typeof Avatar> = {
  args: {
    as: 'pressable',
    size: 'md',
    variant: 'circle',
  },
  argTypes: {
    as: {
      table: {
        defaultValue: {
          summary: 'pressable',
        },
      },
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    variant: {
      control: 'select',
      options: ['circle', 'square'],
      table: {
        defaultValue: {
          summary: 'circle',
        },
      },
    },
  },
  component: Avatar,
  decorators: [
    (Story: any) => (
      <UiPresentation className="items-center">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'DATA DISPLAY/Avatar',
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
  render: (args: any) => <Avatar {...args} />,
};

export const WithImage: Story = {
  args: {
    data: userWithImage,
  },
};

export const Clickable: Story = {
  args: {
    data: defaultUser,
    onPress: fn(),
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
    onPress: fn(),
    size: 'lg',
  },
};

export const TouchableOpacityAvatar: Story = {
  args: {
    as: 'touchable-opacity',
    data: defaultUser,
    onPress: fn(),
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
