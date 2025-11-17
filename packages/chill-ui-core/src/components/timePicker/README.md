# TimePicker Component

A React Native component that provides a beautiful and customizable time selection interface with animated scrolling pickers. Built with React Native's Animated API for native performance, featuring smooth animations, composable architecture, and intelligent timezone handling across three different styling approaches.

## Available Versions

This component comes in three versions to match your project's styling approach. You choose the version during installation, but the import statement remains consistent across all versions:

### 1. **StyleSheet Version**

- Uses React Native's built-in StyleSheet API
- Perfect for projects that don't use CSS-in-JS libraries
- Lightweight and performant
- Install: `npm install react-native-chill-ui@stylesheet`

### 2. **Tailwind Version**

- Uses NativeWind/Tailwind CSS classes
- Ideal for projects already using Tailwind CSS
- Requires NativeWind setup and Tailwind configuration
- Install: `npm install react-native-chill-ui@tailwind`

### 3. **Hybrid Version**

- Automatically detects if NativeWind is available
- Falls back to StyleSheet if NativeWind is not installed
- Best for component libraries or projects that need flexibility
- Install: `npm install react-native-chill-ui@hybrid`

**Note**: Regardless of the version you choose, the import statement remains the same: `import { TimePicker } from 'react-native-chill-ui'`

## Features

- **Composable Architecture**: Mix and match scrollers for hours, minutes, and seconds
- **Auto-Generated Data**: Automatically creates time values based on mode (hour/minute/second)
- **Custom Intervals**: Support for 5-minute, 15-minute, or any custom interval
- **Smooth Animations**: Native driver animations with opacity and scale transitions
- **Default Time Support**: Initialize with current time or any Date object
- **Timezone-Safe**: Helper function to avoid timezone display confusion
- **Auto-Rounding**: Automatically rounds default values to nearest interval
- **Flexible Styling**: Support for NativeWind classes and StyleSheet objects
- **TypeScript Support**: Fully typed for a better development experience
- **Accessibility**: Inherits all React Native accessibility features
- **Performance Optimized**: Separate contexts for state and actions to prevent unnecessary re-renders

## Quick Start

```tsx
import {
  TimePicker,
  TimePickerContent,
  TimePickerScroller,
  TimePickerItem,
  TimePickerTitle,
  getTimePickerDateNow,
} from 'react-native-chill-ui';

// Basic time picker (hours and minutes)
<TimePicker
  onTimeChange={(time) => {
    console.log(time.formatted); // "14:30"
    console.log(time.hour);      // 14
    console.log(time.date);      // Date object
  }}
>
  <TimePickerContent>
    <TimePickerScroller mode="hour">
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="minute">
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>

// With default time and intervals
<TimePicker defaultTime={getTimePickerDateNow()}>
  <TimePickerContent>
    <TimePickerScroller mode="hour">
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="minute" interval={5}>
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="second">
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>
```

## Installation Guide

Choose the version that matches your project's styling approach:

| Version        | Command                                        | When to Use                                                                                          | Pros                                                                            | Cons                                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **StyleSheet** | `npm install react-native-chill-ui@stylesheet` | • No CSS-in-JS dependencies<br/>• Maximum performance priority<br/>• Simple React Native project     | • Lightweight<br/>• Fast<br/>• No dependencies                                  | • Limited styling flexibility                         |
| **Tailwind**   | `npm install react-native-chill-ui@tailwind`   | • Already using NativeWind<br/>• Team familiar with Tailwind<br/>• Design system based on utilities  | • Consistent with web Tailwind<br/>• Powerful utility system<br/>• Easy theming | • Requires NativeWind setup<br/>• Larger bundle size  |
| **Hybrid**     | `npm install react-native-chill-ui@hybrid`     | • Building component library<br/>• Uncertain about styling approach<br/>• Want maximum compatibility | • Works in any environment<br/>• Future-proof<br/>• Automatic detection         | • Slightly larger bundle<br/>• More complex internals |

