# Checkbox Component

A flexible and customizable checkbox component for React Native applications with support for different variants, custom styling, and accessibility features.

## Features

- **Multiple Variants**: Support for square and circular checkbox styles
- **Custom Sizing**: Flexible size options with custom dimensions
- **Custom Colors**: Full control over checked/unchecked colors and icon colors
- **Custom Icons**: Ability to use custom icon components
- **Accessibility**: Proper focus management and screen reader support
- **TypeScript**: Complete type safety with proper interfaces
- **Label Support**: Optional text labels with custom styling

## Basic Usage

```tsx
import { Checkbox } from 'chill-ui';

function Example() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Box className="gap-4 p-4">
      <Checkbox label="Accept terms and conditions" isChecked={isChecked} onChange={setIsChecked} />

      <Checkbox label="Subscribe to newsletter" variant="circle" isChecked={isChecked} onChange={setIsChecked} />
    </Box>
  );
}
```

## Props

| Prop               | Type                         | Required | Default         | Description                          |
| ------------------ | ---------------------------- | -------- | --------------- | ------------------------------------ |
| `isChecked`        | `boolean`                    | ❌       | `false`         | Whether the checkbox is checked      |
| `onChange`         | `(checked: boolean) => void` | ❌       | -               | Callback when checkbox state changes |
| `label`            | `string`                     | ❌       | -               | Label text for the checkbox          |
| `variant`          | `'square' \| 'circle'`       | ❌       | `'square'`      | Visual variant of the checkbox       |
| `size`             | `IconSizeVr['size']`         | ❌       | `'sm'`          | Size variant of the checkbox         |
| `checkboxSize`     | `number`                     | ❌       | -               | Custom size for the checkbox         |
| `isDisabled`       | `boolean`                    | ❌       | `false`         | Whether the checkbox is disabled     |
| `iconName`         | `keyof TIcons`               | ❌       | `'check-solid'` | Name of the icon to use              |
| `iconColor`        | `string`                     | ❌       | `'white'`       | Color of the check icon              |
| `checkedColor`     | `string`                     | ❌       | -               | Background color when checked        |
| `uncheckedColor`   | `string`                     | ❌       | -               | Background color when unchecked      |
| `className`        | `string`                     | ❌       | -               | Additional CSS classes for container |
| `checkedClassName` | `string`                     | ❌       | -               | Additional CSS classes when checked  |
| `labelClassName`   | `string`                     | ❌       | -               | Additional CSS classes for label     |
| `customIcon`       | `React.ReactNode`            | ❌       | -               | Custom icon component to use         |

## Examples

### Basic Checkbox

```tsx
const [isChecked, setIsChecked] = useState(false);

<Checkbox label="Accept terms and conditions" isChecked={isChecked} onChange={setIsChecked} />;
```

### Checked State

```tsx
<Checkbox label="Checked Checkbox" isChecked={true} onChange={handleChange} />
```

### Disabled States

```tsx
<Box className="gap-4">
  <Checkbox label="Disabled Checkbox" isDisabled={true} onChange={handleChange} />

  <Checkbox label="Disabled Checked Checkbox" isChecked={true} isDisabled={true} onChange={handleChange} />
</Box>
```

### Different Variants

```tsx
<Box className="gap-4">
  <Checkbox label="Square Checkbox" variant="square" isChecked={isChecked} onChange={setIsChecked} />

  <Checkbox label="Circle Checkbox" variant="circle" isChecked={isChecked} onChange={setIsChecked} />
</Box>
```

### Custom Sizing

```tsx
<Box className="gap-4">
  <Checkbox label="Small Checkbox" size="sm" isChecked={isChecked} onChange={setIsChecked} />

  <Checkbox label="Large Checkbox" size="lg" isChecked={isChecked} onChange={setIsChecked} />

  <Checkbox label="Custom Size Checkbox" checkboxSize={30} isChecked={isChecked} onChange={setIsChecked} />
</Box>
```

