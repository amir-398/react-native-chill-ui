# Button Component

A versatile and customizable Button component for React Native applications with support for multiple touchable types, loading states, and various styling options across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Button } from 'react-native-chill-ui'`

## Features

- **Multiple Touchable Types**: Support for TouchableOpacity, Pressable, RipplePressable, and ScalePressable
- **Loading States**: Built-in loading indicator with customizable props
- **Icon Support**: Flexible icon positioning with `leftIconAction` and `rightIconAction` props
- **Custom Icons**: Support for both system icons and custom icon components
- **Multiple Variants**: Contained, outlined, and text variants
- **Color Variants**: 15 color variants (only NativeWind)
- **Size Variants**: Multiple size options from 2xs to 2xl
- **Custom Content**: Support for both title text and custom children
- **TypeScript Support**: Fully typed for a better development experience
- **Performance Optimized**: Memoized components for better performance
- **Accessible**: Proper focus management and screen reader support

## Quick Start

```tsx
import { Button } from 'react-native-chill-ui';

// Basic usage
<Button title="Click me" onPress={handlePress} />

// With different touchable types
<Button as="ripple-pressable" title="Ripple effect" onPress={handlePress} />
<Button as="scale-pressable" title="Scale effect" onPress={handlePress} />
<Button as="pressable" title="Native pressable" onPress={handlePress} />

// With loading state
<Button isLoading title="Loading..." onPress={handlePress} />

// With icons (only NativeWind)
<Button
  title="Button with icon"
  leftIconAction={{ name: 'heart-solid', color: '#FF0000' }}
  onPress={handlePress}
/>
```

## Props

| Prop                    | Type                                                                                                                                                                                  | Required | Default               | Description                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------- | ------------------------------------------------------------- |
| `as`                    | `'touchable-opacity' \| 'pressable' \| 'ripple-pressable' \| 'scale-pressable'`                                                                                                       | ❌       | `'touchable-opacity'` | Type of touchable component to use                            |
| `children`              | `React.ReactNode`                                                                                                                                                                     | ❌       | -                     | Custom content to render inside the button                    |
| `className`             | `string`                                                                                                                                                                              | ❌       | -                     | (only NativeWind) Custom CSS classes for the button container |
| `colorVariant`          | `'primary' \| 'secondary' \| 'error' \| 'warning' \| 'info' \| 'success' \| 'accent' \| 'dark' \| 'light' \| 'danger' \| 'neutral' \| 'muted' \| 'tertiary' \| 'inverted' \| 'white'` | ❌       | `'primary'`           | (only NativeWind) Button color variant                        |
| `contentPosition`       | `'left' \| 'center' \| 'right'`                                                                                                                                                       | ❌       | `'center'`            | Content position within the button                            |
| `isDisabled`            | `boolean`                                                                                                                                                                             | ❌       | `false`               | Whether the button is disabled                                |
| `leftIconAction`        | `IconActionConfig`                                                                                                                                                                    | ❌       | -                     | Left icon configuration with position support                 |
| `rightIconAction`       | `IconActionConfig`                                                                                                                                                                    | ❌       | -                     | Right icon configuration with position support                |
| `isLoading`             | `boolean`                                                                                                                                                                             | ❌       | `false`               | Whether the button is in loading state                        |
| `loadingIndicatorProps` | `Partial<LoadingIndicatorProps>`                                                                                                                                                      | ❌       | -                     | Props to pass to the loading indicator                        |
| `onPress`               | `() => void`                                                                                                                                                                          | ❌       | -                     | Press callback function                                       |
| `position`              | `'left' \| 'center' \| 'right'`                                                                                                                                                       | ❌       | `'center'`            | Content position within the button                            |
| `size`                  | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                                                                                                                              | ❌       | `'md'`                | Button size variant                                           |
| `stringProps`           | `StringProps`                                                                                                                                                                         | ❌       | -                     | Props to pass to the String component                         |
| `style`                 | `StyleProp<ViewStyle>`                                                                                                                                                                | ❌       | -                     | Style object for the button container                         |
| `title`                 | `string`                                                                                                                                                                              | ❌       | -                     | Button title text                                             |
| `variant`               | `'contained' \| 'outlined' \| 'text'`                                                                                                                                                 | ❌       | `'contained'`         | Button style variant                                          |

### IconActionConfig

```tsx
type IconActionConfig = {
  customIcon?: React.ReactNode; // Custom icon component
  name: keyof TIcons; // System icon name
  size?: IconProps['size']; // Icon size
  color?: string; // Icon color (only NativeWind)
};
```

## ⚠️ NativeWind Requirements

**Important:** The following props are **only available with NativeWind**:

- `className` - Custom CSS classes
- `colorVariant` - All color variants except `primary`

Without NativeWind:

- Only the `primary` color variant is available
- All other color variants will fallback to `primary` with a development warning
- You need to configure your `tailwind.config.js` with the button color tokens

## Color Variants Setup (NativeWind Required)

To use all available color variants, you need to configure your `tailwind.config.js` file with the button color tokens:

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

### Basic Buttons

```tsx
<Box className="gap-4">
  <Button title="Primary Button" onPress={() => console.log('Pressed!')} />
  <Button title="Secondary Button" variant="outlined" onPress={() => console.log('Pressed!')} />
  <Button title="Text Button" variant="text" onPress={() => console.log('Pressed!')} />