## Configuration

### For Tailwind Version

If you chose the Tailwind version, ensure you have NativeWind properly configured:

```bash
npm install nativewind
npm install --save-dev tailwindcss
```

Configure your `tailwind.config.js`:

```js
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Core Components

### TimePicker

The root component that provides context for all child components.

**Props:**

| Prop           | Type                              | Default     | Description                                                         |
| -------------- | --------------------------------- | ----------- | ------------------------------------------------------------------- |
| `defaultTime`  | `Date`                            | `undefined` | Default time to initialize scrollers (use `getTimePickerDateNow()`) |
| `onTimeChange` | `(time: TimePickerValue) => void` | `undefined` | Callback called when time changes                                   |
| `className`    | `string`                          | `undefined` | TailwindCSS class name (Tailwind/Hybrid only)                       |
| `style`        | `StyleProp<ViewStyle>`            | `undefined` | StyleSheet styles                                                   |

**TimePickerValue Type:**

```typescript
type TimePickerValue = {
  hour?: number; // Selected hour (0-23)
  minute?: number; // Selected minute (0-59)
  second?: number; // Selected second (0-59)
  formatted: string; // Formatted time string (e.g., "14:30:45")
  date?: Date; // Date object in UTC
};
```

### TimePickerContent

Container that wraps TimePickerScroller components. Handles measurement and spacing.

**Props:**

| Prop        | Type                   | Default     | Description                                   |
| ----------- | ---------------------- | ----------- | --------------------------------------------- |
| `className` | `string`               | `undefined` | TailwindCSS class name (Tailwind/Hybrid only) |
| `style`     | `StyleProp<ViewStyle>` | `undefined` | StyleSheet styles                             |

### TimePickerScroller

Animated scrolling picker for time values. Auto-generates data based on mode.

**Props:**

| Prop           | Type                             | Default     | Description                                           |
| -------------- | -------------------------------- | ----------- | ----------------------------------------------------- |
| `mode`         | `'hour' \| 'minute' \| 'second'` | `'hour'`    | Mode to determine data generation                     |
| `interval`     | `number`                         | `1`         | Interval between values (e.g., 5 for every 5 minutes) |
| `defaultValue` | `number`                         | `0`         | Initial value (will be rounded to nearest interval)   |
| `data`         | `(string \| number)[]`           | `undefined` | Custom data array (overrides mode)                    |
| `onChange`     | `(value: number) => void`        | `undefined` | Callback when value is selected                       |
| `className`    | `string`                         | `undefined` | TailwindCSS class name (Tailwind/Hybrid only)         |
| `style`        | `StyleProp<ViewStyle>`           | `undefined` | StyleSheet styles                                     |

**Mode Behavior:**

- `mode="hour"`: Generates 0-23 (24-hour format)
- `mode="minute"`: Generates 0-59
- `mode="second"`: Generates 0-59

**Interval Examples:**

- `interval={1}`: 0, 1, 2, 3... (default)
- `interval={5}`: 0, 5, 10, 15, 20...
- `interval={15}`: 0, 15, 30, 45

### TimePickerItem

Renders individual time values with animations. Used internally by TimePickerScroller.

**Props:**

| Prop          | Type          | Default     | Description                                   |
| ------------- | ------------- | ----------- | --------------------------------------------- |
| `className`   | `string`      | `undefined` | TailwindCSS class name (Tailwind/Hybrid only) |
| `stringProps` | `StringProps` | `undefined` | Props to pass to the String component         |

### TimePickerTitle

Displays labels or separators between scrollers.

**Props:**

| Prop          | Type          | Default     | Description                     |
| ------------- | ------------- | ----------- | ------------------------------- |
| `children`    | `string`      | `undefined` | Text content (must be a string) |
| `stringProps` | `StringProps` | `undefined` | Props for String component      |

## Usage Examples

### 1. Basic Time Picker

```tsx
<TimePicker onTimeChange={time => console.log(time.formatted)}>
  <TimePickerContent>
    <TimePickerScroller mode="hour">
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="minute">
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>
```

### 2. With Default Time

```tsx
// Use getTimePickerDateNow() to avoid timezone display issues
<TimePicker defaultTime={getTimePickerDateNow()}>
  <TimePickerContent>
    <TimePickerScroller mode="hour">
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="minute">
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>
```

### 3. With Intervals

```tsx
// Minutes in 5-minute intervals (0, 5, 10, 15...)
<TimePicker>
  <TimePickerContent>
    <TimePickerScroller mode="hour">
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="minute" interval={5}>
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>
```

### 4. Hours, Minutes, and Seconds

```tsx
<TimePicker defaultTime={getTimePickerDateNow()}>
  <TimePickerContent>
    <TimePickerScroller mode="hour">
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="minute">
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="second">
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>
```

### 5. With Specific Default Values

```tsx
// Hour at 14, minute at 30
<TimePicker>
  <TimePickerContent>
    <TimePickerScroller mode="hour" defaultValue={14}>
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="minute" defaultValue={30}>
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>
```

### 6. Custom Styling (Tailwind)

```tsx
<TimePicker className="rounded-xl bg-white p-4">
  <TimePickerContent className="gap-2">
    <TimePickerScroller mode="hour" className="rounded-lg bg-gray-100">
      <TimePickerItem className="py-2" stringProps={{ className: 'text-blue-600 font-bold' }} />
    </TimePickerScroller>
    <TimePickerTitle className="text-2xl text-gray-400">:</TimePickerTitle>
    <TimePickerScroller mode="minute" className="rounded-lg bg-gray-100">
      <TimePickerItem className="py-2" stringProps={{ className: 'text-blue-600 font-bold' }} />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>
