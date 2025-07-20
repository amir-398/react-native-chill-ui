# Toggle Component

A customizable toggle/switch component for React Native applications that provides a clean interface for boolean state management. Built on top of React Native's Switch component with enhanced styling and state management.

## Features

- **Boolean State Management**: Simple on/off state handling
- **Multiple Sizes**: Small and large size variants
- **Custom Colors**: Full control over thumb and track colors
- **Loading & Disabled States**: Support for loading and disabled states
- **TypeScript**: Complete type safety with proper interfaces
- **Accessibility**: Built-in accessibility features from React Native Switch

## Basic Usage

```tsx
import { Toggle } from 'chill-ui';
import { useState } from 'react';

function Example() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Box className="space-y-4 p-4">
      <Toggle value={isEnabled} onChange={setIsEnabled} />

      <String>Toggle is {isEnabled ? 'ON' : 'OFF'}</String>
    </Box>
  );
}
```

## Props

| Prop            | Type                       | Required | Default     | Description                            |
| --------------- | -------------------------- | -------- | ----------- | -------------------------------------- |
| `value`         | `boolean`                  | ✅       | -           | Current toggle state                   |
| `onChange`      | `(value: boolean) => void` | ✅       | -           | Callback when toggle state changes     |
| `size`          | `'small' \| 'large'`       | ❌       | `'large'`   | Toggle size variant                    |
| `isDisabled`    | `boolean`                  | ❌       | `false`     | Whether the toggle is disabled         |
| `isLoading`     | `boolean`                  | ❌       | `false`     | Whether the toggle is in loading state |
| `className`     | `string`                   | ❌       | -           | Custom CSS classes for container       |
| `thumbColorOn`  | `string`                   | ❌       | `'#000'`    | Color of thumb when toggle is on       |
| `thumbColorOff` | `string`                   | ❌       | `'#f3f3f3'` | Color of thumb when toggle is off      |
| `trackColorOn`  | `string`                   | ❌       | `'#CBCFD3'` | Color of track when toggle is on       |
| `trackColorOff` | `string`                   | ❌       | `'#CBCFD3'` | Color of track when toggle is off      |

## Examples

### Basic Toggle

```tsx
const [isEnabled, setIsEnabled] = useState(false);

<Toggle value={isEnabled} onChange={setIsEnabled} />;
```

### Different Sizes

```tsx
<Box className="space-y-4">
  <Toggle value={isEnabled} onChange={setIsEnabled} size="small" />

  <Toggle value={isEnabled} onChange={setIsEnabled} size="large" />
</Box>
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
```

### Disabled State

```tsx
<Toggle value={isEnabled} onChange={setIsEnabled} isDisabled={true} />
```

### Loading State

```tsx
<Toggle value={isEnabled} onChange={setIsEnabled} isLoading={true} />
```

### Settings Toggle

```tsx
<Box className="space-y-4">
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
```

### Theme Toggle

```tsx
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

### Custom Styled Toggle

```tsx
<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
  className="rounded-lg bg-gray-100 p-2"
  thumbColorOn="#10B981"
  trackColorOn="#D1FAE5"
/>
```

## Best Practices

### 1. State Management

```tsx
// ✅ Good: Use useState for local state
const [isEnabled, setIsEnabled] = useState(false);

<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
/>

// ✅ Good: Use controlled state with parent component
<Toggle
  value={settings.notifications}
  onChange={(value) => updateSettings({ notifications: value })}
/>
```

### 2. Color Consistency

```tsx
// ✅ Good: Use consistent colors for similar toggles
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
```

### 3. Accessibility

```tsx
// ✅ Good: Provide clear labels and context
<Box className="flex-row items-center justify-between">
  <String>Enable Notifications</String>
  <Toggle
    value={notifications}
    onChange={setNotifications}
  />
</Box>

// ✅ Good: Use appropriate sizes for touch targets
<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
  size="large" // Better for mobile accessibility
/>
```

### 4. Loading States

```tsx
// ✅ Good: Disable toggle during loading
<Toggle value={isEnabled} onChange={setIsEnabled} isLoading={isUpdating} isDisabled={isUpdating} />;

// ✅ Good: Show loading state for async operations
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
```

### 5. Error Handling

```tsx
// ✅ Good: Handle toggle errors gracefully
const handleToggle = (value: boolean) => {
  try {
    setIsEnabled(value);
    // Additional logic
  } catch (error) {
    console.error('Toggle error:', error);
    // Revert state or show error message
  }
};
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface ToggleProps {
  value: boolean;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onChange: (value: boolean) => void;
  size?: 'small' | 'large';
  thumbColorOn?: string;
  thumbColorOff?: string;
  trackColorOff?: string;
  trackColorOn?: string;
}
```

## Performance Considerations

- **Controlled Component**: Efficient re-rendering with controlled state
- **Transform Scaling**: Uses transform scale for size variants
- **Color Optimization**: Default colors are optimized for performance

## Dependencies

- **React Native**: Core Switch component
- **Box**: For layout container

## Accessibility

The component inherits accessibility features from React Native's Switch:

- **Screen Reader**: Compatible with screen readers
- **Touch Targets**: Adequate touch target sizes
- **Visual Feedback**: Clear visual state indication
- **Keyboard Navigation**: Supports keyboard navigation
- **Color Contrast**: Ensure sufficient contrast for custom colors
