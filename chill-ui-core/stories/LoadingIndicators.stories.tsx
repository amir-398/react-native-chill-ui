import type { Meta, StoryObj } from '@storybook/react';

import { Text } from 'react-native';

import { Box } from '../src/components';
import {
  Bounce,
  Chase,
  CircleFade,
  Flow,
  Fold,
  Grid,
  Pulse,
  Spinner,
  Swing,
  Wander,
} from '../src/components/loadingIndicatorsKit';

const meta: Meta<typeof Pulse> = {
  argTypes: {
    animating: {
      control: 'boolean',
      description: 'Whether the animation is running',
    },
    color: {
      control: 'color',
      description: 'Color of the loading indicator',
    },
    hidesWhenStopped: {
      control: 'boolean',
      description: 'Whether to hide the indicator when animation is stopped',
    },
    size: {
      control: 'number',
      description: 'Size of the loading indicator in pixels',
    },
  },
  decorators: [
    (Story: any) => (
      <Box
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 40,
          justifyContent: 'center',
          padding: 10,
        }}
      >
        <Story />
      </Box>
    ),
  ],
  title: 'components/LoadingIndicators',
};

export default meta;
type Story = StoryObj<typeof Pulse>;

function LoadingIndicatorWrapper({ children }: { children: React.ReactNode }) {
  return <Box className="flex flex-col items-center gap-2">{children}</Box>;
}

export const AllIndicators: Story = {
  args: {
    animating: true,
    color: '#000',
    hidesWhenStopped: true,
    size: 40,
  },
  parameters: {
    docs: {
      description: {
        story: 'All available loading indicators with default size and color',
      },
    },
  },
  render: (args: any) => (
    <>
      <LoadingIndicatorWrapper>
        <Bounce {...args} />
        <Text>Bounce</Text>
      </LoadingIndicatorWrapper>

      <LoadingIndicatorWrapper>
        <Chase {...args} />
        <Text>Chase</Text>
      </LoadingIndicatorWrapper>

      <LoadingIndicatorWrapper>
        <CircleFade {...args} />
        <Text>CircleFade</Text>
      </LoadingIndicatorWrapper>

      <LoadingIndicatorWrapper>
        <Flow {...args} />
        <Text>Flow</Text>
      </LoadingIndicatorWrapper>

      <LoadingIndicatorWrapper>
        <Fold {...args} />
        <Text>Fold</Text>
      </LoadingIndicatorWrapper>

      <LoadingIndicatorWrapper>
        <Grid {...args} />
        <Text>Grid</Text>
      </LoadingIndicatorWrapper>

      <LoadingIndicatorWrapper>
        <Pulse {...args} />
        <Text>Pulse</Text>
      </LoadingIndicatorWrapper>

      <LoadingIndicatorWrapper>
        <Spinner {...args} />
        <Text>Spinner</Text>
      </LoadingIndicatorWrapper>

      <LoadingIndicatorWrapper>
        <Swing {...args} />
        <Text>Swing</Text>
      </LoadingIndicatorWrapper>

      <LoadingIndicatorWrapper>
        <Wander {...args} />
        <Text>Wander</Text>
      </LoadingIndicatorWrapper>
    </>
  ),
};

export const DifferentSizes: Story = {
  args: {
    animating: true,
    color: '#000',
    hidesWhenStopped: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading indicators with different sizes',
      },
    },
  },
  render: (args: any) => (
    <>
      <LoadingIndicatorWrapper>
        <Pulse {...args} size={20} />
        <Text>Small (20)</Text>
      </LoadingIndicatorWrapper>

      <LoadingIndicatorWrapper>
        <Pulse {...args} size={40} />
        <Text>Medium (40)</Text>
      </LoadingIndicatorWrapper>

      <LoadingIndicatorWrapper>
        <Pulse {...args} size={60} />
        <Text>Large (60)</Text>
      </LoadingIndicatorWrapper>
    </>
  ),
};

export const DifferentColors: Story = {
  args: {
    animating: true,
    hidesWhenStopped: true,
    size: 40,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading indicators with different colors',
      },
    },
  },
  render: (args: any) => (
    <>
      <LoadingIndicatorWrapper>
        <Pulse {...args} color="#FF0000" />
        <Text>Red</Text>
      </LoadingIndicatorWrapper>

      <LoadingIndicatorWrapper>
        <Pulse {...args} color="#00FF00" />
        <Text>Green</Text>
      </LoadingIndicatorWrapper>

      <LoadingIndicatorWrapper>
        <Pulse {...args} color="#0000FF" />
        <Text>Blue</Text>
      </LoadingIndicatorWrapper>
    </>
  ),
};
