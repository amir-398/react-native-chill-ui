# RipplePressable Component

A React Native component that provides a smooth ripple effect on touch interactions. Built with React Native's Animated API for native performance, featuring customizable animation speed, effect colors, and automatic border radius detection across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { RipplePressable } from 'react-native-chill-ui'`

## Features

- **Smooth Ripple Effect**: Native animation that spreads from the touch point
- **Customizable Speed**: Control animation duration with the `speed` prop
- **Custom Effect Color**: Personalize ripple color with the `effectColor` prop
- **BorderRadius Detection**: Automatically respects child component's border radius
- **Native Performance**: Uses `useNativeDriver: true` for optimal performance
- **Flexible Styling**: Support for NativeWind classes and StyleSheet objects
- **TypeScript Support**: Fully typed for a better development experience
- **Accessibility**: Inherits all Pressable accessibility features
- **Memory Efficient**: Automatic cleanup to prevent memory leaks

## Quick Start

```tsx
import { RipplePressable } from 'react-native-chill-ui';

// Basic ripple button
<RipplePressable onPress={() => console.log('Pressed')}>
  <Box className="p-4 bg-blue-500 rounded-lg">
    <String className="text-white">Press me</String>
  </Box>
</RipplePressable>

// With custom speed and color
<RipplePressable
  speed={300}
  effectColor="rgba(255, 255, 255, 0.3)"
  onPress={() => handlePress()}
>
  <Box className="px-6 py-3 bg-red-500 rounded-xl">
    <String className="text-white">Fast Ripple</String>
  </Box>
</RipplePressable>
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
<RipplePressable
  style={{ margin: 10, backgroundColor: '#3B82F6' }}
  effectColor="rgba(255, 255, 255, 0.3)"
  onPress={handlePress}
>
  <Text style={{ color: 'white', padding: 16 }}>Button</Text>
</RipplePressable>
```

## Props

### RipplePressableProps

| Prop          | Type                                     | Default                      | Description                                 |
| ------------- | ---------------------------------------- | ---------------------------- | ------------------------------------------- |
| `children`    | `React.ReactNode`                        | **required**                 | Child components to render                  |
| `className`   | `string`                                 | -                            | Custom CSS classes (Tailwind/Hybrid only)   |
| `style`       | `StyleProp<ViewStyle>`                   | -                            | Custom style object                         |
| `effectColor` | `string`                                 | `'rgba(255, 255, 255, 0.6)'` | Color of the ripple effect                  |
| `speed`       | `number`                                 | `500`                        | Animation duration in milliseconds          |
| `onPress`     | `(event: GestureResponderEvent) => void` | -                            | Callback function when component is pressed |
| `disabled`    | `boolean`                                | `false`                      | Whether the component is disabled           |
| `...rest`     | `PressableProps`                         | -                            | All other React Native Pressable props      |

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
import { RipplePressable } from 'react-native-chill-ui';

const BasicRipple = () => {
  return (
    <RipplePressable onPress={() => console.log('Pressed')}>
      <Box className="rounded-lg bg-blue-500 p-4">
        <String className="text-white">Press me</String>
      </Box>
    </RipplePressable>
  );
};
```

### Custom Speed and Color

```tsx
const CustomRipple = () => {
  return (
    <RipplePressable speed={300} effectColor="rgba(255, 255, 255, 0.3)" onPress={() => handlePress()}>
      <Box className="rounded-xl bg-red-500 px-6 py-3">
        <String className="text-white">Fast Ripple</String>
      </Box>
    </RipplePressable>
  );
};
```

### Speed Customization

```tsx
// Fast interaction (200ms)
<RipplePressable speed={200}>
  <Icon name="heart" className="w-6 h-6" />
</RipplePressable>

// Slow interaction (800ms)
<RipplePressable speed={800}>
  <Box className="p-6 bg-white rounded-xl">
    <String>Large Card</String>
  </Box>
</RipplePressable>
```

### Effect Color Customization

```tsx
// White ripple on dark background
<RipplePressable effectColor="rgba(255, 255, 255, 0.3)">
  <Box className="p-4 bg-gray-800">
    <String className="text-white">Dark Button</String>
  </Box>
</RipplePressable>

// Colored ripple
<RipplePressable effectColor="rgba(59, 130, 246, 0.2)">
  <Box className="p-4 bg-blue-50">
    <String>Blue Ripple</String>
  </Box>
</RipplePressable>
```

### With StyleSheet (Fallback Mode)

```tsx
<RipplePressable onPress={() => handlePress()} style={{ margin: 10 }} effectColor="rgba(0, 0, 0, 0.1)">
  <View style={{ padding: 16, backgroundColor: '#3B82F6', borderRadius: 8 }}>
    <Text style={{ color: 'white' }}>Button</Text>
  </View>
</RipplePressable>
```

### Event Handling

```tsx
<RipplePressable
  onPress={event => {
    console.log('Touch position:', event.nativeEvent.locationX, event.nativeEvent.locationY);
    handlePress();
  }}
>
  <Box>Content</Box>
