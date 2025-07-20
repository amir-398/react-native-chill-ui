# TimePicker

A React Native component that provides a customizable time selection interface with smooth animations and gesture support. Features animated scrolling pickers for hours and minutes with extensive styling options.

## Features

- ✅ **Animated Scrolling**: Smooth scroll animations with snap-to-interval behavior
- ✅ **Customizable Styling**: Full control over colors, fonts, sizes, and appearance
- ✅ **Flexible Intervals**: Configurable minute intervals (1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60)
- ✅ **Gesture Support**: Touch and scroll interactions for time selection
- ✅ **Visual Feedback**: Opacity and scale animations for selected items
- ✅ **Performance Optimized**: Efficient rendering with React Native Animated
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Accessibility**: Screen reader support and accessibility features
- ✅ **24-Hour Format**: Support for 24-hour time format

## Quick Start

```tsx
import TimePicker from '@/components/timePicker/TimePicker';

// Basic time picker
<TimePicker
  onTimeChange={(time) => console.log('Selected time:', time)}
  minuteInterval={15}
/>

// Customized time picker
<TimePicker
  onTimeChange={(time) => setSelectedTime(time)}
  minuteInterval={30}
  options={{
    backgroundColor: '#f8f9fa',
    mainColor: '#007AFF',
    height: 300,
    textDefaultColor: '#333',
  }}
/>
```

## Examples

### Basic Usage

```tsx
import TimePicker from '@/components/timePicker/TimePicker';

// Simple time picker with 15-minute intervals
<TimePicker
  onTimeChange={(time) => setTime(time)}
  minuteInterval={15}
/>

// Time picker with 1-minute precision
<TimePicker
  onTimeChange={(time) => setTime(time)}
  minuteInterval={1}
/>

// Time picker with 30-minute intervals
<TimePicker
  onTimeChange={(time) => setTime(time)}
  minuteInterval={30}
/>
```

### Custom Styling

```tsx
// Custom colors and styling
<TimePicker
  onTimeChange={(time) => setTime(time)}
  minuteInterval={15}
  options={{
    backgroundColor: '#f8f9fa',
    mainColor: '#007AFF',
    textDefaultColor: '#333',
    textHeaderColor: '#666',
    selectedTextColor: '#fff',
    height: 280,
  }}
/>

// Dark theme styling
<TimePicker
  onTimeChange={(time) => setTime(time)}
  minuteInterval={10}
  options={{
    backgroundColor: '#1a1a1a',
    mainColor: '#00ff88',
    textDefaultColor: '#ffffff',
    textHeaderColor: '#cccccc',
    textSecondaryColor: '#888888',
    selectedTextColor: '#000000',
    height: 250,
  }}
/>

// Custom fonts and sizes
<TimePicker
  onTimeChange={(time) => setTime(time)}
  minuteInterval={20}
  options={{
    backgroundColor: '#ffffff',
    mainColor: '#ff6b6b',
    defaultFont: 'Helvetica',
    headerFont: 'Helvetica-Bold',
    textFontSize: 18,
    textHeaderFontSize: 20,
    height: 320,
  }}
/>
```

### Different Minute Intervals

```tsx
// 5-minute intervals (default)
<TimePicker
  onTimeChange={(time) => setTime(time)}
  minuteInterval={5}
/>

// 10-minute intervals
<TimePicker
  onTimeChange={(time) => setTime(time)}
  minuteInterval={10}
/>

// 15-minute intervals (common for scheduling)
<TimePicker
  onTimeChange={(time) => setTime(time)}
  minuteInterval={15}
/>

// 30-minute intervals
<TimePicker
  onTimeChange={(time) => setTime(time)}
  minuteInterval={30}
/>

// 60-minute intervals (hourly)
<TimePicker
  onTimeChange={(time) => setTime(time)}
  minuteInterval={60}
/>
```

### Integration with Forms

