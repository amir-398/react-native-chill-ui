# LoadingIndicator Component

A comprehensive collection of loading animation components for React Native that provides 10 different animation types with customizable size, color, and behavior. Perfect for providing visual feedback during data loading, API calls, and user interactions.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { LoadingIndicator } from 'react-native-chill-ui'`

## Features

- **10 Animation Types**: Bounce, Chase, CircleFade, Flow, Fold, Grid, Pulse, Spinner, Swing, Wander
- **Customizable Size**: Support for custom pixel values and consistent sizing
- **Color Customization**: Full color control for all animations
- **Animation Control**: Start, stop, and pause animations programmatically
- **Accessibility**: Screen reader support and ARIA attributes
- **Performance**: Optimized animations using React Native Animated API
- **TypeScript Support**: Fully typed for a better development experience

## Quick Start

```tsx
import { LoadingIndicator } from 'react-native-chill-ui';

// Basic usage with default spinner
<LoadingIndicator />

// Specific animation type
<LoadingIndicator name="bounce" size={40} color="#007AFF" />

// With animation control
<LoadingIndicator
  name="pulse"
  size={32}
  color="#FF6B6B"
  animating={isLoading}
  hidesWhenStopped={false}
/>
```

## Choosing the Right Version

Select the appropriate version during installation based on your project's needs:

| Version        | Installation Command                           | Use When                                                                                             | Pros                                                                            | Cons                                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **StyleSheet** | `npm install react-native-chill-ui@stylesheet` | • No CSS-in-JS dependencies<br/>• Maximum performance needed<br/>• Simple styling requirements       | • Lightweight<br/>• Fast performance<br/>• No external dependencies             | • Less flexible<br/>• Manual theme management         |
| **Tailwind**   | `npm install react-native-chill-ui@tailwind`   | • Already using NativeWind<br/>• Team familiar with Tailwind<br/>• Design system based on utilities  | • Consistent with web Tailwind<br/>• Powerful utility system<br/>• Easy theming | • Requires NativeWind setup<br/>• Larger bundle size  |
| **Hybrid**     | `npm install react-native-chill-ui@hybrid`     | • Building component library<br/>• Uncertain about styling approach<br/>• Want maximum compatibility | • Works in any environment<br/>• Future-proof<br/>• Automatic detection         | • Slightly larger bundle<br/>• More complex internals |

## Animation Types

The LoadingIndicator component supports the following animation types:

- `spinner`: Classic rotating spinner (default)
- `bounce`: Three bouncing circles with staggered animation
- `chase`: Six dots arranged in a circle with chasing effect
- `circleFade`: Twelve circles arranged in a clock pattern with fading
- `flow`: Three circles in a flowing wave-like pattern
- `fold`: Four cubes in a folding animation with 3D effect
- `grid`: Nine squares arranged in a 3x3 grid with scaling
- `pulse`: Single circle with pulsing scale animation
- `swing`: Two circles with swinging pendulum-like animation
- `wander`: Two circles that wander around each other

## Size Variants

The LoadingIndicator component supports custom size values:

- **16-24px**: Small indicators for inline loading
- **32-40px**: Standard size for most use cases (default: 40px)
- **48-64px**: Large indicators for full-screen loading

## Examples

### Basic Usage

```tsx
import { LoadingIndicator } from 'react-native-chill-ui';

const BasicLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  return <LoadingIndicator name="bounce" size={40} color="#007AFF" animating={isLoading} />;
};

const DefaultLoading = () => {
  return <LoadingIndicator />;
};
```

### Animation Control

```tsx
const ControlledLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <View>
      <LoadingIndicator name="chase" size={32} color="#FF6B6B" animating={isLoading} hidesWhenStopped={false} />
      <Button title="Start" onPress={startLoading} />
      <Button title="Stop" onPress={stopLoading} />
    </View>
  );
};
```

### Size Variants

```tsx
const SizeVariants = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
      <LoadingIndicator name="spinner" size={16} color="#007AFF" />
      <LoadingIndicator name="spinner" size={24} color="#007AFF" />
      <LoadingIndicator name="spinner" size={32} color="#007AFF" />
      <LoadingIndicator name="spinner" size={40} color="#007AFF" />
      <LoadingIndicator name="spinner" size={48} color="#007AFF" />
    </View>
  );
};
```

### Animation Type Examples

```tsx
const AnimationTypes = () => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
      <LoadingIndicator name="bounce" size={40} color="#FF6B6B" />
      <LoadingIndicator name="chase" size={40} color="#34C759" />
      <LoadingIndicator name="circleFade" size={40} color="#FF9500" />
      <LoadingIndicator name="flow" size={40} color="#AF52DE" />
      <LoadingIndicator name="fold" size={40} color="#FF2D92" />
      <LoadingIndicator name="grid" size={40} color="#5AC8FA" />
      <LoadingIndicator name="pulse" size={40} color="#FF3B30" />
      <LoadingIndicator name="spinner" size={40} color="#007AFF" />
      <LoadingIndicator name="swing" size={40} color="#30D158" />
      <LoadingIndicator name="wander" size={40} color="#007AFF" />
    </View>
  );
};
```

### Loading States in Forms

```tsx
const FormWithLoading = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View>
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry />
      <Button title={isSubmitting ? 'Submitting...' : 'Submit'} onPress={handleSubmit} disabled={isSubmitting} />
      {isSubmitting && (
        <LoadingIndicator name="flow" size={24} color="#007AFF" style={{ alignSelf: 'center', marginTop: 10 }} />
      )}
    </View>
  );
};
```

### Loading in Lists

```tsx
const ListWithLoading = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const newItems = await fetchMoreItems();
      setItems(prev => [...prev, ...newItems]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <ItemComponent item={item} />}
      onEndReached={loadMore}
      ListFooterComponent={() =>
        isLoading ? (
          <LoadingIndicator name="grid" size={32} color="#007AFF" style={{ alignSelf: 'center', marginVertical: 20 }} />
        ) : null
      }
    />
  );
};
```

## API Reference

### LoadingIndicatorProps

| Prop                 | Type                                                                                                               | Default     | Description                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------- | --------------------------------------- |
| `name`               | `'bounce' \| 'chase' \| 'circleFade' \| 'flow' \| 'fold' \| 'grid' \| 'pulse' \| 'spinner' \| 'swing' \| 'wander'` | `'spinner'` | Type of loading animation to display    |
| `size`               | `number`                                                                                                           | `40`        | Size of the loading indicator in pixels |
| `color`              | `string`                                                                                                           | `'#000'`    | Color of the loading indicator          |
| `animating`          | `boolean`                                                                                                          | `true`      | Whether the animation is running        |
| `hidesWhenStopped`   | `boolean`                                                                                                          | `true`      | Whether to hide when animation stops    |
| `style`              | `StyleProp<ViewStyle>`                                                                                             | -           | Custom style object for the container   |
| `accessible`         | `boolean`                                                                                                          | -           | Whether the component is accessible     |
| `accessibilityLabel` | `string`                                                                                                           | -           | Accessibility label for screen readers  |

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

## Individual Components

You can also import and use individual animation components directly:

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
} from 'react-native-chill-ui';

// Use individual components
<Bounce size={40} color="#007AFF" />
<Chase size={32} color="#FF6B6B" />
<Pulse size={24} color="#34C759" />
```

