# Toggle Component

A React Native component that provides a customizable toggle switch for boolean values. Built on top of React Native's Switch component with enhanced styling, state management, and support for loading and disabled states. Features customizable colors, sizes, and support for both controlled and uncontrolled usage.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Toggle } from 'react-native-chill-ui'`

## Features

- **Controlled & Uncontrolled**: Supports both controlled and uncontrolled usage patterns
- **Multiple Sizes**: Pre-defined sizes (xs, sm, md, lg, xl) with consistent sizing
- **Custom Colors**: Fully customizable thumb and track colors for on/off states
- **Loading State**: Built-in loading state with automatic interaction blocking
- **Disabled State**: Disable toggle interaction while maintaining visual feedback
- **Smooth Animations**: Native switch animations for fluid state transitions
- **Flexible Styling**: Support for NativeWind classes and StyleSheet objects
- **TypeScript Support**: Fully typed for a better development experience
- **Accessibility**: Inherits all React Native Switch accessibility features
- **Memory Efficient**: Optimized state management to prevent memory leaks

## Quick Start

```tsx
import { useState } from 'react';
import { Toggle } from 'react-native-chill-ui';

// Controlled toggle
function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false);

  return <Toggle value={isEnabled} onChange={setIsEnabled} size="md" />;
}

// Uncontrolled toggle
function SimpleToggle() {
  return <Toggle onChange={value => console.log('Toggle changed:', value)} />;
}
```

## Installation Guide

Choose the version that matches your project's styling approach:

| Version        | Command                                        | When to Use                                                                                          | Pros                                                                            | Cons                                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **StyleSheet** | `npm install react-native-chill-ui@stylesheet` | • No CSS-in-JS dependencies<br/>• Maximum performance priority<br/>• Simple React Native project     | • Lightweight<br/>• Fast<br/>• No dependencies                                  | • Limited styling flexibility                         |
| **Tailwind**   | `npm install react-native-chill-ui@tailwind`   | • Already using NativeWind<br/>• Team familiar with Tailwind<br/>• Design system based on utilities  | • Consistent with web Tailwind<br/>• Powerful utility system<br/>• Easy theming | • Requires NativeWind setup<br/>• Larger bundle size  |
| **Hybrid**     | `npm install react-native-chill-ui@hybrid`     | • Building component library<br/>• Uncertain about styling approach<br/>• Want maximum compatibility | • Works in any environment<br/>• Future-proof<br/>• Automatic detection         | • Slightly larger bundle<br/>• More complex internals |

## Configuration

### For Tailwind and Hybrid Versions

When using the Tailwind or Hybrid versions, you must define your application's color palette in your `tailwind.config.js` file.

**Minimum Required Configuration:**

```js
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Add your custom colors here if needed
    },
  },
  plugins: [],
};
```

For the StyleSheet version, no additional configuration is needed beyond the standard React Native setup.

## Props

### Toggle Props

| Prop            | Type                                   | Default     | Description                                                                                 |
| --------------- | -------------------------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `value`         | `boolean`                              | `undefined` | Current toggle state (true for on, false for off). If undefined, the toggle is uncontrolled |
| `onChange`      | `(value: boolean) => void`             | `undefined` | Callback function called when toggle state changes                                          |
| `size`          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`      | Size variant of the toggle                                                                  |
| `isDisabled`    | `boolean`                              | `false`     | Whether the toggle is disabled                                                              |
| `isLoading`     | `boolean`                              | `false`     | Whether the toggle is in loading state (disables interaction)                               |
| `thumbColorOn`  | `string`                               | `'#FFFFFF'` | Color of the thumb when toggle is on                                                        |
| `thumbColorOff` | `string`                               | `'#f3f3f3'` | Color of the thumb when toggle is off                                                       |
| `trackColorOn`  | `string`                               | `'#3f83f8'` | Color of the track when toggle is on                                                        |
| `trackColorOff` | `string`                               | `'#CBCFD3'` | Color of the track when toggle is off                                                       |
| `className`     | `string`                               | `undefined` | Custom CSS classes for the container (Tailwind/Hybrid only)                                 |
| `style`         | `StyleProp<ViewStyle>`                 | `undefined` | Custom style for the container                                                              |

## Usage Examples

### Basic Usage

```tsx
import { useState } from 'react';
import { View, Text } from 'react-native';
import { Toggle } from 'react-native-chill-ui';

function BasicExample() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View>
      <Text>Enable notifications</Text>
      <Toggle value={isEnabled} onChange={setIsEnabled} />
    </View>
  );
}
```

### Different Sizes

```tsx
import { View } from 'react-native';
import { Toggle } from 'react-native-chill-ui';

