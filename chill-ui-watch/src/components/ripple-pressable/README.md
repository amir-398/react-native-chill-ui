# RipplePressable

A React Native component that provides a material design ripple effect on press. Built with React Native Reanimated and Gesture Handler for smooth, native animations that enhance user interaction feedback.

## Features

- ✅ **Material Design Ripple**: Authentic ripple effect that spreads from touch point
- ✅ **Native Performance**: Built with React Native Reanimated for 60fps animations
- ✅ **Gesture Handling**: Uses React Native Gesture Handler for precise touch detection
- ✅ **Flexible Content**: Accepts any child components for versatile usage
- ✅ **Custom Styling**: Full Tailwind CSS support for styling
- ✅ **Accessibility**: Proper touch handling and screen reader support
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Performance**: Optimized animations with shared values

## Quick Start

```tsx
import RipplePressable from '@/components/ripple-pressable/RipplePressable';

// Basic usage
<RipplePressable onPress={() => console.log('Pressed!')}>
  <Box className="rounded-lg bg-blue-500 p-4">
    <String color="white">Press me</String>
  </Box>
</RipplePressable>;
```

## Examples

### Basic Usage

```tsx
import RipplePressable from '@/components/ripple-pressable/RipplePressable';

// Simple button with ripple
<RipplePressable onPress={() => handlePress()}>
  <Box className="p-4 bg-blue-500 rounded-lg">
    <String color="white">Click me</String>
  </Box>
</RipplePressable>

// With custom styling
<RipplePressable
  className="bg-red-500 p-6 rounded-xl"
  onPress={() => handleButtonPress()}
>
  <String color="white" className="text-center font-bold">
    Custom Button
  </String>
</RipplePressable>
```

### Interactive Cards

```tsx
// Card with ripple effect
<RipplePressable onPress={() => navigateToDetails()}>
  <Box className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
    <Box className="flex-row items-center">
      <Icon name="user" size="md" color="#007AFF" />
      <Box className="ml-3 flex-1">
        <String className="font-semibold">John Doe</String>
        <String className="text-gray-500 text-sm">Tap to view details</String>
      </Box>
      <Icon name="chevron-right" size="sm" color="#999" />
    </Box>
  </Box>
</RipplePressable>

// List item with ripple
<RipplePressable onPress={() => selectItem(item.id)}>
  <Box className="flex-row items-center p-4 bg-white border-b border-gray-100">
    <Box className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
      <String className="text-blue-600 font-bold">{item.initials}</String>
    </Box>
    <Box className="ml-3 flex-1">
      <String className="font-medium">{item.name}</String>
      <String className="text-gray-500 text-sm">{item.description}</String>
    </Box>
    <Icon name="more-vertical" size="sm" color="#999" />
  </Box>
</RipplePressable>
```

### Form Elements

```tsx
// Checkbox with ripple
<RipplePressable onPress={() => setChecked(!checked)}>
  <Box className="flex-row items-center p-3 bg-gray-50 rounded-lg">
    <Box className={cn(
      "w-5 h-5 rounded border-2 items-center justify-center",
      checked ? "bg-blue-500 border-blue-500" : "border-gray-300"
    )}>
      {checked && <Icon name="check" size="xs" color="white" />}
    </Box>
    <String className="ml-3">Accept terms and conditions</String>
  </Box>
</RipplePressable>

// Radio button with ripple
<RipplePressable onPress={() => setSelected(option.value)}>
  <Box className="flex-row items-center p-3 bg-gray-50 rounded-lg">
    <Box className={cn(
      "w-5 h-5 rounded-full border-2 items-center justify-center",
      selected === option.value ? "border-blue-500" : "border-gray-300"
    )}>
      {selected === option.value && (
        <Box className="w-2 h-2 bg-blue-500 rounded-full" />
      )}
    </Box>
    <String className="ml-3">{option.label}</String>
  </Box>
</RipplePressable>
```

### Navigation Elements

```tsx
// Navigation item with ripple
<RipplePressable onPress={() => navigate(route.name)}>
  <Box className="flex-row items-center p-4 bg-white border-b border-gray-100">
    <Icon name={route.icon} size="md" color="#666" />
    <String className="ml-3 flex-1">{route.title}</String>
    <Icon name="chevron-right" size="sm" color="#999" />
  </Box>
</RipplePressable>

// Tab with ripple
<RipplePressable onPress={() => setActiveTab(tab.id)}>
  <Box className={cn(
    "px-4 py-2 rounded-lg",
    activeTab === tab.id ? "bg-blue-500" : "bg-gray-100"
  )}>
    <String className={cn(
      "font-medium",
      activeTab === tab.id ? "text-white" : "text-gray-700"
    )}>
      {tab.label}
    </String>
  </Box>
</RipplePressable>
```

### Complex Interactions

