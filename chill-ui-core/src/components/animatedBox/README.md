# AnimatedBox Components

A collection of high-performance animated components for React Native that provides smooth, customizable animations with consistent APIs, TypeScript support, and automatic NativeWind compatibility.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { AnimatedBox, FadeInBox, ScaleInBox, SlideInBox, RotatingBox, BounceBox } from 'react-native-chill-ui'`

## Features

- ✅ **5 Animated Variants**: `AnimatedBox`, `FadeInBox`, `ScaleInBox`, `SlideInBox`, `RotatingBox`, `BounceBox`
- ✅ **Automatic NativeWind Detection**: Works with or without NativeWind installed
- ✅ **Consistent API**: Uniform props and ref methods across all components
- ✅ **Performance Optimized**: Uses `useNativeDriver: true` for 60fps animations
- ✅ **TypeScript**: Complete type safety with proper interfaces
- ✅ **Manual Control**: Ref-based methods for programmatic animation control
- ✅ **Customizable**: Configurable duration, delay, and animation parameters
- ✅ **Cross-Platform**: Consistent behavior across iOS and Android
- ✅ **Accessibility**: Proper animation handling for screen readers

## NativeWind Compatibility

The AnimatedBox components automatically detect whether NativeWind is installed and adapt accordingly:

- **With NativeWind**: Uses Tailwind CSS classes via the `className` prop
- **Without NativeWind**: Falls back to StyleSheet with equivalent styling

This makes the components compatible with projects that don't use NativeWind while maintaining full functionality.

## Quick Start

```tsx
import { AnimatedBox, FadeInBox, ScaleInBox, SlideInBox, RotatingBox, BounceBox } from 'react-native-chill-ui';

// Basic fade-in animation
<FadeInBox autoStart>
  <String>Fading in content</String>
</FadeInBox>

// Scale animation with delay
<ScaleInBox autoStart delay={500}>
  <String>Scaling in content</String>
</ScaleInBox>

// Slide animation from left
<SlideInBox direction="left" autoStart>
  <String>Sliding from left</String>
</SlideInBox>

// Rotating loader
<RotatingBox autoStart infiniteLoop>
  <Icon name="spinner" />
</RotatingBox>

// Bouncing element
<BounceBox autoStart infiniteLoop>
  <String>Bouncing content!</String>
</BounceBox>
```

## Choosing the Right Version

Select the appropriate version during installation based on your project's needs:

| Version        | Installation Command                           | Use When                                                                                             | Pros                                                                            | Cons                                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **StyleSheet** | `npm install react-native-chill-ui@stylesheet` | • No CSS-in-JS dependencies<br/>• Maximum performance needed<br/>• Simple styling requirements       | • Lightweight<br/>• Fast performance<br/>• No external dependencies             | • Less flexible<br/>• Manual theme management         |
| **Tailwind**   | `npm install react-native-chill-ui@tailwind`   | • Already using NativeWind<br/>• Team familiar with Tailwind<br/>• Design system based on utilities  | • Consistent with web Tailwind<br/>• Powerful utility system<br/>• Easy theming | • Requires NativeWind setup<br/>• Larger bundle size  |
| **Hybrid**     | `npm install react-native-chill-ui@hybrid`     | • Building component library<br/>• Uncertain about styling approach<br/>• Want maximum compatibility | • Works in any environment<br/>• Future-proof<br/>• Automatic detection         | • Slightly larger bundle<br/>• More complex internals |

## Configuration

### For Tailwind and Hybrid Versions

When using the Tailwind or Hybrid versions, you must define your application's color palette in your `tailwind.config.js` file.

### Styling

The AnimatedBox components support styling through:

- **NativeWind classes** (Tailwind/Hybrid versions): Use `className` prop
- **StyleSheet styles** (all versions): Use `style` prop with standard React Native properties

## Component Reference

### AnimatedBox

The base animated container component. Provides a foundation for custom animations.

```tsx
<AnimatedBox className="rounded-lg bg-gray-100 p-4">
  <String>Base animated container</String>
