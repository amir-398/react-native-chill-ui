# AutocompleteDropdown Component

A comprehensive and performant autocomplete dropdown component for React Native that provides smart search functionality, auto-completion features, and customizable item rendering across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { AutocompleteDropdown } from 'react-native-chill-ui'`

## Features

- **Smart Search & Filtering**: Real-time search with customizable query functions and debouncing
- **Auto-positioning**: Automatic dropdown positioning (top/bottom) based on available screen space
- **Keyboard Support**: Full keyboard navigation and mobile keyboard handling
- **Highlight Search Terms**: Automatic highlighting of matching search terms in results
- **Custom Rendering**: Fully customizable dropdown items and loading indicators
- **Loading States**: Built-in loading indicators with custom component support
- **Exclude Items**: Ability to exclude specific items from the dropdown
- **Confirmation Mode**: Optional confirmation step before item selection
- **TypeScript Support**: Complete type safety with generic support for any data structure
- **Performance Optimized**: Built with memoization, debouncing, and efficient rendering

## Quick Start

```tsx
import { AutocompleteDropdown } from 'react-native-chill-ui';

// Basic autocomplete dropdown
<AutocompleteDropdown
  dataSet={data}
  valueField="name"
  searchField="name"
  onSelectItem={(item) => console.log('Selected:', item)}
  inputProps={{
    placeholder: 'Search...',
  }}
/>

// With custom rendering and highlight
<AutocompleteDropdown
  dataSet={products}
  valueField="name"
  hasHighlightString
  customDropdownItem={(item) => (
    <Box className="p-3">
      <String className="font-bold">{item.name}</String>
      <String className="text-sm text-gray-500">{item.category}</String>
    </Box>
  )}
  onSelectItem={handleSelect}
/>
```

## Installation Guide

Choose the version that matches your project's styling approach:

| Version        | Command                                        | When to Use                                                                                          | Pros                                                                            | Cons                                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **StyleSheet** | `npm install react-native-chill-ui@stylesheet` | • No CSS-in-JS dependencies<br/>• Maximum performance priority<br/>• Simple React Native project     | • Lightweight<br/>• Fast<br/>• No dependencies                                  | • Limited styling flexibility                         |
| **Tailwind**   | `npm install react-native-chill-ui@tailwind`   | • Already using NativeWind<br/>• Team familiar with Tailwind<br/>• Design system based on utilities  | • Consistent with web Tailwind<br/>• Powerful utility system<br/>• Easy theming | • Requires NativeWind setup<br/>• Larger bundle size  |
| **Hybrid**     | `npm install react-native-chill-ui@hybrid`     | • Building component library<br/>• Uncertain about styling approach<br/>• Want maximum compatibility | • Works in any environment<br/>• Future-proof<br/>• Automatic detection         | • Slightly larger bundle<br/>• More complex internals |

## Configuration

### For Tailwind and Hybrid Versions

When using the Tailwind or Hybrid versions, you must define your application's color palette in your `tailwind.config.js` file.

### Colors

The `className` prop is only available for **Tailwind** and **Hybrid** versions when NativeWind is installed.

### For All Versions

All versions support custom colors through the `style` prop:

```tsx
<AutocompleteDropdown
  dataSet={data}
  valueField="name"
  dropdownProps={{ style: { backgroundColor: '#fff', borderColor: '#ccc' } }}
/>
```

## Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { AutocompleteDropdown } from 'react-native-chill-ui';

const BasicAutocomplete = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const data = [
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Banana', category: 'Fruit' },
    { id: 3, name: 'Carrot', category: 'Vegetable' },
  ];

  return (
    <AutocompleteDropdown
      dataSet={data}
      valueField="name"
      searchField="name"
      onSelectItem={item => setSelectedItem(item)}
      inputProps={{
        placeholder: 'Search fruits and vegetables...',
      }}
    />
  );
};
```

### With Search Highlighting

```tsx
const HighlightedAutocomplete = () => {
  return (
    <AutocompleteDropdown
      dataSet={data}
      valueField="name"
      searchField="name"
      hasHighlightString={true}
      highlightProps={{
        highlightStyle: { backgroundColor: '#FFEB3B', fontWeight: 'bold' },
      }}
      onSelectItem={item => console.log('Selected:', item)}
    />
  );
};
```

### Custom Item Rendering

