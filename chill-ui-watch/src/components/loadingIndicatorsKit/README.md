# Loading Indicators Kit

A comprehensive collection of loading animation components for React Native. Features 10 different animation types with customizable size, color, and behavior. Perfect for providing visual feedback during data loading, API calls, and user interactions.

## Features

- ✅ **10 Animation Types**: Bounce, Chase, CircleFade, Flow, Fold, Grid, Pulse, Spinner, Swing, Wander
- ✅ **Customizable Size**: Support for size variants (xs, sm, md, lg) and custom pixel values
- ✅ **Color Customization**: Full color control for all animations
- ✅ **Animation Control**: Start, stop, and pause animations programmatically
- ✅ **Accessibility**: Screen reader support and ARIA attributes
- ✅ **Performance**: Optimized animations using React Native Animated API
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Flexible**: Easy to extend with custom animations

## Quick Start

```tsx
import LoadingIndicator from '@/components/loadingIndicatorsKit/LoadingIndicator';

// Basic usage with default spinner
<LoadingIndicator />

// Specific animation type
<LoadingIndicator name="bounce" size={24} color="#007AFF" />
```

## Animation Types

### 1. Spinner (Default)

A classic rotating spinner animation.

```tsx
<LoadingIndicator name="spinner" size="md" color="#007AFF" />
```

### 2. Bounce

A bouncing dot animation that moves up and down.

```tsx
<LoadingIndicator name="bounce" size={32} color="#FF6B6B" />
```

### 3. Chase

Multiple dots that chase each other in a circular pattern.

```tsx
<LoadingIndicator name="chase" size="lg" color="#4ECDC4" />
```

### 4. CircleFade

Dots that fade in and out in a circular arrangement.

```tsx
<LoadingIndicator name="circleFade" size={40} color="#45B7D1" />
```

### 5. Flow

A flowing wave-like animation.

```tsx
<LoadingIndicator name="flow" size="sm" color="#96CEB4" />
```

### 6. Fold

A folding paper-like animation.

```tsx
<LoadingIndicator name="fold" size={28} color="#FFEAA7" />
```

### 7. Grid

A grid of dots that animate in sequence.

```tsx
<LoadingIndicator name="grid" size={36} color="#DDA0DD" />
```

### 8. Pulse

A pulsing scale animation.

```tsx
<LoadingIndicator name="pulse" size="md" color="#FF8C42" />
```

### 9. Swing

A swinging pendulum-like animation.

```tsx
<LoadingIndicator name="swing" size={44} color="#98D8C8" />
```

### 10. Wander

A wandering dot that moves in a complex pattern.

```tsx
<LoadingIndicator name="wander" size={48} color="#F7DC6F" />
```

## Examples

### Basic Usage

```tsx
import LoadingIndicator from '@/components/loadingIndicatorsKit/LoadingIndicator';

// Default spinner
<LoadingIndicator />

// Specific animation with custom size and color
<LoadingIndicator
  name="bounce"
  size={32}
  color="#007AFF"
/>

// Using size variants
<LoadingIndicator name="pulse" size="lg" />
<LoadingIndicator name="chase" size="md" />
<LoadingIndicator name="flow" size="sm" />
<LoadingIndicator name="grid" size="xs" />
```

### Animation Control

```tsx
const [isLoading, setIsLoading] = useState(true);

// Control animation state
<LoadingIndicator name="spinner" animating={isLoading} hidesWhenStopped={true} />;

// Start/stop animation
const startLoading = () => setIsLoading(true);
const stopLoading = () => setIsLoading(false);
```

### Custom Styling

```tsx
<LoadingIndicator
  name="pulse"
  size={40}
  color="#FF6B6B"
  style={{
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
  }}
/>
```

### Accessibility

```tsx
<LoadingIndicator name="spinner" accessible={true} accessibilityLabel="Loading content, please wait" />
```

### Different Sizes

```tsx
// Size variants
<LoadingIndicator name="bounce" size="xs" />   // 12px
<LoadingIndicator name="bounce" size="sm" />   // 16px
<LoadingIndicator name="bounce" size="md" />   // 24px
<LoadingIndicator name="bounce" size="lg" />   // 32px

// Custom pixel values
<LoadingIndicator name="bounce" size={20} />
<LoadingIndicator name="bounce" size={48} />
<LoadingIndicator name="bounce" size={64} />
```

## Props Reference

### LoadingIndicatorProps

