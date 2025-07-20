# String Components

A comprehensive text component system for React Native that provides consistent typography, optimized performance, and flexible styling options. Includes both high-level `String` component with predefined variants and low-level `Text` component for custom implementations.

## Features

- ✅ **High-Level String Component**: Predefined styling variants with consistent typography
- ✅ **Optimized Text Rendering**: FastText implementation for better performance
- ✅ **Flexible Styling**: Support for custom colors, sizes, fonts, and weights
- ✅ **Typography System**: Consistent text sizing and spacing
- ✅ **Color Variants**: Predefined color schemes for different contexts
- ✅ **Press Handling**: Optional press interactions for interactive text
- ✅ **Animation Support**: AnimatedText component for smooth transitions
- ✅ **Tailwind Integration**: Full Tailwind CSS support with className
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Performance**: Optimized rendering with RCTText when possible

## Quick Start

```tsx
import String from '@/components/string/String';
import { Text } from '@/components/string/Text';

// High-level String component
<String size="lg" colorVariant="primary" weight="bold">
  Welcome to our app!
</String>

// Low-level Text component
<Text className="text-base text-gray-800">
  Custom styled text
</Text>
```

## Components Overview

### String Component

High-level component with predefined styling variants and consistent typography system.

### Text Component

Low-level component that provides optimized text rendering with optional press handling.

### FastText Component

Performance-optimized text component using RCTText for static content.

### AnimatedText Component

Animated version of FastText for smooth text animations.

## Examples

### String Component Usage

```tsx
import String from '@/components/string/String';

// Basic text with default styling
<String>Hello World</String>

// Different sizes
<String size="xs">Extra Small Text</String>
<String size="sm">Small Text</String>
<String size="md">Medium Text</String>
<String size="lg">Large Text</String>
<String size="xl">Extra Large Text</String>
<String size="2xl">2XL Text</String>
<String size="3xl">3XL Text</String>

// Color variants
<String colorVariant="primary">Primary Text</String>
<String colorVariant="secondary">Secondary Text</String>
<String colorVariant="success">Success Text</String>
<String colorVariant="warning">Warning Text</String>
<String colorVariant="error">Error Text</String>

// Font weights
<String weight="normal">Normal Weight</String>
<String weight="medium">Medium Weight</String>
<String weight="semibold">Semibold Weight</String>
<String weight="bold">Bold Weight</String>

// Text alignment
<String position="left">Left Aligned</String>
<String position="center">Center Aligned</String>
<String position="right">Right Aligned</String>
<String position="justify">Justified Text</String>
```

### Text Component Usage

```tsx
import { Text, FastText, AnimatedText } from '@/components/string/Text';

// Basic text with Tailwind classes
<Text className="text-lg text-gray-800 font-semibold">
  Custom styled text
</Text>

// Pressable text
<Text
  onPress={() => console.log('Text pressed!')}
  className="text-blue-500 underline"
>
  Click me
</Text>

// Fast text for static content
<FastText className="text-base text-gray-600">
  Static content for better performance
</FastText>

// Animated text
<AnimatedText className="text-xl text-purple-600">
  Animated text content
</AnimatedText>

// Force native text rendering
<Text useFastText={false} className="text-lg">
  Native Text Component
</Text>
```

### Advanced Styling

```tsx
// Custom color override
<String color="#FF6B6B" size="xl" weight="bold">
  Custom Red Text
</String>

// Combined styling
<String
  size="lg"
  colorVariant="primary"
  weight="semibold"
  position="center"
  className="mb-4"
>
  Centered Primary Text
</String>

// Custom font and styling
<String
  font="custom-font"
  size="2xl"
  colorVariant="success"
  className="tracking-wide"
>
  Custom Font Text
</String>
```

### Interactive Text

```tsx
// Pressable String component
<String
  onPress={() => alert('String pressed!')}
  colorVariant="primary"
  size="lg"
  className="underline"
>
  Pressable String
</String>

// Pressable Text component
<Text
  onPress={() => console.log('Text pressed!')}
  className="text-blue-500 text-lg font-medium underline"
>
  Pressable Text
</Text>

// Complex interactive text
<Text
  onPress={() => navigation.navigate('Details')}
  className="text-purple-600 text-base font-semibold"
>
  Navigate to Details
</Text>
```

### Typography Patterns

```tsx
// Headings
<String size="3xl" weight="bold" colorVariant="primary">
  Main Heading
</String>

<String size="2xl" weight="semibold" colorVariant="secondary">
  Sub Heading
</String>

<String size="xl" weight="medium">
  Section Title
</String>

// Body text
<String size="lg" colorVariant="primary">
  Large body text for important content
</String>

<String size="md" colorVariant="secondary">
  Regular body text for general content
</String>

<String size="sm" colorVariant="secondary">
  Small text for captions and metadata
</String>

// Labels and captions
<String size="xs" colorVariant="secondary" weight="medium">
  CAPTION TEXT
</String>
```

