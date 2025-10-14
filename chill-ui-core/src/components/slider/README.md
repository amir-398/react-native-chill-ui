# Slider Component

A React Native component that provides a flexible and customizable slider interface for selecting values within a range. Built with React Native's Animated API for native performance, featuring smooth animations, multiple thumb support (range slider), customizable labels, and bidirectional synchronization across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Slider } from 'react-native-chill-ui'`

## Features

- **Single & Range Selection**: Support for single value or range (multiple thumbs) selection
- **Smooth Animations**: Native driver animations with customizable duration and types (timing/spring)
- **Visual Labels**: Customizable labels that follow thumbs with badge style
- **Flexible Orientation**: Horizontal or vertical slider modes
- **Performance Optimized**: Separate contexts for state and actions to prevent unnecessary re-renders
- **Gesture Support**: Pan gesture handlers with customizable touch areas for better UX
- **Step Control**: Discrete or continuous value selection with configurable step values
- **Flexible Styling**: Support for NativeWind classes and StyleSheet objects
- **Customizable**: Support for custom animations, disabled states, and clickable tracks
- **TypeScript Support**: Fully typed for a better development experience
- **Accessibility**: Inherits all React Native accessibility features
- **Memory Efficient**: Automatic cleanup to prevent memory leaks

## Quick Start

```tsx
import { Slider, SliderTrack, SliderRange, SliderThumb, SliderLabel } from 'react-native-chill-ui';

// Basic slider
<Slider value={50} minimumValue={0} maximumValue={100}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
</Slider>

// Slider with label
<Slider value={75} minimumValue={0} maximumValue={100}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
  <SliderLabel position="top">75%</SliderLabel>
</Slider>

// Range slider with two thumbs
<Slider value={[25, 75]} minimumValue={0} maximumValue={100}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb index={0} />
  <SliderThumb index={1} />
  <SliderLabel position="top" index={0}>25%</SliderLabel>
  <SliderLabel position="top" index={1}>75%</SliderLabel>
</Slider>

// Vertical slider
<Slider value={60} minimumValue={0} maximumValue={100} orientation="vertical">
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
  <SliderLabel position="bottom">60%</SliderLabel>
</Slider>
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
<Slider value={50} minimumValue={0} maximumValue={100}>
  <SliderTrack style={{ backgroundColor: '#E5E7EB' }}>
    <SliderRange style={{ backgroundColor: '#3B82F6' }} />
  </SliderTrack>
  <SliderThumb style={{ backgroundColor: '#3B82F6' }} />
  <SliderLabel position="top" style={{ backgroundColor: '#1F2937' }}>
    <String style={{ color: 'white' }}>50%</String>
  </SliderLabel>
</Slider>
```

## Props

### SliderProps

| Prop                 | Type                                        | Default        | Description                                                     |
| -------------------- | ------------------------------------------- | -------------- | --------------------------------------------------------------- |
| `children`           | `ReactNode`                                 | -              | SliderTrack, SliderThumb, and SliderLabel components (required) |
| `value`              | `number \| number[]`                        | `0`            | Current value(s) of the slider                                  |
| `minimumValue`       | `number`                                    | `0`            | Minimum value of the slider                                     |
| `maximumValue`       | `number`                                    | `1`            | Maximum value of the slider                                     |
| `step`               | `number`                                    | `0`            | Step value for discrete slider (0 for continuous)               |
| `isDisabled`         | `boolean`                                   | `false`        | Whether the slider is disabled                                  |
| `orientation`        | `'horizontal' \| 'vertical'`                | `'horizontal'` | Orientation of the slider                                       |
| `animateTransitions` | `boolean`                                   | `true`         | Whether to animate value transitions                            |
| `animationType`      | `'timing' \| 'spring'`                      | `'timing'`     | Type of animation to use                                        |
| `animationConfig`    | `object`                                    | `{}`           | Animation configuration object                                  |
| `trackRightPadding`  | `number`                                    | -              | Right padding for the track (defaults to thumb width)           |
| `onValueChange`      | `(values: number[], index: number) => void` | -              | Callback when value changes during sliding                      |
| `onSlidingStart`     | `(values: number[], index: number) => void` | -              | Callback when sliding starts                                    |
| `onSlidingComplete`  | `(values: number[], index: number) => void` | -              | Callback when sliding completes                                 |
| `className`          | `string`                                    | -              | Custom CSS classes for styling the container (NativeWind)       |
| `style`              | `StyleProp<ViewStyle>`                      | -              | Style object for the container (React Native)                   |

