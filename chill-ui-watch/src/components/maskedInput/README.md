# MaskedInput Component

A specialized input component that automatically applies formatting masks to user input. Perfect for phone numbers, credit cards, dates, and other formatted data entry.

## Features

- ✅ **Automatic formatting**: Applies masks in real-time as user types
- ✅ **Flexible mask patterns**: Support for any mask format using '9' for digits
- ✅ **Dual output**: Provides both masked and unmasked text
- ✅ **Built-in validation**: Only allows digits in masked positions
- ✅ **Inherits Input features**: All features from the base Input component
- ✅ **TypeScript support**: Full type safety with detailed interfaces
- ✅ **Accessibility**: Full accessibility support inherited from Input

## Quick Start

```tsx
import MaskedInput from '@/components/inputs/MaskedInput';

// Basic phone number mask
<MaskedInput
  mask="(999) 999-9999"
  placeholder="Enter phone number"
  onChangeText={({ maskedText, unmaskedText }) => {
    console.log('Formatted:', maskedText); // "(123) 456-7890"
    console.log('Digits only:', unmaskedText); // "1234567890"
  }}
/>;
```

## Examples

### Phone Number Input

```tsx
const [phoneNumber, setPhoneNumber] = useState('');

<MaskedInput
  label="Phone Number"
  mask="(999) 999-9999"
  placeholder="Enter phone number"
  value={phoneNumber}
  onChangeText={({ maskedText, unmaskedText }) => {
    setPhoneNumber(maskedText);
    // Store only digits for API calls
    setPhoneDigits(unmaskedText);
  }}
  leftIconAction={{
    iconName: 'phone-solid',
    iconSize: 'sm',
  }}
/>;
```

### Credit Card Input

```tsx
const [cardNumber, setCardNumber] = useState('');

<MaskedInput
  label="Card Number"
  mask="9999 9999 9999 9999"
  placeholder="0000 0000 0000 0000"
  value={cardNumber}
  onChangeText={({ maskedText, unmaskedText }) => {
    setCardNumber(maskedText);
    // Validate card number with digits only
    validateCard(unmaskedText);
  }}
  leftIconAction={{
    iconName: 'credit-card-solid',
    iconSize: 'sm',
  }}
  hasError={!!cardError}
  errorMessage={cardError}
/>;
```

### Date Input

```tsx
const [birthDate, setBirthDate] = useState('');

<MaskedInput
  label="Birth Date"
  mask="99/99/9999"
  placeholder="MM/DD/YYYY"
  value={birthDate}
  onChangeText={({ maskedText, unmaskedText }) => {
    setBirthDate(maskedText);
    // Validate date format
    if (unmaskedText.length === 8) {
      validateDate(maskedText);
    }
  }}
  leftIconAction={{
    iconName: 'calendar-solid',
    iconSize: 'sm',
  }}
/>;
```

### Social Security Number

```tsx
const [ssn, setSsn] = useState('');

<MaskedInput
  label="Social Security Number"
  mask="999-99-9999"
  placeholder="000-00-0000"
  value={ssn}
  onChangeText={({ maskedText, unmaskedText }) => {
    setSsn(maskedText);
  }}
  hasSecureTextEntry
  leftIconAction={{
    iconName: 'shield-solid',
    iconSize: 'sm',
  }}
/>;
```

### ZIP Code

```tsx
const [zipCode, setZipCode] = useState('');

<MaskedInput
  label="ZIP Code"
  mask="99999"
  placeholder="12345"
  value={zipCode}
  onChangeText={({ maskedText, unmaskedText }) => {
    setZipCode(maskedText);
  }}
  leftIconAction={{
    iconName: 'location-solid',
    iconSize: 'sm',
  }}
/>;
```

### International Phone Number

```tsx
const [internationalPhone, setInternationalPhone] = useState('');

<MaskedInput
  label="International Phone"
  mask="+99 999 999 9999"
  placeholder="+1 234 567 8900"
  value={internationalPhone}
  onChangeText={({ maskedText, unmaskedText }) => {
    setInternationalPhone(maskedText);
  }}
  leftIconAction={{
    iconName: 'phone-solid',
    iconSize: 'sm',
  }}
/>;
```

## Props Reference

### MaskedInput Specific Props

| Prop           | Type                                                     | Required | Description                               |
| -------------- | -------------------------------------------------------- | -------- | ----------------------------------------- |
| `mask`         | `string`                                                 | ✅       | The mask pattern (use '9' for digits)     |
| `onChangeText` | `({ maskedText: string, unmaskedText: string }) => void` | ✅       | Callback with both formatted and raw text |

### Inherited Props from Input

All props from the Input component are available:

#### Core Props

| Prop          | Type                           | Default | Description            |
| ------------- | ------------------------------ | ------- | ---------------------- |
| `value`       | `string`                       | -       | Current input value    |
| `label`       | `string`                       | -       | Label text above input |
| `placeholder` | `string`                       | -       | Placeholder text       |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'`  | Input size variant     |

