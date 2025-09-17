# AutocompleteDropdown Component

The AutocompleteDropdown component provides a smart dropdown with search functionality and auto-completion features. It's built with React Native and supports customizable rendering, positioning, and advanced search capabilities.

## Features

- **Search & Filter**: Real-time search with customizable query functions
- **Auto-positioning**: Automatic dropdown positioning based on available space
- **Keyboard Support**: Full keyboard navigation and mobile keyboard handling
- **Custom Rendering**: Customizable dropdown items and loading indicators
- **Highlight Search**: Automatic highlighting of search terms in results
- **TypeScript**: Complete type safety with generic support
- **Performance**: Optimized with memoization and debouncing
- **Accessible**: Screen reader support and proper focus management

## Basic Usage

```tsx
import { AutocompleteDropdown } from 'chill-ui';

const data = [
  { id: '1', name: 'Apple', category: 'Fruit' },
  { id: '2', name: 'Banana', category: 'Fruit' },
  { id: '3', name: 'Carrot', category: 'Vegetable' },
];

function Example() {
  return (
    <AutocompleteDropdown
      dataSet={data}
      valueField="name"
      searchField="name"
      onSelectItem={item => console.log('Selected:', item)}
      inputProps={{
        placeholder: 'Search fruits and vegetables...',
      }}
    />
  );
}
```

## Advanced Usage

### Custom Search Query

```tsx
<AutocompleteDropdown
  dataSet={data}
  valueField="name"
  searchField="name"
  searchQuery={(keyword, labelValue) => {
    // Custom search logic
    return (
      labelValue.toLowerCase().includes(keyword.toLowerCase()) ||
      item.category.toLowerCase().includes(keyword.toLowerCase())
    );
  }}
  onSelectItem={item => console.log('Selected:', item)}
/>
```

### Custom Dropdown Item Rendering

```tsx
<AutocompleteDropdown
  dataSet={data}
  valueField="name"
  searchField="name"
  customDropdownItem={(item, selected) => (
    <Box className={`p-3 ${selected ? 'bg-blue-100' : 'bg-white'}`}>
      <String className="font-bold">{item.name}</String>
      <String className="text-sm text-gray-500">{item.category}</String>
    </Box>
  )}
  onSelectItem={item => console.log('Selected:', item)}
/>
```

### With Highlight and Custom Styling

```tsx
<AutocompleteDropdown
  dataSet={data}
  valueField="name"
  searchField="name"
  hasHighlightString={true}
  highlightProps={{
    highlightStyle: { backgroundColor: 'yellow', fontWeight: 'bold' },
  }}
  dropdownItemProps={{
    className: 'border-b border-gray-200',
    activeBackgroundColor: '#f0f9ff',
    stringItemProps: { className: 'text-gray-800' },
  }}
  onSelectItem={item => console.log('Selected:', item)}
/>
```

### Using Ref for Control

```tsx
import { useRef } from 'react';
import { AutocompleteDropdown } from 'chill-ui';

function ControlledExample() {
  const dropdownRef = useRef<AutocompleteDropdownRefProps>(null);

  return (
    <Box>
      <AutocompleteDropdown
        ref={dropdownRef}
        dataSet={data}
        valueField="name"
        searchField="name"
        onSelectItem={item => console.log('Selected:', item)}
      />

      <Box className="mt-4 flex-row gap-2">
        <Button onPress={() => dropdownRef.current?.open()}>Open Dropdown</Button>
        <Button onPress={() => dropdownRef.current?.close()}>Close Dropdown</Button>
        <Button onPress={() => dropdownRef.current?.toggle()}>Toggle Dropdown</Button>
      </Box>
    </Box>
  );
}
```

## Props

### AutocompleteDropdown Props

| Prop                         | Type                                                          | Required | Default      | Description                                |
| ---------------------------- | ------------------------------------------------------------- | -------- | ------------ | ------------------------------------------ |
| `dataSet`                    | `T[]`                                                         | ✅       | `[]`         | Array of data items to display             |
| `valueField`                 | `keyof T`                                                     | ✅       | -            | Field to use as the display value          |
| `onSelectItem`               | `(item: T) => void`                                           | ✅       | -            | Callback when an item is selected          |
| `searchField`                | `keyof T`                                                     | ❌       | `valueField` | Field to search in                         |
| `offsetX`                    | `number`                                                      | ❌       | `0`          | Horizontal offset for dropdown positioning |
| `offsetY`                    | `number`                                                      | ❌       | `0`          | Vertical offset for dropdown positioning   |
| `maxHeight`                  | `number`                                                      | ❌       | `300`        | Maximum height of dropdown                 |
| `minHeight`                  | `number`                                                      | ❌       | `0`          | Minimum height of dropdown                 |
| `excludeItems`               | `T[]`                                                         | ❌       | `[]`         | Items to exclude from dropdown             |
| `isLoading`                  | `boolean`                                                     | ❌       | `false`      | Show loading indicator                     |
| `hasPerformSearch`           | `boolean`                                                     | ❌       | `true`       | Enable search functionality                |
| `hasHighlightString`         | `boolean`                                                     | ❌       | `true`       | Highlight search terms in results          |
| `confirmSelectItem`          | `boolean`                                                     | ❌       | `false`      | Require confirmation before selecting      |
| `closeModalWhenSelectedItem` | `boolean`                                                     | ❌       | `true`       | Close dropdown after selection             |
| `dropdownPosition`           | `'auto' \| 'top' \| 'bottom'`                                 | ❌       | `'auto'`     | Dropdown positioning                       |
| `onBlur`                     | `() => void`                                                  | ❌       | -            | Callback when input loses focus            |
| `onFocus`                    | `() => void`                                                  | ❌       | -            | Callback when input gains focus            |
| `onConfirmSelectItem`        | `(item: T) => void`                                           | ❌       | -            | Callback for confirmed selection           |
| `searchQuery`                | `(keyword: string, labelValue: string) => boolean`            | ❌       | -            | Custom search function                     |
| `customDropdownItem`         | `(item: T, selected?: boolean) => React.ReactElement \| null` | ❌       | -            | Custom item renderer                       |
| `inputProps`                 | `InputProps`                                                  | ❌       | -            | Props for the input component              |
| `dropdownItemProps`          | `DropdownItemProps`                                           | ❌       | -            | Props for dropdown items                   |
| `dropdownListProps`          | `FlatListProps`                                               | ❌       | -            | Props for the dropdown list                |
| `dropdownProps`              | `InputDropdownProps`                                          | ❌       | -            | Props for the dropdown container           |
| `highlightProps`             | `HighlightStringProps`                                        | ❌       | -            | Props for text highlighting                |

