# InputDropdown Component

A comprehensive and performant dropdown list component for React Native that provides search functionality, loading states, customizable item rendering, and flexible positioning across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { InputDropdown } from 'react-native-chill-ui'`

## Features

- **Search Functionality**: Built-in search input with customizable props
- **Loading States**: Loading indicators with customizable components
- **Empty States**: Custom empty state messages and components
- **Flexible Item Rendering**: Custom render functions for dropdown items
- **Multiple Touch Types**: Support for different touchable components
- **Animation Support**: Smooth opening/closing animations
- **Modal Support**: Optional modal wrapper for overlay positioning
- **Shadow Support**: Customizable shadow effects
- **TypeScript Support**: Fully typed for a better development experience

## Quick Start

```tsx
import { InputDropdown } from 'react-native-chill-ui';

// Basic dropdown
<InputDropdown
  visible={isOpen}
  data={options}
  maxHeight={300}
  onSelectItem={(item) => setSelectedItem(item)}
/>

// Dropdown with search
<InputDropdown
  visible={isOpen}
  data={filteredOptions}
  maxHeight={400}
  hasSearch
  searchInputProps={{ placeholder: "Search options..." }}
  onSelectItem={handleItemSelect}
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
<InputDropdown
  style={{ backgroundColor: '#fff', borderColor: '#ccc' }}
  visible={isOpen}
  data={options}
  maxHeight={300}
/>
```

## Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { InputDropdown } from 'react-native-chill-ui';

const BasicDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const options = [
    { id: 1, label: 'Option 1', value: 'opt1' },
    { id: 2, label: 'Option 2', value: 'opt2' },
    { id: 3, label: 'Option 3', value: 'opt3' },
  ];

  return (
    <InputDropdown
      visible={isOpen}
      data={options}
      maxHeight={300}
      onSelectItem={item => {
        setSelectedItem(item);
        setIsOpen(false);
      }}
    />
  );
};
```

### With Search Functionality

```tsx
const SearchableDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = options.filter(option => option.label.toLowerCase().includes(query.toLowerCase()));
    setFilteredOptions(filtered);
  };

  return (
    <InputDropdown
      visible={isOpen}
      data={filteredOptions}
      maxHeight={400}
      hasSearch
      searchInputProps={{
        placeholder: 'Search options...',
        value: searchQuery,
        onChangeText: handleSearch,
      }}
      onSelectItem={item => {
        setSelectedItem(item);
        setIsOpen(false);
        setSearchQuery('');
      }}
    />
  );
};
```

### With Loading State

```tsx
const LoadingDropdown = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(fetchedOptions);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <InputDropdown
      visible={isOpen}
      data={data}
      isLoading={isLoading}
      maxHeight={350}
      loadingIndicatorProps={{
        name: 'spinner',
        size: 'md',
        color: '#007AFF',
      }}
      onSelectItem={handleItemSelect}
    />
  );
};
```

### Custom Item Rendering

```tsx
const CustomRenderDropdown = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://...' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://...' },
  ];

  const renderUserItem = ({ item }: { item: any }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
      <Image source={{ uri: item.avatar }} style={{ width: 40, height: 40, borderRadius: 20 }} />
      <View style={{ marginLeft: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ fontSize: 14, color: '#666' }}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <InputDropdown
      visible={isOpen}
      data={users}
      maxHeight={400}
      DropdownItemRender={renderUserItem}
      onSelectItem={user => setSelectedUser(user)}
    />
  );
};
```

### Modal Dropdown

```tsx
import { InputDropdownModal } from 'react-native-chill-ui';

const ModalDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 100, left: 20, width: 200 });

  return (
    <InputDropdownModal
      dropdownProps={{
        visible: isOpen,
        data: options,
        maxHeight: 300,
        onSelectItem: item => {
          setSelectedItem(item);
          setIsOpen(false);
        },
      }}
      dropdownPosition={dropdownPosition}
      toggleDropdown={() => setIsOpen(!isOpen)}
      modalProps={{
        animationType: 'fade',
        transparent: true,
      }}
    />
  );
};
```

### Different Touch Types

```tsx
const TouchTypeDropdown = () => {
  return (
    <InputDropdown
      visible={isOpen}
      data={options}
      maxHeight={300}
      itemClickableAs="RipplePressable" // Creates ripple effect on touch
      onSelectItem={handleItemSelect}
    />
  );
};
```

## Component Architecture

The InputDropdown component is composed of several sub-components:

### 1. **InputDropdown** (Main Component)

- Combines base container and list functionality
- Handles overall dropdown logic and state

### 2. **InputDropdownBase**

- Provides the container with search functionality
- Handles animations and styling
- Manages the search input rendering

### 3. **InputDropdownList**

- Renders the scrollable list of items
- Handles loading and empty states
- Manages item selection and custom rendering

### 4. **InputDropdownModal**

- Wraps the dropdown in a modal overlay
- Handles backdrop interaction and positioning
- Useful for absolute positioning scenarios

## API Reference

### InputDropdownProps

