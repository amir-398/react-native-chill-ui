# Button Component

A versatile and customizable Button component for React Native applications with support for multiple touchable types, loading states, and various styling options.

## Features

- **Multiple Touchable Types**: Support for TouchableOpacity, Pressable, and RipplePressable
- **Loading States**: Built-in loading indicator with customizable props
- **Icon Support**: Flexible icon positioning with `iconAction` prop (left/right/center)
- **Custom Icons**: Support for both system icons and custom icon components
- **Multiple Variants**: Contained, outlined, and text variants
- **Color Variants**: 15 color variants (requires NativeWind)
- **Size Variants**: Multiple size options from 2xs to 2xl
- **Custom Content**: Support for both title text and custom children
- **TypeScript**: Complete type safety with proper interfaces
- **Performance Optimized**: Memoized components for better performance
- **Accessible**: Proper focus management and screen reader support

## ⚠️ NativeWind Requirement for Color Variants

**Important:** All color variants except `primary` require NativeWind to be installed and configured. Without NativeWind:

- Only the `primary` color variant is available
- All other color variants will fallback to `primary` with a development warning
- You need to configure your `tailwind.config.js` with the button color tokens (see setup section below)

## Basic Usage

```tsx
import { Button } from 'chill-ui';

function Example() {
  return (
    <Box className="gap-4 p-4">
      <Button title="Primary Button" onPress={() => console.log('Pressed!')} />

      <Button as="RipplePressable" title="Ripple Effect" onPress={() => console.log('Pressed!')} />

      <Button isLoading title="Loading..." onPress={() => console.log('Pressed!')} />
    </Box>
  );
}
```

## Props

| Prop           | Type                            | Required | Default              | Description                            |
| -------------- | ------------------------------- | -------- | -------------------- | -------------------------------------- |
| `title`        | `string`                        | ❌       | -                    | Button text content                    |
| `children`     | `ReactNode`                     | ❌       | -                    | Custom content to render inside button |
| `onPress`      | `() => void`                    | ❌       | -                    | Press callback function                |
| `as`           | `TouchableComponentType`        | ❌       | `'TouchableOpacity'` | Type of touchable component to use     |
| `variant`      | `ButtonVariant`                 | ❌       | `'contained'`        | Button style variant                   |
| `colorVariant` | `ButtonColorVariant`            | ❌       | `'primary'`          | Button color variant (NativeWind only) |
| `size`         | `ButtonSize`                    | ❌       | `'md'`               | Button size variant                    |
| `position`     | `'left' \| 'center' \| 'right'` | ❌       | `'center'`           | Content position within button         |
| `isDisabled`   | `boolean`                       | ❌       | `false`              | Whether button is disabled             |
| `isLoading`    | `boolean`                       | ❌       | `false`              | Whether button is in loading state     |

| `iconAction` | `IconActionConfig` | ❌ | - | Icon configuration with position support |
| `className` | `string` | ❌ | - | Custom CSS classes |
| `stringProps` | `StringProps` | ❌ | - | Props to pass to String component |
| `loadingIndicatorProps` | `LoadingIndicatorProps` | ❌ | - | Props for loading indicator |

### TouchableComponentType

```tsx
type TouchableComponentType = 'TouchableOpacity' | 'Pressable' | 'RipplePressable';
```

### ButtonColorVariant

