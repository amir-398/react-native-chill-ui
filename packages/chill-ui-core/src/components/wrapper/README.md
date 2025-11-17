# Wrapper Components

A comprehensive collection of flexible wrapper components for React Native that provide consistent layout management, keyboard handling, and safe area support across three different styling approaches.

> **Note**: These components are designed to work seamlessly with React Native's layout system and provide enhanced functionality for common UI patterns.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Wrapper, WrapperScrollView, WrapperSafeAreaView, WrapperKeyboardAvoidingView, WrapperKeyboardAwareScrollView, WrapperKeyboardAvoidingStickyView } from 'react-native-chill-ui'`

## Features

- **Flexible Layout Management**: Multiple wrapper components for different layout needs
- **Keyboard Handling**: Advanced keyboard avoidance and awareness
- **Safe Area Support**: Automatic handling of device safe areas (notch, home indicator)
- **Scroll Management**: Intelligent scroll behavior with keyboard integration
- **Multiple Styling Approaches**: Choose the version that matches your project's needs
- **TypeScript Support**: Fully typed for a better development experience
- **Optional Dependencies**: Graceful fallbacks when optional dependencies are not installed

## Quick Start

```tsx
import {
  Wrapper,
  WrapperScrollView,
  WrapperSafeAreaView,
  WrapperKeyboardAvoidingView,
  WrapperKeyboardAwareScrollView
} from 'react-native-chill-ui';

// Basic wrapper
<Wrapper className="bg-gray-100 p-4">
  <String>Content</String>
</Wrapper>

// Scrollable content with keyboard handling
<WrapperScrollView contentContainerClassName="p-4">
  <String>Scrollable content</String>
</WrapperScrollView>

// Safe area wrapper
<WrapperSafeAreaView edges={['top', 'bottom']}>
  <String>Safe area content</String>
</WrapperSafeAreaView>

// Keyboard avoiding wrapper
<WrapperKeyboardAvoidingView behavior="padding">
  <Input placeholder="Type here" />
</WrapperKeyboardAvoidingView>
```

## Choosing the Right Version

Select the appropriate version during installation based on your project's needs:

| Version        | Installation Command                           | Use When                                                                                             | Pros                                                                            | Cons                                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **StyleSheet** | `npm install react-native-chill-ui@stylesheet` | • No CSS-in-JS dependencies<br/>• Maximum performance needed<br/>• Simple styling requirements       | • Lightweight<br/>• Fast performance<br/>• No external dependencies             | • Less flexible<br/>• Manual theme management         |
| **Tailwind**   | `npm install react-native-chill-ui@tailwind`   | • Already using NativeWind<br/>• Team familiar with Tailwind<br/>• Design system based on utilities  | • Consistent with web Tailwind<br/>• Powerful utility system<br/>• Easy theming | • Requires NativeWind setup<br/>• Larger bundle size  |
| **Hybrid**     | `npm install react-native-chill-ui@hybrid`     | • Building component library<br/>• Uncertain about styling approach<br/>• Want maximum compatibility | • Works in any environment<br/>• Future-proof<br/>• Automatic detection         | • Slightly larger bundle<br/>• More complex internals |

## Components Overview

### 1. **Wrapper** - Basic Container

A flexible container with default styling and optional safe area support.

```tsx
<Wrapper className="bg-white p-4" fill grow>
  <String>Content</String>
</Wrapper>
```

### 2. **WrapperScrollView** - Scrollable Container

A ScrollView wrapper with keyboard handling and safe area support.

```tsx
<WrapperScrollView contentContainerClassName="p-4" nestedScrollEnabled={false} keyboardShouldPersistTaps="always">
  <String>Scrollable content</String>
</WrapperScrollView>
```

### 3. **WrapperSafeAreaView** - Safe Area Container

A container that automatically handles device safe areas (notch, home indicator, etc.).

