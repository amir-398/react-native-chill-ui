# Dialog Component

A comprehensive and flexible dialog/modal component for React Native applications with support for multiple trigger types, custom animations, backdrop customization, and integrated toast functionality.

## Features

- **Multiple Trigger Types**: Support for different touchable components (Pressable, TouchableOpacity, RipplePressable)
- **Custom Animations**: Fade, slide, and no animation options
- **Backdrop Customization**: Custom colors, classes, and press behavior
- **Close Options**: Multiple ways to close (backdrop press, back button, close mark)
- **Toast Integration**: Built-in toast functionality with DialogToaster
- **Flexible Layout**: Default container or custom layout options
- **TypeScript**: Complete type safety with proper interfaces
- **Accessibility**: Proper focus management and screen reader support

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

| Prop        | Type                                                       | Required | Default       | Description                        |
| ----------- | ---------------------------------------------------------- | -------- | ------------- | ---------------------------------- |
| `children`  | `React.ReactElement<{ onPress?: () => void }>`             | ✅       | -             | Trigger element                    |
| `as`        | `'pressable' \| 'touchable-opacity' \| 'ripple-pressable'` | ❌       | `'pressable'` | Type of touchable component        |
| `asChild`   | `boolean`                                                  | ❌       | `false`       | Whether to clone the child element |
| `className` | `string`                                                   | ❌       | -             | Custom CSS classes                 |

### DialogContentProps

| Prop                   | Type                          | Required | Default   | Description                                |
| ---------------------- | ----------------------------- | -------- | --------- | ------------------------------------------ |
| `children`             | `React.ReactNode`             | ✅       | -         | Dialog content                             |
| `animation`            | `'fade' \| 'slide' \| 'none'` | ❌       | `'fade'`  | Animation type for the dialog              |
| `hasOverlay`           | `boolean`                     | ❌       | `true`    | Show overlay behind the dialog             |
| `hasCloseMark`         | `boolean`                     | ❌       | `false`   | Show close button in top corner            |
| `useDefaultContainer`  | `boolean`                     | ❌       | `true`    | Use default white container                |
| `defaultOpen`          | `boolean`                     | ❌       | -         | Initial open state                         |
| `closeOnBackdropPress` | `boolean`                     | ❌       | `true`    | Close when backdrop is pressed             |
| `closeOnGoBack`        | `boolean`                     | ❌       | `true`    | Close when back button is pressed          |
| `backdropColor`        | `string`                      | ❌       | -         | Custom backdrop color                      |
| `backdropClassName`    | `string`                      | ❌       | -         | Custom backdrop CSS classes                |
| `closeMarkColor`       | `string`                      | ❌       | -         | Color of the close mark                    |
| `closeMarkSize`        | `IconSizeVr['size']`          | ❌       | `'sm'`    | Size of the close mark                     |
| `closeMarkPosition`    | `'right' \| 'left'`           | ❌       | `'right'` | Position of the close mark                 |
| `closeMarkClassName`   | `string`                      | ❌       | -         | Custom close mark CSS classes              |
| `className`            | `string`                      | ❌       | -         | Custom dialog content CSS classes          |
| `onOpenChange`         | `(open: boolean) => void`     | ❌       | -         | Callback when open state changes           |
| `onRequestClose`       | `() => void`                  | ❌       | -         | Callback when dialog is requested to close |
| `onShow`               | `() => void`                  | ❌       | -         | Callback when dialog is shown              |

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
  <DialogContent backdropColor="rgba(0, 0, 0, 0.8)" backdropClassName="custom-backdrop">
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
<DialogContent hasCloseMark closeMarkPosition="left" closeMarkSize="lg">
  <String>Dialog with custom close mark</String>
</DialogContent>

// Or use DialogClose component
<DialogClose asChild>
  <Button title="Custom Close" variant="danger" />
</DialogClose>
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

### 4. Custom Styling

```tsx
// ✅ Good: Use custom classes for specific styling
<DialogContent
  className="mx-auto max-w-md"
  backdropClassName="bg-black/75"
  closeMarkClassName="bg-white rounded-full p-1"
>
  <String>Custom styled dialog</String>
</DialogContent>
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface DialogProps {
  children: React.ReactNode;
}

interface DialogContentProps {
  className?: string;
  onShow?: () => void;
  hasOverlay?: boolean;
  defaultOpen?: boolean;
  hasCloseMark?: boolean;
  backdropColor?: string;
  closeOnGoBack?: boolean;
  closeMarkColor?: string;
  children: React.ReactNode;
  backdropClassName?: string;
  onRequestClose?: () => void;
  closeMarkClassName?: string;
  useDefaultContainer?: boolean;
  closeOnBackdropPress?: boolean;
  closeMarkPosition?: 'right' | 'left';
  animation?: 'fade' | 'slide' | 'none';
  onOpenChange?: (open: boolean) => void;
  closeMarkSize?: IconSizeVr['size'];
}
```

## Performance Considerations

- **Modal Rendering**: The Modal component is only rendered when visible
- **Context Optimization**: Dialog state is optimized with useMemo and useCallback
- **Toast Integration**: ToastProvider is conditionally rendered only when needed

## Dependencies

- **React Native**: Core components (Modal, Pressable, TouchableOpacity)
- **Icon**: For close mark display
- **Box**: For layout containers
- **Toast**: For integrated toast functionality
- **RipplePressable**: For ripple effect triggers

## Accessibility

The component supports standard accessibility features:

- **Focus Management**: Proper focus handling for keyboard navigation
- **Screen Reader**: Compatible with screen readers
- **Touch Targets**: Adequate touch target sizes for mobile accessibility
- **Back Button**: Proper handling of device back button
- **Backdrop Interaction**: Configurable backdrop press behavior
