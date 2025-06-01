import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../src/components';
import Button from '../src/components/button/Button';

const meta = {
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    leftIcon: {
      control: 'select',
      description: 'Icon to display on the left side of the button',
      options: ['home-solid', 'search-solid', 'user-solid', 'heart-solid', 'gear-solid'],
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    position: {
      control: 'select',
      description: 'The position of the button',
      options: ['left', 'center', 'right'],
    },
    size: {
      control: 'select',
      description: 'The size of the button',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    textWeight: {
      control: 'select',
      description: 'The font weight of the button text',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    title: {
      control: 'text',
      description: 'The text content of the button',
    },
    variant: {
      control: 'select',
      description: 'The visual style of the button',
      options: ['primary', 'secondary', 'tertiary'],
    },
  },
  component: Button,
  decorators: [
    Story => (
      <Box style={{ padding: 16 }}>
        <Story />
      </Box>
    ),
  ],
  title: 'components/Button',
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    position: 'center',
    size: 'md',
    title: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    position: 'center',
    size: 'md',
    title: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Error: Story = {
  args: {
    position: 'center',
    size: 'md',
    title: 'Tertiary Button',
    variant: 'error',
  },
};

export const Accent: Story = {
  args: {
    position: 'center',
    size: 'md',
    title: 'Accent Button',
    variant: 'accent',
  },
};

export const Info: Story = {
  args: {
    position: 'center',
    size: 'md',
    title: 'Info Button',
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    position: 'center',
    size: 'md',
    title: 'Success Button',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    position: 'center',
    size: 'md',
    title: 'Warning Button',
    variant: 'warning',
  },
};

export const Light: Story = {
  args: {
    position: 'center',
    size: 'md',
    title: 'Light Button',
    variant: 'light',
  },
};

export const Dark: Story = {
  args: {
    position: 'center',
    size: 'md',
    title: 'Dark Button',
    variant: 'dark',
  },
};

export const WithIcon: Story = {
  args: {
    leftIcon: 'home-solid',
    position: 'center',
    size: 'md',
    title: 'Button with Icon',
    variant: 'primary',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    position: 'center',
    size: 'md',
    title: 'Loading Button',
    variant: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    position: 'center',
    size: 'md',
    title: 'Disabled Button',
    variant: 'primary',
  },
};

export const Small: Story = {
  args: {
    position: 'center',
    size: 'sm',
    title: 'Small Button',
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    position: 'center',
    size: 'lg',
    title: 'Large Button',
    variant: 'primary',
  },
};