```tsx
// Expandable content with ripple
<RipplePressable
  onPress={() => setIsExpanded(!isExpanded)}
  className={cn(
    "p-4 rounded-lg transition-all",
    isExpanded ? "bg-blue-100" : "bg-gray-100"
  )}
>
  <Box className="flex-row items-center justify-between">
    <String className="font-medium">Expandable Content</String>
    <Icon
      name={isExpanded ? "chevron-up" : "chevron-down"}
      size="sm"
      color="#666"
    />
  </Box>
  {isExpanded && (
    <Box className="mt-3 pt-3 border-t border-gray-200">
      <String className="text-gray-600">
        This content is now expanded with a smooth animation.
      </String>
    </Box>
  )}
</RipplePressable>

// Swipeable item with ripple
<RipplePressable onPress={() => handleItemPress(item)}>
  <Box className="flex-row items-center p-4 bg-white border-b border-gray-100">
    <Box className="w-12 h-12 bg-gray-200 rounded-lg items-center justify-center">
      <Icon name="image" size="md" color="#666" />
    </Box>
    <Box className="ml-3 flex-1">
      <String className="font-medium">{item.title}</String>
      <String className="text-gray-500 text-sm">{item.subtitle}</String>
    </Box>
    <Box className="flex-row items-center">
      <String className="text-gray-500 text-sm mr-2">{item.time}</String>
      <Icon name="more-vertical" size="sm" color="#999" />
    </Box>
  </Box>
</RipplePressable>
```

## Props Reference

### RipplePressableProps

| Prop        | Type         | Required | Description                                            |
| ----------- | ------------ | -------- | ------------------------------------------------------ |
| `children`  | `ReactNode`  | ✅       | Child components to render with ripple effect          |
| `className` | `string`     | -        | Custom CSS classes for styling the container           |
| `onPress`   | `() => void` | -        | Callback function called when the component is pressed |

## Animation Details

### Ripple Effect

The ripple effect is implemented using React Native Reanimated with the following characteristics:

- **Origin Point**: Ripple starts from the exact touch point
- **Spread Animation**: Expands in a circular pattern from the touch point
- **Duration**: 400ms timing animation for smooth effect
- **Opacity**: Fades out after the press is released
- **Color**: Semi-transparent black (`rgba(0,0,0,0.2)`) by default

### Performance Optimizations

- **Shared Values**: Uses `useSharedValue` for optimal performance
- **Gesture Handler**: Native gesture detection for precise touch handling
- **Animated Styles**: Efficient style calculations with `useAnimatedStyle`
- **Memory Management**: Proper cleanup of animated references

## Best Practices

### 1. Always Provide Children

```tsx
// ✅ Good - Has children
<RipplePressable onPress={handlePress}>
  <Box className="p-4 bg-blue-500">
    <String color="white">Button</String>
  </Box>
</RipplePressable>

// ❌ Avoid - No children (will throw error)
<RipplePressable onPress={handlePress} />
```

### 2. Use Appropriate Content

```tsx
// ✅ Good - Interactive content
<RipplePressable onPress={handlePress}>
  <Box className="p-4 bg-white rounded-lg shadow-sm">
    <String>Interactive Card</String>
  </Box>
</RipplePressable>

// ✅ Good - Button-like content
<RipplePressable onPress={handlePress}>
  <Box className="px-6 py-3 bg-blue-500 rounded-lg">
    <String color="white">Submit</String>
  </Box>
</RipplePressable>

// ❌ Avoid - Non-interactive content
<RipplePressable onPress={handlePress}>
  <String>Just text</String> {/* No visual feedback */}
</RipplePressable>
```

### 3. Handle Press Events Properly

```tsx
// ✅ Good - Proper event handling
const handlePress = useCallback(() => {
  console.log('Button pressed');
  // Perform action
}, []);

<RipplePressable onPress={handlePress}>
  <Box className="p-4 bg-blue-500">
    <String color="white">Press me</String>
  </Box>
</RipplePressable>

// ❌ Avoid - Inline functions
<RipplePressable onPress={() => console.log('Pressed')}>
  <Box className="p-4 bg-blue-500">
    <String color="white">Press me</String>
  </Box>
</RipplePressable>
```

### 4. Use Appropriate Styling

```tsx
// ✅ Good - Clear visual hierarchy
<RipplePressable onPress={handlePress}>
  <Box className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
    <String className="font-medium">Card Title</String>
    <String className="text-gray-500 text-sm mt-1">Card description</String>
  </Box>
</RipplePressable>

// ✅ Good - Button styling
<RipplePressable onPress={handlePress}>
  <Box className="px-6 py-3 bg-blue-500 rounded-lg shadow-sm">
    <String color="white" className="text-center font-semibold">
      Primary Action
    </String>
  </Box>
</RipplePressable>

// ❌ Avoid - Poor visual feedback
<RipplePressable onPress={handlePress}>
  <String>No background or padding</String>
</RipplePressable>
```

### 5. Consider Accessibility

