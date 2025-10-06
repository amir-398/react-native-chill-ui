# HighlightString Component

A flexible and performant text highlighting component for React Native that highlights specific terms within text content across three different styling approaches.

## Available Versions

This component comes in three versions to match your project's styling approach. You choose the version during installation, but the import statement remains consistent across all versions:

### 1. **StyleSheet Version**

- Uses React Native's built-in StyleSheet API
- Perfect for projects that don't use CSS-in-JS libraries
- Lightweight and performant
- Install: `npm install react-native-chill-ui@stylesheet`

### 2. **Tailwind Version**

- Uses NativeWind/Tailwind CSS classes
- Ideal for projects already using Tailwind CSS
- Requires NativeWind setup and Tailwind configuration
- Install: `npm install react-native-chill-ui@tailwind`

### 3. **Hybrid Version**

- Automatically detects if NativeWind is available
- Falls back to StyleSheet if NativeWind is not installed
- Best for component libraries or projects that need flexibility
- Install: `npm install react-native-chill-ui@hybrid`

**Note**: Regardless of the version you choose, the import statement remains the same: `import { HighlightString } from 'react-native-chill-ui'`

## Features

- **Smart Highlighting**: Automatically highlights specified terms within text content
- **Case Insensitive**: Highlighting works regardless of case differences
- **Regex Safe**: Automatically escapes special regex characters in highlight terms
- **Customizable Styling**: Support for custom colors, fonts, and CSS classes
- **Performance Optimized**: Uses memoization and efficient text splitting
- **TypeScript Support**: Fully typed for a better development experience

## Quick Start

```tsx
import { HighlightString } from 'react-native-chill-ui';

// Basic highlighting
<HighlightString
  content="Hello world, welcome to the world of programming"
  highlightTerm="world"
/>

// With custom styling (Tailwind)
<HighlightString
  content="Search results for 'React Native'"
  highlightTerm="React Native"
  className="text-base text-gray-800"
  highlightClassName="bg-yellow-200 font-bold text-yellow-900"
/>

// With custom styling (StyleSheet)
<HighlightString
  content="Search results for 'React Native'"
  highlightTerm="React Native"
  style={{ fontSize: 16, color: '#374151' }}
  highlightStyle={{ backgroundColor: '#FEF3C7', fontWeight: 'bold', color: '#92400E' }}
/>
```

## Choosing the Right Version

Select the appropriate version during installation based on your project's needs:

| Version        | Installation Command                           | Use When                                                                                             | Pros                                                                            | Cons                                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **StyleSheet** | `npm install react-native-chill-ui@stylesheet` | • No CSS-in-JS dependencies<br/>• Maximum performance needed<br/>• Simple styling requirements       | • Lightweight<br/>• Fast performance<br/>• No external dependencies             | • Less flexible<br/>• Manual theme management         |
| **Tailwind**   | `npm install react-native-chill-ui@tailwind`   | • Already using NativeWind<br/>• Team familiar with Tailwind<br/>• Design system based on utilities  | • Consistent with web Tailwind<br/>• Powerful utility system<br/>• Easy theming | • Requires NativeWind setup<br/>• Larger bundle size  |
| **Hybrid**     | `npm install react-native-chill-ui@hybrid`     | • Building component library<br/>• Uncertain about styling approach<br/>• Want maximum compatibility | • Works in any environment<br/>• Future-proof<br/>• Automatic detection         | • Slightly larger bundle<br/>• More complex internals |

## Configuration

### For Tailwind and Hybrid Versions

When using the Tailwind or Hybrid versions, you must define your application's color palette in your `tailwind.config.js` file.

### Default Highlight Style

The component comes with a default highlight style:

- **StyleSheet**: Light orange background (`#FFE4B5`)
- **Tailwind**: `bg-[#FFE4B5]` class

## Examples

### Basic Usage

