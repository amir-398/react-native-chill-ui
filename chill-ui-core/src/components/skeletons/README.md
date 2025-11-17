# Skeleton Component

A React Native component that provides animated loading placeholders with pulse effects for different content types. Built with React Native's Animated API for native performance, featuring multiple variants, sizes, and customizable styling across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Skeleton } from 'react-native-chill-ui'`

## Features

- **Animated Pulse Effect**: Smooth opacity animation that indicates loading state
- **Multiple Variants**: Rectangle, square, circle, and text skeletons for different content types
- **Size Options**: 5 different sizes (xs, sm, md, lg, xl) to match your content
- **Native Performance**: Uses `useNativeDriver: true` for optimal animation performance
- **Flexible Styling**: Support for NativeWind classes and StyleSheet objects
- **TypeScript Support**: Fully typed for a better development experience
- **Accessibility**: Provides visual loading indication for screen readers
- **Memory Efficient**: Automatic cleanup to prevent memory leaks
- **Cross-Platform**: Works consistently on iOS and Android

## Quick Start

```tsx
import { Skeleton } from 'react-native-chill-ui';

// Basic rectangle skeleton
<Skeleton />

// Circle skeleton for avatar
<Skeleton variant="circle" size="lg" />

// Text skeleton with custom styling
<Skeleton variant="text" size="sm" className="mb-2" />
```

## Props

### SkeletonProps

| Prop        | Type                                            | Default       | Description                                      |
| ----------- | ----------------------------------------------- | ------------- | ------------------------------------------------ |
| `children`  | `ReactNode`                                     | -             | Child components to render inside the skeleton   |
| `className` | `string`                                        | -             | Custom CSS classes for styling (NativeWind only) |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`          | `'md'`        | Size variant for the skeleton                    |
| `style`     | `StyleProp<ViewStyle>`                          | -             | Style object for additional styling              |
| `variant`   | `'rectangle' \| 'square' \| 'circle' \| 'text'` | `'rectangle'` | Shape variant for the skeleton                   |

## Usage Examples

### Basic Skeletons

```tsx
// Rectangle skeleton (default)
<Skeleton />

// Circle skeleton for avatars
<Skeleton variant="circle" size="lg" />

// Square skeleton for images
<Skeleton variant="square" size="md" />

// Text skeleton for content
<Skeleton variant="text" size="sm" />
```

### Size Variants

```tsx
// Extra small
<Skeleton size="xs" />

// Small
<Skeleton size="sm" />

// Medium (default)
<Skeleton size="md" />

// Large
<Skeleton size="lg" />

// Extra large
<Skeleton size="xl" />
```

### Custom Styling

```tsx
// With custom className (NativeWind)
<Skeleton
  variant="rectangle"
  size="md"
  className="mb-4 rounded-lg"
/>

// With custom style
<Skeleton
  variant="circle"
  size="lg"
  style={{
    marginBottom: 16,
    alignSelf: 'center'
  }}
/>
```

### Loading States

```tsx
// Card skeleton
<Box className="p-4 border rounded-lg">
  <Skeleton variant="circle" size="sm" className="mb-3" />
  <Skeleton variant="text" size="md" className="mb-2" />
  <Skeleton variant="text" size="sm" className="w-3/4" />
</Box>

// List skeleton
<Box>
  {[1, 2, 3].map((item) => (
    <Box key={item} className="flex-row items-center mb-3">
      <Skeleton variant="circle" size="sm" className="mr-3" />
      <Box className="flex-1">
        <Skeleton variant="text" size="md" className="mb-1" />
        <Skeleton variant="text" size="sm" className="w-2/3" />
      </Box>
    </Box>
  ))}
</Box>
```

### Different Variants

```tsx
// Rectangle for cards
<Skeleton variant="rectangle" size="lg" />

// Square for images
<Skeleton variant="square" size="md" />

// Circle for avatars
<Skeleton variant="circle" size="sm" />

// Text for content
<Skeleton variant="text" size="md" />
```

### With Children

```tsx
// Skeleton with content inside
<Skeleton variant="rectangle" size="lg">
  <String>Loading content...</String>
</Skeleton>
```

## Version Support

| React Native | Support          |
| ------------ | ---------------- |
| 0.70+        | ✅ Full support  |
| 0.60-0.69    | ✅ Full support  |
| < 0.60       | ❌ Not supported |

## Performance Notes

- **Native Driver**: All animations use `useNativeDriver: true` for optimal performance
- **Memory Efficient**: Animations are properly cleaned up on unmount
- **Hybrid Detection**: Minimal overhead for environment detection
- **Conditional Animation**: Only runs pulse animation when needed

## TypeScript Support

The component is fully typed with TypeScript:

```tsx
import { Skeleton } from 'react-native-chill-ui';
import type { SkeletonPropsTw } from '@types';

const MySkeleton: React.FC<SkeletonPropsTw> = props => {
  return <Skeleton {...props} />;
};
```

## Accessibility

The skeleton component is designed to be accessible:

- **Screen Readers**: Provides visual loading indication
- **High Contrast**: Works well with system accessibility settings
- **Reduced Motion**: Respects user's motion preferences (can be extended)

## Troubleshooting

### Animation Not Working

If the pulse animation isn't working:

1. **Check NativeWind**: Ensure NativeWind is properly configured
2. **Native Driver**: Verify `useNativeDriver: true` is supported
3. **Performance**: Check for performance issues that might block animations

### Styling Issues

If styles aren't applying correctly:

1. **NativeWind**: Use `className` for Tailwind classes
2. **StyleSheet**: Use `style` prop for React Native styles
3. **Hybrid**: The component automatically detects the environment

### Type Errors

If you're getting TypeScript errors:

1. **Import Types**: Import from `@types` package
2. **Version Match**: Ensure component and types versions match
3. **Props**: Check that all required props are provided

## Examples in App.tsx

Check the `App.tsx` file for complete working examples of all Skeleton features and usage patterns.
