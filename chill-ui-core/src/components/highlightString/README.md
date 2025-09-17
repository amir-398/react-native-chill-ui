# HighlightString Component

A flexible text highlighting component for React Native applications that automatically highlights specific terms within text content. **Automatically detects NativeWind availability and falls back to StyleSheet if needed.**

## Features

- **Smart Highlighting**: Automatically highlights all occurrences of a specified term within text
- **Case-Insensitive**: Highlights terms regardless of case differences
- **Regex Safe**: Properly escapes special regex characters in highlight terms
- **Flexible Styling**: Support for both NativeWind classes and StyleSheet styles
- **Performance Optimized**: Uses memoization for better performance
- **TypeScript**: Complete type safety with proper interfaces
- **NativeWind Compatible**: Automatically adapts to NativeWind or StyleSheet environments
- **Smart Styling**: Uses Tailwind classes when NativeWind is available, falls back to StyleSheet otherwise

## NativeWind Compatibility

The HighlightString component automatically detects whether NativeWind is installed in your project:

- **With NativeWind**: Uses Tailwind CSS classes via the `className` and `highlightClassName` props for styling
- **Without NativeWind**: Falls back to StyleSheet-based styling with the `style` and `highlightStyle` props

**Note**: The `className` and `highlightClassName` props are only available when NativeWind is installed. When using StyleSheet, use the `style` and `highlightStyle` props instead.

## Basic Usage

```tsx
import { HighlightString } from 'chill-ui';

function Example() {
  return (
    <HighlightString
      text="Hello world, welcome to the world of programming"
      highlightTerm="world"
      className="text-base text-gray-800"
      highlightClassName="bg-yellow-200 font-bold"
    />
  );
}
```

## Props

### HighlightStringProps

| Prop                   | Type                                                      | Required | Default                          | Description                                               |
| ---------------------- | --------------------------------------------------------- | -------- | -------------------------------- | --------------------------------------------------------- |
| `text`                 | `string`                                                  | ✅       | -                                | The full text to display                                  |
| `highlightTerm`        | `string`                                                  | ✅       | -                                | The term to highlight within the text                     |
| `className`            | `string`                                                  | ❌       | -                                | Custom CSS classes (NativeWind only)                      |
| `highlightClassName`   | `string`                                                  | ❌       | -                                | Custom CSS classes for highlighted text (NativeWind only) |
| `style`                | `StyleProp<TextStyle>`                                    | ❌       | -                                | Custom styles (StyleSheet only)                           |
| `highlightStyle`       | `StyleProp<TextStyle>`                                    | ❌       | `{ backgroundColor: '#FFE4B5' }` | Custom styles for highlighted text (StyleSheet only)      |
| `stringProps`          | `Omit<StringProps, 'children' \| 'style' \| 'className'>` | ✅       | -                                | Props for the main string component                       |
| `highlightStringProps` | `Omit<StringProps, 'children' \| 'style' \| 'className'>` | ❌       | -                                | Props for the highlighted string component                |

## Examples

### Basic Highlighting

```tsx
<HighlightString
  text="Hello world, welcome to the world of programming"
  highlightTerm="world"
  className="text-base text-gray-800"
  highlightClassName="bg-yellow-200 font-bold"
/>
```

### Custom Highlight Style

```tsx
<HighlightString
  text="Search results for 'react native'"
  highlightTerm="react native"
  className="text-lg text-gray-900"
  highlightClassName="bg-blue-100 text-blue-800 underline"
/>
```

### Without NativeWind (StyleSheet Fallback)

```tsx
<HighlightString
  text="Important information about security"
  highlightTerm="security"
  style={{ fontSize: 16, color: '#374151' }}
  highlightStyle={{
    backgroundColor: '#FEF3C7',
    fontWeight: 'bold',
    color: '#92400E',
  }}
/>
```

### Custom String Props

```tsx
<HighlightString
  text="Click here to learn more about our services"
  highlightTerm="click here"
  className="text-base text-gray-700"
  highlightClassName="bg-green-100 text-green-800 cursor-pointer"
  stringProps={{
    onPress: () => console.log('Text pressed'),
    selectable: true,
  }}
  highlightStringProps={{
    onPress: () => console.log('Highlighted text pressed'),
    selectable: true,
  }}
/>
```

### Multiple Highlight Terms

```tsx
// To highlight multiple terms, you can chain the component
<HighlightString
  text="Welcome to our amazing platform"
  highlightTerm="amazing"
  className="text-lg text-gray-800"
  highlightClassName="bg-purple-100 text-purple-800"
  stringProps={{
    children: (
      <HighlightString
        text="Welcome to our amazing platform"
        highlightTerm="platform"
        highlightClassName="bg-blue-100 text-blue-800"
      />
    ),
  }}
/>
```

## Styling with NativeWind vs StyleSheet

### With NativeWind (Recommended)

