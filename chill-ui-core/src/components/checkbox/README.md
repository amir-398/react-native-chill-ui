# Checkbox Component

A flexible and customizable Checkbox component for React Native applications with support for controlled/uncontrolled patterns, multiple variants, and various styling options across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Checkbox } from 'react-native-chill-ui'`

## Features

- **Controlled & Uncontrolled**: Support for both controlled and uncontrolled component patterns
- **Multiple Variants**: Square and circle variants for different design needs
- **Size Variants**: 6 size options from xs to 2xl
- **Custom Colors**: Support for custom checked/unchecked colors
- **Custom Icons**: Use any icon or custom component for the checked state
- **Label Support**: Optional label with pressable/non-pressable behavior
- **Disabled State**: Visual and interactive disabled state support
- **TypeScript Support**: Fully typed for a better development experience
- **Accessible**: Proper focus management and screen reader support

## Quick Start

```tsx
import { Checkbox } from 'react-native-chill-ui';

// Basic usage (uncontrolled)
<Checkbox label="Accept terms and conditions" onCheckedChange={setChecked} />

// Controlled checkbox
<Checkbox
  label="Accept terms"
  isChecked={checked}
  onCheckedChange={setChecked}
/>

// With different variants and sizes
<Checkbox
  label="Circle checkbox"
  variant="circle"
  size="lg"
  isChecked={checked}
  onCheckedChange={setChecked}
/>

// With custom colors
<Checkbox
  label="Custom colors"
  checkedColor="#FF0000"
  uncheckedColor="#CCCCCC"
  isChecked={checked}
  onCheckedChange={setChecked}
/>

// With pressable label
<Checkbox
  label="Clickable label"
  isLabelPressable
  isChecked={checked}
  onCheckedChange={setChecked}
/>
```

## Props

| Prop               | Type                                            | Required | Default    | Description                                                     |
| ------------------ | ----------------------------------------------- | -------- | ---------- | --------------------------------------------------------------- |
| `checkedClassName` | `string`                                        | ❌       | -          | (only NativeWind) Additional CSS classes when checked           |
| `checkedColor`     | `string`                                        | ❌       | `#3B82F6`  | Background color when checked                                   |
| `checkedStyle`     | `StyleProp<ViewStyle>`                          | ❌       | -          | Additional style object when checked                            |
| `children`         | `React.ReactNode`                               | ❌       | -          | Custom content to render instead of default icon when checked   |
| `className`        | `string`                                        | ❌       | -          | (only NativeWind) Custom CSS classes for the checkbox container |
| `iconProps`        | `Partial<IconProps>`                            | ❌       | -          | Props to pass to the icon component                             |
| `isChecked`        | `boolean`                                       | ❌       | `false`    | Whether the checkbox is checked (controlled mode)               |
| `isDisabled`       | `boolean`                                       | ❌       | `false`    | Whether the checkbox is disabled                                |
| `isLabelPressable` | `boolean`                                       | ❌       | `false`    | Whether clicking the label toggles the checkbox                 |
| `label`            | `string`                                        | ❌       | -          | Label text for the checkbox                                     |
| `labelProps`       | `Partial<StringProps>`                          | ❌       | -          | Props to pass to the label component                            |
| `onCheckedChange`  | `(checked: boolean) => void`                    | ❌       | -          | Callback when checkbox state changes                            |
| `size`             | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | ❌       | `'md'`     | Size variant of the checkbox                                    |
| `style`            | `StyleProp<ViewStyle>`                          | ❌       | -          | Style object for the checkbox container                         |
| `uncheckedColor`   | `string`                                        | ❌       | `#FFFFFF`  | Background color when unchecked                                 |
| `variant`          | `'square' \| 'circle'`                          | ❌       | `'square'` | Visual variant of the checkbox                                  |

## Choosing the Right Version

Select the appropriate version during installation based on your project's needs:

| Version        | Installation Command                           | Use When                                                                                             | Pros                                                                            | Cons                                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **StyleSheet** | `npm install react-native-chill-ui@stylesheet` | • No CSS-in-JS dependencies<br/>• Maximum performance needed<br/>• Simple styling requirements       | • Lightweight<br/>• Fast performance<br/>• No external dependencies             | • Less flexible<br/>• Manual theme management         |
| **Tailwind**   | `npm install react-native-chill-ui@tailwind`   | • Already using NativeWind<br/>• Team familiar with Tailwind<br/>• Design system based on utilities  | • Consistent with web Tailwind<br/>• Powerful utility system<br/>• Easy theming | • Requires NativeWind setup<br/>• Larger bundle size  |
| **Hybrid**     | `npm install react-native-chill-ui@hybrid`     | • Building component library<br/>• Uncertain about styling approach<br/>• Want maximum compatibility | • Works in any environment<br/>• Future-proof<br/>• Automatic detection         | • Slightly larger bundle<br/>• More complex internals |

## Examples

### Controlled vs Uncontrolled

