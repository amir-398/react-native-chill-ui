import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../src/components/box';
import { String } from '../src/components/string';
import Wrapper from '../src/components/wrapper/Wrapper';

const meta: Meta<typeof Wrapper> = {
  argTypes: {
    edges: {
      control: 'multi-select',
      description: 'Safe area edges',
      options: ['top', 'right', 'bottom', 'left'],
    },
    hasKeyboardAvoidingView: {
      control: 'boolean',
      description: 'Enable keyboard avoiding view',
    },
    hasKeyboardAwareScrollView: {
      control: 'boolean',
      description: 'Enable keyboard aware scroll view',
    },
    hasSafeAreaView: {
      control: 'boolean',
      description: 'Enable safe area view',
    },
    hasScrollView: {
      control: 'boolean',
      description: 'Enable scroll view behavior',
    },
  },
  component: Wrapper,
  title: 'Components/Wrapper',
};

export default meta;
type Story = StoryObj<typeof Wrapper>;

function SampleContent() {
  return (
    <>
      <Box className="mb-4">
        <String>Sample content 1</String>
      </Box>
      <Box className="mb-4">
        <String>Sample content 2</String>
      </Box>
      <Box className="mb-4">
        <String>Sample content 3</String>
      </Box>
      <Box className="mb-4">
        <String>Sample content 4</String>
      </Box>
      <Box className="mb-4">
        <String>Sample content 5</String>
      </Box>
    </>
  );
}

function ScrollableContent() {
  return (
    <>
      <Box className="items-center justify-center bg-black" style={{ height: 500 }}>
        <String color="white">Sample content 1</String>
      </Box>
      <Box className="items-center justify-center bg-red-500" style={{ height: 500 }}>
        <String color="white">Sample content 2</String>
      </Box>
      <Box className="items-center justify-center bg-black" style={{ height: 500 }}>
        <String color="white">Sample content 3</String>
      </Box>
      <Box className="items-center justify-center bg-red-500" style={{ height: 500 }}>
        <String color="white">Sample content 4</String>
      </Box>
    </>
  );
}

export const Default: Story = {
  args: {
    children: <SampleContent />,
  },
};

export const WithSafeArea: Story = {
  args: {
    children: <SampleContent />,
    hasSafeAreaView: true,
  },
};

export const WithSafeAreaAndEdges: Story = {
  args: {
    children: <SampleContent />,
    edges: ['top', 'bottom'],
  },
};

export const Scrollable: Story = {
  args: {
    children: <ScrollableContent />,
    hasScrollView: true,
  },
};

export const KeyboardAware: Story = {
  args: {
    children: <SampleContent />,
    hasKeyboardAwareScrollView: true,
  },
};

export const WithClassName: Story = {
  args: {
    children: <SampleContent />,
    className: 'bg-red-500',
  },
};