```tsx
type ButtonColorVariant =
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

**⚠️ Important:** Color variants are **only available with NativeWind**. Without NativeWind, only the `primary` variant is supported. If you try to use other color variants without NativeWind, the component will automatically fallback to `primary` and show a development warning.

### IconActionConfig

```tsx
type IconActionConfig = {
  customIcon?: React.ReactNode; // Custom icon component
  position?: 'left' | 'right'; // Icon position
  name: keyof TIcons; // System icon name
  size: IconProps['size']; // Icon size
};
```

## Color Variants Setup (NativeWind Required)

To use all available color variants, you need to configure your `tailwind.config.js` file with the button color tokens. Here's the required configuration:

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
            background: '#7DD3FC', // Light blue
            text: '#000',
          },
          secondary: {
            background: '#CBD2D9', // Light gray
            text: '#333',
          },
          tertiary: {
            background: '#E5E7EB', // Very light gray
            text: '#374151',
          },

          // Semantic colors
          success: {
            background: '#10B981', // Green
            text: '#FFF',
          },
          error: {
            background: '#EF4444', // Red
            text: '#FFF',
          },
          warning: {
            background: '#F59E0B', // Orange/Yellow
            text: '#000',
          },
          info: {
            background: '#3B82F6', // Blue
            text: '#FFF',
          },

          // Additional variants
          accent: {
            background: '#8B5CF6', // Purple
            text: '#FFF',
          },
          danger: {
            background: '#DC2626', // Dark red
            text: '#FFF',
          },
          dark: {
            background: '#1F2937', // Dark gray
            text: '#FFF',
          },
          light: {
            background: '#F9FAFB', // Very light gray
            text: '#111827',
          },
          neutral: {
            background: '#6B7280', // Medium gray
            text: '#FFF',
          },
          muted: {
            background: '#9CA3AF', // Muted gray
            text: '#374151',
          },
          inverted: {
            background: '#000', // Black
            text: '#FFF',
          },
          white: {
            background: '#FFF', // White
            text: '#000',
          },

          // Disabled state
          disabled: {
            background: '#E5E7EB',
            text: '#9CA3AF',
          },
        },
      },
    },
  },
  // ... other config
};
```

### Color Token Usage

The button component uses these color tokens in different ways depending on the variant:

- **Contained variant**: Uses `bg-button-{color}-background` and `text-button-{color}-text`
- **Outlined variant**: Uses `border-button-{color}-background` and `text-button-{color}-background` with transparent background
- **Text variant**: Uses `text-button-{color}-background` with transparent background

### Available Color Variants

| Color Variant | Description                      | Best Used For                       |
| ------------- | -------------------------------- | ----------------------------------- |
| `primary`     | Main brand color                 | Primary actions, CTAs               |
| `secondary`   | Secondary brand color            | Secondary actions                   |
| `tertiary`    | Tertiary color                   | Less important actions              |
| `success`     | Green, indicates success         | Success messages, confirmations     |
| `error`       | Red, indicates error             | Error actions, destructive actions  |
| `warning`     | Orange/Yellow, indicates warning | Warning actions, cautions           |
| `info`        | Blue, indicates information      | Informational actions               |
| `accent`      | Purple, accent color             | Highlight actions, special features |
| `danger`      | Dark red, indicates danger       | Critical destructive actions        |
| `dark`        | Dark gray/black                  | Dark theme contexts                 |
| `light`       | Light gray/white                 | Light theme contexts                |
| `neutral`     | Medium gray                      | Neutral actions                     |
| `muted`       | Muted gray                       | Subtle actions                      |
| `inverted`    | Black/white inverted             | High contrast needs                 |
| `white`       | White background                 | Over dark backgrounds               |

## Examples

### Basic Buttons

```tsx
<Box className="gap-4">
  <Button title="Primary Button" colorVariant="primary" />
  <Button title="Secondary Button" colorVariant="secondary" />
  <Button title="Tertiary Button" colorVariant="tertiary" />
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
  <Button title="Neutral" colorVariant="neutral" />
  <Button title="Muted" colorVariant="muted" />
  <Button title="Inverted" colorVariant="inverted" />
  <Button title="White" colorVariant="white" />
</Box>
```

### Button Variants with Colors

```tsx
<Box className="gap-4">
  {/* Contained variants */}
  <Button variant="contained" colorVariant="primary" title="Contained Primary" />
  <Button variant="contained" colorVariant="success" title="Contained Success" />
  <Button variant="contained" colorVariant="error" title="Contained Error" />

  {/* Outlined variants */}
  <Button variant="outlined" colorVariant="primary" title="Outlined Primary" />
  <Button variant="outlined" colorVariant="warning" title="Outlined Warning" />
  <Button variant="outlined" colorVariant="info" title="Outlined Info" />

  {/* Text variants */}
  <Button variant="text" colorVariant="primary" title="Text Primary" />
  <Button variant="text" colorVariant="accent" title="Text Accent" />
  <Button variant="text" colorVariant="danger" title="Text Danger" />
</Box>
```

