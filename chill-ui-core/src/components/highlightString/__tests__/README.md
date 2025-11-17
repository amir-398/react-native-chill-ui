# HighlightString Tests

This directory contains comprehensive tests for the HighlightString component across all three versions (Hybrid, StyleSheet, and Tailwind).

## Test Files

### `HighlightString.test.tsx`

Main test file covering:

- **Basic Functionality**: Rendering, highlighting, case insensitivity
- **Edge Cases**: Empty content, special characters, unicode, newlines
- **Styling**: Custom classes, styles, and props
- **Performance**: Memoization and large content handling
- **All Versions**: Tests for Hybrid, StyleSheet, and Tailwind versions

### `HighlightString.styles.test.ts`

Style-specific tests covering:

- **StyleSheet Styles**: Default highlight styles and structure
- **Tailwind Variants**: Default className and format validation
- **Consistency**: Color consistency between StyleSheet and Tailwind

## Test Coverage

The tests cover:

✅ **Component Rendering**

- Basic rendering without highlighting
- Highlighting with empty/whitespace terms
- Single and multiple term highlighting

✅ **Text Processing**

- Case insensitive highlighting
- Special regex character escaping
- Unicode character support
- Newline handling

✅ **Styling**

- Custom className application
- Custom style application
- Default style fallbacks
- Props passing to child components

✅ **Edge Cases**

- Empty content
- Highlight term longer than content
- Special characters in content
- Large content performance

✅ **Performance**

- Component memoization
- Efficient text splitting
- Large content handling

## Running Tests

```bash
# Run all HighlightString tests
npm test -- HighlightString

# Run specific test file
npm test -- HighlightString.test.tsx

# Run with coverage
npm test -- --coverage HighlightString
```

## Test Structure

Each test suite follows this pattern:

1. **Setup**: Mock dependencies and prepare test data
2. **Render**: Render component with test props
3. **Assert**: Verify expected behavior and output
4. **Cleanup**: Reset mocks and state

## Mocking Strategy

The tests mock:

- **String Components**: All three versions (String, StringSs, StringTw)
- **Hybrid Utils**: classNamePropsHandler and propsHandlers
- **React Native**: Text component for rendering

## Best Practices

- **Descriptive Names**: Test names clearly describe what is being tested
- **Single Responsibility**: Each test focuses on one specific behavior
- **Edge Cases**: Comprehensive coverage of edge cases and error conditions
- **Performance**: Tests for performance-critical scenarios
- **Accessibility**: Tests ensure proper text rendering and highlighting

## Adding New Tests

When adding new tests:

1. Follow the existing naming convention
2. Group related tests in describe blocks
3. Use descriptive test names
4. Test both positive and negative cases
5. Include edge cases and error conditions
6. Update this README if adding new test categories