```

### 7. Custom Data

```tsx
// Custom values instead of numeric time
<TimePicker>
  <TimePickerContent>
    <TimePickerScroller data={['Morning', 'Afternoon', 'Evening', 'Night']} onChange={value => console.log(value)}>
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>
```

### 8. Only Minutes and Seconds

```tsx
// Timer/stopwatch style (no hours)
<TimePicker
  onTimeChange={time => console.log(time.formatted)} // Will output "25:30"
>
  <TimePickerContent>
    <TimePickerScroller mode="minute">
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="second">
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>
```

## Advanced Usage

### Working with Timezones

The TimePicker returns a `Date` object in UTC to avoid timezone display confusion. Use `getTimePickerDateNow()` helper:

```tsx
// ❌ WRONG - Will show timezone offset in logs
<TimePicker defaultTime={new Date()}>
  {/* Date: 2025-10-13T12:30:00.000Z (2 hours off for UTC+2) */}
</TimePicker>

// ✅ CORRECT - Shows actual time
<TimePicker defaultTime={getTimePickerDateNow()}>
  {/* Date: 2025-10-13T14:30:00.000Z (matches displayed time) */}
</TimePicker>
```

**Helper function usage:**

```tsx
// Current time
const now = getTimePickerDateNow();

// Specific time
const customTime = getTimePickerDateNow(14, 30); // 14:30

// From existing Date
const existingDate = new Date();
const convertedDate = getTimePickerDateNow(existingDate);
```

### Handling Time Changes

```tsx
<TimePicker
  onTimeChange={time => {
    // Formatted string for display
    console.log(time.formatted); // "14:30:45"

    // Individual values
    console.log(time.hour); // 14
    console.log(time.minute); // 30
    console.log(time.second); // 45

    // Date object for API calls
    api.saveAppointment({ time: time.date });

    // Custom formatting
    const custom = `${time.hour}h${time.minute}`;
  }}
>
  {/* ... */}
