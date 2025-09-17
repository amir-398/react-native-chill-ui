# SegmentedControl

A React Native component that provides a tab-like interface for switching between options. Features smooth animations, customizable styling, and responsive design that adapts to screen width.

## Features

- ✅ **Smooth Animations**: Animated background transitions using React Native Reanimated
- ✅ **Responsive Design**: Automatically adapts to screen width
- ✅ **Customizable Styling**: Full Tailwind CSS support for all elements
- ✅ **Flexible Options**: Support for any number of options
- ✅ **Accessibility**: Proper touch handling and screen reader support
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Performance**: Optimized animations with shared values

## Quick Start

```tsx
import SegmentedControl from '@/components/segmented-control/SegmentedControl';

// Basic usage
<SegmentedControl
  options={['Option 1', 'Option 2', 'Option 3']}
  onChange={option => console.log('Selected:', option)}
/>;
```

## Examples

### Basic Usage

```tsx
import SegmentedControl from '@/components/segmented-control/SegmentedControl';

// Simple segmented control
<SegmentedControl
  options={['All', 'Active', 'Completed']}
  onChange={(option) => setFilter(option)}
/>

// With default option
<SegmentedControl
  options={['Day', 'Week', 'Month']}
  defaultOption="Week"
  onChange={(option) => setTimeframe(option)}
/>
```

### Custom Styling

```tsx
// Custom colors and styling
<SegmentedControl
  options={['Light', 'Dark', 'Auto']}
  activeItemTextColor="white"
  inactiveItemTextColor="#666"
  activeItemTextClassName="font-bold"
  itemClassName="bg-blue-500"
  onChange={(option) => setTheme(option)}
/>

// Custom container styling
<SegmentedControl
  options={['Small', 'Medium', 'Large']}
  className="bg-gray-100 border-gray-300"
  itemClassName="bg-green-500"
  onChange={(option) => setSize(option)}
/>
```

### Advanced Configuration

```tsx
<SegmentedControl
  options={['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4']}
  defaultOption="Tab 2"
  externalPadding={40}
  internalPadding={15}
  activeItemTextColor="#007AFF"
  inactiveItemTextColor="#8E8E93"
  activeItemTextClassName="font-semibold"
  itemTextClassName="text-sm"
  itemClassName="bg-blue-100"
  onChange={option => {
    console.log('Selected option:', option);
    handleTabChange(option);
  }}
/>
```

## Props Reference

### SegmentedControlProps

| Prop                      | Type                       | Default | Description                                       |
| ------------------------- | -------------------------- | ------- | ------------------------------------------------- |
| `activeItemTextClassName` | `string`                   | -       | Custom CSS classes for active item text           |
| `activeItemTextColor`     | `string`                   | -       | Color for active item text                        |
| `className`               | `string`                   | -       | Custom CSS classes for the container              |
| `defaultOption`           | `string`                   | -       | Default selected option                           |
| `externalPadding`         | `number`                   | `30`    | External padding from screen edges                |
| `inactiveItemTextColor`   | `string`                   | -       | Color for inactive item text                      |
| `internalPadding`         | `number`                   | `10`    | Internal padding between items                    |
| `itemClassName`           | `string`                   | -       | Custom CSS classes for the active item background |
| `itemTextClassName`       | `string`                   | -       | Custom CSS classes for item text                  |
| `onChange`                | `(option: string) => void` | -       | Callback when option changes                      |
| `options`                 | `string[]`                 | -       | Array of option strings to display                |

## Best Practices

### 1. Choose Appropriate Options

```tsx
// ✅ Good - Clear, concise options
<SegmentedControl
  options={['All', 'Active', 'Completed']}
  onChange={setFilter}
/>

// ✅ Good - Descriptive options
<SegmentedControl
  options={['Day View', 'Week View', 'Month View']}
  onChange={setView}
/>

// ❌ Avoid - Too many options
<SegmentedControl
  options={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6']}
  onChange={setOption}
/>
```

### 2. Use Consistent Styling

```tsx
// ✅ Good - Consistent color scheme
<SegmentedControl
  options={['Light', 'Dark']}
  activeItemTextColor="white"
  inactiveItemTextColor="#666"
  itemClassName="bg-blue-500"
  onChange={setTheme}
/>

// ❌ Avoid - Inconsistent styling
<SegmentedControl
  options={['Light', 'Dark']}
  activeItemTextColor="red"
  inactiveItemTextColor="blue"
  itemClassName="bg-green-500"
  onChange={setTheme}
/>
```

### 3. Handle State Properly

```tsx
// ✅ Good - Proper state management
const [selectedFilter, setSelectedFilter] = useState('All');

<SegmentedControl
  options={['All', 'Active', 'Completed']}
  defaultOption={selectedFilter}
  onChange={setSelectedFilter}
/>

// ❌ Avoid - No state management
<SegmentedControl
  options={['All', 'Active', 'Completed']}
  onChange={(option) => console.log(option)}
/>
```

