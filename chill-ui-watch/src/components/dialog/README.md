# Dialog Component

A comprehensive and flexible dialog/modal component for React Native applications with support for multiple trigger types, custom animations, backdrop customization, and integrated toast functionality. **Automatically detects NativeWind availability and falls back to StyleSheet if needed.**

## Features

- **Multiple Trigger Types**: Support for different touchable components (Pressable, TouchableOpacity, RipplePressable)
- **Custom Animations**: Fade, slide, and no animation options
- **Backdrop Customization**: Custom colors, classes, and press behavior
- **Close Options**: Multiple ways to close (backdrop press, back button, close mark)
- **Toast Integration**: Built-in toast functionality with DialogToaster
- **Flexible Layout**: Default container or custom layout options
- **TypeScript**: Complete type safety with proper interfaces
- **Accessibility**: Proper focus management and screen reader support
- **NativeWind Compatible**: Automatically adapts to NativeWind or StyleSheet environments
- **Smart Styling**: Uses Tailwind classes when NativeWind is available, falls back to StyleSheet otherwise

## NativeWind Compatibility

The Dialog component automatically detects whether NativeWind is installed in your project:

- **With NativeWind**: Uses Tailwind CSS classes via the `className` prop for styling
- **Without NativeWind**: Falls back to StyleSheet-based styling with the `style` prop

**Note**: The `className` prop is only available when NativeWind is installed. When using StyleSheet, use the `style` prop instead.

## Basic Usage

```tsx
import { Dialog, DialogContent, DialogTrigger } from 'chill-ui';

function Example() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button title="Open Dialog" />
      </DialogTrigger>
      <DialogContent>
        <String>This is a dialog content</String>
      </DialogContent>
    </Dialog>
  );
}
```

## Component Structure

The Dialog component consists of several sub-components:

- **Dialog**: Root provider component
- **DialogTrigger**: Component that opens the dialog
- **DialogContent**: The modal content container
- **DialogClose**: Component that closes the dialog
- **DialogToaster**: Toast functionality within the dialog

## Props

### DialogProps

| Prop       | Type              | Required | Default | Description                 |
| ---------- | ----------------- | -------- | ------- | --------------------------- |
| `children` | `React.ReactNode` | ✅       | -       | Dialog content and triggers |

### DialogTriggerProps

| Prop        | Type                                                       | Required | Default       | Description                          |
| ----------- | ---------------------------------------------------------- | -------- | ------------- | ------------------------------------ |
| `children`  | `React.ReactElement<{ onPress?: () => void }>`             | ✅       | -             | Trigger element                      |
| `as`        | `'pressable' \| 'touchable-opacity' \| 'ripple-pressable'` | ❌       | `'pressable'` | Type of touchable component          |
| `asChild`   | `boolean`                                                  | ❌       | `false`       | Whether to clone the child element   |
| `className` | `string`                                                   | ❌       | -             | Custom CSS classes (NativeWind only) |

### DialogContentProps

| Prop                   | Type                          | Required | Default  | Description                       |
| ---------------------- | ----------------------------- | -------- | -------- | --------------------------------- |
| `children`             | `React.ReactNode`             | ✅       | -        | Dialog content                    |
| `animation`            | `'fade' \| 'slide' \| 'none'` | ❌       | `'fade'` | Animation type for the dialog     |
| `hasOverlay`           | `boolean`                     | ❌       | `true`   | Show overlay behind the dialog    |
| `hasCloseMark`         | `boolean`                     | ❌       | `false`  | Show close button in top corner   |
| `useDefaultContainer`  | `boolean`                     | ❌       | `true`   | Use default white container       |
| `defaultOpen`          | `boolean`                     | ❌       | -        | Initial open state                |
| `closeOnBackdropPress` | `boolean`                     | ❌       | `true`   | Close when backdrop is pressed    |
| `closeOnGoBack`        | `boolean`                     | ❌       | `true`   | Close when back button is pressed |
| `backdropColor`        | `string`                      | ❌       | -        | Custom backdrop color             |

