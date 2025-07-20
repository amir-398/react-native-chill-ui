# InputSelectDropdown Component

A powerful dropdown component that combines an input field with a searchable dropdown. Perfect for autocomplete functionality, user selection, and data filtering with advanced features like highlighting, custom rendering, and keyboard navigation.

## Features

- ✅ **Searchable dropdown**: Built-in search functionality with highlighting
- ✅ **Custom rendering**: Flexible item rendering with custom components
- ✅ **Data filtering**: Exclude items and search-specific filtering
- ✅ **Keyboard navigation**: Full keyboard support for accessibility
- ✅ **Positioning**: Automatic or manual dropdown positioning
- ✅ **Highlighting**: Search term highlighting in dropdown items
- ✅ **Modal support**: Dropdown opens in modal for better UX
- ✅ **TypeScript support**: Full type safety with generics
- ✅ **Accessibility**: Screen reader support and ARIA attributes

## Quick Start

```tsx
import InputSelectDropdown from '@/components/inputSelectDropdown/InputSelectDropdown';

// Basic usage
<InputSelectDropdown
  dataSet={['Apple', 'Banana', 'Cherry']}
  valueField="name"
  onSelectItem={item => console.log('Selected:', item)}
/>;
```

## Examples

### Basic Dropdown with Simple Data

```tsx
const [selectedFruit, setSelectedFruit] = useState('');

<InputSelectDropdown
  dataSet={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
  valueField="name"
  onSelectItem={item => setSelectedFruit(item)}
  inputProps={{
    label: 'Select Fruit',
    placeholder: 'Choose a fruit...',
  }}
/>;
```

### Advanced Dropdown with Complex Data

```tsx
const [selectedUser, setSelectedUser] = useState(null);

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
];

<InputSelectDropdown
  dataSet={users}
  valueField="name"
  searchField="email"
  hasSearch={true}
  hasHighlightString={true}
  onSelectItem={item => setSelectedUser(item)}
  inputProps={{
    label: 'Select User',
    placeholder: 'Search by name or email...',
  }}
  customDropdownItem={(item, selected) => (
    <Box className={`p-3 ${selected ? 'bg-blue-100' : ''}`}>
      <String weight="medium">{item.name}</String>
      <String size="sm" color="gray">
        {item.email}
      </String>
      <String size="xs" color="blue">
        {item.role}
      </String>
    </Box>
  )}
/>;
```

### Search with Custom Filtering

```tsx
const [selectedCountry, setSelectedCountry] = useState(null);

const countries = [
  { code: 'US', name: 'United States', continent: 'North America' },
  { code: 'CA', name: 'Canada', continent: 'North America' },
  { code: 'FR', name: 'France', continent: 'Europe' },
  { code: 'DE', name: 'Germany', continent: 'Europe' },
];

<InputSelectDropdown
  dataSet={countries}
  valueField="name"
  searchField="name"
  hasSearch={true}
  searchQuery={(keyword, labelValue) => labelValue.toLowerCase().includes(keyword.toLowerCase())}
  excludeItems={[currentCountry]}
  onSelectItem={item => setSelectedCountry(item)}
  inputProps={{
    label: 'Select Country',
    placeholder: 'Search countries...',
  }}
  highlightProps={{
    highlightClassName: 'bg-yellow-200',
  }}
/>;
```

### Dropdown with Custom Search Input

```tsx
const CustomSearchInput = ({ value, onChangeText }) => (
  <Box className="bg-gray-100 p-2">
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder="🔍 Search users..."
      leftIconAction={{
        iconName: 'search-solid',
        iconSize: 'sm',
      }}
    />
  </Box>
);

<InputSelectDropdown
  dataSet={users}
  valueField="name"
  hasSearch={true}
  customSearchInput={<CustomSearchInput />}
  onSelectItem={handleUserSelect}
  inputProps={{
    label: 'Select User',
    placeholder: 'Click to search...',
  }}
/>;
```

### Dropdown with Positioning Control

```tsx
<InputSelectDropdown
  dataSet={items}
  valueField="name"
  dropdownPosition="bottom"
  offsetX={10}
  offsetY={5}
  maxHeight={300}
  minHeight={100}
  onSelectItem={handleItemSelect}
  inputProps={{
    label: 'Select Item',
    placeholder: 'Choose an item...',
  }}
/>
```

### Dropdown with Disabled State

```tsx
<InputSelectDropdown
  dataSet={options}
  valueField="label"
  onSelectItem={handleOptionSelect}
  inputProps={{
    label: 'Select Option',
    placeholder: 'Choose an option...',
    isDisabled: true,
  }}
  dropdownProps={{
    visible: false,
  }}
/>
```