function SizesExample() {
  return (
    <View style={{ gap: 16 }}>
      <Toggle size="xs" />
      <Toggle size="sm" />
      <Toggle size="md" />
      <Toggle size="lg" />
      <Toggle size="xl" />
    </View>
  );
}
```

### Custom Colors

```tsx
import { Toggle } from 'react-native-chill-ui';

function CustomColorsExample() {
  return <Toggle thumbColorOn="#FFFFFF" thumbColorOff="#000000" trackColorOn="#10B981" trackColorOff="#EF4444" />;
}
```

### Loading and Disabled States

```tsx
import { View } from 'react-native';
import { Toggle } from 'react-native-chill-ui';

function StatesExample() {
  return (
    <View style={{ gap: 16 }}>
      {/* Loading state */}
      <Toggle isLoading />

      {/* Disabled state */}
      <Toggle isDisabled />

      {/* Normal state */}
      <Toggle />
    </View>
  );
}
```

### Uncontrolled Toggle

```tsx
import { Toggle } from 'react-native-chill-ui';

function UncontrolledExample() {
  return (
    <Toggle
      onChange={value => {
        console.log('Toggle changed to:', value);
      }}
    />
  );
}
```

### With Tailwind Classes (Tailwind/Hybrid Version)

```tsx
import { Toggle } from 'react-native-chill-ui';

function TailwindExample() {
  return <Toggle className="m-4 p-2" size="lg" />;
}
```

### With StyleSheet (StyleSheet/Hybrid Version)

```tsx
import { StyleSheet } from 'react-native';
import { Toggle } from 'react-native-chill-ui';

const styles = StyleSheet.create({
  toggle: {
    margin: 16,
    padding: 8,
  },
});

function StyleSheetExample() {
  return <Toggle style={styles.toggle} size="lg" />;
}
```

### Form Integration

```tsx
import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Toggle } from 'react-native-chill-ui';

function FormExample() {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const handleSubmit = () => {
    console.log({
      notifications,
      darkMode,
      autoSave,
    });
  };

  return (
    <View style={{ gap: 16 }}>
      <View>
        <Text>Enable Notifications</Text>
        <Toggle value={notifications} onChange={setNotifications} />
      </View>

      <View>
        <Text>Dark Mode</Text>
        <Toggle value={darkMode} onChange={setDarkMode} />
      </View>

      <View>
        <Text>Auto Save</Text>
        <Toggle value={autoSave} onChange={setAutoSave} />
      </View>

      <Button title="Save Settings" onPress={handleSubmit} />
    </View>
  );
}
```

### Settings Screen Example

```tsx
import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Toggle } from 'react-native-chill-ui';

function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Push Notifications</Text>
          <Toggle value={pushNotifications} onChange={setPushNotifications} size="md" />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email Notifications</Text>
          <Toggle value={emailNotifications} onChange={setEmailNotifications} size="md" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Security</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Location Services</Text>
          <Toggle value={locationServices} onChange={setLocationServices} size="md" />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Biometric Authentication</Text>
          <Toggle value={biometricAuth} onChange={setBiometricAuth} size="md" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  label: {
    fontSize: 16,
  },
});
```

### Advanced: Conditional Rendering Based on Toggle State

```tsx
import { useState } from 'react';
import { View, Text } from 'react-native';
import { Toggle } from 'react-native-chill-ui';

function ConditionalExample() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text>Show Advanced Settings</Text>
        <Toggle value={showAdvanced} onChange={setShowAdvanced} />
      </View>

      {showAdvanced && (
        <View style={{ marginTop: 16, padding: 16, backgroundColor: '#F3F4F6' }}>
          <Text>Advanced settings appear here</Text>
          {/* More advanced settings */}
        </View>
      )}
    </View>
  );
}
```

## Performance Notes

- **Native Performance**: Built on React Native's native Switch component for optimal performance
- **Minimal Re-renders**: Optimized state management to prevent unnecessary re-renders
- **Memory Efficient**: Proper cleanup of event listeners and state subscriptions
- **Controlled vs Uncontrolled**: Use uncontrolled mode for simpler use cases to reduce parent re-renders

### Best Practices

1. **Use controlled mode when**:
   - You need to sync the toggle state with other components
   - The toggle state affects other parts of your UI
   - You need to validate or transform the toggle state

2. **Use uncontrolled mode when**:
   - You only need to react to changes (e.g., logging, analytics)
   - The toggle state is independent from other components
   - You want to minimize parent component re-renders

3. **Avoid inline functions**:

   ```tsx
   // ❌ Bad - creates new function on every render
   <Toggle onChange={value => console.log(value)} />;

   // ✅ Good - stable function reference
   const handleChange = useCallback((value: boolean) => {
     console.log(value);
   }, []);
   <Toggle onChange={handleChange} />;
   ```

## TypeScript Support

The Toggle component is written in TypeScript and provides complete type definitions:

```tsx
import { Toggle } from 'react-native-chill-ui';
import type { ToggleProps } from 'react-native-chill-ui';

