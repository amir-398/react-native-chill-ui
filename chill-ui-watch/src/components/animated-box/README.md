# Animated Box Components

A collection of pre-built animated Box components for React Native applications. Each component provides smooth, customizable animations with consistent APIs and TypeScript support.

## Features

- **6 Animated Variants**: FadeInBox, ScaleInBox, SlideInBox, RotatingBox, InteractiveBox, BounceBox
- **Consistent API**: Uniform props and ref methods across all components
- **Performance Optimized**: Uses React Native's Animated API efficiently
- **TypeScript**: Complete type safety with proper interfaces
- **Manual Control**: Ref-based methods for programmatic animation control
- **Customizable**: Configurable duration, delay, and animation parameters
- **Accessible**: Proper animation handling for screen readers

## Basic Usage

```tsx
import { FadeInBox, ScaleInBox, SlideInBox, RotatingBox, InteractiveBox, BounceBox } from 'chill-ui';

function Example() {
  return (
    <BoxColumn className="gap-4 p-4">
      <FadeInBox autoStart className="rounded-lg bg-blue-100 p-6">
        <String size="lg" weight="bold" className="text-center">
          Fade In Animation
        </String>
      </FadeInBox>

      <ScaleInBox autoStart className="rounded-lg bg-green-100 p-6">
        <String size="lg" weight="bold" className="text-center">
          Scale In Animation
        </String>
      </ScaleInBox>
    </BoxColumn>
  );
}
```

## Component Overview

### FadeInBox

Fades in from transparent to opaque with customizable duration and delay.

```tsx
<FadeInBox autoStart duration={1000} delay={500} className="rounded-lg bg-blue-100 p-6">
  <String>Fade In Content</String>
</FadeInBox>
```

### ScaleInBox

Scales in from 0 to full size with configurable scale factor.

```tsx
<ScaleInBox autoStart scale={0.5} duration={800} className="rounded-lg bg-green-100 p-6">
  <String>Scale In Content</String>
</ScaleInBox>
```

### SlideInBox

Slides in from specified direction with customizable distance.

```tsx
<SlideInBox autoStart direction="left" distance={100} className="rounded-lg bg-purple-100 p-6">
  <String>Slide In Content</String>
</SlideInBox>
```

### RotatingBox

Continuously rotates with configurable speed and direction.

```tsx
<RotatingBox autoStart duration={2000} infiniteLoop className="rounded-lg bg-orange-100 p-6">
  <String>Rotating Content</String>
</RotatingBox>
```

### InteractiveBox

Responds to touch interactions with scale and opacity animations.

```tsx
<InteractiveBox className="rounded-lg bg-red-100 p-6" onPress={() => console.log('Pressed!')}>
  <String>Interactive Content</String>
</InteractiveBox>
```

### BounceBox

Bounces with configurable intensity and timing.

```tsx
<BounceBox autoStart intensity={1.2} duration={600} className="rounded-lg bg-yellow-100 p-6">
  <String>Bounce Content</String>
</BounceBox>
```

## Common Props

All animated components share these common props:

| Prop           | Type        | Required | Default | Description                              |
| -------------- | ----------- | -------- | ------- | ---------------------------------------- |
| `children`     | `ReactNode` | ✅       | -       | Content to animate                       |
| `className`    | `string`    | ❌       | -       | Custom CSS classes                       |
| `autoStart`    | `boolean`   | ❌       | `false` | Whether to start animation automatically |
| `infiniteLoop` | `boolean`   | ❌       | `false` | Whether to loop animation infinitely     |
| `delay`        | `number`    | ❌       | `0`     | Delay before starting animation (ms)     |

## Ref Methods

All animated components (except InteractiveBox) provide these ref methods:

```tsx
interface AnimatedBoxRef {
  start: () => void; // Start the animation
  stop: () => void; // Stop the animation
  loop: () => void; // Start infinite loop
}
```

### Using Ref Methods

```tsx
import { useRef } from 'react';
import { FadeInBox, FadeInBoxRef } from 'chill-ui';

function Example() {
  const fadeRef = useRef<FadeInBoxRef>(null);

  const handleStart = () => {
    fadeRef.current?.start();
  };

  const handleStop = () => {
    fadeRef.current?.stop();
  };

  const handleLoop = () => {
    fadeRef.current?.loop();
  };

  return (
    <BoxColumn className="gap-4">
      <FadeInBox ref={fadeRef} className="rounded-lg bg-blue-100 p-6">
        <String>Controlled Animation</String>
      </FadeInBox>

      <BoxRow className="gap-2">
        <Button onPress={handleStart}>Start</Button>
        <Button onPress={handleStop}>Stop</Button>
        <Button onPress={handleLoop}>Loop</Button>
      </BoxRow>
    </BoxColumn>
  );
}
```