</TimePicker>
```

### Auto-Rounding with Intervals

When using intervals, default values are automatically rounded to the nearest valid value:

```tsx
// If current time is 14:27
<TimePicker defaultTime={getTimePickerDateNow()}>
  <TimePickerContent>
    <TimePickerScroller mode="hour">
      <TimePickerItem />
      {/* Shows: 14 */}
    </TimePickerScroller>
    <TimePickerScroller mode="minute" interval={5}>
      <TimePickerItem />
      {/* Shows: 25 (rounded from 27) */}
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>
```

### Dynamic Format Based on Scrollers

The `formatted` output adapts based on which scrollers are present:

```tsx
// Only hours → "14"
<TimePickerScroller mode="hour">
  <TimePickerItem />
</TimePickerScroller>

// Hours + Minutes → "14:30"
<TimePickerScroller mode="hour"><TimePickerItem /></TimePickerScroller>
<TimePickerScroller mode="minute"><TimePickerItem /></TimePickerScroller>

// Hours + Minutes + Seconds → "14:30:45"
<TimePickerScroller mode="hour"><TimePickerItem /></TimePickerScroller>
<TimePickerScroller mode="minute"><TimePickerItem /></TimePickerScroller>
<TimePickerScroller mode="second"><TimePickerItem /></TimePickerScroller>

// Minutes + Seconds → "30:45"
<TimePickerScroller mode="minute"><TimePickerItem /></TimePickerScroller>
<TimePickerScroller mode="second"><TimePickerItem /></TimePickerScroller>
```

## TypeScript Support

All components are fully typed:

```typescript
import type {
  TimePickerValue,
  TimePickerPropsTw,
  TimePickerScrollerPropsTw,
  TimePickerContentPropsTw,
  TimePickerItemPropsTw,
  TimePickerTitlePropsTw,
} from 'react-native-chill-ui';

// TimePickerValue structure
const handleTimeChange = (time: TimePickerValue) => {
  time.hour; // number | undefined
  time.minute; // number | undefined
  time.second; // number | undefined
  time.formatted; // string
  time.date; // Date | undefined
};
```

## Styling Guide

### Tailwind Version

```tsx
<TimePicker className="rounded-xl bg-white p-6 shadow-lg">
  <TimePickerContent className="gap-4">
    <TimePickerScroller mode="hour" className="rounded-lg bg-gray-50 px-4">
      <TimePickerItem
        className="py-3"
        stringProps={{
          className: 'text-blue-600 font-semibold text-xl',
        }}
      />
    </TimePickerScroller>

    <TimePickerTitle className="text-3xl font-bold text-gray-300">:</TimePickerTitle>

    <TimePickerScroller mode="minute" className="rounded-lg bg-gray-50 px-4">
      <TimePickerItem
        className="py-3"
        stringProps={{
          className: 'text-blue-600 font-semibold text-xl',
        }}
      />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>
```

### StyleSheet Version

```tsx
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  content: {
    gap: 16,
  },
  scroller: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  item: {
    paddingVertical: 12,
  },
});

<TimePicker style={styles.container}>
  <TimePickerContent style={styles.content}>
    <TimePickerScroller mode="hour" style={styles.scroller}>
      <TimePickerItem
        style={styles.item}
        stringProps={{
          style: {
            color: '#2563eb',
            fontWeight: '600',
            fontSize: 20,
          },
        }}
      />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>;
```

## Performance Tips

1. **Avoid inline functions in onChange**: Use `useCallback` for `onChange` handlers
2. **Memoize custom data**: Use `useMemo` for custom data arrays
3. **Limit intervals**: Smaller intervals mean more items to render
4. **Default to necessary scrollers**: Only include scrollers you need

```tsx
// ✅ Good
const handleTimeChange = useCallback((time: TimePickerValue) => {
  saveTime(time);
}, []);

const customData = useMemo(() => ['Morning', 'Afternoon', 'Evening'], []);

<TimePicker onTimeChange={handleTimeChange}>
  <TimePickerContent>
    <TimePickerScroller mode="hour">
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerScroller mode="minute" interval={5}>
      {' '}
      {/* 12 items instead of 60 */}
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>;
```

## Common Patterns

### 1. Appointment Scheduler

```tsx
const [appointment, setAppointment] = useState<Date | null>(null);

