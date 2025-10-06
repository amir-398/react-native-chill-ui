import type { Meta, StoryObj } from '@storybook/react';

import { Text } from 'react-native';

import UiPresentation from './storybook';
import { LoadingIndicator } from '../src/components/loadingIndicatorsKit';

const meta: Meta<typeof LoadingIndicator> = {
  argTypes: {
    name: {
      control: 'select',
      description: 'Type of loading animation to display',
      options: ['bounce', 'chase', 'circleFade', 'flow', 'fold', 'grid', 'pulse', 'spinner', 'swing', 'wander'],
    },
    size: {
      control: 'number',
      description: 'Size of the loading indicator in pixels',
    },
    color: {
      control: 'color',
      description: 'Color of the loading indicator',
    },
    animating: {
      control: 'boolean',
      description: 'Whether the animation is running',
    },
    hidesWhenStopped: {
      control: 'boolean',
      description: 'Whether to hide the indicator when animation is stopped',
    },
    style: {
      control: 'object',
      description: 'Custom style object for the container',
    },
    accessible: {
      control: 'boolean',
      description: 'Whether the component is accessible',
    },
    accessibilityLabel: {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
  },
  component: LoadingIndicator,
  decorators: [
    (Story: any) => (
      <UiPresentation className="items-center justify-center px-3">
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'Components/LoadingIndicators',
};

export default meta;
type Story = StoryObj<typeof LoadingIndicator>;

// Basic LoadingIndicator
export const Default: Story = {
  args: {
    name: 'spinner',
    size: 40,
    color: '#000',
    animating: true,
    hidesWhenStopped: true,
  },
};

export const Bounce: Story = {
  args: {
    name: 'bounce',
    size: 40,
    color: '#007AFF',
    animating: true,
    hidesWhenStopped: true,
  },
};

export const Chase: Story = {
  args: {
    name: 'chase',
    size: 40,
    color: '#34C759',
    animating: true,
    hidesWhenStopped: true,
  },
};

export const CircleFade: Story = {
  args: {
    name: 'circleFade',
    size: 40,
    color: '#FF9500',
    animating: true,
    hidesWhenStopped: true,
  },
};

export const Flow: Story = {
  args: {
    name: 'flow',
    size: 40,
    color: '#AF52DE',
    animating: true,
    hidesWhenStopped: true,
  },
};

export const Fold: Story = {
  args: {
    name: 'fold',
    size: 40,
    color: '#FF2D92',
    animating: true,
    hidesWhenStopped: true,
  },
};

export const Grid: Story = {
  args: {
    name: 'grid',
    size: 40,
    color: '#5AC8FA',
    animating: true,
    hidesWhenStopped: true,
  },
};

export const Pulse: Story = {
  args: {
    name: 'pulse',
    size: 40,
    color: '#FF3B30',
    animating: true,
    hidesWhenStopped: true,
  },
};

export const Spinner: Story = {
  args: {
    name: 'spinner',
    size: 40,
    color: '#007AFF',
    animating: true,
    hidesWhenStopped: true,
  },
};

export const Swing: Story = {
  args: {
    name: 'swing',
    size: 40,
    color: '#30D158',
    animating: true,
    hidesWhenStopped: true,
  },
};

export const Wander: Story = {
  args: {
    name: 'wander',
    size: 40,
    color: '#007AFF',
    animating: true,
    hidesWhenStopped: true,
  },
};

// Size variants
export const Small: Story = {
  args: {
    name: 'spinner',
    size: 20,
    color: '#007AFF',
    animating: true,
    hidesWhenStopped: true,
  },
};

export const Medium: Story = {
  args: {
    name: 'spinner',
    size: 40,
    color: '#007AFF',
    animating: true,
    hidesWhenStopped: true,
  },
};

export const Large: Story = {
  args: {
    name: 'spinner',
    size: 60,
    color: '#007AFF',
    animating: true,
    hidesWhenStopped: true,
  },
};

// Animation control
export const NotAnimating: Story = {
  args: {
    name: 'bounce',
    size: 40,
    color: '#007AFF',
    animating: false,
    hidesWhenStopped: false,
  },
};

export const HiddenWhenStopped: Story = {
  args: {
    name: 'pulse',
    size: 40,
    color: '#FF3B30',
    animating: false,
    hidesWhenStopped: true,
  },
};

// Custom styling
export const CustomStyle: Story = {
  args: {
    name: 'chase',
    size: 40,
    color: '#34C759',
    animating: true,
    hidesWhenStopped: true,
    style: {
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      padding: 16,
    },
  },
};

// Accessibility
export const WithAccessibility: Story = {
  args: {
    name: 'spinner',
    size: 40,
    color: '#007AFF',
    animating: true,
    hidesWhenStopped: true,
    accessible: true,
    accessibilityLabel: 'Loading user data',
  },
};
