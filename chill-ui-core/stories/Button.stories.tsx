import type { Meta, StoryObj } from '@storybook/react';

import { Box, String, Button } from '../src/components';

const meta = {
  argTypes: {
    as: {
      control: 'select',
      description: 'Type of touchable component to use',
      options: ['touchable-opacity', 'pressable', 'ripple-pressable', 'scale-pressable'],
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
    contentPosition: {
      control: 'select',
      description: 'Content position within the button (text + icon alignment)',
      options: ['left', 'center', 'right'],
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    leftIconAction: {
      control: 'table',
      defaultValue: {
        name: 'home-solid',
        size: 'md',
      },
      description: 'Left icon configuration with position support',
      table: {
        type: {
          detail: '{ color?: string, size?: "small" | "large" }',
          summary: 'object',
        },
      },
    },
    loadingIndicatorProps: {
      control: 'object',
      description: 'The props of the loading indicator',
    },
    onPress: {
      control: 'text',
      description: 'Press callback function',
    },
    position: {
      control: 'select',
      description: 'Button position within its container',
      options: ['auto', 'left', 'center', 'right'],
    },
    rightIconAction: {
      control: 'object',
      description: 'Right icon configuration with position support',
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
    style: {
      control: 'object',
      description: 'Style object for the button container',
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
    (Story: any) => (
      <Box className="w-full bg-[#f0f0f0] p-4">
        <Story />
      </Box>
    ),
  ],
  tags: ['autodocs'],
  title: 'Forms/Button',
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

// Default Example
export const Default: Story = {
  args: {
    contentPosition: 'center',
    size: 'md',
    title: 'Button',
    variant: 'contained',
  },
};

// Button Variants
export const Outlined: Story = {
  args: {
    colorVariant: 'primary',
    size: 'md',
    title: 'Outlined Button',
    variant: 'outlined',
  },
};

export const TextButton: Story = {
  args: {
    colorVariant: 'primary',
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
    size: 'md',
    title: 'Loading Button',
    variant: 'contained',
  },
};

export const Disabled: Story = {
  args: {
    colorVariant: 'primary',
    isDisabled: true,
    size: 'md',
    title: 'Disabled Button',
    variant: 'contained',
  },
};

// With Icon
export const WithIcon: Story = {
  args: {
    colorVariant: 'primary',
    contentPosition: 'center',
    leftIconAction: {
      name: 'home-solid',
      size: 'md',
    },
    size: 'md',
    title: 'Button with Icon',
    variant: 'contained',
  },
};

// Sizes
export const SizeVariants: Story = {
  args: {
    contentPosition: 'center',
  },
  parameters: {
    docs: {
      description: {
        story: 'Different button sizes from 2xs to 2xl',
      },
    },
  },
  render: (_args: any) => (
    <Box className="w-full gap-4">
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
  render: (_args: any) => (
    <Box className="w-full gap-4">
      <Button as="touchable-opacity" title="TouchableOpacity" colorVariant="primary" {..._args} />
      <Button as="pressable" title="Pressable" colorVariant="secondary" variant="contained" {..._args} />
      <Button as="ripple-pressable" title="RipplePressable" colorVariant="accent" {..._args} />
      <Button as="scale-pressable" title="ScalePressable" colorVariant="info" {..._args} />
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
  render: (_args: any) => (
    <Box className="w-full gap-4">
      {/* Contained */}
      <Box className="w-full gap-2">
        <String weight="bold">Contained</String>
        <Box className="w-full flex-row gap-2">
          <Button variant="contained" colorVariant="primary" title="Primary" />
          <Button variant="contained" colorVariant="info" title="Success" />
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
  render: (_args: any) => (
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
