import { PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { TimePickerActionsContext, TimePickerStateContext, TimePickerValues } from '../context/TimePickerContext';

type TimePickerProviderProps = {
  defaultTime?: Date;
};

export function TimePickerProvider(props: PropsWithChildren<TimePickerProviderProps>) {
  const { children, defaultTime } = props;
  const [itemSize, setItemSize] = useState(0);
  const [values, setValues] = useState<TimePickerValues>({});

  const updateValue = useCallback((mode: 'hour' | 'minute' | 'second', newValue: number) => {
    setValues(prev => ({ ...prev, [mode]: newValue }));
  }, []);

  const value = useMemo(() => ({ defaultTime, itemSize, values }), [defaultTime, itemSize, values]);

  const actions = useMemo(() => ({ setItemSize, updateValue }), [setItemSize, updateValue]);

  return (
    <TimePickerStateContext.Provider value={value}>
      <TimePickerActionsContext.Provider value={actions}>{children}</TimePickerActionsContext.Provider>
    </TimePickerStateContext.Provider>
  );
}

TimePickerProvider.displayName = 'TimePickerProvider';