### Different Touchable Types

```tsx
<Box className="gap-4">
  <Button as="TouchableOpacity" title="Opacity Effect" />
  <Button as="Pressable" title="Native Ripple" />
  <Button as="RipplePressable" title="Custom Ripple" />
</Box>
```

### Loading States

```tsx
<Box className="gap-4">
  <Button isLoading title="Loading..." />
  <Button isLoading loadingIndicatorProps={{ color: 'white' }} title="Custom Loading" />
</Box>
```

### Icon Positioning with iconAction

```tsx
<Box className="gap-4">
  {/* Icon à gauche */}
  <Button iconAction={{ name: 'home-solid', position: 'left', size: 'md' }} title="Home Button" />

  {/* Icon à droite */}
  <Button iconAction={{ name: 'arrow-right-solid', position: 'right', size: 'md' }} title="Next" />

  {/* Texte aligné à gauche avec icône à gauche */}
  <Button
    iconAction={{ name: 'check-solid', position: 'left', size: 'md' }}
    stringProps={{ position: 'left' }}
    title="Save Changes"
  />

  {/* Texte aligné à droite avec icône à droite */}
  <Button
    iconAction={{ name: 'arrow-right-solid', position: 'right', size: 'md' }}
    stringProps={{ position: 'right' }}
    title="Continue"
  />
</Box>
```

### Custom Icons

```tsx
<Box className="gap-4">
  {/* Icône personnalisée à gauche */}
  <Button
    iconAction={{
      customIcon: <CustomIconComponent />,
      position: 'left',
    }}
    title="Custom Icon Left"
  />

  {/* Icône personnalisée à droite */}
  <Button
    iconAction={{
      customIcon: <CustomArrowIcon />,
      position: 'right',
    }}
    title="Custom Icon Right"
  />

  {/* Icône personnalisée avec texte centré */}
  <Button
    iconAction={{
      customIcon: <StarIcon />,
      position: 'left',
    }}
    stringProps={{ position: 'center' }}
    title="Favorite"
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
<Button as="RipplePressable" variant="primary">
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

### Semantic Variants (NativeWind Only)

```tsx
<Box className="gap-4">
  <Button colorVariant="success" title="Success" />
  <Button colorVariant="error" title="Error" />
  <Button colorVariant="warning" title="Warning" />
  <Button colorVariant="info" title="Info" />
  <Button colorVariant="accent" title="Accent" />
  <Button colorVariant="light" title="Light" />
  <Button colorVariant="dark" title="Dark" />
</Box>
```

### Advanced Icon Positioning

```tsx
<Box className="gap-4">
  {/* Texte centré, icône absolue à gauche */}
  <Button
    iconAction={{ name: 'home-solid', position: 'left' }}
    stringProps={{ position: 'center' }}
    title="Centered with Left Icon"
  />

  {/* Texte centré, icône absolue à droite */}
  <Button
    iconAction={{ name: 'arrow-right-solid', position: 'right' }}
    stringProps={{ position: 'center' }}
    title="Centered with Right Icon"
  />

  {/* Texte aligné à gauche, icône en flex à gauche */}
  <Button
    iconAction={{ name: 'check-solid', position: 'left' }}
    stringProps={{ position: 'left' }}
    title="Left Aligned with Left Icon"
  />

  {/* Texte aligné à droite, icône en flex à droite */}
  <Button
    iconAction={{ name: 'arrow-right-solid', position: 'right' }}
    stringProps={{ position: 'right' }}
    title="Right Aligned with Right Icon"
  />
