# SegmentedControl Component

A React Native component that provides a flexible and customizable segmented control interface with tab-like functionality. Built with React Native's Animated API for native performance, featuring smooth animations, multiple content display modes, and bidirectional synchronization across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { SegmentedControl } from 'react-native-chill-ui'`

## Features

- **Multiple Display Modes**: Static panels, swipeable slider, or hybrid approach
- **Smooth Animations**: Native driver animations with customizable duration
- **Bidirectional Sync**: Click triggers to scroll panels, swipe panels to update triggers
- **Performance Optimized**: Separate contexts for state and actions to prevent unnecessary re-renders
- **Flexible Styling**: Support for NativeWind classes and StyleSheet objects
- **Customizable**: Support for custom content, disabled states, and asChild pattern
- **Responsive**: Automatic width calculation and container-aware sizing
- **TypeScript Support**: Fully typed for a better development experience
- **Accessibility**: Inherits all React Native accessibility features
- **Memory Efficient**: Automatic cleanup to prevent memory leaks

## Quick Start

```tsx
import { SegmentedControl } from 'react-native-chill-ui';

// Basic segmented control
<SegmentedControl>
  <SegmentedControlTriggerContent>
    <SegmentedControlTrigger value="option1">Option 1</SegmentedControlTrigger>
    <SegmentedControlTrigger value="option2">Option 2</SegmentedControlTrigger>
    <SegmentedControlTrigger value="option3">Option 3</SegmentedControlTrigger>
  </SegmentedControlTriggerContent>
  <SegmentedControlIndicator />
</SegmentedControl>

// With conditional content
<SegmentedControl>
  <SegmentedControlTriggerContent defaultValue="option2">
    <SegmentedControlTrigger value="option1">Home</SegmentedControlTrigger>
    <SegmentedControlTrigger value="option2">Profile</SegmentedControlTrigger>
    <SegmentedControlTrigger value="option3">Settings</SegmentedControlTrigger>
  </SegmentedControlTriggerContent>
  <SegmentedControlIndicator />

  <SegmentedControlPanelContent>
    <SegmentedControlPanel value="option1">
      <Box className="p-4 bg-blue-100 rounded-lg">
        <String className="text-lg font-bold">Home Content</String>
      </Box>
    </SegmentedControlPanel>
    <SegmentedControlPanel value="option2">
      <Box className="p-4 bg-green-100 rounded-lg">
        <String className="text-lg font-bold">Profile Content</String>
      </Box>
    </SegmentedControlPanel>
    <SegmentedControlPanel value="option3">
      <Box className="p-4 bg-red-100 rounded-lg">
        <String className="text-lg font-bold">Settings Content</String>
      </Box>
    </SegmentedControlPanel>
  </SegmentedControlPanelContent>
</SegmentedControl>
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
<SegmentedControlTriggerContent style={{ backgroundColor: '#F3F4F6', borderRadius: 8 }}>
  <SegmentedControlTrigger value="option1" style={{ backgroundColor: '#3B82F6' }}>
    <String style={{ color: 'white' }}>Option 1</String>
  </SegmentedControlTrigger>
</SegmentedControlTriggerContent>
```

## Props

### SegmentedControlProps

| Prop       | Type        | Default | Description                                                                                                       |
| ---------- | ----------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| `children` | `ReactNode` | -       | SegmentedControlTriggerContent, SegmentedControlIndicator, and SegmentedControlPanelContent components (required) |

### SegmentedControlTriggerContentProps

| Prop              | Type                   | Default | Description                                                          |
| ----------------- | ---------------------- | ------- | -------------------------------------------------------------------- |
| `children`        | `ReactNode`            | -       | SegmentedControlTrigger components to display (required)             |
| `className`       | `string`               | -       | Custom CSS classes for styling the container (NativeWind)            |
| `defaultValue`    | `string`               | -       | Initial selected option value (must match one of the trigger values) |
| `internalPadding` | `number`               | `8`     | Internal padding between trigger items in pixels                     |
| `onChange`        | `function`             | -       | Callback function called when the selected option changes            |
| `style`           | `StyleProp<ViewStyle>` | -       | Style object for the container (React Native)                        |

### SegmentedControlTriggerProps

| Prop              | Type                                 | Default       | Description                                                                     |
| ----------------- | ------------------------------------ | ------------- | ------------------------------------------------------------------------------- |
| `value`           | `string`                             | -             | Unique identifier for this trigger option (required)                            |
| `children`        | `ReactNode`                          | -             | Content to display in the trigger (string or React elements) (required)         |
| `activeClassName` | `string`                             | -             | Custom CSS classes applied when this trigger is active (NativeWind)             |
| `activeStyle`     | `StyleProp<ViewStyle>`               | -             | Style object applied when this trigger is active (React Native)                 |
| `as`              | `'pressable' \| 'touchable-opacity'` | `'pressable'` | Type of pressable component to render                                           |
| `asChild`         | `boolean`                            | `false`       | Whether to use the asChild pattern, rendering children directly without wrapper |
| `className`       | `string`                             | -             | Custom CSS classes for styling the trigger container (NativeWind)               |
| `isDisabled`      | `boolean`                            | `false`       | Whether the trigger is disabled and non-interactive                             |
| `stringProps`     | `object`                             | -             | Props passed to String component when children is a string                      |
| `style`           | `StyleProp<ViewStyle>`               | -             | Style object for the trigger container (React Native)                           |

### SegmentedControlIndicatorProps

| Prop        | Type                   | Default | Description                                                 |
| ----------- | ---------------------- | ------- | ----------------------------------------------------------- |
| `className` | `string`               | -       | Custom CSS classes for styling the indicator (NativeWind)   |
| `duration`  | `number`               | `200`   | Animation duration in milliseconds for position transitions |
| `style`     | `StyleProp<ViewStyle>` | -       | Style object for the indicator (React Native)               |

