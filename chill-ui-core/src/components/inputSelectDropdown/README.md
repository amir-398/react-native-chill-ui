# InputSelectDropdown Component

A flexible and customizable InputSelectDropdown component for React Native applications that combines an input field with a searchable dropdown. Supports custom rendering, highlighting, filtering, and keyboard navigation across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { InputSelectDropdown } from 'react-native-chill-ui'`

## Features

- **Searchable Dropdown**: Built-in search functionality with customizable search fields
- **Custom Rendering**: Support for custom dropdown item rendering
- **Highlighting**: Automatic highlighting of search terms in dropdown items
- **Flexible Data**: Works with any data structure using field mapping
- **Positioning**: Smart dropdown positioning (auto, top, bottom)
- **Filtering**: Built-in filtering with custom search query support
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Modal Integration**: Uses modal for better mobile experience
- **TypeScript Support**: Fully typed for a better development experience
- **Accessible**: Proper focus management and screen reader support

## Quick Start

```tsx
import { InputSelectDropdown } from 'react-native-chill-ui';

// Basic usage
<InputSelectDropdown
  dataSet={[
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]}
  valueField="name"
  onSelectItem={(item) => setSelectedUser(item)}
/>

// With search functionality
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  searchField="email"
  hasSearch
  hasHighlightString
  onSelectItem={(item) => setSelectedUser(item)}
/>

// With custom rendering
<InputSelectDropdown
  dataSet={products}
  valueField="name"
  onSelectItem={(item) => setSelectedProduct(item)}
  customDropdownItem={(item, selected) => (
    <Box className={selected ? 'bg-blue-100' : ''}>
      <String>{item.name}</String>
      <String size="sm" color="gray">${item.price}</String>
    </Box>
  )}
