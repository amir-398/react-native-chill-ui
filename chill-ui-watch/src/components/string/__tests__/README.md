# String Component Tests

This folder contains all tests for the String component and its variants.

## Test Structure

### 1. `String.test.tsx`

Tests for the hybrid version of the String component (`String.tsx`).

- Basic rendering tests
- Props variants tests (size, color, font, position, weight)
- Custom styling tests
- Accessibility tests
- Edge cases tests

### 2. `String.tw.test.tsx`

Tests for the Tailwind version of the String component (`String.tw.tsx`).

- Tailwind CSS specific tests
- CSS class generation tests
- Inline style handling tests
- Class combination tests

### 3. `String.ss.test.tsx`

Tests for the StyleSheet version of the String component (`String.ss.tsx`).

- React Native StyleSheet specific tests
- Style generation tests
- Style performance tests
- Style combination tests

### 4. `String.variants.test.ts`

Tests for the variants utilities (`String.variants.ts`).

- Tailwind variant functions tests
- Type safety tests
- Variant combination tests

### 5. `String.integration.test.tsx`

Integration tests for real-world usage scenarios.

- Real-world usage scenarios tests
- Integration with other components tests
- Performance tests
- Advanced accessibility tests

## Test Commands

```bash
# Run all tests
bun run jest

# Run tests in watch mode
bun run jest --watch

# Run tests with coverage
bun run  jest --coverage

# Run only String component tests
bun run  jest string

# Run a specific test file
bun run  jest String.test.tsx
```

## Coverage

The tests aim to cover:

- ✅ All props and their variants
- ✅ All rendering cases
- ✅ All style combinations
- ✅ All accessibility cases
- ✅ All edge cases and errors
- ✅ React Native integration
- ✅ Performance

## Mocks

The tests use several mocks to isolate the component:

- `cn` (tailwind-merge) for CSS classes
- Hybrid utilities to avoid dependency errors
- React Native modules for test compatibility
- Expo modules to avoid native errors

## Best Practices

1. **Isolation**: Each test is isolated and doesn't affect others
2. **Mocks**: Proper use of mocks for external dependencies
3. **Coverage**: Exhaustive tests of all functionalities
4. **Readability**: Clear and well-documented tests
5. **Performance**: Performance tests for critical cases

## Adding New Tests

When adding new features to the String component:

1. Add tests in the appropriate file (`.test.tsx`, `.tw.test.tsx`, `.ss.test.tsx`)
2. Test all new props and variants
3. Add integration tests if necessary
4. Update mocks if new dependencies are added
5. Verify that coverage remains high

## Debugging

To debug tests:

```bash
# Run tests with more details
npx jest --verbose

# Run a specific test with debug
npx jest --testNamePattern="should render text content correctly"

# See coverage details
npx jest --coverage --verbose

# Run tests for a specific file
npx jest src/components/string/__tests__/String.test.tsx
```

## Configuration

Tests are configured through:

- `jest.config.js` - Main Jest configuration
- `jest.setup.js` - Test setup and mocks
- `package.json` - Test scripts and dependencies

## Common Issues

### 1. Module Resolution

If you encounter module resolution errors, check:

- `transformIgnorePatterns` in `jest.config.js`
- Module mocks in `jest.setup.js`

### 2. React Native Compatibility

For React Native specific issues:

- Ensure React Native preset is used
- Check that all native modules are properly mocked

### 3. Style Testing

When testing styles:

- Use `expect.objectContaining()` for merged styles
- Use `toBeDefined()` for function props instead of exact matches
- Remember that Tailwind and StyleSheet handle styles differently

## Test Results

Current test status:

- **Total tests**: 199
- **Passing**: 199 ✅
- **Failing**: 0 ✅
- **Coverage**: ~100% ✅

All tests should pass when run with `npx jest`.
