# Tooltip

A React Native component that provides contextual information through press interactions. Features automatic positioning, customizable styling, and smooth animations with advanced geometry calculations.

## Features

- ✅ **Press Interaction**: Tooltip appears on press in/out events
- ✅ **Automatic Positioning**: Smart positioning with automatic side detection
- ✅ **Custom Content**: Support for both text and custom React components
- ✅ **Multiple Sides**: Top, bottom, left, right, and center positioning
- ✅ **Geometry Calculations**: Advanced positioning with arrow and offset support
- ✅ **Customizable Styling**: Full control over colors, sizes, and appearance
- ✅ **Accessibility**: Built-in accessibility features and screen reader support
- ✅ **Modal Support**: Optional modal overlay for better visibility
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Performance**: Optimized with proper cleanup and memory management

## Quick Start

```tsx
import Tooltip from '@/components/tooltip/Tooltip';

// Basic tooltip with text
<Tooltip title="This is a helpful tooltip">
  <Button>Hover me</Button>
</Tooltip>

// Custom content tooltip
<Tooltip content={<CustomTooltipContent />}>
  <Icon name="info-circle" />
</Tooltip>

// Customized tooltip
<Tooltip
  title="Custom tooltip"
  textColor="#FFFFFF"
  textSize="lg"
  backgroundColor="#1F2937"
  side="top"
>
  <Button>Custom Tooltip</Button>
</Tooltip>
```

## Examples

### Basic Usage

```tsx
import Tooltip from '@/components/tooltip/Tooltip';

const BasicTooltip = () => {
  return (
    <Box className="space-y-4 p-4">
      <Tooltip title="This is a helpful tooltip">
        <Button>Hover me</Button>
      </Tooltip>

      <Tooltip title="Information about this icon">
        <Icon name="info-circle" size="lg" />
      </Tooltip>
    </Box>
  );
};
```

### Different Positions

```tsx
const PositionedTooltips = () => {
  return (
    <Box className="space-y-4 p-4">
      <Tooltip title="Top tooltip" side="top">
        <Button>Top</Button>
      </Tooltip>

      <Tooltip title="Bottom tooltip" side="bottom">
        <Button>Bottom</Button>
      </Tooltip>

      <Tooltip title="Left tooltip" side="left">
        <Button>Left</Button>
      </Tooltip>

      <Tooltip title="Right tooltip" side="right">
        <Button>Right</Button>
      </Tooltip>

      <Tooltip title="Center tooltip" side="center">
        <Button>Center</Button>
      </Tooltip>
    </Box>
  );
};
```

### Custom Content

```tsx
const CustomContentTooltip = () => {
  const CustomContent = () => (
    <Box className="rounded-lg bg-blue-500 p-3">
      <String color="#FFFFFF" weight="bold" className="mb-2">
        Custom Tooltip
      </String>
      <String color="#FFFFFF" size="sm">
        This is a custom tooltip with multiple lines and styling.
      </String>
    </Box>
  );

  return (
    <Tooltip content={<CustomContent />}>
      <Icon name="star" size="lg" />
    </Tooltip>
  );
};
```

### Custom Styling

```tsx
const StyledTooltip = () => {
  return (
    <Box className="space-y-4 p-4">
      {/* Dark theme tooltip */}
      <Tooltip
        title="Dark tooltip"
        textColor="#FFFFFF"
        textSize="lg"
        backgroundColor="#1F2937"
        arrowColor="#1F2937"
        side="top"
      >
        <Button>Dark Theme</Button>
      </Tooltip>

      {/* Colored tooltip */}
      <Tooltip title="Success message" textColor="#FFFFFF" backgroundColor="#10B981" arrowColor="#10B981" side="bottom">
        <Button>Success</Button>
      </Tooltip>

      {/* Warning tooltip */}
      <Tooltip title="Warning message" textColor="#FFFFFF" backgroundColor="#F59E0B" arrowColor="#F59E0B" side="left">
        <Button>Warning</Button>
      </Tooltip>
    </Box>
  );
};
```

### Advanced Configuration

```tsx
const AdvancedTooltip = () => {
  return (
    <Tooltip
      title="Advanced tooltip with custom settings"
      textColor="#FFFFFF"
      textSize="md"
      backgroundColor="#6366F1"
      arrowColor="#6366F1"
      side="top"
      sideOffset={10}
      displayInsets={{ top: 50, bottom: 50, left: 20, right: 20 }}
      closeOnBackgroundInteraction={true}
      closeOnChildInteraction={false}
      useReactNativeModal={true}
    >
      <Button>Advanced</Button>
    </Tooltip>
  );
};
```