/>
```

## Props

| Prop                         | Type                                                          | Required | Default               | Description                                         |
| ---------------------------- | ------------------------------------------------------------- | -------- | --------------------- | --------------------------------------------------- |
| `closeModalWhenSelectedItem` | `boolean`                                                     | ❌       | `true`                | Whether to close modal when item is selected        |
| `customDropdownItem`         | `(item: T, selected?: boolean) => ReactElement`               | ❌       | -                     | Custom render function for dropdown items           |
| `customSearchInput`          | `React.ReactNode`                                             | ❌       | -                     | Custom search input component                       |
| `dataSet`                    | `T[]`                                                         | ✅       | -                     | Array of data items to display in dropdown          |
| `dropdownItemProps`          | `DropdownItemProps`                                           | ❌       | -                     | Props for dropdown items                            |
| `dropdownPosition`           | `'auto' \| 'top' \| 'bottom'`                                 | ❌       | `'auto'`              | Position of dropdown relative to input              |
| `dropdownProps`              | `Partial<InputDropdownProps>`                                 | ❌       | -                     | Additional props for dropdown component             |
| `excludeItems`               | `T[]`                                                         | ❌       | `[]`                  | Items to exclude from dropdown                      |
| `excludeSearchItems`         | `T[]`                                                         | ❌       | `[]`                  | Items to exclude from search results                |
| `hasHighlightString`         | `boolean`                                                     | ❌       | `false`               | Whether to highlight search terms in dropdown items |
| `hasSearch`                  | `boolean`                                                     | ❌       | `false`               | Whether to show search functionality                |
| `highlightProps`             | `Partial<HighlightStringProps>`                               | ❌       | -                     | Props for highlight string functionality            |
| `inputProps`                 | `InputProps`                                                  | ❌       | -                     | Props for the input component                       |
| `maxHeight`                  | `number`                                                      | ❌       | `200`                 | Maximum height of dropdown                          |
| `minHeight`                  | `number`                                                      | ❌       | `100`                 | Minimum height of dropdown                          |
| `offsetX`                    | `number`                                                      | ❌       | `0`                   | Horizontal offset for dropdown positioning          |
| `offsetY`                    | `number`                                                      | ❌       | `4`                   | Vertical offset for dropdown positioning            |
| `onBlur`                     | `() => void`                                                  | ❌       | -                     | Callback when input loses focus                     |
| `onFocus`                    | `() => void`                                                  | ❌       | -                     | Callback when input gains focus                     |
| `onSelectItem`               | `(item: T) => void`                                           | ✅       | -                     | Callback when item is selected                      |
| `searchField`                | `string`                                                      | ❌       | -                     | Field name to use for search                        |
| `searchInputProps`           | `InputProps`                                                  | ❌       | -                     | Props for search input                              |
| `searchQuery`                | `(keyword: string, labelValue: string) => boolean`            | ❌       | -                     | Custom search query function                        |
| `valueField`                 | `string`                                                      | ✅       | -                     | Field name to use as display value                  |
| `open`                       | `boolean`                                                     | ❌       | -                     | Whether the dropdown is open (controlled mode)      |
| `onOpenChange`               | `(open: boolean) => void`                                     | ❌       | -                     | Callback when dropdown open state changes           |
| `defaultOpen`                | `boolean`                                                     | ❌       | `false`               | Default open state (uncontrolled mode)              |
| `itemClickableAs`            | `'touchable-opacity' \| 'pressable' \| 'touchable-highlight'` | ❌       | `'touchable-opacity'` | Type of touchable component for items               |

### DropdownItemProps Type

```typescript
{
  className?: string;                    // (only NativeWind) Custom CSS classes
  style?: StyleProp<ViewStyle>;          // (only StyleSheet) Custom style
  stringItemProps?: StringProps;         // Props for String component
  activeBackgroundColor?: string;        // Background color when item is active
}
```

### Touch Component Types

The `itemClickableAs` prop supports different touchable components for dropdown items:

| Type                  | Description                                  | Use Case                           |
| --------------------- | -------------------------------------------- | ---------------------------------- |
| `touchable-opacity`   | Standard opacity feedback on touch (default) | General purpose, iOS-like feel     |
| `pressable`           | Modern pressable with customizable feedback  | Custom feedback, modern apps       |
| `touchable-highlight` | Highlight background on touch                | Material Design, Android-like feel |

## Choosing the Right Version

Select the appropriate version during installation based on your project's needs:

| Version        | Installation Command                           | Use When                                                                                             | Pros                                                                            | Cons                                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **StyleSheet** | `npm install react-native-chill-ui@stylesheet` | • No CSS-in-JS dependencies<br/>• Maximum performance needed<br/>• Simple styling requirements       | • Lightweight<br/>• Fast performance<br/>• No external dependencies             | • Less flexible<br/>• Manual theme management         |
| **Tailwind**   | `npm install react-native-chill-ui@tailwind`   | • Already using NativeWind<br/>• Team familiar with Tailwind<br/>• Design system based on utilities  | • Consistent with web Tailwind<br/>• Powerful utility system<br/>• Easy theming | • Requires NativeWind setup<br/>• Larger bundle size  |
| **Hybrid**     | `npm install react-native-chill-ui@hybrid`     | • Building component library<br/>• Uncertain about styling approach<br/>• Want maximum compatibility | • Works in any environment<br/>• Future-proof<br/>• Automatic detection         | • Slightly larger bundle<br/>• More complex internals |

## Examples

### Basic Usage

```tsx
// Simple dropdown with basic data
<InputSelectDropdown
  dataSet={[
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' },
  ]}
  valueField="name"
  onSelectItem={item => setSelectedFruit(item)}
/>
```

### With Search

```tsx
// Dropdown with search functionality
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  searchField="email"
  hasSearch
  hasHighlightString
  onSelectItem={user => setSelectedUser(user)}
/>
```

### Custom Rendering

```tsx
// Custom dropdown item rendering
<InputSelectDropdown
  dataSet={products}
  valueField="name"
  onSelectItem={product => setSelectedProduct(product)}
  customDropdownItem={(item, selected) => (
    <Box className={selected ? 'bg-blue-100' : ''}>
      <String>{item.name}</String>
      <String size="sm" color="gray">
        ${item.price}
      </String>
      <String size="xs" color="muted">
        {item.category}
      </String>
    </Box>
  )}