```tsx
<WrapperSafeAreaView edges={['top', 'bottom']}>
  <String>Safe area content</String>
</WrapperSafeAreaView>
```

**Dependency**: `react-native-safe-area-context`

### 4. **WrapperKeyboardAvoidingView** - Keyboard Avoidance

A container that adjusts its position to avoid the keyboard.

```tsx
<WrapperKeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
  <Input placeholder="Type here" />
</WrapperKeyboardAvoidingView>
```

**Dependency**: `react-native-keyboard-controller`

### 5. **WrapperKeyboardAwareScrollView** - Smart Scroll with Keyboard

A ScrollView that intelligently handles scrolling when the keyboard appears.

```tsx
<WrapperKeyboardAwareScrollView bottomOffset={20} keyboardShouldPersistTaps="handled">
  <Input placeholder="Type here" />
</WrapperKeyboardAwareScrollView>
```

**Dependency**: `react-native-keyboard-controller`

### 6. **WrapperKeyboardAvoidingStickyView** - Sticky Keyboard Avoidance

A container that provides sticky behavior when avoiding the keyboard.

```tsx
<WrapperKeyboardAvoidingStickyView offset={{ close: 0, open: 20 }}>
  <Input placeholder="Type here" />
</WrapperKeyboardAvoidingStickyView>
```

**Dependency**: `react-native-keyboard-controller`

## Configuration

### For Tailwind and Hybrid Versions

When using the Tailwind or Hybrid versions, you must define your application's color palette in your `tailwind.config.js` file.

### Colors

The `className` prop is only available for **Tailwind** and **Hybrid** versions when NativeWind is installed.

### For All Versions

All versions support custom colors through the `style` prop:

```tsx
<Wrapper style={{ backgroundColor: '#F3F4F6', padding: 16 }}>
  <String>Content</String>
</Wrapper>
```

## Props

### WrapperProps

| Prop          | Type                                                               | Default | Description                                              |
| ------------- | ------------------------------------------------------------------ | ------- | -------------------------------------------------------- |
| `children`    | `ReactNode`                                                        | -       | Child components to render.                              |
| `className`   | `string`                                                           | -       | Custom CSS classes (used with NativeWind).               |
| `style`       | `StyleProp<ViewStyle>`                                             | -       | Additional inline styles.                                |
| `fill`        | `boolean`                                                          | `false` | Whether to fill the available space.                     |
| `grow`        | `boolean`                                                          | `false` | Whether to grow to fill parent.                          |
| `px`          | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | -       | Horizontal padding variant.                              |
| `hasSafeArea` | `boolean`                                                          | `false` | Whether to wrap content in SafeAreaView.                 |
| `edges`       | `Array<'top' \| 'right' \| 'bottom' \| 'left'>`                    | -       | Safe area edges to apply when hasSafeArea is true.       |
| `...rest`     | `ViewProps`                                                        | -       | Any other props accepted by the native `View` component. |

### WrapperScrollViewProps

| Prop                        | Type                                                               | Default    | Description                                                    |
| --------------------------- | ------------------------------------------------------------------ | ---------- | -------------------------------------------------------------- |
| `children`                  | `ReactNode`                                                        | -          | Child components to render.                                    |
| `className`                 | `string`                                                           | -          | Custom CSS classes for the ScrollView.                         |
| `contentContainerClassName` | `string`                                                           | -          | Custom CSS classes for the content container.                  |
| `style`                     | `StyleProp<ScrollViewStyle>`                                       | -          | Additional inline styles.                                      |
| `fill`                      | `boolean`                                                          | `false`    | Whether to fill the available space.                           |
| `grow`                      | `boolean`                                                          | `false`    | Whether to grow to fill parent.                                |
| `px`                        | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | -          | Horizontal padding variant.                                    |
| `hasSafeArea`               | `boolean`                                                          | `false`    | Whether to wrap content in SafeAreaView.                       |
| `edges`                     | `Array<'top' \| 'right' \| 'bottom' \| 'left'>`                    | -          | Safe area edges to apply when hasSafeArea is true.             |
| `nestedScrollEnabled`       | `boolean`                                                          | `false`    | Whether nested scrolling is enabled.                           |
| `keyboardShouldPersistTaps` | `'always' \| 'never' \| 'handled'`                                 | `'always'` | How the keyboard should behave with taps.                      |
| `...rest`                   | `ScrollViewProps`                                                  | -          | Any other props accepted by the native `ScrollView` component. |