<TimePicker
  defaultTime={getTimePickerDateNow(9, 0)} // Start at 9:00 AM
  onTimeChange={time => setAppointment(time.date)}
>
  <TimePickerContent>
    <TimePickerScroller mode="hour">
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="minute" interval={15}>
      {' '}
      {/* 15-min slots */}
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>;
```

### 2. Alarm Clock

```tsx
const [alarmTime, setAlarmTime] = useState('');

<TimePicker onTimeChange={time => setAlarmTime(time.formatted)}>
  <TimePickerContent>
    <TimePickerScroller mode="hour">
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="minute">
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>;
```

### 3. Timer/Stopwatch

```tsx
<TimePicker onTimeChange={time => setDuration(time.formatted)}>
  <TimePickerContent>
    <TimePickerScroller mode="minute">
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="second">
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>
```

## API Reference

### Utilities

#### `getTimePickerDateNow(source?, minute?, second?): Date`

Helper function to create timezone-safe Date objects for TimePicker.

**Parameters:**

- `source` (optional): `Date | number` - Source Date object or hour value
- `minute` (optional): `number` - Minute value when first param is hour
- `second` (optional): `number` - Second value

**Returns:** `Date` object with UTC time matching local time values

**Examples:**

```tsx
// Current time
const now = getTimePickerDateNow();

// Specific hour and minute
const time = getTimePickerDateNow(14, 30);

// From existing Date
const date = new Date();
const converted = getTimePickerDateNow(date);
```

## Troubleshooting

### Issue: Timezone offset in Date logs

**Problem:** Date shows wrong time in console (e.g., "12:30" when you selected "14:30")

**Solution:** Use `getTimePickerDateNow()` helper function instead of `new Date()`

```tsx
// ❌ Wrong
<TimePicker defaultTime={new Date()}>

// ✅ Correct
<TimePicker defaultTime={getTimePickerDateNow()}>
```

### Issue: Default value not showing

**Problem:** Scroller doesn't scroll to `defaultValue`

**Causes & Solutions:**

1. **Value not in data range**

   ```tsx
   // ❌ Wrong - 70 is outside 0-59 range
   <TimePickerScroller mode="minute" defaultValue={70}>

   // ✅ Correct
   <TimePickerScroller mode="minute" defaultValue={30}>
   ```

2. **Value doesn't match interval**
   ```tsx
   // Will auto-round: 27 → 25
   <TimePickerScroller mode="minute" interval={5} defaultValue={27}>
   ```

### Issue: onTimeChange not firing

**Problem:** Callback not being called

**Solution:** Make sure `onTimeChange` is passed to `TimePicker`, not to scrollers

```tsx
// ❌ Wrong
<TimePicker>
  <TimePickerScroller mode="hour" onChange={...}>

// ✅ Correct
<TimePicker onTimeChange={...}>
  <TimePickerScroller mode="hour">
```

## Migration from Legacy TimePicker

If you're using the old `TimePickerLegacy` component:

```tsx
// Old API
<TimePickerLegacy
  onTimeChange={(time) => console.log(time)}
  minuteInterval={5}
/>

// New Composable API
<TimePicker onTimeChange={(time) => console.log(time)}>
  <TimePickerContent>
    <TimePickerScroller mode="hour">
      <TimePickerItem />
    </TimePickerScroller>
    <TimePickerTitle>:</TimePickerTitle>
    <TimePickerScroller mode="minute" interval={5}>
      <TimePickerItem />
    </TimePickerScroller>
  </TimePickerContent>
</TimePicker>
```

**Benefits of new API:**

- More flexible (add/remove scrollers as needed)
- Better performance (only render what you need)
- Easier styling (target individual components)
- More customizable (custom data, intervals per scroller)

## License

MIT © React Native Chill UI

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on our GitHub repository.