</AnimatedBox>
```

**Props:**

| Prop        | Type        | Required | Default | Description              |
| ----------- | ----------- | -------- | ------- | ------------------------ |
| `className` | `string`    | ❌       | -       | CSS classes (NativeWind) |
| `style`     | `ViewStyle` | ❌       | -       | Inline styles            |
| `children`  | `ReactNode` | ✅       | -       | Content to animate       |

All standard `View` props are also supported.

---

### FadeInBox

Animates opacity from 0 to 1 with smooth fade-in effect.

```tsx
<FadeInBox autoStart duration={1000} delay={500} className="rounded-lg bg-blue-500 p-6">
  <String className="text-white">Fading in content</String>
</FadeInBox>
```

**Props:**

| Prop           | Type        | Required | Default | Description                           |
| -------------- | ----------- | -------- | ------- | ------------------------------------- |
| `autoStart`    | `boolean`   | ❌       | `false` | Start animation automatically         |
| `duration`     | `number`    | ❌       | `1000`  | Animation duration in milliseconds    |
| `delay`        | `number`    | ❌       | `0`     | Delay before starting in milliseconds |
| `infiniteLoop` | `boolean`   | ❌       | `false` | Loop animation infinitely             |
| `className`    | `string`    | ❌       | -       | CSS classes (NativeWind)              |
| `style`        | `ViewStyle` | ❌       | -       | Inline styles                         |
| `children`     | `ReactNode` | ✅       | -       | Content to animate                    |

**Ref Methods:**

```tsx
const fadeRef = useRef<FadeInBoxRef>(null);

// Programmatic control
fadeRef.current?.start(); // Start animation
fadeRef.current?.stop(); // Stop animation
```

---

### ScaleInBox

Animates scale from 0.8 to 1.0 with spring physics for natural feel.

```tsx
<ScaleInBox autoStart delay={200} className="rounded-xl bg-green-500 p-6">
  <String className="text-white">Scaling in content</String>
</ScaleInBox>
```

**Props:**

| Prop           | Type        | Required | Default | Description                           |
| -------------- | ----------- | -------- | ------- | ------------------------------------- |
| `autoStart`    | `boolean`   | ❌       | `false` | Start animation automatically         |
| `delay`        | `number`    | ❌       | `0`     | Delay before starting in milliseconds |
| `infiniteLoop` | `boolean`   | ❌       | `false` | Loop animation infinitely             |
| `className`    | `string`    | ❌       | -       | CSS classes (NativeWind)              |
| `style`        | `ViewStyle` | ❌       | -       | Inline styles                         |
| `children`     | `ReactNode` | ✅       | -       | Content to animate                    |

**Ref Methods:**

```tsx
const scaleRef = useRef<ScaleInBoxRef>(null);

scaleRef.current?.start(); // Start animation
scaleRef.current?.stop(); // Stop animation
```

---

### SlideInBox

Animates position from off-screen to final position. Supports 4 directions.

```tsx
<SlideInBox direction="left" distance={100} autoStart className="rounded-lg bg-purple-500 p-6">
  <String className="text-white">Sliding in from left</String>
</SlideInBox>
```

**Props:**

| Prop           | Type                                  | Required | Default  | Description                           |
| -------------- | ------------------------------------- | -------- | -------- | ------------------------------------- |
| `direction`    | `'left' \| 'right' \| 'up' \| 'down'` | ❌       | `'left'` | Slide direction                       |
| `distance`     | `number`                              | ❌       | `100`    | Distance to slide in pixels           |
| `autoStart`    | `boolean`                             | ❌       | `false`  | Start animation automatically         |
| `duration`     | `number`                              | ❌       | `500`    | Animation duration in milliseconds    |
| `delay`        | `number`                              | ❌       | `0`      | Delay before starting in milliseconds |
| `infiniteLoop` | `boolean`                             | ❌       | `false`  | Loop animation infinitely             |
| `className`    | `string`                              | ❌       | -        | CSS classes (NativeWind)              |
| `style`        | `ViewStyle`                           | ❌       | -        | Inline styles                         |
| `children`     | `ReactNode`                           | ✅       | -        | Content to animate                    |

**Ref Methods:**

```tsx
const slideRef = useRef<SlideInBoxRef>(null);

slideRef.current?.start(); // Start animation
slideRef.current?.stop(); // Stop animation
```

---

### RotatingBox

Continuously rotates content 360 degrees. Perfect for loading spinners.

```tsx
// Rotation avec pauses entre les tours (comportement par défaut)
<RotatingBox autoStart infiniteLoop duration={2000} className="h-12 w-12 rounded-full bg-orange-500">
  <Icon name="spinner" className="text-white" />