| `closeMarkPosition` | `'right' \| 'left'` | ❌ | `'right'` | Position of the close mark |
| `className` | `string` | ❌ | - | Custom dialog content CSS classes (NativeWind only) |
| `onOpenChange` | `(open: boolean) => void` | ❌ | - | Callback when open state changes |
| `onRequestClose` | `() => void` | ❌ | - | Callback when dialog is requested to close |
| `onShow` | `() => void` | ❌ | - | Callback when dialog is shown |
| `rounded` | `'sm' \| 'md' \| 'lg' \| 'xl'` | ❌ | `'lg'` | Border radius variant for the dialog |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | ❌ | `'md'` | Size variant for the dialog |
| `style` | `StyleProp<ViewStyle>` | ❌ | - | Additional inline styles (StyleSheet only) |
| `closeMarkProps` | `IconProps` | ❌ | - | Custom close mark props |

### DialogCloseProps

| Prop       | Type                                                       | Required | Default       | Description                        |
| ---------- | ---------------------------------------------------------- | -------- | ------------- | ---------------------------------- |
| `children` | `React.ReactElement<{ onPress?: () => void }>`             | ✅       | -             | Close trigger element              |
| `as`       | `'pressable' \| 'touchable-opacity' \| 'ripple-pressable'` | ❌       | `'pressable'` | Type of touchable component        |
| `asChild`  | `boolean`                                                  | ❌       | `false`       | Whether to clone the child element |

## Examples

### Basic Dialog

```tsx
<Dialog>
  <DialogTrigger>
    <Button title="Open Dialog" />
  </DialogTrigger>
  <DialogContent>
    <String>This is a basic dialog content</String>
  </DialogContent>
</Dialog>
```

### Dialog with Close Mark

```tsx
<Dialog>
  <DialogTrigger>
    <Button title="Open Dialog" />
  </DialogTrigger>
  <DialogContent hasCloseMark>
    <String>Dialog with close button in top right</String>
  </DialogContent>
</Dialog>
```

### Custom Animation

```tsx
<Dialog>
  <DialogTrigger>
    <Button title="Slide Dialog" />
  </DialogTrigger>
  <DialogContent animation="slide">
    <String>Dialog with slide animation</String>
  </DialogContent>
</Dialog>
```

### Custom Backdrop

```tsx
<Dialog>
  <DialogTrigger>
    <Button title="Custom Backdrop" />
  </DialogTrigger>
  <DialogContent backdropColor="rgba(0, 0, 0, 0.8)">
    <String>Dialog with custom backdrop</String>
  </DialogContent>
</Dialog>
```

### Without Default Container

```tsx
<Dialog>
  <DialogTrigger>
    <Button title="Custom Layout" />
  </DialogTrigger>
  <DialogContent useDefaultContainer={false}>
    <SafeAreaView className="bg-primary flex-1 items-center justify-center">
      <String>Custom layout dialog</String>
      <DialogClose asChild>
        <Button title="Close" />
      </DialogClose>
    </SafeAreaView>
  </DialogContent>
</Dialog>
```

### With Toast Integration

```tsx
function DialogWithToast() {
  const toasterRef = useRef<DialogToasterRef>(null);

  const handleShowToast = () => {
    toasterRef.current?.showToast({
      message: 'Hello from dialog!',
      position: 'top',
      variant: 'success',
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button title="Dialog with Toast" />
      </DialogTrigger>
      <DialogContent useDefaultContainer={false}>
        <DialogToaster ref={toasterRef} />
        <SafeAreaView className="bg-primary flex-1 items-center justify-center">
          <String>Dialog with toast functionality</String>
          <Button title="Show Toast" onPress={handleShowToast} />
          <DialogClose asChild>
            <Button title="Close" />
          </DialogClose>
        </SafeAreaView>
      </DialogContent>
    </Dialog>
  );
}
```

### Custom Trigger Types

```tsx
// Ripple Pressable Trigger
<DialogTrigger as="ripple-pressable">
  <Button title="Ripple Trigger" />
</DialogTrigger>

// Touchable Opacity Trigger
<DialogTrigger as="touchable-opacity">
  <Button title="Touchable Trigger" />
</DialogTrigger>

// As Child (clones the child element)
<DialogTrigger asChild>
  <Button title="Cloned Trigger" />
</DialogTrigger>
```

### Custom Close Button