### SliderTrackProps

| Prop        | Type                   | Default | Description                                           |
| ----------- | ---------------------- | ------- | ----------------------------------------------------- |
| `children`  | `ReactNode`            | -       | SliderRange component to display (required)           |
| `clickable` | `boolean`              | `true`  | Whether clicking on the track moves the thumb         |
| `className` | `string`               | -       | Custom CSS classes for styling the track (NativeWind) |
| `style`     | `StyleProp<ViewStyle>` | -       | Style object for the track (React Native)             |

### SliderRangeProps

| Prop        | Type                   | Default | Description                                           |
| ----------- | ---------------------- | ------- | ----------------------------------------------------- |
| `className` | `string`               | -       | Custom CSS classes for styling the range (NativeWind) |
| `style`     | `StyleProp<ViewStyle>` | -       | Style object for the range (React Native)             |

### SliderThumbProps

| Prop            | Type                            | Default    | Description                                           |
| --------------- | ------------------------------- | ---------- | ----------------------------------------------------- |
| `index`         | `number`                        | `0`        | Index of the thumb (for multiple thumbs)              |
| `touchSize`     | `number`                        | `40`       | Touch area size in pixels for better gesture handling |
| `animationType` | `'scale' \| 'extend' \| 'none'` | `'extend'` | Animation type for the thumb when sliding             |
| `className`     | `string`                        | -          | Custom CSS classes for styling the thumb (NativeWind) |
| `style`         | `StyleProp<ViewStyle>`          | -          | Style object for the thumb (React Native)             |

### SliderLabelProps

| Prop          | Type                   | Default | Description                                                |
| ------------- | ---------------------- | ------- | ---------------------------------------------------------- |
| `children`    | `ReactNode`            | -       | Content to display in the label (required)                 |
| `position`    | `'top' \| 'bottom'`    | `'top'` | Position relative to the thumb                             |
| `index`       | `number`               | `0`     | Index of the thumb to follow (for multiple thumbs)         |
| `stringProps` | `object`               | -       | Props passed to String component when children is a string |
| `className`   | `string`               | -       | Custom CSS classes for styling the label (NativeWind)      |
| `style`       | `StyleProp<ViewStyle>` | -       | Style object for the label (React Native)                  |

## Usage Examples

### Basic Slider with Label

```tsx
const [value, setValue] = useState(50);

<Slider value={value} minimumValue={0} maximumValue={100} onValueChange={values => setValue(values[0])}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
  <SliderLabel position="top">{value}%</SliderLabel>
</Slider>;
```

### Range Slider (Two Thumbs)

```tsx
const [range, setRange] = useState([20, 80]);

<Slider value={range} minimumValue={0} maximumValue={100} onValueChange={values => setRange(values)}>
  <SliderTrack>
    <SliderRange className="bg-blue-500" />
  </SliderTrack>
  <SliderThumb index={0} />
  <SliderThumb index={1} />
  <SliderLabel position="top" index={0}>
    {range[0]}
  </SliderLabel>
  <SliderLabel position="top" index={1}>
    {range[1]}
  </SliderLabel>
</Slider>;
```

### Discrete Slider with Steps

