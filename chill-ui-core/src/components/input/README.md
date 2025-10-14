# Input Component

A comprehensive and performant text input component for React Native that provides validation, icons, error handling, and customizable styling across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { Input } from 'react-native-chill-ui'`

## Features

- **Input Validation**: Built-in validation for numbers, letters, and custom regex patterns
- **Icon Support**: Left and right icons with customizable actions
- **Error Handling**: Visual error states with custom error messages
- **Security**: Password field support with show/hide toggle
- **Character Count**: Optional character count display with max length
- **Multiple Sizes**: 5 size variants from xs to xl
- **Customizable Styling**: Support for custom fonts, colors, and CSS classes
- **TypeScript Support**: Fully typed for a better development experience

## Quick Start

```tsx
import { Input } from 'react-native-chill-ui';

// Basic input with label
<Input
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
/>

// Input with validation and error handling
<Input
  label="Password"
  placeholder="Enter password"
  hasSecureTextEntry
  hasError={hasError}
  errorMessage="Password is required"
  allow="lettersWithoutSpecialCharacters"
/>
```

## Choosing the Right Version

Select the appropriate version during installation based on your project's needs:

| Version        | Installation Command                           | Use When                                                                                             | Pros                                                                            | Cons                                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **StyleSheet** | `npm install react-native-chill-ui@stylesheet` | • No CSS-in-JS dependencies<br/>• Maximum performance needed<br/>• Simple styling requirements       | • Lightweight<br/>• Fast performance<br/>• No external dependencies             | • Less flexible<br/>• Manual theme management         |
| **Tailwind**   | `npm install react-native-chill-ui@tailwind`   | • Already using NativeWind<br/>• Team familiar with Tailwind<br/>• Design system based on utilities  | • Consistent with web Tailwind<br/>• Powerful utility system<br/>• Easy theming | • Requires NativeWind setup<br/>• Larger bundle size  |
| **Hybrid**     | `npm install react-native-chill-ui@hybrid`     | • Building component library<br/>• Uncertain about styling approach<br/>• Want maximum compatibility | • Works in any environment<br/>• Future-proof<br/>• Automatic detection         | • Slightly larger bundle<br/>• More complex internals |

## Configuration

### For Tailwind and Hybrid Versions

When using the Tailwind or Hybrid versions, you must define your application's color palette in your `tailwind.config.js` file.

### Colors

The `colorVariant` prop is only available for **Tailwind** and **Hybrid** versions when NativeWind is installed:

`primary`, `secondary`, `tertiary`, `success`, `warning`, `error`, `danger`, `info`, `dark`, `light`, `white`, `disabled`, `inverted`, `muted`, `neutral`

These must be defined in your `tailwind.config.js` file.

### For All Versions

All versions support custom colors through the `color` prop:

```tsx
<Input color="#FF0000" label="Custom Color Input" />
<Input color="rgb(255, 0, 0)" label="RGB Color Input" />
```

## Input Validation

The Input component supports several validation types through the `allow` prop:

- `'all'`: No validation (default)
- `'numbers'`: Only numeric characters
- `'letters'`: Only letters and spaces (including accented characters)
- `'lettersWithoutSpecialCharacters'`: Letters, numbers, and spaces only
- `customRegex`: Use your own regex pattern with the `customRegex` prop

```tsx
// Numeric input
<Input allow="numbers" label="Age" placeholder="Enter your age" />

// Letters only
<Input allow="letters" label="Name" placeholder="Enter your name" />

