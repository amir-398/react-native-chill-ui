# ButtonIcon Component

A versatile and performant icon button component for React Native that provides multiple touchable types, loading states, and customizable styling across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { ButtonIcon } from 'react-native-chill-ui'`

## Features

- **Multiple Touchable Types**: Support for TouchableOpacity, Pressable, RipplePressable, and ScalePressable
- **Loading States**: Built-in loading indicator with customizable props
- **Icon Support**: Flexible icon display with customizable size and color
- **Multiple Variants**: Contained and outlined button styles
- **Color Variants**: 15+ predefined color schemes (NativeWind only)
- **Shape Options**: Circle and square button shapes
- **Multiple Sizes**: Support for various icon sizes from 2xs to 3xl
- **TypeScript Support**: Fully typed for a better development experience
- **Performance Optimized**: Efficient rendering with proper prop handling
- **Accessible**: Proper focus management and screen reader support

## Quick Start

```tsx
import { ButtonIcon } from 'react-native-chill-ui';

// Basic icon button
<ButtonIcon iconName="bell-solid" onPress={handlePress} />

// With different touchable types
<ButtonIcon iconName="home-solid" as="ripple-pressable" onPress={handlePress} />
<ButtonIcon iconName="settings-solid" as="scale-pressable" onPress={handlePress} />

// With loading state
<ButtonIcon iconName="refresh-solid" isLoading onPress={handlePress} />

// With different variants (NativeWind only)
<ButtonIcon iconName="heart-solid" variant="outlined" colorVariant="error" onPress={handlePress} />
<ButtonIcon iconName="star-solid" rounded="circle" colorVariant="success" onPress={handlePress} />
```

## Props

| Prop                    | Type                        | Required | Default               | Description                            |
| ----------------------- | --------------------------- | -------- | --------------------- | -------------------------------------- |
| `iconName`              | `keyof TIcons`              | ✅       | -                     | Name of the icon to display            |
| `onPress`               | `() => void`                | ❌       | -                     | Press callback function                |
| `as`                    | `TouchableComponentType`    | ❌       | `'touchable-opacity'` | Type of touchable component to use     |
| `size`                  | `IconProps['size']`         | ❌       | `'md'`                | Icon size variant                      |
| `iconColor`             | `string`                    | ❌       | -                     | Color of the icon                      |
| `isDisabled`            | `boolean`                   | ❌       | `false`               | Whether button is disabled             |
| `isLoading`             | `boolean`                   | ❌       | `false`               | Whether button is in loading state     |
| `className`             | `string`                    | ❌       | -                     | (only NativeWind) Custom CSS classes   |
| `colorVariant`          | `ColorVariant`              | ❌       | `'primary'`           | (only NativeWind) Button color variant |
| `rounded`               | `'circle' \| 'square'`      | ❌       | `'square'`            | Button shape                           |
| `variant`               | `'contained' \| 'outlined'` | ❌       | `'contained'`         | Button style variant                   |
| `style`                 | `ViewStyle`                 | ❌       | -                     | Style object for the button container  |
| `loadingIndicatorProps` | `LoadingIndicatorProps`     | ❌       | -                     | Props for loading indicator            |

### TouchableComponentType

```tsx
type TouchableComponentType = 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable';
```

### ColorVariant (NativeWind only)

```tsx
type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'accent'
  | 'dark'
  | 'light'
  | 'danger'
  | 'neutral'
  | 'muted'
  | 'inverted'
  | 'white';
```

## Color Variants Setup (NativeWind)

To use the color variants with the Tailwind version, you need to configure your `tailwind.config.js`:

```javascript
// tailwind.config.js
module.exports = {
  // ... other config
  theme: {
    extend: {
      colors: {
        button: {
          // Primary colors
          primary: {
            background: '#7DD3FC',
            content: '#000',
          },
          secondary: {
            background: '#CBD2D9',
            content: '#FCD34D',
          },
          tertiary: {
            background: '#E5E7EB',
            content: '#374151',
          },

          // Semantic colors
          success: {
            background: '#10B981',
            content: '#FFF',
          },
          error: {
            background: '#EF4444',
            content: '#FFF',
          },
          warning: {
            background: '#F59E0B',
            content: '#000',
          },
          info: {
            background: '#3B82F6',
            content: '#FFF',
          },

          // Additional variants
          accent: {
            background: '#8B5CF6',
            content: '#FFF',
          },
          danger: {
            background: '#DC2626',
            content: '#FFF',
          },
          dark: {
            background: '#1F2937',
            content: '#FFF',
          },
          light: {
            background: '#F9FAFB',
            content: '#111827',
          },
          neutral: {
            background: '#6B7280',
            content: '#FFF',
          },
          muted: {
            background: '#9CA3AF',
            content: '#374151',
          },
          inverted: {
            background: '#000',
            content: '#FFF',
          },
          white: {
            background: '#FFF',
            content: '#000',
          },

          // Disabled state
          disabled: {
            background: '#E5E7EB',
            content: '#9CA3AF',
          },
        },
      },
    },
  },
};
```

## Examples

### Basic ButtonIcon

```tsx
<Box className="gap-4">
  <ButtonIcon iconName="bell-solid" onPress={handlePress} />
  <ButtonIcon iconName="home-solid" onPress={handlePress} />
  <ButtonIcon iconName="settings-solid" onPress={handlePress} />
