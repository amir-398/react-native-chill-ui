# Toast

A React Native component that provides animated notification messages with progress bars, customizable styling, and automatic dismissal. Features smooth animations, multiple variants, and a context-based API for easy integration.

## Features

- ✅ **Animated Notifications**: Smooth slide-in/out animations with progress bars
- ✅ **Multiple Variants**: Success, error, info, and warning toast types
- ✅ **Customizable Styling**: Full control over colors, icons, and appearance
- ✅ **Context API**: Easy-to-use hook-based API with ToastProvider
- ✅ **Progress Bar**: Visual indicator showing time until dismissal
- ✅ **Safe Area Support**: Proper positioning with safe area insets
- ✅ **Auto Dismiss**: Automatic dismissal with configurable duration
- ✅ **Position Options**: Top or bottom positioning
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Performance**: Optimized with React Native Reanimated

## Quick Start

```tsx
import { ToastProvider, useToast } from '@/components/toast';

// Wrap your app with ToastProvider
<ToastProvider>
  <App />
</ToastProvider>;

// Use toast in any component
const { toast } = useToast();

// Show different types of toasts
toast({ message: 'Success!', variant: 'success' });
toast({ message: 'Error occurred!', variant: 'error' });
toast({ message: 'Info message', variant: 'info' });
```

## Examples

### Basic Usage

```tsx
import { ToastProvider, useToast } from '@/components/toast';

const App = () => {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
};

const MainApp = () => {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({ message: 'Operation completed successfully!', variant: 'success' });
  };

  const handleError = () => {
    toast({ message: 'Something went wrong!', variant: 'error' });
  };

  const handleInfo = () => {
    toast({ message: 'Here is some information.', variant: 'info' });
  };

  const handleWarning = () => {
    toast({ message: 'Please review your input.', variant: 'warning' });
  };

  return (
    <Box className="space-y-4 p-4">
      <Button onPress={handleSuccess}>Show Success</Button>
      <Button onPress={handleError}>Show Error</Button>
      <Button onPress={handleInfo}>Show Info</Button>
      <Button onPress={handleWarning}>Show Warning</Button>
    </Box>
  );
};
```

### Custom Duration and Position

```tsx
const { toast } = useToast();

// Custom duration (5 seconds)
toast({
  message: 'This will show for 5 seconds',
  variant: 'info',
  duration: 5000,
});

// Top position
toast({
  message: 'Toast at the top',
  variant: 'success',
  position: 'top',
});

// Custom duration and position
toast({
  message: 'Custom toast',
  variant: 'warning',
  position: 'top',
  duration: 4000,
});
```

### Custom Styling

```tsx
// Custom variants in ToastProvider
<ToastProvider
  variants={{
    success: {
      backgroundColor: '#10B981',
      icon: 'check-circle-solid',
      titleColor: '#FFFFFF',
      contentColor: '#FFFFFF',
      progressBarColor: '#FFFFFF',
    },
    error: {
      backgroundColor: '#EF4444',
      icon: 'xmark-circle-solid',
      titleColor: '#FFFFFF',
      contentColor: '#FFFFFF',
      progressBarColor: '#FEE2E2',
    },
    info: {
      backgroundColor: '#3B82F6',
      icon: 'circle-info-solid',
      titleColor: '#FFFFFF',
      contentColor: '#FFFFFF',
      progressBarColor: '#DBEAFE',
    },
    warning: {
      backgroundColor: '#F59E0B',
      icon: 'warning-solid',
      titleColor: '#FFFFFF',
      contentColor: '#FFFFFF',
      progressBarColor: '#FEF3C7',
    },
  }}
>
  <App />
</ToastProvider>
```

### Custom Icons

```tsx
<ToastProvider
  variants={{
    success: {
      backgroundColor: '#10B981',
      customIcon: <CustomSuccessIcon />,
      titleColor: '#FFFFFF',
      contentColor: '#FFFFFF',
    },
    error: {
      backgroundColor: '#EF4444',
      customIcon: <CustomErrorIcon />,
      titleColor: '#FFFFFF',
      contentColor: '#FFFFFF',
    },
  }}
>
  <App />
</ToastProvider>
```

### Integration with Forms

```tsx
const LoginForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Simulate API call
      await loginUser(email, password);
      toast({
        message: 'Login successful! Welcome back.',
        variant: 'success',
      });
    } catch (error) {
      toast({
        message: 'Login failed. Please check your credentials.',
        variant: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Box className="space-y-4 p-4">
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button onPress={handleLogin}>Login</Button>
    </Box>
  );
};
```

### Error Handling

```tsx
const DataFetcher = () => {
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      toast({
        message: `Loaded ${data.length} items successfully`,
        variant: 'success',
      });
    } catch (error) {
      toast({
        message: 'Failed to load data. Please try again.',
        variant: 'error',
        duration: 6000,
      });
    }
  };

  return <Button onPress={fetchData}>Fetch Data</Button>;
};
```

