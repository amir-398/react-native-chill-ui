import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from './storybook';
import { Box, String, ButtonTw } from '../src/components';

const meta = {
  args: {
    as: 'touchable-opacity',
    colorVariant: 'primary',
    contentPosition: 'center',
    isDisabled: false,
    isLoading: false,
    position: 'auto',
    size: 'md',
    variant: 'contained',
  },
  argTypes: {
    as: {
      table: {
        defaultValue: {
          summary: 'touchable-opacity',
        },
      },
    },
    colorVariant: {
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    contentPosition: {
      table: {
        defaultValue: {
          summary: 'center',
        },
      },
    },
    isDisabled: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    isLoading: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    leftIconAction: {
      control: 'table',
      defaultValue: {
        name: 'home-solid',
        size: 'md',
      },
      table: {
        type: {
          detail: '{ color?: string, name: keyof TIcons, size?: IconProps["size"], customIcon?: React.ReactNode }',
          summary: 'iconConfig',
        },
      },
    },
    position: {
      table: {
        defaultValue: {
          summary: 'auto',
        },
      },
    },
    rightIconAction: {
      control: 'table',
      defaultValue: {
        name: 'arrow-right-solid',
        size: 'md',
      },
      table: {
        type: {
          detail: '{ color?: string, name: keyof TIcons, size?: IconProps["size"], customIcon?: React.ReactNode }',
          summary: 'iconConfig',
        },
      },
    },
    size: {
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    variant: {
      table: {
        defaultValue: {
          summary: 'contained',
        },
      },
    },
  },
  component: ButtonTw,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Forms/Button',
} satisfies Meta<typeof ButtonTw>;

export default meta;

type Story = StoryObj<typeof ButtonTw>;

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
        story: 'Different Button sizes from 2xs to 2xl',
      },
    },
  },
  render: (_args: any) => (
    <Box className="w-full gap-4">
      <ButtonTw size="2xs" title="2XS" colorVariant="primary" variant="contained" />
      <ButtonTw size="xs" title="XS" colorVariant="primary" variant="contained" />
      <ButtonTw size="sm" title="Small" colorVariant="primary" variant="contained" />
      <ButtonTw size="md" title="Medium" colorVariant="primary" variant="contained" />
      <ButtonTw size="lg" title="Large" colorVariant="primary" variant="contained" />
      <ButtonTw size="xl" title="XL" colorVariant="primary" variant="contained" />
      <ButtonTw size="2xl" title="2XL" colorVariant="primary" variant="contained" />
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
      <ButtonTw as="touchable-opacity" title="TouchableOpacity" colorVariant="primary" {..._args} />
      <ButtonTw as="pressable" title="Pressable" colorVariant="secondary" variant="contained" {..._args} />
      <ButtonTw as="ripple-pressable" title="RipplePressable" colorVariant="accent" {..._args} />
      <ButtonTw as="scale-pressable" title="ScalePressable" colorVariant="info" {..._args} />
    </Box>
  ),
};

// Button Variants Overview
export const VariantsOverview: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Overview of all Button variants (contained, outlined, text) with different colors',
      },
    },
  },
  render: (_args: any) => (
    <Box className="w-full gap-4">
      {/* Contained */}
      <Box className="w-full gap-2">
        <String weight="bold">Contained</String>
        <Box className="w-full flex-row gap-2">
          <ButtonTw variant="contained" colorVariant="primary" title="Primary" />
          <ButtonTw variant="contained" colorVariant="info" title="Success" />
          <ButtonTw variant="contained" colorVariant="error" title="Error" />
        </Box>
      </Box>

      {/* Outlined */}
      <Box className="gap-2">
        <String weight="bold">Outlined</String>
        <Box className="flex-row flex-wrap gap-2">
          <ButtonTw variant="outlined" colorVariant="primary" title="Primary" />
          <ButtonTw variant="outlined" colorVariant="success" title="Success" />
          <ButtonTw variant="outlined" colorVariant="error" title="Error" />
        </Box>
      </Box>

      {/* Text */}
      <Box className="gap-2">
        <String weight="bold">Text</String>
        <Box className="flex-row flex-wrap gap-2">
          <ButtonTw variant="text" colorVariant="primary" title="Primary" />
          <ButtonTw variant="text" colorVariant="success" title="Success" />
          <ButtonTw variant="text" colorVariant="error" title="Error" />
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
    <ButtonTw colorVariant="primary" variant="contained">
      <Box className="flex-row items-center gap-2">
        <String weight="bold" color="white">
          Custom Content
        </String>
        <String color="white">→</String>
      </Box>
    </ButtonTw>
  ),
};