## Props Reference

### Core Props

| Prop           | Type                | Default | Description                        |
| -------------- | ------------------- | ------- | ---------------------------------- |
| `dataSet`      | `T[]`               | `[]`    | Array of data items to display     |
| `valueField`   | `string`            | -       | Field name to use as display value |
| `onSelectItem` | `(item: T) => void` | -       | Callback when item is selected     |

### Search Props

| Prop                | Type                                               | Default | Description                          |
| ------------------- | -------------------------------------------------- | ------- | ------------------------------------ |
| `hasSearch`         | `boolean`                                          | `false` | Whether to show search functionality |
| `searchField`       | `string`                                           | -       | Field name to use for search         |
| `searchQuery`       | `(keyword: string, labelValue: string) => boolean` | -       | Custom search query function         |
| `customSearchInput` | `React.ReactNode`                                  | -       | Custom search input component        |
| `searchInputProps`  | `InputProps`                                       | -       | Props for search input               |

### Filtering Props

| Prop                 | Type  | Default | Description                          |
| -------------------- | ----- | ------- | ------------------------------------ |
| `excludeItems`       | `T[]` | `[]`    | Items to exclude from dropdown       |
| `excludeSearchItems` | `T[]` | `[]`    | Items to exclude from search results |

### Rendering Props

| Prop                 | Type                                                 | Default | Description                       |
| -------------------- | ---------------------------------------------------- | ------- | --------------------------------- |
| `customDropdownItem` | `(item: T, selected: boolean) => React.ReactElement` | -       | Custom render function for items  |
| `dropdownItemProps`  | `DropdownItemProps`                                  | -       | Props for dropdown items          |
| `hasHighlightString` | `boolean`                                            | `true`  | Whether to highlight search terms |
| `highlightProps`     | `Partial<HighlightStringProps>`                      | -       | Props for highlight functionality |

### Positioning Props

| Prop               | Type                          | Default  | Description                       |
| ------------------ | ----------------------------- | -------- | --------------------------------- |
| `dropdownPosition` | `'auto' \| 'top' \| 'bottom'` | `'auto'` | Position of dropdown              |
| `offsetX`          | `number`                      | `0`      | Horizontal offset for positioning |
| `offsetY`          | `number`                      | `0`      | Vertical offset for positioning   |
| `maxHeight`        | `number`                      | `300`    | Maximum height of dropdown        |
| `minHeight`        | `number`                      | `100`    | Minimum height of dropdown        |

### Behavior Props

| Prop                         | Type         | Default | Description                         |
| ---------------------------- | ------------ | ------- | ----------------------------------- |
| `closeModalWhenSelectedItem` | `boolean`    | `true`  | Whether to close modal on selection |
| `onBlur`                     | `() => void` | -       | Callback when input loses focus     |
| `onFocus`                    | `() => void` | -       | Callback when input gains focus     |

### Styling Props

| Prop            | Type                          | Default | Description                   |
| --------------- | ----------------------------- | ------- | ----------------------------- |
| `inputProps`    | `InputProps`                  | -       | Props for the input component |
| `dropdownProps` | `Partial<InputDropdownProps>` | -       | Additional dropdown props     |

## TypeScript Interfaces

### InputSelectDropdownProps

```tsx
interface InputSelectDropdownProps<T> {
  /** Array of data items to display in dropdown */
  dataSet: T[];
  /** Field name to use as display value */
  valueField: string;
  /** Callback when item is selected */
  onSelectItem: (item: T) => void;
  /** Whether to close modal when item is selected */
  closeModalWhenSelectedItem?: boolean;
  /** Custom render function for dropdown items */
  customDropdownItem?: (item: T, selected: boolean) => React.ReactElement | null;
  /** Custom search input component */
  customSearchInput?: React.ReactNode;
  /** Props for dropdown items */
  dropdownItemProps?: DropdownItemProps;
  /** Position of dropdown */
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  /** Additional props for dropdown component */
  dropdownProps?: Partial<InputDropdownProps>;
  /** Items to exclude from dropdown */
  excludeItems?: T[];
  /** Items to exclude from search results */
  excludeSearchItems?: T[];
  /** Whether to highlight search terms */
  hasHighlightString?: boolean;
  /** Whether to show search functionality */
  hasSearch?: boolean;
  /** Props for highlight string functionality */
  highlightProps?: Partial<Omit<HighlightStringProps, 'text'>>;
  /** Props for the input component */
  inputProps?: Omit<InputProps, 'placeholder' | 'value'>;
  /** Maximum height of dropdown */
  maxHeight?: number;
  /** Minimum height of dropdown */
  minHeight?: number;
  /** Horizontal offset for dropdown positioning */
  offsetX?: number;
  /** Vertical offset for dropdown positioning */
  offsetY?: number;
  /** Callback when input loses focus */
  onBlur?: () => void;
  /** Callback when input gains focus */
  onFocus?: () => void;
  /** Field name to use for search */
  searchField?: string;
  /** Props for search input */
  searchInputProps?: InputProps;
  /** Custom search query function */
  searchQuery?: (keyword: string, labelValue: string) => boolean;
}
```