### WrapperSafeAreaViewProps

| Prop                     | Type                                                               | Default | Description                                              |
| ------------------------ | ------------------------------------------------------------------ | ------- | -------------------------------------------------------- |
| `children`               | `ReactNode`                                                        | -       | Child components to render.                              |
| `className`              | `string`                                                           | -       | Custom CSS classes (used with NativeWind).               |
| `style`                  | `StyleProp<ViewStyle>`                                             | -       | Additional inline styles.                                |
| `fill`                   | `boolean`                                                          | `false` | Whether to fill the available space.                     |
| `grow`                   | `boolean`                                                          | `false` | Whether to grow to fill parent.                          |
| `px`                     | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | -       | Horizontal padding variant.                              |
| `edges`                  | `Array<'top' \| 'right' \| 'bottom' \| 'left'>`                    | -       | Safe area edges to apply.                                |
| `emulateUnlessSupported` | `boolean`                                                          | -       | Whether to emulate safe area unless supported.           |
| `...rest`                | `ViewProps`                                                        | -       | Any other props accepted by the native `View` component. |

### WrapperKeyboardAvoidingViewProps

| Prop                     | Type                                                               | Default     | Description                                              |
| ------------------------ | ------------------------------------------------------------------ | ----------- | -------------------------------------------------------- |
| `children`               | `ReactNode`                                                        | -           | Child components to render.                              |
| `className`              | `string`                                                           | -           | Custom CSS classes (used with NativeWind).               |
| `style`                  | `StyleProp<ViewStyle>`                                             | -           | Additional inline styles.                                |
| `fill`                   | `boolean`                                                          | `false`     | Whether to fill the available space.                     |
| `grow`                   | `boolean`                                                          | `false`     | Whether to grow to fill parent.                          |
| `px`                     | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | -           | Horizontal padding variant.                              |
| `hasSafeArea`            | `boolean`                                                          | `false`     | Whether to wrap content in SafeAreaView.                 |
| `edges`                  | `Array<'top' \| 'right' \| 'bottom' \| 'left'>`                    | -           | Safe area edges to apply when hasSafeArea is true.       |
| `behavior`               | `'height' \| 'position' \| 'padding'`                              | `'padding'` | Type of keyboard avoidance behavior.                     |
| `keyboardVerticalOffset` | `number`                                                           | `10`        | Keyboard vertical offset.                                |
| `enabled`                | `boolean`                                                          | `true`      | Whether the keyboard avoiding view is enabled.           |
| `contentContainerStyle`  | `StyleProp<ViewStyle>`                                             | -           | Content container style when behavior is position.       |
| `...rest`                | `ViewProps`                                                        | -           | Any other props accepted by the native `View` component. |

### WrapperKeyboardAwareScrollViewProps

