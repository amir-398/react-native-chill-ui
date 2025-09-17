import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import Chip from '../src/components/chip/Chip';

const meta: Meta<typeof Chip> = {
  argTypes: {
    colorVariant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'accent',
        'danger',
        'error',
        'warning',
        'info',
        'success',
        'neutral',
        'muted',
        'light',
        'dark',
        'inverted',
        'white',
        'disabled',
      ],
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    rounded: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '2xs', '3xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined'],
    },
  },
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Chip',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Chip',
    colorVariant: 'primary',
    rounded: 'full',
    size: 'md',
    variant: 'contained',
  },
};

export const Variants: Story = {
  render: () => (
    <View style={{ alignItems: 'center', gap: 16 }}>
      <Chip variant="contained" size="md">
        Contained
      </Chip>
      <Chip variant="outlined" size="md">
        Outlined
      </Chip>
    </View>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
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
    </View>
  ),
};

export const OutlinedColorVariants: Story = {
  render: () => (
    <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
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
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ alignItems: 'center', gap: 12 }}>
      <Chip size="xs">Extra Small</Chip>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
      <Chip size="xl">Extra Large</Chip>
    </View>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <View style={{ alignItems: 'center', gap: 12 }}>
      <Chip rounded="sm">Small Radius</Chip>
      <Chip rounded="md">Medium Radius</Chip>
      <Chip rounded="lg">Large Radius</Chip>
      <Chip rounded="xl">Extra Large Radius</Chip>
      <Chip rounded="full">Full Radius (default)</Chip>
    </View>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <View style={{ alignItems: 'center', gap: 12 }}>
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
    </View>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <View style={{ alignItems: 'center', gap: 16 }}>
      <Chip
        variant="contained"
        iconActions={[{ iconColor: '#FFD700', iconName: 'star-solid', position: 'left' }]}
        size="lg"
        rounded="full"
      />
      <Chip
        variant="outlined"
        iconActions={[{ iconColor: '#10B981', iconName: 'check-solid', position: 'left' }]}
        size="lg"
        rounded="full"
      />
      <Chip
        variant="contained"
        iconActions={[{ iconColor: '#FFFFFF', iconName: 'bell-solid', position: 'left' }]}
        size="md"
        rounded="md"
      />
    </View>
  ),
};

export const WithLeftAndRightIcons: Story = {
  render: () => (
    <View style={{ alignItems: 'center', gap: 16 }}>
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
    </View>
  ),
};

export const WithCenterIcon: Story = {
  render: () => (
    <View style={{ alignItems: 'center', gap: 16 }}>
      <Chip iconActions={[{ iconColor: '#6366F1', iconName: 'info-solid', position: 'center' }]} size="md">
        Information
      </Chip>
      <Chip
        variant="outlined"
        iconActions={[{ iconColor: '#F59E0B', iconName: 'question-solid', position: 'center' }]}
        size="md"
      >
        Aide
      </Chip>
    </View>
  ),
};

export const Interactive: Story = {
  render: () => (
    <View style={{ alignItems: 'center', gap: 16 }}>
      <Chip variant="contained" size="lg" rounded="full" color="#8B5CF6">
        Clickable
      </Chip>
      <Chip variant="outlined" size="lg" rounded="full" color="#EC4899">
        Deletable
      </Chip>
    </View>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <View style={{ alignItems: 'center', gap: 12 }}>
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
    </View>
  ),
};

export const WithPosition: Story = {
  render: () => (
    <View style={{ alignItems: 'center', gap: 16 }}>
      <View
        style={{ alignItems: 'center', flexDirection: 'row', gap: 12, justifyContent: 'space-between', width: 300 }}
      >
        <Chip position="left" colorVariant="primary">
          Gauche
        </Chip>
        <Chip position="center" colorVariant="secondary">
          Centre
        </Chip>
        <Chip position="right" colorVariant="accent">
          Droite
        </Chip>
      </View>

      <View
        style={{ alignItems: 'center', flexDirection: 'row', gap: 12, justifyContent: 'space-between', width: 300 }}
      >
        <Chip variant="outlined" position="left" colorVariant="danger">
          Gauche
        </Chip>
        <Chip variant="outlined" position="center" colorVariant="warning">
          Centre
        </Chip>
        <Chip variant="outlined" position="right" colorVariant="info">
          Droite
        </Chip>
      </View>
    </View>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <View style={{ alignItems: 'center', gap: 16 }}>
      <Chip title="Titre prioritaire" colorVariant="primary">
        Contenu ignoré
      </Chip>
      <Chip variant="outlined" title="Titre outlined" colorVariant="danger">
        Contenu ignoré
      </Chip>
      <Chip title="Titre avec icône" iconActions={[{ iconName: 'star-solid', position: 'left' }]}>
        Contenu ignoré
      </Chip>
    </View>
  ),
};
