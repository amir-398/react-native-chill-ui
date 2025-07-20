# Wrapper

A React Native component that provides flexible container functionality with multiple behavior options. Supports safe area handling, keyboard avoidance, scrolling, and customizable styling with automatic dependency management and graceful fallbacks.

## Features

- ✅ **Flexible Container**: Multiple container types (View, ScrollView, KeyboardAvoidingView)
- ✅ **Safe Area Support**: Automatic safe area handling with react-native-safe-area-context
- ✅ **Keyboard Handling**: Keyboard avoidance and aware scrolling with react-native-keyboard-controller
- ✅ **Customizable Styling**: Flexible padding and margin options with Tailwind variants
- ✅ **Dependency Management**: Automatic handling of optional dependencies with graceful fallbacks
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Performance**: Optimized with proper component selection and styling
- ✅ **Cross-Platform**: Consistent behavior across iOS and Android

## Quick Start

```tsx
import Wrapper from '@/components/wrapper/Wrapper';

// Basic wrapper with default styling
<Wrapper>
  <String>Content</String>
</Wrapper>

// Scrollable wrapper with custom padding
<Wrapper scrollView px={6} py={4}>
  <String>Scrollable content</String>
</Wrapper>

// Safe area wrapper with keyboard avoidance
<Wrapper safeAreaView keyboardAvoidingView>
  <Input placeholder="Type here" />
</Wrapper>
```

## Examples

### Basic Usage

```tsx
import Wrapper from '@/components/wrapper/Wrapper';

const BasicWrapper = () => {
  return (
    <Wrapper>
      <String>Basic content with default padding</String>
    </Wrapper>
  );
};

const CustomPaddingWrapper = () => {
  return (
    <Wrapper px={6} py={8}>
      <String>Content with custom padding</String>
    </Wrapper>
  );
};
```

### Scrollable Content

```tsx
const ScrollableWrapper = () => {
  return (
    <Wrapper scrollView>
      {Array.from({ length: 20 }, (_, i) => (
        <Box key={i} className="border-b border-gray-200 p-4">
          <String>Item {i + 1}</String>
        </Box>
      ))}
    </Wrapper>
  );
};

const ScrollableWithPadding = () => {
  return (
    <Wrapper scrollView px={4} py={6}>
      <String>Scrollable content with padding</String>
      {/* More content */}
    </Wrapper>
  );
};
```

### Safe Area Handling

```tsx
const SafeAreaWrapper = () => {
  return (
    <Wrapper safeAreaView>
      <String>Content respects safe areas</String>
    </Wrapper>
  );
};

const CustomSafeAreaEdges = () => {
  return (
    <Wrapper safeAreaView edges={['top', 'bottom']}>
      <String>Content with custom safe area edges</String>
    </Wrapper>
  );
};
```

### Keyboard Handling

```tsx
const KeyboardAvoidingWrapper = () => {
  return (
    <Wrapper keyboardAvoidingView>
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry />
      <Button>Submit</Button>
    </Wrapper>
  );
};

const KeyboardAwareScrollWrapper = () => {
  return (
    <Wrapper keyboardAwareScrollView>
      <Input placeholder="Search" />
      {Array.from({ length: 10 }, (_, i) => (
        <Box key={i} className="p-4">
          <String>Search result {i + 1}</String>
        </Box>
      ))}
    </Wrapper>
  );
};
```

### Combined Features

```tsx
const AdvancedWrapper = () => {
  return (
    <Wrapper safeAreaView keyboardAwareScrollView px={4} py={6} className="bg-gray-50">
      <String size="lg" weight="bold" className="mb-4">
        Advanced Wrapper
      </String>
      <Input placeholder="Name" className="mb-4" />
      <Input placeholder="Email" className="mb-4" />
      <Input placeholder="Message" multiline className="mb-4" />
      <Button>Send</Button>
    </Wrapper>
  );
};
```