```tsx
import { useState } from 'react';
import TimePicker from '@/components/timePicker/TimePicker';

const AppointmentForm = () => {
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  return (
    <Box className="p-4">
      <String size="lg" weight="bold" className="mb-4">
        Schedule Appointment
      </String>

      <Pressable
        onPress={() => setIsTimePickerVisible(!isTimePickerVisible)}
        className="mb-4 rounded-lg border border-gray-300 p-4"
      >
        <String size="md" colorVariant="secondary">
          Selected Time: {selectedTime}
        </String>
      </Pressable>

      {isTimePickerVisible && (
        <TimePicker
          onTimeChange={time => {
            setSelectedTime(time);
            setIsTimePickerVisible(false);
          }}
          minuteInterval={15}
          options={{
            backgroundColor: '#ffffff',
            mainColor: '#007AFF',
            height: 250,
          }}
        />
      )}
    </Box>
  );
};
```

### Custom Time Validation

```tsx
const [selectedTime, setSelectedTime] = useState('09:00');
const [error, setError] = useState('');

const validateTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);

  // Check if time is within business hours (9 AM - 5 PM)
  if (hours < 9 || hours >= 17) {
    setError('Please select a time between 9:00 AM and 5:00 PM');
    return false;
  }

  setError('');
  return true;
};

<Box className="p-4">
  <TimePicker
    onTimeChange={time => {
      if (validateTime(time)) {
        setSelectedTime(time);
      }
    }}
    minuteInterval={30}
    options={{
      backgroundColor: '#ffffff',
      mainColor: error ? '#ff6b6b' : '#007AFF',
      height: 250,
    }}
  />

  {error && (
    <String size="sm" colorVariant="error" className="mt-2">
      {error}
    </String>
  )}
</Box>;
```

## Props Reference

### TimePickerProps

| Prop             | Type                                                             | Default | Description                         |
| ---------------- | ---------------------------------------------------------------- | ------- | ----------------------------------- |
| `minuteInterval` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 10 \| 12 \| 15 \| 20 \| 30 \| 60` | `5`     | Interval between minutes            |
| `onTimeChange`   | `(time: string) => void`                                         | -       | Callback function when time changes |
| `options`        | `TimePickerOptionsProps`                                         | -       | Custom styling options              |

### TimePickerOptionsProps

| Prop                      | Type     | Default                      | Description                    |
| ------------------------- | -------- | ---------------------------- | ------------------------------ |
| `backgroundColor`         | `string` | `'#fff'`                     | Background color of the picker |
| `borderColor`             | `string` | `'rgba(122, 146, 165, 0.1)'` | Border color                   |
| `daysAnimationDistance`   | `number` | `200`                        | Animation distance for days    |
| `defaultFont`             | `string` | `'System'`                   | Font family for time values    |
| `headerAnimationDistance` | `number` | `100`                        | Animation distance for headers |
| `headerFont`              | `string` | `'System'`                   | Font family for headers        |
| `height`                  | `number` | `220`                        | Height of the picker           |
| `mainColor`               | `string` | `'#61dafb'`                  | Primary color for highlights   |
| `selectedTextColor`       | `string` | `'#fff'`                     | Color of selected text         |
| `textDefaultColor`        | `string` | `'#2d4150'`                  | Default text color             |
| `textFontSize`            | `number` | `15`                         | Font size for time values      |
| `textHeaderColor`         | `string` | `'#212c35'`                  | Header text color              |
| `textHeaderFontSize`      | `number` | `17`                         | Header font size               |
| `textSecondaryColor`      | `string` | `'#7a92a5'`                  | Secondary text color           |

## Best Practices

### 1. Choose Appropriate Minute Intervals

```tsx
// ✅ Good - 15-minute intervals for scheduling
<TimePicker
  onTimeChange={setTime}
  minuteInterval={15}
/>

// ✅ Good - 1-minute intervals for precise timing
<TimePicker
  onTimeChange={setTime}
  minuteInterval={1}
/>

// ❌ Avoid - Too many options for simple use cases
<TimePicker
  onTimeChange={setTime}
  minuteInterval={1} // For appointment scheduling
/>
```

### 2. Use Consistent Styling

```tsx
// ✅ Good - Consistent color scheme
<TimePicker
  onTimeChange={setTime}
  minuteInterval={15}
  options={{
    backgroundColor: '#ffffff',
    mainColor: '#007AFF',
    textDefaultColor: '#333333',
    textHeaderColor: '#666666',
  }}
