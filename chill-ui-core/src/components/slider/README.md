# Slider

A highly customizable React Native slider component that supports single and dual thumb sliders with smooth animations, gesture handling, and extensive customization options. Perfect for range selection, volume controls, and any interactive value input.

## Features

- ✅ **Single & Dual Thumb**: Support for both single value and range sliders
- ✅ **Smooth Animations**: Configurable animations with timing and spring options
- ✅ **Gesture Handling**: Full PanResponder integration for touch interactions
- ✅ **Custom Styling**: Complete control over track, thumb, and container styling
- ✅ **Track Marks**: Support for discrete slider with visual markers
- ✅ **Step Values**: Discrete slider with configurable step increments
- ✅ **RTL Support**: Full right-to-left language support
- ✅ **Vertical Orientation**: Support for vertical slider layout
- ✅ **Custom Components**: Render custom components above/below thumbs
- ✅ **Accessibility**: Screen reader support and accessibility features
- ✅ **Performance**: Optimized with React.memo and useCallback
- ✅ **TypeScript**: Full type safety with detailed interfaces

## Quick Start

```tsx
import Slider from '@/components/slider/Slider';

// Basic single slider
<Slider
  value={50}
  minimumValue={0}
  maximumValue={100}
  onValueChange={(value) => console.log('Value:', value)}
/>

// Range slider
<Slider
  value={[25, 75]}
  minimumValue={0}
  maximumValue={100}
  onValueChange={(values) => setRange(values)}
/>
```

## Examples

### Basic Usage

```tsx
import Slider from '@/components/slider/Slider';

// Single value slider
<Slider
  value={30}
  minimumValue={0}
  maximumValue={100}
  onValueChange={(value) => setValue(value)}
/>

// Range slider with custom colors
<Slider
  value={[20, 80]}
  minimumValue={0}
  maximumValue={100}
  minimumTrackColor="#007AFF"
  maximumTrackColor="#E5E5EA"
  thumbColor="#007AFF"
  onValueChange={(values) => setRange(values)}
/>

// Disabled slider
<Slider
  value={50}
  minimumValue={0}
  maximumValue={100}
  disabled={true}
/>
```

### Custom Styling

```tsx
// Custom track and thumb styling
<Slider
  value={60}
  minimumValue={0}
  maximumValue={100}
  trackClassName="h-2 rounded-full"
  thumbClassName="w-6 h-6 rounded-full shadow-lg"
  minimumTrackColor="#10B981"
  maximumTrackColor="#E5E7EB"
  thumbColor="#10B981"
  onValueChange={(value) => setValue(value)}
/>

// Custom container styling
<Slider
  value={40}
  minimumValue={0}
  maximumValue={100}
  containerClassName="p-4 bg-gray-50 rounded-lg"
  trackClassName="h-3 rounded-full"
  thumbClassName="w-8 h-8 rounded-full"
  onValueChange={(value) => setValue(value)}
/>
```

### Discrete Slider

```tsx
// Step-based slider
<Slider
  value={2}
  minimumValue={0}
  maximumValue={5}
  step={1}
  trackMarks={[0, 1, 2, 3, 4, 5]}
  onValueChange={(value) => setRating(value)}
/>

// Custom track marks
<Slider
  value={3}
  minimumValue={1}
  maximumValue={5}
  step={1}
  trackMarks={[1, 2, 3, 4, 5]}
  renderTrackMarkComponent={(index, value) => (
    <Box className="w-2 h-2 bg-gray-400 rounded-full" />
  )}
  onValueChange={(value) => setRating(value)}
/>
```

### Range Slider

```tsx
// Price range slider
<Slider
  value={[100, 500]}
  minimumValue={0}
  maximumValue={1000}
  step={10}
  minimumTrackColor="#007AFF"
  maximumTrackColor="#E5E5EA"
  thumbColor="#007AFF"
  onValueChange={(values) => setPriceRange(values)}
  onSlidingComplete={(values) => console.log('Final range:', values)}
/>

// Time range slider
<Slider
  value={[9, 17]}
  minimumValue={0}
  maximumValue={24}
  step={1}
  trackMarks={[0, 6, 12, 18, 24]}
  renderAboveThumbComponent={(index, value) => (
    <Box className="bg-gray-800 px-2 py-1 rounded">
      <String className="text-white text-xs">{value}:00</String>
    </Box>
  )}
  onValueChange={(values) => setTimeRange(values)}
/>
```