## Search Functionality

### Built-in Search

The component provides built-in search functionality that filters items based on the `searchField`:

```tsx
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  searchField="email"
  hasSearch={true}
  onSelectItem={handleUserSelect}
/>
```

### Custom Search Query

For more advanced filtering, use the `searchQuery` prop:

```tsx
<InputSelectDropdown
  dataSet={products}
  valueField="name"
  searchField="name"
  hasSearch={true}
  searchQuery={(keyword, labelValue) => {
    // Custom search logic
    const searchTerm = keyword.toLowerCase();
    const itemValue = labelValue.toLowerCase();

    // Search in multiple fields or with fuzzy matching
    return (
      itemValue.includes(searchTerm) ||
      itemValue.startsWith(searchTerm) ||
      itemValue.split(' ').some(word => word.startsWith(searchTerm))
    );
  }}
  onSelectItem={handleProductSelect}
/>
```

### Custom Search Input

Replace the default search input with a custom component:

```tsx
const CustomSearch = ({ value, onChangeText }) => (
  <Box className="border-b bg-blue-50 p-3">
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder="🔍 Advanced search..."
      leftIconAction={{
        iconName: 'search-solid',
        iconSize: 'sm',
      }}
      rightIconAction={{
        iconName: 'filter-solid',
        iconSize: 'sm',
      }}
    />
  </Box>
);

<InputSelectDropdown
  dataSet={items}
  valueField="name"
  hasSearch={true}
  customSearchInput={<CustomSearch />}
  onSelectItem={handleItemSelect}
/>;
```

## Custom Rendering

### Basic Custom Item

```tsx
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  customDropdownItem={(item, selected) => (
    <Box className={`p-3 ${selected ? 'bg-blue-100' : ''}`}>
      <String weight="medium">{item.name}</String>
      <String size="sm" color="gray">
        {item.email}
      </String>
    </Box>
  )}
  onSelectItem={handleUserSelect}
/>
```

### Advanced Custom Item with Actions

```tsx
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  customDropdownItem={(item, selected) => (
    <Box className={`flex-row items-center justify-between p-3 ${selected ? 'bg-blue-100' : ''}`}>
      <Box>
        <String weight="medium">{item.name}</String>
        <String size="sm" color="gray">
          {item.email}
        </String>
      </Box>
      <Box className="flex-row gap-2">
        <Icon name="eye-solid" size="sm" onPress={() => viewUser(item)} />
        <Icon name="edit-solid" size="sm" onPress={() => editUser(item)} />
      </Box>
    </Box>
  )}
  onSelectItem={handleUserSelect}
/>
```

## Highlighting

### Basic Highlighting

```tsx
<InputSelectDropdown
  dataSet={items}
  valueField="name"
  hasSearch={true}
  hasHighlightString={true}
  onSelectItem={handleItemSelect}
/>
```

### Custom Highlighting

```tsx
<InputSelectDropdown
  dataSet={items}
  valueField="name"
  hasSearch={true}
  hasHighlightString={true}
  highlightProps={{
    highlightClassName: 'bg-yellow-200 font-bold',
    highlightStyle: { color: '#FF6B35' },
    stringProps: { size: 'md', weight: 'medium' },
  }}
  onSelectItem={handleItemSelect}
/>
```

## Best Practices

### 1. Always Provide valueField

```tsx
// ✅ Good - Clear value field
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  onSelectItem={handleUserSelect}
/>

// ❌ Avoid - No value field specified
<InputSelectDropdown
  dataSet={users}
  onSelectItem={handleUserSelect}
/>
```

### 2. Use Appropriate Search Fields

```tsx
// ✅ Good - Search in relevant fields
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  searchField="email"
  hasSearch={true}
  onSelectItem={handleUserSelect}
/>

// ❌ Avoid - Search in wrong field
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  searchField="id"
  hasSearch={true}
  onSelectItem={handleUserSelect}
/>
```

### 3. Provide Meaningful Labels

```tsx
// ✅ Good - Clear labels
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  inputProps={{
    label: 'Select User',
    placeholder: 'Search users by name or email...',
  }}
  onSelectItem={handleUserSelect}
/>

// ❌ Avoid - Generic labels
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  inputProps={{
    placeholder: 'Select...',
  }}
  onSelectItem={handleUserSelect}
/>
```