## Props Reference

### StringProps

| Prop           | Type                                                            | Default     | Description                               |
| -------------- | --------------------------------------------------------------- | ----------- | ----------------------------------------- |
| `children`     | `ReactNode`                                                     | -           | Text content to display                   |
| `className`    | `string`                                                        | -           | Custom CSS classes for additional styling |
| `color`        | `string`                                                        | -           | Custom color override (hex, rgb, etc.)    |
| `colorVariant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Predefined color variant                  |
| `font`         | `string`                                                        | -           | Font family to use                        |
| `position`     | `'left' \| 'center' \| 'right' \| 'justify'`                    | -           | Text alignment position                   |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'`        | -           | Text size variant                         |
| `style`        | `StyleProp<TextStyle>`                                          | -           | Additional inline styles                  |
| `variant`      | `string`                                                        | -           | Text variant for special styling          |
| `weight`       | `'normal' \| 'medium' \| 'semibold' \| 'bold'`                  | -           | Font weight                               |

### TextProps

| Prop          | Type                   | Default | Description                              |
| ------------- | ---------------------- | ------- | ---------------------------------------- |
| `children`    | `ReactNode`            | -       | Text content to display                  |
| `onPress`     | `() => void`           | -       | Optional press handler function          |
| `useFastText` | `boolean`              | `true`  | Whether to use FastText for optimization |
| `className`   | `string`               | -       | Tailwind CSS classes                     |
| `style`       | `StyleProp<TextStyle>` | -       | Additional inline styles                 |

## Size Variants

| Size  | Font Size | Line Height | Use Case           |
| ----- | --------- | ----------- | ------------------ |
| `xs`  | 12px      | 16px        | Captions, metadata |
| `sm`  | 14px      | 20px        | Small text, labels |
| `md`  | 16px      | 24px        | Body text, default |
| `lg`  | 18px      | 28px        | Large body text    |
| `xl`  | 20px      | 28px        | Section titles     |
| `2xl` | 24px      | 32px        | Sub headings       |
| `3xl` | 30px      | 36px        | Main headings      |

## Color Variants

| Variant     | Color                 | Use Case                            |
| ----------- | --------------------- | ----------------------------------- |
| `primary`   | Theme primary color   | Main text, headings                 |
| `secondary` | Theme secondary color | Body text, descriptions             |
| `success`   | Green color           | Success messages, positive feedback |
| `warning`   | Yellow/Orange color   | Warnings, cautions                  |
| `error`     | Red color             | Error messages, alerts              |

## Best Practices

### 1. Choose Appropriate Components

```tsx
// ✅ Good - Use String for consistent typography
<String size="lg" colorVariant="primary" weight="bold">
  Main Heading
</String>

// ✅ Good - Use Text for custom styling
<Text className="text-lg text-blue-500 font-bold">
  Custom styled text
</Text>

// ❌ Avoid - Don't mix inconsistent styling
<String size="lg" className="text-red-500 font-bold">
  Mixed styling approach
</String>
```

### 2. Use Semantic Color Variants

```tsx
// ✅ Good - Semantic color usage
<String colorVariant="success">Operation completed successfully</String>
<String colorVariant="error">An error occurred</String>
<String colorVariant="warning">Please review your input</String>

// ❌ Avoid - Inconsistent color usage
<String color="#00FF00">Success message</String>
<String color="#FF0000">Error message</String>
```

### 3. Optimize Performance

```tsx
// ✅ Good - Use FastText for static content
<FastText className="text-base text-gray-600">
  Static content that won't change
</FastText>

// ✅ Good - Use Text with onPress for interactive content
<Text onPress={handlePress} className="text-blue-500">
  Interactive text
</Text>

// ❌ Avoid - Don't use FastText for interactive content
<FastText onPress={handlePress}>This won't work</FastText>
```

### 4. Maintain Typography Hierarchy

```tsx
// ✅ Good - Clear typography hierarchy
<String size="3xl" weight="bold">Main Title</String>
<String size="xl" weight="semibold">Section Title</String>
<String size="lg">Body Text</String>
<String size="sm" colorVariant="secondary">Caption</String>

// ❌ Avoid - Inconsistent hierarchy
<String size="lg" weight="bold">Main Title</String>
<String size="3xl" weight="normal">Section Title</String>
```

### 5. Consider Accessibility

