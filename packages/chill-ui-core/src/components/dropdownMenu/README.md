# DropdownMenu Component

A comprehensive and flexible dropdown menu component for React Native applications with support for multiple trigger types, custom positioning, animations, and interactive features. **Automatically detects NativeWind availability and falls back to StyleSheet if needed.**

## Features

- **Multiple Trigger Types**: Support for different touchable components (Pressable, TouchableOpacity, TouchableHighlight)
- **Custom Positioning**: Flexible positioning with offset controls and collision detection
- **Controlled/Uncontrolled**: Support for both controlled and uncontrolled state management
- **Interactive Behaviors**: Configurable close behaviors and selection handling
- **Compound Components**: Modular architecture with separate components for each part
- **TypeScript**: Complete type safety with proper interfaces
- **Accessibility**: Proper focus management and screen reader support
- **NativeWind Compatible**: Automatically adapts to NativeWind or StyleSheet environments
- **Smart Styling**: Uses Tailwind classes when NativeWind is available, falls back to StyleSheet otherwise

## NativeWind Compatibility

The DropdownMenu component automatically detects whether NativeWind is installed in your project:

- **With NativeWind**: Uses Tailwind CSS classes via the `className` prop for styling
- **Without NativeWind**: Falls back to StyleSheet-based styling with the `style` prop

**Note**: The `className` prop is only available when NativeWind is installed. When using StyleSheet, use the `style` prop instead.

## Basic Usage

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'chill-ui';

function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button title="Open Menu" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => console.log('Profile')}>Profile</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Settings')}>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => console.log('Log out')}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Component Structure

The DropdownMenu component consists of several sub-components:

- **DropdownMenu**: Root provider component
- **DropdownMenuTrigger**: Component that opens the dropdown
- **DropdownMenuContent**: The dropdown content container
- **DropdownMenuItem**: Individual selectable items
- **DropdownMenuLabel**: Section labels
- **DropdownMenuSeparator**: Visual separators between items

## Props

### DropdownMenuProps

| Prop           | Type                      | Required | Default | Description                      |
| -------------- | ------------------------- | -------- | ------- | -------------------------------- |
| `children`     | `React.ReactNode`         | ✅       | -       | DropdownMenu content             |
| `open`         | `boolean`                 | ❌       | -       | Controlled open state            |
| `defaultOpen`  | `boolean`                 | ❌       | `false` | Initial open state               |
| `onOpenChange` | `(open: boolean) => void` | ❌       | -       | Callback when open state changes |

### DropdownMenuTriggerProps

| Prop        | Type                                           | Required | Default       | Description                          |
| ----------- | ---------------------------------------------- | -------- | ------------- | ------------------------------------ |
| `children`  | `React.ReactElement<{ onPress?: () => void }>` | ✅       | -             | Trigger element                      |
| `as`        | `'pressable' \| 'touchable-opacity'`           | ❌       | `'pressable'` | Type of touchable component          |
| `asChild`   | `boolean`                                      | ❌       | `false`       | Whether to clone the child element   |
| `className` | `string`                                       | ❌       | -             | Custom CSS classes (NativeWind only) |
| `style`     | `StyleProp<ViewStyle>`                         | ❌       | -             | Custom style (StyleSheet only)       |

### DropdownMenuContentProps

| Prop                            | Type                          | Required | Default  | Description                                     |
| ------------------------------- | ----------------------------- | -------- | -------- | ----------------------------------------------- |
| `children`                      | `React.ReactNode`             | ✅       | -        | Dropdown content                                |
| `width`                         | `number`                      | ❌       | `200`    | Width of the dropdown content                   |
| `offsetX`                       | `number`                      | ❌       | `0`      | Horizontal offset from trigger                  |
| `offsetY`                       | `number`                      | ❌       | `5`      | Vertical offset from trigger                    |
| `maxHeight`                     | `number`                      | ❌       | `200`    | Maximum height before scrolling                 |
| `minHeight`                     | `number`                      | ❌       | `0`      | Minimum height of the dropdown                  |
| `hasScroll`                     | `boolean`                     | ❌       | `true`   | Enable scrolling when content exceeds maxHeight |
| `hasAnimation`                  | `boolean`                     | ❌       | `true`   | Enable animations                               |
| `closeDropdownWhenSelectedItem` | `boolean`                     | ❌       | `true`   | Close dropdown when item is selected            |
| `closeWhenInteractedOutside`    | `boolean`                     | ❌       | `true`   | Close dropdown when clicking outside            |
| `verticalPosition`              | `'auto' \| 'top' \| 'bottom'` | ❌       | `'auto'` | Vertical positioning strategy                   |
| `horizontalPosition`            | `'auto' \| 'left' \| 'right'` | ❌       | `'auto'` | Horizontal positioning strategy                 |
| `className`                     | `string`                      | ❌       | -        | Custom CSS classes (NativeWind only)            |
| `style`                         | `StyleProp<ViewStyle>`        | ❌       | -        | Custom style (StyleSheet only)                  |