</RotatingBox>

// Rotation continue sans pauses
<RotatingBox autoStart infiniteLoop continuous duration={2000} className="h-12 w-12 rounded-full bg-blue-500">
  <Icon name="spinner" className="text-white" />
</RotatingBox>
```

**Props:**

| Prop           | Type        | Required | Default | Description                             |
| -------------- | ----------- | -------- | ------- | --------------------------------------- |
| `autoStart`    | `boolean`   | ❌       | `false` | Start animation automatically           |
| `duration`     | `number`    | ❌       | `2000`  | One rotation duration in milliseconds   |
| `delay`        | `number`    | ❌       | `0`     | Delay before starting in milliseconds   |
| `infiniteLoop` | `boolean`   | ❌       | `false` | Loop animation infinitely               |
| `continuous`   | `boolean`   | ❌       | `false` | Make rotation continuous without pauses |
| `className`    | `string`    | ❌       | -       | CSS classes (NativeWind)                |
| `style`        | `ViewStyle` | ❌       | -       | Inline styles                           |
| `children`     | `ReactNode` | ✅       | -       | Content to animate                      |

**Ref Methods:**

```tsx
const rotateRef = useRef<RotatingBoxRef>(null);

rotateRef.current?.start(); // Start animation
rotateRef.current?.stop(); // Stop animation
```

---

### BounceBox

Creates a bouncing effect by animating translateY. Great for attention-grabbing elements.

```tsx
<BounceBox autoStart infiniteLoop bounceHeight={20} bounceInterval={2000} className="rounded-lg bg-red-500 p-4">
  <String className="text-white">Bouncing content!</String>
</BounceBox>
```

**Props:**

| Prop             | Type         | Required | Default | Description                            |
| ---------------- | ------------ | -------- | ------- | -------------------------------------- |
| `bounceHeight`   | `number`     | ❌       | `20`    | Height of bounce in pixels             |
| `bounceInterval` | `number`     | ❌       | `2000`  | Time between bounces in milliseconds   |
| `autoStart`      | `boolean`    | ❌       | `false` | Start animation automatically          |
| `duration`       | `number`     | ❌       | `400`   | Single bounce duration in milliseconds |
| `infiniteLoop`   | `boolean`    | ❌       | `false` | Loop animation infinitely              |
| `onBounce`       | `() => void` | ❌       | -       | Callback fired on each bounce          |
| `className`      | `string`     | ❌       | -       | CSS classes (NativeWind)               |
| `style`          | `ViewStyle`  | ❌       | -       | Inline styles                          |
| `children`       | `ReactNode`  | ✅       | -       | Content to animate                     |

**Ref Methods:**

```tsx
const bounceRef = useRef<BounceBoxRef>(null);

bounceRef.current?.bounce(); // Trigger single bounce
bounceRef.current?.start(); // Start animation sequence (with infinite loop if enabled)
bounceRef.current?.stop(); // Stop animation and reset to initial state
```

## Props

All animated components share common props and extend them with specific animation properties:

### Common Props

| Prop           | Type        | Required | Default | Description                           |
| -------------- | ----------- | -------- | ------- | ------------------------------------- |
| `autoStart`    | `boolean`   | ❌       | `false` | Start animation automatically         |
| `delay`        | `number`    | ❌       | `0`     | Delay before starting in milliseconds |
| `infiniteLoop` | `boolean`   | ❌       | `false` | Loop animation infinitely             |
| `className`    | `string`    | ❌       | -       | CSS classes (NativeWind)              |
| `style`        | `ViewStyle` | ❌       | -       | Inline styles                         |
| `children`     | `ReactNode` | ✅       | -       | Content to animate                    |
| `...rest`      | `ViewProps` | ❌       | -       | Any other props accepted by View      |

**Note:** `duration` is only available for components that use timing-based animations (FadeInBox, SlideInBox, RotatingBox, BounceBox). ScaleInBox uses spring physics and doesn't accept a duration prop.

### Component-Specific Props

#### SlideInBox

| Prop        | Type                                  | Default  | Description                |
| ----------- | ------------------------------------- | -------- | -------------------------- |
| `direction` | `'left' \| 'right' \| 'up' \| 'down'` | `'left'` | Slide direction            |
| `distance`  | `number`                              | `100`    | Distance to slide (pixels) |

#### RotatingBox

| Prop         | Type      | Default | Description                             |
| ------------ | --------- | ------- | --------------------------------------- |
| `continuous` | `boolean` | `false` | Make rotation continuous without pauses |

#### BounceBox

| Prop             | Type         | Default | Description                          |
| ---------------- | ------------ | ------- | ------------------------------------ |
| `bounceHeight`   | `number`     | `20`    | Height of bounce in pixels           |
| `bounceInterval` | `number`     | `2000`  | Time between bounces in milliseconds |
| `onBounce`       | `() => void` | -       | Callback fired on each bounce        |

## Examples

### Basic Usage

```tsx
import { FadeInBox, ScaleInBox, SlideInBox } from 'react-native-chill-ui';

