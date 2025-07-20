# Box Component Variants

A curated collection of essential Box components for common layout patterns in React Native. Each variant is pre-configured with specific Tailwind classes for optimal developer experience.

## Features

- **14 Essential Variants**: Carefully selected components for the most common layout patterns
- **Performance Optimized**: Uses React Native's internal ViewNativeComponent for optimal performance
- **Semantic Names**: Clear, descriptive names for each variant
- **Flexbox Power**: Leverages Flexbox for responsive layouts
- **TypeScript**: Full type safety with ViewProps
- **Lightweight**: Minimal overhead with optimized NativeView wrapper
- **Consistent**: Uniform API across all variants

## Performance

All Box components use React Native's internal `ViewNativeComponent` for optimal performance by bypassing some abstraction layers, providing faster rendering compared to standard View components.

## Basic Usage

```tsx
import { Box, BoxRow, BoxCenter } from 'chill-ui';

function Example() {
  return (
    <Box>
      <BoxRow>
        <BoxCenter>Centered content</BoxCenter>
      </BoxRow>
    </Box>
  );
}
```

## Component Categories

### Basic Components

| Component | Classes | Description                          |
| --------- | ------- | ------------------------------------ |
| `Box`     | -       | Basic container (no default styling) |

### Row Variants (Horizontal Layout)

| Component             | Classes                                      | Description                        |
| --------------------- | -------------------------------------------- | ---------------------------------- |
| `BoxRow`              | `flex flex-row`                              | Horizontal layout                  |
| `BoxRowCenter`        | `flex flex-row items-center`                 | Horizontal with vertical centering |
| `BoxRowBetween`       | `flex flex-row justify-between`              | Space between items                |
| `BoxRowCenterBetween` | `flex flex-row items-center justify-between` | Center + space between             |

### Column Variants (Vertical Layout)

| Component                | Classes                                      | Description                        |
| ------------------------ | -------------------------------------------- | ---------------------------------- |
| `BoxColumn`              | `flex flex-col`                              | Vertical layout                    |
| `BoxColumnCenter`        | `flex flex-col items-center`                 | Vertical with horizontal centering |
| `BoxColumnBetween`       | `flex flex-col justify-between`              | Space between items                |
| `BoxColumnCenterBetween` | `flex flex-col items-center justify-between` | Center + space between             |

### Center Variants

| Component   | Classes                            | Description       |
| ----------- | ---------------------------------- | ----------------- |
| `BoxCenter` | `flex items-center justify-center` | Perfect centering |

### Grow Variants (Flexible Size)

| Component       | Classes           | Description              |
| --------------- | ----------------- | ------------------------ |
| `BoxGrow`       | `flex-1`          | Fills available space    |
| `BoxRowGrow`    | `flex-1 flex-row` | Growing row container    |
| `BoxColumnGrow` | `flex-1 flex-col` | Growing column container |

### Positioning Variants

| Component     | Classes    | Description          |
| ------------- | ---------- | -------------------- |
| `BoxAbsolute` | `absolute` | Absolute positioning |

### Stack Variants (Layered Content)

| Component  | Classes    | Description                   |
| ---------- | ---------- | ----------------------------- |
| `BoxStack` | `relative` | Container for layered content |

## Examples

### App Layout

```tsx
function AppLayout() {
  return (
    <BoxColumnGrow>
      {/* Header */}
      <BoxAbsolute className="left-0 right-0 top-0 z-10 bg-white p-4">
        <BoxRowCenterBetween>
          <String size="lg" weight="bold">
            App Title
          </String>
          <Icon name="menu" />
        </BoxRowCenterBetween>
      </BoxAbsolute>

      {/* Main Content */}
      <BoxGrow className="pt-16">
        <BoxCenter>
          <String>Main Content</String>
        </BoxCenter>
      </BoxGrow>

      {/* Footer */}
      <BoxAbsolute className="bottom-0 left-0 right-0 bg-gray-100 p-4">
        <BoxRowCenter>
          <String>Footer Content</String>
        </BoxRowCenter>
      </BoxAbsolute>
    </BoxColumnGrow>
  );
}
```

### Card Layout

```tsx
function Card() {
  return (
    <BoxStack className="rounded-lg bg-white shadow-lg">
      <BoxColumn className="p-4">
        <BoxRowCenterBetween className="mb-4">
          <String size="lg" weight="bold">
            Card Title
          </String>
          <Badge size="sm">New</Badge>
        </BoxRowCenterBetween>

        <BoxGrow>
          <String>Card content goes here...</String>
        </BoxGrow>

        <BoxRow className="mt-4 justify-end">
          <Button>Action</Button>
        </BoxRow>
      </BoxColumn>

      <BoxAbsolute className="right-2 top-2">
        <Icon name="heart" />
      </BoxAbsolute>
    </BoxStack>
  );
}
```

### Navigation Bar

