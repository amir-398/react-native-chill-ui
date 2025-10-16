import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { useState } from 'react';
import { fn } from 'storybook/test';

import UiPresentation from './storybook/UiPresentation';
import {
  Box,
  String,
  TimePicker,
  TimePickerContent,
  TimePickerTitle,
  TimePickerScroller,
  Separator,
} from '../src/components';

const meta: Meta<typeof TimePicker> = {
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
  parameters: {
    docs: {
      description: {
        story: 'Basic time picker with hours and minutes in 24h format',
      },
    },
  },
  render: () => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="hour">
        <TimePickerTitle>Hours</TimePickerTitle>
        <TimePickerScroller mode="hour" />
      </TimePickerContent>

      <Separator />

      <TimePickerContent name="minute">
        <TimePickerTitle>Minutes</TimePickerTitle>
        <TimePickerScroller mode="minute" />
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
  render: () => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="hour">
        <TimePickerTitle>H</TimePickerTitle>
        <TimePickerScroller mode="hour" />
      </TimePickerContent>

      <Separator />

      <TimePickerContent name="minute">
        <TimePickerTitle>M</TimePickerTitle>
        <TimePickerScroller mode="minute" />
      </TimePickerContent>

      <Separator />

      <TimePickerContent name="second">
        <TimePickerTitle>S</TimePickerTitle>
        <TimePickerScroller mode="second" />
      </TimePickerContent>
    </TimePicker>
  ),
};

export const Format12Hour: Story = {
  parameters: {
    docs: {
      description: {
        story: '12-hour format time picker with AM/PM selector',
      },
    },
  },
  render: () => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="hour">
        <TimePickerTitle>Hour</TimePickerTitle>
        <TimePickerScroller mode="hour" format="12h" />
      </TimePickerContent>

      <Separator />

      <TimePickerContent name="minute">
        <TimePickerTitle>Min</TimePickerTitle>
        <TimePickerScroller mode="minute" />
      </TimePickerContent>

      <TimePickerContent name="period">
        <TimePickerTitle>Period</TimePickerTitle>
        <TimePickerScroller mode="custom" data={['AM', 'PM']} />
      </TimePickerContent>
    </TimePicker>
  ),
};

export const WithIntervals: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with 15-minute intervals (00, 15, 30, 45)',
      },
    },
  },
  render: () => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="hour">
        <TimePickerTitle>Hours</TimePickerTitle>
        <TimePickerScroller mode="hour" />
      </TimePickerContent>

      <Separator />

      <TimePickerContent name="minute">
        <TimePickerTitle>Minutes (15 min intervals)</TimePickerTitle>
        <TimePickerScroller mode="minute" interval={15} />
      </TimePickerContent>
    </TimePicker>
  ),
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Controlled time picker with state management',
      },
    },
  },
  render: () => {
    const [time, setTime] = useState({ hour: 12, minute: 30 });

    return (
      <Box className="gap-4">
        <String className="text-center text-lg">
          Selected: {time.hour}:{time.minute.toString().padStart(2, '0')}
        </String>

        <TimePicker
          value={time}
          onTimeChange={(newTime: any) => {
            setTime(newTime as { hour: number; minute: number });
            fn()('onTimeChange', newTime);
          }}
        >
          <TimePickerContent name="hour">
            <TimePickerTitle>Hours</TimePickerTitle>
            <TimePickerScroller mode="hour" />
          </TimePickerContent>

          <Separator />

          <TimePickerContent name="minute">
            <TimePickerTitle>Minutes</TimePickerTitle>
            <TimePickerScroller mode="minute" />
          </TimePickerContent>
        </TimePicker>
      </Box>
    );
  },
};

export const WithoutTitles: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Compact time picker without titles',
      },
    },
  },
  render: () => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="hour">
        <TimePickerScroller mode="hour" />
      </TimePickerContent>

      <Separator />

      <TimePickerContent name="minute">
        <TimePickerScroller mode="minute" />
      </TimePickerContent>
    </TimePicker>
  ),
};