### Form Wrapper

```tsx
const FormWrapper = () => {
  return (
    <Wrapper safeAreaView keyboardAvoidingView scrollView px={4} py={6}>
      <String size="xl" weight="bold" className="mb-6">
        Contact Form
      </String>

      <Box className="space-y-4">
        <Input placeholder="Full Name" />
        <Input placeholder="Email Address" keyboardType="email-address" />
        <Input placeholder="Phone Number" keyboardType="phone-pad" />
        <Input placeholder="Message" multiline numberOfLines={4} textAlignVertical="top" />
        <Button>Submit</Button>
      </Box>
    </Wrapper>
  );
};
```

### List Wrapper

```tsx
const ListWrapper = () => {
  const items = [
    { id: 1, title: 'Item 1', description: 'Description 1' },
    { id: 2, title: 'Item 2', description: 'Description 2' },
    // ... more items
  ];

  return (
    <Wrapper scrollView px={4} py={2}>
      {items.map(item => (
        <Box key={item.id} className="mb-4 rounded-lg bg-white p-4 shadow">
          <String weight="bold" className="mb-2">
            {item.title}
          </String>
          <String colorVariant="secondary">{item.description}</String>
        </Box>
      ))}
    </Wrapper>
  );
};
```

## Props Reference

### WrapperProps

| Prop                      | Type                                                      | Default | Description                                       |
| ------------------------- | --------------------------------------------------------- | ------- | ------------------------------------------------- |
| `children`                | `ReactNode`                                               | -       | Child components to render                        |
| `className`               | `string`                                                  | -       | Custom CSS classes                                |
| `px`                      | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 \| true` | `true`  | Horizontal padding                                |
| `py`                      | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 \| true` | -       | Vertical padding                                  |
| `pt`                      | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 \| true` | -       | Top padding                                       |
| `my`                      | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 \| true` | -       | Vertical margin                                   |
| `scrollView`              | `boolean`                                                 | `false` | Enable ScrollView behavior                        |
| `keyboardAvoidingView`    | `boolean`                                                 | `false` | Enable KeyboardAvoidingView                       |
| `keyboardAwareScrollView` | `boolean`                                                 | `false` | Enable KeyboardAwareScrollView                    |
| `safeAreaView`            | `boolean`                                                 | `false` | Enable SafeAreaView                               |
| `edges`                   | `Edge[]`                                                  | -       | Safe area edges to apply                          |
| `nestedScrollEnabled`     | `boolean`                                                 | `false` | Enable nested scrolling                           |
| `scrollView`              | `boolean`                                                 | `false` | Enable ScrollView when using KeyboardAvoidingView |

### Edge Types

| Type       | Description                    |
| ---------- | ------------------------------ |
| `'top'`    | Apply safe area to top edge    |
| `'bottom'` | Apply safe area to bottom edge |
| `'left'`   | Apply safe area to left edge   |
| `'right'`  | Apply safe area to right edge  |

## Best Practices

### 1. Choose Appropriate Container Type

```tsx
// ✅ Good - Use scrollView for long content
<Wrapper scrollView>
  {longList.map(item => (
    <ListItem key={item.id} item={item} />
  ))}
</Wrapper>

// ✅ Good - Use keyboardAvoidingView for forms
<Wrapper keyboardAvoidingView>
  <Input placeholder="Email" />
  <Input placeholder="Password" />
</Wrapper>

// ✅ Good - Use safeAreaView for full-screen content
<Wrapper safeAreaView>
  <Header />
  <Content />
</Wrapper>

// ❌ Avoid - Using scrollView for short content
<Wrapper scrollView>
  <String>Short content</String>
</Wrapper>
```

### 2. Use Consistent Padding

