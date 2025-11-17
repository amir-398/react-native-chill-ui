import { useEffect } from 'react';
import { TimePickerValueTw } from '@types';

import { useTimePickerState } from '../context/TimePickerContext';

type UseTimePickerProps = {
  onTimeChange?: (time: TimePickerValueTw) => void;
};

export const useTimePicker = ({ onTimeChange }: UseTimePickerProps) => {
  const { values } = useTimePickerState();
  useEffect(() => {
    if (!onTimeChange) return;

    const { hour, minute, second } = values;

    // Format time string based on which modes are present
    const parts: string[] = [];

    if (hour !== undefined) {
      parts.push(hour.toString().padStart(2, '0'));
    }

    if (minute !== undefined) {
      parts.push(minute.toString().padStart(2, '0'));
    }

    if (second !== undefined) {
      parts.push(second.toString().padStart(2, '0'));
    }

    // Only call onTimeChange if at least one value exists
    if (parts.length > 0) {
      const formattedTime = parts.join(':');

      // Create a Date object with today's date and the selected time (in UTC to avoid timezone display issues)
      let date: Date | undefined;
      if (hour !== undefined || minute !== undefined || second !== undefined) {
        date = new Date();
        date.setUTCHours(hour !== undefined ? hour : 0);
        date.setUTCMinutes(minute !== undefined ? minute : 0);
        date.setUTCSeconds(second !== undefined ? second : 0);
        date.setUTCMilliseconds(0);
      }

      const timeValue = {
        date,
        formatted: formattedTime,
        hour,
        minute,
        second,
      };

      onTimeChange(timeValue);
    }
  }, [values, onTimeChange]);
};
