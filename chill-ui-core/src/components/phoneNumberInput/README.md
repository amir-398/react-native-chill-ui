# PhoneNumberInput Component

A comprehensive phone number input component for React Native applications that provides country selection with flags, phone number formatting, validation, and international support. Features a searchable country dropdown with automatic phone number formatting and validation across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { PhoneNumberInput } from 'react-native-chill-ui'`

## Features

- **Country Selection**: Searchable dropdown with country flags and dial codes
- **Phone Formatting**: Automatic phone number formatting based on selected country
- **Validation**: Built-in phone number validation with custom error messages
- **International Support**: Supports 200+ countries with localized country names
- **Custom Rendering**: Support for custom dropdown item rendering
- **Search Functionality**: Search countries by name, code, or dial code
- **Positioning**: Smart dropdown positioning (auto, top, bottom)
- **TypeScript Support**: Fully typed for a better development experience
- **Accessible**: Proper focus management and screen reader support
- **Responsive**: Works seamlessly across different screen sizes

## Quick Start

```tsx
import { PhoneNumberInput } from 'react-native-chill-ui';

// Basic usage
<PhoneNumberInput
  onPhoneNumberChange={(data) => {
    console.log('Phone:', data.phoneNumberWithSuffix);
    console.log('Valid:', data.isValid);
  }}
/>

// With specific country and validation
<PhoneNumberInput
  defaultCountry="FR"
  allowedCountries={['FR', 'US', 'GB']}
  onPhoneNumberChange={(data) => {
    if (data.isValid) {
      console.log('Valid phone:', data.phoneNumberWithSuffix);
    }
  }}
  onError={(error) => {
    if (!error.isValid) {
      console.log('Error:', error.errorMessage);
    }
  }}
/>

// With custom dropdown item rendering
<PhoneNumberInput
  customDropdownItem={(country) => (
    <Box className="flex-row items-center gap-2">
      <Image source={getFlag(country.code)} className="h-4 w-6" />
      <String>{country.en}</String>
      <String className="text-gray-500">{country.dial_code}</String>
    </Box>
  )}
  onPhoneNumberChange={(data) => console.log(data)}
/>
```

## Props

| Prop                  | Type                                                           | Required | Default                     | Description                                     |
| --------------------- | -------------------------------------------------------------- | -------- | --------------------------- | ----------------------------------------------- |
| `allowedCountries`    | `CountryCode[]`                                                | ❌       | -                           | Array of allowed country codes                  |
| `customDropdownItem`  | `(country: PhoneNumberInputCountryCodesProps) => ReactElement` | ❌       | -                           | Custom render function for dropdown items       |
| `defaultCountry`      | `CountryCode`                                                  | ❌       | `'US'`                      | Default country code to select initially        |
| `defaultOpen`         | `boolean`                                                      | ❌       | `false`                     | Default open state (uncontrolled)               |
| `dropdownPosition`    | `'auto' \| 'top' \| 'bottom'`                                  | ❌       | `'auto'`                    | Position of dropdown relative to input          |
| `dropdownProps`       | `Partial<InputDropdownProps>`                                  | ❌       | `{ hasSearch: true }`       | Additional props for dropdown component         |
| `errorMessage`        | `string`                                                       | ❌       | -                           | Custom error message for invalid phone numbers  |
| `hasErrorOnChange`    | `boolean`                                                      | ❌       | `true`                      | Whether to show error immediately on change     |
| `inputProps`          | `InputProps`                                                   | ❌       | -                           | Props to pass to the underlying Input component |
| `language`            | `'en' \| 'fr'`                                                 | ❌       | `'en'`                      | Language for country names                      |
| `maxHeight`           | `number`                                                       | ❌       | `340`                       | Maximum height of dropdown                      |
| `minHeight`           | `number`                                                       | ❌       | `0`                         | Minimum height of dropdown                      |
| `offsetX`             | `number`                                                       | ❌       | `0`                         | Horizontal offset for dropdown positioning      |
| `offsetY`             | `number`                                                       | ❌       | `5`                         | Vertical offset for dropdown positioning        |
| `onBlur`              | `() => void`                                                   | ❌       | -                           | Callback when input loses focus                 |
| `onCountryChange`     | `(country: PhoneNumberInputCountryCodesProps) => void`         | ❌       | -                           | Callback when country selection changes         |
| `onError`             | `(error: PhoneNumberInputOnError) => void`                     | ❌       | -                           | Callback when validation error occurs           |
| `onFocus`             | `() => void`                                                   | ❌       | -                           | Callback when input gains focus                 |
| `onOpenChange`        | `(open: boolean) => void`                                      | ❌       | -                           | Callback when dropdown open state changes       |
| `onPhoneNumberChange` | `(data: PhoneNumberInputOnPhoneNumberChange) => void`          | ❌       | -                           | Callback when phone number changes              |
| `open`                | `boolean`                                                      | ❌       | -                           | Whether the dropdown is open (controlled)       |
| `placeholder`         | `string`                                                       | ❌       | `'Enter your phone number'` | Placeholder text for the input                  |
| `searchInputProps`    | `InputProps`                                                   | ❌       | -                           | Props for the search input in dropdown          |
| `value`               | `string`                                                       | ❌       | -                           | Initial phone number value                      |

### PhoneNumberInputOnPhoneNumberChange Type

```typescript
{
  countryCode: CountryCode; // Selected country code (e.g., 'US', 'FR')
  countrySuffix: string; // Country dial code (e.g., '+1', '+33')
  isValid: boolean; // Whether the phone number is valid
  phoneNumber: string; // Phone number without country code
  phoneNumberWithSuffix: string; // Phone number with country code
  phoneNumberWithSuffixMasked: string; // Formatted phone number with country code
  phoneWithMask: string; // Formatted phone number without country code
}
```

### PhoneNumberInputOnError Type

```typescript
{
  errorMessage: string | null; // Error message or null if valid
  isValid: boolean; // Whether the input is valid
}
```

### PhoneNumberInputCountryCodesProps Type

```typescript
{
  id: string; // Country ID (same as code)
  code: CountryCode; // Country code (e.g., 'US', 'FR')
  dial_code: string; // Dial code (e.g., '+1', '+33')
  fr: string; // French country name
  en: string; // English country name
}
```

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
// Simple phone number input
<PhoneNumberInput
  onPhoneNumberChange={data => {
    console.log('Phone:', data.phoneNumberWithSuffix);
    console.log('Valid:', data.isValid);
  }}
/>
```