```tsx
// Uncontrolled (component manages its own state)
<Checkbox label="I agree to the terms" onCheckedChange={checked => console.log('Checkbox is now:', checked)} />;

// Controlled (you manage the state)
const [isChecked, setIsChecked] = useState(false);

<Checkbox label="I agree to the terms" isChecked={isChecked} onCheckedChange={setIsChecked} />;
```

### Different Variants and Sizes

```tsx
// Square checkboxes (default)
<Checkbox label="Small square" variant="square" size="sm" />
<Checkbox label="Medium square" variant="square" size="md" />
<Checkbox label="Large square" variant="square" size="lg" />

// Circle checkboxes
<Checkbox label="Small circle" variant="circle" size="sm" />
<Checkbox label="Medium circle" variant="circle" size="md" />
<Checkbox label="Large circle" variant="circle" size="lg" />
```

### Custom Colors

```tsx
// StyleSheet and Hybrid versions
<Checkbox
  label="Custom colors"
  checkedColor="#FF0000"
  uncheckedColor="#FFCCCC"
  isChecked={checked}
  onCheckedChange={setChecked}
/>

// Tailwind version (only NativeWind)
<Checkbox
  label="Tailwind classes"
  className="border-red-500"
  checkedClassName="bg-red-500 border-red-500"
  isChecked={checked}
  onCheckedChange={setChecked}
/>
```

### Custom Icons

```tsx
// Using different icon
<Checkbox
  label="Custom icon"
  iconProps={{ name: 'star-solid', color: '#FFD700' }}
  isChecked={checked}
  onCheckedChange={setChecked}
/>

// Using custom component
<Checkbox
  label="Custom component"
  isChecked={checked}
  onCheckedChange={setChecked}
>
  <CustomCheckIcon />
</Checkbox>
```

### Label Behavior

```tsx
// Non-pressable label (default) - only checkbox is clickable
<Checkbox
  label="Only checkbox clickable"
  isLabelPressable={false}
  isChecked={checked}
  onCheckedChange={setChecked}
/>

// Pressable label - both checkbox and label are clickable
<Checkbox
  label="Label also clickable"
  isLabelPressable
  isChecked={checked}
  onCheckedChange={setChecked}
/>
```

### Disabled State

```tsx
<Checkbox
  label="Disabled unchecked"
  isDisabled
  isChecked={false}
/>

<Checkbox
  label="Disabled checked"
  isDisabled
  isChecked={true}
/>
```

### Custom Label Styling

```tsx
// StyleSheet version
<Checkbox
  label="Custom label"
  labelProps={{
    style: { fontSize: 18, color: '#333' }
  }}
  isChecked={checked}
  onCheckedChange={setChecked}
/>

// Tailwind version (only NativeWind)
<Checkbox
  label="Custom label"
  labelProps={{
    className: 'text-lg font-bold text-gray-700'
  }}
  isChecked={checked}
  onCheckedChange={setChecked}
/>
```

## Best Practices

1. **Always provide a label** for accessibility and better UX
2. **Use controlled mode** when checkbox state affects other parts of your UI
3. **Use uncontrolled mode** for simple forms where you don't need intermediate state
4. **Set `isLabelPressable={true}`** for better mobile UX (larger touch target)
5. **Use appropriate size** based on your design - `md` is good for most cases
6. **Provide clear labels** that describe what the user is agreeing to
7. **Handle disabled state** properly to prevent user confusion

## Performance Considerations

- The component uses `useMemo` for computed values to prevent unnecessary re-renders
- Icon size is calculated once and memoized based on checkbox size
- Controlled mode re-renders only when `isChecked` prop changes
- Uncontrolled mode re-renders only on user interaction

## TypeScript

The component is fully typed with TypeScript. Import types as needed:

```tsx
import { Checkbox } from 'react-native-chill-ui';
import type { CheckboxPropsTw, CheckboxPropsSs } from 'react-native-chill-ui';

// For Tailwind/Hybrid versions
const MyCheckbox: React.FC<{ checked: boolean }> = ({ checked }) => (
  <Checkbox label="Typed checkbox" isChecked={checked} />
);
```

## Related Components

- **Input**: For text input with validation
- **Button**: For action buttons with various styles
- **Toggle**: For switch/toggle functionality
- **RadioButton**: For mutually exclusive options

## File Structure

```
checkbox/
├── components/
│   ├── Checkbox.tsx       # Hybrid version (auto-detects NativeWind)
│   ├── Checkbox.ss.tsx    # StyleSheet version
│   └── Checkbox.tw.tsx    # Tailwind/NativeWind version
├── styles/
│   ├── Checkbox.ss.styles.ts  # StyleSheet styles
│   └── Checkbox.tw.styles.ts  # Tailwind variants
├── utils/
│   └── defaultProps.ts    # Default prop values
├── types/
│   ├── checkbox.ss.types.ts  # StyleSheet types
│   └── checkbox.tw.types.ts  # Tailwind types
└── README.md              # This file
```