</RipplePressable>
```

### BorderRadius Support

The component automatically detects and respects the `borderRadius` of the first child component:

```tsx
// Ripple will be clipped to the rounded corners
<RipplePressable>
  <Box style={{ borderRadius: 20, padding: 16, backgroundColor: 'blue' }}>
    <String>Rounded Button</String>
  </Box>
</RipplePressable>
```

### Accessibility

```tsx
<RipplePressable
  onPress={() => handleSubmit()}
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Submit form"
  accessibilityHint="Double tap to submit the form"
>
  <Box className="rounded-lg bg-blue-500 px-6 py-3">
    <String className="text-white">Submit</String>
  </Box>
</RipplePressable>
```

### Controlled vs Uncontrolled

```tsx
// Controlled component
const ControlledRipple = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <RipplePressable onPressIn={() => setIsPressed(true)} onPressOut={() => setIsPressed(false)} onPress={handlePress}>
      <Box className={`rounded-lg p-4 ${isPressed ? 'bg-blue-600' : 'bg-blue-500'}`}>
        <String className="text-white">Controlled</String>
      </Box>
    </RipplePressable>
  );
};

// Uncontrolled component
const UncontrolledRipple = () => {
  return (
    <RipplePressable onPress={handlePress}>
      <Box className="rounded-lg bg-blue-500 p-4">
        <String className="text-white">Uncontrolled</String>
      </Box>
    </RipplePressable>
  );
};
```

## Best Practices

### Performance

1. **Use appropriate speeds for context**:

```tsx
<RipplePressable speed={200}>  // Fast for small buttons
<RipplePressable speed={500}>  // Normal for cards
<RipplePressable speed={800}>  // Slow for large areas
```

2. **Memoize press handlers**:

```tsx
const handlePress = useCallback(() => {
  // Your logic
}, [dependencies]);

<RipplePressable onPress={handlePress}>
  <Box>Content</Box>
</RipplePressable>;
```

3. **Use subtle effect colors**:

```tsx
// ✅ Good: Subtle effects
<RipplePressable effectColor="rgba(0, 0, 0, 0.1)">
<RipplePressable effectColor="rgba(255, 255, 255, 0.3)">

// ❌ Avoid: Overly bright effects
<RipplePressable effectColor="rgba(255, 0, 0, 0.8)">
```

### Accessibility

1. **Add accessibility labels**:

```tsx
<RipplePressable
  onPress={handlePress}
  accessibilityLabel="Submit form"
  accessibilityHint="Double tap to submit"
  accessibilityRole="button"
>
  <Box>Submit</Box>
</RipplePressable>
```

2. **Use semantic roles**:

```tsx
<RipplePressable accessibilityRole="button">Button</RipplePressable>
<RipplePressable accessibilityRole="link">Link</RipplePressable>
<RipplePressable accessibilityRole="tab">Tab</RipplePressable>
```

### Styling

1. **Use consistent spacing**:

```tsx
// Tailwind/Hybrid version
<RipplePressable className="mx-4 my-2">
  <Box className="p-4 bg-white rounded-lg">Content</Box>
</RipplePressable>

// StyleSheet version
<RipplePressable style={{ margin: 16 }}>
  <View style={{ padding: 16, backgroundColor: 'white', borderRadius: 8 }}>Content</View>
</RipplePressable>
```

2. **Handle different screen sizes**:

```tsx
const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.8;

<RipplePressable style={{ width: buttonWidth }}>
  <Box>Responsive Button</Box>
</RipplePressable>;
```

## Migration

### From TouchableOpacity

```tsx
// Before
<TouchableOpacity onPress={handlePress}>
  <Text>Button</Text>
</TouchableOpacity>

// After
<RipplePressable onPress={handlePress}>
  <Text>Button</Text>
</RipplePressable>
```

### From Pressable

```tsx
// Before
<Pressable onPress={handlePress}>
  <Text>Button</Text>
</Pressable>

// After (with ripple effect)
<RipplePressable onPress={handlePress} effectColor="rgba(0, 0, 0, 0.1)">
  <Text>Button</Text>
</RipplePressable>
```

## Troubleshooting

### Common Issues

1. **No ripple effect visible**
   - Ensure the child component has defined dimensions
   - Check that the `effectColor` has sufficient opacity
   - Verify the component is not disabled

2. **Effect overflows rounded corners**
   - The component automatically detects `borderRadius` from child styles
   - Ensure the child component has proper `borderRadius` styling

3. **Performance issues**
   - Use `useCallback` for the `onPress` handler
   - Avoid inline functions in props
   - Use appropriate `speed` values (200-800ms)

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
- Automatically calculates ripple size based on container dimensions and touch position
- Cleans up animations automatically to prevent memory leaks
- Supports both NativeWind classes and StyleSheet objects
- Detects child component's `borderRadius` and applies it to container for proper clipping

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

- **Pressable**: For basic touch interactions without ripple effect
- **TouchableOpacity**: For simple touch feedback
- **Button**: For standard button components
- **Box**: For layout containers

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

This component is part of the react-native-chill-ui library. See [LICENSE](../../LICENSE.md) for details.