/>
```

### With Custom Search Input

```tsx
// Custom search input component
<InputSelectDropdown
  dataSet={countries}
  valueField="name"
  hasSearch
  onSelectItem={country => setSelectedCountry(country)}
  customSearchInput={<Input placeholder="Search countries..." leftIconAction={{ name: 'search-solid' }} />}
/>
```

### Different Positions

```tsx
// Auto positioning (default)
<InputSelectDropdown
  dataSet={items}
  valueField="name"
  dropdownPosition="auto"
  onSelectItem={handleSelect}
/>

// Force top position
<InputSelectDropdown
  dataSet={items}
  valueField="name"
  dropdownPosition="top"
  onSelectItem={handleSelect}
/>

// Force bottom position
<InputSelectDropdown
  dataSet={items}
  valueField="name"
  dropdownPosition="bottom"
  onSelectItem={handleSelect}
/>
```

### With Filtering and Exclusions

```tsx
// Exclude certain items from dropdown
<InputSelectDropdown
  dataSet={allUsers}
  valueField="name"
  excludeItems={selectedUsers}
  onSelectItem={(user) => addUser(user)}
/>

// Exclude items from search results
<InputSelectDropdown
  dataSet={products}
  valueField="name"
  searchField="description"
  hasSearch
  excludeSearchItems={outOfStockProducts}
  onSelectItem={(product) => setSelectedProduct(product)}
