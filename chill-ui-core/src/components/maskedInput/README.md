# MaskedInput Component

A comprehensive and performant masked text input component for React Native that provides automatic text formatting, validation, and customizable mask patterns across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { MaskedInput } from 'react-native-chill-ui'`

## Features

- **Automatic Masking**: Real-time text formatting as user types
- **Multiple Mask Patterns**: Support for phone numbers, credit cards, SSN, dates, and custom patterns
- **Input Validation**: Built-in filtering of non-numeric characters
- **Controlled/Uncontrolled**: Support for both controlled and uncontrolled input modes
- **Customizable Styling**: Support for custom fonts, colors, and CSS classes
- **TypeScript Support**: Fully typed for a better development experience
- **Performance Optimized**: Efficient masking algorithms with minimal re-renders

## Quick Start

```tsx
import { MaskedInput } from 'react-native-chill-ui';

// Basic phone number input
<MaskedInput
  mask="(999) 999-9999"
  placeholder="Enter phone number"
  onChangeText={({ maskedText, unmaskedText }) => {
    console.log('Formatted:', maskedText);
    console.log('Raw:', unmaskedText);
  }}
/>

// Credit card input
<MaskedInput
  mask="9999 9999 9999 9999"
  placeholder="Enter card number"
  label="Credit Card"
  onChangeText={handleCardChange}
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
<MaskedInput
  style={{ backgroundColor: '#fff', borderColor: '#ccc' }}
  mask="(999) 999-9999"
  placeholder="Enter phone number"
/>
```

## Mask Patterns

The MaskedInput component supports various mask patterns using the `9` character to represent digits:

### Common Patterns

| Pattern               | Description            | Example             |
| --------------------- | ---------------------- | ------------------- |
| `(999) 999-9999`      | US Phone Number        | (555) 123-4567      |
| `999-99-9999`         | Social Security Number | 123-45-6789         |
| `9999 9999 9999 9999` | Credit Card            | 1234 5678 9012 3456 |
| `99/99/9999`          | Date (MM/DD/YYYY)      | 12/31/2023          |
| `$999,999.99`         | Currency               | $1,234.56           |
| `99999`               | ZIP Code               | 12345               |
| `999 999 9999`        | Phone with spaces      | 555 123 4567        |

### Custom Patterns

You can create custom patterns by combining `9` (for digits) with any other characters:

```tsx
// Custom pattern: ABC-123-XYZ
<MaskedInput
  mask="ABC-999-XYZ"
  placeholder="Enter code"
  onChangeText={handleChange}
/>

// License plate pattern
<MaskedInput
  mask="999-AAA"
  placeholder="Enter license plate"
  onChangeText={handleChange}
/>
```

## Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { MaskedInput } from 'react-native-chill-ui';

const BasicMaskedInput = () => {
  const [phone, setPhone] = useState('');

  return (
    <MaskedInput
      mask="(999) 999-9999"
      placeholder="Enter phone number"
      label="Phone Number"
      value={phone}
      onChangeText={({ maskedText, unmaskedText }) => {
        setPhone(maskedText);
        console.log('Raw digits:', unmaskedText);
      }}
    />
  );
};
```

### Credit Card Input

```tsx
const CreditCardInput = () => {
  const [cardNumber, setCardNumber] = useState('');

  return (
    <MaskedInput
      mask="9999 9999 9999 9999"
      placeholder="Enter card number"
      label="Credit Card"
      value={cardNumber}
      onChangeText={({ maskedText, unmaskedText }) => {
        setCardNumber(maskedText);
        // Validate card number
        if (unmaskedText.length === 16) {
          validateCard(unmaskedText);
        }
      }}
    />
  );
};
```

### Date Input

```tsx
const DateInput = () => {
  const [birthDate, setBirthDate] = useState('');

  return (
    <MaskedInput
      mask="99/99/9999"
      placeholder="MM/DD/YYYY"
      label="Birth Date"
      value={birthDate}
      onChangeText={({ maskedText, unmaskedText }) => {
        setBirthDate(maskedText);
        // Validate date
        if (unmaskedText.length === 8) {
          validateDate(maskedText);
        }
      }}
    />
  );
};
```