/>

// ❌ Avoid - Inconsistent colors
<TimePicker
  onTimeChange={setTime}
  minuteInterval={15}
  options={{
    backgroundColor: '#ffffff',
    mainColor: '#ff0000',
    textDefaultColor: '#00ff00',
    textHeaderColor: '#0000ff',
  }}
/>
```

### 3. Handle Time Changes Appropriately

```tsx
// ✅ Good - Proper state management
const [selectedTime, setSelectedTime] = useState('09:00');

<TimePicker
  onTimeChange={(time) => {
    setSelectedTime(time);
    // Additional logic like validation or API calls
  }}
  minuteInterval={15}
/>

// ❌ Avoid - Missing state management
<TimePicker
  onTimeChange={(time) => console.log(time)}
  minuteInterval={15}
/>
```

### 4. Consider User Experience

```tsx
// ✅ Good - Clear visual feedback
<TimePicker
  onTimeChange={setTime}
  minuteInterval={15}
  options={{
    mainColor: '#007AFF',
    selectedTextColor: '#ffffff',
    height: 250, // Adequate height for touch targets
  }}
/>

// ❌ Avoid - Poor visual feedback
<TimePicker
  onTimeChange={setTime}
  minuteInterval={15}
  options={{
    mainColor: '#cccccc',
    selectedTextColor: '#333333',
    height: 150, // Too small for comfortable interaction
  }}
/>
```

### 5. Provide Accessibility Support

```tsx
// ✅ Good - Accessible time picker
<Box
  accessible={true}
  accessibilityLabel="Time picker"
  accessibilityHint="Scroll to select hours and minutes"
>
  <TimePicker
    onTimeChange={setTime}
    minuteInterval={15}
    options={{
      mainColor: '#007AFF',
      textDefaultColor: '#333333',
    }}
  />
</Box>

// ❌ Avoid - No accessibility context
<TimePicker
  onTimeChange={setTime}
  minuteInterval={15}
/>
```

## Advanced Usage

### Custom Time Formatting

```tsx
const [selectedTime, setSelectedTime] = useState('09:00');

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

<Box className="p-4">
  <String size="lg" weight="bold" className="mb-2">
    Selected Time: {formatTime(selectedTime)}
  </String>

  <TimePicker
    onTimeChange={setSelectedTime}
    minuteInterval={15}
    options={{
      backgroundColor: '#ffffff',
      mainColor: '#007AFF',
      height: 250,
    }}
  />
</Box>;
```

### Time Range Validation

```tsx
const [selectedTime, setSelectedTime] = useState('09:00');
const [isValid, setIsValid] = useState(true);

const validateTimeRange = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;

  // Check if time is between 8:00 AM and 6:00 PM
  const startMinutes = 8 * 60; // 8:00 AM
  const endMinutes = 18 * 60; // 6:00 PM

  return totalMinutes >= startMinutes && totalMinutes <= endMinutes;
};

<Box className="p-4">
  <TimePicker
    onTimeChange={time => {
      const valid = validateTimeRange(time);
      setIsValid(valid);
      if (valid) {
        setSelectedTime(time);
      }
    }}
    minuteInterval={15}
    options={{
      backgroundColor: '#ffffff',
      mainColor: isValid ? '#007AFF' : '#ff6b6b',
      height: 250,
    }}
  />

  {!isValid && (
    <String size="sm" colorVariant="error" className="mt-2">
      Please select a time between 8:00 AM and 6:00 PM
    </String>
  )}
</Box>;
```

### Performance Optimization

```tsx
import React from 'react';
import TimePicker from '@/components/timePicker/TimePicker';

// Memoized time picker for performance
const MemoizedTimePicker = React.memo(({ onTimeChange, minuteInterval, options }) => (
  <TimePicker onTimeChange={onTimeChange} minuteInterval={minuteInterval} options={options} />
));

// Usage
<MemoizedTimePicker
  onTimeChange={setTime}
  minuteInterval={15}
  options={{
    backgroundColor: '#ffffff',
    mainColor: '#007AFF',
    height: 250,
  }}
