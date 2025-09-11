# RipplePressable Component

A React Native component that provides a ripple effect on touch interactions. Built with React Native Animated API for smooth, native animations.

## Features

- ✅ **Ripple Effect**: Smooth effect that spreads from touch point
- ✅ **Customizable Speed**: Control animation duration with `speed` prop
- ✅ **Custom Effect Color**: Personalize ripple color with `effectColor` prop
- ✅ **BorderRadius Detection**: Automatically respects child component's borderRadius
- ✅ **Flexible Styling**: Support for NativeWind classes and style objects
- ✅ **TypeScript**: Complete type safety with detailed interfaces

## Installation

```bash
# The component is included in the chill-ui package
import { RipplePressable } from 'react-native-chill-ui';
```

## Basic Usage

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

// With StyleSheet (fallback mode)
<RipplePressable
  onPress={() => handlePress()}
  style={{ margin: 10 }}
  effectColor="rgba(0, 0, 0, 0.1)"
>
  <View style={{ padding: 16, backgroundColor: '#3B82F6', borderRadius: 8 }}>
    <Text style={{ color: 'white' }}>Button</Text>
  </View>
</RipplePressable>
```

## Props

| Prop          | Type                                     | Default                      | Description                                 |
| ------------- | ---------------------------------------- | ---------------------------- | ------------------------------------------- |
| `children`    | `React.ReactNode`                        | -                            | **Required.** Child components to render    |
| `className`   | `string`                                 | -                            | CSS classes for styling (NativeWind)        |
| `style`       | `ViewStyle`                              | -                            | Style object for the pressable container    |
| `effectColor` | `string`                                 | `'rgba(255, 255, 255, 0.6)'` | Color of the ripple effect                  |
| `speed`       | `number`                                 | `500`                        | Animation duration in milliseconds          |
| `onPress`     | `(event: GestureResponderEvent) => void` | -                            | Callback function when component is pressed |
| `...rest`     | `PressableProps`                         | -                            | All other React Native Pressable props      |

### Inherited Pressable Props

The component extends React Native's `Pressable` and inherits all its props:

- `onPressIn`, `onPressOut`, `onLongPress`
- `disabled`, `delayLongPress`
- `accessibilityLabel`, `accessibilityHint`, `accessibilityRole`
- `hitSlop`, `pressRetentionOffset`
- And all other Pressable props

## Advanced Usage

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

## BorderRadius Support

The component automatically detects and respects the `borderRadius` of the first child component:

```tsx
// Ripple will be clipped to the rounded corners
<RipplePressable>
  <Box style={{ borderRadius: 20, padding: 16, backgroundColor: 'blue' }}>
    <String>Rounded Button</String>
  </Box>
</RipplePressable>
```

## Accessibility

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

## Best Practices

### Do ✅

```tsx
// Use appropriate speeds for context
<RipplePressable speed={200}>  // Fast for small buttons
<RipplePressable speed={500}>  // Normal for cards

// Use subtle effect colors
<RipplePressable effectColor="rgba(0, 0, 0, 0.1)">

// Memoize press handlers
const handlePress = useCallback(() => {
  // Your logic
}, [dependencies]);
```

### Don't ❌

```tsx
// Avoid extreme speeds
<RipplePressable speed={50}>   // Too fast
<RipplePressable speed={3000}> // Too slow

// Avoid overly bright effects
<RipplePressable effectColor="rgba(255, 0, 0, 0.8)">

// Avoid inline handlers (performance)
<RipplePressable onPress={() => console.log('pressed')}>
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

## Implementation Details

- Uses React Native's `Animated` API with `useNativeDriver: true` for performance
- Automatically calculates ripple size based on container dimensions and touch position
- Cleans up animations automatically to prevent memory leaks
- Supports both NativeWind classes and StyleSheet objects
- Detects child component's `borderRadius` and applies it to container for proper clipping

## Compatibility

- React Native 0.60+
- Expo SDK 45+
- TypeScript 4.8+
- iOS 11+ / Android API 21+
- NativeWind 2.0+ (optional)

## Troubleshooting

**No ripple effect visible**: Ensure the child component has defined dimensions.

**Effect overflows rounded corners**: The component automatically detects `borderRadius` from child styles.

**Performance issues**: Use `useCallback` for the `onPress` handler to prevent unnecessary re-renders.
