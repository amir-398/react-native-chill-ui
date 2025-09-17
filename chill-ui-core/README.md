# Chill UI - React Native Component Library

A comprehensive and flexible React Native component library built with TypeScript, featuring modern design patterns, automatic dependency management, and seamless NativeWind integration.

## 🚀 Features

- **TypeScript First**: Full type safety with detailed interfaces
- **NativeWind Ready**: Automatic detection and fallback to StyleSheet
- **Performance Optimized**: Efficient rendering with proper fallbacks
- **Cross-Platform**: Consistent behavior across iOS and Android
- **Dependency Management**: Automatic handling of optional dependencies
- **Modern Architecture**: Built with React Native best practices

## 📦 Installation

```bash
npm install chill-ui
# or
yarn add chill-ui
```

## 🔧 Setup

### NativeWind (Recommended)

```bash
npm install nativewind
npm install --dev tailwindcss
```

```javascript
// tailwind.config.js
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        secondary: '#5856D6',
        // ... your custom colors
      },
    },
  },
};
```

### Optional Dependencies

For enhanced functionality, install these optional packages:

```bash
# For safe area handling
npm install react-native-safe-area-context

# For advanced keyboard handling
npm install react-native-keyboard-controller
```

## 🧩 Components

### Wrapper

A flexible container component that provides multiple behavior options including safe area handling, keyboard avoidance, scrolling, and customizable styling.

#### Quick Start

```tsx
import { Wrapper } from 'chill-ui';

// Basic wrapper
<Wrapper>
  <Text>Your content here</Text>
</Wrapper>

// Scrollable wrapper
<Wrapper hasScrollView>
  <Text>Scrollable content</Text>
</Wrapper>

// Safe area wrapper with keyboard avoidance
<Wrapper hasSafeAreaView hasKeyboardAvoidingView>
  <TextInput placeholder="Type here" />
</Wrapper>
```

#### Props

| Prop                         | Type                                         | Default                              | Description                                            |
| ---------------------------- | -------------------------------------------- | ------------------------------------ | ------------------------------------------------------ |
| `children`                   | `ReactNode`                                  | -                                    | Content to render inside the wrapper.                  |
| `className`                  | `string`                                     | -                                    | Custom CSS classes for styling (used with NativeWind). |
| `edges`                      | `('top' \| 'right' \| 'bottom' \| 'left')[]` | `['top', 'bottom', 'left', 'right']` | Safe area edges to apply when using SafeAreaView.      |
| `hasKeyboardAvoidingView`    | `boolean`                                    | `false`                              | Whether to wrap content in a KeyboardAvoidingView.     |
| `hasKeyboardAwareScrollView` | `boolean`                                    | `false`                              | Whether to wrap content in a KeyboardAwareScrollView.  |
| `hasSafeAreaView`            | `boolean`                                    | `false`                              | Whether to wrap content in a SafeAreaView.             |
| `hasScrollView`              | `boolean`                                    | `false`                              | Whether to wrap content in a ScrollView.               |
| `nestedScrollEnabled`        | `boolean`                                    | `false`                              | Whether nested scrolling is enabled (for ScrollView).  |

#### Behavior Priority

The component follows a specific priority order:

1. **SafeAreaView** (if `hasSafeAreaView` is true or `edges` are specified)
2. **KeyboardAwareScrollView** (if `hasKeyboardAwareScrollView` is true)
3. **KeyboardAvoidingView** (if `hasKeyboardAvoidingView` is true)
4. **ScrollView** (if `hasScrollView` is true)
5. **Basic View** (default fallback)

#### Examples

```tsx
// Form with keyboard handling
<Wrapper hasSafeAreaView hasKeyboardAvoidingView>
  <TextInput placeholder="Name" />
  <TextInput placeholder="Email" />
  <TextInput placeholder="Phone" />
  <Button title="Submit" />
</Wrapper>

// Custom safe area edges
<Wrapper hasSafeAreaView edges={['top', 'bottom']}>
  <Text>Content with top and bottom safe areas only</Text>
</Wrapper>

// Keyboard-aware scrolling
<Wrapper hasKeyboardAwareScrollView>
  {Array.from({ length: 10 }, (_, i) => (
    <TextInput key={i} placeholder={`Input ${i + 1}`} />
  ))}
</Wrapper>
```

### String

A flexible text component with consistent typography and styling options.

```tsx
import { String } from 'chill-ui';

<String size="lg" colorVariant="primary" weight="bold">
  Welcome!
</String>;
```

### Box

A versatile container component for layout and styling.

```tsx
import { Box } from 'chill-ui';

<Box className="rounded-lg bg-white p-4">
  <Text>Content</Text>
</Box>;
```

### Button

A customizable button component with multiple variants.

```tsx
import { Button } from 'chill-ui';

<Button variant="primary" size="lg">
  Click me
</Button>;
```

## 🎨 Styling

### With NativeWind

```tsx
<Wrapper hasSafeAreaView className="rounded-lg bg-gray-100 p-4">
  <Text>Styled content</Text>
</Wrapper>
```

### Without NativeWind

The components automatically fall back to StyleSheet with basic styling.

## 🔄 Migration Guide

If you're upgrading from a previous version, note these prop changes:

- `safeAreaView` → `hasSafeAreaView`
- `scrollView` → `hasScrollView`
- `keyboardAvoidingView` → `hasKeyboardAvoidingView`
- `keyboardAwareScrollView` → `hasKeyboardAwareScrollView`
- Removed: `px`, `py`, `pt`, `my`, `itemsCenter`, `justifyBetween`

## 🚀 Best Practices

1. **Use `hasSafeAreaView`** for screens that need safe area handling
2. **Use `hasKeyboardAvoidingView`** for forms and input-heavy screens
3. **Use `hasScrollView`** for content that might overflow
4. **Use `hasKeyboardAwareScrollView`** for scrollable forms
5. **Combine props** for complex layouts
6. **Use `className`** for custom styling when NativeWind is available

## 📚 Documentation

For detailed documentation on each component, see the individual README files in the `src/components/` directory.

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on our GitHub repository.
