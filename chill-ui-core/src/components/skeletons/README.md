# Skeleton

A React Native component that provides loading placeholders with animated pulse effects. Supports multiple variants and sizes for different content types, perfect for improving perceived performance during data loading.

## Features

- ✅ **Animated Pulse**: Smooth pulse animation for loading indication
- ✅ **Multiple Variants**: Rectangle, square, circle, and text shapes
- ✅ **Size Options**: 5 different sizes (xs, sm, md, lg, xl)
- ✅ **Custom Styling**: Full Tailwind CSS support for additional styling
- ✅ **Flexible Content**: Can contain child components
- ✅ **Performance**: Lightweight component with optimized animations
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Accessibility**: Proper loading state indication

## Quick Start

```tsx
import Skeleton from '@/components/skeletons/Skeleton';

// Basic rectangle skeleton
<Skeleton variant="rectangle" size="md" />

// Circle skeleton for avatar
<Skeleton variant="circle" size="lg" />
```

## Examples

### Basic Usage

```tsx
import Skeleton from '@/components/skeletons/Skeleton';

// Rectangle skeleton
<Skeleton variant="rectangle" size="md" />

// Square skeleton
<Skeleton variant="square" size="lg" />

// Circle skeleton
<Skeleton variant="circle" size="xl" />

// Text skeleton
<Skeleton variant="text" size="sm" />
```

### Different Sizes

```tsx
// Extra small
<Skeleton variant="rectangle" size="xs" />

// Small
<Skeleton variant="rectangle" size="sm" />

// Medium (default)
<Skeleton variant="rectangle" size="md" />

// Large
<Skeleton variant="rectangle" size="lg" />

// Extra large
<Skeleton variant="rectangle" size="xl" />
```

### Custom Styling

```tsx
// With custom classes
<Skeleton
  variant="rectangle"
  size="md"
  className="mb-4 bg-blue-200"
/>

// Custom width
<Skeleton
  variant="rectangle"
  size="md"
  className="w-1/2"
/>

// Custom colors
<Skeleton
  variant="circle"
  size="lg"
  className="bg-gray-400"
/>
```

### Content Loading Patterns

```tsx
// Card skeleton
<Box className="p-4 bg-white rounded-lg shadow-sm">
  <Skeleton variant="rectangle" size="md" className="mb-3" />
  <Skeleton variant="text" size="sm" className="mb-2" />
  <Skeleton variant="text" size="sm" className="w-3/4" />
</Box>

// List item skeleton
<Box className="flex-row items-center p-4">
  <Skeleton variant="circle" size="md" className="mr-3" />
  <Box className="flex-1">
    <Skeleton variant="text" size="sm" className="mb-1" />
    <Skeleton variant="text" size="xs" className="w-2/3" />
  </Box>
</Box>

// Profile skeleton
<Box className="items-center p-6">
  <Skeleton variant="circle" size="xl" className="mb-4" />
  <Skeleton variant="text" size="lg" className="mb-2" />
  <Skeleton variant="text" size="sm" className="w-1/2 mb-4" />
  <Skeleton variant="rectangle" size="md" />
</Box>
```

## Props Reference

### SkeletonProps

| Prop        | Type                                            | Default       | Description                                    |
| ----------- | ----------------------------------------------- | ------------- | ---------------------------------------------- |
| `children`  | `ReactNode`                                     | -             | Child components to render inside the skeleton |
| `className` | `string`                                        | -             | Custom CSS classes for additional styling      |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`          | `'md'`        | Size variant for the skeleton                  |
| `variant`   | `'rectangle' \| 'square' \| 'circle' \| 'text'` | `'rectangle'` | Shape variant for the skeleton                 |

## Size Variants

| Size | Rectangle Height | Square/Circle Size | Text Height |
| ---- | ---------------- | ------------------ | ----------- |
| `xs` | 64px (h-16)      | 64px × 64px        | 16px (h-4)  |
| `sm` | 96px (h-24)      | 96px × 96px        | 20px (h-5)  |
| `md` | 128px (h-32)     | 128px × 128px      | 24px (h-6)  |
| `lg` | 192px (h-48)     | 192px × 192px      | 28px (h-7)  |
| `xl` | 256px (h-64)     | 256px × 256px      | 32px (h-8)  |

## Best Practices

### 1. Choose Appropriate Variants

```tsx
// ✅ Good - Rectangle for content blocks
<Skeleton variant="rectangle" size="md" />

// ✅ Good - Circle for avatars
<Skeleton variant="circle" size="lg" />

// ✅ Good - Text for text content
<Skeleton variant="text" size="sm" />

// ❌ Avoid - Wrong variant for content type
<Skeleton variant="circle" size="md" /> // For rectangular content
```

### 2. Use Appropriate Sizes

```tsx
// ✅ Good - Appropriate size for content
<Skeleton variant="rectangle" size="lg" /> // For large content blocks

// ✅ Good - Small size for text
<Skeleton variant="text" size="sm" /> // For text lines

// ❌ Avoid - Mismatched sizes
<Skeleton variant="text" size="xl" /> // Too large for text
```

### 3. Create Realistic Loading States

```tsx
// ✅ Good - Realistic content structure
<Box className="p-4">
  <Skeleton variant="rectangle" size="md" className="mb-3" />
  <Skeleton variant="text" size="sm" className="mb-2" />
  <Skeleton variant="text" size="sm" className="w-3/4" />
