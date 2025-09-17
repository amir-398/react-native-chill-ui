# ButtonIcon Component

A versatile and customizable ButtonIcon component for React Native applications with support for multiple touchable types, loading states, and various styling options.

## Features

- **Multiple Touchable Types**: Support for TouchableOpacity, Pressable, and RipplePressable
- **Loading States**: Built-in loading indicator with customizable props
- **Icon Support**: Flexible icon display with customizable size and color
- **Multiple Sizes**: Support for various icon sizes from 2xs to 3xl
- **TypeScript**: Complete type safety with proper interfaces
- **Performance Optimized**: Efficient rendering with proper prop handling
- **Accessible**: Proper focus management and screen reader support

## Basic Usage

```tsx
import { ButtonIcon } from 'chill-ui';

function Example() {
  return (
    <Box className="gap-4 p-4">
      <ButtonIcon iconName="bell-solid" onPress={() => console.log('Pressed!')} />

      <ButtonIcon as="RipplePressable" iconName="home-solid" onPress={() => console.log('Pressed!')} />

      <ButtonIcon isLoading iconName="spinner" onPress={() => console.log('Pressed!')} />
    </Box>
  );
}
```

## Props

| Prop                    | Type                     | Required | Default       | Description                        |
| ----------------------- | ------------------------ | -------- | ------------- | ---------------------------------- |
| `iconName`              | `keyof TIcons`           | ✅       | -             | Name of the icon to display        |
| `onPress`               | `() => void`             | ❌       | -             | Press callback function            |
| `as`                    | `TouchableComponentType` | ❌       | `'Pressable'` | Type of touchable component to use |
| `size`                  | `IconProps['size']`      | ❌       | `'md'`        | Icon size variant                  |
| `iconColor`             | `string`                 | ❌       | -             | Color of the icon                  |
| `isDisabled`            | `boolean`                | ❌       | `false`       | Whether button is disabled         |
| `isLoading`             | `boolean`                | ❌       | `false`       | Whether button is in loading state |
| `className`             | `string`                 | ❌       | -             | Custom CSS classes                 |
| `loadingIndicatorProps` | `LoadingIndicatorProps`  | ❌       | -             | Props for loading indicator        |

### TouchableComponentType

```tsx
type TouchableComponentType = 'TouchableOpacity' | 'Pressable' | 'RipplePressable';
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