| Prop                     | Type                                                                                       | Default                | Description                               |
| ------------------------ | ------------------------------------------------------------------------------------------ | ---------------------- | ----------------------------------------- |
| `visible`                | `boolean`                                                                                  | **required**           | Whether the dropdown is visible           |
| `data`                   | `any[]`                                                                                    | **required**           | Array of data items to display            |
| `maxHeight`              | `number`                                                                                   | **required**           | Maximum height of the dropdown            |
| `minHeight`              | `number`                                                                                   | -                      | Minimum height of the dropdown            |
| `onSelectItem`           | `(item: any) => void`                                                                      | -                      | Callback when an item is selected         |
| `className`              | `string`                                                                                   | -                      | Custom CSS classes (Tailwind/Hybrid only) |
| `style`                  | `StyleProp<ViewStyle>`                                                                     | -                      | Custom style object                       |
| `hasShadow`              | `boolean`                                                                                  | -                      | Whether to show shadow                    |
| `hasSearch`              | `boolean`                                                                                  | -                      | Whether to show search input              |
| `hasAnimation`           | `boolean`                                                                                  | `true`                 | Whether to enable animations              |
| `searchInputProps`       | `InputProps`                                                                               | -                      | Props for the search input                |
| `customSearchInput`      | `React.ReactNode`                                                                          | -                      | Custom search input component             |
| `emptyText`              | `string`                                                                                   | -                      | Text to show when list is empty           |
| `isLoading`              | `boolean`                                                                                  | -                      | Whether the list is loading               |
| `customEmpty`            | `() => React.ReactNode`                                                                    | -                      | Custom empty state component              |
| `dropdownItemProps`      | `DropdownItemProps`                                                                        | -                      | Props for dropdown items                  |
| `loadingIndicatorProps`  | `LoadingIndicatorProps`                                                                    | -                      | Props for loading indicator               |
| `customLoadingIndicator` | `() => React.ReactNode`                                                                    | -                      | Custom loading indicator component        |
| `DropdownItemRender`     | `(item: any) => React.ReactNode`                                                           | -                      | Custom render function for items          |
| `dropdownListProps`      | `Omit<FlatListProps<any>, 'renderItem' \| 'data'>`                                         | -                      | Props for the FlatList component          |
| `itemClickableAs`        | `'TouchableOpacity' \| 'Pressable' \| 'TouchableHighlight' \| 'RipplePressable' \| 'none'` | `'TouchableHighlight'` | Type of touchable component for items     |

### InputDropdownModalProps

| Prop               | Type                                                                | Description                            |
| ------------------ | ------------------------------------------------------------------- | -------------------------------------- |
| `dropdownProps`    | `InputDropdownProps`                                                | Props for the dropdown component       |
| `dropdownPosition` | `{ top?: number; left?: number; width?: number; bottom?: number; }` | Position configuration                 |
| `toggleDropdown`   | `() => void`                                                        | Function to toggle dropdown visibility |
| `modalProps`       | `ModalProps`                                                        | Props for the React Native Modal       |
| `dropdownRef`      | `RefObject<View>`                                                   | Ref for the dropdown container         |
| `wrapperRef`       | `RefObject<View>`                                                   | Ref for the modal wrapper              |

### DropdownItemProps

| Prop                    | Type          | Description                            |
| ----------------------- | ------------- | -------------------------------------- |
| `className`             | `string`      | Custom CSS classes for the item        |
| `stringItemProps`       | `StringProps` | Props for the string component in item |
| `activeBackgroundColor` | `string`      | Background color when item is selected |

### Touch Component Types

| Type                 | Description                                 | Use Case                           |
| -------------------- | ------------------------------------------- | ---------------------------------- |
| `TouchableOpacity`   | Standard opacity feedback on touch          | General purpose, iOS-like feel     |
| `Pressable`          | Modern pressable with customizable feedback | Custom feedback, modern apps       |
| `TouchableHighlight` | Highlight background on touch (default)     | Material Design, Android-like feel |
| `RipplePressable`    | Ripple effect on touch                      | Material Design, premium feel      |
| `none`               | No touch feedback                           | Custom handling, read-only items   |

## Best Practices

### Performance

1. **Use `keyExtractor`** for better FlatList performance:

```tsx
<InputDropdown
  dropdownListProps={{
    keyExtractor: item => item.id.toString(),
  }}
/>
```

2. **Implement search debouncing** for better UX:

```tsx
const [searchQuery, setSearchQuery] = useState('');
const debouncedSearch = useDebounce(searchQuery, 300);

useEffect(() => {
  // Filter data based on debouncedSearch
}, [debouncedSearch]);
```

### Accessibility

1. **Add accessibility labels**:

```tsx
<InputDropdown
  searchInputProps={{
    accessibilityLabel: 'Search dropdown options',
    accessibilityHint: 'Type to filter the dropdown list',
  }}
/>
```

2. **Use semantic item rendering**:

```tsx
const renderAccessibleItem = ({ item }) => (
  <View accessibilityRole="button" accessibilityLabel={`Select ${item.label}`}>
    <Text>{item.label}</Text>
  </View>
);
```

### Styling

1. **Use consistent spacing**:

```tsx
// Tailwind/Hybrid version
<InputDropdown className="mx-4 my-2 bg-white rounded-lg shadow-sm" />

// StyleSheet version
<InputDropdown style={{ margin: 16, backgroundColor: 'white', borderRadius: 8 }} />
```

2. **Handle different screen sizes**:

```tsx
const screenHeight = Dimensions.get('window').height;
const maxHeight = screenHeight * 0.4; // 40% of screen height

<InputDropdown maxHeight={maxHeight} />;
```

## Troubleshooting

### Common Issues

1. **Dropdown not showing**
   - Ensure `visible` prop is `true`
   - Check if `maxHeight` is set and reasonable
   - Verify `data` array is not empty

2. **Search not working**
   - Make sure `hasSearch` is `true`
   - Implement proper filtering logic in `searchInputProps.onChangeText`
   - Check if filtered data is being passed to `data` prop

3. **Items not selectable**
   - Verify `onSelectItem` callback is provided
   - Check if `itemClickableAs` is not set to `'none'`
   - Ensure item data structure matches your render function

4. **Performance issues**
   - Use `keyExtractor` in `dropdownListProps`
   - Implement `getItemLayout` for known item heights
   - Consider virtualization for large datasets

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

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

This component is part of the react-native-chill-ui library. See [LICENSE](../../LICENSE.md) for details.
