# Toggle

A React Native component that provides a customizable toggle/switch interface for boolean state management. Built on top of React Native's Switch component with enhanced styling, multiple sizes, and support for loading and disabled states.

## Features

- ✅ **Boolean State Management**: Simple on/off state handling with controlled components
- ✅ **Multiple Sizes**: Small and large size variants with proper scaling
- ✅ **Custom Colors**: Full control over thumb and track colors for both states
- ✅ **Loading & Disabled States**: Support for loading and disabled states
- ✅ **TypeScript**: Complete type safety with proper interfaces
- ✅ **Accessibility**: Built-in accessibility features from React Native Switch
- ✅ **Performance**: Optimized with transform scaling for size variants
- ✅ **Safe Area Support**: Proper positioning and touch target sizes

## Quick Start

```tsx
import Toggle from '@/components/toggle/Toggle';

// Basic toggle
<Toggle value={isEnabled} onChange={setIsEnabled} />

// Small toggle with custom colors
<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
  size="small"
  thumbColorOn="#3B82F6"
  trackColorOn="#DBEAFE"
/>

// Disabled toggle
<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
  isDisabled={true}
/>
```

## Examples

### Basic Usage

```tsx
import { useState } from 'react';
import Toggle from '@/components/toggle/Toggle';

const BasicToggle = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Box className="space-y-4 p-4">
      <Toggle value={isEnabled} onChange={setIsEnabled} />
      <String>Toggle is {isEnabled ? 'ON' : 'OFF'}</String>
    </Box>
  );
};
```

### Different Sizes

```tsx
const [isEnabled, setIsEnabled] = useState(false);

<Box className="space-y-4">
  <Toggle value={isEnabled} onChange={setIsEnabled} size="small" />
  <Toggle value={isEnabled} onChange={setIsEnabled} size="large" />
</Box>;
```

### Custom Colors

```tsx
<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
  thumbColorOn="#3B82F6"
  thumbColorOff="#FFFFFF"
  trackColorOn="#DBEAFE"
  trackColorOff="#E5E7EB"
/>

// Dark theme toggle
<Toggle
  value={isDarkMode}
  onChange={setIsDarkMode}
  thumbColorOn="#FFFFFF"
  thumbColorOff="#FFFFFF"
  trackColorOn="#1F2937"
  trackColorOff="#E5E7EB"
  size="large"
/>
```

### Disabled and Loading States

```tsx
// Disabled state
<Toggle value={isEnabled} onChange={setIsEnabled} isDisabled={true} />

// Loading state
<Toggle value={isEnabled} onChange={setIsEnabled} isLoading={true} />

// Both disabled and loading
<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
  isDisabled={isUpdating}
  isLoading={isUpdating}
/>
```

### Settings Interface

```tsx
const SettingsScreen = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Box className="space-y-4 p-4">
      <Box className="flex-row items-center justify-between">
        <String>Push Notifications</String>
        <Toggle value={pushNotifications} onChange={setPushNotifications} />
      </Box>

      <Box className="flex-row items-center justify-between">
        <String>Email Notifications</String>
        <Toggle value={emailNotifications} onChange={setEmailNotifications} />
      </Box>

      <Box className="flex-row items-center justify-between">
        <String>Dark Mode</String>
        <Toggle value={darkMode} onChange={setDarkMode} thumbColorOn="#1F2937" trackColorOn="#374151" />
      </Box>
    </Box>
  );
};
```

### Async Toggle with Loading State

```tsx
const AsyncToggle = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async (value: boolean) => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await updateSetting(value);
      setIsEnabled(value);
    } catch (error) {
      console.error('Failed to update setting:', error);
      // Optionally revert the toggle state
    } finally {
      setIsUpdating(false);
    }
  };

  return <Toggle value={isEnabled} onChange={handleToggle} isDisabled={isUpdating} isLoading={isUpdating} />;
};
```

### Custom Styled Toggle

```tsx
<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
  className="rounded-lg bg-gray-100 p-2"
  thumbColorOn="#10B981"
  trackColorOn="#D1FAE5"
  size="large"
/>
```

## Props Reference