</Box>
```

### Color Variants (NativeWind Only)

```tsx
<Box className="gap-4">
  {/* Primary colors */}
  <Button title="Primary" colorVariant="primary" />
  <Button title="Secondary" colorVariant="secondary" />
  <Button title="Tertiary" colorVariant="tertiary" />

  {/* Semantic colors */}
  <Button title="Success" colorVariant="success" />
  <Button title="Error" colorVariant="error" />
  <Button title="Warning" colorVariant="warning" />
  <Button title="Info" colorVariant="info" />

  {/* Additional variants */}
  <Button title="Accent" colorVariant="accent" />
  <Button title="Danger" colorVariant="danger" />
  <Button title="Dark" colorVariant="dark" />
  <Button title="Light" colorVariant="light" />
</Box>
```

### Different Touchable Types

```tsx
<Box className="gap-4">
  <Button as="touchable-opacity" title="Opacity Effect" />
  <Button as="pressable" title="Native Pressable" />
  <Button as="ripple-pressable" title="Custom Ripple" />
  <Button as="scale-pressable" title="Scale Effect" />
</Box>
```

### Loading States

```tsx
<Box className="gap-4">
  <Button isLoading title="Loading..." />
  <Button isLoading loadingIndicatorProps={{ color: 'white' }} title="Custom Loading" />
</Box>
```

### Icon Support

```tsx
<Box className="gap-4">
  {/* Left icon */}
  <Button leftIconAction={{ name: 'home-solid', size: 'md' }} title="Home Button" />

  {/* Right icon */}
  <Button rightIconAction={{ name: 'arrow-right-solid', size: 'md' }} title="Next" />

  {/* Custom icon */}
  <Button
    leftIconAction={{
      customIcon: <CustomIcon />,
      size: 'md',
    }}
    title="Custom Icon"
  />
</Box>
```

### Different Sizes

```tsx
<Box className="gap-4">
  <Button size="2xs" title="2XS Button" />
  <Button size="xs" title="XS Button" />
  <Button size="sm" title="Small Button" />
  <Button size="md" title="Medium Button" />
  <Button size="lg" title="Large Button" />
  <Button size="xl" title="XL Button" />
  <Button size="2xl" title="2XL Button" />
</Box>
```

### Custom Content

```tsx
<Button as="ripple-pressable" variant="contained">
  <Box className="flex-row items-center gap-2">
    <String weight="bold" color="white">
      Custom Content
    </String>
    <String color="white">→</String>
  </Box>
</Button>
```

### Disabled States

```tsx
<Box className="gap-4">
  <Button isDisabled title="Disabled Button" />
  <Button isDisabled isLoading title="Disabled Loading" />