### Custom Components

```tsx
// Custom thumb component
<Slider
  value={75}
  minimumValue={0}
  maximumValue={100}
  renderThumbComponent={(index, value) => (
    <Box className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
      <String className="text-white text-xs font-bold">{value}%</String>
    </Box>
  )}
  onValueChange={(value) => setValue(value)}
/>

// Custom track components
<Slider
  value={60}
  minimumValue={0}
  maximumValue={100}
  renderMinimumTrackComponent={() => (
    <Box className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
  )}
  renderMaximumTrackComponent={() => (
    <Box className="h-2 bg-gray-200 rounded-full" />
  )}
  onValueChange={(value) => setValue(value)}
/>
```

### Vertical Slider

```tsx
// Vertical volume slider
<Slider
  value={70}
  minimumValue={0}
  maximumValue={100}
  vertical={true}
  containerClassName="h-32 w-10"
  trackClassName="w-2 rounded-full"
  thumbClassName="w-6 h-6 rounded-full"
  minimumTrackColor="#007AFF"
  maximumTrackColor="#E5E5EA"
  thumbColor="#007AFF"
  onValueChange={value => setVolume(value)}
/>
```

## Props Reference

### SliderProps

| Prop                          | Type                                          | Default                     | Description                               |
| ----------------------------- | --------------------------------------------- | --------------------------- | ----------------------------------------- |
| `animateTransitions`          | `boolean`                                     | `true`                      | Whether to animate value transitions      |
| `animationConfig`             | `object`                                      | `{}`                        | Configuration for animations              |
| `animationType`               | `'timing' \| 'spring'`                        | `'timing'`                  | Type of animation                         |
| `containerClassName`          | `string`                                      | -                           | Custom CSS classes for the container      |
| `debugTouchArea`              | `boolean`                                     | `false`                     | Show debug touch areas (development only) |
| `disabled`                    | `boolean`                                     | `false`                     | Whether the slider is disabled            |
| `maximumTrackClassName`       | `string`                                      | -                           | Custom CSS classes for maximum track      |
| `maximumTrackColor`           | `string`                                      | `'#b3b3b3'`                 | Color of the maximum track                |
| `maximumValue`                | `number`                                      | `1`                         | Maximum value of the slider               |
| `minimumTrackClassName`       | `string`                                      | -                           | Custom CSS classes for minimum track      |
| `minimumTrackColor`           | `string`                                      | `'#3f3f3f'`                 | Color of the minimum track                |
| `minimumValue`                | `number`                                      | `0`                         | Minimum value of the slider               |
| `onSlidingComplete`           | `(values: number[], index: number) => void`   | -                           | Callback when sliding completes           |
| `onSlidingStart`              | `(values: number[], index: number) => void`   | -                           | Callback when sliding starts              |
| `onValueChange`               | `(values: number[], index: number) => void`   | -                           | Callback when value changes               |
| `renderAboveThumbComponent`   | `(index: number, value: number) => ReactNode` | -                           | Component to render above thumb           |
| `renderBelowThumbComponent`   | `(index: number, value: number) => ReactNode` | -                           | Component to render below thumb           |
| `renderMaximumTrackComponent` | `() => ReactNode`                             | -                           | Custom maximum track component            |
| `renderMinimumTrackComponent` | `() => ReactNode`                             | -                           | Custom minimum track component            |
| `renderThumbComponent`        | `(index: number, value: number) => ReactNode` | -                           | Custom thumb component                    |
| `renderTrackMarkComponent`    | `(index: number, value: number) => ReactNode` | -                           | Custom track mark component               |
| `step`                        | `number`                                      | `0`                         | Step value for discrete slider            |
| `thumbClassName`              | `string`                                      | -                           | Custom CSS classes for thumb              |
| `thumbColor`                  | `string`                                      | `'#343434'`                 | Color of the thumb                        |
| `thumbImage`                  | `any`                                         | -                           | Image for the thumb                       |
| `thumbTouchSize`              | `{ width: number, height: number }`           | `{ width: 10, height: 10 }` | Touch area size for thumb                 |
| `trackClassName`              | `string`                                      | -                           | Custom CSS classes for track              |
| `trackClickable`              | `boolean`                                     | `true`                      | Whether track is clickable                |
| `trackMarks`                  | `number[]`                                    | `[]`                        | Array of track mark values                |
| `value`                       | `number \| number[]`                          | `0`                         | Current value(s) of the slider            |
| `vertical`                    | `boolean`                                     | `false`                     | Whether slider is vertical                |