### Currency Input

```tsx
const CurrencyInput = () => {
  const [amount, setAmount] = useState('');

  return (
    <MaskedInput
      mask="$999,999.99"
      placeholder="Enter amount"
      label="Amount"
      value={amount}
      onChangeText={({ maskedText, unmaskedText }) => {
        setAmount(maskedText);
        // Convert to number for calculations
        const numericValue = parseFloat(unmaskedText) / 100;
        console.log('Numeric value:', numericValue);
      }}
    />
  );
};
```

### With Error Handling

```tsx
const ErrorHandlingInput = () => {
  const [ssn, setSsn] = useState('');
  const [hasError, setHasError] = useState(false);

  const validateSSN = (unmaskedText: string) => {
    const isValid = unmaskedText.length === 9;
    setHasError(!isValid && unmaskedText.length > 0);
  };

  return (
    <MaskedInput
      mask="999-99-9999"
      placeholder="Enter SSN"
      label="Social Security Number"
      value={ssn}
      hasError={hasError}
      errorMessage="Please enter a valid SSN"
      onChangeText={({ maskedText, unmaskedText }) => {
        setSsn(maskedText);
        validateSSN(unmaskedText);
      }}
    />
  );
};
```

### Controlled vs Uncontrolled

```tsx
// Controlled component
const ControlledInput = () => {
  const [value, setValue] = useState('');

  return <MaskedInput mask="(999) 999-9999" value={value} onChangeText={({ maskedText }) => setValue(maskedText)} />;
};

// Uncontrolled component
const UncontrolledInput = () => {
  return (
    <MaskedInput
      mask="(999) 999-9999"
      defaultValue="5551234567"
      onChangeText={({ maskedText, unmaskedText }) => {
        console.log('Formatted:', maskedText);
        console.log('Raw:', unmaskedText);
      }}
    />
  );
};
```

### With Icons

```tsx
const IconMaskedInput = () => {
  const [phone, setPhone] = useState('');

  return (
    <MaskedInput
      mask="(999) 999-9999"
      placeholder="Enter phone number"
      label="Phone Number"
      value={phone}
      onChangeText={({ maskedText }) => setPhone(maskedText)}
      leftIconAction={{
        iconName: 'phone-solid',
        iconSize: 'md',
      }}
      rightIconAction={{
        iconName: 'checkmark-solid',
        iconPress: () => console.log('Phone validated'),
        hasPressEffect: true,
      }}
    />
  );
};
```

## API Reference

### MaskedInputProps

| Prop               | Type                                                             | Default      | Description                                  |
| ------------------ | ---------------------------------------------------------------- | ------------ | -------------------------------------------- |
| `mask`             | `string`                                                         | **required** | Mask pattern (use 9 for digits)              |
| `onChangeText`     | `(result: { maskedText: string; unmaskedText: string }) => void` | -            | Callback when text changes                   |
| `value`            | `string`                                                         | -            | Controlled input value                       |
| `defaultValue`     | `string`                                                         | -            | Default input value (uncontrolled)           |
| `placeholder`      | `string`                                                         | -            | Placeholder text                             |
| `label`            | `string`                                                         | -            | Label text above input                       |
| `hasError`         | `boolean`                                                        | -            | Whether input is in error state              |
| `errorMessage`     | `string`                                                         | -            | Error message to display                     |
| `isDisabled`       | `boolean`                                                        | -            | Whether input is disabled                    |
| `editable`         | `boolean`                                                        | `true`       | Whether input is editable                    |
| `maxLength`        | `number`                                                         | -            | Maximum length (auto-calculated from mask)   |
| `className`        | `string`                                                         | -            | Custom CSS classes (Tailwind/Hybrid only)    |
| `style`            | `StyleProp<ViewStyle>`                                           | -            | Custom style object                          |
| `inputClassName`   | `string`                                                         | -            | Custom CSS classes for input field           |
| `errorClassName`   | `string`                                                         | -            | Custom CSS classes for error state           |
| `labelStringProps` | `StringProps`                                                    | -            | Props for the label String component         |
| `errorStringProps` | `StringProps`                                                    | -            | Props for the error message String component |
| `leftIconAction`   | `IconActionProps`                                                | -            | Configuration for left icon                  |
| `rightIconAction`  | `IconActionProps`                                                | -            | Configuration for right icon                 |
| `size`             | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                           | `'md'`       | Input size variant                           |
| `wrapperRef`       | `RefObject<View>`                                                | -            | Ref for the input container wrapper          |

