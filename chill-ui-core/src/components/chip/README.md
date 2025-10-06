# Chip Component

A flexible and customizable Chip component for React Native applications that displays compact elements representing inputs, attributes, or actions. Supports multiple styling approaches, variants, and interactive features.

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
- Supports 14 color variants
- Install: `npm install react-native-chill-ui@tailwind`

### 3. **Hybrid Version**

- Automatically detects if NativeWind is available
- Falls back to StyleSheet if NativeWind is not installed
- Best for component libraries or projects that need flexibility
- Install: `npm install react-native-chill-ui@hybrid`

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Chip } from 'react-native-chill-ui'`

## Features

- **Multiple Variants**: Contained (filled) and outlined variants
- **14 Color Variants**: (NativeWind only) Primary, secondary, accent, danger, warning, info, etc.
- **Size Variants**: 7 size options from xs to 2xl
- **Left/Right Icons**: Support for customizable icons on both sides
- **Clickable**: Optional `onPress` handler with multiple touchable types
- **Touchable Types**: TouchableOpacity, Pressable, RipplePressable, ScalePressable
- **Custom Colors**: Support for custom background and border colors
- **Position**: Align chip within its container (left, center, right)
- **TypeScript Support**: Fully typed for a better development experience
- **Accessible**: Proper focus management and screen reader support

## Quick Start

```tsx
import { Chip } from 'react-native-chill-ui';

// Basic usage
<Chip>New Feature</Chip>

// With variant and color
<Chip variant="outlined" colorVariant="primary">
  Tag
</Chip>

// With icons
<Chip
  leftIconAction={{ name: 'star-solid' }}
  rightIconAction={{ name: 'close-solid' }}
>
  Featured
</Chip>

// Clickable chip
<Chip
  variant="contained"
  colorVariant="danger"
  onPress={() => console.log('Clicked')}
  leftIconAction={{ name: 'bell-solid' }}
>
  3 Notifications
</Chip>

// With custom color
<Chip variant="outlined" color="#3B82F6" size="lg">
  Custom Color
</Chip>
```

## Props

| Prop              | Type                                            | Required | Default             | Description                                                |
| ----------------- | ----------------------------------------------- | -------- | ------------------- | ---------------------------------------------------------- |
| `as`              | `TouchableComponentType`                        | ❌       | `touchable-opacity` | Type of touchable component when `onPress` is provided     |
| `children`        | `React.ReactNode`                               | ❌       | -                   | Content to display in the chip                             |
| `className`       | `string`                                        | ❌       | -                   | (only NativeWind) Custom CSS classes for the chip          |
| `color`           | `string`                                        | ❌       | -                   | Custom background/border color (CSS color value)           |
| `colorVariant`    | `ColorVariant`                                  | ❌       | `primary`           | (only NativeWind) Color variant from 14 predefined options |
| `leftIconAction`  | `IconAction`                                    | ❌       | -                   | Configuration for the left icon                            |
| `onPress`         | `() => void`                                    | ❌       | -                   | Callback when chip is pressed                              |
| `position`        | `'left' \| 'center' \| 'right'`                 | ❌       | `left`              | Position of the chip in its container                      |
| `rightIconAction` | `IconAction`                                    | ❌       | -                   | Configuration for the right icon                           |
| `size`            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | ❌       | `xs`                | Size variant of the chip                                   |
| `stringProps`     | `StringProps`                                   | ❌       | -                   | Props to pass to the String component                      |
| `style`           | `StyleProp<ViewStyle>`                          | ❌       | -                   | Style object for the chip container                        |
| `title`           | `string`                                        | ❌       | -                   | Title to display (takes priority over children)            |
| `variant`         | `'contained' \| 'outlined'`                     | ❌       | `contained`         | Visual variant of the chip                                 |

### IconAction Type

```typescript
{
  name?: keyof TIcons;        // Icon name from the available icon set
  color?: string;             // Color of the icon
  size?: IconSize;            // Size of the icon
  customIcon?: ReactNode;     // Custom icon component
}
```

### ColorVariant Options (NativeWind only)

- `primary` (default)
- `secondary`
- `accent`
- `danger`
- `error`
- `warning`
- `info`
- `neutral`
- `muted`
- `light`
- `dark`
- `inverted`
- `white`
- `disabled`

### TouchableComponentType Options

- `touchable-opacity` (default) - Standard fade effect on press
- `pressable` - Basic pressable without visual feedback
- `ripple-pressable` - Material Design ripple effect
- `scale-pressable` - Scale animation on press

## Choosing the Right Version

Select the appropriate version during installation based on your project's needs:

| Version        | Installation Command                           | Use When                                                                                             | Pros                                                                      | Cons                                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------- |
| **StyleSheet** | `npm install react-native-chill-ui@stylesheet` | • No CSS-in-JS dependencies<br/>• Maximum performance needed<br/>• Simple styling requirements       | • Lightweight<br/>• Fast performance<br/>• No external dependencies       | • No color variants<br/>• Manual theme management     |
| **Tailwind**   | `npm install react-native-chill-ui@tailwind`   | • Already using NativeWind<br/>• Team familiar with Tailwind<br/>• Design system based on utilities  | • 14 color variants<br/>• Consistent with web Tailwind<br/>• Easy theming | • Requires NativeWind setup<br/>• Larger bundle size  |
| **Hybrid**     | `npm install react-native-chill-ui@hybrid`     | • Building component library<br/>• Uncertain about styling approach<br/>• Want maximum compatibility | • Works in any environment<br/>• Future-proof<br/>• Automatic detection   | • Slightly larger bundle<br/>• More complex internals |

## Examples

### Variants

```tsx
// Contained (filled background)
<Chip variant="contained" colorVariant="primary">
  Contained