#### Validation Props

| Prop             | Type      | Default | Description                        |
| ---------------- | --------- | ------- | ---------------------------------- |
| `hasError`       | `boolean` | `false` | Whether input has error            |
| `errorMessage`   | `string`  | -       | Error message to display           |
| `errorIconName`  | `string`  | -       | Icon name for error state          |
| `errorClassName` | `string`  | -       | Custom CSS classes for error state |

#### Icon Props

| Prop              | Type         | Default | Description                |
| ----------------- | ------------ | ------- | -------------------------- |
| `leftIconAction`  | `IconAction` | -       | Left icon configuration    |
| `rightIconAction` | `IconAction` | -       | Right icon configuration   |
| `hasClearIcon`    | `boolean`    | `true`  | Whether to show clear icon |

#### Styling Props

| Prop             | Type      | Default | Description                    |
| ---------------- | --------- | ------- | ------------------------------ |
| `className`      | `string`  | -       | Custom CSS classes for wrapper |
| `inputClassName` | `string`  | -       | Custom CSS classes for input   |
| `labelClassName` | `string`  | -       | Custom CSS classes for label   |
| `isDisabled`     | `boolean` | `false` | Whether input is disabled      |

#### Behavior Props

| Prop                 | Type         | Default | Description                       |
| -------------------- | ------------ | ------- | --------------------------------- |
| `hasSecureTextEntry` | `boolean`    | `false` | Whether to show secure text entry |
| `showLength`         | `boolean`    | `false` | Whether to show character count   |
| `onPress`            | `() => void` | -       | Callback when input is pressed    |

## Mask Pattern Guide

### Basic Patterns

- **`9`**: Represents a digit (0-9)
- **Any other character**: Literal character that appears in the output

### Common Mask Examples

| Use Case            | Mask Pattern          | Example Input      | Example Output        |
| ------------------- | --------------------- | ------------------ | --------------------- |
| US Phone            | `(999) 999-9999`      | `1234567890`       | `(123) 456-7890`      |
| Credit Card         | `9999 9999 9999 9999` | `1234567890123456` | `1234 5678 9012 3456` |
| Date (MM/DD/YYYY)   | `99/99/9999`          | `12312023`         | `12/31/2023`          |
| SSN                 | `999-99-9999`         | `123456789`        | `123-45-6789`         |
| ZIP Code            | `99999`               | `12345`            | `12345`               |
| International Phone | `+99 999 999 9999`    | `12345678901`      | `+12 345 678 9012`    |
| Currency            | `$999,999.99`         | `1234567`          | `$1,234,567.00`       |
| Time                | `99:99`               | `1430`             | `14:30`               |

### Custom Patterns

You can create any mask pattern you need:

```tsx
// License plate
<MaskedInput mask="AAA-999" /> // ABC-123

// Product code
<MaskedInput mask="PRD-9999-AAA" /> // PRD-1234-XYZ

// Custom format
<MaskedInput mask="###-###-####" /> // 123-456-7890
```

## TypeScript Interfaces

### MaskedInputProps

```tsx
interface MaskedInputProps {
  /** The mask pattern (use '9' for digits, other characters are literals) */
  mask: string;
  /** Callback with both masked and unmasked text */
  onChangeText: ({ maskedText, unmaskedText }: {
    maskedText: string;
    unmaskedText: string;
  }) => void;
  /** All other props from Input component */
  ...InputProps;
}
```

### Callback Structure

```tsx
type MaskedInputCallback = ({
  maskedText, // Formatted text with mask applied
  unmaskedText, // Raw text with only digits
}: {
  maskedText: string;
  unmaskedText: string;
}) => void;
```

## Best Practices

### 1. Choose Appropriate Masks

```tsx
// ✅ Good - Clear and intuitive
<MaskedInput mask="(999) 999-9999" placeholder="(555) 123-4567" />

// ❌ Avoid - Confusing or unclear
<MaskedInput mask="9999999999" placeholder="Enter phone" />
```

### 2. Provide Clear Placeholders

```tsx
// ✅ Good - Shows expected format
<MaskedInput
  mask="99/99/9999"
  placeholder="MM/DD/YYYY"
/>

// ❌ Avoid - Generic placeholder
<MaskedInput
  mask="99/99/9999"
  placeholder="Enter date"
/>
```

### 3. Handle Both Text Versions

```tsx
// ✅ Good - Use both masked and unmasked text
<MaskedInput
  mask="(999) 999-9999"
  onChangeText={({ maskedText, unmaskedText }) => {
    setDisplayPhone(maskedText);     // For display
    setPhoneForAPI(unmaskedText);    // For API calls
  }}
/>

// ❌ Avoid - Only using one version
<MaskedInput
  mask="(999) 999-9999"
  onChangeText={(text) => setPhone(text)}
/>
```

### 4. Validate When Complete

