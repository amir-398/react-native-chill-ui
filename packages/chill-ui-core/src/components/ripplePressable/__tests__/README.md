# RipplePressable Tests

Comprehensive test suite for the RipplePressable component covering all variants (Hybrid, StyleSheet, Tailwind) and functionality.

## Test Structure

### Test Files

- `RipplePressable.test.tsx` - Main test suite covering all component variants

### Coverage Areas

#### 1. **Basic Rendering**

- ✅ Renders children correctly for all variants (Hybrid, StyleSheet, Tailwind)
- ✅ Throws error when no children provided
- ✅ Handles different child component types

#### 2. **Press Interactions**

- ✅ Calls onPress when pressed
- ✅ Does not call onPress when disabled
- ✅ Creates ripple effect on press
- ✅ Handles press events correctly

#### 3. **Ripple Effect Props**

- ✅ Uses custom effect color
- ✅ Uses custom animation speed
- ✅ Uses default props when not provided
- ✅ Handles ripple positioning and sizing

#### 4. **Custom Styling**

- ✅ Applies custom className (Tailwind variant)
- ✅ Applies custom style (StyleSheet variant)
- ✅ Handles style inheritance and overrides

#### 5. **Disabled State**

- ✅ Applies disabled styling when disabled
- ✅ Prevents ripple effects when disabled
- ✅ Prevents onPress calls when disabled

#### 6. **Event Handling**

- ✅ Passes event object to onPress
- ✅ Handles onPressIn and onPressOut
- ✅ Handles onLongPress
- ✅ Supports all Pressable event props

#### 7. **Accessibility**

- ✅ Supports accessibility props
- ✅ Handles disabled accessibility state
- ✅ Maintains proper accessibility roles

#### 8. **BorderRadius Detection**

- ✅ Extracts borderRadius from child styles
- ✅ Handles children without borderRadius
- ✅ Handles array of styles
- ✅ Applies borderRadius to container for proper clipping

#### 9. **Real World Scenarios**

- ✅ Works as button replacement
- ✅ Works as card with ripple effect
- ✅ Works as list item
- ✅ Handles complex child structures

#### 10. **Edge Cases**

- ✅ Handles multiple rapid presses
- ✅ Handles press without measure available
- ✅ Handles different child components
- ✅ Manages component lifecycle properly

#### 11. **Performance**

- ✅ Cleans up ripple effects after animation
- ✅ Handles multiple simultaneous ripples
- ✅ Manages memory efficiently

## Running Tests

### Run All Tests

```bash
npm test -- --testPathPattern=RipplePressable.test.tsx
```

### Run with Coverage

```bash
npm test -- --testPathPattern=RipplePressable.test.tsx --coverage
```

### Run in Watch Mode

```bash
npm test -- --testPathPattern=RipplePressable.test.tsx --watch
```

### Run Specific Test Suites

```bash
# Basic rendering tests
npm test -- --testPathPattern=RipplePressable.test.tsx -t "Basic Rendering"

# Press interaction tests
npm test -- --testPathPattern=RipplePressable.test.tsx -t "Press Interactions"

# Ripple effect tests
npm test -- --testPathPattern=RipplePressable.test.tsx -t "Ripple Effect Props"
```

## Test Coverage Goals

- **Statements**: 100%
- **Branches**: 100%
- **Functions**: 100%
- **Lines**: 100%

## Mocks Used

### Component Mocks

- `AnimatedBox` - Mocked to avoid animation complexities in tests
- `RipplePressable.styles` - Mocked StyleSheet styles

### Utility Mocks

- `cn` (Tailwind) - Mocked class name concatenation
- `classNameHandler` (Hybrid) - Mocked className prop handling
- `styleHandler` (Hybrid) - Mocked style prop handling
- `classNamePropsHandler` - Mocked prop validation

### React Native Mocks

- Uses global React Native mocks from `jest.setup.js`
- Includes Animated API mocks for ripple animations

## Key Testing Patterns

### 1. **Component Variant Testing**

```typescript
// Tests all three variants consistently
it('should render children correctly (Hybrid)', () => {
  /* ... */
});
it('should render children correctly (StyleSheet)', () => {
  /* ... */
});
it('should render children correctly (Tailwind)', () => {
  /* ... */
});
```

### 2. **Event Testing**

```typescript
// Tests user interactions
const mockOnPress = jest.fn();
fireEvent.press(button);
expect(mockOnPress).toHaveBeenCalled();
```

### 3. **Animation Testing**

```typescript
// Tests ripple effect creation
const mockMeasure = jest.fn(callback => {
  callback(0, 0, 100, 50); // x, y, width, height
});
fireEvent.press(button);
expect(mockMeasure).toHaveBeenCalled();
```

### 4. **Timer Testing**

```typescript
// Tests cleanup and timing
jest.useFakeTimers();
act(() => {
  jest.advanceTimersByTime(250);
});
```

## Test Data Patterns

### Mock Event Objects

```typescript
const pressEvent = {
  nativeEvent: {
    locationX: 50,
    locationY: 25,
  },
};
```

### Mock Measure Function

```typescript
const mockMeasure = jest.fn(callback => {
  callback(0, 0, 100, 50); // x, y, width, height
});
```

### Custom Styles

```typescript
const customStyle = { backgroundColor: '#FF0000' };
```

## Common Test Scenarios

### Button Replacement

```typescript
<RipplePressable onPress={mockOnPress}>
  <Box className="p-4 bg-blue-500 rounded-lg">
    <String className="text-white">Button</String>
  </Box>
</RipplePressable>
```

### Card with Ripple

```typescript
<RipplePressable onPress={mockOnPress}>
  <Box className="p-6 bg-white rounded-xl shadow-lg">
    <String className="text-lg font-bold">Card Title</String>
    <String className="text-gray-600">Card description</String>
  </Box>
</RipplePressable>
```

### List Item

```typescript
<RipplePressable onPress={mockOnPress}>
  <Box className="flex-row items-center p-4">
    <String className="flex-1">List Item</String>
    <String className="text-gray-400">></String>
  </Box>
</RipplePressable>
```

## Best Practices

### 1. **Mock Management**

- Clear all mocks before each test with `jest.clearAllMocks()`
- Use fake timers for animation testing
- Mock complex dependencies to isolate component behavior

### 2. **Event Testing**

- Test both successful and failed interactions
- Verify event objects are passed correctly
- Test all supported Pressable events

### 3. **Animation Testing**

- Mock measure function for ripple positioning
- Test cleanup after animation completion
- Verify multiple simultaneous animations

### 4. **Accessibility Testing**

- Test all accessibility props
- Verify disabled state accessibility
- Ensure proper roles and labels

### 5. **Edge Case Coverage**

- Test rapid interactions
- Test component lifecycle edge cases
- Test with various child component types

## Troubleshooting

### Common Issues

**Tests failing with timer warnings**

- Ensure `jest.useFakeTimers()` and `jest.useRealTimers()` are properly set up

**Animation mocks not working**

- Verify AnimatedBox mock is correctly implemented
- Check that Animated API is mocked in global setup

**Event handlers not being called**

- Ensure testID is properly set
- Verify mock functions are cleared between tests

**Style-related test failures**

- Check that style mocks return expected objects
- Verify className handlers are mocked correctly

### Debug Tips

1. Use `screen.debug()` to see rendered component structure
2. Add console.log in mocks to verify they're being called
3. Check that event objects have expected structure
4. Verify timer advancement matches animation durations

## Integration with CI/CD

These tests are designed to run in automated environments:

- No external dependencies required
- Deterministic test results
- Fast execution time
- Clear error messages for debugging
