import type { Meta, StoryObj } from '@storybook/react';

import Box from '../src/components/box/Box';
import UiPresentation from './storybook/UiPresentation';

const meta: Meta<typeof Box> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'The class name of the box',
    },
  },
  component: Box,
  decorators: [
    Story => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'UI/Box',
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    className: 'w-20 h-20 bg-primary',
    style: {
      backgroundColor: 'black',
      height: 40,
      width: 40,
    },
  },
};

export const WithBorder: Story = {
  args: {
    className: 'w-20 h-20 bg-white border border-primary rounded-lg',
    style: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderRadius: 10,
      borderWidth: 1,
      height: 40,
      width: 40,
    },
  },
};

export const WithShadow: Story = {
  args: {
    className: 'w-20 h-20 bg-white shadow-lg rounded-lg',
    style: {
      backgroundColor: 'white',
      borderRadius: 10,
      boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
      height: 40,
      width: 40,
    },
  },
};

export const WithPadding: Story = {
  args: {
    className: 'w-20 h-20 bg-primary p-4',
    style: {
      backgroundColor: 'black',
      height: 40,
      padding: 16,
      width: 40,
    },
  },
};

export const WithMargin: Story = {
  args: {
    className: 'w-20 h-20 bg-primary m-4',
    style: {
      backgroundColor: 'black',
      height: 40,
      margin: 16,
      width: 40,
    },
  },
};

export const Rounded: Story = {
  args: {
    className: 'w-20 h-20 bg-primary rounded-full',
    style: {
      backgroundColor: 'black',
      borderRadius: 100,
      height: 40,
      width: 40,
    },
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <UiPresentation>
      <Box className="bg-primary m-2 h-10 w-10" style={{ backgroundColor: 'black', height: 20, width: 20 }} />
      <Box className="bg-primary m-2 h-20 w-20" style={{ backgroundColor: 'black', height: 40, width: 40 }} />
      <Box className="bg-primary m-2 h-32 w-32" style={{ backgroundColor: 'black', height: 64, width: 64 }} />
    </UiPresentation>
  ),
};

export const DifferentColors: Story = {
  render: () => (
    <UiPresentation>
      <Box className="bg-primary m-2 h-20 w-20" style={{ backgroundColor: 'black', height: 40, width: 40 }} />
      <Box className="bg-secondary m-2 h-20 w-20" style={{ backgroundColor: 'white', height: 40, width: 40 }} />
      <Box className="bg-tertiary m-2 h-20 w-20" style={{ backgroundColor: 'blue', height: 40, width: 40 }} />
      <Box className="bg-danger m-2 h-20 w-20" style={{ backgroundColor: 'red', height: 40, width: 40 }} />
    </UiPresentation>
  ),
};