## Component-Specific Props

### FadeInBox Props

| Prop       | Type     | Required | Default | Description              |
| ---------- | -------- | -------- | ------- | ------------------------ |
| `duration` | `number` | ❌       | `1000`  | Animation duration in ms |

### ScaleInBox Props

| Prop       | Type     | Required | Default | Description                |
| ---------- | -------- | -------- | ------- | -------------------------- |
| `scale`    | `number` | ❌       | `0`     | Starting scale value (0-1) |
| `duration` | `number` | ❌       | `800`   | Animation duration in ms   |

### SlideInBox Props

| Prop        | Type                                  | Required | Default  | Description              |
| ----------- | ------------------------------------- | -------- | -------- | ------------------------ |
| `direction` | `'left' \| 'right' \| 'up' \| 'down'` | ❌       | `'left'` | Slide direction          |
| `distance`  | `number`                              | ❌       | `100`    | Slide distance in pixels |
| `duration`  | `number`                              | ❌       | `600`    | Animation duration in ms |

### RotatingBox Props

| Prop       | Type     | Required | Default | Description                    |
| ---------- | -------- | -------- | ------- | ------------------------------ |
| `duration` | `number` | ❌       | `2000`  | Time for one complete rotation |

### InteractiveBox Props

| Prop       | Type         | Required | Default | Description              |
| ---------- | ------------ | -------- | ------- | ------------------------ |
| `onPress`  | `() => void` | ❌       | -       | Press callback           |
| `scale`    | `number`     | ❌       | `0.95`  | Scale factor on press    |
| `duration` | `number`     | ❌       | `150`   | Animation duration in ms |

### BounceBox Props

| Prop        | Type     | Required | Default | Description                 |
| ----------- | -------- | -------- | ------- | --------------------------- |
| `intensity` | `number` | ❌       | `1.1`   | Bounce intensity multiplier |
| `duration`  | `number` | ❌       | `600`   | Animation duration in ms    |

## Examples

### Animation Sequence

```tsx
function AnimationSequence() {
  const fadeRef = useRef<FadeInBoxRef>(null);
  const scaleRef = useRef<ScaleInBoxRef>(null);
  const slideRef = useRef<SlideInBoxRef>(null);

  useEffect(() => {
    // Start animations in sequence
    setTimeout(() => fadeRef.current?.start(), 0);
    setTimeout(() => scaleRef.current?.start(), 1000);
    setTimeout(() => slideRef.current?.start(), 2000);
  }, []);

  return (
    <BoxColumn className="gap-4 p-4">
      <FadeInBox ref={fadeRef} className="rounded-lg bg-blue-100 p-6">
        <String>First: Fade In</String>
      </FadeInBox>

      <ScaleInBox ref={scaleRef} className="rounded-lg bg-green-100 p-6">
        <String>Second: Scale In</String>
      </ScaleInBox>

      <SlideInBox ref={slideRef} className="rounded-lg bg-purple-100 p-6">
        <String>Third: Slide In</String>
      </SlideInBox>
    </BoxColumn>
  );
}
```

### Interactive Gallery

```tsx
function InteractiveGallery() {
  return (
    <BoxRow className="flex-wrap gap-4 p-4">
      <InteractiveBox
        className="h-32 w-32 items-center justify-center rounded-lg bg-blue-100"
        onPress={() => console.log('Blue pressed')}
      >
        <String>Blue</String>
      </InteractiveBox>

      <InteractiveBox
        className="h-32 w-32 items-center justify-center rounded-lg bg-green-100"
        onPress={() => console.log('Green pressed')}
      >
        <String>Green</String>
      </InteractiveBox>

      <InteractiveBox
        className="h-32 w-32 items-center justify-center rounded-lg bg-purple-100"
        onPress={() => console.log('Purple pressed')}
      >
        <String>Purple</String>
      </InteractiveBox>
    </BoxRow>
  );
}
```

### Loading States

```tsx
function LoadingState() {
  return (
    <BoxCenter className="p-8">
      <RotatingBox infiniteLoop duration={1000}>
        <Box className="h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent" />
      </RotatingBox>
      <String className="mt-4">Loading...</String>
    </BoxCenter>
  );
}
```

### Notification Animation

```tsx
function Notification({ message, isVisible }) {
  return (
    <FadeInBox
      autoStart={isVisible}
      duration={300}
      className="absolute left-4 right-4 top-4 rounded-lg bg-green-500 p-4"
    >
      <String color="white" className="text-center">
        {message}
      </String>
    </FadeInBox>
  );
}
```

### Card Entrance

