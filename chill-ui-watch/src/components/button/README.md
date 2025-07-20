# Button Component

A versatile and customizable Button component for React Native applications with support for multiple touchable types, loading states, and various styling options.

## Features

- **Multiple Touchable Types**: Support for TouchableOpacity, Pressable, and RipplePressable
- **Loading States**: Built-in loading indicator with customizable props
- **Icon Support**: Flexible icon positioning with `iconAction` prop (left/right/center)
- **Custom Icons**: Support for both system icons and custom icon components
- **Multiple Variants**: Primary, secondary, tertiary, and semantic variants
- **Size Variants**: Multiple size options from 2xs to 2xl
- **Custom Content**: Support for both title text and custom children
- **TypeScript**: Complete type safety with proper interfaces
- **Performance Optimized**: Memoized components for better performance
- **Accessible**: Proper focus management and screen reader support

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

| Prop         | Type                            | Required | Default              | Description                            |
| ------------ | ------------------------------- | -------- | -------------------- | -------------------------------------- |
| `title`      | `string`                        | ❌       | -                    | Button text content                    |
| `children`   | `ReactNode`                     | ❌       | -                    | Custom content to render inside button |
| `onPress`    | `() => void`                    | ❌       | -                    | Press callback function                |
| `as`         | `TouchableComponentType`        | ❌       | `'TouchableOpacity'` | Type of touchable component to use     |
| `variant`    | `ButtonVariant`                 | ❌       | `'primary'`          | Button style variant                   |
| `size`       | `ButtonSize`                    | ❌       | `'md'`               | Button size variant                    |
| `position`   | `'left' \| 'center' \| 'right'` | ❌       | `'center'`           | Content position within button         |
| `isDisabled` | `boolean`                       | ❌       | `false`              | Whether button is disabled             |
| `isLoading`  | `boolean`                       | ❌       | `false`              | Whether button is in loading state     |

| `iconAction` | `IconActionConfig` | ❌ | - | Icon configuration with position support |
| `className` | `string` | ❌ | - | Custom CSS classes |
| `stringProps` | `StringProps` | ❌ | - | Props to pass to String component |
| `loadingIndicatorProps` | `LoadingIndicatorProps` | ❌ | - | Props for loading indicator |

### TouchableComponentType

```tsx
type TouchableComponentType = 'TouchableOpacity' | 'Pressable' | 'RipplePressable';
```

### IconActionConfig

```tsx
type IconActionConfig = {
  customIcon?: React.ReactNode; // Custom icon component
  position?: 'left' | 'right'; // Icon position
  name: keyof TIcons; // System icon name
  size: IconProps['size']; // Icon size
};
```

## Examples

### Basic Buttons

```tsx
<Box className="gap-4">
  <Button title="Primary Button" variant="primary" />
  <Button title="Secondary Button" variant="secondary" />
  <Button title="Tertiary Button" variant="tertiary" />
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

### Semantic Variants

```tsx
<Box className="gap-4">
  <Button variant="success" title="Success" />
  <Button variant="error" title="Error" />
  <Button variant="warning" title="Warning" />
  <Button variant="info" title="Info" />
  <Button variant="accent" title="Accent" />
  <Button variant="light" title="Light" />
  <Button variant="dark" title="Dark" />
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

### 3. Use Semantic Variants

```tsx
// ✅ Good: Use semantic variants for meaning
<Button variant="success" title="Save Changes" />
<Button variant="error" title="Delete Item" />
<Button variant="warning" title="Discard Changes" />
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
