# PhoneNumberInput

A comprehensive phone number input component for React Native with country selection, international formatting, validation, and flag display. Perfect for forms requiring international phone number input with a user-friendly interface.

## Features

- ✅ **Country Selection**: Dropdown with 250+ countries and flags
- ✅ **International Formatting**: Automatic phone number formatting by country
- ✅ **Real-time Validation**: Built-in phone number validation
- ✅ **Flag Display**: Country flags in dropdown and input
- ✅ **Search Functionality**: Search countries by name, code, or dial code
- ✅ **Multi-language Support**: English and French country names
- ✅ **Customizable**: Extensive customization options
- ✅ **Accessibility**: Screen reader support and ARIA attributes
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Performance**: Optimized rendering and search

## Quick Start

```tsx
import PhoneNumberInput from '@/components/phoneNumberInput/PhoneNumberInput';

// Basic usage
<PhoneNumberInput
  onPhoneNumberChange={(data) => console.log(data)}
/>

// With validation
<PhoneNumberInput
  defaultCountry="FR"
  onPhoneNumberChange={(data) => {
    if (data.isValid) {
      console.log('Valid phone:', data.phoneNumberWithSuffix);
    }
  }}
/>
```

## Examples

### Basic Usage

```tsx
import PhoneNumberInput from '@/components/phoneNumberInput/PhoneNumberInput';

// Simple phone number input
<PhoneNumberInput
  onPhoneNumberChange={(data) => {
    console.log('Phone data:', data);
  }}
/>

// With specific default country
<PhoneNumberInput
  defaultCountry="US"
  onPhoneNumberChange={(data) => {
    setPhoneData(data);
  }}
/>
```

### Country Restrictions

```tsx
// Limit to specific countries
<PhoneNumberInput
  allowedCountries={['US', 'CA', 'MX']}
  defaultCountry="US"
  onPhoneNumberChange={handlePhoneChange}
/>

// European countries only
<PhoneNumberInput
  allowedCountries={['FR', 'DE', 'IT', 'ES', 'GB', 'NL']}
  defaultCountry="FR"
  onPhoneNumberChange={handlePhoneChange}
/>
```

### Validation and Error Handling

```tsx
const [hasError, setHasError] = useState(false);

<PhoneNumberInput
  hasErrorOnChange={true}
  errorMessage="Numéro de téléphone invalide"
  onPhoneNumberChange={data => {
    setPhoneData(data);
  }}
  onError={error => {
    setHasError(!error.isValid);
    if (!error.isValid) {
      console.log('Error:', error.errorMessage);
    }
  }}
/>;
```

### Custom Styling

```tsx
<PhoneNumberInput
  inputProps={{
    style: {
      backgroundColor: '#f8f9fa',
      borderWidth: 2,
      borderColor: '#007AFF',
    },
    className: 'rounded-lg shadow-sm',
  }}
  dropdownProps={{
    hasSearch: true,
    maxHeight: 300,
  }}
  onPhoneNumberChange={handlePhoneChange}
/>
```

### Language Support

```tsx
// French language
<PhoneNumberInput
  language="fr"
  placeholder="Entrez votre numéro de téléphone"
  onPhoneNumberChange={handlePhoneChange}
/>

// English language (default)
<PhoneNumberInput
  language="en"
  placeholder="Enter your phone number"
  onPhoneNumberChange={handlePhoneChange}
/>
```

### Advanced Configuration

```tsx
<PhoneNumberInput
  defaultCountry="FR"
  allowedCountries={['FR', 'US', 'GB', 'DE']}
  dropdownPosition="bottom"
  language="fr"
  hasErrorOnChange={true}
  errorMessage="Numéro invalide"
  inputProps={{
    style: { backgroundColor: '#f5f5f5' },
    className: 'border-2 border-blue-500',
  }}
  dropdownProps={{
    hasSearch: true,
    maxHeight: 250,
    minHeight: 100,
  }}
  onCountryChange={country => {
    console.log('Selected country:', country);
  }}
  onPhoneNumberChange={data => {
    console.log('Phone data:', data);
  }}
  onError={error => {
    console.log('Validation error:', error);
  }}
/>
```

## Phone Number Data Structure

The `onPhoneNumberChange` callback receives a comprehensive data object:

```tsx
interface PhoneNumberData {
  countryCode: string; // Country code (e.g., "FR")
  countrySuffix: string; // Dial code (e.g., "+33")
  isValid: boolean; // Whether the number is valid
  phoneNumber: string; // Clean phone number without formatting
  phoneNumberWithSuffix: string; // Full number with country code
  phoneNumberWithSuffixMasked: string; // Formatted number with country code
  phoneWithMask: string; // Formatted number without country code
}
```

### Example Data Output