### With Country Restrictions

```tsx
// Limit to specific countries
<PhoneNumberInput
  allowedCountries={['US', 'CA', 'GB', 'AU']}
  defaultCountry="US"
  onPhoneNumberChange={data => setPhoneNumber(data)}
/>
```

### With Validation

```tsx
// Custom validation and error handling
<PhoneNumberInput
  onPhoneNumberChange={data => {
    if (data.isValid) {
      setPhoneNumber(data.phoneNumberWithSuffix);
    }
  }}
  onError={error => {
    if (!error.isValid) {
      setErrorMessage(error.errorMessage);
    }
  }}
  errorMessage="Please enter a valid phone number"
  hasErrorOnChange={true}
/>
```

### With Custom Styling

```tsx
// Custom input styling
<PhoneNumberInput
  onPhoneNumberChange={data => console.log(data)}
  inputProps={{
    placeholder: 'Enter your mobile number',
    size: 'lg',
    hasError: false,
  }}
  dropdownProps={{
    maxHeight: 300,
    backgroundColor: '#F8F9FA',
  }}
/>
```

### With Custom Dropdown Item

```tsx
// Custom country item rendering
<PhoneNumberInput
  customDropdownItem={country => (
    <Box className="flex-row items-center gap-3 p-2">
      <Image source={getFlag(country.code)} className="h-6 w-8 rounded border border-gray-200" />
      <Box className="flex-1">
        <String className="font-medium">{country.en}</String>
        <String className="text-sm text-gray-500">{country.fr}</String>
      </Box>
      <String className="font-mono text-blue-600">{country.dial_code}</String>
    </Box>
  )}
  onPhoneNumberChange={data => console.log(data)}
/>
```

### With Language Support

```tsx
// French language support
<PhoneNumberInput
  language="fr"
  onPhoneNumberChange={data => console.log(data)}
  searchInputProps={{
    placeholder: 'Rechercher un pays...',
  }}
/>
```

### Controlled Mode

```tsx
// Controlled dropdown with external state
const [isOpen, setIsOpen] = useState(false);
const [phoneNumber, setPhoneNumber] = useState('');

<PhoneNumberInput
  value={phoneNumber}
  open={isOpen}
  onOpenChange={setIsOpen}
  onPhoneNumberChange={data => {
    setPhoneNumber(data.phoneWithMask);
    if (data.isValid) {
      setIsOpen(false); // Close after valid input
    }
  }}
/>;
```

