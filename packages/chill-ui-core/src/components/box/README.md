# Box Component

A flexible and performant container component for React Native that provides consistent layout options across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Box } from 'react-native-chill-ui'`

## Features

- **Layout Variants**: Row, Column, Center, Grow, and more
- **Optimized Performance**: Uses React Native's ViewNativeComponent
- **Flexible Styling**: Support for className and style props
- **TypeScript Support**: Fully typed for a better development experience

## Quick Start

```tsx
import { Box } from 'react-native-chill-ui';

// Basic box
<Box>
  <String>Content</String>
</Box>

// Box with custom styling
<Box className="p-4 bg-gray-100 rounded-lg">
  <String>Styled Content</String>
</Box>

// Layout with NativeWind classes
<Box className="flex-row space-x-2">
  <String>Item 1</String>
  <String>Item 2</String>
</Box>
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

The Box component supports styling through:

- **NativeWind classes** (Tailwind/Hybrid versions): Use `className` prop
- **StyleSheet styles** (all versions): Use `style` prop with standard React Native properties

## Layout Options

The Box component is a flexible container that accepts all standard React Native View props. You can control layout using:

- **Flexbox properties**: `flexDirection`, `justifyContent`, `alignItems`, `flex`, etc.
- **NativeWind classes**: `flex-row`, `flex-col`, `items-center`, `justify-center`, etc.
- **StyleSheet styles**: Standard React Native styling properties

## Examples

### Basic Usage

```tsx
// Simple container
<Box>
  <String>Basic container</String>
</Box>

// Horizontal layout
<Box style={{ flexDirection: 'row' }}>
  <String>Item 1</String>
  <String>Item 2</String>
</Box>

// Centered content
<Box style={{ justifyContent: 'center', alignItems: 'center' }}>
  <String>Centered content</String>
</Box>
```

### With Custom Styling

```tsx
// Using className (NativeWind)
<Box className="p-4 bg-gray-100 rounded-lg">
  <String>Styled with Tailwind</String>
</Box>

// Using style (all versions)
<Box style={{ padding: 16, backgroundColor: '#f3f4f6' }}>
  <String>Styled with StyleSheet</String>
</Box>
```

## Props

| Prop          | Type                   | Default | Description                                              |
| ------------- | ---------------------- | ------- | -------------------------------------------------------- |
| `children`    | `ReactNode`            | -       | Content to display inside the box.                       |
| `className`   | `string`               | -       | Custom CSS classes (used with NativeWind).               |
| `style`       | `StyleProp<ViewStyle>` | -       | Additional inline styles.                                |
| `useFastView` | `boolean`              | `true`  | Use optimized RCTView component for better performance.  |
| `...rest`     | `ViewProps`            | -       | Any other props accepted by the native `View` component. |

### useFastView Performance Option

The `useFastView` prop allows you to choose between two rendering approaches:

- **`useFastView={true}` (default)**: Uses `createElement('RCTView')` for maximum performance
  - **Benefits**: ~10-15% faster rendering, smaller bundle size, direct native component access
  - **Best for**: Performance-critical apps, large lists, complex layouts

- **`useFastView={false}`**: Uses React Native's standard `View` component
  - **Benefits**: Full React Native compatibility, better debugging tools, more predictable behavior
  - **Best for**: Debugging, compatibility issues, or when you need specific React Native View features

```tsx
// High performance (default)
<Box useFastView={true}>
  <String>Optimized for speed</String>
</Box>

// Standard React Native View
<Box useFastView={false}>
  <String>Standard compatibility</String>
</Box>
```