### AutocompleteDropdownRefProps

| Method     | Description                |
| ---------- | -------------------------- |
| `open()`   | Open the dropdown          |
| `close()`  | Close the dropdown         |
| `toggle()` | Toggle dropdown visibility |

## File Structure

```
AutocompleteDropdown/
├── README.md                           # This documentation
├── AutocompleteDropdown.tsx           # Main component
├── index.ts                           # Exports
├── context/
│   ├── AutoCompleteDropdownContext.tsx        # Context for dropdown state
│   └── AutoCompleteDropdownContext.props.ts   # Context props
├── hooks/
│   ├── useAutocompleteDropdownProvider.ts     # Provider hook
│   ├── useDropdownActions.ts                  # Action hooks
│   ├── useDropdownKeyboard.ts                 # Keyboard handling
│   └── useGetDropdownPosition.ts              # Position calculation
└── types/
    └── index.ts                               # Local types
```

## Examples

### E-commerce Product Search

```tsx
const products = [
  { id: '1', name: 'iPhone 14', brand: 'Apple', price: 999 },
  { id: '2', name: 'Samsung Galaxy S23', brand: 'Samsung', price: 899 },
  { id: '3', name: 'Google Pixel 7', brand: 'Google', price: 699 },
];

<AutocompleteDropdown
  dataSet={products}
  valueField="name"
  searchField="name"
  customDropdownItem={(product, selected) => (
    <Box className={`p-4 ${selected ? 'bg-blue-50' : 'bg-white'}`}>
      <String className="font-semibold">{product.name}</String>
      <String className="text-gray-600">{product.brand}</String>
      <String className="font-bold text-green-600">${product.price}</String>
    </Box>
  )}
  onSelectItem={product => {
    console.log('Selected product:', product);
  }}
/>;
```

### Multi-field Search

```tsx
<AutocompleteDropdown
  dataSet={users}
  valueField="name"
  searchQuery={(keyword, labelValue) => {
    const searchTerm = keyword.toLowerCase();
    return (
      labelValue.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.department.toLowerCase().includes(searchTerm)
    );
  }}
  customDropdownItem={(user, selected) => (
    <Box className={`p-3 ${selected ? 'bg-blue-50' : 'bg-white'}`}>
      <String className="font-medium">{user.name}</String>
      <String className="text-sm text-gray-500">{user.email}</String>
      <String className="text-sm text-blue-600">{user.department}</String>
    </Box>
  )}
  onSelectItem={user => console.log('Selected user:', user)}
/>
```

### With Loading State

```tsx
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);

const handleSearch = async (keyword: string) => {
  setIsLoading(true);
  try {
    const results = await searchAPI(keyword);
    setData(results);
  } finally {
    setIsLoading(false);
  }
};

<AutocompleteDropdown
  dataSet={data}
  valueField="title"
  searchField="title"
  isLoading={isLoading}
  onSelectItem={item => console.log('Selected:', item)}
  inputProps={{
    placeholder: 'Search...',
    onChangeText: handleSearch,
  }}
/>;
```

## Troubleshooting

### Common Issues

**Dropdown not positioning correctly**

- Check `offsetX` and `offsetY` values
- Ensure parent container has proper layout
- Verify screen boundaries are considered

**Search not working**

- Ensure `searchField` is set correctly
- Check if `hasPerformSearch` is enabled
- Verify data structure matches expected format

**Custom rendering not showing**

- Ensure `customDropdownItem` returns valid ReactElement
- Check if data is properly passed to the function
- Verify styling doesn't hide the content

**Performance issues with large datasets**

- Use `excludeItems` to filter unnecessary items
- Implement server-side search for large datasets
- Consider virtualization for very large lists

### Performance Tips

- Use `React.memo` for custom item renderers
- Implement debounced search for API calls
- Limit `dataSet` size for better performance
- Use `searchQuery` for efficient filtering

## Accessibility

The component includes:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast support

## Integration with Forms

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

## Storybook

See the Storybook documentation for interactive examples:

- `components/AutocompleteDropdown` - Complete examples with all features
