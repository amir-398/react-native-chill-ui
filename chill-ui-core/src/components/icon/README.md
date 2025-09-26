# Icon Component

A flexible and performant icon component for React Native that displays SVG icons with customizable size, color, and press interactions across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Icon } from 'react-native-chill-ui'`

## Features

- **Multiple Sizes**: 8 different size variants from 2xs to 3xl
- **Interactive Icons**: Supports Pressable, TouchableOpacity, and RipplePressable interactions
- **Press Effects**: Customizable press effects with padding and background color
- **SVG Icons**: Displays SVG icons from a predefined icon set
- **Customizable Styling**: Colors, sizes, and custom CSS classes
- **TypeScript Support**: Fully typed for a better development experience

## Quick Start

```tsx
import { Icon } from 'react-native-chill-ui';

// Basic icon
<Icon name="heart-solid" />

// Customized with size and color
<Icon name="star-solid" size="lg" color="#FFD700" />

// Interactive icon with press effect
<Icon
  name="settings-solid"
  onPress={() => console.log('Settings pressed')}
  hasPressEffect={true}
/>

// Different pressable components
<Icon
  name="user-solid"
  onPress={handleUserPress}
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

### Styling

The Icon component supports styling through:

- **NativeWind classes** (Tailwind/Hybrid versions): Use `className` prop
- **StyleSheet styles** (all versions): Use `style` prop with standard React Native properties

## Size Variants

The Icon component supports the following size options:

- `2xs`: 12px
- `xs`: 16px
- `sm`: 20px
- `md`: 24px (default)
- `lg`: 28px
- `xl`: 32px
- `2xl`: 36px
- `3xl`: 40px

## Press Effect Sizes

When `hasPressEffect` is enabled, the following padding sizes are applied:

- `2xs`: 1px padding
- `xs`: 2px padding
- `sm`: 6px padding
- `md`: 8px padding
- `lg`: 12px padding
- `xl`: 16px padding
- `2xl`: 20px padding
- `3xl`: 24px padding

## Examples

### Basic Usage

```tsx
import { Icon } from 'react-native-chill-ui';

const BasicIcons = () => {
  return (
    <Box className="flex-row items-center space-x-4">
      <Icon name="heart-solid" />
      <Icon name="star-solid" size="lg" />
      <Icon name="settings-solid" size="xl" color="#3B82F6" />
    </Box>
  );
};
```

### Size Variants

```tsx
const SizeVariants = () => {
  return (
    <Box className="flex-row items-center space-x-4">
      <Icon name="heart-solid" size="2xs" />
      <Icon name="heart-solid" size="xs" />
      <Icon name="heart-solid" size="sm" />
      <Icon name="heart-solid" size="md" />
      <Icon name="heart-solid" size="lg" />
      <Icon name="heart-solid" size="xl" />
      <Icon name="heart-solid" size="2xl" />
      <Icon name="heart-solid" size="3xl" />
    </Box>
  );
};
```

### Interactive Icons

```tsx
const InteractiveIcons = () => {
  const handlePress = () => {
    console.log('Icon pressed!');
  };

  return (
    <Box className="flex-row items-center space-x-4">
      {/* Default Pressable with press effect */}
      <Icon name="heart-solid" onPress={handlePress} hasPressEffect={true} />

      {/* TouchableOpacity */}
      <Icon name="star-solid" onPress={handlePress} as="touchable-opacity" />

      {/* RipplePressable */}
      <Icon name="settings-solid" onPress={handlePress} as="ripple-pressable" />

      {/* Without press effect */}
      <Icon name="user-solid" onPress={handlePress} hasPressEffect={false} />
    </Box>
  );
};
```

### Custom Styling

```tsx
const CustomStyledIcons = () => {
  return (
    <Box className="flex-row items-center space-x-4">
      {/* Custom color */}
      <Icon name="heart-solid" color="#FF6B6B" size="lg" />

      {/* Custom CSS classes (with NativeWind) */}
      <Icon name="star-solid" className="rounded-full border-2 border-blue-500 p-2" size="lg" />

      {/* Custom press effect style */}
      <Icon
        name="settings-solid"
        onPress={() => {}}
        pressEffectStyle={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
        size="lg"
      />

      {/* Custom press effect size */}
      <Icon name="user-solid" onPress={() => {}} pressEffectSize="xl" size="md" />
    </Box>
  );
};
```

### Icon Set Usage

```tsx
const IconSetExamples = () => {
  return (
    <Box className="flex-row flex-wrap gap-4">
      {/* Navigation icons */}
      <Icon name="home-solid" size="lg" />
      <Icon name="search-solid" size="lg" />
      <Icon name="user-solid" size="lg" />
      <Icon name="settings-solid" size="lg" />

      {/* Action icons */}
      <Icon name="heart-solid" size="lg" color="#FF6B6B" />
      <Icon name="star-solid" size="lg" color="#FFD700" />
      <Icon name="bookmark-solid" size="lg" color="#10B981" />
      <Icon name="share-solid" size="lg" color="#3B82F6" />

      {/* Utility icons */}
      <Icon name="check-solid" size="lg" color="#10B981" />
      <Icon name="close-solid" size="lg" color="#EF4444" />
      <Icon name="plus-solid" size="lg" color="#3B82F6" />
      <Icon name="minus-solid" size="lg" color="#EF4444" />
    </Box>
  );
};
```

## API Reference

### IconProps

| Prop               | Type                                                              | Default       | Description                                             |
| ------------------ | ----------------------------------------------------------------- | ------------- | ------------------------------------------------------- |
| `name`             | `keyof TIcons`                                                    | **Required**  | Icon name from the available icon set                   |
| `size`             | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | `'md'`        | Icon size variant                                       |
| `color`            | `string`                                                          | `'#000'`      | Icon color (CSS color value)                            |
| `onPress`          | `() => void`                                                      | -             | Callback function when icon is pressed                  |
| `hasPressEffect`   | `boolean`                                                         | `true`        | Whether to show press effect when icon is pressed       |
| `pressEffectSize`  | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | -             | Size of the press effect padding                        |
| `pressEffectStyle` | `StyleProp<ViewStyle>`                                            | -             | Custom styles for the press effect                      |
| `as`               | `'pressable' \| 'touchable-opacity' \| 'ripple-pressable'`        | `'pressable'` | Component to use when pressable                         |
| `className`        | `string`                                                          | -             | Custom CSS classes (used with NativeWind)               |
| `style`            | `StyleProp<ViewStyle>`                                            | -             | Additional inline styles                                |
| `...rest`          | `ViewProps`                                                       | -             | Any other props accepted by the native `View` component |

### Size Variants

| Size  | Dimensions | Use Case                       |
| ----- | ---------- | ------------------------------ |
| `2xs` | 12x12px    | Very small icons, badges       |
| `xs`  | 16x16px    | Small icons, compact layouts   |
| `sm`  | 20x20px    | Small icons, user lists        |
| `md`  | 24x24px    | Default size, most common use  |
| `lg`  | 28x28px    | Large icons, prominent display |
| `xl`  | 32x32px    | Extra large, headers           |
| `2xl` | 36x36px    | Very large, hero sections      |
| `3xl` | 40x40px    | Maximum size, special cases    |

### Pressable Components

| Component           | Description                                      | Use Case                     |
| ------------------- | ------------------------------------------------ | ---------------------------- |
| `pressable`         | Default React Native Pressable with press effect | Most common, modern look     |
| `touchable-opacity` | TouchableOpacity with opacity change             | Alternative, structured look |
| `ripple-pressable`  | Custom ripple effect component                   | Material Design style        |