```tsx
// ✅ Good - Accessible content
<RipplePressable onPress={handlePress}>
  <Box
    className="p-4 bg-blue-500 rounded-lg"
    accessible={true}
    accessibilityLabel="Submit form button"
    accessibilityHint="Double tap to submit the form"
  >
    <String color="white">Submit</String>
  </Box>
</RipplePressable>

// ❌ Avoid - No accessibility information
<RipplePressable onPress={handlePress}>
  <Box className="p-4 bg-blue-500">
    <String color="white">Submit</String>
  </Box>
</RipplePressable>
```

## Advanced Usage

### Custom Ripple Colors

While the default ripple color is semi-transparent black, you can customize it by modifying the component:

```tsx
// Custom RipplePressable with different colors
const CustomRipplePressable = ({ children, className, onPress, rippleColor = 'rgba(0,0,0,0.2)' }) => {
  // ... implementation with custom rippleColor
};
```

### Conditional Ripple

```tsx
const [isEnabled, setIsEnabled] = useState(true);

{
  isEnabled ? (
    <RipplePressable onPress={handlePress}>
      <Box className="rounded-lg bg-blue-500 p-4">
        <String color="white">Enabled Button</String>
      </Box>
    </RipplePressable>
  ) : (
    <Box className="rounded-lg bg-gray-300 p-4">
      <String color="gray-500">Disabled Button</String>
    </Box>
  );
}
```

### Multiple Ripple Areas

```tsx
<RipplePressable onPress={() => handleCardPress()}>
  <Box className="rounded-lg bg-white p-4 shadow-sm">
    <RipplePressable onPress={() => handleButtonPress()}>
      <Box className="rounded bg-blue-500 px-4 py-2">
        <String color="white">Nested Button</String>
      </Box>
    </RipplePressable>
  </Box>
</RipplePressable>
```

### Performance Optimization

```tsx
// Memoize the press handler
const handlePress = useCallback(() => {
  // Expensive operation
  processData();
}, [processData]);

// Memoize the component if needed
const MemoizedRipplePressable = React.memo(RipplePressable);

<MemoizedRipplePressable onPress={handlePress}>
  <Box className="bg-blue-500 p-4">
    <String color="white">Optimized Button</String>
  </Box>
</MemoizedRipplePressable>;
```

## Performance Considerations

- **Gesture Handler**: Uses native gesture detection for optimal performance
- **Reanimated**: All animations run on the UI thread for 60fps performance
- **Shared Values**: Efficient state management for animations
- **Memory Management**: Proper cleanup prevents memory leaks

## Accessibility

The RipplePressable component includes accessibility features:

- **Touch handling**: Proper touch event management
- **Visual feedback**: Clear visual indication of interaction
- **Screen reader support**: Works with accessibility tools
- **Focus management**: Proper focus handling

### Accessibility Best Practices

```tsx
// Always provide accessibility information
<RipplePressable onPress={handlePress}>
  <Box
    className="p-4 bg-blue-500 rounded-lg"
    accessible={true}
    accessibilityLabel="Submit form button"
    accessibilityHint="Double tap to submit the form"
    accessibilityRole="button"
  >
    <String color="white">Submit</String>
  </Box>
</RipplePressable>

// Provide context for screen readers
<RipplePressable onPress={handlePress}>
  <Box
    className="p-4 bg-white rounded-lg"
    accessible={true}
    accessibilityLabel={`${item.name} card`}
    accessibilityHint="Double tap to view details"
  >
    <String className="font-medium">{item.name}</String>
  </Box>
</RipplePressable>
```

## Troubleshooting

### Common Issues

1. **No ripple effect**: Ensure React Native Reanimated and Gesture Handler are properly installed
2. **Performance issues**: Check for unnecessary re-renders in parent components
3. **Touch not working**: Verify gesture handler setup in your app
4. **Styling issues**: Check Tailwind CSS configuration

### Debug Example

```tsx
const [pressCount, setPressCount] = useState(0);

<RipplePressable
  onPress={() => {
    setPressCount(prev => prev + 1);
    console.log('RipplePressable pressed');
  }}
>
  <Box className="rounded-lg bg-blue-500 p-4">
    <String color="white">Press Count: {pressCount}</String>
  </Box>
</RipplePressable>;
```

## Migration from Other Libraries

### From TouchableOpacity

```tsx
// Old (TouchableOpacity)
<TouchableOpacity onPress={handlePress} style={styles.button}>
  <Text style={styles.buttonText}>Press me</Text>
</TouchableOpacity>

// New (RipplePressable)
<RipplePressable onPress={handlePress}>
  <Box className="p-4 bg-blue-500 rounded-lg">
    <String color="white">Press me</String>
  </Box>
</RipplePressable>
```

### From Pressable

```tsx
// Old (Pressable)
<Pressable onPress={handlePress} style={styles.card}>
  <Text>Card content</Text>
</Pressable>

// New (RipplePressable)
<RipplePressable onPress={handlePress}>
  <Box className="p-4 bg-white rounded-lg shadow-sm">
    <String>Card content</String>
  </Box>
</RipplePressable>
```