```tsx
import { HighlightString } from 'react-native-chill-ui';

const BasicHighlight = () => {
  return <HighlightString content="Hello world, welcome to the world of programming" highlightTerm="world" />;
};

const CustomStyledHighlight = () => {
  return (
    <HighlightString
      content="Search results for 'React Native'"
      highlightTerm="React Native"
      className="text-lg font-medium"
      highlightClassName="bg-blue-100 text-blue-800 font-bold"
    />
  );
};
```

### Search Results Highlighting

```tsx
import { HighlightString } from 'react-native-chill-ui';

const SearchResults = ({ query, results }) => {
  return (
    <Box className="space-y-2">
      {results.map((result, index) => (
        <HighlightString
          key={index}
          content={result.title}
          highlightTerm={query}
          className="text-lg font-medium"
          highlightClassName="bg-yellow-200 text-yellow-900 font-bold"
        />
      ))}
    </Box>
  );
};
```

### Multi-term Highlighting

```tsx
import { HighlightString } from 'react-native-chill-ui';

const MultiHighlight = ({ text, terms }) => {
  return (
    <Box className="space-y-1">
      {terms.map((term, index) => (
        <HighlightString
          key={index}
          content={text}
          highlightTerm={term}
          className="text-base"
          highlightClassName={`${index === 0 ? 'bg-yellow-200' : 'bg-green-200'} font-bold`}
        />
      ))}
    </Box>
  );
};
```

### Custom Styling with StyleSheet

```tsx
import { HighlightString } from 'react-native-chill-ui';

const CustomHighlight = () => (
  <HighlightString
    content="This is a custom styled highlight example"
    highlightTerm="custom styled"
    style={{
      fontSize: 18,
      lineHeight: 24,
      color: '#1F2937',
    }}
    highlightStyle={{
      backgroundColor: '#FEF3C7',
      color: '#92400E',
      fontWeight: 'bold',
      paddingHorizontal: 4,
      borderRadius: 4,
    }}
  />
);
```

### With String Component Props

```tsx
import { HighlightString } from 'react-native-chill-ui';

const AdvancedHighlight = () => (
  <HighlightString
    content="Advanced highlighting with custom string props"
    highlightTerm="highlighting"
    className="text-xl font-semibold"
    highlightClassName="bg-purple-200 text-purple-900"
    stringProps={{
      size: 'lg',
      colorVariant: 'primary',
    }}
    highlightStringProps={{
      size: 'lg',
      colorVariant: 'secondary',
    }}
  />
);
```

## Styling Guidelines

### Best Practices

1. **Contrast**: Ensure sufficient contrast between highlight and text colors
2. **Accessibility**: Don't rely solely on color for highlighting
3. **Performance**: Use `useFastText={false}` for highlighted text (automatically applied)
4. **Consistency**: Use consistent highlight styles across your app

### Color Recommendations

```tsx
// Good contrast combinations
highlightClassName = 'bg-yellow-200 text-yellow-900'; // Yellow
highlightClassName = 'bg-blue-100 text-blue-800'; // Blue
highlightClassName = 'bg-green-100 text-green-800'; // Green
highlightClassName = 'bg-purple-100 text-purple-800'; // Purple

// Avoid low contrast
highlightClassName = 'bg-yellow-100 text-yellow-200'; // Too light
highlightClassName = 'bg-gray-200 text-gray-300'; // Too similar
```

## Props

| Prop                   | Type                   | Default      | Description                                               |
| ---------------------- | ---------------------- | ------------ | --------------------------------------------------------- |
| `content`              | `string`               | **Required** | The full text to display                                  |
| `highlightTerm`        | `string`               | **Required** | The term to highlight within the text                     |
| `className`            | `string`               | -            | Custom CSS classes for the container (NativeWind only)    |
| `highlightClassName`   | `string`               | -            | Custom CSS classes for highlighted text (NativeWind only) |
| `style`                | `StyleProp<TextStyle>` | -            | Custom styles for the container                           |
| `highlightStyle`       | `StyleProp<TextStyle>` | -            | Custom styles for the highlighted text                    |
| `stringProps`          | `StringProps`          | -            | Props for the main string component                       |
| `highlightStringProps` | `StringProps`          | -            | Props for the highlighted string component                |