/>
```

### Custom Search Query

```tsx
// Custom search logic
<InputSelectDropdown
  dataSet={articles}
  valueField="title"
  searchField="content"
  hasSearch
  searchQuery={(keyword, content) => {
    // Custom search logic - e.g., search in multiple fields
    return (
      content.toLowerCase().includes(keyword.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
    );
  }}
  onSelectItem={article => setSelectedArticle(article)}
/>
```

### With Input Props

```tsx
// Custom input styling and behavior
<InputSelectDropdown
  dataSet={cities}
  valueField="name"
  onSelectItem={city => setSelectedCity(city)}
  inputProps={{
    placeholder: 'Select a city...',
    isDisabled: isLoading,
    rightIconAction: {
      iconName: 'map-marker-solid',
      iconColor: '#3B82F6',
    },
  }}
/>
```

### With Dropdown Customization

```tsx
// Custom dropdown styling and behavior
<InputSelectDropdown
  dataSet={options}
  valueField="label"
  onSelectItem={option => setSelectedOption(option)}
  dropdownProps={{
    maxHeight: 300,
    minHeight: 150,
    backgroundColor: '#F8F9FA',
  }}
  dropdownItemProps={{
    activeBackgroundColor: '#E3F2FD',
    stringItemProps: {
      size: 'md',
      color: 'primary',
    },
  }}
/>
```

### Controlled Mode

```tsx
// Controlled dropdown with external state management
const [isOpen, setIsOpen] = useState(false);

<InputSelectDropdown
  dataSet={users}
  valueField="name"
  open={isOpen}
  onOpenChange={setIsOpen}
  onSelectItem={user => {
    setSelectedUser(user);
    setIsOpen(false); // Close after selection
  }}
/>;
```

### Uncontrolled Mode with Default Open

```tsx
// Dropdown that opens by default
<InputSelectDropdown
  dataSet={recentItems}
  valueField="name"
  defaultOpen={true}
  onSelectItem={item => setSelectedItem(item)}
/>
```

### Mixed Usage Examples

```tsx
// Always open dropdown (controlled)
<InputSelectDropdown
  dataSet={filters}
  valueField="label"
  open={true}
  onOpenChange={() => {}} // Prevent closing
  onSelectItem={filter => applyFilter(filter)}
/>

// Conditionally open dropdown
<InputSelectDropdown
  dataSet={suggestions}
  valueField="text"
  open={showSuggestions}
  onOpenChange={setShowSuggestions}
  onSelectItem={suggestion => {
    setValue(suggestion.text);
    setShowSuggestions(false);
  }}
/>
```

## Controlled vs Uncontrolled Mode

The component supports both controlled and uncontrolled modes for managing the dropdown's open state:

### Controlled Mode

Use `open` and `onOpenChange` props when you need full control over the dropdown's state:

```tsx
const [isOpen, setIsOpen] = useState(false);

<InputSelectDropdown
  open={isOpen}
  onOpenChange={setIsOpen}
  // ... other props
/>;
```

**When to use controlled mode:**

- You need to programmatically open/close the dropdown
- The dropdown state depends on external conditions
- You want to prevent closing in certain scenarios
- You need to sync the dropdown state with other components

### Uncontrolled Mode

Use `defaultOpen` prop when you want the component to manage its own state:

```tsx
<InputSelectDropdown
  defaultOpen={true} // Opens by default
  // ... other props
/>
```

**When to use uncontrolled mode:**

- Simple use cases where you don't need external state control
- The dropdown behavior is straightforward
- You want the component to handle its own state internally

### Important Notes

- **Don't mix modes**: Never use `open`/`onOpenChange` with `defaultOpen` at the same time
- **Controlled takes precedence**: If `open` is provided, the component becomes controlled regardless of `defaultOpen`
- **State management**: In controlled mode, you're responsible for managing the state; in uncontrolled mode, the component handles it internally

## Best Practices

1. **Always provide `valueField`** - This is required to display the correct value in the input
2. **Use `searchField`** - When enabling search, specify which field to search in
3. **Choose the right mode** - Use controlled mode for complex state management, uncontrolled for simple cases
4. **Handle large datasets** - Consider pagination or virtual scrolling for very large datasets
5. **Provide meaningful placeholders** - Use descriptive placeholder text for better UX
6. **Use custom rendering wisely** - Only use custom rendering when the default doesn't meet your needs
7. **Consider accessibility** - Ensure proper focus management and screen reader support
8. **Optimize performance** - Use `excludeItems` to reduce unnecessary filtering
9. **Test on different screen sizes** - Ensure dropdown positioning works on all devices

## Performance Considerations

- The component uses memoization for computed values to prevent unnecessary re-renders
- Search filtering is optimized with debouncing
- Large datasets should be handled with pagination or virtual scrolling
- Custom rendering functions should be memoized with `useCallback`

## TypeScript

The component is fully typed with TypeScript. Import types as needed:

```tsx
import { InputSelectDropdown } from 'react-native-chill-ui';
import type { InputSelectDropdownPropsTw, InputSelectDropdownPropsSs } from 'react-native-chill-ui';

// For Tailwind/Hybrid versions
const MyDropdown: React.FC<{ users: User[] }> = ({ users }) => (
  <InputSelectDropdown dataSet={users} valueField="name" onSelectItem={user => console.log(user)} />
);
```

## Related Components

- **Input**: For text input with validation
- **InputDropdown**: For basic dropdown functionality
- **AutocompleteDropdown**: For autocomplete input with suggestions
- **Select**: For simple selection without search

## File Structure

```
inputSelectDropdown/
├── components/
│   ├── InputSelectDropdown.tsx       # Hybrid version (auto-detects NativeWind)
│   ├── InputSelectDropdown.ss.tsx    # StyleSheet version
│   └── InputSelectDropdown.tw.tsx    # Tailwind/NativeWind version
├── styles/
│   ├── InputSelectDropdown.ss.styles.ts  # StyleSheet styles
│   └── InputSelectDropdown.tw.styles.ts  # Tailwind variants
├── hooks/
│   └── useInputSelectDropdown.ts     # Main hook for dropdown logic
├── utils/
│   └── defaultProps.ts               # Default prop values
├── types/
│   ├── inputSelectDropdown.ss.types.ts  # StyleSheet types
│   └── inputSelectDropdown.tw.types.ts  # Tailwind types
└── README.md                         # This file
```

## Inspiration

This component is inspired by Material-UI's [Autocomplete component](https://mui.com/material-ui/react-autocomplete/) and shadcn/ui's [Combobox component](https://ui.shadcn.com/docs/components/combobox) with adaptations for React Native and mobile interfaces.