```tsx
// ✅ Good - Consistent padding across screens
const screenPadding = { px: 4, py: 6 };

<Wrapper {...screenPadding}>
  <HomeScreen />
</Wrapper>

<Wrapper {...screenPadding}>
  <ProfileScreen />
</Wrapper>

// ❌ Avoid - Inconsistent padding
<Wrapper px={2} py={8}>
  <Screen1 />
</Wrapper>

<Wrapper px={6} py={2}>
  <Screen2 />
</Wrapper>
```

### 3. Handle Keyboard Properly

```tsx
// ✅ Good - Use keyboardAwareScrollView for search results
<Wrapper keyboardAwareScrollView>
  <SearchInput />
  {searchResults.map(result => (
    <SearchResult key={result.id} result={result} />
  ))}
</Wrapper>

// ✅ Good - Use keyboardAvoidingView for simple forms
<Wrapper keyboardAvoidingView>
  <Input placeholder="Name" />
  <Input placeholder="Email" />
  <Button>Submit</Button>
</Wrapper>

// ❌ Avoid - No keyboard handling for forms
<Wrapper>
  <Input placeholder="Name" />
  <Input placeholder="Email" />
  <Button>Submit</Button>
</Wrapper>
```

### 4. Optimize for Performance

```tsx
// ✅ Good - Use appropriate container for content type
const ContentWrapper = ({ children, isLongList }) => {
  if (isLongList) {
    return <Wrapper scrollView>{children}</Wrapper>;
  }
  return <Wrapper>{children}</Wrapper>;
};

// ✅ Good - Memoize wrapper for frequently re-rendered content
const MemoizedWrapper = React.memo(({ children, ...props }) => <Wrapper {...props}>{children}</Wrapper>);

// ❌ Avoid - Always using scrollView
<Wrapper scrollView>
  <String>Short content</String>
</Wrapper>;
```

### 5. Handle Dependencies Gracefully

```tsx
// ✅ Good - Wrapper handles missing dependencies automatically
<Wrapper safeAreaView keyboardAvoidingView>
  <Content />
</Wrapper>;

// ✅ Good - Provide fallback behavior
const FormScreen = () => {
  return (
    <Wrapper
      safeAreaView
      keyboardAvoidingView
      scrollView // Fallback if keyboardAvoidingView fails
    >
      <Form />
    </Wrapper>
  );
};

// ❌ Avoid - Assuming dependencies are always available
// Wrapper handles this automatically with warnings
```

## Advanced Usage

### Custom Wrapper Component

```tsx
const ScreenWrapper = ({ children, variant = 'default' }) => {
  const wrapperConfigs = {
    default: {
      safeAreaView: true,
      px: 4,
      py: 6,
    },
    form: {
      safeAreaView: true,
      keyboardAvoidingView: true,
      px: 4,
      py: 6,
    },
    list: {
      safeAreaView: true,
      scrollView: true,
      px: 4,
      py: 2,
    },
    modal: {
      safeAreaView: true,
      edges: ['top', 'bottom'],
      px: 4,
      py: 6,
    },
  };

  return <Wrapper {...wrapperConfigs[variant]}>{children}</Wrapper>;
};

// Usage
<ScreenWrapper variant="form">
  <ContactForm />
</ScreenWrapper>;
```

### Conditional Wrapper Behavior

```tsx
const AdaptiveWrapper = ({ children, contentLength, hasInputs }) => {
  const getWrapperProps = () => {
    const baseProps = { safeAreaView: true, px: 4, py: 6 };

    if (hasInputs) {
      return { ...baseProps, keyboardAvoidingView: true };
    }

    if (contentLength > 10) {
      return { ...baseProps, scrollView: true };
    }

    return baseProps;
  };

  return <Wrapper {...getWrapperProps()}>{children}</Wrapper>;
};
```

### Performance Optimization

```tsx
import React from 'react';
import Wrapper from '@/components/wrapper/Wrapper';

// Memoized wrapper for performance
const MemoizedWrapper = React.memo(({ children, ...props }) => <Wrapper {...props}>{children}</Wrapper>);

// Usage with stable props
const StableWrapper = ({ children }) => (
  <MemoizedWrapper safeAreaView px={4} py={6}>
    {children}
  </MemoizedWrapper>
);
```

