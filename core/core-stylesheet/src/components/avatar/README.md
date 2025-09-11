# Avatar

A React Native component that displays user profile images with fallback to initials. Supports different sizes, shapes, and touchable interactions. **Automatically detects NativeWind availability and falls back to StyleSheet when needed.**

## Features

- ✅ **Automatic NativeWind Detection**: Works with or without NativeWind installed
- ✅ **Multiple Sizes**: 8 different size variants from 2xs to 3xl
- ✅ **Shape Variants**: Circle and square shapes
- ✅ **Image Support**: Displays user profile images with fallback to initials
- ✅ **Touchable Interactions**: Supports Pressable, TouchableOpacity, and TouchableHighlight
- ✅ **Customizable Styling**: Background colors and custom CSS classes (with NativeWind)
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Performance**: Optimized with proper component selection and styling
- ✅ **Cross-Platform**: Consistent behavior across iOS and Android

## NativeWind Compatibility

The Avatar component automatically detects whether NativeWind is installed and adapts accordingly:

- **With NativeWind**: Uses Tailwind CSS classes via the `className` prop
- **Without NativeWind**: Falls back to StyleSheet with equivalent styling

This makes the component compatible with projects that don't use NativeWind while maintaining full functionality.

## Quick Start

```tsx
import Avatar from '@/components/avatar/Avatar';

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
  as="TouchableOpacity"
/>
```

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
      <Avatar data={{ firstname: 'John', lastname: 'Doe' }} onPress={handlePress} as="TouchableOpacity" />

      {/* TouchableHighlight */}
      <Avatar data={{ firstname: 'John', lastname: 'Doe' }} onPress={handlePress} as="TouchableHighlight" />
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
      <Avatar data={{ firstname: 'John', lastname: 'Doe' }} backgroundColor="#FF6B6B" size="lg" />

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

| Prop              | Type                                                              | Default       | Description                                        |
| ----------------- | ----------------------------------------------------------------- | ------------- | -------------------------------------------------- |
| `data`            | `{ firstname?: string; lastname?: string; image_url?: string }`   | **Required**  | User data for avatar display                       |
| `size`            | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | `'sm'`        | Avatar size variant                                |
| `variant`         | `'circle' \| 'square'`                                            | `'circle'`    | Avatar shape variant                               |
| `backgroundColor` | `string`                                                          | `undefined`   | Custom background color                            |
| `className`       | `string`                                                          | `undefined`   | Custom CSS classes (only used with NativeWind)     |
| `onPress`         | `() => void`                                                      | `undefined`   | Callback when avatar is pressed                    |
| `as`              | `'Pressable' \| 'TouchableOpacity' \| 'TouchableHighlight'`       | `'Pressable'` | Component to use when pressable                    |
| `stringProps`     | `StringProps`                                                     | `undefined`   | Props for the String component displaying initials |

### Size Variants

| Size  | Dimensions | Use Case                       |
| ----- | ---------- | ------------------------------ |
| `2xs` | 24x24px    | Very small icons, badges       |
| `xs`  | 36x36px    | Small avatars, compact layouts |
| `sm`  | 48x48px    | Default size, most common use  |
| `md`  | 56x56px    | Medium avatars, user lists     |
| `lg`  | 64x64px    | Large avatars, profile headers |
| `xl`  | 80x80px    | Extra large, prominent display |
| `2xl` | 112x112px  | Very large, hero sections      |
| `3xl` | 128x128px  | Maximum size, special cases    |

### Shape Variants

| Variant  | Description                                   | Use Case                     |
| -------- | --------------------------------------------- | ---------------------------- |
| `circle` | Fully rounded (border-radius: 9999px)         | Most common, modern look     |
| `square` | Slightly rounded corners (border-radius: 8px) | Alternative, structured look |

## NativeWind vs StyleSheet

The component automatically adapts based on NativeWind availability:

### With NativeWind

```tsx
// Uses Tailwind classes
<Avatar data={{ firstname: 'John', lastname: 'Doe' }} className="border-4 border-blue-500 shadow-lg" size="lg" />
```

### Without NativeWind

```tsx
// Uses StyleSheet with equivalent styling
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  backgroundColor="#3B82F6" // Custom colors via props
  size="lg"
/>
```

## Utility Functions

### getUserInitials

Extracts user initials from firstname and lastname:

```tsx
import { getUserInitials } from '@/components/avatar/Avatar';

const initials = getUserInitials({
  firstname: 'John',
  lastname: 'Doe',
}); // Returns 'JD'

const singleInitial = getUserInitials({
  firstname: 'John',
}); // Returns 'J'

const emptyInitial = getUserInitials({}); // Returns ''
```

## Best Practices

1. **Always provide user data**: Even if you have an image, provide firstname/lastname for fallback
2. **Choose appropriate sizes**: Use smaller sizes for lists, larger for prominent displays
3. **Handle image loading**: Images are displayed with absolute positioning over initials
4. **Consider accessibility**: The component automatically handles text contrast and sizing
5. **Use consistent variants**: Stick to one shape variant throughout your app for consistency

## Migration Guide

### From NativeWind-only to Universal

If you're migrating from a NativeWind-only implementation:

1. **No changes needed**: The component automatically detects NativeWind availability
2. **Custom styling**: Use `backgroundColor` prop instead of `className` for projects without NativeWind
3. **Testing**: Test in both environments to ensure consistent behavior

### From StyleSheet-only to Universal

If you're adding NativeWind support:

1. **Install NativeWind**: Follow the official installation guide
2. **Update styling**: Replace `backgroundColor` props with `className` where appropriate
3. **Gradual migration**: You can mix both approaches during transition
