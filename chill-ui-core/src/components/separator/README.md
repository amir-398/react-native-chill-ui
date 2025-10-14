# Separator Component

A React Native component that provides a simple and lightweight horizontal line for visual separation between content sections. Built with minimal dependencies and featuring customizable styling across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Separator } from 'react-native-chill-ui'`

## Features

- **Simple Design**: Clean horizontal line for visual separation
- **Lightweight**: Minimal dependencies and small bundle size
- **Customizable**: Support for NativeWind classes and StyleSheet objects
- **Flexible Styling**: Easy to customize height, color, and appearance
- **TypeScript Support**: Fully typed for a better development experience
- **Accessibility**: Inherits all React Native accessibility features
- **Cross-Platform**: Works consistently on iOS and Android

## Quick Start

```tsx
import { Separator } from 'react-native-chill-ui';

// Basic separator
<Separator />

// With custom styling
<Separator className="h-0.5 bg-gray-300" />

// With custom style object
<Separator style={{ height: 2, backgroundColor: '#3B82F6' }} />
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

All versions support custom colors through the `style` prop:

```tsx
<Separator style={{ backgroundColor: '#E5E7EB', height: 2 }} />
```

## Props

### SeparatorProps

| Prop        | Type                   | Default | Description                                                                      |
| ----------- | ---------------------- | ------- | -------------------------------------------------------------------------------- |
| `className` | `string`               | -       | Custom CSS classes for styling the separator (NativeWind)                        |
| `style`     | `StyleProp<ViewStyle>` | -       | Style object for the separator (React Native)                                    |
| `...rest`   | `ViewProps`            | -       | All other props from View component (onLayout, testID, accessibilityLabel, etc.) |

## Usage Examples

### Basic Usage

```tsx
import { Separator } from 'react-native-chill-ui';

<Box>
  <String>Content Above</String>
  <Separator />
  <String>Content Below</String>
</Box>;
```

### With Custom Height

```tsx
// Using className (Tailwind/Hybrid)
<Separator className="h-0.5" />

// Using style (All versions)
<Separator style={{ height: 2 }} />
```

### With Custom Color

```tsx
// Using className (Tailwind/Hybrid)
<Separator className="bg-blue-500" />

// Using style (All versions)
<Separator style={{ backgroundColor: '#3B82F6' }} />
```

### With Custom Styling

```tsx
// Thick separator with custom color
<Separator
  className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"
  style={{ borderRadius: 2 }}
/>

// Invisible separator for spacing
<Separator style={{ height: 16, backgroundColor: 'transparent' }} />
```

### In Lists

```tsx
<Box>
  {items.map((item, index) => (
    <Box key={item.id}>
      <String>{item.title}</String>
      {index < items.length - 1 && <Separator className="my-2" />}
    </Box>
  ))}
</Box>
```

### In Cards

```tsx
<Box className="rounded-lg border border-gray-200 p-4">
  <String className="text-lg font-bold">Card Title</String>
  <Separator className="my-3" />
  <String>Card content goes here</String>
</Box>
```

### With Margins

```tsx
// Using className (Tailwind/Hybrid)
<Separator className="my-4" />

// Using style (All versions)
<Separator style={{ marginVertical: 16 }} />
```

### Custom Separator Styles

```tsx
// Dotted separator
<Separator
  style={{
    height: 1,
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#D1D5DB'
  }}
/>

// Gradient separator
<Separator
  className="h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
/>
```

## Performance Notes

- The component is extremely lightweight with minimal overhead
- Uses native View component for optimal performance
- No animations or complex state management
- Perfect for use in lists and scrollable content

## TypeScript Support

All components are fully typed with TypeScript interfaces:

```tsx
import { SeparatorProps } from '@types';
```

## Accessibility

The component supports React Native accessibility features:

- `accessibilityLabel` for screen readers
- `accessibilityRole` for proper semantic meaning
- `testID` for testing purposes
- `accessible` for accessibility control

## Examples

Check the `App.tsx` file for complete working examples of all Separator features and usage patterns.