### StyleSheet Version Props

| Prop                   | Type                   | Default      | Description                                |
| ---------------------- | ---------------------- | ------------ | ------------------------------------------ |
| `content`              | `string`               | **Required** | The full text to display                   |
| `highlightTerm`        | `string`               | **Required** | The term to highlight within the text      |
| `style`                | `StyleProp<TextStyle>` | -            | Custom styles for the container            |
| `highlightStyle`       | `StyleProp<TextStyle>` | -            | Custom styles for the highlighted text     |
| `stringProps`          | `StringProps`          | -            | Props for the main string component        |
| `highlightStringProps` | `StringProps`          | -            | Props for the highlighted string component |

### Tailwind Version Props

| Prop                   | Type                   | Default      | Description                                |
| ---------------------- | ---------------------- | ------------ | ------------------------------------------ |
| `content`              | `string`               | **Required** | The full text to display                   |
| `highlightTerm`        | `string`               | **Required** | The term to highlight within the text      |
| `className`            | `string`               | -            | Custom CSS classes for the container       |
| `highlightClassName`   | `string`               | -            | Custom CSS classes for highlighted text    |
| `style`                | `StyleProp<TextStyle>` | -            | Custom styles for the container            |
| `highlightStyle`       | `StyleProp<TextStyle>` | -            | Custom styles for the highlighted text     |
| `stringProps`          | `StringProps`          | -            | Props for the main string component        |
| `highlightStringProps` | `StringProps`          | -            | Props for the highlighted string component |

## Performance Considerations

- The component uses `React.memo` for optimal re-rendering
- Text splitting is performed efficiently with regex
- Special regex characters are automatically escaped
- `useFastText={false}` is applied to highlighted segments for proper rendering

## TypeScript Support

The component is fully typed with comprehensive TypeScript definitions:

```tsx
import { HighlightStringProps, HighlightStringPropsTw, HighlightStringPropsSs } from 'react-native-chill-ui';

// Type-safe props
const props: HighlightStringProps = {
  content: 'Hello world',
  highlightTerm: 'world',
  className: 'text-base',
  highlightClassName: 'bg-yellow-200',
};
```

## Migration Guide

### From Custom Highlighting Solutions

If you're migrating from a custom highlighting solution:

1. Replace your custom highlighting logic with `HighlightString`
2. Move your highlight styles to `highlightClassName` or `highlightStyle`
3. Update your text content to use the `content` prop
4. Set your search terms in the `highlightTerm` prop

### Between Versions

Switching between versions is straightforward:

```tsx
// StyleSheet to Tailwind
// Before
<HighlightString
  content="text"
  highlightTerm="term"
  style={{ fontSize: 16 }}
  highlightStyle={{ backgroundColor: '#yellow' }}
/>

// After
<HighlightString
  content="text"
  highlightTerm="term"
  className="text-base"
  highlightClassName="bg-yellow-200"
/>
```

## Troubleshooting

### Common Issues

1. **Highlighting not working**: Ensure `highlightTerm` is not empty and matches text in `content`
2. **Styling not applied**: Check that your CSS classes are properly configured (Tailwind version)
3. **Performance issues**: The component is optimized, but avoid very long text content

### Debug Tips

```tsx
// Debug highlighting
<HighlightString
  content="Debug this text"
  highlightTerm="Debug"
  highlightClassName="bg-red-200 border border-red-500" // Visual debug
/>
```

## Contributing

When contributing to this component:

1. Maintain consistency across all three versions
2. Update TypeScript definitions
3. Add comprehensive tests
4. Update documentation and examples
5. Follow the established patterns for styling approaches

## License

This component is part of the react-native-chill-ui library and follows the same licensing terms.