const BasicAnimations = () => {
  return (
    <Box>
      {/* Simple fade-in */}
      <FadeInBox autoStart>
        <String>This content fades in</String>
      </FadeInBox>

      {/* Scale animation with delay */}
      <ScaleInBox autoStart delay={300}>
        <String>This content scales in with delay</String>
      </ScaleInBox>

      {/* Slide from right */}
      <SlideInBox direction="right" autoStart distance={150}>
        <String>This slides in from the right</String>
      </SlideInBox>
    </Box>
  );
};
```

### With Custom Styling

```tsx
// Using className (NativeWind)
<FadeInBox autoStart className="p-6 bg-blue-500 rounded-xl shadow-lg">
  <String className="text-white text-center font-bold">Styled with Tailwind</String>
</FadeInBox>

// Using style (all versions)
<ScaleInBox
  autoStart
  style={{
    padding: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  }}
>
  <String style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
    Styled with StyleSheet
  </String>
</ScaleInBox>
```

### Loading States

```tsx
import { useState } from 'react';
import { RotatingBox, FadeInBox } from 'react-native-chill-ui';

const LoadingExample = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box className="items-center gap-4">
      {isLoading ? (
        <RotatingBox autoStart infiniteLoop className="h-8 w-8">
          <Icon name="spinner" />
        </RotatingBox>
      ) : (
        <ScaleInBox autoStart className="rounded-lg bg-green-500 p-4">
          <String className="text-white">Content loaded!</String>
        </ScaleInBox>
      )}
    </Box>
  );
};
```

## Advanced Usage

### Manual Animation Control

All components support ref-based manual control:

```tsx
function ManualAnimationExample() {
  const fadeRef = useRef<FadeInBoxRef>(null);
  const scaleRef = useRef<ScaleInBoxRef>(null);

  const handleStartAll = () => {
    fadeRef.current?.start();
    scaleRef.current?.start();
  };

  const handleStopAll = () => {
    fadeRef.current?.stop();
    scaleRef.current?.stop();
  };

  return (
    <Box className="gap-4">
      <Box className="flex-row gap-2">
        <Button onPress={handleStartAll}>Start All</Button>
        <Button onPress={handleStopAll}>Stop All</Button>
      </Box>

      <FadeInBox ref={fadeRef} className="rounded-lg bg-blue-500 p-4">
        <String className="text-white">Manually controlled fade</String>
      </FadeInBox>

      <ScaleInBox ref={scaleRef} className="rounded-lg bg-green-500 p-4">
        <String className="text-white">Manually controlled scale</String>
      </ScaleInBox>
    </Box>
  );
}
```

### Chained Animations

Create sequential animations with delays:

```tsx
function ChainedAnimations() {
  return (
    <Box className="gap-4">
      <FadeInBox autoStart delay={0} className="rounded-lg bg-red-500 p-4">
        <String className="text-white">First (0ms delay)</String>
      </FadeInBox>

      <FadeInBox autoStart delay={200} className="rounded-lg bg-green-500 p-4">
        <String className="text-white">Second (200ms delay)</String>
      </FadeInBox>

      <FadeInBox autoStart delay={400} className="rounded-lg bg-blue-500 p-4">
        <String className="text-white">Third (400ms delay)</String>
      </FadeInBox>
    </Box>
  );
}
```

### Loading States

Perfect for loading indicators:

```tsx
function LoadingExample() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box className="items-center gap-4">
      <RotatingBox autoStart={isLoading} infiniteLoop={isLoading} className="h-8 w-8">
        <Icon name="spinner" />
      </RotatingBox>

      <ScaleInBox autoStart={!isLoading} className="rounded-lg bg-green-500 p-4">
        <String className="text-white">Content loaded!</String>
      </ScaleInBox>
    </Box>
  );
}
```

### Custom Combinations

Combine multiple animations:

```tsx
function CombinedAnimation() {
  return (
    <FadeInBox autoStart duration={1000}>
      <ScaleInBox autoStart delay={200}>
        <SlideInBox autoStart delay={400} direction="up" distance={50}>
          <Box className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-6">
            <String className="text-center font-bold text-white">Triple Animation!</String>
          </Box>
        </SlideInBox>
      </ScaleInBox>
    </FadeInBox>
  );
}
```

## Animation Options

The AnimatedBox components provide flexible animation control through:

- **Auto-start animations**: Set `autoStart={true}` for immediate animation on mount
- **Manual control**: Use refs for programmatic animation control
- **Timing customization**: Configure `duration`, `delay`, and looping behavior
- **Direction control**: SlideInBox supports 4 directions (left, right, up, down)
- **Continuous rotation**: RotatingBox can rotate continuously or with pauses

## Performance Tips

1. **Use `useNativeDriver`**: All animations use native driver by default for 60fps performance
2. **Avoid excessive re-renders**: Components are optimized to prevent unnecessary re-renders
3. **Control infinite loops**: Stop infinite animations when components unmount
4. **Batch animations**: Use `Animated.parallel()` for simultaneous animations (done automatically)

## TypeScript Support

Full TypeScript support with proper interfaces:

```tsx
import { useRef } from 'react';
import { FadeInBox, FadeInBoxRef } from '@/components/animatedBox';

