# Dialog Component

A comprehensive and flexible dialog/modal component for React Native applications with support for controlled/uncontrolled state, multiple trigger types, custom animations, backdrop customization, and integrated toast functionality. **Automatically detects NativeWind availability and falls back to StyleSheet if needed.**

## Features

- **Controlled/Uncontrolled State**: Support for both controlled and uncontrolled dialog state management
- **Multiple Trigger Types**: Support for different touchable components (Pressable, TouchableOpacity, RipplePressable)
- **Custom Animations**: Fade, slide, and no animation options
- **Backdrop Customization**: Custom colors, classes, and press behavior
- **Close Options**: Multiple ways to close (backdrop press, back button, close mark)
- **Toast Integration**: Built-in toast functionality with DialogToaster
- **Flexible Layout**: Default container or custom layout options
- **Compound Components**: Modular architecture with separate components for different parts
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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from 'chill-ui';

function Example() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button title="Open Dialog" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader hasCloseMark>
          <DialogTitle>Confirm Action</DialogTitle>
        </DialogHeader>
        <String>Are you sure you want to proceed?</String>
        <DialogFooter>
          <DialogClose asChild>
            <Button title="Cancel" />
          </DialogClose>
          <Button title="Confirm" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Component Structure

The Dialog component consists of several sub-components:

- **Dialog**: Root provider component that manages state and context
- **DialogTrigger**: Component that opens the dialog
- **DialogContent**: The modal content container
- **DialogHeader**: Header section with optional close mark
- **DialogTitle**: Title component for the dialog
- **DialogFooter**: Footer section for actions
- **DialogClose**: Component that closes the dialog
- **DialogToaster**: Toast functionality within the dialog

## Props

### DialogProps

| Prop           | Type                      | Required | Default | Description                              |
| -------------- | ------------------------- | -------- | ------- | ---------------------------------------- |
| `children`     | `React.ReactNode`         | ✅       | -       | Dialog content and triggers              |
| `defaultOpen`  | `boolean`                 | ❌       | `false` | Initial open state for uncontrolled mode |
| `open`         | `boolean`                 | ❌       | -       | Controlled open state                    |
| `onOpenChange` | `(open: boolean) => void` | ❌       | -       | Callback when open state changes         |
| `onOpen`       | `() => void`              | ❌       | -       | Callback when dialog opens               |
| `onClose`      | `() => void`              | ❌       | -       | Callback when dialog closes              |

### DialogTriggerProps

| Prop        | Type                                                       | Required | Default       | Description                          |
| ----------- | ---------------------------------------------------------- | -------- | ------------- | ------------------------------------ |
| `children`  | `React.ReactElement<{ onPress?: () => void }>`             | ✅       | -             | Trigger element                      |
| `as`        | `'pressable' \| 'touchable-opacity' \| 'ripple-pressable'` | ❌       | `'pressable'` | Type of touchable component          |
| `asChild`   | `boolean`                                                  | ❌       | `false`       | Whether to clone the child element   |
| `className` | `string`                                                   | ❌       | -             | Custom CSS classes (NativeWind only) |
| `style`     | `StyleProp<ViewStyle>`                                     | ❌       | -             | Custom styles (StyleSheet only)      |

### DialogContentProps

| Prop                   | Type                                     | Required | Default  | Description                                |
| ---------------------- | ---------------------------------------- | -------- | -------- | ------------------------------------------ |
| `children`             | `React.ReactNode`                        | ✅       | -        | Dialog content                             |
| `animation`            | `'fade' \| 'slide' \| 'none'`            | ❌       | `'fade'` | Animation type for the dialog              |
| `hasBackdrop`          | `boolean`                                | ❌       | `true`   | Show backdrop behind dialog                |
| `closeOnBackdropPress` | `boolean`                                | ❌       | `true`   | Close when backdrop is pressed             |
| `closeOnGoBack`        | `boolean`                                | ❌       | `true`   | Close when back button is pressed          |
| `backdropColor`        | `string`                                 | ❌       | -        | Custom backdrop color                      |
| `onRequestClose`       | `() => void`                             | ❌       | -        | Callback when dialog is requested to close |
| `useDefaultContainer`  | `boolean`                                | ❌       | `true`   | Use default white container                |
| `size`                 | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | ❌       | `'md'`   | Size variant for the dialog                |
| `className`            | `string`                                 | ❌       | -        | Custom CSS classes (NativeWind only)       |
| `style`                | `StyleProp<ViewStyle>`                   | ❌       | -        | Custom styles (StyleSheet only)            |

### DialogHeaderProps

| Prop             | Type                   | Required | Default | Description                          |
| ---------------- | ---------------------- | -------- | ------- | ------------------------------------ |
| `children`       | `React.ReactNode`      | ✅       | -       | Header content                       |
| `hasCloseMark`   | `boolean`              | ❌       | `false` | Show close button in header          |
| `closeMarkProps` | `IconProps`            | ❌       | -       | Custom close mark props              |
| `className`      | `string`               | ❌       | -       | Custom CSS classes (NativeWind only) |
| `style`          | `StyleProp<ViewStyle>` | ❌       | -       | Custom styles (StyleSheet only)      |