| Prop                 | Type                                     | Default     | Description                            |
| -------------------- | ---------------------------------------- | ----------- | -------------------------------------- |
| `name`               | `LoadingIndicatorType`                   | `'spinner'` | Type of loading animation              |
| `size`               | `number \| 'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'`      | Size of the loading indicator          |
| `color`              | `string`                                 | `'#000'`    | Color of the loading indicator         |
| `animating`          | `boolean`                                | `true`      | Whether the animation is running       |
| `hidesWhenStopped`   | `boolean`                                | `true`      | Whether to hide when stopped           |
| `style`              | `ViewStyle`                              | -           | Custom styles for the container        |
| `accessible`         | `boolean`                                | -           | Whether the component is accessible    |
| `accessibilityLabel` | `string`                                 | -           | Accessibility label for screen readers |

### LoadingIndicatorType

```tsx
type LoadingIndicatorType =
  | 'bounce'
  | 'chase'
  | 'circleFade'
  | 'flow'
  | 'fold'
  | 'grid'
  | 'pulse'
  | 'spinner'
  | 'swing'
  | 'wander';
```

## Size Variants

| Size   | Pixel Value | Use Case                      |
| ------ | ----------- | ----------------------------- |
| `xs`   | 12px        | Small inline indicators       |
| `sm`   | 16px        | Compact indicators            |
| `md`   | 24px        | Standard indicators (default) |
| `lg`   | 32px        | Large indicators              |
| Custom | Any number  | Specific size requirements    |

## Individual Components

Each animation type is available as a separate component:

```tsx
import {
  Bounce,
  Chase,
  CircleFade,
  Flow,
  Fold,
  Grid,
  Pulse,
  Spinner,
  Swing,
  Wander
} from '@/components/loadingIndicatorsKit';

// Use individual components
<Bounce size={24} color="#007AFF" />
<Chase size="lg" color="#4ECDC4" />
<Pulse size={32} color="#FF6B6B" />
```

## AnimationContainer

For custom animations, use the `AnimationContainer` component:

```tsx
import AnimationContainer from '@/components/loadingIndicatorsKit/AnimationContainer';

<AnimationContainer
  animating={isLoading}
  initAnimation={() => ({
    rotation: value => ({
      animation: Animated.loop(
        Animated.timing(value, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ),
      values: [
        value.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      ],
    }),
  })}
>
  {({ rotation }) => (
    <Animated.View style={{ transform: [{ rotate: rotation[0] }] }}>
      <Icon name="spinner" />
    </Animated.View>
  )}
</AnimationContainer>;
```

## Best Practices

### 1. Choose Appropriate Animation Types

```tsx
// ✅ Good - Use spinner for general loading
<LoadingIndicator name="spinner" />

// ✅ Good - Use pulse for content loading
<LoadingIndicator name="pulse" />

// ✅ Good - Use bounce for button states
<LoadingIndicator name="bounce" size="sm" />

// ❌ Avoid - Don't use complex animations for simple loading
<LoadingIndicator name="wander" size="xs" />
```

### 2. Use Appropriate Sizes

```tsx
// ✅ Good - Small size for inline loading
<LoadingIndicator name="spinner" size="xs" />

// ✅ Good - Medium size for content areas
<LoadingIndicator name="spinner" size="md" />

// ✅ Good - Large size for full-screen loading
<LoadingIndicator name="spinner" size="lg" />

// ❌ Avoid - Don't use large animations in small spaces
<LoadingIndicator name="chase" size="lg" />
```

### 3. Provide Accessibility Labels

```tsx
// ✅ Good - Clear accessibility label
<LoadingIndicator
  name="spinner"
  accessible={true}
  accessibilityLabel="Loading user data, please wait"
/>

// ❌ Avoid - No accessibility information
<LoadingIndicator name="spinner" />
```

### 4. Control Animation State

```tsx
// ✅ Good - Control animation based on loading state
<LoadingIndicator
  name="spinner"
  animating={isLoading}
  hidesWhenStopped={true}
/>

// ❌ Avoid - Always animating even when not needed
<LoadingIndicator name="spinner" animating={true} />
```

### 5. Use Consistent Colors

```tsx
// ✅ Good - Use brand colors consistently
<LoadingIndicator name="spinner" color="#007AFF" />

// ✅ Good - Use semantic colors
<LoadingIndicator name="spinner" color="#FF6B6B" /> // Error state
<LoadingIndicator name="spinner" color="#4ECDC4" /> // Success state

// ❌ Avoid - Random colors
<LoadingIndicator name="spinner" color="#FF00FF" />
```

## Advanced Usage

### Custom Animation with AnimationContainer