```tsx
const CustomRenderAutocomplete = () => {
  const products = [
    { id: '1', name: 'iPhone 14', brand: 'Apple', price: 999 },
    { id: '2', name: 'Samsung Galaxy S23', brand: 'Samsung', price: 899 },
    { id: '3', name: 'Google Pixel 7', brand: 'Google', price: 699 },
  ];

  return (
    <AutocompleteDropdown
      dataSet={products}
      valueField="name"
      searchField="name"
      customDropdownItem={item => (
        <Box className="border-b border-gray-200 p-4">
          <String className="text-lg font-semibold">{item.name}</String>
          <String className="text-sm text-gray-600">{item.brand}</String>
          <String className="mt-1 font-bold text-green-600">${item.price}</String>
        </Box>
      )}
      onSelectItem={product => console.log('Selected product:', product)}
    />
  );
};
```

### With Loading State

```tsx
const LoadingAutocomplete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSearch = async (text: string) => {
    setIsLoading(true);
    try {
      const results = await searchAPI(text);
      setData(results);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AutocompleteDropdown
      dataSet={data}
      valueField="title"
      searchField="title"
      isLoading={isLoading}
      onChangeText={handleSearch}
      onSelectItem={item => console.log('Selected:', item)}
      inputProps={{
        placeholder: 'Search...',
      }}
    />
  );
};
```

### Custom Search Query

```tsx
const CustomSearchAutocomplete = () => {
  return (
    <AutocompleteDropdown
      dataSet={data}
      valueField="name"
      searchQuery={(keyword, labelValue) => {
        // Search in multiple fields
        const searchTerm = keyword.toLowerCase();
        return (
          labelValue.toLowerCase().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm)
        );
      }}
      onSelectItem={item => console.log('Selected:', item)}
    />
  );
};
```

### With Excluded Items

```tsx
const ExcludeItemsAutocomplete = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <AutocompleteDropdown
      dataSet={allItems}
      valueField="name"
      excludeItems={selectedItems} // Don't show already selected items
      onSelectItem={item => {
        setSelectedItems([...selectedItems, item]);
      }}
    />
  );
};
```

### Using Ref for Control

```tsx
import { useRef } from 'react';

const ControlledAutocomplete = () => {
  const dropdownRef = useRef<AutocompleteDropdownRefProps>(null);

  return (
    <Box>
      <AutocompleteDropdown
        ref={dropdownRef}
        dataSet={data}
        valueField="name"
        onSelectItem={item => console.log('Selected:', item)}
      />

      <Box className="mt-4 flex-row gap-2">
        <Button onPress={() => dropdownRef.current?.open()}>Open</Button>
        <Button onPress={() => dropdownRef.current?.close()}>Close</Button>
        <Button onPress={() => dropdownRef.current?.toggle()}>Toggle</Button>
      </Box>
    </Box>
  );
};
```

### Dropdown Positioning

```tsx
const PositionedAutocomplete = () => {
  return (
    <AutocompleteDropdown
      dataSet={data}
      valueField="name"
      dropdownPosition="top" // Force dropdown to open above input
      offsetY={10} // Add 10px vertical offset
      offsetX={0} // No horizontal offset
      maxHeight={200} // Limit dropdown height
      minHeight={100} // Minimum dropdown height
      onSelectItem={item => console.log('Selected:', item)}
    />
  );
};
```

### With Confirmation

```tsx
const ConfirmAutocomplete = () => {
  return (
    <AutocompleteDropdown
      dataSet={data}
      valueField="name"
      confirmSelectItem={true}
      onConfirmSelectItem={item => {
        Alert.alert('Confirm Selection', `Do you want to select ${item.name}?`, [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: () => console.log('Confirmed:', item),
          },
        ]);
      }}
      onSelectItem={item => console.log('Selected:', item)}
    />
  );
};
```

## Component Architecture

The AutocompleteDropdown component is composed of several sub-components and utilities:

### Core Components

1. **AutocompleteDropdown** (Main Component)
   - Combines input field with intelligent dropdown
   - Manages search state and filtering
   - Handles user interactions

2. **AutoCompleteDropdownContext**
   - Provides global state management
   - Handles dropdown visibility and positioning
   - Manages keyboard interactions

### Hooks

1. **useAutocompleteDropdownProvider**
   - Global state management for dropdowns
   - Instance registration and tracking

