import type { Meta, StoryObj } from '@storybook/react';

import { Box, String } from '../src/components';
import Button from '../src/components/button/Button';

const meta = {
  argTypes: {
    as: {
      control: 'select',
      description: 'Type of touchable component to use',
      options: ['TouchableOpacity', 'Pressable', 'RipplePressable'],
    },
    colorVariant: {
      control: 'select',
      description: 'The color variant of the button (NativeWind only)',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'error',
        'warning',
        'info',
        'accent',
        'danger',
        'dark',
        'light',
        'neutral',
        'muted',
        'inverted',
        'white',
      ],
    },
    iconAction: {
      control: 'object',
      description: 'Icon configuration with position support',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    loadingIndicatorProps: {
      control: 'object',
      description: 'The props of the loading indicator',
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
    stringProps: {
      control: 'object',
      description: 'The props of the button text',
    },
    title: {
      control: 'text',
      description: 'The text content of the button',
    },
    variant: {
      control: 'select',
      description: 'The visual style of the button',
      options: ['contained', 'outlined', 'text'],
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

// Default Example
export const Default: Story = {
  args: {
    colorVariant: 'primary',
    position: 'center',
    size: 'md',
    title: 'Button',
    variant: 'contained',
  },
};

// Button Variants
export const Outlined: Story = {
  args: {
    colorVariant: 'primary',
    position: 'center',
    size: 'md',
    title: 'Outlined Button',
    variant: 'outlined',
  },
};

export const TextButton: Story = {
  args: {
    colorVariant: 'primary',
    position: 'center',
    size: 'md',
    title: 'Text Button',
    variant: 'text',
  },
};

// States
export const Loading: Story = {
  args: {
    colorVariant: 'primary',
    isLoading: true,
    position: 'center',
    size: 'md',
    title: 'Loading Button',
    variant: 'contained',
  },
};

export const Disabled: Story = {
  args: {
    colorVariant: 'primary',
    isDisabled: true,
    position: 'center',
    size: 'md',
    title: 'Disabled Button',
    variant: 'contained',
  },
};

// With Icon
export const WithIcon: Story = {
  args: {
    colorVariant: 'primary',
    iconAction: {
      name: 'home-solid',
      position: 'left',
      size: 'md',
    },
    position: 'center',
    size: 'md',
    title: 'Button with Icon',
    variant: 'contained',
  },
};

// Sizes
export const SizeVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different button sizes from 2xs to 2xl',
      },
    },
  },
  render: () => (
    <Box className="items-center gap-4">
      <Button size="2xs" title="2XS" colorVariant="primary" variant="contained" />
      <Button size="xs" title="XS" colorVariant="primary" variant="contained" />
      <Button size="sm" title="Small" colorVariant="primary" variant="contained" />
      <Button size="md" title="Medium" colorVariant="primary" variant="contained" />
      <Button size="lg" title="Large" colorVariant="primary" variant="contained" />
      <Button size="xl" title="XL" colorVariant="primary" variant="contained" />
      <Button size="2xl" title="2XL" colorVariant="primary" variant="contained" />
    </Box>
  ),
};

// Touchable Types
export const TouchableTypes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different touchable components with different interaction effects',
      },
    },
  },
  render: () => (
    <Box className="gap-4">
      <Button as="TouchableOpacity" title="TouchableOpacity" colorVariant="primary" variant="contained" />
      <Button as="Pressable" title="Pressable" colorVariant="secondary" variant="contained" />
      <Button as="RipplePressable" title="RipplePressable" colorVariant="success" variant="contained" />
    </Box>
  ),
};

// Button Variants Overview
export const VariantsOverview: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Overview of all button variants (contained, outlined, text) with different colors',
      },
    },
  },
  render: () => (
    <Box className="gap-4">
      {/* Contained */}
      <Box className="gap-2">
        <String weight="bold">Contained</String>
        <Box className="flex-row flex-wrap gap-2">
          <Button variant="contained" colorVariant="primary" title="Primary" />
          <Button variant="contained" colorVariant="success" title="Success" />
          <Button variant="contained" colorVariant="error" title="Error" />
        </Box>
      </Box>

      {/* Outlined */}
      <Box className="gap-2">
        <String weight="bold">Outlined</String>
        <Box className="flex-row flex-wrap gap-2">
          <Button variant="outlined" colorVariant="primary" title="Primary" />
          <Button variant="outlined" colorVariant="success" title="Success" />
          <Button variant="outlined" colorVariant="error" title="Error" />
        </Box>
      </Box>

      {/* Text */}
      <Box className="gap-2">
        <String weight="bold">Text</String>
        <Box className="flex-row flex-wrap gap-2">
          <Button variant="text" colorVariant="primary" title="Primary" />
          <Button variant="text" colorVariant="success" title="Success" />
          <Button variant="text" colorVariant="error" title="Error" />
        </Box>
      </Box>
    </Box>
  ),
};

// Custom Content
export const CustomContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Button with custom content instead of title',
      },
    },
  },
  render: () => (
    <Button colorVariant="primary" variant="contained">
      <Box className="flex-row items-center gap-2">
        <String weight="bold" color="white">
          Custom Content
        </String>
        <String color="white">→</String>
      </Box>
    </Button>
  ),
};