```tsx
import AnimationContainer from '@/components/loadingIndicatorsKit/AnimationContainer';

const CustomLoadingAnimation = ({ isLoading }) => (
  <AnimationContainer
    animating={isLoading}
    initAnimation={() => ({
      scale: value => ({
        animation: Animated.loop(
          Animated.sequence([
            Animated.timing(value, { toValue: 1, duration: 500 }),
            Animated.timing(value, { toValue: 0.5, duration: 500 }),
          ]),
        ),
        values: [
          value.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          }),
        ],
      }),
      opacity: value => ({
        animation: Animated.loop(Animated.timing(value, { toValue: 1, duration: 1000 })),
        values: [
          value.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
          }),
        ],
      }),
    })}
  >
    {({ scale, opacity }) => (
      <Animated.View
        style={{
          transform: [{ scale: scale[0] }],
          opacity: opacity[0],
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#007AFF',
        }}
      />
    )}
  </AnimationContainer>
);
```

### Loading States in Forms

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    await submitForm();
  } finally {
    setIsSubmitting(false);
  }
};

<Button onPress={handleSubmit} disabled={isSubmitting}>
  {isSubmitting ? (
    <Box className="flex-row items-center gap-2">
      <LoadingIndicator name="bounce" size="xs" color="white" />
      <String color="white">Submitting...</String>
    </Box>
  ) : (
    <String color="white">Submit</String>
  )}
</Button>;
```

### Loading in Lists

```tsx
const [isLoading, setIsLoading] = useState(false);
const [items, setItems] = useState([]);

const loadMoreItems = async () => {
  setIsLoading(true);
  try {
    const newItems = await fetchItems();
    setItems(prev => [...prev, ...newItems]);
  } finally {
    setIsLoading(false);
  }
};

<FlatList
  data={items}
  renderItem={renderItem}
  ListFooterComponent={
    isLoading ? (
      <Box className="items-center p-4">
        <LoadingIndicator name="pulse" size="md" />
      </Box>
    ) : null
  }
  onEndReached={loadMoreItems}
/>;
```

### Full-Screen Loading

```tsx
const [isLoading, setIsLoading] = useState(true);

if (isLoading) {
  return (
    <Box className="flex-1 items-center justify-center bg-white">
      <LoadingIndicator name="spinner" size="lg" color="#007AFF" />
      <String className="mt-4" color="gray">
        Loading...
      </String>
    </Box>
  );
}
```

## Performance Considerations

- All animations use React Native's native driver when possible
- Animations are optimized for 60fps performance
- Components use `memo` to prevent unnecessary re-renders
- Animation state is managed efficiently to avoid memory leaks

## Accessibility

The loading indicators include comprehensive accessibility features:

- **Screen reader support**: Proper labeling and announcements
- **Animation control**: Users can disable animations in system settings
- **Focus management**: Proper focus handling
- **ARIA attributes**: Correct semantic markup

### Accessibility Best Practices

```tsx
// Always provide accessibility labels
<LoadingIndicator
  name="spinner"
  accessible={true}
  accessibilityLabel="Loading content, please wait"
/>

// Respect user's animation preferences
<LoadingIndicator
  name="spinner"
  animating={!isReducedMotionEnabled}
/>

// Provide context for screen readers
<LoadingIndicator
  name="spinner"
  accessibilityLabel="Loading user profile data"
/>
```

## Troubleshooting

### Common Issues

1. **Animation not playing**: Check that `animating` prop is true
2. **Animation too fast/slow**: Adjust duration in individual components
3. **Performance issues**: Ensure animations use native driver
4. **Accessibility issues**: Provide proper accessibility labels

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

<LoadingIndicator
  name="spinner"
  onLayout={event => {
    setDebugInfo({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }}
/>;

{
  debugInfo.width && <String>Debug: {JSON.stringify(debugInfo)}</String>;
}
```

## Migration from Other Libraries

### From react-native-spinkit

```tsx
// Old (react-native-spinkit)
<Spinner type="Bounce" size={24} color="#007AFF" />

// New (LoadingIndicatorsKit)
<LoadingIndicator name="bounce" size={24} color="#007AFF" />
```

### From react-native-loading-spinner-overlay

```tsx
// Old (react-native-loading-spinner-overlay)
<Spinner visible={isLoading} />;

// New (LoadingIndicatorsKit)
{
  isLoading && (
    <Box className="absolute inset-0 items-center justify-center bg-black/50">
      <LoadingIndicator name="spinner" size="lg" color="white" />
    </Box>
  );
}
```