2. **useDropdownActions**
   - Handles open/close/toggle actions
   - Manages user interactions

3. **useDropdownKeyboard**
   - Mobile keyboard handling
   - Auto-scroll on keyboard show

4. **useGetDropdownPosition**
   - Calculates optimal dropdown position
   - Handles screen boundary detection

## API Reference

### AutocompleteDropdownProps

| Prop                         | Type                                                          | Default      | Description                                      |
| ---------------------------- | ------------------------------------------------------------- | ------------ | ------------------------------------------------ |
| `dataSet`                    | `T[]`                                                         | **required** | Array of data items to display                   |
| `valueField`                 | `keyof T`                                                     | **required** | Field to use as the display value and identifier |
| `onSelectItem`               | `(item: T) => void`                                           | **required** | Callback when an item is selected                |
| `searchField`                | `keyof T`                                                     | `valueField` | Field to search in (defaults to valueField)      |
| `closeModalWhenSelectedItem` | `boolean`                                                     | `true`       | Close dropdown after selection                   |
| `confirmSelectItem`          | `boolean`                                                     | `false`      | Require confirmation before selecting            |
| `onConfirmSelectItem`        | `(item: T) => void`                                           | -            | Callback for confirmed selection                 |
| `customDropdownItem`         | `(item: T, selected?: boolean) => React.ReactElement \| null` | -            | Custom renderer for dropdown items               |
| `dropdownItemProps`          | `DropdownItemProps`                                           | -            | Props for styling dropdown items                 |
| `dropdownListProps`          | `Omit<FlatListProps<any>, 'renderItem' \| 'data'>`            | -            | Props for the dropdown FlatList                  |
| `dropdownPosition`           | `'auto' \| 'top' \| 'bottom'`                                 | `'auto'`     | Dropdown positioning: 'auto', 'top', or 'bottom' |
| `dropdownProps`              | `InputDropdownProps`                                          | -            | Props for the dropdown container                 |
| `excludeItems`               | `T[]`                                                         | `[]`         | Items to exclude from dropdown                   |
| `hasHighlightString`         | `boolean`                                                     | `true`       | Highlight search terms in results                |
| `hasPerformSearch`           | `boolean`                                                     | `true`       | Enable search functionality                      |
| `highlightProps`             | `HighlightStringProps`                                        | -            | Props for text highlighting configuration        |
| `inputProps`                 | `InputProps`                                                  | -            | Props to pass to the input component             |
| `isLoading`                  | `boolean`                                                     | `false`      | Show loading indicator                           |
| `maxHeight`                  | `number`                                                      | `300`        | Maximum height of dropdown                       |
| `minHeight`                  | `number`                                                      | `0`          | Minimum height of dropdown                       |
| `offsetX`                    | `number`                                                      | `0`          | Horizontal offset for dropdown positioning       |
| `offsetY`                    | `number`                                                      | `0`          | Vertical offset for dropdown positioning         |
| `onBlur`                     | `() => void`                                                  | -            | Callback when input loses focus                  |
| `onChangeText`               | `(text: string) => void`                                      | -            | Callback function when the input text changes    |
| `onFocus`                    | `() => void`                                                  | -            | Callback when input gains focus                  |
| `searchQuery`                | `(keyword: string, labelValue: string) => boolean`            | -            | Custom search function for filtering items       |

### AutocompleteDropdownRefProps

| Method     | Description                     |
| ---------- | ------------------------------- |
| `open()`   | Programmatically open dropdown  |
| `close()`  | Programmatically close dropdown |
| `toggle()` | Toggle dropdown visibility      |

### DropdownItemProps

| Prop                    | Type          | Description                            |
| ----------------------- | ------------- | -------------------------------------- |
| `className`             | `string`      | Custom CSS classes for the item        |
| `stringItemProps`       | `StringProps` | Props for the string component in item |
| `activeBackgroundColor` | `string`      | Background color when item is selected |

## Best Practices

### Performance

1. **Use debounced search** for better UX:

```tsx
const [searchQuery, setSearchQuery] = useState('');
const debouncedSearch = useDebounce(searchQuery, 300);

<AutocompleteDropdown
  onChangeText={setSearchQuery}
  // Filter data based on debouncedSearch
/>;
```

2. **Limit dataset size** for optimal performance:

