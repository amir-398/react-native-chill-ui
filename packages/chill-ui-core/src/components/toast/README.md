# Toast Component

A React Native component that provides a flexible and customizable toast notification system with smooth animations, multiple variants, and customizable styling. Built with React Native's Animated API for native performance, featuring automatic dismissal, swipe gestures, and support for custom content across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { ToastProvider, useToast } from 'react-native-chill-ui'`

## Features

- **Multiple Variants**: Success, error, warning, info with customizable styling
- **Smooth Animations**: Native driver animations with customizable duration
- **Automatic Dismissal**: Configurable duration with progress bar indicator
- **Swipe Gestures**: Dismiss toasts by swiping up or down
- **Multiple Toasts**: Support for stacking multiple toasts simultaneously
- **Custom Content**: Support for custom render functions and components
- **Flexible Styling**: Support for NativeWind classes and StyleSheet objects
- **Position Control**: Top or bottom positioning with offset support
- **TypeScript Support**: Fully typed for a better development experience
- **Accessibility**: Inherits all React Native accessibility features
- **Memory Efficient**: Automatic cleanup to prevent memory leaks

## Quick Start

```tsx
import { ToastProvider, useToast } from 'react-native-chill-ui';

// Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider>
      <YourAppContent />
    </ToastProvider>
  );
}

// Use toast in any component
function MyComponent() {
  const { toast } = useToast();

  const showSuccess = () => {
    toast({ message: 'Success!', variant: 'success' });
  };

  const showError = () => {
    toast({
      title: 'Error',
      message: 'Something went wrong',
      variant: 'error',
    });
  };

  return (
    <View>
      <Button onPress={showSuccess} title="Show Success" />
      <Button onPress={showError} title="Show Error" />
    </View>
  );
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

### Colors

The `className` prop is only available for **Tailwind** and **Hybrid** versions when NativeWind is installed.

### For All Versions

All versions support custom colors through the `style` prop and variant configuration:

```tsx
<ToastProvider
  variants={{
    success: {
      backgroundColor: '#10B981',
      iconProps: { color: '#FFFFFF' },
      titleStringProps: { color: '#FFFFFF' },
      messageStringProps: { color: '#FFFFFF' },
    },
  }}
>
  <YourAppContent />
</ToastProvider>
```

## Props

### ToastProviderProps

| Prop              | Type                    | Default | Description                                                                         |
| ----------------- | ----------------------- | ------- | ----------------------------------------------------------------------------------- |
| `allowMultiple`   | `boolean`               | `false` | Whether to allow multiple toasts simultaneously. If false, only one toast at a time |
| `children`        | `ReactNode`             | -       | Child components that will have access to toast functionality (required)            |
| `defaultDuration` | `number`                | `3000`  | Default duration in milliseconds for toasts                                         |
| `maxToasts`       | `number`                | `4`     | Maximum number of toasts to show simultaneously when allowMultiple is true          |
| `offsetY`         | `number`                | `0`     | Vertical offset in pixels for toast positioning                                     |
| `swipeable`       | `boolean`               | `false` | Whether toasts can be dismissed by swiping up/down                                  |
| `variants`        | `ToastVariantTypeProps` | -       | Custom styling variants for different toast types                                   |

### Toast Function Parameters

| Parameter            | Type                                          | Default    | Description                                         |
| -------------------- | --------------------------------------------- | ---------- | --------------------------------------------------- |
| `message`            | `string`                                      | -          | The message to display in the toast (required)      |
| `title`              | `string`                                      | -          | Optional title for the toast                        |
| `variant`            | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'`   | Toast variant type                                  |
| `position`           | `'top' \| 'bottom'`                           | `'bottom'` | Toast position on screen                            |
| `duration`           | `number`                                      | -          | Toast display duration in milliseconds              |
| `render`             | `ReactNode`                                   | -          | Custom render function for toast content            |
| `swipeable`          | `boolean`                                     | -          | Whether the toast can be dismissed by swiping       |
| `allowMultiple`      | `boolean`                                     | -          | Whether to allow multiple toasts simultaneously     |
| `maxToasts`          | `number`                                      | -          | Maximum number of toasts when allowMultiple is true |
| `offsetY`            | `number`                                      | -          | Vertical offset for toast positioning               |
| `titleStringProps`   | `StringProps`                                 | -          | Props to pass to the title String component         |
| `messageStringProps` | `StringProps`                                 | -          | Props to pass to the message String component       |
| `iconProps`          | `IconProps`                                   | -          | Props to pass to the icon component                 |

### ToastVariantConfig

