# Box Component

The Box component is a flexible container that provides predefined layout variants with automatic NativeWind support and fallback to StyleSheet.

## Features

- ✅ **Optional NativeWind Support** : Automatic detection and fallback to StyleSheet
- ✅ **Layout Variants** : Row, Column, Center, Grow, etc.
- ✅ **Optimized Performance** : Uses React Native's ViewNativeComponent
- ✅ **TypeScript** : Complete type support
- ✅ **Flexible** : Support for className and style props

## Usage

### With NativeWind Installed

```tsx
import { Box, BoxRow, BoxColumn, BoxCenter } from '@/components/box';

// Basic box with Tailwind classes
<Box className="p-4 bg-gray-100 rounded-lg">
  <String>Content</String>
</Box>

// Horizontal layout
<BoxRow className="space-x-2">
  <String>Item 1</String>
  <String>Item 2</String>
</BoxRow>

// Centered vertical layout
<BoxColumnCenter className="p-4">
  <Avatar data={{ firstname: 'John', lastname: 'Doe' }} />
  <String>John Doe</String>
</BoxColumnCenter>

// Perfect centering
<BoxCenter className="h-full">
  <String>Perfectly centered</String>
</BoxCenter>
```

### Without NativeWind (StyleSheet Fallback)

```tsx
import { Box, BoxRow, BoxColumn, BoxCenter } from '@/components/box';

// Usage with StyleSheet (automatic fallback)
<Box style={{ padding: 16, backgroundColor: '#f3f4f6' }}>
  <String>Content</String>
</Box>

// Horizontal layout with inline styles
<BoxRow style={{ gap: 8 }}>
  <String>Item 1</String>
  <String>Item 2</String>
</BoxRow>

// Centered vertical layout
<BoxColumnCenter style={{ padding: 16 }}>
  <Avatar data={{ firstname: 'John', lastname: 'Doe' }} />
  <String>John Doe</String>
</BoxColumnCenter>
```

## Available Variants

### Base Variants

| Component   | Description                            | NativeWind      | StyleSheet                |
| ----------- | -------------------------------------- | --------------- | ------------------------- |
| `Box`       | Base container without default styling | `className`     | `style`                   |
| `BoxRow`    | Horizontal layout (flex-row)           | `flex flex-row` | `flexDirection: 'row'`    |
| `BoxColumn` | Vertical layout (flex-col)             | `flex flex-col` | `flexDirection: 'column'` |

### Centering Variants

| Component         | Description                               | NativeWind                         | StyleSheet                                       |
| ----------------- | ----------------------------------------- | ---------------------------------- | ------------------------------------------------ |
| `BoxCenter`       | Perfect centering (horizontal + vertical) | `flex items-center justify-center` | `alignItems: 'center', justifyContent: 'center'` |
| `BoxRowCenter`    | Vertical centering in row                 | `flex flex-row items-center`       | `flexDirection: 'row', alignItems: 'center'`     |
| `BoxColumnCenter` | Horizontal centering in column            | `flex flex-col items-center`       | `flexDirection: 'column', alignItems: 'center'`  |

### Spacing Variants

| Component                | Description                      | NativeWind                                   | StyleSheet                                                                       |
| ------------------------ | -------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------- |
| `BoxRowBetween`          | Space between elements in row    | `flex flex-row justify-between`              | `flexDirection: 'row', justifyContent: 'space-between'`                          |
| `BoxRowCenterBetween`    | Vertical centering + spacing     | `flex flex-row items-center justify-between` | `flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'`    |
| `BoxColumnBetween`       | Space between elements in column | `flex flex-col justify-between`              | `flexDirection: 'column', justifyContent: 'space-between'`                       |
| `BoxColumnCenterBetween` | Horizontal centering + spacing   | `flex flex-col items-center justify-between` | `flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'` |

### Growth Variants

| Component       | Description                 | NativeWind        | StyleSheet                         |
| --------------- | --------------------------- | ----------------- | ---------------------------------- |
| `BoxGrow`       | Flexible container (flex-1) | `flex-1`          | `flex: 1`                          |
| `BoxRowGrow`    | Flexible row                | `flex-1 flex-row` | `flex: 1, flexDirection: 'row'`    |
| `BoxColumnGrow` | Flexible column             | `flex-1 flex-col` | `flex: 1, flexDirection: 'column'` |

### Positioning Variants

| Component     | Description                                   | NativeWind | StyleSheet             |
| ------------- | --------------------------------------------- | ---------- | ---------------------- |
| `BoxAbsolute` | Absolute positioning                          | `absolute` | `position: 'absolute'` |
| `BoxStack`    | Relative positioning (for overlapped content) | `relative` | `position: 'relative'` |

## Props

### Common Props

All Box components accept the following props:

| Prop           | Type                   | Description                                      |
| -------------- | ---------------------- | ------------------------------------------------ |
| `className`    | `string`               | Tailwind CSS classes (used only with NativeWind) |
| `style`        | `StyleProp<ViewStyle>` | React Native inline styles                       |
| `children`     | `ReactNode`            | Component content                                |
| `...ViewProps` | -                      | All React Native View props                      |

### Advanced Usage Examples

```tsx
// Combining variants with custom styles
<BoxRowCenterBetween
  className="bg-white shadow-lg rounded-lg p-4"
  style={{ marginHorizontal: 16 }}
>
  <BoxRowCenter>
    <Icon name="user" />
    <String>John Doe</String>
  </BoxRowCenter>
  <Badge>Online</Badge>
</BoxRowCenterBetween>

// Complex layout with overlapped content
<BoxStack className="relative">
  <Image source={{ uri: 'image.jpg' }} className="w-full h-48" />
  <BoxAbsolute className="top-2 right-2">
    <Badge>New</Badge>
  </BoxAbsolute>
</BoxStack>

// Responsive layout with growth
<BoxColumnGrow className="bg-gray-50">
  <String>Header</String>
  <BoxGrow className="p-4">
    <String>Main content</String>
  </BoxGrow>
  <String>Footer</String>
</BoxColumnGrow>
```

## Performance

- **ViewNativeComponent** : Uses React Native's native View component for optimal performance
- **NativeWind Detection** : Caches detection result to avoid repeated checks
- **StyleSheet** : Uses StyleSheet.create() for optimized styles when NativeWind is not available

## Compatibility

- ✅ React Native 0.70+
- ✅ Expo SDK 48+
- ✅ TypeScript 4.9+
- ✅ NativeWind 2.0+ (optional)
- ✅ iOS 12+
- ✅ Android API 21+
