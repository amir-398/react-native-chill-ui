import { createContext, useContext } from 'react';

/**
 * Time values stored by mode
 */
export interface TimePickerValues {
  hour?: number;
  minute?: number;
  second?: number;
}

/**
 * Context for TimePicker state
 */
export interface TimePickerStateContextValue {
  itemSize: number;
  defaultTime?: Date;
  values: TimePickerValues;
}

/**
 * Context for TimePicker actions
 */
export interface TimePickerActionsContextValue {
  setItemSize: (size: number) => void;
  updateValue: (mode: 'hour' | 'minute' | 'second', value: number) => void;
}

export const TimePickerStateContext = createContext<TimePickerStateContextValue | undefined>(undefined);

export const TimePickerActionsContext = createContext<TimePickerActionsContextValue | undefined>(undefined);

/**
 * Hook to access TimePicker state context
 */
export function useTimePickerState(): TimePickerStateContextValue {
  const context = useContext(TimePickerStateContext);
  if (!context) {
    throw new Error('useTimePickerState must be used within a TimePicker');
  }
  return context;
}

/**
 * Hook to access TimePicker actions context
 */
export function useTimePickerActions(): TimePickerActionsContextValue {
  const context = useContext(TimePickerActionsContext);
  if (!context) {
    throw new Error('useTimePickerActions must be used within a TimePicker');
  }
  return context;
}
