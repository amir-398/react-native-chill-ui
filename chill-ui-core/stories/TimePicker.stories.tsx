import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { Box } from '../src/components';
import UiPresentation from './storybook/UiPresentation';
import { TimePicker } from '../src/components/timePicker';

const meta: Meta<typeof TimePicker> = {
  argTypes: {
    configs: {
      control: 'object',
      description: 'Additional configuration options',
    },
    current: {
      control: 'text',
      description: 'Current time value',
    },
    minuteInterval: {
      control: 'select',
      description: 'Interval between minutes',
      options: [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60],
    },
    onTimeChange: {
      action: 'onTimeChange',
      description: 'Callback when time changes',
    },
    options: {
      control: 'object',
      description: 'Custom styling options',
      table: {
        type: {
          detail: `{
  backgroundColor: string;
  textHeaderColor: string;
  textDefaultColor: string;
  selectedTextColor: string;
  mainColor: string;
  textSecondaryColor: string;
  borderColor: string;
  defaultFont: string;
  headerFont: string;
  textFontSize: number;
  textHeaderFontSize: number;
  headerAnimationDistance: number;
  daysAnimationDistance: number;
  height: number;
}`,
          summary: 'object',
        },
      },
    },
    selected: {
      control: 'text',
      description: 'Selected time value',
    },
    style: {
      control: 'object',
      description: 'Custom styles for the TimePicker',
    },
  },
  component: TimePicker,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Box className="w-full p-4">
          <Story />
        </Box>
      </UiPresentation>
    ),
  ],
  title: 'components/TimePicker',
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    current: '12:00',
    minuteInterval: 5,
    onTimeChange: action('onTimeChange'),
    options: {
      backgroundColor: '#ffffff',
      borderColor: '#e0e0e0',
      daysAnimationDistance: 20,
      defaultFont: 'System',
      headerAnimationDistance: 20,
      headerFont: 'System',
      height: 250,
      mainColor: '#007AFF',
      selectedTextColor: '#000000',
      textDefaultColor: '#333333',
      textFontSize: 16,
      textHeaderColor: '#000000',
      textHeaderFontSize: 18,
      textSecondaryColor: '#666666',
    },
    selected: '12:00',
  },
};

export const CustomInterval: Story = {
  args: {
    current: '09:30',
    minuteInterval: 15,
    onTimeChange: action('onTimeChange'),
    options: {
      backgroundColor: '#ffffff',
      borderColor: '#e0e0e0',
      daysAnimationDistance: 20,
      defaultFont: 'System',
      headerAnimationDistance: 20,
      headerFont: 'System',
      height: 250,
      mainColor: '#007AFF',
      selectedTextColor: '#000000',
      textDefaultColor: '#333333',
      textFontSize: 16,
      textHeaderColor: '#000000',
      textHeaderFontSize: 18,
      textSecondaryColor: '#666666',
    },
    selected: '09:30',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with 15-minute intervals',
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    current: '14:45',
    minuteInterval: 5,
    onTimeChange: action('onTimeChange'),
    options: {
      backgroundColor: '#f0f0f0',
      borderColor: '#e0e0e0',
      daysAnimationDistance: 20,
      defaultFont: 'System',
      headerAnimationDistance: 20,
      headerFont: 'System',
      height: 250,
      mainColor: '#4CAF50',
      selectedTextColor: '#4CAF50',
      textDefaultColor: '#333333',
      textFontSize: 16,
      textHeaderColor: '#4CAF50',
      textHeaderFontSize: 18,
      textSecondaryColor: '#666666',
    },
    selected: '14:45',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with custom colors and typography',
      },
    },
  },
};

export const DarkTheme: Story = {
  args: {
    current: '20:15',
    minuteInterval: 5,
    onTimeChange: action('onTimeChange'),
    options: {
      backgroundColor: '#1a1a1a',
      borderColor: '#333333',
      daysAnimationDistance: 20,
      defaultFont: 'System',
      headerAnimationDistance: 20,
      headerFont: 'System',
      height: 250,
      mainColor: '#61dafb',
      selectedTextColor: '#61dafb',
      textDefaultColor: '#ffffff',
      textFontSize: 16,
      textHeaderColor: '#61dafb',
      textHeaderFontSize: 18,
      textSecondaryColor: '#999999',
    },
    selected: '20:15',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimePicker with dark theme colors',
      },
    },
  },
};