// Custom regex
<Input
  customRegex={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
  label="Email"
  placeholder="Enter email"
/>
```

## Size Variants

The Input component supports the following size options:

- `xs`: 12px font, 6px padding
- `sm`: 14px font, 8px padding
- `md`: 16px font, 12px padding (default)
- `lg`: 18px font, 14px padding
- `xl`: 20px font, 16px padding

## Examples

### Basic Usage

```tsx
import { Input } from 'react-native-chill-ui';

const BasicInput = () => {
  const [email, setEmail] = useState('');

  return <Input label="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} />;
};

const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  return (
    <Input
      label="Password"
      placeholder="Enter password"
      value={password}
      onChangeText={setPassword}
      hasSecureTextEntry
      hasError={hasError}
      errorMessage="Password must be at least 8 characters"
    />
  );
};
```

### With Icons

```tsx
const IconInput = () => {
  const [search, setSearch] = useState('');

  return (
    <Input
      label="Search"
      placeholder="Search..."
      value={search}
      onChangeText={setSearch}
      leftIconAction={{
        iconName: 'magnifying-glass-solid',
        iconSize: 'sm',
      }}
      rightIconAction={{
        iconName: 'xmark-solid',
        iconPress: () => setSearch(''),
        hasPressEffect: true,
      }}
    />
  );
};
```

### Size Variants

```tsx
const SizeVariants = () => {
  return (
    <Box className="space-y-4">
      <Input label="Extra Small" size="xs" placeholder="xs size" />
      <Input label="Small" size="sm" placeholder="sm size" />
      <Input label="Medium" size="md" placeholder="md size (default)" />
      <Input label="Large" size="lg" placeholder="lg size" />
      <Input label="Extra Large" size="xl" placeholder="xl size" />
    </Box>
  );
};
```

### Validation Examples

```tsx
const ValidationExamples = () => {
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Box className="space-y-4">
      {/* Numbers only */}
      <Input label="Age" placeholder="Enter your age" value={age} onChangeText={setAge} allow="numbers" />

      {/* Letters only */}
      <Input label="Full Name" placeholder="Enter your name" value={name} onChangeText={setName} allow="letters" />

      {/* Custom regex for email */}
      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        customRegex={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
      />
    </Box>
  );
};
```

### Error States

```tsx
const ErrorStates = () => {
  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState(false);

  const validateEmail = (text: string) => {
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(text);
    setHasError(!isValid && text.length > 0);
  };

  return (
    <Input
      label="Email"
      placeholder="Enter your email"
      value={email}
      onChangeText={text => {
        setEmail(text);
        validateEmail(text);
      }}
      hasError={hasError}
      errorMessage="Please enter a valid email address"
      errorIconName="exclamation-triangle-solid"
    />
  );
};
```

### Character Count

```tsx
const CharacterCountInput = () => {
  const [bio, setBio] = useState('');

  return (
    <Input
      label="Bio"
      placeholder="Tell us about yourself"
      value={bio}
      onChangeText={setBio}
      multiline
      maxLength={200}
      showLength
    />
  );
};
```

## API Reference

### InputProps

| Prop                 | Type                                                                   | Default | Description                                     |
| -------------------- | ---------------------------------------------------------------------- | ------- | ----------------------------------------------- |
| `allow`              | `'all' \| 'numbers' \| 'letters' \| 'lettersWithoutSpecialCharacters'` | `'all'` | Input validation type                           |
| `className`          | `string`                                                               | -       | Custom CSS classes for the input container      |
| `clickableAs`        | `'scale' \| undefined`                                                 | -       | Animation type when input is pressed            |
| `customRegex`        | `RegExp`                                                               | -       | Custom regex pattern for input validation       |
| `editable`           | `boolean`                                                              | `true`  | Whether the input is editable                   |
| `errorClassName`     | `string`                                                               | -       | Custom CSS classes for error state              |
| `errorIconName`      | `string`                                                               | -       | Icon name to display with error message         |
| `errorMessage`       | `string`                                                               | -       | Error message to display below input            |
| `errorStringProps`   | `StringProps`                                                          | -       | Props for the error message String component    |
| `hasClearIcon`       | `boolean`                                                              | `true`  | Whether to show clear icon when input has value |
| `hasError`           | `boolean`                                                              | -       | Whether input is in error state                 |
| `hasSecureTextEntry` | `boolean`                                                              | -       | Whether input should hide text (password field) |
| `inputClassName`     | `string`                                                               | -       | Custom CSS classes for the input field          |
| `isDisabled`         | `boolean`                                                              | -       | Whether input is disabled                       |
| `isStretchable`      | `boolean`                                                              | -       | Whether input should stretch to full width      |
| `label`              | `string`                                                               | -       | Label text to display above input               |
| `labelStringProps`   | `StringProps`                                                          | -       | Props for the label String component            |
| `leftIconAction`     | `IconActionProps`                                                      | -       | Configuration for left icon                     |
| `lengthStringProps`  | `StringProps`                                                          | -       | Props for the character count String component  |
| `maxLength`          | `number`                                                               | -       | Maximum number of characters allowed            |
| `multiline`          | `boolean`                                                              | -       | Whether input supports multiple lines           |
| `onChangeText`       | `(text: string) => void`                                               | -       | Callback when input text changes                |
| `onPress`            | `() => void`                                                           | -       | Callback when input is pressed                  |
| `rightIconAction`    | `IconActionProps`                                                      | -       | Configuration for right icon                    |
| `showLength`         | `boolean`                                                              | -       | Whether to show character count                 |
| `size`               | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                 | `'md'`  | Input size variant                              |
| `value`              | `string`                                                               | -       | Current input value                             |
| `wrapperRef`         | `RefObject<View>`                                                      | -       | Ref for the input container wrapper             |

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