### 4. Handle Empty States

```tsx
// ✅ Good - Handle empty data
<InputSelectDropdown
  dataSet={users.length > 0 ? users : []}
  valueField="name"
  inputProps={{
    label: 'Select User',
    placeholder: users.length > 0 ? 'Search users...' : 'No users available',
  }}
  onSelectItem={handleUserSelect}
/>
```

### 5. Use Custom Rendering for Complex Data

```tsx
// ✅ Good - Custom rendering for complex items
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  customDropdownItem={(item, selected) => (
    <Box className={selected ? 'bg-blue-100' : ''}>
      <String>{item.name}</String>
      <String size="sm" color="gray">{item.email}</String>
    </Box>
  )}
  onSelectItem={handleUserSelect}
/>

// ❌ Avoid - Basic rendering for complex data
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  onSelectItem={handleUserSelect}
/>
```

## Advanced Usage

### Form Integration

```tsx
const [formData, setFormData] = useState({
  user: null,
  department: null,
  role: null,
});

const handleFieldChange = (field: string) => (item: any) => {
  setFormData(prev => ({ ...prev, [field]: item }));
};

<InputSelectDropdown
  dataSet={users}
  valueField="name"
  inputProps={{
    label: 'Select User',
    placeholder: 'Choose a user...',
  }}
  onSelectItem={handleFieldChange('user')}
/>

<InputSelectDropdown
  dataSet={departments}
  valueField="name"
  inputProps={{
    label: 'Select Department',
    placeholder: 'Choose a department...',
  }}
  onSelectItem={handleFieldChange('department')}
/>
```

### Dynamic Filtering

```tsx
const [selectedDepartment, setSelectedDepartment] = useState(null);
const [filteredUsers, setFilteredUsers] = useState(users);

useEffect(() => {
  if (selectedDepartment) {
    const filtered = users.filter(user => user.departmentId === selectedDepartment.id);
    setFilteredUsers(filtered);
  } else {
    setFilteredUsers(users);
  }
}, [selectedDepartment]);

<InputSelectDropdown
  dataSet={filteredUsers}
  valueField="name"
  hasSearch={true}
  inputProps={{
    label: 'Select User',
    placeholder: 'Search users...',
  }}
  onSelectItem={handleUserSelect}
/>;
```

### Keyboard Navigation

The component supports full keyboard navigation:

- **Tab**: Navigate between input and dropdown
- **Arrow keys**: Navigate through dropdown items
- **Enter**: Select current item
- **Escape**: Close dropdown
- **Type**: Search/filter items

### Accessibility

The InputSelectDropdown component includes comprehensive accessibility features:

- **Screen reader support**: Proper labeling and announcements
- **Keyboard navigation**: Full keyboard support
- **Focus management**: Proper focus handling
- **ARIA attributes**: Correct semantic markup
- **Error announcements**: Screen readers announce validation errors

### Accessibility Best Practices

```tsx
// Always provide labels
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  inputProps={{
    label: 'Select User',
  }}
  onSelectItem={handleUserSelect}
/>

// Provide clear error messages
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  inputProps={{
    label: 'Select User',
    hasError: !!userError,
    errorMessage: userError,
  }}
  onSelectItem={handleUserSelect}
/>

// Use appropriate icons for context
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  inputProps={{
    label: 'Select User',
    leftIconAction: {
      iconName: 'user-solid',
      iconSize: 'sm',
    },
  }}
  onSelectItem={handleUserSelect}
/>
```

## Performance Considerations

- The component uses `memo` to prevent unnecessary re-renders
- Custom render functions are memoized with `useCallback`
- Search filtering is optimized for large datasets
- Dropdown positioning is calculated efficiently
- State updates are batched for better performance

## Troubleshooting

### Common Issues

1. **Dropdown not opening**: Check that `inputProps.isDisabled` is not true
2. **Search not working**: Ensure `hasSearch` is true and `searchField` is specified
3. **Items not highlighting**: Verify `hasHighlightString` is true
4. **Custom rendering not working**: Check that `customDropdownItem` returns valid JSX
5. **Positioning issues**: Adjust `offsetX` and `offsetY` values

### Debug Example

```tsx
<InputSelectDropdown
  dataSet={users}
  valueField="name"
  hasSearch={true}
  onSelectItem={item => {
    console.log('Debug:', {
      selectedItem: item,
      dataSetLength: users.length,
      searchField: 'name',
      hasSearch: true,
    });
  }}
  inputProps={{
    label: 'Debug Dropdown',
    placeholder: 'Test dropdown...',
  }}
/>
```