### Form Help Tooltips

```tsx
const FormWithTooltips = () => {
  return (
    <Box className="space-y-4 p-4">
      <Box className="space-y-2">
        <Box className="flex-row items-center gap-2">
          <String>Email</String>
          <Tooltip title="Enter your email address for account verification">
            <Icon name="question-circle" size="sm" />
          </Tooltip>
        </Box>
        <Input placeholder="Enter email" />
      </Box>

      <Box className="space-y-2">
        <Box className="flex-row items-center gap-2">
          <String>Password</String>
          <Tooltip title="Password must be at least 8 characters with uppercase, lowercase, and number">
            <Icon name="question-circle" size="sm" />
          </Tooltip>
        </Box>
        <Input placeholder="Enter password" secureTextEntry />
      </Box>
    </Box>
  );
};
```

### Interactive Tooltips

```tsx
const InteractiveTooltip = () => {
  const [count, setCount] = useState(0);

  const InteractiveContent = () => (
    <Box className="rounded-lg bg-gray-800 p-3">
      <String color="#FFFFFF" className="mb-2">
        Clicked {count} times
      </String>
      <Button onPress={() => setCount(count + 1)} className="bg-blue-500">
        Increment
      </Button>
    </Box>
  );

  return (
    <Tooltip content={<InteractiveContent />}>
      <Button>Interactive Tooltip</Button>
    </Tooltip>
  );
};
```

## Props Reference

### TooltipProps

| Prop                           | Type                                                 | Default                     | Description                                 |
| ------------------------------ | ---------------------------------------------------- | --------------------------- | ------------------------------------------- |
| `children`                     | `ReactNode`                                          | -                           | Child component that triggers the tooltip   |
| `content`                      | `ReactNode`                                          | -                           | Custom content to display (overrides title) |
| `textColor`                    | `string`                                             | `'#000'`                    | Color of the tooltip text                   |
| `textSize`                     | `string`                                             | `'md'`                      | Size of the tooltip text                    |
| `title`                        | `string`                                             | -                           | Text content for the tooltip                |
| `accessible`                   | `boolean`                                            | `true`                      | Whether the tooltip is accessible           |
| `allowChildInteraction`        | `boolean`                                            | `true`                      | Allow interaction with child component      |
| `arrowColor`                   | `string`                                             | `''`                        | Color of the tooltip arrow                  |
| `arrowSize`                    | `Size`                                               | `new Size(16, 8)`           | Size of the tooltip arrow                   |
| `backgroundColor`              | `string`                                             | `''`                        | Background color of the tooltip             |
| `className`                    | `string`                                             | `''`                        | Custom CSS classes for the tooltip          |
| `classNameWrapper`             | `string`                                             | `''`                        | Custom CSS classes for the wrapper          |
| `closeOnBackgroundInteraction` | `boolean`                                            | `true`                      | Close tooltip on background press           |
| `closeOnChildInteraction`      | `boolean`                                            | `true`                      | Close tooltip on child press                |
| `closeOnContentInteraction`    | `boolean`                                            | `true`                      | Close tooltip on content press              |
| `disableShadow`                | `boolean`                                            | `false`                     | Disable shadow on tooltip                   |
| `displayInsets`                | `DisplayInsets`                                      | `{}`                        | Display insets for positioning              |
| `horizontalAdjustment`         | `number`                                             | `0`                         | Horizontal adjustment offset                |
| `isVisible`                    | `boolean`                                            | `false`                     | Whether the tooltip is visible              |
| `modalComponent`               | `ComponentType`                                      | `Modal`                     | Modal component to use                      |
| `onClose`                      | `() => void`                                         | `() => {}`                  | Callback when tooltip closes                |
| `overlayColor`                 | `string`                                             | `''`                        | Color of the overlay background             |
| `showChildInTooltip`           | `boolean`                                            | `true`                      | Show child component in tooltip             |
| `side`                         | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'`                  | Position of the tooltip                     |
| `sideOffset`                   | `number`                                             | `0`                         | Offset from the specified side              |
| `supportedOrientations`        | `string[]`                                           | `['portrait', 'landscape']` | Supported orientations                      |
| `useInteractionManager`        | `boolean`                                            | `false`                     | Use InteractionManager for timing           |
| `useReactNativeModal`          | `boolean`                                            | `true`                      | Use React Native Modal                      |

### DisplayInsets

