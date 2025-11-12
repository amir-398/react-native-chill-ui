# Avatar Component

A flexible and performant avatar component for React Native that displays user profile images with fallback to initials across three different styling approaches.

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

### 3. **Hybrid Version** (Available soon)

- Automatically detects if NativeWind is available
- Falls back to StyleSheet if NativeWind is not installed
- Best for component libraries or projects that need flexibility
- Install: `npm install react-native-chill-ui@hybrid`

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Avatar } from 'react-native-chill-ui'`

## Features

- **Multiple Sizes**: 8 different size variants from 2xs to 3xl
- **Shape Variants**: Circle and square shapes
- **Image Support**: Displays user profile images with fallback to initials
- **Touchable Interactions**: Supports Pressable, TouchableOpacity, and TouchableHighlight
- **Customizable Styling**: Background colors and custom CSS classes
- **TypeScript Support**: Fully typed for a better development experience

## Quick Start

```tsx
import { Avatar } from 'react-native-chill-ui';

// Basic avatar with initials
<Avatar
  data={{
    firstname: 'John',
    lastname: 'Doe'
  }}
/>

// Avatar with image
<Avatar
  data={{
    firstname: 'John',
    lastname: 'Doe',
    image_url: 'https://example.com/avatar.jpg'
  }}
  size="lg"
  variant="circle"
/>

// Touchable avatar
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  onPress={() => console.log('Avatar pressed')}
  as="touchable-opacity"
/>
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

### Colors

The `colorVariant` prop is only available for **Tailwind** and **Hybrid** versions when NativeWind is installed:

`primary`, `secondary`, `tertiary`, `success`, `warning`, `error`, `danger`, `info`, `dark`, `light`, `white`, `disabled`, `inverted`, `muted`, `neutral`

These must be defined in your `tailwind.config.js` file.

### For All Versions

All versions support the `color` prop to set custom colors directly:

```tsx
<Avatar color="#FF0000" data={{ firstname: 'John', lastname: 'Doe' }} />
<Avatar color="rgb(255, 0, 0)" data={{ firstname: 'John', lastname: 'Doe' }} />
```

## Size Variants

The Avatar component supports the following size options:

- `2xs`: 20px
- `xs`: 24px
- `sm`: 32px
- `md`: 40px (default)
- `lg`: 48px
- `xl`: 56px
- `2xl`: 64px
- `3xl`: 80px

## Shape Variants

- `circle`: Circular avatar (default)
- `square`: Square avatar with rounded corners

## Examples

### Basic Usage

```tsx
import Avatar from '@/components/avatar/Avatar';

const BasicAvatar = () => {
  return (
    <Avatar
      data={{
        firstname: 'John',
        lastname: 'Doe',
      }}
    />
  );
};

const ImageAvatar = () => {
  return (
    <Avatar
      data={{
        firstname: 'John',
        lastname: 'Doe',
        image_url: 'https://example.com/avatar.jpg',
      }}
      size="lg"
      variant="circle"
    />
  );
};
```

### Size Variants

```tsx
const SizeVariants = () => {
  return (
    <Box className="flex-row items-center space-x-4">
      <Avatar data={{ firstname: 'J', lastname: 'D' }} size="2xs" />
      <Avatar data={{ firstname: 'J', lastname: 'D' }} size="xs" />
      <Avatar data={{ firstname: 'J', lastname: 'D' }} size="sm" />
      <Avatar data={{ firstname: 'J', lastname: 'D' }} size="md" />
      <Avatar data={{ firstname: 'J', lastname: 'D' }} size="lg" />
      <Avatar data={{ firstname: 'J', lastname: 'D' }} size="xl" />
      <Avatar data={{ firstname: 'J', lastname: 'D' }} size="2xl" />
      <Avatar data={{ firstname: 'J', lastname: 'D' }} size="3xl" />
    </Box>
  );
};
```

### Shape Variants

```tsx
const ShapeVariants = () => {
  return (
    <Box className="flex-row items-center space-x-4">
      <Avatar data={{ firstname: 'John', lastname: 'Doe' }} variant="circle" size="lg" />
      <Avatar data={{ firstname: 'John', lastname: 'Doe' }} variant="square" size="lg" />
    </Box>
  );
};
```

### Touchable Interactions