```tsx
<Slider
  value={50}
  minimumValue={0}
  maximumValue={100}
  step={10}
  onValueChange={values => console.log('Value:', values[0])}
>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
  <SliderLabel position="top">{value}</SliderLabel>
</Slider>
```

### Vertical Slider

```tsx
<Slider value={60} minimumValue={0} maximumValue={100} orientation="vertical" style={{ height: 200 }}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
  <SliderLabel position="bottom">60%</SliderLabel>
</Slider>
```

### Custom Styling with Tailwind

```tsx
<Slider value={75} minimumValue={0} maximumValue={100}>
  <SliderTrack className="h-2 rounded-full bg-gray-200">
    <SliderRange className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
  </SliderTrack>
  <SliderThumb className="size-6 border-2 border-blue-500 bg-white shadow-lg" />
  <SliderLabel position="top" className="rounded-lg bg-blue-500 px-3 py-1">
    <String className="text-sm font-bold text-white">75%</String>
  </SliderLabel>
</Slider>
```

### Custom Thumb Animations

```tsx
// Scale animation
<SliderThumb animationType="scale" className="bg-red-500" />

// Extend animation (default)
<SliderThumb animationType="extend" className="bg-blue-500" />

// No animation
<SliderThumb animationType="none" className="bg-green-500" />
```

### With Custom Touch Area

```tsx
<Slider value={50} minimumValue={0} maximumValue={100}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb touchSize={60} /> {/* Larger touch area for better accessibility */}
</Slider>
```

### Disabled State

```tsx
<Slider value={50} minimumValue={0} maximumValue={100} isDisabled>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
  <SliderLabel position="top">50%</SliderLabel>
</Slider>
```

### Non-Clickable Track

```tsx
<Slider value={50} minimumValue={0} maximumValue={100}>
  <SliderTrack clickable={false}>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
</Slider>
```

### With Spring Animation

```tsx
<Slider
  value={50}
  minimumValue={0}
  maximumValue={100}
  animationType="spring"
  animationConfig={{ tension: 40, friction: 7 }}
>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
</Slider>
```

### Volume Control Example

```tsx
const [volume, setVolume] = useState(50);

<Box className="p-4">
  <String className="mb-2 text-lg font-semibold">Volume</String>
  <Slider value={volume} minimumValue={0} maximumValue={100} step={1} onValueChange={values => setVolume(values[0])}>
    <SliderTrack className="h-1 bg-gray-200">
      <SliderRange className="bg-blue-500" />
    </SliderTrack>
    <SliderThumb className="size-5 bg-blue-500" />
    <SliderLabel position="top" className="bg-blue-500">
      <Icon name="volume-up" color="white" size="sm" />
    </SliderLabel>
  </Slider>
</Box>;
```

### Price Range Filter

```tsx
const [priceRange, setPriceRange] = useState([100, 500]);

<Box className="p-4">
  <String className="mb-2 text-lg font-semibold">Price Range</String>
  <Slider value={priceRange} minimumValue={0} maximumValue={1000} step={10} onValueChange={setPriceRange}>
    <SliderTrack className="h-2 bg-gray-200">
      <SliderRange className="bg-green-500" />
    </SliderTrack>
    <SliderThumb index={0} className="size-6 bg-green-500" />
    <SliderThumb index={1} className="size-6 bg-green-500" />
    <SliderLabel position="top" index={0}>
      ${priceRange[0]}
    </SliderLabel>
    <SliderLabel position="top" index={1}>
      ${priceRange[1]}
    </SliderLabel>
  </Slider>
</Box>;
```

### With Custom Labels

```tsx
<Slider value={3} minimumValue={1} maximumValue={5} step={1}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
  <SliderLabel position="top">
    <Box className="rounded-full bg-purple-500 px-3 py-1">
      <String className="font-bold text-white">{['Bad', 'Poor', 'Good', 'Great', 'Excellent'][value - 1]}</String>
    </Box>
  </SliderLabel>
</Slider>
```

