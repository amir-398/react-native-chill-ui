import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from './storybook';
import { LoadingIndicator } from '../src/components/loadingIndicatorsKit';

const meta: Meta<typeof LoadingIndicator> = {
  argTypes: {},
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
    animating: true,
    color: '#000',
    hidesWhenStopped: true,
    name: 'spinner',
    size: 40,
  },
};

export const Bounce: Story = {
  args: {
    animating: true,
    color: '#007AFF',
    hidesWhenStopped: true,
    name: 'bounce',
    size: 40,
  },
};

export const Chase: Story = {
  args: {
    animating: true,
    color: '#34C759',
    hidesWhenStopped: true,
    name: 'chase',
    size: 40,
  },
};

export const CircleFade: Story = {
  args: {
    animating: true,
    color: '#FF9500',
    hidesWhenStopped: true,
    name: 'circleFade',
    size: 40,
  },
};

export const Flow: Story = {
  args: {
    animating: true,
    color: '#AF52DE',
    hidesWhenStopped: true,
    name: 'flow',
    size: 40,
  },
};

export const Fold: Story = {
  args: {
    animating: true,
    color: '#FF2D92',
    hidesWhenStopped: true,
    name: 'fold',
    size: 40,
  },
};

export const Grid: Story = {
  args: {
    animating: true,
    color: '#5AC8FA',
    hidesWhenStopped: true,
    name: 'grid',
    size: 40,
  },
};

export const Pulse: Story = {
  args: {
    animating: true,
    color: '#FF3B30',
    hidesWhenStopped: true,
    name: 'pulse',
    size: 40,
  },
};

export const Spinner: Story = {
  args: {
    animating: true,
    color: '#007AFF',
    hidesWhenStopped: true,
    name: 'spinner',
    size: 40,
  },
};

export const Swing: Story = {
  args: {
    animating: true,
    color: '#30D158',
    hidesWhenStopped: true,
    name: 'swing',
    size: 40,
  },
};

export const Wander: Story = {
  args: {
    animating: true,
    color: '#007AFF',
    hidesWhenStopped: true,
    name: 'wander',
    size: 40,
  },
};

// Size variants
export const Small: Story = {
  args: {
    animating: true,
    color: '#007AFF',
    hidesWhenStopped: true,
    name: 'spinner',
    size: 20,
  },
};

export const Medium: Story = {
  args: {
    animating: true,
    color: '#007AFF',
    hidesWhenStopped: true,
    name: 'spinner',
    size: 40,
  },
};

export const Large: Story = {
  args: {
    animating: true,
    color: '#007AFF',
    hidesWhenStopped: true,
    name: 'spinner',
    size: 60,
  },
};

// Animation control
export const NotAnimating: Story = {
  args: {
    animating: false,
    color: '#007AFF',
    hidesWhenStopped: false,
    name: 'bounce',
    size: 40,
  },
};

export const HiddenWhenStopped: Story = {
  args: {
    animating: false,
    color: '#FF3B30',
    hidesWhenStopped: true,
    name: 'pulse',
    size: 40,
  },
};

// Custom styling
export const CustomStyle: Story = {
  args: {
    animating: true,
    color: '#34C759',
    hidesWhenStopped: true,
    name: 'chase',
    size: 40,
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
    accessibilityLabel: 'Loading user data',
    accessible: true,
    animating: true,
    color: '#007AFF',
    hidesWhenStopped: true,
    name: 'spinner',
    size: 40,
  },
};