```tsx
<DialogContent hasCloseMark closeMarkPosition="left">
  <String>Dialog with custom close mark</String>
</DialogContent>

// Or use DialogClose component
<DialogClose asChild>
  <Button title="Custom Close" variant="danger" />
</DialogClose>
```

## Styling with NativeWind vs StyleSheet

### With NativeWind (Recommended)

```tsx
<DialogContent className="mx-auto max-w-md rounded-lg bg-white shadow-lg">
  <String>Styled with Tailwind classes</String>
</DialogContent>
```

### Without NativeWind (Fallback)

```tsx
<DialogContent
  style={{
    marginHorizontal: 'auto',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }}
>
  <String>Styled with StyleSheet</String>
</DialogContent>
```

## Best Practices

### 1. Proper Dialog Structure

```tsx
// ✅ Good: Proper nesting
<Dialog>
  <DialogTrigger>
    <Button title="Open" />
  </DialogTrigger>
  <DialogContent>
    <String>Content</String>
  </DialogContent>
</Dialog>

// ❌ Avoid: Missing Dialog wrapper
<DialogTrigger>
  <Button title="Open" />
</DialogTrigger>
<DialogContent>
  <String>Content</String>
</DialogContent>
```

### 2. Accessibility

```tsx
// ✅ Good: Provide meaningful content and close options
<DialogContent hasCloseMark closeOnBackdropPress closeOnGoBack onRequestClose={handleClose}>
  <String>Accessible dialog content</String>
</DialogContent>
```

### 3. Performance

```tsx
// ✅ Good: Use onOpenChange for controlled state
const [isOpen, setIsOpen] = useState(false);

<DialogContent onOpenChange={setIsOpen} defaultOpen={isOpen}>
  <String>Controlled dialog</String>
</DialogContent>;
```

### 4. Styling Strategy

```tsx
// ✅ Good: Use className when NativeWind is available
<DialogContent
  className="mx-auto max-w-md bg-white rounded-lg shadow-lg"
>
  <String>NativeWind styling</String>
</DialogContent>

// ✅ Good: Use style when NativeWind is not available
<DialogContent
  style={{
    marginHorizontal: 'auto',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 8,
  }}
>
  <String>StyleSheet styling</String>
</DialogContent>
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface DialogProps {
  children: React.ReactNode;
}

interface DialogContentProps {
  className?: string; // NativeWind only
  onShow?: () => void;
  hasOverlay?: boolean;
  defaultOpen?: boolean;
  hasCloseMark?: boolean;
  backdropColor?: string;
  closeOnGoBack?: boolean;
  children: React.ReactNode;
  onRequestClose?: () => void;
  useDefaultContainer?: boolean;
  closeOnBackdropPress?: boolean;
  closeMarkPosition?: 'right' | 'left';
  animation?: 'fade' | 'slide' | 'none';
  onOpenChange?: (open: boolean) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
  style?: StyleProp<ViewStyle>; // StyleSheet only
  closeMarkProps?: IconProps;
}
```

## Performance Considerations

- **Modal Rendering**: The Modal component is only rendered when visible
- **Context Optimization**: Dialog state is optimized with useMemo and useCallback
- **Toast Integration**: ToastProvider is conditionally rendered only when needed
- **Styling Detection**: NativeWind detection is memoized for performance

## Dependencies

- **React Native**: Core components (Modal, Pressable, TouchableOpacity)
- **Icon**: For close mark display
- **Box**: For layout containers
- **Toast**: For integrated toast functionality
- **RipplePressable**: For ripple effect triggers
- **NativeWind**: For Tailwind CSS support (optional)

## Accessibility

The component supports standard accessibility features:

- **Focus Management**: Proper focus handling for keyboard navigation
- **Screen Reader**: Compatible with screen readers
- **Touch Targets**: Adequate touch target sizes for mobile accessibility
- **Back Button**: Proper handling of device back button
- **Backdrop Interaction**: Configurable backdrop press behavior

## Migration Notes

If you're upgrading from a previous version:

- **Removed props**: `closeMarkColor`, `closeMarkSize`, `closeMarkClassName` have been removed
- **Added props**: `rounded` and `size` variants for better styling control
- **Styling**: The component now automatically detects NativeWind and adapts accordingly
- **Performance**: Improved performance with better memoization and conditional rendering