function TypeScriptExample() {
  const fadeRef = useRef<FadeInBoxRef>(null);

  const handleAnimate = (): void => {
    fadeRef.current?.start();
  };

  return (
    <FadeInBox ref={fadeRef} autoStart={false}>
      <String>TypeScript ready!</String>
    </FadeInBox>
  );
}
```

### Available Types

All components export their respective types for full TypeScript support:

```tsx
// Component types
import type {
  AnimatedBoxProps,
  FadeInBoxProps,
  ScaleInBoxProps,
  SlideInBoxProps,
  RotatingBoxProps,
  BounceBoxProps,
} from '@/components/animatedBox';

// Ref types
import type {
  FadeInBoxRef,
  ScaleInBoxRef,
  SlideInBoxRef,
  RotatingBoxRef,
  BounceBoxRef,
} from '@/components/animatedBox';
```

### Ref Methods

All animated components support the following ref methods:

```tsx
interface AnimationRef {
  start: () => void; // Start the animation
  stop: () => void; // Stop the animation and reset to initial state
}

// BounceBox additionally supports:
interface BounceBoxRef extends AnimationRef {
  bounce: () => void; // Trigger single bounce
}
```

## Testing

Components are designed to be testable:

```tsx
import { render } from '@testing-library/react-native';
import { FadeInBox } from '@/components/animatedBox';

test('FadeInBox renders children', () => {
  const { getByText } = render(
    <FadeInBox>
      <String>Test content</String>
    </FadeInBox>,
  );

  expect(getByText('Test content')).toBeTruthy();
});
```

## Best Practices

1. **Start simple**: Begin with `autoStart` for basic use cases
2. **Use refs for control**: Implement manual control for complex interactions
3. **Consider performance**: Limit simultaneous animations on slower devices
4. **Test on device**: Animations may perform differently on actual hardware
5. **Provide fallbacks**: Always test without NativeWind for broader compatibility

## Troubleshooting

### Animation not starting

- Check if `autoStart={true}` is set
- Verify component is properly mounted
- Ensure ref is attached correctly for manual control

### Poor performance

- Reduce number of simultaneous animations
- Check device performance capabilities
- Consider using `duration` prop to adjust animation speed

### Styling issues

- Verify NativeWind installation and configuration
- Check fallback styles are properly defined
- Test both with and without NativeWind

## Migration Guide

If upgrading from previous versions:

1. **Improved animation performance**: All components now use native driver by default
2. **New NativeWind support**: Add `className` props alongside existing `style` props
3. **Improved TypeScript**: Update ref types to use new interfaces

---

Built with ❤️ for React Native developers. Part of the Chill UI component library.