## Props Reference

### ToastProvider Props

| Prop              | Type               | Default | Description                                                   |
| ----------------- | ------------------ | ------- | ------------------------------------------------------------- |
| `children`        | `ReactNode`        | -       | Child components that will have access to toast functionality |
| `defaultDuration` | `number`           | `3000`  | Default duration in milliseconds for toasts                   |
| `variants`        | `ToastVariantType` | -       | Custom styling variants for different toast types             |

### Toast Props

| Prop       | Type               | Default           | Description                                       |
| ---------- | ------------------ | ----------------- | ------------------------------------------------- |
| `variants` | `ToastVariantType` | `defaultVariants` | Custom styling variants for different toast types |

### useToast Hook

| Return  | Type                           | Description                          |
| ------- | ------------------------------ | ------------------------------------ |
| `toast` | `(params: ToastProps) => void` | Function to show toast notifications |

### ToastProps (for toast function)

| Prop       | Type                                          | Default           | Description                                  |
| ---------- | --------------------------------------------- | ----------------- | -------------------------------------------- |
| `message`  | `string`                                      | -                 | Message to display in the toast              |
| `variant`  | `'success' \| 'error' \| 'info' \| 'warning'` | `'info'`          | Type of toast to display                     |
| `position` | `'top' \| 'bottom'`                           | `'bottom'`        | Position of the toast                        |
| `duration` | `number`                                      | `defaultDuration` | Duration in milliseconds before auto-dismiss |

### ToastVariantType

| Property  | Type                | Description                |
| --------- | ------------------- | -------------------------- |
| `success` | `ToastVariantProps` | Styling for success toasts |
| `error`   | `ToastVariantProps` | Styling for error toasts   |
| `info`    | `ToastVariantProps` | Styling for info toasts    |
| `warning` | `ToastVariantProps` | Styling for warning toasts |

### ToastVariantProps

| Prop               | Type        | Description                   |
| ------------------ | ----------- | ----------------------------- |
| `backgroundColor`  | `string`    | Background color of the toast |
| `contentColor`     | `string`    | Color of the message text     |
| `icon`             | `string`    | Icon name to display          |
| `customIcon`       | `ReactNode` | Custom icon component         |
| `titleColor`       | `string`    | Color of the title text       |
| `progressBarColor` | `string`    | Color of the progress bar     |

## Best Practices

### 1. Use Appropriate Variants

```tsx
// ✅ Good - Semantic variant usage
toast({ message: 'Operation completed successfully!', variant: 'success' });
toast({ message: 'An error occurred', variant: 'error' });
toast({ message: 'Please review your input', variant: 'warning' });
toast({ message: 'Here is some information', variant: 'info' });

// ❌ Avoid - Wrong variant for message type
toast({ message: 'Error occurred!', variant: 'success' });
toast({ message: 'Success!', variant: 'error' });
```

### 2. Keep Messages Concise

```tsx
// ✅ Good - Clear and concise messages
toast({ message: 'Profile updated successfully', variant: 'success' });
toast({ message: 'Please check your internet connection', variant: 'error' });

// ❌ Avoid - Long, verbose messages
toast({
  message:
    'Your profile has been successfully updated and all changes have been saved to our database. You can now continue using the application with your new profile settings.',
  variant: 'success',
});
```

### 3. Use Appropriate Duration

```tsx
// ✅ Good - Appropriate duration for message importance
toast({ message: 'Success!', variant: 'success', duration: 3000 }); // Quick success
toast({ message: 'Error occurred', variant: 'error', duration: 5000 }); // Longer for errors
toast({ message: 'Important info', variant: 'info', duration: 4000 }); // Medium for info

// ❌ Avoid - Too short or too long
toast({ message: 'Error!', variant: 'error', duration: 1000 }); // Too short for error
toast({ message: 'Success!', variant: 'success', duration: 10000 }); // Too long for success
```

### 4. Consider Position Based on Context

```tsx
// ✅ Good - Appropriate position for context
toast({ message: 'Form submitted', variant: 'success', position: 'bottom' }); // Bottom for forms
toast({ message: 'New message received', variant: 'info', position: 'top' }); // Top for notifications

// ❌ Avoid - Inconsistent positioning
toast({ message: 'Error!', variant: 'error', position: 'top' }); // When user expects bottom
```

### 5. Handle Multiple Toasts Appropriately

```tsx
// ✅ Good - Toast system handles multiple calls automatically
const handleMultipleActions = () => {
  toast({ message: 'Action 1 completed', variant: 'success' });
  // Second toast will wait for first to complete
  setTimeout(() => {
    toast({ message: 'Action 2 completed', variant: 'success' });
  }, 1000);
};

// ❌ Avoid - Don't spam multiple toasts
const handleSpam = () => {
  for (let i = 0; i < 10; i++) {
    toast({ message: `Toast ${i}`, variant: 'info' });
  }
};
```

## Advanced Usage