### DropdownMenuItemProps

| Prop            | Type                                                          | Required | Default                 | Description                                          |
| --------------- | ------------------------------------------------------------- | -------- | ----------------------- | ---------------------------------------------------- |
| `children`      | `React.ReactNode`                                             | ✅       | -                       | Item content                                         |
| `as`            | `'pressable' \| 'touchable-opacity' \| 'touchable-highlight'` | ❌       | `'touchable-highlight'` | Type of touchable component                          |
| `asChild`       | `boolean`                                                     | ❌       | `false`                 | Whether to clone the child element                   |
| `closeOnSelect` | `boolean`                                                     | ❌       | `true`                  | Close dropdown when item is selected                 |
| `disabled`      | `boolean`                                                     | ❌       | `false`                 | Whether the item is disabled                         |
| `onSelect`      | `() => void`                                                  | ❌       | -                       | Callback when item is selected                       |
| `stringProps`   | `StringProps`                                                 | ❌       | -                       | Props for String component when children is a string |
| `underlayColor` | `string`                                                      | ❌       | `'#f0f0f0'`             | Underlay color for touchable-highlight               |
| `className`     | `string`                                                      | ❌       | -                       | Custom CSS classes (NativeWind only)                 |
| `style`         | `StyleProp<ViewStyle>`                                        | ❌       | -                       | Custom style (StyleSheet only)                       |

### DropdownMenuLabelProps

| Prop          | Type                   | Required | Default | Description                                          |
| ------------- | ---------------------- | -------- | ------- | ---------------------------------------------------- |
| `children`    | `React.ReactNode`      | ✅       | -       | Label content                                        |
| `asChild`     | `boolean`              | ❌       | `false` | Whether to clone the child element                   |
| `stringProps` | `StringProps`          | ❌       | -       | Props for String component when children is a string |
| `className`   | `string`               | ❌       | -       | Custom CSS classes (NativeWind only)                 |
| `style`       | `StyleProp<ViewStyle>` | ❌       | -       | Custom style (StyleSheet only)                       |

### DropdownMenuSeparatorProps

| Prop        | Type                   | Required | Default | Description                          |
| ----------- | ---------------------- | -------- | ------- | ------------------------------------ |
| `className` | `string`               | ❌       | -       | Custom CSS classes (NativeWind only) |
| `style`     | `StyleProp<ViewStyle>` | ❌       | -       | Custom style (StyleSheet only)       |

## Examples

### Basic Dropdown Menu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button title="Open Menu" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuItem onSelect={() => console.log('Profile')}>Profile</DropdownMenuItem>
    <DropdownMenuItem onSelect={() => console.log('Settings')}>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onSelect={() => console.log('Log out')}>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Controlled Dropdown

```tsx
function ControlledDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Button title={open ? 'Close Menu' : 'Open Menu'} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => setOpen(false)}>Close</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Custom Positioning and Sizing

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button title="Custom Position" />
  </DropdownMenuTrigger>
  <DropdownMenuContent
    width={300}
    verticalPosition="top"
    horizontalPosition="left"
    offsetX={10}
    offsetY={5}
    maxHeight={150}
  >
    <DropdownMenuLabel>Custom Positioned Menu</DropdownMenuLabel>
    <DropdownMenuItem onSelect={() => console.log('Item 1')}>Item 1</DropdownMenuItem>
    <DropdownMenuItem onSelect={() => console.log('Item 2')}>Item 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Different Trigger Types

```tsx
// TouchableOpacity Trigger
<DropdownMenuTrigger as="touchable-opacity">
  <Button title="Opacity Trigger" />
</DropdownMenuTrigger>

// TouchableHighlight Trigger
<DropdownMenuTrigger as="touchable-highlight">
  <Button title="Highlight Trigger" />
</DropdownMenuTrigger>

// As Child (clones the child element)
<DropdownMenuTrigger asChild>
  <Button title="Cloned Trigger" />
</DropdownMenuTrigger>
```

### Custom Item Types

```tsx
<DropdownMenuContent>
  <DropdownMenuLabel>Actions</DropdownMenuLabel>

  {/* Pressable Item */}
  <DropdownMenuItem as="pressable" onSelect={() => console.log('Pressable')}>
    Pressable Item
  </DropdownMenuItem>

  {/* TouchableOpacity Item */}
  <DropdownMenuItem as="touchable-opacity" onSelect={() => console.log('Opacity')}>
    Opacity Item
  </DropdownMenuItem>

  {/* TouchableHighlight Item with custom underlay */}
  <DropdownMenuItem as="touchable-highlight" underlayColor="#e0e0e0" onSelect={() => console.log('Highlight')}>
    Highlight Item
  </DropdownMenuItem>

  {/* Disabled Item */}
  <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