export const CustomSeparator: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with custom separator ("-" instead of ":")',
      },
    },
  },
  render: () => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="hour">
        <TimePickerTitle>H</TimePickerTitle>
        <TimePickerScroller mode="hour" />
      </TimePickerContent>

      <Separator>-</Separator>

      <TimePickerContent name="minute">
        <TimePickerTitle>M</TimePickerTitle>
        <TimePickerScroller mode="minute" />
      </TimePickerContent>

      <Separator>-</Separator>

      <TimePickerContent name="second">
        <TimePickerTitle>S</TimePickerTitle>
        <TimePickerScroller mode="second" />
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
        <TimePickerScroller mode="hour" className="rounded-lg bg-white/20 backdrop-blur" />
      </TimePickerContent>

      <Separator className="text-3xl font-bold text-white">:</Separator>

      <TimePickerContent name="minute" className="mx-2">
        <TimePickerTitle className="text-sm font-bold uppercase text-white">Minutes</TimePickerTitle>
        <TimePickerScroller mode="minute" className="rounded-lg bg-white/20 backdrop-blur" />
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
        <TimePickerScroller mode="hour" />
      </TimePickerContent>

      <Separator />

      <TimePickerContent name="minute">
        <TimePickerTitle>Minutes (5 min)</TimePickerTitle>
        <TimePickerScroller mode="minute" interval={5} />
      </TimePickerContent>
    </TimePicker>
  ),
};

export const ThirtyMinuteIntervals: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with 30-minute intervals (00, 30)',
      },
    },
  },
  render: () => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="hour">
        <TimePickerTitle>Hours</TimePickerTitle>
        <TimePickerScroller mode="hour" />
      </TimePickerContent>

      <Separator />

      <TimePickerContent name="minute">
        <TimePickerTitle>Minutes (30 min)</TimePickerTitle>
        <TimePickerScroller mode="minute" interval={30} />
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
        <TimePickerScroller mode="hour" />
      </TimePickerContent>
    </TimePicker>
  ),
};

export const MinuteSecondOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time picker with only minutes and seconds (useful for timers)',
      },
    },
  },
  render: () => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="minute">
        <TimePickerTitle>Minutes</TimePickerTitle>
        <TimePickerScroller mode="minute" />
      </TimePickerContent>

      <Separator />

      <TimePickerContent name="second">
        <TimePickerTitle>Seconds</TimePickerTitle>
        <TimePickerScroller mode="second" />
      </TimePickerContent>
    </TimePicker>
  ),
};

export const CustomModeAgePicker: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Custom mode used as an age picker (1-100)',
      },
    },
  },
  render: () => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="age">
        <TimePickerTitle>Age</TimePickerTitle>
        <TimePickerScroller mode="custom" data={Array.from({ length: 100 }, (_, i) => i + 1)} />
      </TimePickerContent>
    </TimePicker>
  ),
};

export const CustomModeSizePicker: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Custom mode used as a size picker',
      },
    },
  },
  render: () => (
    <TimePicker onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="size">
        <TimePickerTitle>T-Shirt Size</TimePickerTitle>
        <TimePickerScroller mode="custom" data={['XS', 'S', 'M', 'L', 'XL', 'XXL']} />
      </TimePickerContent>
    </TimePicker>
  ),
};

export const CompactDarkTheme: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Compact time picker with dark theme',
      },
    },
  },
  render: () => (
    <TimePicker className="rounded-lg bg-gray-900 p-4" onTimeChange={fn()('onTimeChange')}>
      <TimePickerContent name="hour">
        <TimePickerScroller mode="hour" />
      </TimePickerContent>

      <Separator className="text-2xl font-bold text-gray-400">:</Separator>

      <TimePickerContent name="minute">
        <TimePickerScroller mode="minute" />
      </TimePickerContent>
    </TimePicker>
  ),
};