### Custom Colors

```tsx
<Checkbox
  label="Custom Colors Checkbox"
  checkedColor="#FF0000"
  uncheckedColor="#CCCCCC"
  iconColor="#FFFFFF"
  isChecked={isChecked}
  onChange={setIsChecked}
/>
```

### Custom Icons

```tsx
<Checkbox
  label="Custom Icon Checkbox"
  iconName="star-solid"
  iconColor="#FFD700"
  isChecked={isChecked}
  onChange={setIsChecked}
/>

// With custom React component
<Checkbox
  label="Custom Component Icon"
  customIcon={<CustomCheckIcon />}
  isChecked={isChecked}
  onChange={setIsChecked}
/>
```

### Without Label

```tsx
<Checkbox isChecked={isChecked} onChange={setIsChecked} />
```

## Best Practices

### 1. State Management

```tsx
// ✅ Good: Use controlled component pattern
const [isChecked, setIsChecked] = useState(false);

<Checkbox
  isChecked={isChecked}
  onChange={setIsChecked}
  label="Controlled checkbox"
/>

// ✅ Good: Use with form libraries
<Checkbox
  isChecked={formik.values.agreement}
  onChange={(checked) => formik.setFieldValue('agreement', checked)}
  label="I agree to the terms"
/>
```

### 2. Accessibility

```tsx
// ✅ Good: Provide meaningful labels
<Checkbox
  label="I agree to receive marketing emails"
  isChecked={marketingConsent}
  onChange={setMarketingConsent}
/>

// ✅ Good: Use appropriate sizes for touch targets
<Checkbox
  size="md" // Adequate size for mobile
  label="Accessible checkbox"
  isChecked={isChecked}
  onChange={setIsChecked}
/>
```

### 3. Visual Consistency

```tsx
// ✅ Good: Use consistent styling across checkboxes
<Box className="gap-4">
  <Checkbox label="Option 1" variant="square" size="md" isChecked={option1} onChange={setOption1} />
  <Checkbox label="Option 2" variant="square" size="md" isChecked={option2} onChange={setOption2} />
</Box>
```

### 4. Custom Styling

```tsx
// ✅ Good: Use custom colors for brand consistency
<Checkbox
  label="Brand Checkbox"
  checkedColor="#007AFF"
  uncheckedColor="#E5E5EA"
  iconColor="#FFFFFF"
  isChecked={isChecked}
  onChange={setIsChecked}
/>

// ✅ Good: Use custom classes for complex styling
<Checkbox
  label="Styled Checkbox"
  className="border-2 border-blue-500"
  checkedClassName="bg-blue-500 border-blue-600"
  labelClassName="text-blue-900 font-semibold"
  isChecked={isChecked}
  onChange={setIsChecked}
/>
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
interface CheckboxProps {
  label?: string;
  iconColor?: string;
  className?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  checkedColor?: string;
  checkboxSize?: number;
  uncheckedColor?: string;
  iconName?: keyof TIcons;
  labelClassName?: string;
  checkedClassName?: string;
  customIcon?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  size?: IconSizeVr['size'];
  variant?: 'square' | 'circle';
}
```

## Performance Considerations

- **Controlled vs Uncontrolled**: The component supports both controlled and uncontrolled patterns
- **State Updates**: Efficient state management with proper callback handling
- **Rendering**: Optimized rendering with conditional icon display

## Dependencies

- **React Native**: Core components (Pressable)
- **Icon**: For check indicators
- **String**: For label text
- **Box**: For layout containers

## Accessibility

The component supports standard accessibility features:

- **Focus Management**: Proper focus handling for keyboard navigation
- **Screen Reader**: Compatible with screen readers
- **Touch Targets**: Adequate touch target sizes for mobile accessibility
- **Visual Feedback**: Clear visual states for checked/unchecked/disabled