| Prop                          | Type                                                               | Default    | Description                                                    |
| ----------------------------- | ------------------------------------------------------------------ | ---------- | -------------------------------------------------------------- |
| `children`                    | `ReactNode`                                                        | -          | Child components to render.                                    |
| `className`                   | `string`                                                           | -          | Custom CSS classes (used with NativeWind).                     |
| `style`                       | `StyleProp<ScrollViewStyle>`                                       | -          | Additional inline styles.                                      |
| `fill`                        | `boolean`                                                          | `false`    | Whether to fill the available space.                           |
| `grow`                        | `boolean`                                                          | `false`    | Whether to grow to fill parent.                                |
| `px`                          | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | -          | Horizontal padding variant.                                    |
| `hasSafeArea`                 | `boolean`                                                          | `false`    | Whether to wrap content in SafeAreaView.                       |
| `edges`                       | `Array<'top' \| 'right' \| 'bottom' \| 'left'>`                    | -          | Safe area edges to apply when hasSafeArea is true.             |
| `bottomOffset`                | `number`                                                           | `20`       | Bottom offset for keyboard.                                    |
| `disableScrollOnKeyboardHide` | `boolean`                                                          | `false`    | Whether to disable scroll on keyboard hide.                    |
| `enabled`                     | `boolean`                                                          | `true`     | Whether the keyboard aware scroll view is enabled.             |
| `extraKeyboardSpace`          | `number`                                                           | -          | Extra keyboard space.                                          |
| `keyboardShouldPersistTaps`   | `'always' \| 'never' \| 'handled'`                                 | `'always'` | How the keyboard should behave with taps.                      |
| `...rest`                     | `ScrollViewProps`                                                  | -          | Any other props accepted by the native `ScrollView` component. |

### WrapperKeyboardAvoidingStickyViewProps

| Prop          | Type                                                               | Default | Description                                              |
| ------------- | ------------------------------------------------------------------ | ------- | -------------------------------------------------------- |
| `children`    | `ReactNode`                                                        | -       | Child components to render.                              |
| `className`   | `string`                                                           | -       | Custom CSS classes (used with NativeWind).               |
| `style`       | `StyleProp<ViewStyle>`                                             | -       | Additional inline styles.                                |
| `fill`        | `boolean`                                                          | `false` | Whether to fill the available space.                     |
| `grow`        | `boolean`                                                          | `false` | Whether to grow to fill parent.                          |
| `px`          | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | -       | Horizontal padding variant.                              |
| `hasSafeArea` | `boolean`                                                          | `false` | Whether to wrap content in SafeAreaView.                 |
| `edges`       | `Array<'top' \| 'right' \| 'bottom' \| 'left'>`                    | -       | Safe area edges to apply when hasSafeArea is true.       |
| `enabled`     | `boolean`                                                          | `true`  | Whether the keyboard avoiding sticky view is enabled.    |
| `offset`      | `{ close: number; open: number }`                                  | -       | Offset for the keyboard avoiding sticky view.            |
| `...rest`     | `ViewProps`                                                        | -       | Any other props accepted by the native `View` component. |

## Usage Examples

### Basic Layout

```tsx
<Wrapper className="bg-gray-100 p-4" fill>
  <String>Full height content</String>
</Wrapper>
```

### Scrollable Content

```tsx
<WrapperScrollView contentContainerClassName="p-4" className="bg-white">
  <String>Long scrollable content</String>
</WrapperScrollView>
```

### Safe Area with Keyboard Handling

```tsx
<WrapperSafeAreaView edges={['top', 'bottom']}>
  <WrapperKeyboardAwareScrollView bottomOffset={20}>
    <Input placeholder="First input" />
    <Input placeholder="Second input" />
  </WrapperKeyboardAwareScrollView>
</WrapperSafeAreaView>
```

### Complex Layout Composition

```tsx
<WrapperSafeAreaView edges={['top']}>
  <WrapperKeyboardAwareScrollView bottomOffset={20} keyboardShouldPersistTaps="handled">
    <Wrapper className="p-4">
      <String className="mb-4 text-xl font-bold">Form Title</String>
      <Input placeholder="Name" />
      <Input placeholder="Email" />
      <Input placeholder="Message" multiline />
    </Wrapper>
  </WrapperKeyboardAwareScrollView>
</WrapperSafeAreaView>
```

### Custom Styling with Tailwind

```tsx
<Wrapper className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-6 shadow-lg">
  <String className="text-xl font-bold text-white">Gradient Background</String>
</Wrapper>
```