/>;
```

### Custom Animation Configuration

```tsx
<TimePicker
  onTimeChange={setTime}
  minuteInterval={15}
  options={{
    backgroundColor: '#ffffff',
    mainColor: '#007AFF',
    height: 250,
    // Custom animation distances
    daysAnimationDistance: 300,
    headerAnimationDistance: 150,
    // Custom fonts and sizes
    defaultFont: 'Helvetica',
    headerFont: 'Helvetica-Bold',
    textFontSize: 18,
    textHeaderFontSize: 20,
  }}
/>
```

## Performance Considerations

- **Animated Components**: Uses React Native Animated for smooth performance
- **Efficient Rendering**: Optimized FlatList rendering with proper key extraction
- **Memory Management**: Proper cleanup of animation listeners
- **Gesture Handling**: Optimized scroll event handling with native driver

## Accessibility

The TimePicker component includes accessibility features:

- **Screen reader support**: Proper accessibility labels and hints
- **Gesture navigation**: Support for touch and scroll interactions
- **Visual feedback**: Clear visual indicators for selected items
- **Keyboard navigation**: Support for keyboard interactions

### Accessibility Best Practices

```tsx
// Always provide accessibility context
<Box
  accessible={true}
  accessibilityLabel="Time picker"
  accessibilityHint="Scroll horizontally to select hours and minutes"
>
  <TimePicker
    onTimeChange={setTime}
    minuteInterval={15}
    options={{
      mainColor: '#007AFF',
      textDefaultColor: '#333333',
    }}
  />
</Box>

// Use appropriate contrast ratios
<TimePicker
  onTimeChange={setTime}
  minuteInterval={15}
  options={{
    backgroundColor: '#ffffff',
    mainColor: '#007AFF',
    textDefaultColor: '#333333',
    selectedTextColor: '#ffffff',
  }}
/>
```

## Troubleshooting

### Common Issues

1. **Time not updating**: Check if onTimeChange callback is provided
2. **Animations not working**: Verify React Native Animated is properly configured
3. **Styling not applying**: Check options object structure and values
4. **Performance issues**: Ensure proper memoization for frequently re-rendered components
5. **Accessibility issues**: Add proper accessibility props to container

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

<TimePicker
  onTimeChange={time => {
    setSelectedTime(time);
    setDebugInfo({
      selectedTime: time,
      timestamp: Date.now(),
      minuteInterval: 15,
    });
  }}
  minuteInterval={15}
  options={{
    backgroundColor: '#ffffff',
    mainColor: '#007AFF',
    height: 250,
  }}
/>;

{
  debugInfo.selectedTime && (
    <Box className="mt-4 rounded bg-gray-100 p-4">
      <String size="sm">Debug: {JSON.stringify(debugInfo)}</String>
    </Box>
  );
}
```

## Migration from Other Libraries

### From react-native-wheel-picker

```tsx
// Old (react-native-wheel-picker)
<WheelPicker
  selectedValue={selectedTime}
  onValueChange={setSelectedTime}
  style={styles.picker}
/>

// New (TimePicker)
<TimePicker
  onTimeChange={setSelectedTime}
  minuteInterval={15}
  options={{
    backgroundColor: '#ffffff',
    mainColor: '#007AFF',
    height: 250,
  }}
/>
```

### From custom time picker implementation

```tsx
// Old (custom implementation)
<View style={styles.container}>
  <Picker selectedValue={hours} onValueChange={setHours}>
    {hourOptions.map(hour => (
      <Picker.Item key={hour} label={hour} value={hour} />
    ))}
  </Picker>
  <Picker selectedValue={minutes} onValueChange={setMinutes}>
    {minuteOptions.map(minute => (
      <Picker.Item key={minute} label={minute} value={minute} />
    ))}
  </Picker>
</View>

// New (TimePicker)
<TimePicker
  onTimeChange={(time) => {
    const [hours, minutes] = time.split(':');
    setHours(parseInt(hours));
    setMinutes(parseInt(minutes));
  }}
  minuteInterval={15}
/>
```