| Prop     | Type     | Default | Description                  |
| -------- | -------- | ------- | ---------------------------- |
| `top`    | `number` | `24`    | Top inset for positioning    |
| `bottom` | `number` | `24`    | Bottom inset for positioning |
| `left`   | `number` | `24`    | Left inset for positioning   |
| `right`  | `number` | `24`    | Right inset for positioning  |

## Best Practices

### 1. Use Appropriate Content

```tsx
// ✅ Good - Concise and helpful tooltips
<Tooltip title="Save your changes">
  <Button>Save</Button>
</Tooltip>

<Tooltip title="Delete this item permanently">
  <Button>Delete</Button>
</Tooltip>

// ❌ Avoid - Too verbose or unhelpful
<Tooltip title="This button will save all the changes you have made to the current document and store them in the database for future reference">
  <Button>Save</Button>
</Tooltip>

<Tooltip title="Click me">
  <Button>Save</Button>
</Tooltip>
```

### 2. Choose Appropriate Positions

```tsx
// ✅ Good - Position based on available space
<Tooltip title="Help text" side="top">
  <Icon name="help" />
</Tooltip>

<Tooltip title="More info" side="right">
  <Icon name="info" />
</Tooltip>

// ❌ Avoid - Fixed position without considering space
<Tooltip title="Help text" side="bottom">
  <Icon name="help" />
</Tooltip>
```

### 3. Use Consistent Styling

```tsx
// ✅ Good - Consistent tooltip styling
const tooltipStyle = {
  textColor: '#FFFFFF',
  backgroundColor: '#1F2937',
  arrowColor: '#1F2937',
};

<Tooltip title="Help text" {...tooltipStyle}>
  <Icon name="help" />
</Tooltip>

<Tooltip title="Info text" {...tooltipStyle}>
  <Icon name="info" />
</Tooltip>

// ❌ Avoid - Inconsistent styling
<Tooltip title="Help text" textColor="#000" backgroundColor="#FFF">
  <Icon name="help" />
</Tooltip>

<Tooltip title="Info text" textColor="#FFF" backgroundColor="#000">
  <Icon name="info" />
</Tooltip>
```

### 4. Provide Accessibility Support

```tsx
// ✅ Good - Accessible tooltips
<Tooltip
  title="Save your work"
  accessible={true}
>
  <Button accessibilityLabel="Save button">Save</Button>
</Tooltip>

// ✅ Good - Custom content with accessibility
<Tooltip
  content={
    <Box accessible={true} accessibilityLabel="Help information">
      <String>Help text</String>
    </Box>
  }
>
  <Icon name="help" />
</Tooltip>

// ❌ Avoid - No accessibility considerations
<Tooltip title="Save">
  <Button>Save</Button>
</Tooltip>
```

### 5. Handle Complex Interactions

```tsx
// ✅ Good - Proper interaction handling
<Tooltip
  title="Interactive tooltip"
  closeOnChildInteraction={false}
  closeOnContentInteraction={false}
>
  <Button>Interactive</Button>
</Tooltip>

// ✅ Good - Custom close handling
const [isVisible, setIsVisible] = useState(false);

<Tooltip
  title="Custom tooltip"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
>
  <Button onPress={() => setIsVisible(true)}>
    Show Tooltip
  </Button>
</Tooltip>

// ❌ Avoid - No interaction management
<Tooltip title="Tooltip">
  <Button>Button</Button>
</Tooltip>
```

## Advanced Usage

### Custom Tooltip Component

```tsx
const CustomTooltip = ({ children, title, variant = 'default' }) => {
  const tooltipStyles = {
    default: {
      textColor: '#FFFFFF',
      backgroundColor: '#1F2937',
      arrowColor: '#1F2937',
    },
    success: {
      textColor: '#FFFFFF',
      backgroundColor: '#10B981',
      arrowColor: '#10B981',
    },
    warning: {
      textColor: '#FFFFFF',
      backgroundColor: '#F59E0B',
      arrowColor: '#F59E0B',
    },
    error: {
      textColor: '#FFFFFF',
      backgroundColor: '#EF4444',
      arrowColor: '#EF4444',
    },
  };

  return (
    <Tooltip title={title} {...tooltipStyles[variant]} side="top">
      {children}
    </Tooltip>
  );
};

// Usage
<CustomTooltip title="Success message" variant="success">
  <Button>Success</Button>
</CustomTooltip>;
```

### Tooltip with Dynamic Content

```tsx
const DynamicTooltip = () => {
  const [userData, setUserData] = useState(null);

  const TooltipContent = () => {
    if (!userData) {
      return <String>Loading user data...</String>;
    }

    return (
      <Box className="p-3">
        <String weight="bold" className="mb-2">
          {userData.name}
        </String>
        <String size="sm" colorVariant="secondary">
          {userData.email}
        </String>
      </Box>
    );
  };

  return (
    <Tooltip content={<TooltipContent />}>
      <Icon name="user" />
    </Tooltip>
  );
};
```