</Box>
```

## Touchable Component Types

### TouchableOpacity (Default)

Standard opacity effect on press.

```tsx
<Button as="TouchableOpacity" title="Opacity Effect" />
```

### Pressable

Native Android ripple effect with customizable properties.

```tsx
<Button as="Pressable" title="Native Ripple" />
```

### RipplePressable

Custom ripple animation with smooth transitions.

```tsx
<Button as="RipplePressable" title="Custom Ripple" />
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
      loading={isSubmitting}
      disabled={isSubmitting}
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
      as="RipplePressable"
      iconAction={{ name: 'arrow-right-solid', position: 'right' }}
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
      variant={showConfirm ? 'error' : 'secondary'}
      title={showConfirm ? 'Tap again to confirm' : 'Delete'}
      onPress={handlePress}
    />
  );
}
```

### Custom Loading Indicator

```tsx
<Button
  isLoading
  loadingIndicatorProps={{
    name: 'spinner',
    size: 24,
    color: 'white',
    strokeWidth: 3,
  }}
  title="Custom Loading"
/>
```

### Social Media Button

```tsx
function SocialButton({ platform, onPress }) {
  const getIconConfig = () => {
    switch (platform) {
      case 'facebook':
        return { customIcon: <FacebookIcon />, position: 'left' };
      case 'google':
        return { customIcon: <GoogleIcon />, position: 'left' };
      case 'apple':
        return { customIcon: <AppleIcon />, position: 'left' };
      default:
        return { name: 'user-solid', position: 'left' };
    }
  };

  return <Button iconAction={getIconConfig()} title={`Continue with ${platform}`} onPress={onPress} />;
}
```

### Shopping Cart Button

```tsx
function CartButton({ itemCount, onPress }) {
  return (
    <Button
      iconAction={{
        customIcon: <CartIcon count={itemCount} />,
        position: 'right',
      }}
      title={`Cart (${itemCount})`}
      onPress={onPress}
    />
  );
}
```

## Best Practices

### 1. Choose Appropriate Touchable Type

```tsx
// ✅ Good: Use RipplePressable for modern feel
<Button as="RipplePressable" title="Modern Button" />

// ✅ Good: Use Pressable for native feel
<Button as="Pressable" title="Native Button" />

// ✅ Good: Use TouchableOpacity for simple effect
<Button as="TouchableOpacity" title="Simple Button" />
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

// ⚠️ Note: These require NativeWind setup in tailwind.config.js
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

### 5. Use iconAction for Icon Positioning

```tsx
// ✅ Good: Use iconAction for flexible positioning
<Button
  iconAction={{ name: "save-solid", position: "left" }}
  title="Save"
/>

// ✅ Good: Use custom icons when needed
<Button
  iconAction={{ customIcon: <CustomIcon />, position: "right" }}
  title="Custom Action"
/>
```

### 6. Consider Text Alignment with Icons

```tsx
// ✅ Good: Center text when using absolute positioned icons
<Button
  iconAction={{ name: "arrow-right-solid", position: "right" }}
  stringProps={{ position: "center" }}
  title="Next"
/>

// ✅ Good: Align text with flex positioned icons
<Button
  iconAction={{ name: "check-solid", position: "left" }}
  stringProps={{ position: "left" }}
  title="Save Changes"
/>
```

## Performance Considerations

- **Memoization**: Button styles and content are memoized for better performance
- **Conditional Rendering**: Loading states and icons are conditionally rendered
- **Ref Forwarding**: Proper ref forwarding for imperative methods
- **Touchable Optimization**: Each touchable type is optimized for its specific use case

## File Structure

```
button/
├── README.md          # This documentation
├── Button.tsx         # Main component
├── styleVariants.ts   # Tailwind variants for styling
└── index.ts          # Exports
```

## TypeScript

The Button component is fully typed with proper interfaces:

```tsx
interface BtnProps extends TouchableOpacityProps {
  title?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  as?: TouchableComponentType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconAction?: IconActionConfig;
  // ... other props
}
```

## Related Components

- **String**: Text component used for button titles
- **Icon**: Icon component for system icons
- **LoadingIndicator**: Loading spinner component
- **Box**: Container component for custom content
- **RipplePressable**: Custom ripple effect component

## Storybook

See the Storybook documentation for interactive examples:

- `components/Button` - Complete button examples with all features
- `components/Button/TouchableComparison` - Compare different touchable effects
- `components/Button/CustomContent` - Custom content examples
- `components/Button/IconPositioning` - Icon positioning examples