Each component has the same props interface and includes full JSDoc documentation.

## Best Practices

### 1. Choose Appropriate Animation Types

- **Spinner**: Classic, universally recognized
- **Bounce**: Playful, good for casual apps
- **Pulse**: Subtle, good for minimal designs
- **Chase/CircleFade**: Professional, good for business apps
- **Flow**: Smooth, good for content loading
- **Grid**: Structured, good for data loading

### 2. Use Appropriate Sizes

- **16-24px**: Small indicators for inline loading
- **32-40px**: Standard size for most use cases
- **48-64px**: Large indicators for full-screen loading

### 3. Provide Accessibility Labels

```tsx
<LoadingIndicator name="spinner" accessible={true} accessibilityLabel="Loading content" />
```

### 4. Control Animation State

```tsx
const [isLoading, setIsLoading] = useState(false);

// Start loading
setIsLoading(true);

// Stop loading
setIsLoading(false);

<LoadingIndicator name="bounce" animating={isLoading} hidesWhenStopped={false} />;
```

### 5. Use Consistent Colors

```tsx
// Use your app's primary color
<LoadingIndicator name="spinner" color={theme.colors.primary} />

// Use semantic colors
<LoadingIndicator name="pulse" color="#34C759" /> // Success
<LoadingIndicator name="chase" color="#FF9500" /> // Warning
<LoadingIndicator name="bounce" color="#FF3B30" /> // Error
```

## Performance Considerations

- All animations use `useNativeDriver: true` for optimal performance
- Animations are automatically cleaned up when components unmount
- Use `hidesWhenStopped={false}` only when you need to show the static state
- Consider using smaller sizes for better performance on older devices

## Accessibility

### Screen Reader Support

```tsx
<LoadingIndicator
  name="spinner"
  accessible={true}
  accessibilityLabel="Loading user data"
  accessibilityRole="progressbar"
/>
```

### Accessibility Best Practices

1. **Provide meaningful labels**: Use descriptive accessibility labels
2. **Use appropriate roles**: Set `accessibilityRole="progressbar"` for loading indicators
3. **Announce state changes**: Use `accessibilityLiveRegion` for dynamic content
4. **Consider reduced motion**: Respect user preferences for reduced motion

## Troubleshooting

### Common Issues

1. **Animation not showing**
   - Check if `animating` prop is `true`
   - Verify `size` is greater than 0
   - Ensure `color` is a valid color string

2. **Animation not stopping**
   - Set `animating={false}` to stop the animation
   - Use `hidesWhenStopped={true}` to hide when stopped

3. **Performance issues**
   - Use smaller sizes for better performance
   - Avoid using too many loading indicators simultaneously
   - Consider using `useNativeDriver: true` (already enabled by default)

### Debug Example

```tsx
const DebugLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationType, setAnimationType] = useState('spinner');

  return (
    <View>
      <Text>Animation Type: {animationType}</Text>
      <Text>Is Loading: {isLoading.toString()}</Text>

      <LoadingIndicator
        name={animationType}
        size={40}
        color="#007AFF"
        animating={isLoading}
        style={{ borderWidth: 1, borderColor: 'red' }} // Debug border
      />

      <Button title="Toggle" onPress={() => setIsLoading(!isLoading)} />
    </View>
  );
};
```

## Migration from Other Libraries

### From react-native-spinkit

```tsx
// Before
import { Spinner } from 'react-native-spinkit';

<Spinner type="Bounce" size={40} color="#007AFF" />;

// After
import { LoadingIndicator } from 'react-native-chill-ui';

<LoadingIndicator name="bounce" size={40} color="#007AFF" />;
```

### From react-native-loading-spinner-overlay

```tsx
// Before
import Spinner from 'react-native-loading-spinner-overlay';

<Spinner visible={isLoading} textContent="Loading..." />;

// After
import { LoadingIndicator } from 'react-native-chill-ui';

{
  isLoading && (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <LoadingIndicator name="spinner" size={40} color="#007AFF" />
      <Text style={{ color: 'white', marginTop: 10 }}>Loading...</Text>
    </View>
  );
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

This component is part of the react-native-chill-ui library. See [LICENSE](../../LICENSE.md) for details.