### With Form Integration

```tsx
// Integration with form libraries
const { control, handleSubmit } = useForm();

<Controller
  control={control}
  name="phoneNumber"
  render={({ field, fieldState }) => (
    <PhoneNumberInput
      value={field.value}
      onPhoneNumberChange={data => {
        field.onChange(data.phoneNumberWithSuffix);
      }}
      hasError={!!fieldState.error}
      errorMessage={fieldState.error?.message}
    />
  )}
/>;
```

## Country Codes

The component supports 200+ countries with the following country codes:

```typescript
type CountryCode =
  | 'AF'
  | 'AX'
  | 'AL'
  | 'DZ'
  | 'AS'
  | 'AD'
  | 'AO'
  | 'AI'
  | 'AQ'
  | 'AG'
  | 'AR'
  | 'AM'
  | 'AW'
  | 'AU'
  | 'AT'
  | 'AZ'
  | 'BS'
  | 'BH'
  | 'BD'
  | 'BB'
  | 'BY'
  | 'BE'
  | 'BZ'
  | 'BJ'
  | 'BM'
  | 'BT'
  | 'BO'
  | 'BA'
  | 'BW'
  | 'BR'
  | 'IO'
  | 'BN'
  | 'BG'
  | 'BF'
  | 'BI'
  | 'KH'
  | 'CM'
  | 'CA'
  | 'CV'
  | 'KY'
  | 'CF'
  | 'TD'
  | 'CL'
  | 'CN'
  | 'CX'
  | 'CC'
  | 'CO'
  | 'KM'
  | 'CG'
  | 'CD'
  | 'CK'
  | 'CR'
  | 'CI'
  | 'HR'
  | 'CU'
  | 'CY'
  | 'CZ'
  | 'DK'
  | 'DJ'
  | 'DM'
  | 'DO'
  | 'EC'
  | 'EG'
  | 'SV'
  | 'GQ'
  | 'ER'
  | 'EE'
  | 'ET'
  | 'FK'
  | 'FO'
  | 'FJ'
  | 'FI'
  | 'FR'
  | 'GF'
  | 'PF'
  | 'GA'
  | 'GM'
  | 'GE'
  | 'DE'
  | 'GH'
  | 'GI'
  | 'GR'
  | 'GL'
  | 'GD'
  | 'GP'
  | 'GU'
  | 'GT'
  | 'GG'
  | 'GN'
  | 'GW'
  | 'GY'
  | 'HT'
  | 'VA'
  | 'HN'
  | 'HK'
  | 'HU'
  | 'IS'
  | 'IN'
  | 'ID'
  | 'IR'
  | 'IQ'
  | 'IE'
  | 'IM'
  | 'IL'
  | 'IT'
  | 'JM'
  | 'JP'
  | 'JE'
  | 'JO'
  | 'KZ'
  | 'KE'
  | 'KI'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KG'
  | 'LA'
  | 'LV'
  | 'LB'
  | 'LS'
  | 'LR'
  | 'LY'
  | 'LI'
  | 'LT'
  | 'LU'
  | 'MO'
  | 'MK'
  | 'MG'
  | 'MW'
  | 'MY'
  | 'MV'
  | 'ML'
  | 'MT'
  | 'MH'
  | 'MQ'
  | 'MR'
  | 'MU'
  | 'YT'
  | 'MX'
  | 'FM'
  | 'MD'
  | 'MC'
  | 'MN'
  | 'ME'
  | 'MS'
  | 'MA'
  | 'MZ'
  | 'MM'
  | 'NA'
  | 'NR'
  | 'NP'
  | 'NL'
  | 'NC'
  | 'NZ'
  | 'NI'
  | 'NE'
  | 'NG'
  | 'NU'
  | 'NF'
  | 'MP'
  | 'NO'
  | 'OM'
  | 'PK'
  | 'PW'
  | 'PS'
  | 'PA'
  | 'PG'
  | 'PY'
  | 'PE'
  | 'PH'
  | 'PN'
  | 'PL'
  | 'PT'
  | 'PR'
  | 'QA'
  | 'RO'
  | 'RU'
  | 'RW'
  | 'RE'
  | 'BL'
  | 'SH'
  | 'KN'
  | 'LC'
  | 'MF'
  | 'PM'
  | 'VC'
  | 'WS'
  | 'SM'
  | 'ST'
  | 'SA'
  | 'SN'
  | 'RS'
  | 'SC'
  | 'SL'
  | 'SG'
  | 'SK'
  | 'SI'
  | 'SB'
  | 'SO'
  | 'ZA'
  | 'SS'
  | 'ES'
  | 'LK'
  | 'SD'
  | 'SR'
  | 'SJ'
  | 'SZ'
  | 'SE'
  | 'CH'
  | 'SY'
  | 'TW'
  | 'TJ'
  | 'TZ'
  | 'TH'
  | 'TL'
  | 'TG'
  | 'TK'
  | 'TO'
  | 'TT'
  | 'TN'
  | 'TR'
  | 'TM'
  | 'TC'
  | 'TV'
  | 'UG'
  | 'UA'
  | 'AE'
  | 'GB'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VU'
  | 'VE'
  | 'VN'
  | 'VG'
  | 'VI'
  | 'WF'
  | 'YE'
  | 'ZM'
  | 'ZW';
```