```tsx
// ✅ Good - Accessible text
<String
  size="lg"
  colorVariant="primary"
  accessible={true}
  accessibilityLabel="Important notification"
>
  Important notification
</String>

// ✅ Good - Proper contrast
<String colorVariant="primary" size="md">
  High contrast text
</String>

// ❌ Avoid - Poor contrast
<String color="#CCCCCC" size="md">
  Low contrast text
</String>
```

## Advanced Usage

### Custom Typography System

```tsx
// Create custom text components
const Heading = ({ children, ...props }) => (
  <String size="2xl" weight="bold" colorVariant="primary" {...props}>
    {children}
  </String>
);

const BodyText = ({ children, ...props }) => (
  <String size="md" colorVariant="secondary" {...props}>
    {children}
  </String>
);

const Caption = ({ children, ...props }) => (
  <String size="sm" colorVariant="secondary" weight="medium" {...props}>
    {children}
  </String>
);

// Usage
<Heading>Article Title</Heading>
<BodyText>Article content goes here...</BodyText>
<Caption>Published on January 1, 2024</Caption>
```

### Animated Text

```tsx
import { AnimatedText } from '@/components/string/Text';
import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const AnimatedString = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <AnimatedText className="text-xl text-blue-600" style={{ opacity: fadeAnim }}>
      {children}
    </AnimatedText>
  );
};

// Usage
<AnimatedString>Fade in text</AnimatedString>;
```

### Conditional Styling

```tsx
const StatusText = ({ status, children }) => {
  const getColorVariant = () => {
    switch (status) {
      case 'success': return 'success';
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <String
      size="md"
      colorVariant={getColorVariant()}
      weight="medium"
    >
      {children}
    </String>
  );
};

// Usage
<StatusText status="success">Operation completed</StatusText>
<StatusText status="error">Something went wrong</StatusText>
<StatusText status="warning">Please review your input</StatusText>
```

### Performance Optimization

```tsx
import React from 'react';
import String from '@/components/string/String';

// Memoized text component for performance
const MemoizedString = React.memo(({ children, ...props }) => <String {...props}>{children}</String>);

// Usage in lists
{
  items.map(item => (
    <MemoizedString key={item.id} size="md">
      {item.text}
    </MemoizedString>
  ));
}
```

## Performance Considerations

- **FastText Optimization**: Use FastText for static content to improve performance
- **Memoization**: Memoize text components in lists or frequently re-rendered areas
- **Native Driver**: Use native driver for text animations when possible
- **Font Loading**: Preload custom fonts to avoid layout shifts

## Accessibility

The String and Text components include comprehensive accessibility features:

- **Screen reader support**: Proper accessibility labels and hints
- **Dynamic Type**: Support for system font scaling
- **Color contrast**: Built-in color variants with good contrast ratios
- **Semantic meaning**: Proper text hierarchy and meaning

### Accessibility Best Practices

```tsx
// Always provide accessibility context
<String
  size="lg"
  colorVariant="primary"
  accessible={true}
  accessibilityLabel="Important notification"
  accessibilityHint="This is a critical system message"
>
  Important notification
</String>

// Use semantic color variants
<String colorVariant="error" size="md">
  Error: Please check your input
</String>

// Provide proper text hierarchy
<String size="3xl" weight="bold" accessibilityRole="header">
  Main Heading
</String>
```

## Troubleshooting

### Common Issues

1. **Text not rendering**: Check if children prop is provided
2. **Styling not applying**: Verify className syntax and Tailwind configuration
3. **Performance issues**: Use FastText for static content
4. **Press not working**: Ensure onPress is provided and not using FastText
5. **Font not loading**: Check font configuration and loading

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

<String
  size="lg"
  colorVariant="primary"
  onLayout={event => {
    setDebugInfo({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
      fontSize: event.nativeEvent.layout.fontSize,
    });
  }}
>
  Debug Text
</String>;

{
  debugInfo.width && (
    <Box className="rounded bg-gray-100 p-4">
      <String size="sm">Debug: {JSON.stringify(debugInfo)}</String>
    </Box>
  );
}
```

## Migration from React Native Text

### From React Native Text

```tsx
// Old (React Native Text)
<Text style={styles.heading}>Heading</Text>
<Text style={styles.body}>Body text</Text>

// New (String component)
<String size="2xl" weight="bold" colorVariant="primary">Heading</String>
<String size="md" colorVariant="secondary">Body text</String>

// New (Text component with Tailwind)
<Text className="text-2xl font-bold text-primary">Heading</Text>
<Text className="text-base text-secondary">Body text</Text>
```

### From Custom Text Components

```tsx
// Old (custom implementation)
const CustomText = ({ size, color, children }) => <Text style={[styles[size], { color }]}>{children}</Text>;

// New (String component)
<String size={size} color={color}>
  {children}
</String>;
```
