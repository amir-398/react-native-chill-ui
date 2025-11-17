import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { fn } from 'storybook/test';

import UiPresentation from './storybook/UiPresentation';
import {
  TimePickerTw as TimePicker,
  TimePickerContentTw as TimePickerContent,
  TimePickerTitleTw as TimePickerTitle,
  TimePickerItemTw as TimePickerItem,
  TimePickerScrollerTw as TimePickerScroller,
  SeparatorTw as Separator,
} from '../src/components';

const meta: Meta<typeof TimePicker> = {
  args: {
    onTimeChange: fn()('onTimeChange'),
  },
  argTypes: {
    // TimePicker Props
    className: {
      control: 'text',
      description: 'Custom CSS classes for styling (Nativewind only)',
      table: {
        category: 'TimePicker Props',
        type: { summary: 'string' },
      },
    },
    defaultTime: {
      control: 'object',
      description: 'Default time as Date object (use createTimePickerDate() helper to avoid timezone display issues)',
      table: {
        category: 'TimePicker Props',
        type: { summary: 'Date' },
      },
    },
    onTimeChange: {
      action: 'onTimeChange',
      description:
        'Callback function called when time changes (returns TimePickerValue object with hour, minute, second, formatted string, and Date object)',
      table: {
        category: 'TimePicker Props',
        type: { summary: '(time: TimePickerValue) => void' },
      },
    },
    style: {
      control: 'object',
      description: 'Custom styles for the TimePicker',
      table: {
        category: 'TimePicker Props',
        type: { summary: 'StyleProp<ViewStyle>' },
      },
    },
    ViewProps: {
      control: 'object',
      description: 'Accept all View props',
      table: {
        category: 'TimePicker Props',
      },
    },

    // TimePickerScroller Props
    'className²': {
      control: 'text',
      description: 'Custom CSS classes for styling (Nativewind only)',
      table: {
        category: 'TimePickerScroller Props',
        type: { summary: 'string' },
      },
    },
    data: {
      control: 'object',
      description: 'Array of data to display in the scroller',
      table: {
        category: 'TimePickerScroller Props',
        type: { summary: '(string | number)[]' },
      },
    },
    defaultValue: {
      control: 'number',
      description: 'Default value for the scroller',
      table: {
        category: 'TimePickerScroller Props',
        type: { summary: 'number' },
      },
    },
    interval: {
      control: 'number',
      description: 'Interval for the scroller (e.g., 5 for 5-minute intervals)',
      table: {
        category: 'TimePickerScroller Props',
        type: { summary: 'number' },
      },
    },
    mode: {
      control: 'select',
      description: 'Mode for the scroller (hour, minute, or second)',
      options: ['hour', 'minute', 'second'],
      table: {
        category: 'TimePickerScroller Props',
        type: { summary: "'hour' | 'minute' | 'second'" },
      },
    },
    onChange: {
      action: 'onChange',
      description: 'Callback function called when the value changes',
      table: {
        category: 'TimePickerScroller Props',
        type: { summary: '(value: number) => void' },
      },
    },
    'style⁴': {
      control: 'object',
      description: 'Custom styling for the scroller',
      table: {
        category: 'TimePickerScroller Props',
        type: { summary: 'StyleProp<ViewStyle>' },
      },
    },

    // TimePickerContent Props
    'className³': {
      control: 'text',
      description: 'Custom CSS classes for styling (Nativewind only)',
      table: {
        category: 'TimePickerContent Props',
        type: { summary: 'string' },
      },
    },
    'style²': {
      control: 'object',
      description: 'Custom styling for the content container',
      table: {
        category: 'TimePickerContent Props',
        type: { summary: 'StyleProp<ViewStyle>' },
      },
    },
    'ViewProps²': {
      control: 'object',
      description: 'Accept all View props',
      table: {
        category: 'TimePickerContent Props',
      },
    },

    // TimePickerItem Props
    'className⁴': {
      control: 'text',
      description: 'Custom CSS classes for styling (Nativewind only)',
      table: {
        category: 'TimePickerItem Props',
        type: { summary: 'string' },
      },
    },
    stringProps: {
      control: 'object',
      description: 'Accept all String props',
      table: {
        category: 'TimePickerItem Props',
        type: { summary: 'StringProps' },
      },
    },
    'style³': {
      control: 'object',
      description: 'Custom styling for the item',
      table: {
        category: 'TimePickerItem Props',
        type: { summary: 'StyleProp<ViewStyle>' },
      },
    },
  },
  component: TimePicker,
  decorators: [
    (Story: any) => (
      <UiPresentation>
        <Story />
      </UiPresentation>
    ),
  ],
  subcomponents: {
    TimePickerContent,
    TimePickerScroller,
    TimePickerTitle,
  },
  title: 'FORMS/TimePicker',
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic time picker with hours and minutes in 24h format',
      },
    },
  },
  render: (_args: any) => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="hour">
        <TimePickerTitle>Hours</TimePickerTitle>
        <TimePickerScroller mode="hour">
          <TimePickerItem />
        </TimePickerScroller>
      </TimePickerContent>

      <Separator />

      <TimePickerContent name="minute">
        <TimePickerTitle>Minutes</TimePickerTitle>
        <TimePickerScroller mode="minute">
          <TimePickerItem />
        </TimePickerScroller>
      </TimePickerContent>
    </TimePicker>
  ),
};