// Type-safe props
const props: ToggleProps = {
  value: true,
  onChange: (value: boolean) => console.log(value),
  size: 'md',
  isDisabled: false,
  isLoading: false,
  thumbColorOn: '#FFFFFF',
  thumbColorOff: '#f3f3f3',
  trackColorOn: '#3f83f8',
  trackColorOff: '#CBCFD3',
};

function TypedExample() {
  return <Toggle {...props} />;
}
```

### Type Definitions

```typescript
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ToggleProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  size?: ToggleSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  thumbColorOn?: string;
  thumbColorOff?: string;
  trackColorOn?: string;
  trackColorOff?: string;
  className?: string; // Tailwind/Hybrid only
  style?: StyleProp<ViewStyle>;
}
```

## Accessibility

The Toggle component inherits all accessibility features from React Native's Switch component:

```tsx
import { Toggle } from 'react-native-chill-ui';

function AccessibleToggle() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View>
      <Text accessibilityLabel="Enable notifications">Enable Notifications</Text>
      <Toggle
        value={isEnabled}
        onChange={setIsEnabled}
        // Switch automatically handles accessibility
        // Screen readers will announce the state change
      />
    </View>
  );
}
```

### Accessibility Features

- **Screen Reader Support**: Automatically announces state changes
- **Touch Target**: Meets minimum touch target size requirements
- **Visual Feedback**: Clear visual indication of on/off state
- **Disabled State**: Properly communicates disabled state to assistive technologies

## Common Use Cases

### 1. Settings Panel

```tsx
const [settings, setSettings] = useState({
  notifications: true,
  darkMode: false,
  autoplay: true,
});

const updateSetting = (key: string) => (value: boolean) => {
  setSettings(prev => ({ ...prev, [key]: value }));
};

<Toggle value={settings.notifications} onChange={updateSetting('notifications')} />;
```

### 2. Feature Flags

```tsx
const [features, setFeatures] = useState({
  betaFeatures: false,
  analytics: true,
});

<Toggle value={features.betaFeatures} onChange={value => setFeatures({ ...features, betaFeatures: value })} />;
```

### 3. Filter Controls

```tsx
const [filters, setFilters] = useState({
  showCompleted: true,
  showArchived: false,
});

<Toggle value={filters.showCompleted} onChange={value => setFilters({ ...filters, showCompleted: value })} />;
```

## Troubleshooting

### Toggle not responding

**Issue**: Toggle doesn't respond to taps

**Solution**: Check if `isDisabled` or `isLoading` is set to `true`:

```tsx
// ❌ Won't respond
<Toggle isDisabled />

// ✅ Will respond
<Toggle isDisabled={false} />
```

### State not updating in controlled mode

**Issue**: Toggle state doesn't update when clicked

**Solution**: Make sure you're updating the `value` prop:

```tsx
// ❌ State won't update
const [value, setValue] = useState(false);
<Toggle value={value} />;

// ✅ State updates correctly
const [value, setValue] = useState(false);
<Toggle value={value} onChange={setValue} />;
```

### Custom colors not applying

**Issue**: Custom thumb/track colors aren't showing

**Solution**: Ensure you're passing valid color strings:

```tsx
// ❌ Invalid
<Toggle thumbColorOn={true} />

// ✅ Valid
<Toggle thumbColorOn="#FFFFFF" />
<Toggle thumbColorOn="white" />
<Toggle thumbColorOn="rgb(255, 255, 255)" />
```

## Migration from React Native Switch

If you're migrating from React Native's Switch component:

```tsx
// Before (React Native Switch)
import { Switch } from 'react-native';

<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  thumbColor="#FFFFFF"
  trackColor={{ false: '#767577', true: '#81b0ff' }}
/>;

// After (Toggle)
import { Toggle } from 'react-native-chill-ui';

<Toggle
  value={isEnabled}
  onChange={setIsEnabled}
  thumbColorOn="#FFFFFF"
  trackColorOn="#81b0ff"
  trackColorOff="#767577"
/>;
```

## Related Components

- **Checkbox**: For multi-select options
- **Radio**: For single-select from multiple options
- **Slider**: For selecting a value from a range

## License

This component is part of the `react-native-chill-ui` library. See the main package for license information.
