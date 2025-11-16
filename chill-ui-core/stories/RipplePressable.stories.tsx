import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import UiPresentation from './storybook/UiPresentation';
import { BoxTw as Box, StringTw as String } from '../src/components';
import RipplePressable from '../src/components/ripplePressable/components/RipplePressable.web';

const meta: Meta<typeof RipplePressable> = {
  argTypes: {
    PressableProps: {
      description: 'Pressable props for the RipplePressable component',
      type: 'object',
    },
  },
  component: RipplePressable,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Box className="w-full items-center justify-center p-4">
          <Story />
        </Box>
      </UiPresentation>
    ),
  ],
  title: 'ACTIONS/RipplePressable',
};

export default meta;
type Story = StoryObj<typeof RipplePressable>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic RipplePressable with text content',
      },
    },
  },
  render: (_args: any) => (
    <RipplePressable>
      <String className="w-full items-center rounded bg-gray-900 p-5 text-white">Press me</String>
    </RipplePressable>
  ),
};

export const FastRipple: Story = {
  parameters: {
    docs: {
      description: {
        story: 'RipplePressable with fast ripple animation (200ms)',
      },
    },
  },
  render: (_args: any) => (
    <RipplePressable speed={200}>
      <String className="w-full items-center rounded bg-red-400 p-5 text-white">Press me</String>
    </RipplePressable>
  ),
};

export const SlowRipple: Story = {
  parameters: {
    docs: {
      description: {
        story: 'RipplePressable with slow ripple animation (1000ms)',
      },
    },
  },
  render: (_args: any) => (
    <RipplePressable speed={1000}>
      <String className="w-full items-center rounded bg-green-400 p-5 text-white">Press me</String>
    </RipplePressable>
  ),
};

export const DarkRipple: Story = {
  parameters: {
    docs: {
      description: {
        story: 'RipplePressable with dark ripple effect on light background',
      },
    },
  },
  render: (_args: any) => (
    <RipplePressable speed={400} effectColor="rgba(0, 0, 0, 0.5)">
      <String className="w-full items-center rounded bg-blue-400 p-5 text-white">Press me</String>
    </RipplePressable>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled RipplePressable that does not respond to touches',
      },
    },
  },
  render: (_args: any) => (
    <RipplePressable disabled>
      <String className="w-full items-center rounded bg-gray-900 p-5 text-white">Press me</String>
    </RipplePressable>
  ),
};