### Custom Toast Component

```tsx
// Create a custom toast component
const CustomToast = () => {
  const toastRef = useRef<ToastRef>(null);

  const showCustomToast = (message: string) => {
    toastRef.current?.showToast(message, 'info', 'bottom', 4000);
  };

  return (
    <>
      <Button onPress={() => showCustomToast('Custom toast!')}>Show Custom Toast</Button>
      <Toast
        ref={toastRef}
        variants={{
          info: {
            backgroundColor: '#6366F1',
            icon: 'star-solid',
            titleColor: '#FFFFFF',
            contentColor: '#FFFFFF',
          },
        }}
      />
    </>
  );
};
```

### Toast with Actions

```tsx
// Custom toast with action buttons
const ActionToast = () => {
  const { toast } = useToast();

  const showActionToast = () => {
    // Note: This is a conceptual example - actual implementation would require custom toast component
    toast({
      message: 'File uploaded. Undo?',
      variant: 'success',
      duration: 6000,
    });
  };

  return <Button onPress={showActionToast}>Show Action Toast</Button>;
};
```

### Toast Queue Management

```tsx
const ToastManager = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const processWithToasts = async () => {
    setIsProcessing(true);

    toast({ message: 'Starting process...', variant: 'info' });

    try {
      await step1();
      toast({ message: 'Step 1 completed', variant: 'success' });

      await step2();
      toast({ message: 'Step 2 completed', variant: 'success' });

      await step3();
      toast({ message: 'Process completed!', variant: 'success' });
    } catch (error) {
      toast({ message: 'Process failed', variant: 'error', duration: 5000 });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button onPress={processWithToasts} disabled={isProcessing}>
      {isProcessing ? 'Processing...' : 'Start Process'}
    </Button>
  );
};
```

### Performance Optimization

```tsx
import React from 'react';
import { ToastProvider } from '@/components/toast';

// Memoized toast provider for performance
const MemoizedToastProvider = React.memo(({ children, variants }) => (
  <ToastProvider variants={variants}>{children}</ToastProvider>
));

// Usage
<MemoizedToastProvider variants={customVariants}>
  <App />
</MemoizedToastProvider>;
```

## Performance Considerations

- **Animated Components**: Uses React Native Reanimated for smooth performance
- **Context Optimization**: Memoized context value to prevent unnecessary re-renders
- **Single Toast**: Only one toast can be displayed at a time to prevent UI clutter
- **Memory Management**: Proper cleanup of animations and timers

## Accessibility

The Toast component includes accessibility features:

- **Screen reader support**: Proper accessibility labels and hints
- **Visual feedback**: Clear visual indicators for different toast types
- **Auto-dismiss**: Automatic dismissal to prevent blocking the interface
- **Safe area support**: Proper positioning that respects device safe areas

### Accessibility Best Practices

```tsx
// Always provide meaningful messages
toast({
  message: 'Your profile has been successfully updated',
  variant: 'success',
});

// Use appropriate variants for message types
toast({
  message: 'Please check your internet connection and try again',
  variant: 'error',
});

// Consider duration for accessibility
toast({
  message: 'Important system message',
  variant: 'warning',
  duration: 5000, // Longer duration for important messages
});
```

## Troubleshooting

### Common Issues

1. **Toast not showing**: Ensure ToastProvider wraps your component
2. **Multiple toasts not working**: Only one toast can be displayed at a time
3. **Styling not applying**: Check variants object structure
4. **Position issues**: Verify safe area insets are properly configured
5. **Performance issues**: Ensure proper memoization for frequently re-rendered components

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

const { toast } = useToast();

const showDebugToast = () => {
  const toastInfo = {
    message: 'Debug toast',
    variant: 'info' as const,
    position: 'bottom' as const,
    duration: 3000,
    timestamp: Date.now(),
  };

  setDebugInfo(toastInfo);
  toast(toastInfo);
};

<Box className="space-y-4 p-4">
  <Button onPress={showDebugToast}>Show Debug Toast</Button>

  {debugInfo.message && (
    <Box className="rounded bg-gray-100 p-4">
      <String size="sm">Debug: {JSON.stringify(debugInfo)}</String>
    </Box>
  )}
</Box>;
```

## Migration from Other Libraries

### From react-native-toast-message

```tsx
// Old (react-native-toast-message)
import Toast from 'react-native-toast-message';

Toast.show({
  type: 'success',
  text1: 'Success',
  text2: 'Operation completed',
});

// New (Toast)
const { toast } = useToast();

toast({
  message: 'Operation completed',
  variant: 'success',
});
```

### From custom toast implementation

```tsx
// Old (custom implementation)
const showToast = (message, type) => {
  setToastMessage(message);
  setToastType(type);
  setToastVisible(true);
  setTimeout(() => setToastVisible(false), 3000);
};

// New (Toast)
const { toast } = useToast();

toast({
  message: 'Your message',
  variant: 'success',
});
```