export const WithSeconds: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with hours, minutes, and seconds',
      },
    },
  },
  render: (_args: any) => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="hour">
        <TimePickerTitle>H</TimePickerTitle>
        <TimePickerScroller mode="hour">
          <TimePickerItem />
        </TimePickerScroller>
      </TimePickerContent>

      <Separator />

      <TimePickerContent name="minute">
        <TimePickerTitle>M</TimePickerTitle>
        <TimePickerScroller mode="minute">
          <TimePickerItem />
        </TimePickerScroller>
      </TimePickerContent>

      <Separator />

      <TimePickerContent name="second">
        <TimePickerTitle>S</TimePickerTitle>
        <TimePickerScroller mode="second">
          <TimePickerItem />
        </TimePickerScroller>
      </TimePickerContent>
    </TimePicker>
  ),
};

export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with custom gradient styling and transparency effects',
      },
    },
  },
  render: () => (
    <TimePicker className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-6 shadow-xl">
      <TimePickerContent name="hour" className="mx-2">
        <TimePickerTitle className="text-sm font-bold uppercase text-white">Hours</TimePickerTitle>
        <TimePickerScroller mode="hour" className="rounded-lg bg-white/20 backdrop-blur">
          <TimePickerItem />
        </TimePickerScroller>
      </TimePickerContent>

      <Separator className="text-3xl font-bold text-white">:</Separator>

      <TimePickerContent name="minute" className="mx-2">
        <TimePickerTitle className="text-sm font-bold uppercase text-white">Minutes</TimePickerTitle>
        <TimePickerScroller mode="minute" className="rounded-lg bg-white/20 backdrop-blur">
          <TimePickerItem />
        </TimePickerScroller>
      </TimePickerContent>
    </TimePicker>
  ),
};

export const FiveMinuteIntervals: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with 5-minute intervals',
      },
    },
  },
  render: () => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="hour">
        <TimePickerTitle>Hours</TimePickerTitle>
        <TimePickerScroller mode="hour">
          <TimePickerItem />
        </TimePickerScroller>
      </TimePickerContent>

      <Separator />

      <TimePickerContent name="minute">
        <TimePickerTitle>Minutes (5 min)</TimePickerTitle>
        <TimePickerScroller mode="minute" interval={5}>
          <TimePickerItem />
        </TimePickerScroller>
      </TimePickerContent>
    </TimePicker>
  ),
};

export const HourOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with only hour selection',
      },
    },
  },
  render: () => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="hour">
        <TimePickerTitle>Select Hour</TimePickerTitle>
        <TimePickerScroller mode="hour">
          <TimePickerItem />
        </TimePickerScroller>
      </TimePickerContent>
    </TimePicker>
  ),
};