## Phone Number Validation

The component includes built-in phone number validation that:

- Validates phone numbers based on the selected country's format
- Supports international phone number formats
- Provides real-time validation feedback
- Allows custom error messages
- Works with various phone number patterns

### Validation Rules

- **US/Canada**: Validates North American Numbering Plan (NANP) format
- **International**: Validates based on country-specific patterns
- **Length**: Ensures phone numbers meet minimum/maximum length requirements
- **Format**: Validates proper formatting and structure

## Best Practices

1. **Always handle validation** - Use `onPhoneNumberChange` to check `isValid` property
2. **Provide meaningful placeholders** - Use descriptive placeholder text for better UX
3. **Handle errors gracefully** - Use `onError` callback for error handling
4. **Consider country restrictions** - Use `allowedCountries` to limit available countries
5. **Use appropriate language** - Set `language` prop based on your app's locale
6. **Customize styling** - Use `inputProps` and `dropdownProps` for consistent theming
7. **Test on different devices** - Ensure dropdown positioning works on all screen sizes
8. **Consider accessibility** - Ensure proper focus management and screen reader support

## Performance Considerations

- The component uses memoization for computed values to prevent unnecessary re-renders
- Country filtering is optimized with efficient search algorithms
- Flag images are loaded on-demand to reduce initial bundle size
- Custom rendering functions should be memoized with `useCallback`

## TypeScript

The component is fully typed with TypeScript. Import types as needed:

```tsx
import { PhoneNumberInput } from 'react-native-chill-ui';
import type {
  PhoneNumberInputProps,
  PhoneNumberInputPropsTw,
  PhoneNumberInputPropsSs,
  CountryCode,
  PhoneNumberInputOnPhoneNumberChange,
  PhoneNumberInputOnError,
} from 'react-native-chill-ui';

// For Tailwind/Hybrid versions
const MyPhoneInput: React.FC = () => <PhoneNumberInput onPhoneNumberChange={data => console.log(data)} />;
```

## Related Components

- **Input**: For basic text input with validation
- **InputSelectDropdown**: For general dropdown selection
- **MaskedInput**: For other types of formatted input
- **AutocompleteDropdown**: For autocomplete input with suggestions

## File Structure

```
phoneNumberInput/
├── components/
│   ├── PhoneNumberInput.tsx       # Hybrid version (auto-detects NativeWind)
│   ├── PhoneNumberInput.ss.tsx    # StyleSheet version
│   └── PhoneNumberInput.tw.tsx    # Tailwind/NativeWind version
├── styles/
│   ├── PhoneNumberInput.ss.styles.ts  # StyleSheet styles
│   └── PhoneNumberInput.tw.styles.ts  # Tailwind variants
├── utils/
│   ├── countryCodes.ts            # Country codes and data
│   ├── defaultProps.ts            # Default prop values
│   └── phone.ts                   # Phone number utilities
├── flags/                         # Country flag images
│   ├── us.png
│   ├── fr.png
│   └── ...
├── types/
│   ├── phoneNumberInput.types.ts      # Base types
│   ├── phoneNumberInput.ss.types.ts   # StyleSheet types
│   └── phoneNumberInput.tw.types.ts   # Tailwind types
└── README.md                      # This file
```

## Inspiration

This component is inspired by popular phone number input libraries like [react-phone-number-input](https://github.com/catamphetamine/react-phone-number-input) and [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js) with adaptations for React Native and mobile interfaces.
