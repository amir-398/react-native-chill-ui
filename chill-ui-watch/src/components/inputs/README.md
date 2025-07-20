# Input Component

A comprehensive and customizable input component for React Native with advanced features including validation, icons, animations, and accessibility support. Perfect for forms, search interfaces, and user data collection.

## Features

- ✅ **Multiple input types**: Text, multiline, secure text entry
- ✅ **Validation**: Built-in validation patterns and custom regex support
- ✅ **Icons**: Left and right icons with custom actions
- ✅ **Animations**: Scale animations on press
- ✅ **Error handling**: Error states with custom error messages and icons
- ✅ **Accessibility**: Full accessibility support
- ✅ **Character counting**: Optional character length display
- ✅ **Clear functionality**: Built-in clear button
- ✅ **Customizable styling**: Tailwind CSS classes support
- ✅ **Multiple sizes**: xs, sm, md, lg variants
- ✅ **Disabled states**: Visual feedback for disabled inputs
- ✅ **Press interactions**: Optional press callbacks with animations

## Quick Start

```tsx
import Input from '@/components/inputs/Input';

// Basic usage
<Input placeholder="Enter your name" onChangeText={text => console.log(text)} />;
```

## Examples

### Basic Input with Label

```tsx
<Input label="Full Name" placeholder="Enter your full name" onChangeText={setFullName} size="md" />
```

### Input with Validation

```tsx
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

<Input
  label="Email Address"
  placeholder="Enter your email"
  value={email}
  onChangeText={text => {
    setEmail(text);
    // Custom validation
    if (text && !text.includes('@')) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  }}
  hasError={!!emailError}
  errorMessage={emailError}
  leftIconAction={{
    iconName: 'envelope-solid',
    iconSize: 'sm',
  }}
/>;
```

### Search Input with Icons

```tsx
<Input
  placeholder="Search products..."
  value={searchQuery}
  onChangeText={setSearchQuery}
  leftIconAction={{
    iconName: 'search-solid',
    iconSize: 'sm',
    iconColor: '#666',
  }}
  rightIconAction={{
    iconName: 'filter-solid',
    iconSize: 'sm',
    iconPress: handleFilter,
  }}
  hasClearIcon
  showLength
  maxLength={100}
/>
```

### Secure Password Input

```tsx
<Input
  label="Password"
  placeholder="Enter your password"
  hasSecureTextEntry
  onChangeText={setPassword}
  leftIconAction={{
    iconName: 'lock-solid',
    iconSize: 'sm',
  }}
  allow="all"
/>
```

### Multiline Text Area

```tsx
<Input
  label="Description"
  placeholder="Enter description..."
  multiline
  isStretchable
  size="lg"
  onChangeText={setDescription}
  maxLength={500}
  showLength
/>
```

### Numeric Input with Validation

```tsx
<Input
  label="Phone Number"
  placeholder="Enter phone number"
  allow="numbers"
  onChangeText={setPhoneNumber}
  leftIconAction={{
    iconName: 'phone-solid',
    iconSize: 'sm',
  }}
  maxLength={15}
/>
```

### Input with Custom Validation

```tsx
<Input
  label="Username"
  placeholder="Enter username"
  customRegex={/^[a-zA-Z0-9_]{3,20}$/}
  onChangeText={setUsername}
  hasError={!!usernameError}
  errorMessage={usernameError}
  leftIconAction={{
    iconName: 'user-solid',
    iconSize: 'sm',
  }}
/>
```

### Disabled Input

```tsx
<Input
  label="Read-only Field"
  value="This field cannot be edited"
  isDisabled
  leftIconAction={{
    iconName: 'lock-solid',
    iconSize: 'sm',
  }}
/>
```

### Input with Press Interaction

```tsx
<Input
  label="Clickable Input"
  placeholder="Click to open picker"
  onPress={openDatePicker}
  clickableAs="scale"
  leftIconAction={{
    iconName: 'calendar-solid',
    iconSize: 'sm',
  }}
/>
```

## Props Reference

### Core Props

