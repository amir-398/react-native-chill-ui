import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import UiPresentation from './storybook';
import { SegmentedControl } from '../src/components';

const meta: Meta<typeof SegmentedControl> = {
  argTypes: {
    activeItemTextClassName: {
      control: 'text',
      description: 'CSS classes for the active option text',
    },
    activeItemTextColor: {
      control: 'color',
      description: 'Color for the active option text',
    },
    className: {
      control: 'text',
      description: 'CSS classes for the container',
    },
    defaultOption: {
      control: 'text',
      description: 'Initially selected option',
    },
    externalPadding: {
      control: 'number',
      description: 'Padding from screen edges',
    },
    inactiveItemTextColor: {
      control: 'color',
      description: 'Color for the inactive option text',
    },
    internalPadding: {
      control: 'number',
      description: 'Padding between options',
    },
    itemClassName: {
      control: 'text',
      description: 'CSS classes for the selected item indicator',
    },
    itemTextClassName: {
      control: 'text',
      description: 'CSS classes for the option text',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when selection changes',
    },
    options: {
      control: 'object',
      description: 'Array of options to display',
    },
  },
  component: SegmentedControl,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  title: 'components/SegmentedControl',
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  args: {
    defaultOption: 'Week',
    onChange: action('onChange'),
    options: ['Day', 'Week', 'Month'],
  },
};

export const DarkTheme: Story = {
  args: {
    activeItemTextClassName: 'text-black',
    className: 'bg-dark border-white/30',
    defaultOption: 'Active',
    itemClassName: 'bg-white',
    itemTextClassName: 'text-white',
    onChange: action('onChange'),
    options: ['All', 'Active', 'Completed'],
  },
};

export const ModernMinimal: Story = {
  args: {
    className: 'bg-gray-100 border-none shadow-lg',
    defaultOption: 'M',
    internalPadding: 4,
    itemClassName: 'bg-secondary shadow-md',
    itemTextClassName: 'text-gray-800 font-medium',
    onChange: action('onChange'),
    options: ['S', 'M', 'L', 'XL'],
  },
};

export const ColorfulTheme: Story = {
  args: {
    className: 'bg-purple-100 border-purple-300',
    defaultOption: 'Design',
    itemClassName: 'bg-purple-500',
    itemTextClassName: 'text-purple-700 font-semibold',
    onChange: action('onChange'),
    options: ['Design', 'Develop', 'Deploy'],
  },
};

export const RoundedStyle: Story = {
  args: {
    className: 'bg-blue-50 border-blue-200 rounded-full h-12',
    defaultOption: 'Personal',
    internalPadding: 8,
    itemClassName: 'bg-secondary rounded-full',
    itemTextClassName: 'text-blue-800 font-medium',
    onChange: action('onChange'),
    options: ['Personal', 'Team', 'Company'],
  },
};

export const OutlinedStyle: Story = {
  args: {
    className: 'bg-transparent border-2 border-primary',
    defaultOption: 'Monthly',
    itemClassName: 'bg-primary/50',
    itemTextClassName: 'text-primary font-bold',
    onChange: action('onChange'),
    options: ['Weekly', 'Monthly', 'Yearly'],
  },
};

export const CustomSpacing: Story = {
  args: {
    className: 'bg-white border-gray-200',
    defaultOption: 'Option 2',
    externalPadding: 60,
    internalPadding: 20,
    onChange: action('onChange'),
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
};
