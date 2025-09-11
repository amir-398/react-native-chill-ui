# AnimatedBox Component Tests

This folder contains comprehensive tests for all AnimatedBox components and their variants.

## Test Structure

### 1. `FadeInBox.test.tsx`

Tests for the FadeInBox component across all variants (Hybrid, StyleSheet, Tailwind).

**Coverage:**

- ✅ Basic rendering with children
- ✅ Animation props (duration, delay, autoStart, infiniteLoop)
- ✅ Animation behavior and timing
- ✅ Ref methods (start, stop)
- ✅ Custom styling (className, style)
- ✅ Accessibility props
- ✅ Real-world scenarios (welcome messages, nested content)
- ✅ Edge cases (zero duration, large duration, multiple instances)

### 2. `BounceBox.test.tsx`

Tests for the BounceBox component with interactive animations.

**Coverage:**

- ✅ Basic rendering across all variants
- ✅ Animation props (duration, bounceHeight, bounceInterval, autoStart, infiniteLoop)
- ✅ Animation behavior and sequence creation
- ✅ Callback functions (onBounce)
- ✅ Ref methods (bounce, start, stop)
- ✅ Infinite loop behavior with intervals
- ✅ Custom styling
- ✅ Real-world scenarios (attention buttons, notifications, loading indicators)
- ✅ Edge cases (zero bounce height, very large values, rapid unmounting)
- ✅ Performance with multiple instances

### 3. `SlideInBox.test.tsx`

Tests for the SlideInBox component with directional animations.

**Coverage:**

- ✅ Basic rendering across all variants
- ✅ Direction props (left, right, up, down) with default handling
- ✅ Animation props (duration, distance, delay, autoStart, infiniteLoop)
- ✅ Direction-specific behavior and initial positioning
- ✅ Ref methods with position reset functionality
- ✅ Custom styling
- ✅ Real-world scenarios (notifications, menus, modals)
- ✅ Edge cases (zero/negative distance, multiple directions)
- ✅ Infinite loop behavior

### 4. `AnimatedBox.integration.test.tsx`

Integration tests for real-world usage scenarios combining multiple AnimatedBox components.

**Coverage:**

- ✅ Real-world UI scenarios (welcome screens, notifications, loading, games)
- ✅ Performance and memory management
- ✅ Nested animations and complex layouts
- ✅ Animation coordination with refs
- ✅ Error handling and mixed states
- ✅ Accessibility integration
- ✅ Animation timing and synchronization
- ✅ Staggered animations

## Key Testing Patterns

### Animation Mocking

All tests use comprehensive React Native Animated API mocking:

```typescript
jest.mock('react-native', () => {
  const mockAnimated = {
    timing: jest.fn(() => ({ start: jest.fn() })),
    sequence: jest.fn(() => ({ start: jest.fn() })),
    Value: jest.fn(() => ({ setValue: jest.fn() })),
  };
  return { ...RN, Animated: mockAnimated };
});
```

### Ref Testing

Tests verify that components expose the correct ref methods:

```typescript
const ref = React.createRef<any>();
render(<Component ref={ref} />);
expect(typeof ref.current?.start).toBe('function');
```

### Real-World Scenarios

Each test file includes practical usage examples:

- Welcome screens with sequential animations
- Attention-grabbing notifications
- Loading indicators
- Game UI elements
- Interactive buttons

### Edge Case Coverage

Comprehensive edge case testing:

- Zero/negative values
- Very large values
- Rapid mount/unmount cycles
- Multiple simultaneous instances
- Memory cleanup verification

## Running Tests

```bash
# Run all AnimatedBox tests
bun run jest animatedBox

# Run specific test file
bun run jest FadeInBox.test.tsx

# Run with coverage
bun run jest animatedBox --coverage

# Run in watch mode
bun run jest animatedBox --watch
```

## Coverage Goals

- ✅ **100% Component Rendering** - All variants render correctly
- ✅ **100% Props Coverage** - All props tested with various values
- ✅ **100% Animation Behavior** - All animation states and transitions
- ✅ **100% Ref Methods** - All exposed methods tested
- ✅ **100% Real-World Scenarios** - Practical usage patterns
- ✅ **100% Edge Cases** - Boundary conditions and error states
- ✅ **100% Integration** - Component interactions and combinations

## Best Practices Implemented

1. **Isolation**: Each test is completely isolated with proper cleanup
2. **Mocking**: Comprehensive mocking of dependencies (Animated, styles, utils)
3. **Real-World Focus**: Tests mirror actual usage patterns
4. **Performance**: Memory leak and performance testing included
5. **Accessibility**: Accessibility props and behavior tested
6. **Error Handling**: Edge cases and error conditions covered
7. **Documentation**: Clear test descriptions and grouping

## Mock Dependencies

The tests mock several key dependencies:

- React Native Animated API
- StyleSheet styles
- Tailwind utilities (`cn`)
- Hybrid utilities (`propsHandlers`)
- Component dependencies (`String`, `Box`)

This ensures tests run fast and are focused on component behavior rather than dependency implementation details.