## Best Practices

### 1. Choose Appropriate Value Types

```tsx
// ✅ Good - Single value for simple sliders
<Slider value={50} minimumValue={0} maximumValue={100} />

// ✅ Good - Array for range sliders
<Slider value={[25, 75]} minimumValue={0} maximumValue={100} />

// ❌ Avoid - Wrong value type for use case
<Slider value={50} minimumValue={0} maximumValue={100} /> // For range selection
```

### 2. Use Meaningful Step Values

```tsx
// ✅ Good - Appropriate step for use case
<Slider value={3} minimumValue={1} maximumValue={5} step={1} /> // Rating
<Slider value={50} minimumValue={0} maximumValue={100} step={5} /> // Percentage

// ❌ Avoid - Too small steps for UI
<Slider value={50} minimumValue={0} maximumValue={100} step={0.1} /> // For simple UI
```

### 3. Provide Clear Visual Feedback

```tsx
// ✅ Good - Clear visual distinction
<Slider
  value={60}
  minimumTrackColor="#007AFF"
  maximumTrackColor="#E5E5EA"
  thumbColor="#007AFF"
/>

// ❌ Avoid - Poor contrast
<Slider
  value={60}
  minimumTrackColor="#CCCCCC"
  maximumTrackColor="#DDDDDD"
  thumbColor="#EEEEEE"
/>
```

### 4. Handle Callbacks Appropriately

```tsx
// ✅ Good - Appropriate callback usage
<Slider
  value={value}
  onValueChange={(newValue) => setValue(newValue)} // Update state
  onSlidingComplete={(finalValue) => saveValue(finalValue)} // Save on complete
/>

// ❌ Avoid - Unnecessary re-renders
<Slider
  value={value}
  onValueChange={(newValue) => {
    setValue(newValue);
    saveValue(newValue); // Don't save on every change
  }}
/>
```

### 5. Consider Accessibility

```tsx
// ✅ Good - Accessible slider
<Slider
  value={volume}
  minimumValue={0}
  maximumValue={100}
  onValueChange={(value) => setVolume(value)}
  // Add accessibility props to container
  accessible={true}
  accessibilityLabel="Volume control"
  accessibilityHint="Adjust volume level"
/>

// ❌ Avoid - No accessibility context
<Slider value={volume} onValueChange={setVolume} />
```

## Advanced Usage

### Complex Range Slider

```tsx
const [priceRange, setPriceRange] = useState([100, 500]);
const [isSliding, setIsSliding] = useState(false);

<Box className="space-y-4 p-6">
  <Box className="flex-row justify-between">
    <String className="text-lg font-semibold">Price Range</String>
    <String className="text-lg">
      ${priceRange[0]} - ${priceRange[1]}
    </String>
  </Box>

  <Slider
    value={priceRange}
    minimumValue={0}
    maximumValue={1000}
    step={10}
    minimumTrackColor="#007AFF"
    maximumTrackColor="#E5E5EA"
    thumbColor="#007AFF"
    onSlidingStart={() => setIsSliding(true)}
    onValueChange={values => setPriceRange(values)}
    onSlidingComplete={values => {
      setPriceRange(values);
      setIsSliding(false);
    }}
  />

  {isSliding && <String className="text-center text-sm text-gray-500">Adjusting price range...</String>}
</Box>;
```

### Custom Track Marks