</Box>
```

### Different Touchable Types

```tsx
<Box className="gap-4">
  <ButtonIcon as="TouchableOpacity" iconName="bell-solid" onPress={handlePress} />
  <ButtonIcon as="Pressable" iconName="home-solid" onPress={handlePress} />
  <ButtonIcon as="RipplePressable" iconName="settings-solid" onPress={handlePress} />
</Box>
```

### Loading States

```tsx
<Box className="gap-4">
  <ButtonIcon isLoading iconName="spinner" onPress={handlePress} />
  <ButtonIcon isLoading loadingIndicatorProps={{ color: 'white' }} iconName="spinner" onPress={handlePress} />
</Box>
```

### Different Sizes

```tsx
<Box className="gap-4">
  <ButtonIcon size="2xs" iconName="bell-solid" onPress={handlePress} />
  <ButtonIcon size="xs" iconName="bell-solid" onPress={handlePress} />
  <ButtonIcon size="sm" iconName="bell-solid" onPress={handlePress} />
  <ButtonIcon size="md" iconName="bell-solid" onPress={handlePress} />
  <ButtonIcon size="lg" iconName="bell-solid" onPress={handlePress} />
  <ButtonIcon size="xl" iconName="bell-solid" onPress={handlePress} />
  <ButtonIcon size="2xl" iconName="bell-solid" onPress={handlePress} />
  <ButtonIcon size="3xl" iconName="bell-solid" onPress={handlePress} />
</Box>
```

### Icon Colors

```tsx
<Box className="gap-4">
  <ButtonIcon iconName="bell-solid" iconColor="red" onPress={handlePress} />
  <ButtonIcon iconName="home-solid" iconColor="blue" onPress={handlePress} />
  <ButtonIcon iconName="settings-solid" iconColor="green" onPress={handlePress} />
</Box>
```

### Disabled States

```tsx
<Box className="gap-4">
  <ButtonIcon isDisabled iconName="bell-solid" onPress={handlePress} />
  <ButtonIcon isDisabled isLoading iconName="spinner" onPress={handlePress} />
</Box>
```

## Touchable Component Types

### TouchableOpacity

```tsx
<ButtonIcon as="TouchableOpacity" iconName="bell-solid" onPress={handlePress} />
```

- **Effect**: Opacity change on press
- **Cross-platform**: Works on both iOS and Android
- **Performance**: Good performance with simple opacity animation

### Pressable (Default)

```tsx
<ButtonIcon as="Pressable" iconName="bell-solid" onPress={handlePress} />
```

- **Effect**: Native Android ripple effect, iOS highlight
- **Cross-platform**: Platform-specific effects
- **Performance**: Excellent performance with native animations

### RipplePressable

```tsx
<ButtonIcon as="RipplePressable" iconName="bell-solid" onPress={handlePress} />
```

- **Effect**: Custom ripple animation
- **Cross-platform**: Consistent ripple effect across platforms
- **Performance**: Good performance with custom animation

## Best Practices

### 1. Choose the Right Touchable Type

```tsx
// ✅ Good: Use TouchableOpacity for simple interactions
<ButtonIcon as="TouchableOpacity" iconName="bell-solid" onPress={handlePress} />

// ✅ Good: Use Pressable for native feel (default)
<ButtonIcon as="Pressable" iconName="home-solid" onPress={handlePress} />

// ✅ Good: Use RipplePressable for custom effects
<ButtonIcon as="RipplePressable" iconName="settings-solid" onPress={handlePress} />
```

### 2. Handle Loading States Properly

```tsx
// ✅ Good: Disable button during loading
<ButtonIcon
  isLoading={isLoading}
  isDisabled={isLoading}
  iconName={isLoading ? 'spinner' : 'bell-solid'}
  onPress={handlePress}
/>
```

### 3. Use Appropriate Icon Sizes

```tsx
// ✅ Good: Use appropriate sizes for context
<ButtonIcon size="sm" iconName="bell-solid" onPress={handlePress} /> // Small context
<ButtonIcon size="md" iconName="home-solid" onPress={handlePress} /> // Standard
<ButtonIcon size="lg" iconName="settings-solid" onPress={handlePress} /> // Large context
```

### 4. Customize Icon Colors

```tsx
// ✅ Good: Use iconColor for consistent theming
<ButtonIcon iconName="bell-solid" iconColor="#007AFF" onPress={handlePress} />
<ButtonIcon iconName="home-solid" iconColor="#34C759" onPress={handlePress} />
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface ButtonIconProps {
  className?: string;
  iconColor?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  iconName: keyof TIcons;
  size?: IconProps['size'];
  loadingIndicatorProps?: LoadingIndicatorProps;
  /** Type of touchable component to use */
  as?: TouchableComponentType;
}
```

## Performance Considerations

- **Memoization**: The component efficiently handles prop changes
- **Conditional Rendering**: Loading states and icons are conditionally rendered
- **Touchable Optimization**: Each touchable type is optimized for its specific use case

## Dependencies

- **React Native**: Core touchable components
- **Icon**: Icon display component
- **LoadingIndicator**: Loading spinner component
- **RipplePressable**: Custom ripple effect component

## Accessibility

The component supports standard accessibility features:

- **Focus Management**: Proper focus handling for keyboard navigation
- **Screen Reader**: Compatible with screen readers
- **Touch Targets**: Adequate touch target sizes for mobile accessibility