Configuration object for customizing individual toast variants (`success`, `error`, `info`, `warning`):

| Property             | Type                   | Default | Description                                                |
| -------------------- | ---------------------- | ------- | ---------------------------------------------------------- |
| `style`              | `StyleProp<ViewStyle>` | -       | Style object for the entire toast container                |
| `className`          | `string`               | -       | CSS classes for the toast container (Tailwind/Hybrid only) |
| `titleStringProps`   | `StringProps`          | -       | Props to customize the title String component              |
| `messageStringProps` | `StringProps`          | -       | Props to customize the message String component            |
| `iconProps`          | `IconProps`            | -       | Props to customize the icon component                      |
| `customIcon`         | `React.ReactNode`      | -       | Custom icon component to replace the default icon          |
| `render`             | `React.ReactNode`      | -       | Custom render function for complete toast content          |
| `progressBarColor`   | `string`               | -       | Color of the progress bar indicator                        |

## Usage Examples

### Basic Usage

```tsx
import { ToastProvider, useToast } from 'react-native-chill-ui';

function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  );
}

function MyComponent() {
  const { toast } = useToast();

  return (
    <View>
      <Button title="Show Success" onPress={() => toast({ message: 'Operation successful!', variant: 'success' })} />
      <Button title="Show Error" onPress={() => toast({ message: 'Something went wrong!', variant: 'error' })} />
    </View>
  );
}
```

### With Title and Custom Duration

```tsx
const { toast } = useToast();

toast({
  title: 'Success!',
  message: 'Your data has been saved successfully.',
  variant: 'success',
  duration: 5000,
});
```

### Custom Styling

```tsx
<ToastProvider
  variants={{
    success: {
      backgroundColor: '#10B981',
      iconProps: { color: '#FFFFFF', name: 'check-circle-solid' },
      titleStringProps: { color: '#FFFFFF', weight: 'bold' },
      messageStringProps: { color: '#FFFFFF' },
    },
    error: {
      backgroundColor: '#EF4444',
      iconProps: { color: '#FFFFFF', name: 'x-circle-solid' },
      titleStringProps: { color: '#FFFFFF', weight: 'bold' },
      messageStringProps: { color: '#FFFFFF' },
    },
  }}
>
  <YourAppContent />
</ToastProvider>
```

### Multiple Toasts

```tsx
<ToastProvider allowMultiple maxToasts={3}>
  <YourAppContent />
</ToastProvider>;

// Usage
const { toast } = useToast();

// These will stack
toast({ message: 'First toast', variant: 'info' });
toast({ message: 'Second toast', variant: 'success' });
toast({ message: 'Third toast', variant: 'warning' });
```

### Swipeable Toasts

```tsx
<ToastProvider swipeable>
  <YourAppContent />
</ToastProvider>;

// Or per toast
toast({
  message: 'Swipe me away!',
  variant: 'info',
  swipeable: true,
});
```

### Custom Content

```tsx
const { toast } = useToast();

toast({
  message: 'Custom content',
  variant: 'info',
  render: (
    <View style={{ padding: 20, backgroundColor: '#3B82F6', borderRadius: 8 }}>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Custom Toast Content</Text>
      <Text style={{ color: 'white', fontSize: 14, marginTop: 4 }}>This is completely custom!</Text>
    </View>
  ),
});
```

### Position Control

```tsx
// Top position
toast({
  message: 'Top toast',
  variant: 'info',
  position: 'top',
});

// With offset
<ToastProvider offsetY={50}>
  <YourAppContent />
</ToastProvider>;
```

### String Component Props

```tsx
toast({
  title: 'Custom Title',
  message: 'Custom Message',
  variant: 'success',
  titleStringProps: {
    color: 'red',
    weight: 'bold',
    size: 'lg',
  },
  messageStringProps: {
    color: 'blue',
    size: 'sm',
  },
  iconProps: {
    color: 'green',
    size: 'xl',
  },
});
```

## Performance Notes

- The component uses React Native's Animated API with native driver for optimal performance
- Toasts are automatically cleaned up to prevent memory leaks
- Multiple toasts are limited by `maxToasts` to prevent performance issues
- Custom render functions should be optimized to avoid unnecessary re-renders

## TypeScript Support

All components are fully typed with TypeScript interfaces:

```tsx
import { ToastProviderProps, ToastProps, ToastVariantTypeProps, StringProps, IconProps } from '@types';
```

## Accessibility

The component supports React Native accessibility features:

- `accessibilityLabel` for screen readers
- `accessibilityRole` for proper semantic meaning
- `accessibilityState` for disabled states
- `testID` for testing purposes