```tsx
const timeMarks = [0, 6, 12, 18, 24];

<Slider
  value={[9, 17]}
  minimumValue={0}
  maximumValue={24}
  step={1}
  trackMarks={timeMarks}
  renderTrackMarkComponent={(index, value) => (
    <Box className="items-center">
      <Box className="h-4 w-1 rounded bg-gray-300" />
      <String className="mt-1 text-xs text-gray-500">
        {value === 0 ? '12AM' : value === 12 ? '12PM' : value > 12 ? `${value - 12}PM` : `${value}AM`}
      </String>
    </Box>
  )}
  onValueChange={values => setTimeRange(values)}
/>;
```

### Performance Optimization

```tsx
const SliderWithMemo = React.memo(({ value, onValueChange, ...props }) => (
  <Slider value={value} onValueChange={useCallback(onValueChange, [onValueChange])} {...props} />
));

// Usage
<SliderWithMemo value={volume} onValueChange={value => setVolume(value)} minimumValue={0} maximumValue={100} />;
```

### Custom Animation

```tsx
<Slider
  value={progress}
  minimumValue={0}
  maximumValue={100}
  animationType="spring"
  animationConfig={{
    tension: 100,
    friction: 8,
  }}
  onValueChange={value => setProgress(value)}
/>
```

## Performance Considerations

- **Optimized Rendering**: Uses React.memo and useCallback for performance
- **Gesture Handling**: Efficient PanResponder implementation
- **Animation Performance**: Shared animated values for smooth transitions
- **Memory Management**: Proper cleanup of animated values and listeners

## Accessibility

The Slider component includes comprehensive accessibility features:

- **Screen reader support**: Proper accessibility labels and hints
- **Keyboard navigation**: Support for keyboard interactions
- **Focus management**: Clear focus indicators
- **VoiceOver/TalkBack**: Full support for screen readers

### Accessibility Best Practices

```tsx
// Always provide accessibility context
<Slider
  value={volume}
  minimumValue={0}
  maximumValue={100}
  accessible={true}
  accessibilityLabel="Volume control"
  accessibilityHint="Double tap and drag to adjust volume"
  accessibilityRole="adjustable"
  accessibilityValue={{
    min: 0,
    max: 100,
    now: volume,
  }}
  onValueChange={(value) => setVolume(value)}
/>

// Use appropriate accessibility values
<Slider
  value={rating}
  minimumValue={1}
  maximumValue={5}
  step={1}
  accessible={true}
  accessibilityLabel="Rating slider"
  accessibilityValue={{
    min: 1,
    max: 5,
    now: rating,
    text: `${rating} out of 5 stars`,
  }}
  onValueChange={(value) => setRating(value)}
/>
```

## Troubleshooting

### Common Issues

1. **Slider not responding to touch**: Check if `disabled` prop is set to true
2. **Values not updating**: Ensure `onValueChange` callback is provided
3. **Animation not working**: Verify `animateTransitions` is enabled
4. **Track marks not showing**: Check `trackMarks` array and `step` value
5. **Custom components not rendering**: Verify render function signatures

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

<Slider
  value={value}
  minimumValue={0}
  maximumValue={100}
  debugTouchArea={true}
  onValueChange={newValue => {
    setValue(newValue);
    setDebugInfo({
      value: newValue,
      timestamp: Date.now(),
    });
  }}
/>;

{
  debugInfo.value && (
    <Box className="rounded bg-gray-100 p-4">
      <String>Debug: {JSON.stringify(debugInfo)}</String>
    </Box>
  );
}
```

## Migration from Other Libraries

### From react-native-slider

```tsx
// Old (react-native-slider)
<Slider
  value={value}
  minimumValue={0}
  maximumValue={100}
  onValueChange={setValue}
  style={styles.slider}
/>

// New (Slider)
<Slider
  value={value}
  minimumValue={0}
  maximumValue={100}
  onValueChange={(value) => setValue(value)}
  trackClassName="h-2 rounded-full"
  thumbClassName="w-6 h-6 rounded-full"
/>
```

### From custom slider implementation

```tsx
// Old (custom implementation)
<View style={styles.container}>
  <View style={styles.track} />
  <View style={[styles.thumb, { left: thumbPosition }]} />
</View>

// New (Slider)
<Slider
  value={value}
  minimumValue={0}
  maximumValue={100}
  onValueChange={(value) => setValue(value)}
/>
```