export const AppointmentScheduler: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Appointment scheduling with 30-minute intervals',
      },
    },
  },
  render: () => {
    const [appointment, setAppointment] = useState({ hour: 9, minute: 0 });

    return (
      <Box className="gap-4 rounded-xl bg-white p-6 shadow-lg">
        <String className="text-2xl font-bold text-gray-800">Schedule Appointment</String>

        <String className="text-center text-xl font-semibold text-blue-600">
          {appointment.hour}:{appointment.minute.toString().padStart(2, '0')}
        </String>

        <TimePicker
          value={appointment}
          onTimeChange={(newTime: any) => {
            setAppointment(newTime as { hour: number; minute: number });
            fn()('onTimeChange', newTime);
          }}
        >
          <TimePickerContent name="hour" className="mx-3">
            <TimePickerTitle className="mb-1 text-xs font-semibold uppercase text-gray-500">Hour</TimePickerTitle>
            <TimePickerScroller mode="hour" />
          </TimePickerContent>

          <Separator className="text-2xl font-bold text-gray-300" />

          <TimePickerContent name="minute" className="mx-3">
            <TimePickerTitle className="mb-1 text-xs font-semibold uppercase text-gray-500">Min</TimePickerTitle>
            <TimePickerScroller mode="minute" interval={30} />
          </TimePickerContent>
        </TimePicker>

        <String className="text-center text-sm text-gray-500">Select your preferred time slot</String>
      </Box>
    );
  },
};

export const AlarmClock: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Alarm clock interface with 12h format',
      },
    },
  },
  render: () => {
    const [alarm, setAlarm] = useState({ hour: 7, minute: 30, period: 0 });

    return (
      <Box className="gap-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 shadow-2xl">
        <String className="text-center text-3xl font-bold text-white">Set Alarm</String>

        <String className="text-center text-5xl font-bold text-white">
          {alarm.hour}:{alarm.minute.toString().padStart(2, '0')} {alarm.period === 0 ? 'AM' : 'PM'}
        </String>

        <TimePicker
          value={alarm}
          onTimeChange={(newTime: any) => {
            setAlarm(newTime as { hour: number; minute: number; period: number });
            fn()('onTimeChange', newTime);
          }}
        >
          <TimePickerContent name="hour" className="mx-2">
            <TimePickerScroller mode="hour" format="12h" className="rounded-lg bg-white/10 backdrop-blur" />
          </TimePickerContent>

          <Separator className="text-4xl font-bold text-white/80">:</Separator>

          <TimePickerContent name="minute" className="mx-2">
            <TimePickerScroller mode="minute" className="rounded-lg bg-white/10 backdrop-blur" />
          </TimePickerContent>

          <TimePickerContent name="period" className="mx-2">
            <TimePickerScroller mode="custom" data={['AM', 'PM']} className="rounded-lg bg-white/10 backdrop-blur" />
          </TimePickerContent>
        </TimePicker>
      </Box>
    );
  },
};

export const CountdownTimer: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Countdown timer with minutes and seconds',
      },
    },
  },
  render: () => {
    const [timer, setTimer] = useState({ minute: 5, second: 0 });

    return (
      <Box className="gap-4 rounded-xl bg-gray-800 p-6 shadow-xl">
        <String className="text-center text-2xl font-bold text-white">Set Timer</String>

        <String className="text-center font-mono text-4xl font-bold text-green-400">
          {timer.minute.toString().padStart(2, '0')}:{timer.second.toString().padStart(2, '0')}
        </String>

        <TimePicker
          value={timer}
          onTimeChange={(newTime: any) => {
            setTimer(newTime as { minute: number; second: number });
            fn()('onTimeChange', newTime);
          }}
        >
          <TimePickerContent name="minute" className="mx-3">
            <TimePickerTitle className="text-sm font-bold uppercase text-gray-400">Minutes</TimePickerTitle>
            <TimePickerScroller mode="minute" className="rounded-lg bg-gray-700" />
          </TimePickerContent>

          <Separator className="text-3xl font-bold text-gray-500">:</Separator>

          <TimePickerContent name="second" className="mx-3">
            <TimePickerTitle className="text-sm font-bold uppercase text-gray-400">Seconds</TimePickerTitle>
            <TimePickerScroller mode="second" interval={10} className="rounded-lg bg-gray-700" />
          </TimePickerContent>
        </TimePicker>

        <String className="text-center text-sm text-gray-400">Set your countdown timer</String>
      </Box>
    );
  },
};