```tsx
<HighlightString
  text="Highlight important keywords in this text"
  highlightTerm="important keywords"
  className="text-base leading-relaxed text-gray-800"
  highlightClassName="bg-yellow-200 text-yellow-900 font-semibold px-1 rounded"
/>
```

### Without NativeWind (Fallback)

```tsx
<HighlightString
  text="Highlight important keywords in this text"
  highlightTerm="important keywords"
  style={{
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  }}
  highlightStyle={{
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    fontWeight: '600',
    paddingHorizontal: 4,
    borderRadius: 4,
  }}
/>
```

## Best Practices

### 1. Performance Optimization

```tsx
// ✅ Good: Use memo for the component
const MemoizedHighlight = memo(HighlightString);

// ✅ Good: Avoid recreating highlight terms on every render
const highlightTerm = useMemo(() => 'important', []);
```

### 2. Accessibility

```tsx
// ✅ Good: Provide meaningful highlight terms
<HighlightString
  text="Your search for 'react native' returned 15 results"
  highlightTerm="react native"
  highlightClassName="bg-blue-100 text-blue-800 font-semibold"
/>

// ❌ Avoid: Highlighting every word
<HighlightString
  text="This is a sample text"
  highlightTerm="is" // Too generic
/>
```

### 3. Styling Strategy

```tsx
// ✅ Good: Use className when NativeWind is available
<HighlightString
  text="Highlight this text"
  highlightTerm="this"
  className="text-base text-gray-800"
  highlightClassName="bg-yellow-200 font-bold"
/>

// ✅ Good: Use style when NativeWind is not available
<HighlightString
  text="Highlight this text"
  highlightTerm="this"
  style={{ fontSize: 16, color: '#374151' }}
  highlightStyle={{ backgroundColor: '#FEF3C7', fontWeight: 'bold' }}
/>
```

### 4. Text Content

```tsx
// ✅ Good: Meaningful text with relevant highlights
<HighlightString
  text="Your order #12345 has been shipped"
  highlightTerm="#12345"
  highlightClassName="bg-green-100 text-green-800 font-mono"
/>

// ❌ Avoid: Highlighting very long terms
<HighlightString
  text="This is a very long text that might be hard to read"
  highlightTerm="This is a very long text that might be hard to read"
  // This makes the highlight less effective
/>
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface HighlightStringProps {
  text: string;
  highlightTerm: string;
  className?: string; // NativeWind only
  highlightClassName?: string; // NativeWind only
  style?: StyleProp<TextStyle>; // StyleSheet only
  highlightStyle?: StyleProp<TextStyle>; // StyleSheet only
  stringProps: Omit<StringProps, 'children' | 'style' | 'className'>;
  highlightStringProps?: Omit<StringProps, 'children' | 'style' | 'className'>;
}
```

## Performance Considerations

- **Memoization**: The component is wrapped with `memo` to prevent unnecessary re-renders
- **Regex Compilation**: Regex is compiled once per render, optimized for performance
- **String Splitting**: Efficient string splitting algorithm for highlighting
- **Conditional Rendering**: NativeWind detection is memoized for performance

## Dependencies

- **React Native**: Core components (Text)
- **String**: For text rendering and styling
- **NativeWind**: For Tailwind CSS support (optional)
- **Utils**: For NativeWind detection

## Accessibility

The component supports standard accessibility features:

- **Text Selection**: Configurable text selection via `stringProps.selectable`
- **Screen Reader**: Compatible with screen readers
- **Touch Interaction**: Supports press events via `stringProps.onPress`
- **Color Contrast**: Ensure highlight colors provide sufficient contrast

## Migration Notes

If you're upgrading from a previous version:

- **Styling**: The component now automatically detects NativeWind and adapts accordingly
- **Props**: `className` and `highlightClassName` are now NativeWind-only, `style` and `highlightStyle` are StyleSheet-only
- **Performance**: Improved performance with better memoization and conditional rendering
- **Fallback**: Automatic fallback to StyleSheet when NativeWind is not available

## Common Use Cases

### Search Results

```tsx
<HighlightString
  text={`Found ${results.length} results for "${searchQuery}"`}
  highlightTerm={searchQuery}
  className="text-sm text-gray-600"
  highlightClassName="bg-blue-100 text-blue-800 font-medium"
/>
```

### Form Validation

```tsx
<HighlightString
  text="Please enter a valid email address"
  highlightTerm="valid email address"
  className="text-sm text-red-600"
  highlightClassName="bg-red-100 text-red-800 font-semibold"
/>
```

### Code Documentation

```tsx
<HighlightString
  text="Use the useState hook to manage component state"
  highlightTerm="useState"
  className="font-mono text-sm text-gray-700"
  highlightClassName="bg-purple-100 text-purple-800 font-bold"
/>
```

### User Notifications

```tsx
<HighlightString
  text="User John Doe has joined the channel"
  highlightTerm="John Doe"
  className="text-sm text-gray-600"
  highlightClassName="bg-green-100 text-green-800 font-medium"
/>
```