</Chip>

// Outlined (border only)
<Chip variant="outlined" colorVariant="primary">
  Outlined
</Chip>
```

### Color Variants (NativeWind only)

```tsx
<Chip colorVariant="primary">Primary</Chip>
<Chip colorVariant="secondary">Secondary</Chip>
<Chip colorVariant="accent">Accent</Chip>
<Chip colorVariant="danger">Danger</Chip>
<Chip colorVariant="warning">Warning</Chip>
<Chip colorVariant="info">Info</Chip>
<Chip colorVariant="success">Success</Chip>
```

### With Icons

```tsx
// Left icon only
<Chip leftIconAction={{ name: 'star-solid', color: '#FFD700' }}>
  Favorite
</Chip>

// Right icon only
<Chip rightIconAction={{ name: 'close-solid' }}>
  Remove
</Chip>

// Both icons
<Chip
  leftIconAction={{ name: 'check-solid', color: '#10B981' }}
  rightIconAction={{ name: 'xmark-solid', color: '#EF4444' }}
>
  With Icons
</Chip>

// Custom icon component
<Chip leftIconAction={{ customIcon: <CustomIcon /> }}>
  Custom
</Chip>
```

### Clickable Chips

```tsx
// Basic click handler
<Chip onPress={() => console.log('Clicked')}>
  Click Me
</Chip>

// With ripple effect
<Chip as="ripple-pressable" onPress={handlePress}>
  Ripple Effect
</Chip>

// With scale animation
<Chip as="scale-pressable" onPress={handlePress}>
  Scale Effect
</Chip>

// Tag with remove handler
<Chip
  variant="outlined"
  colorVariant="primary"
  rightIconAction={{ name: 'xmark-solid' }}
  onPress={handleRemove}
>
  React Native
</Chip>
```

### Different Sizes

```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  <Chip size="xs">Extra Small</Chip>
  <Chip size="sm">Small</Chip>
  <Chip size="md">Medium</Chip>
  <Chip size="lg">Large</Chip>
  <Chip size="xl">Extra Large</Chip>
  <Chip size="2xl">2X Large</Chip>
