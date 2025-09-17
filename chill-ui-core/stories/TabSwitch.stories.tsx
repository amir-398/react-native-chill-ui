import type { Meta, StoryObj } from '@storybook/react';

import { Box, String } from '../src/components';
import TabSwitch from '../src/components/tabSwitch/TabSwitch';

const meta: Meta<typeof TabSwitch> = {
  argTypes: {
    activeSeparatorColor: {
      control: 'color',
      description: 'Color of the active separator',
    },
    leftRender: {
      description: 'Content to render in the left tab',
    },
    leftScreenTitle: {
      description: 'Title of the left tab',
    },
    leftTabClassName: {
      control: 'text',
      description: 'The class name of the left tab',
    },
    leftTabColor: {
      control: 'color',
      description: 'Background color of the inactive left tab',
    },
    leftTabColorActive: {
      control: 'color',
      description: 'Background color of the active left tab',
    },
    rightRender: {
      description: 'Content to render in the right tab',
    },
    rightScreenTitle: {
      description: 'Title of the right tab',
    },
    rightTabClassName: {
      control: 'text',
      description: 'The class name of the right tab',
    },
    rightTabColor: {
      control: 'color',
      description: 'Background color of the inactive right tab',
    },
    rightTabColorActive: {
      control: 'color',
      description: 'Background color of the active right tab',
    },
    separatorClassName: {
      control: 'text',
      description: 'Additional className for the separator',
    },
    separatorColor: {
      control: 'color',
      description: 'Color of the separator line',
    },
    tabClassName: {
      control: 'text',
      description: 'Additional className for both tabs',
    },
    titleClassName: {
      control: 'text',
      description: 'Additional className for the tab titles',
    },
    titleColor: {
      control: 'color',
      description: 'Color of the inactive tab title',
    },
    titleColorActive: {
      control: 'color',
      description: 'Color of the active tab title',
    },
    titleSize: {
      control: 'select',
      description: 'Size of the tab titles',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
  },
  component: TabSwitch,
  decorators: [
    (Story: any) => (
      <Box className="flex-1">
        <Story />
      </Box>
    ),
  ],
  title: 'components/TabSwitch',
};

export default meta;
type Story = StoryObj<typeof TabSwitch>;

function LeftContent() {
  return (
    <Box className="flex-1 items-center justify-center" style={{ backgroundColor: '#FCA5A5' }}>
      <String>Left Content</String>
    </Box>
  );
}

function RightContent() {
  return (
    <Box className="flex-1 items-center justify-center" style={{ backgroundColor: '#7DD3FC' }}>
      <String>Right Content</String>
    </Box>
  );
}

export const Default: Story = {
  args: {
    activeSeparatorColor: '#FCA5A5',
    leftRender: <LeftContent />,
    leftScreenTitle: 'Left Tab',
    leftTabColor: '#CBD2D9',
    leftTabColorActive: '#7DD3FC',
    rightRender: <RightContent />,
    rightScreenTitle: 'Right Tab',
    rightTabColor: '#CBD2D9',
    rightTabColorActive: '#7DD3FC',
    separatorColor: 'black',
    titleColor: '#64748B',
    titleColorActive: '#1E293B',
    titleSize: 'lg',
  },
};

export const CustomColors: Story = {
  args: {
    activeSeparatorColor: '#60A5FA',
    leftRender: <LeftContent />,
    leftScreenTitle: 'Custom Left',
    leftTabColor: '#E2E8F0',
    leftTabColorActive: '#60A5FA',
    rightRender: <RightContent />,
    rightScreenTitle: 'Custom Right',
    rightTabColor: '#E2E8F0',
    rightTabColorActive: '#60A5FA',
    titleColor: '#64748B',
    titleColorActive: '#1E293B',
  },
};

export const WithCustomTitles: Story = {
  args: {
    leftRender: <LeftContent />,
    leftScreenTitle: 'Profile',
    rightRender: <RightContent />,
    rightScreenTitle: 'Settings',
    titleColor: '#64748B',
    titleColorActive: '#1E293B',
    titleSize: 'xl',
  },
};