### Performance Optimization

```tsx
import React from 'react';
import Tooltip from '@/components/tooltip/Tooltip';

// Memoized tooltip for performance
const MemoizedTooltip = React.memo(({ children, title, ...props }) => (
  <Tooltip title={title} {...props}>
    {children}
  </Tooltip>
));

// Usage
<MemoizedTooltip title="Optimized tooltip">
  <Button>Optimized</Button>
</MemoizedTooltip>;
```

### Tooltip with Validation

```tsx
const ValidationTooltip = ({ field, value }) => {
  const getValidationMessage = () => {
    if (!value) return 'This field is required';
    if (field === 'email' && !value.includes('@')) return 'Please enter a valid email';
    if (field === 'password' && value.length < 8) return 'Password must be at least 8 characters';
    return null;
  };

  const message = getValidationMessage();

  if (!message) return null;

  return (
    <Tooltip title={message} textColor="#FFFFFF" backgroundColor="#EF4444" arrowColor="#EF4444" side="top">
      <Icon name="exclamation-triangle" color="#EF4444" />
    </Tooltip>
  );
};
```

## Performance Considerations

- **Geometry Calculations**: Optimized positioning calculations with proper memoization
- **Memory Management**: Proper cleanup of event listeners and refs
- **Modal Usage**: Efficient modal rendering with conditional mounting
- **Interaction Timing**: Optional InteractionManager for better performance

## Accessibility

The Tooltip component includes comprehensive accessibility features:

- **Screen Reader Support**: Proper accessibility labels and hints
- **Keyboard Navigation**: Support for keyboard interactions
- **Focus Management**: Proper focus handling for modal tooltips
- **Voice Over**: Compatible with iOS VoiceOver and Android TalkBack

### Accessibility Best Practices

```tsx
// Always provide meaningful content
<Tooltip title="Save your current work to prevent data loss">
  <Button accessibilityLabel="Save button">Save</Button>
</Tooltip>

// Use appropriate contrast ratios
<Tooltip
  title="Important information"
  textColor="#FFFFFF"
  backgroundColor="#1F2937" // High contrast
>
  <Icon name="info" />
</Tooltip>

// Provide context for custom content
<Tooltip
  content={
    <Box accessible={true} accessibilityLabel="User profile information">
      <String>John Doe</String>
      <String>john@example.com</String>
    </Box>
  }
>
  <Icon name="user" />
</Tooltip>
```

## Troubleshooting

### Common Issues

1. **Tooltip not positioning correctly**: Check displayInsets and available space
2. **Content not showing**: Verify content or title prop is provided
3. **Interaction issues**: Check closeOn\* props and interaction settings
4. **Styling not applying**: Verify color prop names and values
5. **Performance issues**: Use React.memo for frequently re-rendered tooltips

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

const handleTooltipPress = () => {
  const info = {
    timestamp: Date.now(),
    side: 'top',
    isVisible: true,
  };

  setDebugInfo(info);
};

<Box className="space-y-4">
  <Tooltip title="Debug tooltip" side="top" onClose={() => setDebugInfo({})}>
    <Button onPress={handleTooltipPress}>Debug Tooltip</Button>
  </Tooltip>

  {debugInfo.timestamp && (
    <Box className="rounded bg-gray-100 p-4">
      <String size="sm">Debug: {JSON.stringify(debugInfo)}</String>
    </Box>
  )}
</Box>;
```

## Migration from Other Libraries

### From react-native-tooltip

```tsx
// Old (react-native-tooltip)
import Tooltip from 'react-native-tooltip';

<Tooltip text="Help text">
  <Text>Hover me</Text>
</Tooltip>

// New (Tooltip)
<Tooltip title="Help text">
  <String>Hover me</String>
</Tooltip>
```

### From custom tooltip implementation

```tsx
// Old (custom implementation)
const [showTooltip, setShowTooltip] = useState(false);

<Pressable onPressIn={() => setShowTooltip(true)} onPressOut={() => setShowTooltip(false)}>
  <View>
    <Text>Trigger</Text>
    {showTooltip && (
      <View style={styles.tooltip}>
        <Text>Tooltip content</Text>
      </View>
    )}
  </View>
</Pressable>

// New (Tooltip)
<Tooltip title="Tooltip content">
  <String>Trigger</String>
</Tooltip>
```