</View>
```

### Positioning

```tsx
// Left aligned (default)
<Chip position="left">Left</Chip>

// Center aligned
<Chip position="center">Center</Chip>

// Right aligned
<Chip position="right">Right</Chip>
```

### Custom Colors

```tsx
// StyleSheet and Hybrid versions
<Chip color="#FF6B6B">Custom Background</Chip>

<Chip variant="outlined" color="#3B82F6">
  Custom Border
</Chip>

// Tailwind version (only NativeWind)
<Chip className="bg-red-500 border-red-600">
  Tailwind Classes
</Chip>
```

### Use Cases

#### Tags/Labels

```tsx
<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  <Chip colorVariant="primary">React</Chip>
  <Chip colorVariant="secondary">TypeScript</Chip>
  <Chip colorVariant="accent">Next.js</Chip>
  <Chip colorVariant="info">Tailwind</Chip>
</View>
```

#### Active Filters

```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  <Chip variant="contained" rightIconAction={{ name: 'xmark-solid' }} onPress={removeFilter}>
    Category: Tech
  </Chip>
  <Chip variant="contained" rightIconAction={{ name: 'xmark-solid' }} onPress={removeFilter}>
    Price: $0-$100
  </Chip>
</View>
```

#### Status Indicators

```tsx
<Chip
  variant="outlined"
  colorVariant="success"
  leftIconAction={{ name: 'check-circle-solid' }}
  size="sm"
>
  Completed
</Chip>

<Chip
  variant="outlined"
  colorVariant="warning"
  leftIconAction={{ name: 'clock-solid' }}
  size="sm"
>
  Pending
</Chip>

<Chip
  variant="outlined"
  colorVariant="danger"
  leftIconAction={{ name: 'xmark-circle-solid' }}
  size="sm"
>
  Failed
</Chip>
```

## Best Practices

1. **Use appropriate size** - `xs` or `sm` for tags, `md` for interactive elements
2. **Limit icon usage** - Use one or two icons maximum to maintain readability
3. **Prefer color variants** - Use predefined color variants for consistency (NativeWind version)
4. **Make chips actionable** - If using `onPress`, ensure visual feedback is clear
5. **Icons are decorative** - Icons in chips are not individually clickable, only the entire chip
6. **Use position wisely** - Align chips appropriately within their container
7. **Consistent sizing** - Keep chip sizes consistent within the same context

## Performance Considerations

- Icons are wrapped with `pointerEvents: 'none'` to prevent accidental touches
- Component uses memoization for computed values
- Minimal re-renders when props don't change
- Efficient icon rendering based on configuration

## TypeScript

The component is fully typed with TypeScript. Import types as needed:

```tsx
import { Chip } from 'react-native-chill-ui';
import type { ChipPropsTw, ChipPropsSs } from 'react-native-chill-ui';

// For Tailwind/Hybrid versions
const MyChip: React.FC<{ text: string }> = ({ text }) => <Chip colorVariant="primary">{text}</Chip>;
```

## Related Components

- **Button**: For action buttons with various styles
- **Badge**: For notification badges and counts
- **Tag**: For labeling and categorization
- **Input**: For text input with chips (tag input)

## File Structure

```
chip/
├── components/
│   ├── Chip.tsx           # Hybrid version (auto-detects NativeWind)
│   ├── Chip.ss.tsx        # StyleSheet version
│   └── Chip.tw.tsx        # Tailwind/NativeWind version
├── styles/
│   ├── Chip.ss.styles.ts  # StyleSheet styles
│   └── Chip.tw.styles.ts  # Tailwind variants
├── utils/
│   └── defaultProps.ts    # Default prop values
├── types/
│   ├── chip.ss.types.ts   # StyleSheet types
│   └── chip.tw.types.ts   # Tailwind types
└── README.md              # This file
```

## Inspiration

This component is inspired by Material-UI's [Chip component](https://mui.com/material-ui/react-chip/) with adaptations for React Native and NativeWind.
