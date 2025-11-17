# Icon Component Tests

This directory contains comprehensive tests for the Icon component across all three versions (Hybrid, StyleSheet, and Tailwind).

## Test Files

### Core Tests

- **`Icon.test.tsx`** - Main test suite for the hybrid Icon component
- **`Icon.ss.test.tsx`** - Tests for the StyleSheet version
- **`Icon.tw.test.tsx`** - Tests for the Tailwind version

### Specialized Tests

- **`Icon.integration.test.tsx`** - Integration tests for real-world scenarios
- **`Icon.snapshots.test.tsx`** - Snapshot tests to ensure UI consistency
- **`Icon.variants.test.tsx`** - Tests for all component variants and edge cases

## Test Coverage

### ✅ Props Testing

- Required props (`name`)
- Optional props with defaults (`size`, `color`, `hasPressEffect`)
- Custom props (`onPress`, `pressEffectSize`, `pressEffectStyle`, `as`)
- Styling props (`style`, `className`)
- Accessibility props (`accessible`, `accessibilityLabel`, `accessibilityRole`)

### ✅ Size Variants

- All 8 size variants: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`
- Size-specific styling and dimensions
- Press effect size variants

### ✅ Interactive Features

- Pressable interactions (`onPress`)
- Different pressable components (`pressable`, `touchable-opacity`, `ripple-pressable`)
- Press effects (`hasPressEffect`, `pressEffectSize`, `pressEffectStyle`)

### ✅ Styling Systems

- StyleSheet styling (`.ss` version)
- Tailwind CSS classes (`.tw` version)
- Hybrid styling (main version)
- Custom styles and className props

### ✅ Edge Cases

- Minimal props
- Undefined/null values
- Complex configurations
- Performance with many icons

## Running Tests

### Run All Tests

```bash
# From the project root
npm test -- --testPathPattern="icon/__tests__"

# Or run the custom script
node src/components/icon/__tests__/run-tests.js
```

### Run Specific Test Files

```bash
# Main component tests
npm test Icon.test.tsx

# StyleSheet version tests
npm test Icon.ss.test.tsx

# Tailwind version tests
npm test Icon.tw.test.tsx

# Integration tests
npm test Icon.integration.test.tsx

# Snapshot tests
npm test Icon.snapshots.test.tsx

# Variants tests
npm test Icon.variants.test.tsx
```

### Run with Coverage

```bash
npm test -- --coverage --testPathPattern="icon/__tests__"
```

## Test Structure

Each test file follows this structure:

1. **Setup** - Mock dependencies and clear mocks
2. **Basic Rendering** - Test component renders correctly
3. **Props Testing** - Test individual props and combinations
4. **Variants Testing** - Test all size, color, and interaction variants
5. **Edge Cases** - Test error handling and edge cases
6. **Cleanup** - Unmount components and clear mocks

## Mocking Strategy

### CustomIcon Component

- Mocked to return a simple div with testID and props
- Allows testing of prop passing without SVG complexity

### RipplePressable Component

- Mocked to return a simple div with pressable behavior
- Allows testing of interaction patterns

### Hybrid Utilities

- Mocked to avoid complex hybrid detection logic
- Focuses on component behavior rather than utility functions

## Best Practices

### Test Organization

- Group related tests in `describe` blocks
- Use descriptive test names
- Test one thing per test case

### Assertions

- Use `toBeTruthy()` for component existence
- Use `toHaveProp()` for prop verification
- Use `toMatchSnapshot()` for UI consistency

### Performance

- Unmount components between tests to avoid memory leaks
- Use `beforeEach` to clear mocks
- Test with realistic data sets

## Debugging Tests

### Common Issues

1. **Mock not working** - Check mock path and export structure
2. **Component not rendering** - Verify testID and component structure
3. **Props not passing** - Check mock implementation and prop names

### Debug Commands

```bash
# Run tests with verbose output
npm test -- --verbose --testPathPattern="icon/__tests__"

# Run tests with debug info
npm test -- --testPathPattern="icon/__tests__" --detectOpenHandles

# Update snapshots
npm test -- --updateSnapshot --testPathPattern="Icon.snapshots.test.tsx"
```

## Contributing

When adding new tests:

1. Follow the existing naming convention
2. Add appropriate mocks for new dependencies
3. Test both positive and negative cases
4. Update snapshots if UI changes
5. Add integration tests for complex features
6. Document any new test patterns in this README