```tsx
// Limit to top 50 results
const limitedData = filteredData.slice(0, 50);
```

3. **Implement `keyExtractor`** for FlatList:

```tsx
<AutocompleteDropdown
  dropdownListProps={{
    keyExtractor: item => item.id.toString(),
  }}
/>
```

### Accessibility

1. **Add accessibility labels**:

```tsx
<AutocompleteDropdown
  inputProps={{
    accessibilityLabel: 'Search products',
    accessibilityHint: 'Type to search and select a product',
  }}
/>
```

2. **Use semantic rendering**:

```tsx
const renderAccessibleItem = item => (
  <View accessibilityRole="button" accessibilityLabel={`Select ${item.name}`}>
    <Text>{item.name}</Text>
  </View>
);
```

### Styling

1. **Use consistent spacing** with Tailwind:

```tsx
<AutocompleteDropdown inputProps={{ className: 'mx-4 mb-2' }} dropdownProps={{ className: 'rounded-lg shadow-lg' }} />
```

2. **Handle different screen sizes**:

```tsx
const screenHeight = Dimensions.get('window').height;
const maxHeight = screenHeight * 0.4; // 40% of screen height

<AutocompleteDropdown maxHeight={maxHeight} />;
```

## Troubleshooting

### Common Issues

1. **Dropdown not positioning correctly**
   - Check `offsetX` and `offsetY` values
   - Ensure parent container has proper layout
   - Try different `dropdownPosition` values ('auto', 'top', 'bottom')
   - Verify screen boundaries are being detected

2. **Search not working**
   - Ensure `hasPerformSearch` is `true`
   - Check if `searchField` is set correctly
   - Verify data structure matches expected format
   - Implement custom `searchQuery` if needed

3. **Custom rendering not showing**
   - Ensure `customDropdownItem` returns valid ReactElement
   - Check if data is properly passed to the function
   - Verify styling doesn't hide the content

4. **Performance issues with large datasets**
   - Use `excludeItems` to filter unnecessary items
   - Implement server-side search for large datasets
   - Limit displayed results (e.g., top 50)
   - Consider implementing pagination

5. **Highlight not working**
   - Ensure `hasHighlightString` is `true`
   - Verify search term is being detected
   - Check `highlightProps` configuration

### Version-Specific Issues

**Tailwind Version:**

- Ensure NativeWind is properly configured
- Check if required Tailwind classes are available
- Verify `tailwind.config.js` includes necessary utilities

**StyleSheet Version:**

- Custom styles may override default styles
- Use `StyleSheet.flatten()` for complex style combinations

**Hybrid Version:**

- Component automatically detects NativeWind availability
- Falls back gracefully to StyleSheet if Tailwind is not available

## Integration with Forms

### With Formik

```tsx
import { useFormik } from 'formik';

const formik = useFormik({
  initialValues: { selectedItem: null },
  onSubmit: values => console.log(values),
});

<AutocompleteDropdown
  dataSet={data}
  valueField="name"
  onSelectItem={item => {
    formik.setFieldValue('selectedItem', item);
  }}
/>;
```

### With React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';

const { control } = useForm();

<Controller
  control={control}
  name="selectedItem"
  render={({ field: { onChange, value } }) => (
    <AutocompleteDropdown dataSet={data} valueField="name" onSelectItem={onChange} />
  )}
/>;
```

## File Structure

```
AutocompleteDropdown/
├── README.md                                  # This documentation
├── index.ts                                   # Exports
├── components/
│   ├── AutocompleteDropdown.tsx              # Main hybrid component
│   ├── AutocompleteDropdown.ss.tsx           # StyleSheet variant
│   └── AutocompleteDropdown.tw.tsx           # Tailwind variant
├── context/
│   ├── AutoCompleteDropdownContext.tsx       # Context for dropdown state
│   └── AutoCompleteDropdownContext.props.ts  # Context props
├── hooks/
│   ├── useAutocompleteDropdownProvider.ts    # Provider hook
│   ├── useDropdownActions.ts                 # Action hooks
│   ├── useDropdownKeyboard.ts                # Keyboard handling
│   └── useGetDropdownPosition.ts             # Position calculation
└── types/
    └── index.ts                               # Local types
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

This component is part of the react-native-chill-ui library. See [LICENSE](../../LICENSE.md) for details.