```tsx
const TouchableAvatars = () => {
  const handlePress = () => {
    console.log('Avatar pressed!');
  };

  return (
    <Box className="flex-row items-center space-x-4">
      {/* Default Pressable */}
      <Avatar data={{ firstname: 'John', lastname: 'Doe' }} onPress={handlePress} />

      {/* TouchableOpacity */}
      <Avatar data={{ firstname: 'John', lastname: 'Doe' }} onPress={handlePress} as="touchable-opacity" />

      {/* RipplePressable */}
      <Avatar data={{ firstname: 'John', lastname: 'Doe' }} onPress={handlePress} as="ripple-pressable" />
    </Box>
  );
};
```

### Custom Styling

```tsx
const CustomStyledAvatars = () => {
  return (
    <Box className="flex-row items-center space-x-4">
      {/* Custom background color */}
      <Avatar data={{ firstname: 'John', lastname: 'Doe' }} color="#FF6B6B" size="lg" />

      {/* Custom CSS classes (with NativeWind) */}
      <Avatar data={{ firstname: 'John', lastname: 'Doe' }} className="border-4 border-blue-500 shadow-lg" size="lg" />

      {/* Custom string props */}
      <Avatar
        data={{ firstname: 'John', lastname: 'Doe' }}
        stringProps={{
          color: '#FFFFFF',
          weight: 'bold',
        }}
        size="lg"
      />
    </Box>
  );
};
```

## API Reference

### AvatarProps

| Prop          | Type                                                              | Default       | Description                                        |
| ------------- | ----------------------------------------------------------------- | ------------- | -------------------------------------------------- |
| `data`        | `{ firstname?: string; lastname?: string; image_url?: string }`   | **Required**  | User data for avatar display                       |
| `size`        | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | `'md'`        | Avatar size variant                                |
| `variant`     | `'circle' \| 'square'`                                            | `'circle'`    | Avatar shape variant                               |
| `color`       | `string`                                                          | `undefined`   | Custom background color                            |
| `className`   | `string`                                                          | `undefined`   | Custom CSS classes (only used with NativeWind)     |
| `onPress`     | `() => void`                                                      | `undefined`   | Callback when avatar is pressed                    |
| `as`          | `'pressable' \| 'touchable-opacity' \| 'ripple-pressable'`        | `'pressable'` | Component to use when pressable                    |
| `stringProps` | `StringProps`                                                     | `undefined`   | Props for the String component displaying initials |
| `style`       | `StyleProp<ViewStyle>`                                            | `undefined`   | Custom inline styles                               |

### Size Variants

| Size  | Dimensions | Use Case                       |
| ----- | ---------- | ------------------------------ |
| `2xs` | 24x24px    | Very small icons, badges       |
| `xs`  | 36x36px    | Small avatars, compact layouts |
| `sm`  | 48x48px    | Small avatars, user lists      |
| `md`  | 56x56px    | Default size, most common use  |
| `lg`  | 64x64px    | Large avatars, profile headers |
| `xl`  | 80x80px    | Extra large, prominent display |
| `2xl` | 112x112px  | Very large, hero sections      |
| `3xl` | 128x128px  | Maximum size, special cases    |

### Shape Variants

| Variant  | Description                                   | Use Case                     |
| -------- | --------------------------------------------- | ---------------------------- |
| `circle` | Fully rounded (border-radius: 9999px)         | Most common, modern look     |
| `square` | Slightly rounded corners (border-radius: 8px) | Alternative, structured look |

## Props

| Prop          | Type                                                              | Default       | Description                                         |
| ------------- | ----------------------------------------------------------------- | ------------- | --------------------------------------------------- |
| `data`        | `{ firstname?: string; lastname?: string; image_url?: string }`   | **Required**  | User data containing name and optional image URL.   |
| `size`        | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | `'md'`        | Size variant for the avatar.                        |
| `variant`     | `'circle' \| 'square'`                                            | `'circle'`    | Shape variant for the avatar.                       |
| `color`       | `string`                                                          | -             | Custom background color (e.g., hex, rgb).           |
| `className`   | `string`                                                          | -             | Custom CSS classes (used with NativeWind).          |
| `as`          | `'pressable' \| 'touchable-opacity' \| 'ripple-pressable'`        | `'pressable'` | Touchable component type.                           |
| `onPress`     | `() => void`                                                      | -             | Callback when avatar is pressed.                    |
| `stringProps` | `StringProps`                                                     | -             | Props for the String component displaying initials. |
| `style`       | `StyleProp<ViewStyle>`                                            | -             | Additional inline styles.                           |