### IconActionProps

| Prop             | Type                                   | Description                                       |
| ---------------- | -------------------------------------- | ------------------------------------------------- |
| `iconName`       | `string`                               | Name of the icon to display                       |
| `iconSize`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Size of the icon                                  |
| `iconColor`      | `string`                               | Color of the icon                                 |
| `iconPress`      | `() => void`                           | Callback when icon is pressed                     |
| `customIcon`     | `ReactNode`                            | Custom icon component                             |
| `hasPressEffect` | `boolean`                              | Whether to show press effect when icon is pressed |

### Size Variants

| Size | Font Size | Padding | Use Case                    |
| ---- | --------- | ------- | --------------------------- |
| `xs` | 12px      | 6px     | Compact forms, small spaces |
| `sm` | 14px      | 8px     | Small forms, mobile layouts |
| `md` | 16px      | 12px    | Default size, most common   |
| `lg` | 18px      | 14px    | Large forms, desktop        |
| `xl` | 20px      | 16px    | Extra large, accessibility  |

## Utility Functions

The MaskedInput component exports utility functions for advanced usage:

```tsx
import { applyMask, removeMask, handleApplyMask } from 'react-native-chill-ui';

// Apply mask to text
const formatted = applyMask('1234567890', '(999) 999-9999');
// Result: "(123) 456-7890"

// Remove mask from text
const raw = removeMask('(123) 456-7890');
// Result: "1234567890"

// Handle mask application with validation
const result = handleApplyMask('abc123def456', '(999) 999-9999');
// Result: "(123) 456-"
```

## Best Practices

### Performance

1. **Use controlled components** for better state management:

```tsx
const [value, setValue] = useState('');

<MaskedInput mask="(999) 999-9999" value={value} onChangeText={({ maskedText }) => setValue(maskedText)} />;
```

2. **Debounce validation** for better UX:

```tsx
const debouncedValidate = useDebounce(validateInput, 300);

const handleChange = ({ maskedText, unmaskedText }) => {
  setValue(maskedText);
  debouncedValidate(unmaskedText);
};
```

### Accessibility

1. **Add accessibility labels**:

```tsx
<MaskedInput
  mask="(999) 999-9999"
  placeholder="Enter phone number"
  accessibilityLabel="Phone number input"
  accessibilityHint="Enter your 10-digit phone number"
/>
```

2. **Use semantic labels**:

```tsx
<MaskedInput
  mask="999-99-9999"
  label="Social Security Number"
  accessibilityLabel="Social Security Number"
  errorMessage="Please enter a valid SSN"
/>
```

### Styling

1. **Use consistent spacing**:

```tsx
// Tailwind/Hybrid version
<MaskedInput className="mx-4 my-2 bg-white rounded-lg border" />

// StyleSheet version
<MaskedInput style={{ margin: 16, backgroundColor: 'white', borderRadius: 8 }} />
```

2. **Handle different screen sizes**:

```tsx
const screenWidth = Dimensions.get('window').width;
const inputWidth = screenWidth * 0.8;

<MaskedInput style={{ width: inputWidth }} mask="(999) 999-9999" />;
```

## Troubleshooting

### Common Issues

1. **Mask not applying**
   - Ensure mask pattern uses `9` for digits
   - Check if `onChangeText` callback is provided
   - Verify input is not disabled

2. **Characters not filtering**
   - MaskedInput automatically filters non-digit characters
   - Only digits are processed according to the mask pattern
   - Other characters are ignored

3. **Performance issues**
   - Use controlled components for better state management
   - Implement debouncing for validation
   - Avoid complex calculations in `onChangeText`

4. **Styling not applying**
   - Check if you're using the correct version (StyleSheet vs Tailwind)
   - Verify CSS classes are available in Tailwind version
   - Use `style` prop for custom styling

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