### Keyboard Avoidance with Custom Behavior

```tsx
<WrapperKeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} className="bg-white">
  <Input placeholder="Type here" />
</WrapperKeyboardAvoidingView>
```

### Sticky Keyboard Behavior

```tsx
<WrapperKeyboardAvoidingStickyView offset={{ close: 0, open: 20 }} className="bg-gray-50">
  <Input placeholder="Sticky input" />
</WrapperKeyboardAvoidingStickyView>
```

## Optional Dependencies

Some components require optional dependencies for enhanced functionality:

### react-native-safe-area-context

Required for `WrapperSafeAreaView`:

```bash
npm install react-native-safe-area-context
```

### react-native-keyboard-controller

Required for keyboard-related components:

```bash
npm install react-native-keyboard-controller
```

If these dependencies are not installed, the components will display warnings and fall back to appropriate alternatives.

## Performance Notes

- Components use efficient layout calculations and minimal re-renders
- Keyboard handling is optimized for smooth animations
- Safe area calculations are cached for better performance
- Scroll performance is optimized with proper content sizing
- Memory usage is minimized with proper cleanup

## TypeScript Support

All components are fully typed with TypeScript interfaces:

```tsx
import {
  WrapperPropsTw,
  WrapperScrollViewPropsTw,
  WrapperSafeAreaViewPropsTw,
  WrapperKeyboardAvoidingViewPropsTw,
  WrapperKeyboardAwareScrollViewPropsTw,
  WrapperKeyboardAvoidingStickyViewPropsTw,
} from '@types';
```

## Accessibility

The components support React Native accessibility features:

- Proper accessibility roles and labels
- Keyboard navigation support
- Screen reader compatibility
- Touch target optimization
- Focus management for keyboard users

## Common Patterns

### Form Layout

```tsx
<WrapperSafeAreaView edges={['top']}>
  <WrapperKeyboardAwareScrollView>
    <Wrapper className="p-4">
      <String className="mb-6 text-2xl font-bold">Create Account</String>
      <Input placeholder="Full Name" />
      <Input placeholder="Email" keyboardType="email-address" />
      <Input placeholder="Password" secureTextEntry />
      <Button className="mt-4">Sign Up</Button>
    </Wrapper>
  </WrapperKeyboardAwareScrollView>
</WrapperSafeAreaView>
```

### Modal Content

```tsx
<WrapperSafeAreaView edges={['bottom']}>
  <WrapperKeyboardAvoidingView behavior="padding">
    <Wrapper className="p-4">
      <String className="mb-4 text-lg font-semibold">Settings</String>
      <Input placeholder="Search settings" />
      {/* Settings content */}
    </Wrapper>
  </WrapperKeyboardAvoidingView>
</WrapperSafeAreaView>
```

### Tab Content

```tsx
<WrapperScrollView contentContainerClassName="p-4" showsVerticalScrollIndicator={false}>
  <Wrapper className="space-y-4">
    <String className="text-xl font-bold">Tab Content</String>
    {/* Tab content */}
  </Wrapper>
</WrapperScrollView>
```

## Troubleshooting

### Safe area not working

- Ensure `react-native-safe-area-context` is installed
- Check that your app is wrapped with `SafeAreaProvider`
- Verify the `edges` prop is correctly configured

### Keyboard handling issues

- Install `react-native-keyboard-controller` for advanced keyboard handling
- Ensure your app is wrapped with `KeyboardProvider`
- Check that `behavior` and `keyboardVerticalOffset` are appropriate for your layout

### Scroll performance issues

- Use `contentContainerStyle` for content styling instead of `style`
- Ensure proper content sizing with `flexGrow: 1` when needed
- Consider using `nestedScrollEnabled={false}` for better performance

### Styling not applied

- Verify NativeWind is properly configured for Tailwind versions
- Check that className props are being passed correctly
- Ensure style props are not conflicting with className props

## License

MIT