### SegmentedControlPanelContentProps

| Prop        | Type                   | Default | Description                                                                     |
| ----------- | ---------------------- | ------- | ------------------------------------------------------------------------------- |
| `children`  | `ReactNode`            | -       | SegmentedControlPanel components to organize and display (required)             |
| `asChild`   | `boolean`              | `false` | Whether to use the asChild pattern, rendering children directly without wrapper |
| `className` | `string`               | -       | Custom CSS classes for styling the panels container (NativeWind)                |
| `style`     | `StyleProp<ViewStyle>` | -       | Style object for the panels container (React Native)                            |

### SegmentedControlPanelSliderContentProps

| Prop        | Type                   | Default | Description                                                      |
| ----------- | ---------------------- | ------- | ---------------------------------------------------------------- |
| `children`  | `ReactNode`            | -       | SegmentedControlPanel components to display in slider (required) |
| `className` | `string`               | -       | Custom CSS classes for styling the slider container (NativeWind) |
| `style`     | `StyleProp<ViewStyle>` | -       | Style object for the slider container (React Native)             |

### SegmentedControlPanelProps

| Prop          | Type                   | Default | Description                                                                     |
| ------------- | ---------------------- | ------- | ------------------------------------------------------------------------------- |
| `value`       | `string`               | -       | The value that must match the selected option to display this panel (required)  |
| `children`    | `ReactNode`            | -       | Child components to render when this panel is active (required)                 |
| `asChild`     | `boolean`              | `false` | Whether to use the asChild pattern, rendering children directly without wrapper |
| `className`   | `string`               | -       | Custom CSS classes for styling the panel container (NativeWind)                 |
| `forceRender` | `boolean`              | `false` | If true, renders the panel even when not selected (used internally by slider)   |
| `style`       | `StyleProp<ViewStyle>` | -       | Style object for the panel container (React Native)                             |

## Usage Examples

### Swipeable Slider Mode

```tsx
<SegmentedControl>
  <SegmentedControlTriggerContent>
    <SegmentedControlTrigger value="slide1">Slide 1</SegmentedControlTrigger>
    <SegmentedControlTrigger value="slide2">Slide 2</SegmentedControlTrigger>
    <SegmentedControlTrigger value="slide3">Slide 3</SegmentedControlTrigger>
  </SegmentedControlTriggerContent>
  <SegmentedControlIndicator />

  <SegmentedControlPanelSliderContent>
    <SegmentedControlPanel value="slide1">
      <Box className="bg-gradient-to-r from-blue-500 to-purple-500 p-8">
        <String className="text-center text-xl text-white">Swipe me!</String>
      </Box>
    </SegmentedControlPanel>
    <SegmentedControlPanel value="slide2">
      <Box className="bg-gradient-to-r from-green-500 to-teal-500 p-8">
        <String className="text-center text-xl text-white">Keep swiping!</String>
      </Box>
    </SegmentedControlPanel>
    <SegmentedControlPanel value="slide3">
      <Box className="bg-gradient-to-r from-red-500 to-pink-500 p-8">
        <String className="text-center text-xl text-white">Last slide!</String>
      </Box>
    </SegmentedControlPanel>
  </SegmentedControlPanelSliderContent>
</SegmentedControl>
```

### Custom Styling

```tsx
<SegmentedControl>
  <SegmentedControlTriggerContent className="rounded-xl bg-gray-100 p-2">
    <SegmentedControlTrigger value="option1" activeClassName="bg-blue-500 text-white rounded-lg" className="px-4 py-2">
      Option 1
    </SegmentedControlTrigger>
    <SegmentedControlTrigger value="option2" activeClassName="bg-blue-500 text-white rounded-lg" className="px-4 py-2">
      Option 2
    </SegmentedControlTrigger>
  </SegmentedControlTriggerContent>
  <SegmentedControlIndicator className="rounded-lg bg-blue-500" duration={300} />
</SegmentedControl>
```

### With Icons

```tsx
<SegmentedControlTriggerContent>
  <SegmentedControlTrigger value="home">
    <Icon name="home-solid" size="lg" />
  </SegmentedControlTrigger>
  <SegmentedControlTrigger value="profile">
    <Icon name="user-solid" size="lg" />
  </SegmentedControlTrigger>
  <SegmentedControlTrigger value="settings">
    <Icon name="settings-solid" size="lg" />
  </SegmentedControlTrigger>
</SegmentedControlTriggerContent>
```

### Disabled State

```tsx
<SegmentedControlTriggerContent>
  <SegmentedControlTrigger value="enabled">Enabled</SegmentedControlTrigger>
  <SegmentedControlTrigger value="disabled" isDisabled>
    Disabled
  </SegmentedControlTrigger>
</SegmentedControlTriggerContent>
```

## Performance Notes

- The component uses separate contexts for state and actions to prevent unnecessary re-renders
- Panels in slider mode use `forceRender={true}` to ensure all panels are available for scrolling
- Animations use `useNativeDriver: false` for the indicator due to `left` property animation
- Consider using `useNativeDriver: true` with `transform: translateX` for better performance

## TypeScript Support

All components are fully typed with TypeScript interfaces:

```tsx
import { SegmentedControlPanelPropsTw, SegmentedControlTriggerPropsTw, SegmentedControlIndicatorPropsTw } from '@types';
```

## Accessibility

The component supports React Native accessibility features:

- `accessibilityLabel` for screen readers
- `accessibilityRole` for proper semantic meaning
- `accessibilityState` for disabled states
- `testID` for testing purposes

## Examples

Check the `App.tsx` file for complete working examples of all SegmentedControl features and usage patterns.