```tsx
// For French number: 06 12 34 56 78
{
  countryCode: "FR",
  countrySuffix: "+33",
  isValid: true,
  phoneNumber: "0612345678",
  phoneNumberWithSuffix: "+33 6 12 34 56 78",
  phoneNumberWithSuffixMasked: "+33 6 12 34 56 78",
  phoneWithMask: "06 12 34 56 78"
}

// For US number: (555) 123-4567
{
  countryCode: "US",
  countrySuffix: "+1",
  isValid: true,
  phoneNumber: "5551234567",
  phoneNumberWithSuffix: "+1 555 123 4567",
  phoneNumberWithSuffixMasked: "+1 (555) 123-4567",
  phoneWithMask: "(555) 123-4567"
}
```

## Props Reference

### PhoneNumberInputProps

| Prop                  | Type                                                                  | Default                         | Description                              |
| --------------------- | --------------------------------------------------------------------- | ------------------------------- | ---------------------------------------- |
| `allowedCountries`    | `string[]`                                                            | -                               | Array of allowed country codes           |
| `defaultCountry`      | `string`                                                              | `'US'`                          | Default country code to select           |
| `dropdownPosition`    | `'auto' \| 'top' \| 'bottom'`                                         | `'auto'`                        | Position of the country dropdown         |
| `dropdownProps`       | `InputDropdownProps`                                                  | `{ hasSearch: true }`           | Props for the dropdown component         |
| `errorMessage`        | `string`                                                              | `'the phone number is invalid'` | Custom error message                     |
| `hasErrorOnChange`    | `boolean`                                                             | `true`                          | Show error immediately on change         |
| `inputProps`          | `InputProps`                                                          | -                               | Props for the underlying Input component |
| `language`            | `'en' \| 'fr'`                                                        | `'en'`                          | Language for country names               |
| `maxHeight`           | `number`                                                              | `300`                           | Maximum height of the dropdown           |
| `minHeight`           | `number`                                                              | `100`                           | Minimum height of the dropdown           |
| `offsetX`             | `number`                                                              | `0`                             | Horizontal offset for dropdown           |
| `offsetY`             | `number`                                                              | `40`                            | Vertical offset for dropdown             |
| `onBlur`              | `() => void`                                                          | -                               | Callback when input loses focus          |
| `onCountryChange`     | `(country: CountryCodesProps) => void`                                | -                               | Callback when country changes            |
| `onError`             | `(error: { errorMessage: string \| null, isValid: boolean }) => void` | -                               | Callback when validation error occurs    |
| `onFocus`             | `() => void`                                                          | -                               | Callback when input gains focus          |
| `onPhoneNumberChange` | `(data: PhoneNumberData) => void`                                     | -                               | Callback when phone number changes       |
| `placeholder`         | `string`                                                              | `'Enter phone number'`          | Placeholder text                         |
| `value`               | `string`                                                              | -                               | Initial phone number value               |

### CountryCodesProps

```tsx
interface CountryCodesProps {
  code: string; // Country code (e.g., "FR")
  dial_code: string; // Dial code (e.g., "+33")
  en: string; // English country name
  fr: string; // French country name
}
```

## Country Codes

The component supports all major country codes. Here are some examples:

| Country        | Code | Dial Code | English Name   | French Name |
| -------------- | ---- | --------- | -------------- | ----------- |
| United States  | US   | +1        | United States  | États-Unis  |
| France         | FR   | +33       | France         | France      |
| United Kingdom | GB   | +44       | United Kingdom | Royaume-Uni |
| Germany        | DE   | +49       | Germany        | Allemagne   |
| Canada         | CA   | +1        | Canada         | Canada      |
| Australia      | AU   | +61       | Australia      | Australie   |
| Japan          | JP   | +81       | Japan          | Japon       |
| China          | CN   | +86       | China          | Chine       |
| India          | IN   | +91       | India          | Inde        |
| Brazil         | BR   | +55       | Brazil         | Brésil      |

## Best Practices

### 1. Choose Appropriate Default Country

```tsx
// ✅ Good - Set default based on user location
<PhoneNumberInput defaultCountry={userCountry} />

// ✅ Good - Set default based on app region
<PhoneNumberInput defaultCountry="FR" /> // For French app

// ❌ Avoid - Don't assume user's country
<PhoneNumberInput defaultCountry="US" /> // May not be appropriate
```

### 2. Provide Clear Error Messages

```tsx
// ✅ Good - Clear, specific error message
<PhoneNumberInput
  errorMessage="Veuillez entrer un numéro de téléphone valide"
  hasErrorOnChange={true}
/>

// ❌ Avoid - Generic error message
<PhoneNumberInput errorMessage="Error" />
```

### 3. Handle Validation Properly

```tsx
// ✅ Good - Check validity before submission
const handleSubmit = () => {
  if (phoneData.isValid) {
    submitForm(phoneData.phoneNumberWithSuffix);
  } else {
    showError('Please enter a valid phone number');
  }
};

// ❌ Avoid - Submit without validation
const handleSubmit = () => {
  submitForm(phoneData.phoneNumberWithSuffix); // May be invalid
};
```

### 4. Use Appropriate Country Restrictions

```tsx
// ✅ Good - Limit to relevant countries
<PhoneNumberInput
  allowedCountries={['FR', 'BE', 'CH']} // French-speaking countries
  defaultCountry="FR"
/>

// ❌ Avoid - Too many countries for specific use case
<PhoneNumberInput allowedCountries={allCountries} />
```