```tsx
function CardEntrance({ cards }) {
  return (
    <BoxColumn className="gap-4 p-4">
      {cards.map((card, index) => (
        <SlideInBox
          key={card.id}
          autoStart
          direction="left"
          delay={index * 200}
          className="rounded-lg bg-white p-6 shadow-lg"
        >
          <String size="lg" weight="bold">
            {card.title}
          </String>
          <String className="mt-2">{card.description}</String>
        </SlideInBox>
      ))}
    </BoxColumn>
  );
}
```

## Best Practices

### 1. Use Appropriate Animation Types

```tsx
// ✅ Good: Use fade for content appearance
<FadeInBox autoStart>
  <String>New content appeared</String>
</FadeInBox>

// ✅ Good: Use scale for interactive feedback
<InteractiveBox onPress={handlePress}>
  <Button>Click me</Button>
</InteractiveBox>

// ✅ Good: Use slide for directional movement
<SlideInBox direction="up" autoStart>
  <String>Sliding notification</String>
</SlideInBox>
```

### 2. Control Animation Timing

```tsx
// ✅ Good: Sequence animations with delays
<BoxColumn>
  <FadeInBox autoStart delay={0}>
    First
  </FadeInBox>
  <FadeInBox autoStart delay={200}>
    Second
  </FadeInBox>
  <FadeInBox autoStart delay={400}>
    Third
  </FadeInBox>
</BoxColumn>
```

### 3. Use Refs for Programmatic Control

```tsx
// ✅ Good: Control animations based on state
const animationRef = useRef<FadeInBoxRef>(null);

useEffect(() => {
  if (isVisible) {
    animationRef.current?.start();
  } else {
    animationRef.current?.stop();
  }
}, [isVisible]);
```

### 4. Avoid Excessive Animations

```tsx
// ❌ Avoid: Too many simultaneous animations
<BoxColumn>
  {items.map(item => (
    <FadeInBox key={item.id} autoStart infiniteLoop>
      <String>{item.name}</String>
    </FadeInBox>
  ))}
</BoxColumn>

// ✅ Good: Stagger animations
<BoxColumn>
  {items.map((item, index) => (
    <FadeInBox key={item.id} autoStart delay={index * 100}>
      <String>{item.name}</String>
    </FadeInBox>
  ))}
</BoxColumn>
```

### 5. Consider Accessibility

```tsx
// ✅ Good: Respect reduced motion preferences
const prefersReducedMotion = useReducedMotion();

return (
  <FadeInBox autoStart duration={prefersReducedMotion ? 0 : 1000}>
    <String>Accessible animation</String>
  </FadeInBox>
);
```

## Performance Considerations

- **Lightweight**: All components use React Native's Animated API efficiently
- **Memory Management**: Animations are properly cleaned up on unmount
- **Batch Updates**: Multiple animations are batched for better performance
- **Ref Optimization**: Ref methods avoid unnecessary re-renders
- **Conditional Rendering**: Consider using `useMemo` for complex animation configurations

## File Structure

```
animated-box/
├── README.md                    # This documentation
├── FadeInBox.tsx               # Fade in animation component
├── ScaleInBox.tsx              # Scale in animation component
├── SlideInBox.tsx              # Slide in animation component
├── RotatingBox.tsx             # Rotation animation component
├── InteractiveBox.tsx          # Interactive touch animation component
├── BounceBox.tsx               # Bounce animation component
├── types/                      # TypeScript type definitions
│   ├── fadeInBox.types.ts
│   ├── scaleInBox.types.ts
│   ├── slideInBox.types.ts
│   ├── rotatingBox.types.ts
│   ├── interactiveBox.types.ts
│   └── bounceBox.types.ts
└── index.ts                    # Exports
```

## TypeScript

All components are fully typed with proper interfaces:

```tsx
// Example type definition
interface FadeInBoxProps extends ViewProps {
  autoStart?: boolean;
  infiniteLoop?: boolean;
  delay?: number;
  duration?: number;
}

interface FadeInBoxRef {
  start: () => void;
  stop: () => void;
  loop: () => void;
}
```

## Related Components

- **Box**: Base container components used by animated variants
- **String**: Text component often used within animated boxes
- **Button**: Interactive elements that work well with InteractiveBox
- **Icon**: Decorative elements that can be animated

## Storybook

See the Storybook documentation for interactive examples:

- `components/animated-box/FadeInBox` - Fade in animation examples
- `components/animated-box/ScaleInBox` - Scale in animation examples
- `components/animated-box/SlideInBox` - Slide in animation examples
- `components/animated-box/RotatingBox` - Rotation animation examples
- `components/animated-box/InteractiveBox` - Interactive animation examples
- `components/animated-box/BounceBox` - Bounce animation examples