### DialogTitleProps

| Prop        | Type                   | Required | Default | Description                          |
| ----------- | ---------------------- | -------- | ------- | ------------------------------------ |
| `children`  | `React.ReactNode`      | ✅       | -       | Title content                        |
| `className` | `string`               | ❌       | -       | Custom CSS classes (NativeWind only) |
| `style`     | `StyleProp<ViewStyle>` | ❌       | -       | Custom styles (StyleSheet only)      |

### DialogFooterProps

| Prop        | Type                   | Required | Default | Description                          |
| ----------- | ---------------------- | -------- | ------- | ------------------------------------ |
| `children`  | `React.ReactNode`      | ✅       | -       | Footer content                       |
| `className` | `string`               | ❌       | -       | Custom CSS classes (NativeWind only) |
| `style`     | `StyleProp<ViewStyle>` | ❌       | -       | Custom styles (StyleSheet only)      |

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
    <DialogHeader>
      <DialogTitle>Basic Dialog</DialogTitle>
    </DialogHeader>
    <String>This is a basic dialog content</String>
  </DialogContent>
</Dialog>
```

### Controlled Dialog

```tsx
function ControlledDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      onOpen={() => console.log('Dialog opened')}
      onClose={() => console.log('Dialog closed')}
    >
      <DialogTrigger>
        <Button title="Open Controlled Dialog" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader hasCloseMark>
          <DialogTitle>Controlled Dialog</DialogTitle>
        </DialogHeader>
        <String>This dialog is controlled by parent state</String>
        <DialogFooter>
          <DialogClose asChild>
            <Button title="Close" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Uncontrolled Dialog

```tsx
<Dialog
  defaultOpen={false}
  onOpenChange={open => console.log('State changed:', open)}
  onOpen={() => console.log('Dialog opened')}
  onClose={() => console.log('Dialog closed')}
>
  <DialogTrigger>
    <Button title="Open Uncontrolled Dialog" />
  </DialogTrigger>
  <DialogContent>
    <DialogHeader hasCloseMark>
      <DialogTitle>Uncontrolled Dialog</DialogTitle>
    </DialogHeader>
    <String>This dialog manages its own state</String>
  </DialogContent>
</Dialog>
```

### Dialog with Custom Animation

```tsx
<Dialog>
  <DialogTrigger>
    <Button title="Slide Dialog" />
  </DialogTrigger>
  <DialogContent animation="slide">
    <DialogHeader>
      <DialogTitle>Slide Animation</DialogTitle>
    </DialogHeader>
    <String>Dialog with slide animation</String>
  </DialogContent>
</Dialog>
```

### Dialog with Custom Backdrop

```tsx
<Dialog>
  <DialogTrigger>
    <Button title="Custom Backdrop" />
  </DialogTrigger>
  <DialogContent backdropColor="rgba(0, 0, 0, 0.8)">
    <DialogHeader hasCloseMark>
      <DialogTitle>Custom Backdrop</DialogTitle>
    </DialogHeader>
    <String>Dialog with custom backdrop color</String>
  </DialogContent>
</Dialog>
```

### Dialog with Different Sizes

```tsx
// Small dialog
<DialogContent size="sm">
  <DialogHeader>
    <DialogTitle>Small Dialog</DialogTitle>
  </DialogHeader>
  <String>Compact dialog content</String>
</DialogContent>

// Large dialog
<DialogContent size="lg">
  <DialogHeader>
    <DialogTitle>Large Dialog</DialogTitle>
  </DialogHeader>
  <String>Spacious dialog content</String>
</DialogContent>

// Full screen dialog
<DialogContent size="full">
  <DialogHeader hasCloseMark>
    <DialogTitle>Full Screen Dialog</DialogTitle>
  </DialogHeader>
  <String>Full screen dialog content</String>
</DialogContent>
```

### Dialog without Default Container

```tsx
<Dialog>
  <DialogTrigger>
    <Button title="Custom Layout" />
  </DialogTrigger>
  <DialogContent useDefaultContainer={false}>
    <SafeAreaView className="bg-primary flex-1 items-center justify-center">
      <DialogHeader hasCloseMark>
        <DialogTitle>Custom Layout</DialogTitle>
      </DialogHeader>
      <String>Custom layout dialog</String>
      <DialogFooter>
        <DialogClose asChild>
          <Button title="Close" />
        </DialogClose>
      </DialogFooter>
    </SafeAreaView>
  </DialogContent>
</Dialog>
```

### Dialog with Toast Integration

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
          <DialogHeader hasCloseMark>
            <DialogTitle>Dialog with Toast</DialogTitle>
          </DialogHeader>
          <String>Dialog with toast functionality</String>
          <DialogFooter>
            <Button title="Show Toast" onPress={handleShowToast} />
            <DialogClose asChild>
              <Button title="Close" />
            </DialogClose>
          </DialogFooter>
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
<DialogContent>
  <DialogHeader hasCloseMark closeMarkProps={{ size: 24, color: 'red' }}>
    <DialogTitle>Custom Close Mark</DialogTitle>
  </DialogHeader>
  <String>Dialog with custom close mark</String>