</Box>
```

## Advanced Usage

### Form Submission

```tsx
function SubmitForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      isLoading={isSubmitting}
      isDisabled={isSubmitting}
      title={isSubmitting ? 'Submitting...' : 'Submit'}
      onPress={handleSubmit}
    />
  );
}
```

### Navigation Button

```tsx
function NavigationButton({ destination }) {
  const navigation = useNavigation();

  return (
    <Button
      as="ripple-pressable"
      rightIconAction={{ name: 'arrow-right-solid', size: 'md' }}
      title={`Go to ${destination}`}
      onPress={() => navigation.navigate(destination)}
    />
  );
}
```

### Action Button with Confirmation

```tsx
function DeleteButton({ onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePress = () => {
    if (!showConfirm) {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    } else {
      onDelete();
      setShowConfirm(false);
    }
  };

  return (
    <Button
      colorVariant={showConfirm ? 'error' : 'secondary'}
      title={showConfirm ? 'Tap again to confirm' : 'Delete'}
      onPress={handlePress}
    />
  );
}
```

## Best Practices

### 1. Choose Appropriate Touchable Type

```tsx
// ✅ Good: Use ripple-pressable for modern feel
<Button as="ripple-pressable" title="Modern Button" />

// ✅ Good: Use pressable for native feel
<Button as="pressable" title="Native Button" />

// ✅ Good: Use touchable-opacity for simple effect
<Button as="touchable-opacity" title="Simple Button" />
```

### 2. Handle Loading States Properly

```tsx
// ✅ Good: Disable button during loading
<Button
  isLoading={isLoading}
  isDisabled={isLoading}
  title={isLoading ? 'Loading...' : 'Submit'}
  onPress={handleSubmit}
/>
```

### 3. Use Semantic Color Variants (NativeWind Only)

```tsx
// ✅ Good: Use semantic color variants for meaning
<Button colorVariant="success" title="Save Changes" />
<Button colorVariant="error" title="Delete Item" />
<Button colorVariant="warning" title="Discard Changes" />
```

### 4. Provide Accessible Labels

```tsx
// ✅ Good: Use descriptive titles
<Button title="Save User Profile" />
<Button title="Delete Selected Items" />

// ❌ Avoid: Generic titles
<Button title="Click here" />
<Button title="OK" />
```

## Performance Considerations

- **Memoization**: Button styles and content are memoized for better performance
- **Conditional Rendering**: Loading states and icons are conditionally rendered
- **Ref Forwarding**: Proper ref forwarding for imperative methods
- **Touchable Optimization**: Each touchable type is optimized for its specific use case

## File Structure

```
button/
├── README.md                    # This documentation
├── components/
│   ├── Button.tsx              # Hybrid component (auto-detect)
│   ├── Button.ss.tsx           # StyleSheet version
│   └── Button.tw.tsx           # Tailwind version
├── styles/
│   ├── Button.ss.styles.ts     # StyleSheet styles
│   └── Button.tw.styles.tsx    # Tailwind variants
├── types/
│   ├── button.ss.types.ts      # StyleSheet types
│   └── button.tw.types.ts      # Tailwind types
└── index.ts                    # Exports
```

## TypeScript

The Button component is fully typed with proper interfaces for each version:

```tsx
// Hybrid version (uses Tailwind types)
interface BtnPropsTw {
  title?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  as?: 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable';
  variant?: 'contained' | 'outlined' | 'text';
  colorVariant?:
    | 'primary'
    | 'secondary'
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
    | 'tertiary'
    | 'inverted'
    | 'white';
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  leftIconAction?: IconActionConfig;
  rightIconAction?: IconActionConfig;
  // ... other props
}
```

## Related Components

- **String**: Text component used for button titles
- **Icon**: Icon component for system icons
- **LoadingIndicator**: Loading spinner component
- **Box**: Container component for custom content
- **RipplePressable**: Custom ripple effect component
- **ScalePressable**: Scale animation component

## Storybook

See the Storybook documentation for interactive examples:

- `components/Button` - Complete button examples with all features
- `components/Button/TouchableComparison` - Compare different touchable effects
- `components/Button/CustomContent` - Custom content examples
- `components/Button/IconPositioning` - Icon positioning examples
