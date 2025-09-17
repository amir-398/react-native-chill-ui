# Separator Component

A simple and lightweight horizontal separator component for React Native applications that creates visual dividers between content sections.

## Features

- **Simple Design**: Clean horizontal line separator
- **Customizable**: Full control over styling through CSS classes
- **Lightweight**: Minimal footprint with efficient rendering
- **Flexible**: Easy to customize thickness, color, and spacing
- **TypeScript**: Complete type safety with proper interfaces

## Basic Usage

```tsx
import { Separator } from 'chill-ui';

function Example() {
  return (
    <Box className="space-y-4 p-4">
      <String>Content Above</String>
      <Separator />
      <String>Content Below</String>
    </Box>
  );
}
```

## Props

| Prop        | Type     | Required | Default | Description                    |
| ----------- | -------- | -------- | ------- | ------------------------------ |
| `className` | `string` | ❌       | -       | Custom CSS classes for styling |

## Examples

### Basic Separator

```tsx
<Separator />
```

### Different Thicknesses

```tsx
<Box className="space-y-4">
  <String>Thin separator</String>
  <Separator />

  <String>Medium separator</String>
  <Separator className="h-0.5" />

  <String>Thick separator</String>
  <Separator className="h-1" />

  <String>Extra thick separator</String>
  <Separator className="h-2" />
</Box>
```

### Custom Colors

```tsx
<Box className="space-y-4">
  <Separator className="bg-gray-300" />
  <Separator className="bg-primary" />
  <Separator className="bg-red-500" />
  <Separator className="bg-blue-600" />
</Box>
```

### Custom Styling

```tsx
<Box className="space-y-4">
  <Separator className="h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
  <Separator className="h-1 rounded-full bg-gray-300" />
  <Separator className="h-px bg-gray-200 shadow-sm" />
</Box>
```

### Dark Theme

```tsx
<Box className="bg-dark space-y-4 p-4">
  <String className="text-white">Content Above</String>
  <Separator className="bg-white/30" />
  <String className="text-white">Content Below</String>
</Box>
```

### List Separators

```tsx
<Box className="space-y-2">
  {items.map((item, index) => (
    <Box key={item.id}>
      <String>{item.name}</String>
      {index < items.length - 1 && <Separator className="mt-2" />}
    </Box>
  ))}
</Box>
```

### Section Dividers

```tsx
<Box className="space-y-6">
  <Box>
    <String className="text-lg font-bold">Section 1</String>
    <String>Content for section 1</String>
  </Box>

  <Separator className="bg-gray-200" />

  <Box>
    <String className="text-lg font-bold">Section 2</String>
    <String>Content for section 2</String>
  </Box>
</Box>
```

## Best Practices

### 1. Consistent Spacing

```tsx
// ✅ Good: Use consistent spacing
<Box className="space-y-4">
  <String>Content</String>
  <Separator />
  <String>More content</String>
</Box>

// ✅ Good: Use semantic spacing classes
<Box className="space-y-6">
  <String>Section</String>
  <Separator className="my-4" />
  <String>Next section</String>
</Box>
```

### 2. Appropriate Thickness

```tsx
// ✅ Good: Use thin separators for subtle division
<Separator className="h-px" />

// ✅ Good: Use thicker separators for major sections
<Separator className="h-1" />

// ✅ Good: Use custom thickness for emphasis
<Separator className="h-0.5 bg-primary" />
```

### 3. Color Consistency

```tsx
// ✅ Good: Use consistent colors within a theme
<Separator className="bg-gray-200" />

// ✅ Good: Use semantic colors
<Separator className="bg-primary" />

// ✅ Good: Use opacity for dark themes
<Separator className="bg-white/20" />
```

### 4. Accessibility

```tsx
// ✅ Good: Ensure sufficient contrast
<Separator className="bg-gray-400" />

// ✅ Good: Use semantic colors for better accessibility
<Separator className="bg-gray-300" />
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface SeparatorProps {
  className?: string;
}
```

## Performance Considerations

- **Lightweight**: Minimal rendering overhead
- **Efficient**: Simple component with no complex logic
- **Optimized**: Uses Tailwind CSS for efficient styling

## Dependencies

- **Box**: For layout container
- **cn**: For class name utilities

## Accessibility

The component supports standard accessibility features:

- **Visual Separation**: Clear visual distinction between content sections
- **Color Contrast**: Ensure sufficient contrast for visibility
- **Semantic Use**: Use appropriately for content organization
