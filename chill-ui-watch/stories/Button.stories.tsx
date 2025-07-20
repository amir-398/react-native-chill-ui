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
    className: 'rounded-lg',
    iconAction: {
      name: 'home-solid',
      position: 'left',
      size: 'md',
    },
    position: 'center',
    size: 'md',
    stringProps: {
      position: 'right',
    },
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
    iconAction: {
      name: 'home-solid',
      position: 'left',
      size: 'md',
    },
    position: 'center',
    size: 'md',
    title: 'Button with Icon',
    variant: 'primary',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    position: 'center',
    size: 'md',
    title: 'Loading Button',
    variant: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
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

export const TouchableOpacity: Story = {
  args: {
    as: 'TouchableOpacity',
    position: 'center',
    size: 'md',
    title: 'TouchableOpacity Button',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button using TouchableOpacity with opacity effect on press',
      },
    },
  },
};

export const Pressable: Story = {
  args: {
    as: 'Pressable',
    position: 'center',
    size: 'md',
    title: 'Pressable Button',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button using Pressable with native Android ripple effect',
      },
    },
  },
};

export const RipplePressable: Story = {
  args: {
    as: 'RipplePressable',
    position: 'center',
    size: 'md',
    title: 'RipplePressable Button',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button using RipplePressable with custom ripple animation',
      },
    },
  },
};

export const CustomContent: Story = {
  args: {
    as: 'RipplePressable',
    position: 'center',
    size: 'md',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with custom content instead of title',
      },
    },
  },
  render: args => (
    <Button {...args}>
      <Box className="flex-row items-center gap-2">
        <String weight="bold" color="white">
          Custom Content
        </String>
        <String color="white">→</String>
      </Box>
    </Button>
  ),
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
    <Box className="gap-4">
      <Button as="TouchableOpacity" title="TouchableOpacity" variant="primary" />
      <Button as="Pressable" title="Pressable" variant="accent" />
      <Button as="RipplePressable" title="RipplePressable" variant="success" />
    </Box>
  ),
};

export const IconPositioning: Story = {
  args: {
    position: 'center',
    size: 'md',
    title: 'Icon Positioning Examples',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of different icon positioning with text alignment',
      },
    },
  },
  render: () => (
    <Box className="gap-4">
      {/* Icon à gauche */}
      <Button iconAction={{ name: 'home-solid', position: 'left', size: 'md' }} title="Icon Left" variant="primary" />

      {/* Icon à droite */}
      <Button
        iconAction={{ name: 'angle-right-solid', position: 'right', size: 'md' }}
        title="Icon Right"
        variant="accent"
      />

      {/* Texte aligné à gauche avec icône */}
      <Button
        iconAction={{ name: 'check-solid', position: 'left', size: 'md' }}
        stringProps={{ position: 'left' }}
        title="Left Aligned with Icon"
        variant="success"
      />

      {/* Texte aligné à droite avec icône */}
      <Button
        iconAction={{ name: 'angle-right-solid', position: 'right', size: 'md' }}
        stringProps={{ position: 'right' }}
        title="Right Aligned with Icon"
        variant="info"
      />
    </Box>
  ),
};

export const CustomIcon: Story = {
  args: {
    position: 'center',
    size: 'md',
    title: 'Custom Icon Examples',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of custom icon components',
      },
    },
  },
  render: () => (
    <Box className="gap-4">
      {/* Custom icon à gauche */}
      <Button
        iconAction={{
          customIcon: <Box className="h-6 w-6 rounded-full bg-white" />,
          name: 'home-solid',
          position: 'left',
          size: 'md',
        }}
        title="Custom Icon Left"
        variant="primary"
      />

      {/* Custom icon à droite */}
      <Button
        iconAction={{
          customIcon: <Box className="h-6 w-6 rounded-full bg-white" />,
          name: 'home-solid',
          position: 'right',
          size: 'md',
        }}
        title="Custom Icon Right"
        variant="accent"
      />
    </Box>
  ),
};