</DialogContent>

// Or use DialogClose component
<DialogFooter>
  <DialogClose asChild>
    <Button title="Custom Close" variant="danger" />
  </DialogClose>
</DialogFooter>
```

## Styling with NativeWind vs StyleSheet

### With NativeWind (Recommended)

```tsx
<DialogContent className="mx-auto max-w-md rounded-lg bg-white shadow-lg">
  <DialogHeader className="border-b border-gray-200">
    <DialogTitle className="text-lg font-semibold">Styled Dialog</DialogTitle>
  </DialogHeader>
  <String className="p-4">Styled with Tailwind classes</String>
  <DialogFooter className="border-t border-gray-200 p-4">
    <DialogClose asChild>
      <Button title="Close" />
    </DialogClose>
  </DialogFooter>
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
  <DialogHeader style={{ borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
    <DialogTitle style={{ fontSize: 18, fontWeight: '600' }}>Styled Dialog</DialogTitle>
  </DialogHeader>
  <String style={{ padding: 16 }}>Styled with StyleSheet</String>
  <DialogFooter style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb', padding: 16 }}>
    <DialogClose asChild>
      <Button title="Close" />
    </DialogClose>
  </DialogFooter>
</DialogContent>
```

## Best Practices

### 1. Proper Dialog Structure

```tsx
// ✅ Good: Proper nesting with all components
<Dialog>
  <DialogTrigger>
    <Button title="Open" />
  </DialogTrigger>
  <DialogContent>
    <DialogHeader hasCloseMark>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <String>Dialog content</String>
    <DialogFooter>
      <DialogClose asChild>
        <Button title="Cancel" />
      </DialogClose>
      <Button title="Confirm" />
    </DialogFooter>
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

### 2. Controlled vs Uncontrolled State

```tsx
// ✅ Good: Use controlled state when you need to manage state externally
const [isOpen, setIsOpen] = useState(false);

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>...</DialogContent>
</Dialog>

// ✅ Good: Use uncontrolled state for simple cases
<Dialog defaultOpen={false}>
  <DialogContent>...</DialogContent>
</Dialog>
```

### 3. Accessibility

```tsx
// ✅ Good: Provide meaningful content and close options
<DialogContent hasBackdrop closeOnBackdropPress closeOnGoBack onRequestClose={handleClose}>
  <DialogHeader hasCloseMark>
    <DialogTitle>Accessible Dialog</DialogTitle>
  </DialogHeader>
  <String>Accessible dialog content</String>
</DialogContent>
```

### 4. Performance

```tsx
// ✅ Good: Use callbacks for state management
<Dialog
  onOpenChange={open => {
    if (open) {
      // Handle open
    } else {
      // Handle close
    }
  }}
>
  <DialogContent>...</DialogContent>
</Dialog>
```

### 5. Styling Strategy

```tsx
// ✅ Good: Use className when NativeWind is available
<DialogContent className="mx-auto max-w-md bg-white rounded-lg shadow-lg">
  <DialogHeader className="border-b border-gray-200">
    <DialogTitle className="text-lg font-semibold">Title</DialogTitle>
  </DialogHeader>
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
  <DialogHeader style={{ borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
    <DialogTitle style={{ fontSize: 18, fontWeight: '600' }}>Title</DialogTitle>
  </DialogHeader>
</DialogContent>
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface DialogProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

interface DialogContentProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide' | 'none';
  hasBackdrop?: boolean;
  closeOnBackdropPress?: boolean;
  closeOnGoBack?: boolean;
  backdropColor?: string;
  onRequestClose?: () => void;
  useDefaultContainer?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string; // NativeWind only
  style?: StyleProp<ViewStyle>; // StyleSheet only
}
```

## Performance Considerations

- **Modal Rendering**: The Modal component is only rendered when visible
- **Context Optimization**: Dialog state is optimized with useMemo and useCallback
- **Toast Integration**: ToastProvider is conditionally rendered only when needed
- **Styling Detection**: NativeWind detection is memoized for performance
- **Controlled State**: Efficient state management for both controlled and uncontrolled modes

## Dependencies

- **React Native**: Core components (Modal, Pressable, TouchableOpacity)
- **Icon**: For close mark display
- **Box**: For layout containers
- **String**: For text content
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
- **Close Options**: Multiple ways to close the dialog for better accessibility

## Migration Notes

If you're upgrading from a previous version:

- **New Props**: Added `defaultOpen`, `open`, `onOpenChange`, `onOpen`, `onClose` for better state management
- **Component Separation**: Dialog is now split into separate components (Dialog, DialogTrigger, DialogContent, etc.)
- **Removed Props**: `onShow` has been removed in favor of `onOpen`
- **Styling**: The component now automatically detects NativeWind and adapts accordingly
- **Performance**: Improved performance with better memoization and conditional rendering