</DropdownMenuContent>
```

### With Custom Styling

```tsx
// With NativeWind
<DropdownMenuContent className="w-64 bg-white rounded-lg shadow-lg">
  <DropdownMenuLabel className="text-gray-500 font-semibold">Account</DropdownMenuLabel>
  <DropdownMenuItem className="hover:bg-gray-100">
    Profile
  </DropdownMenuItem>
</DropdownMenuContent>

// With StyleSheet
<DropdownMenuContent
  style={{
    width: 256,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }}
>
  <DropdownMenuLabel style={{ color: '#6B7280', fontWeight: '600' }}>
    Account
  </DropdownMenuLabel>
  <DropdownMenuItem style={{ padding: 12 }}>
    Profile
  </DropdownMenuItem>
</DropdownMenuContent>
```

## Best Practices

### 1. Proper Dropdown Structure

```tsx
// ✅ Good: Proper nesting
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button title="Open" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Section</DropdownMenuLabel>
    <DropdownMenuItem onSelect={handleAction}>Action</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// ❌ Avoid: Missing DropdownMenu wrapper
<DropdownMenuTrigger>
  <Button title="Open" />
</DropdownMenuTrigger>
<DropdownMenuContent>
  <DropdownMenuItem>Action</DropdownMenuItem>
</DropdownMenuContent>
```

### 2. Controlled vs Uncontrolled

```tsx
// ✅ Good: Use controlled state when needed
const [open, setIsOpen] = useState(false);

<DropdownMenu open={open} onOpenChange={setIsOpen}>
  <DropdownMenuTrigger>
    <Button title={open ? 'Close' : 'Open'} />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={() => setIsOpen(false)}>Close</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// ✅ Good: Use uncontrolled for simple cases
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button title="Open" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={handleAction}>Action</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 3. Accessibility

```tsx
// ✅ Good: Provide meaningful content and proper callbacks
<DropdownMenuContent closeWhenInteractedOutside closeDropdownWhenSelectedItem>
  <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
  <DropdownMenuItem onSelect={handleProfile}>View Profile</DropdownMenuItem>
  <DropdownMenuItem onSelect={handleSettings}>Settings</DropdownMenuItem>
</DropdownMenuContent>
```

### 4. Styling Strategy

```tsx
// ✅ Good: Use className when NativeWind is available
<DropdownMenuContent className="w-64 bg-white rounded-lg shadow-lg">
  <DropdownMenuItem className="hover:bg-gray-100">Item</DropdownMenuItem>
</DropdownMenuContent>

// ✅ Good: Use style when NativeWind is not available
<DropdownMenuContent
  style={{
    width: 256,
    backgroundColor: 'white',
    borderRadius: 8,
  }}
>
  <DropdownMenuItem style={{ padding: 12 }}>Item</DropdownMenuItem>
</DropdownMenuContent>
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface DropdownMenuProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DropdownMenuTriggerProps {
  children: React.ReactElement<{ onPress?: () => void }>;
  as?: 'pressable' | 'touchable-opacity';
  asChild?: boolean;
  className?: string; // NativeWind only
  style?: StyleProp<ViewStyle>; // StyleSheet only
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  width?: number;
  offsetX?: number;
  offsetY?: number;
  maxHeight?: number;
  minHeight?: number;
  hasScroll?: boolean;
  hasAnimation?: boolean;
  closeDropdownWhenSelectedItem?: boolean;
  closeWhenInteractedOutside?: boolean;
  verticalPosition?: 'auto' | 'top' | 'bottom';
  horizontalPosition?: 'auto' | 'left' | 'right';
  className?: string; // NativeWind only
  style?: StyleProp<ViewStyle>; // StyleSheet only
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  as?: 'pressable' | 'touchable-opacity' | 'touchable-highlight';
  asChild?: boolean;
  closeOnSelect?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  stringProps?: StringProps;
  underlayColor?: string;
  className?: string; // NativeWind only
  style?: StyleProp<ViewStyle>; // StyleSheet only
}
```

## Performance Considerations

- **Modal Rendering**: The dropdown content is only rendered when visible
- **Context Optimization**: DropdownMenu state is optimized with useMemo and useCallback
- **Positioning**: Dynamic positioning calculations are memoized for performance
- **Styling Detection**: NativeWind detection is memoized for performance

## Dependencies

- **React Native**: Core components (Modal, Pressable, TouchableOpacity, TouchableHighlight)
- **Box**: For layout containers
- **String**: For text rendering
- **NativeWind**: For Tailwind CSS support (optional)

## Accessibility

The component supports standard accessibility features:

- **Focus Management**: Proper focus handling for keyboard navigation
- **Screen Reader**: Compatible with screen readers
- **Touch Targets**: Adequate touch target sizes for mobile accessibility
- **Interactive Elements**: Proper touchable component selection
- **State Management**: Clear open/close state communication

## Related Components

- **Button**: For trigger buttons
- **Dialog**: For modal dialogs
- **InputDropdown**: For input-based dropdowns
- **Tooltip**: For tooltip interfaces