### ToggleProps

| Prop            | Type                       | Default     | Description                                       |
| --------------- | -------------------------- | ----------- | ------------------------------------------------- |
| `value`         | `boolean`                  | -           | Current toggle state (true for on, false for off) |
| `onChange`      | `(value: boolean) => void` | -           | Callback function when toggle state changes       |
| `size`          | `'small' \| 'large'`       | `'large'`   | Toggle size variant                               |
| `isDisabled`    | `boolean`                  | `false`     | Whether the toggle is disabled                    |
| `isLoading`     | `boolean`                  | `false`     | Whether the toggle is in loading state            |
| `className`     | `string`                   | -           | Custom CSS classes for the container              |
| `thumbColorOn`  | `string`                   | `'#000'`    | Color of the thumb when toggle is on              |
| `thumbColorOff` | `string`                   | `'#f3f3f3'` | Color of the thumb when toggle is off             |
| `trackColorOn`  | `string`                   | `'#CBCFD3'` | Color of the track when toggle is on              |
| `trackColorOff` | `string`                   | `'#CBCFD3'` | Color of the track when toggle is off             |

## Best Practices

### 1. State Management

```tsx
// ✅ Good - Use useState for local state
const [isEnabled, setIsEnabled] = useState(false);

<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
/>

// ✅ Good - Use controlled state with parent component
<Toggle
  value={settings.notifications}
  onChange={(value) => updateSettings({ notifications: value })}
/>

// ❌ Avoid - Uncontrolled state
<Toggle onChange={(value) => console.log(value)} />
```

### 2. Color Consistency

```tsx
// ✅ Good - Use consistent colors for similar toggles
const toggleColors = {
  thumbColorOn: '#3B82F6',
  thumbColorOff: '#FFFFFF',
  trackColorOn: '#DBEAFE',
  trackColorOff: '#E5E7EB',
};

<Toggle
  value={notifications}
  onChange={setNotifications}
  {...toggleColors}
/>

<Toggle
  value={darkMode}
  onChange={setDarkMode}
  {...toggleColors}
/>

// ❌ Avoid - Inconsistent colors
<Toggle
  value={notifications}
  onChange={setNotifications}
  thumbColorOn="#ff0000"
  trackColorOn="#00ff00"
/>
```

### 3. Accessibility

```tsx
// ✅ Good - Provide clear labels and context
<Box className="flex-row items-center justify-between">
  <String>Enable Notifications</String>
  <Toggle
    value={notifications}
    onChange={setNotifications}
  />
</Box>

// ✅ Good - Use appropriate sizes for touch targets
<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
  size="large" // Better for mobile accessibility
/>

// ❌ Avoid - No context or labels
<Toggle value={isEnabled} onChange={setIsEnabled} />
```

### 4. Loading States

```tsx
// ✅ Good - Disable toggle during loading
<Toggle value={isEnabled} onChange={setIsEnabled} isLoading={isUpdating} isDisabled={isUpdating} />;

// ✅ Good - Show loading state for async operations
const [isUpdating, setIsUpdating] = useState(false);

const handleToggle = async (value: boolean) => {
  setIsUpdating(true);
  try {
    await updateSetting(value);
    setIsEnabled(value);
  } finally {
    setIsUpdating(false);
  }
};

// ❌ Avoid - No loading state for async operations
const handleToggle = async (value: boolean) => {
  await updateSetting(value);
  setIsEnabled(value);
};
```

### 5. Error Handling

```tsx
// ✅ Good - Handle toggle errors gracefully
const handleToggle = (value: boolean) => {
  try {
    setIsEnabled(value);
    // Additional logic
  } catch (error) {
    console.error('Toggle error:', error);
    // Revert state or show error message
  }
};

// ✅ Good - Async error handling
const handleAsyncToggle = async (value: boolean) => {
  try {
    await updateSetting(value);
    setIsEnabled(value);
  } catch (error) {
    console.error('Failed to update setting:', error);
    // Optionally show error toast or revert state
  }
};

// ❌ Avoid - No error handling
const handleToggle = (value: boolean) => {
  setIsEnabled(value);
  // No error handling
};
```

