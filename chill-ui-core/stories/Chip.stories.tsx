import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { BoxTw as Box, ChipTw as Chip } from '../src/components';

const meta: Meta<typeof Chip> = {
  args: {
    as: 'touchable-opacity',
    colorVariant: 'primary',
    position: 'left',
    size: 'xs',
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
    position: {
      table: {
        defaultValue: {
          summary: 'left',
        },
      },
    },
    size: {
      table: {
        defaultValue: {
          summary: 'xs',
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
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'DATA DISPLAY/Chip',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (_args: any) => (
    <Chip colorVariant="primary" variant="contained">
      Default Chip
    </Chip>
  ),
};

export const Variants: Story = {
  render: (_args: any) => (
    <Box style={{ alignItems: 'center', gap: 16 }}>
      <Chip variant="contained" size="md">
        Contained
      </Chip>
      <Chip variant="outlined" size="md">
        Outlined
      </Chip>
    </Box>
  ),
};

export const ColorVariants: Story = {
  render: (_args: any) => (
    <Box style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
      <Chip colorVariant="primary" size="md">
        Primary
      </Chip>
      <Chip colorVariant="secondary" size="md">
        Secondary
      </Chip>
      <Chip colorVariant="accent" size="md">
        Accent
      </Chip>
      <Chip colorVariant="danger" size="md">
        Danger
      </Chip>
      <Chip colorVariant="error" size="md">
        Error
      </Chip>
      <Chip colorVariant="warning" size="md">
        Warning
      </Chip>
      <Chip colorVariant="info" size="md">
        Info
      </Chip>
      <Chip colorVariant="neutral" size="md">
        Neutral
      </Chip>
      <Chip colorVariant="muted" size="md">
        Muted
      </Chip>
      <Chip colorVariant="light" size="md">
        Light
      </Chip>
      <Chip colorVariant="dark" size="md">
        Dark
      </Chip>
      <Chip colorVariant="inverted" size="md">
        Inverted
      </Chip>
      <Chip colorVariant="white" size="md">
        White
      </Chip>
      <Chip colorVariant="disabled" size="md">
        Disabled
      </Chip>
    </Box>
  ),
};

export const OutlinedColorVariants: Story = {
  render: (_args: any) => (
    <Box style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
      <Chip variant="outlined" colorVariant="primary" size="md">
        Primary
      </Chip>
      <Chip variant="outlined" colorVariant="secondary" size="md">
        Secondary
      </Chip>
      <Chip variant="outlined" colorVariant="accent" size="md">
        Accent
      </Chip>
      <Chip variant="outlined" colorVariant="danger" size="md">
        Danger
      </Chip>
      <Chip variant="outlined" colorVariant="error" size="md">
        Error
      </Chip>
      <Chip variant="outlined" colorVariant="warning" size="md">
        Warning
      </Chip>
      <Chip variant="outlined" colorVariant="info" size="md">
        Info
      </Chip>
      <Chip variant="outlined" colorVariant="neutral" size="md">
        Neutral
      </Chip>
      <Chip variant="outlined" colorVariant="muted" size="md">
        Muted
      </Chip>
      <Chip variant="outlined" colorVariant="light" size="md">
        Light
      </Chip>
      <Chip variant="outlined" colorVariant="dark" size="md">
        Dark
      </Chip>
      <Chip variant="outlined" colorVariant="inverted" size="md">
        Inverted
      </Chip>
      <Chip variant="outlined" colorVariant="white" size="md">
        White
      </Chip>
      <Chip variant="outlined" colorVariant="disabled" size="md">
        Disabled
      </Chip>
    </Box>
  ),
};

export const Sizes: Story = {
  render: (_args: any) => (
    <Box style={{ alignItems: 'center', gap: 12 }}>
      <Chip size="xs">Extra Small</Chip>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
      <Chip size="xl">Extra Large</Chip>
    </Box>
  ),
};

export const CustomColors: Story = {
  render: (_args: any) => (
    <Box style={{ alignItems: 'center', gap: 12 }}>
      <Chip variant="contained" color="#3B82F6">
        Blue
      </Chip>
      <Chip variant="outlined" color="#10B981">
        Green
      </Chip>
      <Chip variant="contained" color="#EF4444">
        Red
      </Chip>
      <Chip variant="outlined" color="#F59E0B">
        Yellow
      </Chip>
    </Box>
  ),
};

export const WithLeftAndRightIcons: Story = {
  render: (_args: any) => (
    <Box style={{ alignItems: 'center', gap: 16 }}>
      <Chip
        iconActions={[
          { iconColor: '#FFD700', iconName: 'star-solid', position: 'left' },
          { iconColor: '#EF4444', iconName: 'xmark-solid', position: 'right' },
        ]}
        size="md"
      >
        Favori
      </Chip>
      <Chip
        variant="outlined"
        iconActions={[
          { iconColor: '#10B981', iconName: 'check-solid', position: 'left' },
          { iconColor: '#3B82F6', iconName: 'plus-solid', position: 'right' },
        ]}
        size="md"
      >
        Action
      </Chip>
      <Chip
        iconActions={[
          { iconColor: '#6366F1', iconName: 'info-solid', position: 'left' },
          { iconColor: '#8B5CF6', iconName: 'arrow-right-solid', position: 'right' },
        ]}
        colorVariant="info"
        size="md"
      >
        Navigation
      </Chip>
    </Box>
  ),
};

export const Interactive: Story = {
  render: (_args: any) => (
    <Box style={{ alignItems: 'center', gap: 16 }}>
      <Chip variant="contained" color="#8B5CF6" onPress={() => console.log('Clickable')}>
        Clickable
      </Chip>
      <Chip variant="outlined" color="#EC4899" onPress={() => console.log('Deletable')}>
        Deletable
      </Chip>
    </Box>
  ),
};

export const StatusIndicators: Story = {
  render: (_args: any) => (
    <Box style={{ alignItems: 'center', gap: 12 }}>
      <Chip variant="contained" color="#10B981" size="sm">
        Active
      </Chip>
      <Chip variant="outlined" color="#6B7280" size="sm">
        Pending
      </Chip>
      <Chip variant="contained" color="#EF4444" size="sm">
        Error
      </Chip>
      <Chip variant="outlined" color="#F59E0B" size="sm">
        Warning
      </Chip>
    </Box>
  ),
};