### Custom Styling Integration

```tsx
const ThemedWrapper = ({ children, theme = 'light' }) => {
  const themeStyles = {
    light: 'bg-white',
    dark: 'bg-gray-900',
    primary: 'bg-blue-50',
  };

  return (
    <Wrapper safeAreaView px={4} py={6} className={themeStyles[theme]}>
      {children}
    </Wrapper>
  );
};
```

## Dependencies

### Required Dependencies

- **React Native**: Core platform components
- **Tailwind CSS**: Styling system

### Optional Dependencies

- **react-native-safe-area-context**: For safe area handling
- **react-native-keyboard-controller**: For advanced keyboard handling

### Installation

```bash
# Required
npm install react-native

# Optional - for safe area support
npm install react-native-safe-area-context

# Optional - for keyboard handling
npm install react-native-keyboard-controller
```

## Performance Considerations

- **Component Selection**: Efficient component selection based on props
- **Dependency Management**: Automatic fallbacks for missing dependencies
- **Styling Optimization**: Tailwind variants for efficient styling
- **Memory Management**: Proper cleanup and component lifecycle handling

## Accessibility

The Wrapper component includes accessibility features:

- **Safe Area Support**: Proper handling of device safe areas
- **Keyboard Navigation**: Support for keyboard interactions
- **Screen Reader**: Compatible with screen readers
- **Focus Management**: Proper focus handling for form elements

### Accessibility Best Practices

```tsx
// Always provide safe area for full-screen content
<Wrapper safeAreaView>
  <Content />
</Wrapper>

// Use appropriate keyboard handling for forms
<Wrapper keyboardAvoidingView>
  <Input accessibilityLabel="Email input" />
  <Input accessibilityLabel="Password input" />
</Wrapper>

// Provide proper spacing for touch targets
<Wrapper px={4} py={6}>
  <Button accessibilityLabel="Submit button">Submit</Button>
</Wrapper>
```

## Troubleshooting

### Common Issues

1. **Safe area not working**: Install react-native-safe-area-context
2. **Keyboard handling not working**: Install react-native-keyboard-controller
3. **Styling not applying**: Check Tailwind CSS configuration
4. **Performance issues**: Use appropriate container types for content
5. **Dependency warnings**: Install optional dependencies as needed

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

const handleWrapperRender = () => {
  const info = {
    timestamp: Date.now(),
    hasSafeArea: Boolean(SafeAreaView),
    hasKeyboardController: Boolean(KeyboardAvoidingView),
    props: { safeAreaView: true, scrollView: true },
  };

  setDebugInfo(info);
};

<Box className="space-y-4">
  <Wrapper safeAreaView scrollView onLayout={handleWrapperRender}>
    <String>Debug Wrapper</String>
  </Wrapper>

  {debugInfo.timestamp && (
    <Box className="rounded bg-gray-100 p-4">
      <String size="sm">Debug: {JSON.stringify(debugInfo)}</String>
    </Box>
  )}
</Box>;
```

## Migration from Other Libraries

### From react-native-safe-area-context

```tsx
// Old (direct usage)
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView style={styles.container}>
  <Content />
</SafeAreaView>

// New (Wrapper)
<Wrapper safeAreaView>
  <Content />
</Wrapper>
```

### From custom container implementation

```tsx
// Old (custom implementation)
const Container = ({ children, padding, scrollable }) => {
  const style = [styles.container, padding && styles.padding];

  if (scrollable) {
    return <ScrollView style={style}>{children}</ScrollView>;
  }

  return <View style={style}>{children}</View>;
};

// New (Wrapper)
<Wrapper scrollView px={4} py={6}>
  <Content />
</Wrapper>;
```