| Prop           | Type                           | Default | Description                |
| -------------- | ------------------------------ | ------- | -------------------------- |
| `value`        | `string`                       | -       | Current input value        |
| `onChangeText` | `(text: string) => void`       | -       | Callback when text changes |
| `placeholder`  | `string`                       | -       | Placeholder text           |
| `label`        | `string`                       | -       | Label text above input     |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'`  | Input size variant         |

### Validation Props

| Prop             | Type                                                                   | Default | Description                        |
| ---------------- | ---------------------------------------------------------------------- | ------- | ---------------------------------- |
| `allow`          | `'all' \| 'numbers' \| 'letters' \| 'lettersWithoutSpecialCharacters'` | `'all'` | Input validation type              |
| `customRegex`    | `RegExp`                                                               | -       | Custom validation regex            |
| `hasError`       | `boolean`                                                              | `false` | Whether input has error            |
| `errorMessage`   | `string`                                                               | -       | Error message to display           |
| `errorIconName`  | `string`                                                               | -       | Icon name for error state          |
| `errorClassName` | `string`                                                               | -       | Custom CSS classes for error state |

### Icon Props

| Prop              | Type         | Default | Description                |
| ----------------- | ------------ | ------- | -------------------------- |
| `leftIconAction`  | `IconAction` | -       | Left icon configuration    |
| `rightIconAction` | `IconAction` | -       | Right icon configuration   |
| `hasClearIcon`    | `boolean`    | `true`  | Whether to show clear icon |

### Styling Props

| Prop             | Type      | Default | Description                    |
| ---------------- | --------- | ------- | ------------------------------ |
| `className`      | `string`  | -       | Custom CSS classes for wrapper |
| `inputClassName` | `string`  | -       | Custom CSS classes for input   |
| `labelClassName` | `string`  | -       | Custom CSS classes for label   |
| `isDisabled`     | `boolean` | `false` | Whether input is disabled      |
| `editable`       | `boolean` | `true`  | Whether input is editable      |

### Behavior Props

| Prop                 | Type                | Default   | Description                           |
| -------------------- | ------------------- | --------- | ------------------------------------- |
| `multiline`          | `boolean`           | `false`   | Whether input supports multiple lines |
| `isStretchable`      | `boolean`           | `false`   | Whether multiline input can stretch   |
| `hasSecureTextEntry` | `boolean`           | `false`   | Whether to show secure text entry     |
| `maxLength`          | `number`            | -         | Maximum character length              |
| `showLength`         | `boolean`           | `false`   | Whether to show character count       |
| `onPress`            | `() => void`        | -         | Callback when input is pressed        |
| `clickableAs`        | `'scale' \| 'none'` | `'scale'` | Animation type on press               |

## Type Definitions

### IconAction Interface

```tsx
interface IconAction {
  /** Icon name from the available icon set */
  iconName?: string;
  /** Icon size variant */
  iconSize?: 'xs' | 'sm' | 'md' | 'lg';
  /** Icon color */
  iconColor?: string;
  /** Callback when icon is pressed */
  iconPress?: () => void;
  /** Custom icon component */
  customIcon?: React.ReactNode;
}
```

## Validation Types

### Built-in Validation Patterns

- **`'all'`**: Accepts any character (default)
- **`'numbers'`**: Accepts only numeric characters (0-9)
- **`'letters'`**: Accepts only letters and spaces (including accented characters)
- **`'lettersWithoutSpecialCharacters'`**: Accepts letters, numbers, and spaces

### Custom Validation

Use the `customRegex` prop for custom validation patterns:

```tsx
// Phone number validation
<Input
  placeholder="Enter phone number"
  customRegex={/^\+?[\d\s\-\(\)]+$/}
  onChangeText={setPhoneNumber}
/>

// Email validation
<Input
  placeholder="Enter email"
  customRegex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
  onChangeText={setEmail}
/>

// Username validation (3-20 chars, alphanumeric + underscore)
<Input
  placeholder="Enter username"
  customRegex={/^[a-zA-Z0-9_]{3,20}$/}
  onChangeText={setUsername}
/>
```

## Styling Guide

### Size Variants

| Size | Text Size | Height (Single) | Min Height (Multiline) |
| ---- | --------- | --------------- | ---------------------- |
| `xs` | 13px      | 40px            | 64px                   |
| `sm` | 14px      | 48px            | 80px                   |
| `md` | 16px      | 56px            | 96px                   |
| `lg` | 18px      | 64px            | 112px                  |

