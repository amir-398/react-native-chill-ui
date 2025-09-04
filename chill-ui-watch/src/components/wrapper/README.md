# Wrapper Component

A flexible and powerful container component for React Native that provides multiple behavior options including safe area handling, keyboard avoidance, scrolling, and customizable styling.

## Features

- **Multiple Container Behaviors**: Choose between View, ScrollView, KeyboardAvoidingView, and KeyboardAwareScrollView
- **Safe Area Support**: Automatic safe area handling with customizable edges
- **Keyboard Handling**: Built-in keyboard avoidance and awareness
- **NativeWind & StyleSheet Support**: Automatically detects NativeWind availability and falls back to StyleSheet
- **TypeScript Support**: Fully typed for a better development experience
- **Performance Optimized**: Efficient rendering with proper fallbacks

## Quick Start

```tsx
import Wrapper from './Wrapper';

// Basic wrapper with default styling
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

// Advanced wrapper with all features
<Wrapper
  hasSafeAreaView
  hasKeyboardAwareScrollView
  className="bg-gray-100"
>
  <Text>Advanced content</Text>
</Wrapper>
```

## Container Behaviors

The Wrapper component automatically determines which container to render based on the props you provide:

### 1. Basic View (Default)

Renders a simple `Box` component with `flex-grow: 1` styling.

```tsx
<Wrapper>
  <Text>Basic content</Text>
</Wrapper>
```

### 2. ScrollView

Renders a `ScrollView` when `hasScrollView` is true.

```tsx
<Wrapper hasScrollView>
  <Text>Scrollable content</Text>
</Wrapper>
```

### 3. KeyboardAvoidingView

Renders a `KeyboardAvoidingView` when `hasKeyboardAvoidingView` is true.

```tsx
<Wrapper hasKeyboardAvoidingView>
  <TextInput placeholder="Input field" />
</Wrapper>
```

### 4. KeyboardAwareScrollView

Renders a `KeyboardAwareScrollView` when `hasKeyboardAwareScrollView` is true.

```tsx
<Wrapper hasKeyboardAwareScrollView>
  <Text>Keyboard-aware scrollable content</Text>
</Wrapper>
```

### 5. SafeAreaView

Renders a `SafeAreaView` when `hasSafeAreaView` is true or when `edges` are specified.

```tsx
<Wrapper hasSafeAreaView>
  <Text>Content with safe area</Text>
</Wrapper>
```

## Dependencies

The Wrapper component has optional dependencies that provide enhanced functionality:

### react-native-keyboard-controller

Required for `hasKeyboardAvoidingView` and `hasKeyboardAwareScrollView` props.

```bash
npm install react-native-keyboard-controller
```

### react-native-safe-area-context

Required for `hasSafeAreaView` and `edges` props.

```bash
npm install react-native-safe-area-context
```

## Props

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

## Behavior Priority

The component follows a specific priority order when determining which container to render:

1. **SafeAreaView** (if `hasSafeAreaView` is true or `edges` are specified)
2. **KeyboardAwareScrollView** (if `hasKeyboardAwareScrollView` is true)
3. **KeyboardAvoidingView** (if `hasKeyboardAvoidingView` is true)
4. **ScrollView** (if `hasScrollView` is true)
5. **Basic View** (default fallback)

## Examples

### Basic Layout

```tsx
<Wrapper className="bg-white">
  <Text>Simple content</Text>
</Wrapper>
```

### Scrollable Content

```tsx
<Wrapper hasScrollView nestedScrollEnabled>
  {Array.from({ length: 20 }, (_, i) => (
    <Text key={i}>Item {i + 1}</Text>
  ))}
</Wrapper>
```

### Form with Keyboard Handling

```tsx
<Wrapper hasSafeAreaView hasKeyboardAvoidingView>
  <TextInput placeholder="Name" />
  <TextInput placeholder="Email" />
  <TextInput placeholder="Phone" />
  <Button title="Submit" />
</Wrapper>
```

### Custom Safe Area Edges

```tsx
<Wrapper hasSafeAreaView edges={['top', 'bottom']}>
  <Text>Content with top and bottom safe areas only</Text>
</Wrapper>
```

### Keyboard-Aware Scrolling

```tsx
<Wrapper hasKeyboardAwareScrollView>
  {Array.from({ length: 10 }, (_, i) => (
    <TextInput key={i} placeholder={`Input ${i + 1}`} />
  ))}
</Wrapper>
```

## Styling

### With NativeWind

When NativeWind is available, you can use Tailwind CSS classes:

```tsx
<Wrapper hasSafeAreaView className="rounded-lg bg-gray-100 p-4">
  <Text>Styled content</Text>
</Wrapper>
```

### Without NativeWind

The component automatically falls back to StyleSheet with basic styling:

```tsx
<Wrapper hasScrollView>
  <Text>Content with fallback styling</Text>
</Wrapper>
```

## Performance Considerations

- The component automatically detects NativeWind availability
- Optional dependencies are loaded dynamically to avoid bundle bloat
- Proper fallbacks ensure the component works in all environments
- Efficient rendering with minimal re-renders

## Error Handling

The component gracefully handles missing dependencies:

- **Missing `react-native-keyboard-controller`**: Falls back to ScrollView or View
- **Missing `react-native-safe-area-context`**: Falls back to scroll components
- **Console warnings** are displayed to guide developers on required installations

## Migration from Previous Versions

If you're upgrading from a previous version, note these prop changes:

- `safeAreaView` → `hasSafeAreaView`
- `scrollView` → `hasScrollView`
- `keyboardAvoidingView` → `hasKeyboardAvoidingView`
- `keyboardAwareScrollView` → `hasKeyboardAwareScrollView`
- Removed: `px`, `py`, `pt`, `my`, `itemsCenter`, `justifyBetween`

## Best Practices

1. **Use `hasSafeAreaView`** for screens that need safe area handling
2. **Use `hasKeyboardAvoidingView`** for forms and input-heavy screens
3. **Use `hasScrollView`** for content that might overflow
4. **Use `hasKeyboardAwareScrollView`** for scrollable forms
5. **Combine props** for complex layouts (e.g., `hasSafeAreaView` + `hasKeyboardAvoidingView`)
6. **Use `className`** for custom styling when NativeWind is available