### 4. Provide Meaningful Callbacks

```tsx
// ✅ Good - Meaningful callback
const handleFilterChange = useCallback((option) => {
  setFilter(option);
  fetchData(option);
}, []);

<SegmentedControl
  options={['All', 'Active', 'Completed']}
  onChange={handleFilterChange}
/>

// ❌ Avoid - Empty or unclear callbacks
<SegmentedControl
  options={['All', 'Active', 'Completed']}
  onChange={() => {}} // Empty callback
/>
```

### 5. Consider Accessibility

```tsx
// ✅ Good - Accessible implementation
<SegmentedControl
  options={['Light', 'Dark']}
  onChange={setTheme}
  className="accessible"
  activeItemTextClassName="font-bold"
/>

// ❌ Avoid - No accessibility considerations
<SegmentedControl
  options={['Light', 'Dark']}
  onChange={setTheme}
/>
```

## Advanced Usage

### Dynamic Options

```tsx
const [availableFilters, setAvailableFilters] = useState(['All', 'Active']);

useEffect(() => {
  // Load available filters from API
  fetchFilters().then(filters => {
    setAvailableFilters(['All', ...filters]);
  });
}, []);

<SegmentedControl options={availableFilters} onChange={setFilter} />;
```

### Conditional Rendering

```tsx
const [showAdvanced, setShowAdvanced] = useState(false);

<SegmentedControl
  options={showAdvanced ? ['Basic', 'Advanced', 'Expert'] : ['Basic', 'Advanced']}
  onChange={setLevel}
/>;
```

### Custom Styling Based on State

```tsx
const [isDarkMode, setIsDarkMode] = useState(false);

<SegmentedControl
  options={['Light', 'Dark']}
  className={isDarkMode ? 'bg-gray-800' : 'bg-white'}
  activeItemTextColor={isDarkMode ? 'white' : 'black'}
  inactiveItemTextColor={isDarkMode ? '#999' : '#666'}
  onChange={setTheme}
/>;
```

## Performance Considerations

- **Animated Styles**: Uses React Native Reanimated for smooth 60fps animations
- **Responsive Design**: Automatically calculates item widths based on screen size
- **Memory Management**: Proper cleanup of animated references
- **Optimized Rendering**: Only re-renders when selection changes

## Accessibility

The SegmentedControl component includes accessibility features:

- **Touch handling**: Proper touch event management
- **Visual feedback**: Clear visual indication of selection
- **Screen reader support**: Works with accessibility tools
- **Focus management**: Proper focus handling

### Accessibility Best Practices

```tsx
// Always provide accessibility information
<SegmentedControl
  options={['Light', 'Dark']}
  onChange={setTheme}
  className="accessible"
  activeItemTextClassName="font-bold"
/>

// Provide context for screen readers
<SegmentedControl
  options={['All', 'Active', 'Completed']}
  onChange={(option) => {
    setFilter(option);
    // Announce selection to screen reader
    AccessibilityInfo.announceForAccessibility(`Filter changed to ${option}`);
  }}
/>
```

## Troubleshooting

### Common Issues

1. **Options not displaying**: Ensure options array is not empty
2. **Animation not working**: Check React Native Reanimated installation
3. **Styling issues**: Verify Tailwind CSS configuration
4. **Touch not working**: Check for overlapping elements

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

<SegmentedControl
  options={['Option 1', 'Option 2', 'Option 3']}
  onChange={option => {
    setDebugInfo({
      selectedOption: option,
      timestamp: new Date().toISOString(),
    });
    console.log('Selected:', option);
  }}
/>;

{
  debugInfo.selectedOption && (
    <Box className="rounded bg-gray-100 p-4">
      <String>Debug: {JSON.stringify(debugInfo)}</String>
    </Box>
  );
}
```

## Migration from Other Libraries

### From react-native-segmented-control

```tsx
// Old (react-native-segmented-control)
<SegmentedControl
  values={['One', 'Two']}
  selectedIndex={selectedIndex}
  onValueChange={(value, selectedIndex) => {
    setSelectedIndex(selectedIndex);
  }}
/>

// New (SegmentedControl)
<SegmentedControl
  options={['One', 'Two']}
  defaultOption={selectedIndex === 0 ? 'One' : 'Two'}
  onChange={(option) => {
    setSelectedIndex(option === 'One' ? 0 : 1);
  }}
/>
```

### From custom implementation

```tsx
// Old (custom implementation)
<View style={styles.container}>
  {options.map((option, index) => (
    <TouchableOpacity
      key={option}
      onPress={() => onSelect(option)}
      style={[styles.option, selected === option && styles.selected]}
    >
      <Text style={selected === option ? styles.selectedText : styles.text}>
        {option}
      </Text>
    </TouchableOpacity>
  ))}
</View>

// New (SegmentedControl)
<SegmentedControl
  options={options}
  defaultOption={selected}
  onChange={onSelect}
/>
```