```tsx
function NavigationBar() {
  return (
    <BoxRowBetween className="border-b bg-white p-4">
      <BoxRowCenter className="gap-2">
        <Icon name="arrow-left" />
        <String weight="semibold">Back</String>
      </BoxRowCenter>

      <BoxCenter>
        <String size="lg" weight="bold">
          Page Title
        </String>
      </BoxCenter>

      <BoxRowCenter className="gap-2">
        <Icon name="search" />
        <Icon name="more" />
      </BoxRowCenter>
    </BoxRowBetween>
  );
}
```

### Grid Layout

```tsx
function GridLayout() {
  return (
    <BoxRow className="flex-wrap gap-4 p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <BoxCenter key={index} className="h-32 w-1/2 rounded-lg bg-gray-200">
          <String>Item {index + 1}</String>
        </BoxCenter>
      ))}
    </BoxRow>
  );
}
```

### Modal Overlay

```tsx
function ModalOverlay() {
  return (
    <BoxAbsolute className="inset-0 bg-black/50">
      <BoxCenter className="flex-1">
        <BoxCenter className="m-4 rounded-lg bg-white p-6">
          <BoxColumnCenter className="gap-4">
            <String size="lg" weight="bold">
              Modal Title
            </String>
            <String>Modal content goes here...</String>
            <BoxRowCenter className="gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Confirm</Button>
            </BoxRowCenter>
          </BoxColumnCenter>
        </BoxCenter>
      </BoxCenter>
    </BoxAbsolute>
  );
}
```

### Profile Header

```tsx
function ProfileHeader() {
  return (
    <BoxColumnCenter className="bg-gradient-to-b from-blue-500 to-blue-600 p-6">
      <BoxStack className="mb-4">
        <Box className="h-20 w-20 rounded-full bg-white">
          <BoxCenter className="h-full w-full">
            <Avatar data={{ firstname: 'John', lastname: 'Doe' }} />
          </BoxCenter>
        </Box>
        <BoxAbsolute className="bottom-0 right-0">
          <Box className="h-6 w-6 rounded-full border-2 border-white bg-green-500" />
        </BoxAbsolute>
      </BoxStack>

      <BoxColumnCenter>
        <String size="xl" weight="bold" className="text-white">
          John Doe
        </String>
        <String className="text-blue-100">Software Engineer</String>
      </BoxColumnCenter>
    </BoxColumnCenter>
  );
}
```

## Best Practices

### 1. Choose the Right Variant

```tsx
// ✅ Good: Use semantic variants
<BoxRowCenterBetween>
  <String>Title</String>
  <Button>Action</Button>
</BoxRowCenterBetween>

// ❌ Avoid: Manual styling when variant exists
<Box className="flex flex-row items-center justify-between">
  <String>Title</String>
  <Button>Action</Button>
</Box>
```

### 2. Combine Variants Effectively

```tsx
// ✅ Good: Layer variants for complex layouts
<BoxGrow>
  <BoxColumnBetween>
    <BoxRowCenter>Header</BoxRowCenter>
    <BoxCenter>Content</BoxCenter>
    <BoxRow className="justify-end">Footer</BoxRow>
  </BoxColumnBetween>
</BoxGrow>
```

### 3. Use Absolute Positioning Sparingly

```tsx
// ✅ Good: Use for overlays and notifications
<BoxStack>
  <BoxCenter>Main Content</BoxCenter>
  <BoxAbsolute className="right-2 top-2">
    <Badge>Notification</Badge>
  </BoxAbsolute>
</BoxStack>
```

### 4. Combine with Custom Classes

```tsx
// ✅ Good: Extend with additional styling
<BoxRowCenter className="gap-4 bg-gray-100 p-4">
  <Icon name="star" />
  <String>Featured</String>
</BoxRowCenter>
```

### 5. Use Additional Classes for Missing Variants

```tsx
// For removed variants, use base component + classes
<BoxRow className="justify-around">  {/* Instead of BoxRowAround */}
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</BoxRow>

<BoxColumn className="items-end">  {/* Instead of BoxColumnEnd */}
  <String>Right aligned</String>
</BoxColumn>

<BoxAbsolute className="top-0 right-0">  {/* Instead of BoxAbsoluteTopRight */}
  <Badge>5</Badge>
</BoxAbsolute>
```

## Performance Considerations

- All variants use React Native's internal `ViewNativeComponent` for optimal performance
- Significantly faster rendering compared to standard View components
- No performance difference between variants
- Consider memoization for complex layouts with many children
- Lightweight function components with minimal overhead

## File Structure

```
box/
├── README.md      # This documentation
├── Box.tsx        # All Box variants
├── View.tsx       # Base View component
└── index.ts       # Exports
```

## TypeScript

All variants accept the same `ViewProps` interface:

```tsx
import type { ViewProps } from 'react-native';

// All variants have the same signature
function BoxVariant(props: ViewProps) {
  return <NativeView {...props} />;
}
```

## Related Components

- **View**: Base view component
- **String**: Text component often used with Box
- **Icon**: Icon component for decorative elements
- **Badge**: Status indicators often positioned with Box
