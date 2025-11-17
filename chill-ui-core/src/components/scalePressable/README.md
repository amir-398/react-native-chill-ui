# ScalePressable Component

A React Native component that provides a smooth scale effect on touch interactions. Built with React Native's Animated API for native performance, featuring customizable scale values, animation duration, and tactile feedback across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { ScalePressable } from 'react-native-chill-ui'`

## Features

- **Smooth Scale Effect**: Native animation that scales down on press for tactile feedback
- **Customizable Scale Value**: Control the scale factor with the `scaleValue` prop
- **Custom Animation Duration**: Control animation speed with the `duration` prop
- **Native Performance**: Uses `useNativeDriver: true` for optimal performance
- **Flexible Styling**: Support for NativeWind classes and StyleSheet objects
- **TypeScript Support**: Fully typed for a better development experience
- **Accessibility**: Inherits all Pressable accessibility features
- **Memory Efficient**: Automatic cleanup to prevent memory leaks

## Quick Start

```tsx
import { ScalePressable } from 'react-native-chill-ui';

// Basic scale button
<ScalePressable onPress={() => console.log('Pressed!')}>
  <Box className="p-4 bg-blue-500 rounded-lg">
    <String className="text-white">Press me</String>
  </Box>
</ScalePressable>

// With custom scale and duration
<ScalePressable
  scaleValue={0.9}
  duration={150}
  onPress={() => handleButtonPress()}
>
  <Box className="p-6 bg-green-500 rounded-xl">
    <String className="text-white">Custom Scale Button</String>
  </Box>
</ScalePressable>
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
<ScalePressable style={{ margin: 10, backgroundColor: '#3B82F6' }} scaleValue={0.9} onPress={handlePress}>
  <Text style={{ color: 'white', padding: 16 }}>Button</Text>
</ScalePressable>
```

## Props

### ScalePressableProps

| Prop         | Type                   | Default      | Description                                 |
| ------------ | ---------------------- | ------------ | ------------------------------------------- |
| `children`   | `React.ReactNode`      | **required** | Child components to render                  |
| `className`  | `string`               | -            | Custom CSS classes (Tailwind/Hybrid only)   |
| `style`      | `StyleProp<ViewStyle>` | -            | Custom style object                         |
| `scaleValue` | `number`               | `0.95`       | Scale factor when pressed                   |
| `duration`   | `number`               | `100`        | Animation duration in milliseconds          |
| `onPress`    | `(event: any) => void` | -            | Callback function when component is pressed |
| `disabled`   | `boolean`              | `false`      | Whether the component is disabled           |
| `...rest`    | `PressableProps`       | -            | All other React Native Pressable props      |

### Inherited Pressable Props

The component extends React Native's `Pressable` and inherits all its props:

- `onPressIn`, `onPressOut`, `onLongPress`
- `delayLongPress`
- `accessibilityLabel`, `accessibilityHint`, `accessibilityRole`
- `hitSlop`, `pressRetentionOffset`
- And all other Pressable props

## Examples

### Basic Usage

```tsx
import React from 'react';
import { ScalePressable } from 'react-native-chill-ui';

const BasicScale = () => {
  return (
    <ScalePressable onPress={() => console.log('Pressed!')}>
      <Box className="rounded-lg bg-blue-500 p-4">
        <String className="text-white">Press me</String>
      </Box>
    </ScalePressable>
  );
};
```

### Custom Scale and Duration

```tsx
const CustomScale = () => {
  return (
    <ScalePressable scaleValue={0.9} duration={150} onPress={() => handleButtonPress()}>
      <Box className="rounded-xl bg-green-500 p-6">
        <String className="text-white">Custom Scale Button</String>
      </Box>
    </ScalePressable>
  );
};
```

### Scale Value Customization

```tsx
// Subtle scale effect (0.98)
<ScalePressable scaleValue={0.98}>
  <Icon name="heart" className="w-6 h-6" />
</ScalePressable>

// Strong scale effect (0.85)
<ScalePressable scaleValue={0.85}>
  <Box className="p-6 bg-white rounded-xl">
    <String>Large Card</String>
  </Box>
</ScalePressable>
```

### Duration Customization

```tsx
// Fast animation (50ms)
<ScalePressable duration={50}>
  <Box className="p-2 bg-gray-200 rounded">
    <String>Quick Response</String>
  </Box>
</ScalePressable>

// Slow animation (300ms)
<ScalePressable duration={300}>
  <Box className="p-8 bg-purple-500 rounded-2xl">
    <String className="text-white">Smooth Animation</String>
  </Box>
</ScalePressable>
```

### With StyleSheet (Fallback Mode)

```tsx
<ScalePressable onPress={() => handlePress()} style={{ margin: 10 }} scaleValue={0.9}>
  <View style={{ padding: 16, backgroundColor: '#3B82F6', borderRadius: 8 }}>
    <Text style={{ color: 'white' }}>Button</Text>
  </View>
</ScalePressable>
```

### Event Handling

```tsx
<ScalePressable
  onPress={event => {
    console.log('Button pressed!');
    handlePress();
  }}
  onPressIn={() => console.log('Press started')}
  onPressOut={() => console.log('Press ended')}
>
  <Box>Content</Box>
</ScalePressable>
```

### Accessibility

```tsx
<ScalePressable
  onPress={() => handleSubmit()}
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Submit form"
  accessibilityHint="Double tap to submit the form"
>
  <Box className="rounded-lg bg-blue-500 px-6 py-3">
    <String className="text-white">Submit</String>
  </Box>
</ScalePressable>
```