### Multiline Behavior

When `multiline` is true, the input behavior changes:

- **`isStretchable: true`**: Minimum height with ability to grow as content expands
- **`isStretchable: false`**: Fixed height based on size variant

### Custom Styling

```tsx
// Custom wrapper styling
<Input
  className="border-2 border-blue-500 bg-blue-50"
  inputClassName="text-blue-900"
  labelClassName="text-blue-700 font-bold"
  onChangeText={setValue}
/>

// Error state styling
<Input
  errorClassName="border-red-500 bg-red-50"
  hasError={!!error}
  errorMessage={error}
  onChangeText={setValue}
/>
```

## Accessibility Features

The Input component includes comprehensive accessibility support:

- **Screen reader support**: Proper labeling and announcements
- **Error announcements**: Screen readers announce error messages
- **Focus management**: Proper focus handling and keyboard navigation
- **Semantic markup**: Correct ARIA attributes and roles
- **Color contrast**: Meets WCAG contrast requirements

### Accessibility Best Practices

```tsx
// Always provide labels for screen readers
<Input
  label="Email Address"
  placeholder="Enter your email"
  onChangeText={setEmail}
/>

// Provide clear error messages
<Input
  label="Password"
  hasError={!!passwordError}
  errorMessage={passwordError}
  onChangeText={setPassword}
/>

// Use appropriate validation for the input type
<Input
  label="Age"
  allow="numbers"
  maxLength={3}
  onChangeText={setAge}
/>
```

## Best Practices

### 1. Always Provide Labels

```tsx
// ✅ Good
<Input label="Email" placeholder="Enter email" />

// ❌ Avoid
<Input placeholder="Enter email" />
```

### 2. Use Appropriate Validation

```tsx
// ✅ Good - Specific validation
<Input allow="numbers" maxLength={10} />

// ❌ Avoid - Too permissive
<Input allow="all" />
```

### 3. Provide Clear Error Messages

```tsx
// ✅ Good - Clear and helpful
<Input errorMessage="Please enter a valid email address" />

// ❌ Avoid - Vague error
<Input errorMessage="Invalid input" />
```

### 4. Use Icons Sparingly

```tsx
// ✅ Good - Meaningful icons
<Input
  leftIconAction={{ iconName: 'search-solid' }}
  placeholder="Search..."
/>

// ❌ Avoid - Too many icons
<Input
  leftIconAction={{ iconName: 'icon1' }}
  rightIconAction={{ iconName: 'icon2' }}
  hasClearIcon
/>
```

### 5. Consider Character Limits

```tsx
// ✅ Good - User guidance
<Input maxLength={500} showLength />

// ❌ Avoid - No guidance
<Input />
```

## Advanced Usage

### Form Integration

```tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
});

const [errors, setErrors] = useState({});

const handleInputChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));

  // Clear error when user starts typing
  if (errors[field]) {
    setErrors(prev => ({ ...prev, [field]: '' }));
  }
};

<Input
  label="Full Name"
  value={formData.name}
  onChangeText={(value) => handleInputChange('name', value)}
  hasError={!!errors.name}
  errorMessage={errors.name}
/>

<Input
  label="Email"
  value={formData.email}
  onChangeText={(value) => handleInputChange('email', value)}
  hasError={!!errors.email}
  errorMessage={errors.email}
/>

<Input
  label="Phone"
  value={formData.phone}
  allow="numbers"
  onChangeText={(value) => handleInputChange('phone', value)}
  hasError={!!errors.phone}
  errorMessage={errors.phone}
/>
```

### Search with Debouncing

```tsx
const [searchQuery, setSearchQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(searchQuery);
  }, 300);

  return () => clearTimeout(timer);
}, [searchQuery]);

useEffect(() => {
  if (debouncedQuery) {
    performSearch(debouncedQuery);
  }
}, [debouncedQuery]);

<Input
  placeholder="Search..."
  value={searchQuery}
  onChangeText={setSearchQuery}
  leftIconAction={{
    iconName: 'search-solid',
    iconSize: 'sm',
  }}
  hasClearIcon
/>;
```
