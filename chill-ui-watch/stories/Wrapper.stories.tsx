import type { Meta, StoryObj } from '@storybook/react-native';

import { Box } from '../src/components/box';
import String from '../src/components/string';
import Wrapper from '../src/components/wrapper/Wrapper';

const meta: Meta<typeof Wrapper> = {
  argTypes: {
    edges: {
      control: 'multi-select',
      description: 'Safe area edges',
      options: ['top', 'right', 'bottom', 'left'],
    },
    keyboardAvoidingView: {
      control: 'boolean',
      description: 'Enable keyboard avoiding view',
    },
    keyboardAwareScrollView: {
      control: 'boolean',
      description: 'Enable keyboard aware scroll view',
    },
    my: {
      control: 'boolean',
      description: 'Add vertical margin',
    },
    pt: {
      control: 'select',
      description: 'Top padding size',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    px: {
      control: 'boolean',
      description: 'Add horizontal padding',
    },
    py: {
      control: 'boolean',
      description: 'Add vertical padding',
    },
    safeAreaView: {
      control: 'boolean',
      description: 'Enable safe area view',
    },
    scrollView: {
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

export const WithPadding: Story = {
  args: {
    children: <SampleContent />,
    px: true,
    py: true,
  },
};

export const WithSafeArea: Story = {
  args: {
    children: <SampleContent />,
    safeAreaView: true,
  },
};
export const WithSafeAreaAndEdges: Story = {
  args: {
    children: <SampleContent />,
    edges: ['top', 'bottom'],
  },
};

export const ScrollableWithPadding: Story = {
  args: {
    children: <ScrollableContent />,
    px: true,
    py: true,
    scrollView: true,
  },
};

export const KeyboardAware: Story = {
  args: {
    children: <SampleContent />,
    keyboardAwareScrollView: true,
    px: true,
    py: true,
  },
};

export const WithCustomPadding: Story = {
  args: {
    children: <SampleContent />,
    pt: 10,
    px: true,
  },
};

export const WithClassName: Story = {
  args: {
    children: <SampleContent />,
    className: 'bg-red-500',
  },
};