### Controlled vs Uncontrolled

```tsx
// Controlled component
const ControlledScale = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <ScalePressable onPressIn={() => setIsPressed(true)} onPressOut={() => setIsPressed(false)} onPress={handlePress}>
      <Box className={`rounded-lg p-4 ${isPressed ? 'bg-blue-600' : 'bg-blue-500'}`}>
        <String className="text-white">Controlled</String>
      </Box>
    </ScalePressable>
  );
};

// Uncontrolled component
const UncontrolledScale = () => {
  return (
    <ScalePressable onPress={handlePress}>
      <Box className="rounded-lg bg-blue-500 p-4">
        <String className="text-white">Uncontrolled</String>
      </Box>
    </ScalePressable>
  );
};
```

## Best Practices

### Performance

1. **Use appropriate scale values for context**:

```tsx
<ScalePressable scaleValue={0.98}>  // Subtle for small buttons
<ScalePressable scaleValue={0.95}>  // Normal for cards
<ScalePressable scaleValue={0.9}>   // Strong for large areas
```

2. **Use appropriate durations**:

```tsx
<ScalePressable duration={50}>   // Fast for quick interactions
<ScalePressable duration={100}>  // Normal for most use cases
<ScalePressable duration={200}>  // Slow for emphasis
```

3. **Memoize press handlers**:

```tsx
const handlePress = useCallback(() => {
  // Your logic
}, [dependencies]);

<ScalePressable onPress={handlePress}>
  <Box>Content</Box>
</ScalePressable>;
```

### Accessibility

1. **Add accessibility labels**:

```tsx
<ScalePressable
  onPress={handlePress}
  accessibilityLabel="Submit form"
  accessibilityHint="Double tap to submit"
  accessibilityRole="button"
>
  <Box>Submit</Box>
</ScalePressable>
```

2. **Use semantic roles**:

```tsx
<ScalePressable accessibilityRole="button">Button</ScalePressable>
<ScalePressable accessibilityRole="link">Link</ScalePressable>
<ScalePressable accessibilityRole="tab">Tab</ScalePressable>
```

### Styling

1. **Use consistent spacing**:

```tsx
// Tailwind/Hybrid version
<ScalePressable className="mx-4 my-2">
  <Box className="p-4 bg-white rounded-lg">Content</Box>
</ScalePressable>

// StyleSheet version
<ScalePressable style={{ margin: 16 }}>
  <View style={{ padding: 16, backgroundColor: 'white', borderRadius: 8 }}>Content</View>
</ScalePressable>
```

2. **Handle different screen sizes**:

```tsx
const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.8;

<ScalePressable style={{ width: buttonWidth }}>
  <Box>Responsive Button</Box>
</ScalePressable>;
```

## Migration

### From TouchableOpacity

```tsx
// Before
<TouchableOpacity onPress={handlePress}>
  <Text>Button</Text>
</TouchableOpacity>

// After
<ScalePressable onPress={handlePress}>
  <Text>Button</Text>
</ScalePressable>
```

### From Pressable

```tsx
// Before
<Pressable onPress={handlePress}>
  <Text>Button</Text>
</Pressable>

// After (with scale effect)
<ScalePressable onPress={handlePress} scaleValue={0.95}>
  <Text>Button</Text>
</ScalePressable>
```

## Troubleshooting

### Common Issues

1. **No scale effect visible**
   - Ensure the component is not disabled
   - Check that `scaleValue` is less than 1.0
   - Verify the component has proper dimensions

2. **Animation too fast/slow**
   - Adjust the `duration` prop (50-300ms recommended)
   - Use shorter durations for quick interactions
   - Use longer durations for emphasis

3. **Performance issues**
   - Use `useCallback` for the `onPress` handler
   - Avoid inline functions in props
   - Use appropriate `scaleValue` (0.9-0.98 recommended)

4. **Styling not applying**
   - Check if you're using the correct version (StyleSheet vs Tailwind)
   - Verify CSS classes are available in Tailwind version
   - Use `style` prop for custom styling

### Version-Specific Issues

**Tailwind Version:**

- Ensure NativeWind is properly configured
- Check if required Tailwind classes are available
- Verify `tailwind.config.js` includes necessary utilities

**StyleSheet Version:**

- Custom styles may override default styles
- Use `StyleSheet.flatten()` for complex style combinations

**Hybrid Version:**

- Component automatically detects NativeWind availability
- Falls back gracefully to StyleSheet if Tailwind is not available

## Implementation Details

- Uses React Native's `Animated` API with `useNativeDriver: true` for performance
- Automatically handles `onPressIn` and `onPressOut` events for scale animation
- Cleans up animations automatically to prevent memory leaks
- Supports both NativeWind classes and StyleSheet objects
- Uses `forwardRef` for proper ref forwarding

## Dependencies

- **React Native**: Core components (Animated, Pressable, View)
- **Box**: For layout containers
- **String**: For text rendering
- **NativeWind**: For Tailwind CSS support (optional)

## Compatibility

- React Native 0.60+
- Expo SDK 45+
- TypeScript 4.8+
- iOS 11+ / Android API 21+
- NativeWind 2.0+ (optional)

## Related Components

- **Pressable**: For basic touch interactions without scale effect
- **RipplePressable**: For ripple effect on touch
- **TouchableOpacity**: For simple touch feedback
- **Button**: For standard button components
- **Box**: For layout containers

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

This component is part of the react-native-chill-ui library. See [LICENSE](../../LICENSE.md) for details.