## Performance Notes

- The component uses separate contexts for state and actions to prevent unnecessary re-renders
- Animations use `useNativeDriver: false` due to animated layout properties
- Touch area is configurable for better performance on low-end devices
- The component automatically cleans up event listeners and animations on unmount
- For maximum performance, consider using discrete steps instead of continuous values
- Multiple thumbs (range slider) have minimal performance impact due to optimized rendering

## TypeScript Support

All components are fully typed with TypeScript interfaces:

```tsx
import {
  SliderRootPropsTw,
  SliderTrackPropsTw,
  SliderRangePropsTw,
  SliderThumbPropsTw,
  SliderLabelPropsTw,
} from '@types';
```

## Accessibility

The component supports React Native accessibility features:

- Configurable touch areas for better tap targets
- Support for `accessibilityLabel` for screen readers
- Support for `accessibilityRole` for proper semantic meaning
- Support for `accessibilityState` for disabled states
- Support for `testID` for testing purposes

## Advanced Usage

### Controlled vs Uncontrolled

The Slider component is a controlled component, meaning you need to manage the value state:

```tsx
// Controlled (recommended)
const [value, setValue] = useState(50);

<Slider value={value} onValueChange={values => setValue(values[0])}>
  {/* ... */}
</Slider>;
```

### Handling Multiple Callbacks

```tsx
<Slider
  value={value}
  onSlidingStart={(values, index) => {
    console.log('Started sliding thumb', index, 'at value', values[index]);
  }}
  onValueChange={(values, index) => {
    console.log('Value changed for thumb', index, 'to', values[index]);
    setValue(values);
  }}
  onSlidingComplete={(values, index) => {
    console.log('Finished sliding thumb', index, 'at value', values[index]);
    // Save to API, etc.
  }}
>
  {/* ... */}
</Slider>
```

### Custom Animation Configuration

```tsx
// Timing animation
<Slider
  value={value}
  animationType="timing"
  animationConfig={{
    duration: 300,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  }}
>
  {/* ... */}
</Slider>

// Spring animation
<Slider
  value={value}
  animationType="spring"
  animationConfig={{
    tension: 40,
    friction: 7,
    mass: 1,
  }}
>
  {/* ... */}
</Slider>
```

## Examples

Check the `App.tsx` file for complete working examples of all Slider features and usage patterns.

## Common Patterns

### Temperature Control

```tsx
const [temp, setTemp] = useState(20);

<Slider value={temp} minimumValue={10} maximumValue={30} step={0.5} onValueChange={values => setTemp(values[0])}>
  <SliderTrack>
    <SliderRange className="bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500" />
  </SliderTrack>
  <SliderThumb />
  <SliderLabel position="top">{temp}°C</SliderLabel>
</Slider>;
```

### Brightness Control

```tsx
const [brightness, setBrightness] = useState(70);

<Slider value={brightness} minimumValue={0} maximumValue={100} onValueChange={values => setBrightness(values[0])}>
  <SliderTrack className="h-2 bg-gray-800">
    <SliderRange className="bg-yellow-400" />
  </SliderTrack>
  <SliderThumb className="size-6 bg-yellow-400 shadow-lg shadow-yellow-400/50" />
  <SliderLabel position="top">
    <Icon name="sun" size="sm" color="white" />
  </SliderLabel>
</Slider>;
```

## Troubleshooting

### Slider not responding to gestures

- Ensure the parent container has enough space
- Check that `isDisabled` is not set to `true`
- Verify `touchSize` is large enough for comfortable interaction

### Animation feels laggy

- Try using `animationType="spring"` instead of `"timing"`
- Reduce `animationConfig.duration`
- Consider disabling animations with `animateTransitions={false}`

### Values not updating

- Make sure you're using a controlled component pattern
- Verify `onValueChange` callback is properly updating state
- Check that `minimumValue` < `maximumValue`

## License

MIT