```tsx
// ✅ Good - Validate when input is complete
<MaskedInput
  mask="999-99-9999"
  onChangeText={({ maskedText, unmaskedText }) => {
    setSsn(maskedText);
    if (unmaskedText.length === 9) {
      validateSSN(unmaskedText);
    }
  }}
/>
```

### 5. Use Appropriate Icons

```tsx
// ✅ Good - Meaningful icons
<MaskedInput
  mask="9999 9999 9999 9999"
  leftIconAction={{ iconName: 'credit-card-solid' }}
/>

// ❌ Avoid - Generic icons
<MaskedInput
  mask="9999 9999 9999 9999"
  leftIconAction={{ iconName: 'question-solid' }}
/>
```

## Advanced Usage

### Form Integration

```tsx
const [formData, setFormData] = useState({
  phone: '',
  card: '',
  ssn: '',
});

const handleMaskedChange = (field: string) => ({ maskedText, unmaskedText }) => {
  setFormData(prev => ({
    ...prev,
    [field]: maskedText,
    [`${field}Digits`]: unmaskedText
  }));
};

<MaskedInput
  label="Phone Number"
  mask="(999) 999-9999"
  value={formData.phone}
  onChangeText={handleMaskedChange('phone')}
/>

<MaskedInput
  label="Card Number"
  mask="9999 9999 9999 9999"
  value={formData.card}
  onChangeText={handleMaskedChange('card')}
/>

<MaskedInput
  label="SSN"
  mask="999-99-9999"
  value={formData.ssn}
  onChangeText={handleMaskedChange('ssn')}
  hasSecureTextEntry
/>
```

### Validation with Masks

```tsx
const [phoneNumber, setPhoneNumber] = useState('');
const [phoneError, setPhoneError] = useState('');

const validatePhone = (digits: string) => {
  if (digits.length < 10) {
    return 'Phone number must be at least 10 digits';
  }
  if (digits.length > 10) {
    return 'Phone number cannot exceed 10 digits';
  }
  return '';
};

<MaskedInput
  label="Phone Number"
  mask="(999) 999-9999"
  value={phoneNumber}
  onChangeText={({ maskedText, unmaskedText }) => {
    setPhoneNumber(maskedText);
    const error = validatePhone(unmaskedText);
    setPhoneError(error);
  }}
  hasError={!!phoneError}
  errorMessage={phoneError}
/>;
```

### Dynamic Mask Based on Input

```tsx
const [countryCode, setCountryCode] = useState('US');
const [phoneNumber, setPhoneNumber] = useState('');

const getPhoneMask = (country: string) => {
  switch (country) {
    case 'US':
      return '(999) 999-9999';
    case 'UK':
      return '+44 999 999 9999';
    case 'FR':
      return '+33 9 99 99 99 99';
    default:
      return '999 999 9999';
  }
};

<MaskedInput
  label="Phone Number"
  mask={getPhoneMask(countryCode)}
  value={phoneNumber}
  onChangeText={({ maskedText, unmaskedText }) => {
    setPhoneNumber(maskedText);
  }}
  placeholder={getPhoneMask(countryCode).replace(/9/g, '0')}
/>;
```

## Accessibility

The MaskedInput component inherits all accessibility features from the Input component:

- **Screen reader support**: Proper labeling and announcements
- **Keyboard navigation**: Full keyboard support
- **Focus management**: Proper focus handling
- **Error announcements**: Screen readers announce validation errors
- **Semantic markup**: Correct ARIA attributes

### Accessibility Best Practices

```tsx
// Always provide labels
<MaskedInput
  label="Social Security Number"
  mask="999-99-9999"
  onChangeText={handleSSNChange}
/>

// Provide clear error messages
<MaskedInput
  label="Credit Card"
  mask="9999 9999 9999 9999"
  hasError={!!cardError}
  errorMessage={cardError}
  onChangeText={handleCardChange}
/>

// Use appropriate icons for context
<MaskedInput
  label="Phone Number"
  mask="(999) 999-9999"
  leftIconAction={{ iconName: 'phone-solid' }}
  onChangeText={handlePhoneChange}
/>
```

## Performance Considerations

- The component uses `useCallback` for the change handler to prevent unnecessary re-renders
- Mask application is optimized for real-time input
- The component automatically calculates `maxLength` based on the mask pattern
- State updates are batched for better performance

## Troubleshooting

### Common Issues

1. **Mask not applying**: Ensure you're using '9' for digit positions
2. **Callback not receiving data**: Check that `onChangeText` expects the correct structure
3. **Validation issues**: Use `unmaskedText` for validation, `maskedText` for display
4. **Length restrictions**: The component automatically sets `maxLength` based on mask

### Debug Example

```tsx
<MaskedInput
  mask="(999) 999-9999"
  onChangeText={({ maskedText, unmaskedText }) => {
    console.log('Debug:', {
      mask: '(999) 999-9999',
      maskedText,
      unmaskedText,
      maskedLength: maskedText.length,
      unmaskedLength: unmaskedText.length,
    });
  }}
/>
```