</Box>

// ❌ Avoid - Unrealistic structure
<Box className="p-4">
  <Skeleton variant="circle" size="xl" />
  <Skeleton variant="text" size="xl" />
</Box>
```

### 4. Use Consistent Styling

```tsx
// ✅ Good - Consistent skeleton styling
<Box className="space-y-3">
  <Skeleton variant="text" size="sm" />
  <Skeleton variant="text" size="sm" />
  <Skeleton variant="text" size="sm" />
</Box>

// ❌ Avoid - Inconsistent styling
<Box>
  <Skeleton variant="text" size="sm" className="mb-2" />
  <Skeleton variant="text" size="lg" className="mb-4" />
  <Skeleton variant="text" size="xs" />
</Box>
```

### 5. Consider Loading States

```tsx
// ✅ Good - Conditional rendering
{isLoading ? (
  <Skeleton variant="rectangle" size="md" />
) : (
  <ActualContent />
)}

// ❌ Avoid - Always showing skeleton
<Skeleton variant="rectangle" size="md" />
<ActualContent />
```

## Advanced Usage

### Complex Loading Patterns

```tsx
// Dashboard skeleton
<Box className="space-y-6 p-6">
  {/* Header */}
  <Box className="flex-row items-center justify-between">
    <Skeleton variant="text" size="lg" className="w-1/3" />
    <Skeleton variant="circle" size="md" />
  </Box>

  {/* Stats cards */}
  <Box className="flex-row space-x-4">
    <Box className="flex-1 rounded-lg bg-gray-50 p-4">
      <Skeleton variant="text" size="sm" className="mb-2" />
      <Skeleton variant="text" size="lg" />
    </Box>
    <Box className="flex-1 rounded-lg bg-gray-50 p-4">
      <Skeleton variant="text" size="sm" className="mb-2" />
      <Skeleton variant="text" size="lg" />
    </Box>
  </Box>

  {/* Content area */}
  <Skeleton variant="rectangle" size="xl" />
</Box>
```

### Custom Skeleton Components

```tsx
// Custom card skeleton
const CardSkeleton = () => (
  <Box className="rounded-lg bg-white p-4 shadow-sm">
    <Skeleton variant="rectangle" size="md" className="mb-3" />
    <Skeleton variant="text" size="sm" className="mb-2" />
    <Skeleton variant="text" size="sm" className="w-3/4" />
  </Box>
);

// Custom list skeleton
const ListItemSkeleton = () => (
  <Box className="flex-row items-center border-b border-gray-100 p-4">
    <Skeleton variant="circle" size="md" className="mr-3" />
    <Box className="flex-1">
      <Skeleton variant="text" size="sm" className="mb-1" />
      <Skeleton variant="text" size="xs" className="w-2/3" />
    </Box>
  </Box>
);
```

### Loading States with Transitions

```tsx
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return () => clearTimeout(timer);
}, []);

{
  isLoading ? (
    <Box className="space-y-4">
      <Skeleton variant="rectangle" size="md" />
      <Skeleton variant="text" size="sm" />
      <Skeleton variant="text" size="sm" />
    </Box>
  ) : (
    <ActualContent />
  );
}
```

## Performance Considerations

- **Lightweight**: Minimal performance impact with simple animations
- **Optimized Rendering**: Only renders when needed
- **Memory Efficient**: No complex animations or heavy computations
- **Fast Loading**: Quick to render and display

## Accessibility

The Skeleton component includes accessibility features:

- **Loading indication**: Clear visual indication of loading state
- **Screen reader support**: Works with accessibility tools
- **Reduced motion**: Respects user's motion preferences

### Accessibility Best Practices

```tsx
// Always provide loading context
<Box accessible={true} accessibilityLabel="Loading content" accessibilityHint="Content is being loaded">
  <Skeleton variant="rectangle" size="md" />
</Box>;

// Use appropriate loading states
{
  isLoading && (
    <Box accessible={true} accessibilityLabel="Loading user profile">
      <Skeleton variant="circle" size="lg" />
      <Skeleton variant="text" size="md" />
    </Box>
  );
}
```

## Troubleshooting

### Common Issues

1. **Skeleton not animating**: Check Tailwind CSS animation configuration
2. **Wrong sizes**: Verify size prop values
3. **Styling conflicts**: Check for conflicting CSS classes
4. **Performance issues**: Ensure skeletons are conditionally rendered

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

<Skeleton
  variant="rectangle"
  size="md"
  className="mb-4"
  onLayout={event => {
    setDebugInfo({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }}
/>;

{
  debugInfo.width && (
    <Box className="rounded bg-gray-100 p-4">
      <String>Debug: {JSON.stringify(debugInfo)}</String>
    </Box>
  );
}
```

## Migration from Other Libraries

### From react-native-skeleton-placeholder

```tsx
// Old (react-native-skeleton-placeholder)
<SkeletonPlaceholder>
  <View style={styles.rectangle} />
  <View style={styles.text} />
</SkeletonPlaceholder>

// New (Skeleton)
<Box className="space-y-3">
  <Skeleton variant="rectangle" size="md" />
  <Skeleton variant="text" size="sm" />
</Box>
```

### From custom skeleton implementation

```tsx
// Old (custom implementation)
<View style={[styles.skeleton, styles.rectangle, { height: 128 }]} />

// New (Skeleton)
<Skeleton variant="rectangle" size="md" />
```