## Advanced Usage

### Custom Toggle with Validation

```tsx
const ValidatedToggle = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = (value: boolean) => {
    // Custom validation
    if (value && !hasPermission()) {
      setError('Permission required');
      return;
    }

    setError('');
    setIsEnabled(value);
  };

  return (
    <Box className="space-y-2">
      <Toggle value={isEnabled} onChange={handleToggle} isDisabled={!hasPermission()} />
      {error && (
        <String size="sm" colorVariant="error">
          {error}
        </String>
      )}
    </Box>
  );
};
```

### Toggle with Custom Styling

```tsx
const CustomToggle = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Box className="rounded-lg bg-gray-50 p-4">
      <Toggle
        value={isEnabled}
        onChange={setIsEnabled}
        className="rounded-full bg-white shadow-sm"
        thumbColorOn="#10B981"
        thumbColorOff="#FFFFFF"
        trackColorOn="#D1FAE5"
        trackColorOff="#E5E7EB"
        size="large"
      />
    </Box>
  );
};
```

### Performance Optimization

```tsx
import React from 'react';
import Toggle from '@/components/toggle/Toggle';

// Memoized toggle for performance
const MemoizedToggle = React.memo(({ value, onChange, ...props }) => (
  <Toggle value={value} onChange={onChange} {...props} />
));

// Usage
<MemoizedToggle value={isEnabled} onChange={setIsEnabled} size="large" />;
```

## Performance Considerations

- **Controlled Component**: Efficient re-rendering with controlled state
- **Transform Scaling**: Uses transform scale for size variants instead of different components
- **Color Optimization**: Default colors are optimized for performance
- **Memory Management**: Proper cleanup of event handlers

## Accessibility

The Toggle component inherits accessibility features from React Native's Switch:

- **Screen Reader**: Compatible with screen readers and voice-over
- **Touch Targets**: Adequate touch target sizes for mobile accessibility
- **Visual Feedback**: Clear visual state indication with proper contrast
- **Keyboard Navigation**: Supports keyboard navigation
- **Color Contrast**: Ensure sufficient contrast for custom colors

### Accessibility Best Practices

```tsx
// Always provide clear context
<Box className="flex-row items-center justify-between">
  <String>Enable Push Notifications</String>
  <Toggle
    value={notifications}
    onChange={setNotifications}
    size="large" // Better touch target
  />
</Box>

// Use appropriate contrast ratios
<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
  thumbColorOn="#FFFFFF"
  trackColorOn="#1F2937" // High contrast
/>
```

## Troubleshooting

### Common Issues

1. **Toggle not responding**: Check if onChange callback is provided
2. **Colors not applying**: Verify color prop names and values
3. **Size not changing**: Ensure size prop is 'small' or 'large'
4. **Disabled state not working**: Check isDisabled and isLoading props
5. **Performance issues**: Use React.memo for frequently re-rendered toggles

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

const handleToggle = (value: boolean) => {
  const info = {
    value,
    timestamp: Date.now(),
    size: 'large',
    isDisabled: false,
  };

  setDebugInfo(info);
  setIsEnabled(value);
};

<Box className="space-y-4">
  <Toggle value={isEnabled} onChange={handleToggle} size="large" />

  {debugInfo.value !== undefined && (
    <Box className="rounded bg-gray-100 p-4">
      <String size="sm">Debug: {JSON.stringify(debugInfo)}</String>
    </Box>
  )}
</Box>;
```

## Migration from Other Libraries

### From react-native-switch

```tsx
// Old (react-native-switch)
import Switch from 'react-native-switch';

<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  activeText="ON"
  inActiveText="OFF"
/>

// New (Toggle)
<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
/>
```

### From custom switch implementation

```tsx
// Old (custom implementation)
const [isEnabled, setIsEnabled] = useState(false);

<Pressable onPress={() => setIsEnabled(!isEnabled)}>
  <View style={[styles.track, isEnabled && styles.trackActive]}>
    <View style={[styles.thumb, isEnabled && styles.thumbActive]} />
  </View>
</Pressable>

// New (Toggle)
<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
/>
```