### 5. Provide Accessibility Labels

```tsx
// ✅ Good - Clear accessibility information
<PhoneNumberInput
  inputProps={{
    accessible: true,
    accessibilityLabel: "Phone number input with country selection",
  }}
/>

// ❌ Avoid - No accessibility information
<PhoneNumberInput />
```

## Advanced Usage

### Form Integration

```tsx
const [formData, setFormData] = useState({
  phone: '',
  isValid: false,
});

const handlePhoneChange = data => {
  setFormData({
    phone: data.phoneNumberWithSuffix,
    isValid: data.isValid,
  });
};

<PhoneNumberInput
  onPhoneNumberChange={handlePhoneChange}
  hasErrorOnChange={true}
  errorMessage="Numéro de téléphone requis"
/>;
```

### API Integration

```tsx
const [isLoading, setIsLoading] = useState(false);

const handlePhoneChange = async data => {
  if (data.isValid) {
    setIsLoading(true);
    try {
      const response = await verifyPhoneNumber(data.phoneNumberWithSuffix);
      console.log('Verification result:', response);
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsLoading(false);
    }
  }
};

<PhoneNumberInput
  onPhoneNumberChange={handlePhoneChange}
  inputProps={{
    disabled: isLoading,
  }}
/>;
```

### Custom Validation

```tsx
const [customError, setCustomError] = useState('');

const handlePhoneChange = data => {
  // Custom validation logic
  if (data.phoneNumber.length < 10) {
    setCustomError('Phone number too short');
  } else if (data.phoneNumber.length > 15) {
    setCustomError('Phone number too long');
  } else {
    setCustomError('');
  }
};

<PhoneNumberInput
  onPhoneNumberChange={handlePhoneChange}
  errorMessage={customError}
  hasErrorOnChange={!!customError}
/>;
```

### Multi-step Form

```tsx
const [step, setStep] = useState(1);
const [phoneData, setPhoneData] = useState(null);

const handlePhoneChange = data => {
  setPhoneData(data);
  if (data.isValid) {
    // Auto-advance to next step when valid
    setTimeout(() => setStep(2), 500);
  }
};

{
  step === 1 && <PhoneNumberInput onPhoneNumberChange={handlePhoneChange} hasErrorOnChange={true} />;
}
```

## Performance Considerations

- Country list is memoized to prevent unnecessary re-renders
- Search is debounced to improve performance
- Flag images are optimized and cached
- Dropdown only renders when visible

## Accessibility

The PhoneNumberInput component includes comprehensive accessibility features:

- **Screen reader support**: Proper labeling and announcements
- **Keyboard navigation**: Full keyboard support for dropdown
- **Focus management**: Proper focus handling
- **ARIA attributes**: Correct semantic markup

### Accessibility Best Practices

```tsx
// Always provide accessibility labels
<PhoneNumberInput
  inputProps={{
    accessible: true,
    accessibilityLabel: "Phone number input with country selection",
    accessibilityHint: "Select your country and enter phone number",
  }}
/>

// Provide context for screen readers
<PhoneNumberInput
  onPhoneNumberChange={(data) => {
    if (data.isValid) {
      // Announce success to screen reader
      AccessibilityInfo.announceForAccessibility('Phone number is valid');
    }
  }}
/>
```

## Troubleshooting

### Common Issues

1. **Phone number not formatting**: Check if country is selected
2. **Validation not working**: Ensure `hasErrorOnChange` is true
3. **Dropdown not showing**: Check `dropdownProps` configuration
4. **Flags not displaying**: Verify flag assets are available

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

<PhoneNumberInput
  onPhoneNumberChange={data => {
    setDebugInfo({
      raw: data,
      timestamp: new Date().toISOString(),
    });
  }}
  onError={error => {
    setDebugInfo(prev => ({
      ...prev,
      error: error,
    }));
  }}
/>;

{
  debugInfo.raw && (
    <Box className="rounded bg-gray-100 p-4">
      <String>Debug Info:</String>
      <String>{JSON.stringify(debugInfo, null, 2)}</String>
    </Box>
  );
}
```

## Migration from Other Libraries

### From react-native-phone-number-input

```tsx
// Old (react-native-phone-number-input)
<PhoneInput
  defaultCode="FR"
  layout="first"
  onChangeFormattedText={(text) => console.log(text)}
/>

// New (PhoneNumberInput)
<PhoneNumberInput
  defaultCountry="FR"
  onPhoneNumberChange={(data) => {
    console.log(data.phoneNumberWithSuffix);
  }}
/>
```

### From react-native-international-phone-number

```tsx
// Old (react-native-international-phone-number)
<InternationalPhoneNumberInput
  defaultCountry="FR"
  onChangePhoneNumber={(data) => console.log(data)}
/>

// New (PhoneNumberInput)
<PhoneNumberInput
  defaultCountry="FR"
  onPhoneNumberChange={(data) => {
    console.log(data);
  }}
/>
```
