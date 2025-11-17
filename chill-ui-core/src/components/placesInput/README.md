# PlacesInput Component

A comprehensive and performant address autocomplete component for React Native that provides Google Places API integration with real-time search, debounced API calls, customizable rendering, and comprehensive place data across three different styling approaches.

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

**Note**: Regardless of the version you choose, the import statement remains the same: `import { PlacesInput } from 'react-native-chill-ui'`

## Features

- **Google Places Integration**: Real-time search with Google Places API
- **Debounced Search**: Optimized API calls with configurable debounce delay
- **Country Restrictions**: Limit search to specific countries
- **Customizable Rendering**: Support for custom dropdown item rendering
- **Comprehensive Data**: Access to coordinates, address components, and formatted addresses
- **Error Handling**: Built-in error handling with customizable error callbacks
- **Controlled/Uncontrolled**: Support for both controlled and uncontrolled usage
- **TypeScript Support**: Fully typed for a better development experience
- **Accessible**: Proper focus management and screen reader support
- **Responsive**: Works seamlessly across different screen sizes
- **Performance Optimized**: Efficient API calls with debouncing and caching

## Quick Start

```tsx
import { PlacesInput } from 'react-native-chill-ui';

// Basic usage
<PlacesInput
  googleApiKey="your-google-api-key"
  onSelect={place => {
    console.log('Address:', place.formattedAddress);
    console.log('Coordinates:', place.location);
  }}
/>

// With country restrictions and error handling
<PlacesInput
  googleApiKey="your-google-api-key"
  queryCountries={['US', 'CA', 'GB']}
  onSelect={place => setAddress(place)}
  onError={error => {
    if (error.message.includes('HTTP 403')) {
      console.log('Error:', 'Invalid API key');
    }
  }}
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
<PlacesInput
  style={{ backgroundColor: '#fff', borderColor: '#ccc' }}
  googleApiKey="your-google-api-key"
  onSelect={place => console.log(place)}
/>
```

## Google Places API Setup

### 1. Get Google API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Places API
4. Create credentials (API Key)
5. Restrict the API key to your app for security

### 2. Required APIs

Make sure to enable these APIs in your Google Cloud project:

- **Places API (New)**: For autocomplete and place details
- **Geocoding API**: For address validation (optional)

### 3. API Key Restrictions

For production, restrict your API key:

- **Application restrictions**: Set to your app's bundle ID
- **API restrictions**: Limit to Places API and Geocoding API

## Props

### PlacesInputProps

| Prop                             | Type                                                  | Required | Default                | Description                                          |
| -------------------------------- | ----------------------------------------------------- | -------- | ---------------------- | ---------------------------------------------------- |
| `googleApiKey`                   | `string`                                              | ✅       | -                      | Google Places API key                                |
| `onSelect`                       | `(place: Place \| Places['placePrediction']) => void` | ❌       | -                      | Callback when a place is selected                    |
| `onError`                        | `(error: Error) => void`                              | ❌       | -                      | Callback when an error occurs                        |
| `query`                          | `string`                                              | ❌       | `''`                   | External query value to control the input            |
| `queryCountries`                 | `string[]`                                            | ❌       | -                      | Array of country codes to restrict search            |
| `clearQueryOnSelect`             | `boolean`                                             | ❌       | `false`                | Whether to clear the input after selection           |
| `requiredCharactersBeforeSearch` | `number`                                              | ❌       | `2`                    | Minimum characters before triggering search          |
| `requiredTimeBeforeSearch`       | `number`                                              | ❌       | `1000`                 | Debounce delay in milliseconds                       |
| `selectedValue`                  | `PlaceInputSelectedValue`                             | ❌       | -                      | Type of address component to display after selection |
| `open`                           | `boolean`                                             | ❌       | -                      | Controlled open state                                |
| `onOpenChange`                   | `(open: boolean) => void`                             | ❌       | -                      | Callback when open state changes                     |
| `defaultOpen`                    | `boolean`                                             | ❌       | `false`                | Default open state (uncontrolled)                    |
| `placeholder`                    | `string`                                              | ❌       | `'Enter your address'` | Placeholder text for the input                       |
| `className`                      | `string`                                              | ❌       | -                      | Custom CSS classes (Tailwind/Hybrid only)            |
| `style`                          | `StyleProp<ViewStyle>`                                | ❌       | -                      | Custom style object                                  |
| `inputProps`                     | `InputProps`                                          | ❌       | -                      | Props to pass to the underlying Input component      |
| `dropdownProps`                  | `Partial<InputDropdownProps>`                         | ❌       | -                      | Additional props for dropdown component              |
| `...rest`                        | `AutocompleteDropdownProps`                           | ❌       | -                      | All other props from AutocompleteDropdown            |

### PlaceInputSelectedValue

The `selectedValue` prop accepts one of the following values:

| Value             | Description             | Example Output                    |
| ----------------- | ----------------------- | --------------------------------- |
| `'longAddress'`   | Full formatted address  | "123 Main St, New York, NY 10001" |
| `'shortAddress'`  | Short formatted address | "123 Main St, New York"           |
| `'postal_code'`   | Postal code only        | "10001"                           |
| `'locality'`      | City/locality only      | "New York"                        |
| `'country'`       | Country only            | "United States"                   |
| `'street_number'` | Street number only      | "123"                             |
| `'route'`         | Street name only        | "Main St"                         |

## Types

### Place

```typescript
interface Place {
  formattedAddress: string;
  shortFormattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  postalAddress?: {
    [key: string]: any;
  };
  addressComponents: {
    languageCode: string;
    longText: string;
    shortText: string;
    types: addressComponentsTypes[];
  }[];
}
```

### Places

```typescript
interface Places {
  placePrediction: {
    placeId: string;
    place?: Place;
    text: {
      text: string;
    };
  };
}
```

### PlacesResponse

```typescript
interface PlacesResponse {
  suggestions?: Places[];
  error?: {
    message: string;
    code?: number;
  };
}
```

## Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { PlacesInput } from 'react-native-chill-ui';

const BasicPlacesInput = () => {
  const [address, setAddress] = useState('');

  return (
    <PlacesInput
      googleApiKey="your-google-api-key"
      placeholder="Enter your address"
      onSelect={place => {
        setAddress(place.formattedAddress);
        console.log('Coordinates:', place.location);
      }}
    />
  );
};
```

### With Country Restrictions

```tsx
const CountryRestrictedInput = () => {
  return (
    <PlacesInput
      googleApiKey="your-google-api-key"
      queryCountries={['US', 'CA', 'GB', 'AU']}
      onSelect={place => console.log(place)}
      placeholder="Search in US, Canada, UK, or Australia"
    />
  );
};
```

### With Validation and Error Handling

```tsx
const ValidatedPlacesInput = () => {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <PlacesInput
      googleApiKey="your-google-api-key"
      onSelect={place => {
        if (place.formattedAddress) {
          setAddress(place.formattedAddress);
          setErrorMessage('');
        }
      }}
      onError={error => {
        if (error.message.includes('HTTP 403')) {
          setErrorMessage('Invalid API key');
        } else if (error.message.includes('HTTP 429')) {
          setErrorMessage('Rate limit exceeded');
        } else {
          setErrorMessage('Search failed: ' + error.message);
        }
      }}
      requiredCharactersBeforeSearch={3}
      requiredTimeBeforeSearch={500}
    />
  );
};
```

### With Custom Selection Value

```tsx
const CityOnlyInput = () => {
  return (
    <PlacesInput
      googleApiKey="your-google-api-key"
      selectedValue="locality"
      onSelect={place => console.log('City:', place)}
      placeholder="Enter city name"
    />
  );
};
```

### With Custom Styling

```tsx
// Tailwind/Hybrid version
<PlacesInput
  googleApiKey="your-google-api-key"
  className="mx-4 my-2 bg-white rounded-lg border"
  inputProps={{
    placeholder: 'Enter your address',
    size: 'lg',
  }}
  dropdownProps={{
    maxHeight: 300,
    className: 'bg-gray-50 rounded-lg shadow-lg',
  }}
  onSelect={place => console.log(place)}
/>

// StyleSheet version
<PlacesInput
  googleApiKey="your-google-api-key"
  style={{
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  }}
  inputProps={{
    placeholder: 'Enter your address',
    size: 'lg',
  }}
  dropdownProps={{
    maxHeight: 300,
    backgroundColor: '#F8F9FA',
  }}
  onSelect={place => console.log(place)}
/>
```

### Controlled Mode

```tsx
const ControlledPlacesInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState('');

  return (
    <PlacesInput
      googleApiKey="your-google-api-key"
      query={address}
      open={isOpen}
      onOpenChange={setIsOpen}
      onSelect={place => {
        setAddress(place.formattedAddress);
        setIsOpen(false); // Close after selection
      }}
    />
  );
};
```

### With Form Integration

```tsx
import { useForm, Controller } from 'react-hook-form';

const FormPlacesInput = () => {
  const { control, handleSubmit } = useForm();

  return (
    <Controller
      control={control}
      name="address"
      render={({ field, fieldState }) => (
        <PlacesInput
          googleApiKey="your-google-api-key"
          query={field.value}
          onSelect={place => {
            field.onChange(place.formattedAddress);
          }}
          onError={error => {
            console.error('Address search failed:', error);
          }}
          hasError={!!fieldState.error}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
};
```

### With Custom Dropdown Item

```tsx
const CustomRenderedInput = () => {
  return (
    <PlacesInput
      googleApiKey="your-google-api-key"
      customDropdownItem={place => (
        <Box className="flex-row items-center gap-3 p-2">
          <Icon name="location" size="md" color="#3B82F6" />
          <Box className="flex-1">
            <String className="font-medium">{place.placePrediction.text.text}</String>
            <String className="text-sm text-gray-500">Tap to get details</String>
          </Box>
        </Box>
      )}
      onSelect={place => console.log(place)}
    />
  );
};
```

## Error Handling

The component provides comprehensive error handling for various scenarios:

### API Errors

```tsx
<PlacesInput
  googleApiKey="your-google-api-key"
  onError={error => {
    if (error.message.includes('HTTP 403')) {
      console.error('Invalid API key');
    } else if (error.message.includes('HTTP 429')) {
      console.error('Rate limit exceeded');
    } else if (error.message.includes('HTTP 400')) {
      console.error('Invalid request');
    } else {
      console.error('Search failed:', error.message);
    }
  }}
/>
```

### Network Errors

```tsx
<PlacesInput
  googleApiKey="your-google-api-key"
  onError={error => {
    if (error.message.includes('Failed to fetch')) {
      console.error('Network error - check your connection');
    } else if (error.message.includes('timeout')) {
      console.error('Request timeout - try again');
    }
  }}
/>
```

## Best Practices

### Performance

1. **Use debouncing** - The component includes built-in debouncing, but you can adjust the delay:

```tsx
<PlacesInput
  googleApiKey="your-google-api-key"
  requiredTimeBeforeSearch={500} // 500ms delay
  requiredCharactersBeforeSearch={3} // Wait for 3 characters
  onSelect={place => console.log(place)}
/>
```

2. **Implement caching** for frequently searched places:

```tsx
const [placesCache, setPlacesCache] = useState(new Map());

const handleSelect = useCallback(place => {
  // Cache the place for future use
  setPlacesCache(prev => new Map(prev).set(place.placeId, place));
  console.log(place);
}, []);
```

3. **Optimize API calls** by using country restrictions:

```tsx
<PlacesInput
  googleApiKey="your-google-api-key"
  queryCountries={['US', 'CA']} // Limit to specific countries
  onSelect={place => console.log(place)}
/>
```

### Accessibility

1. **Add accessibility labels**:

```tsx
<PlacesInput
  googleApiKey="your-google-api-key"
  placeholder="Enter your address"
  accessibilityLabel="Address input"
  accessibilityHint="Type to search for addresses"
  onSelect={place => console.log(place)}
/>
```

2. **Use semantic placeholders**:

```tsx
<PlacesInput
  googleApiKey="your-google-api-key"
  placeholder="Enter your home address"
  onSelect={place => console.log(place)}
/>
```

### Styling

1. **Use consistent spacing**:

```tsx
// Tailwind/Hybrid version
<PlacesInput className="mx-4 my-2 bg-white rounded-lg border" />

// StyleSheet version
<PlacesInput style={{ margin: 16, backgroundColor: 'white', borderRadius: 8 }} />
```

2. **Handle different screen sizes**:

```tsx
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const inputWidth = screenWidth * 0.9;

<PlacesInput googleApiKey="your-google-api-key" style={{ width: inputWidth }} onSelect={place => console.log(place)} />;
```

## Troubleshooting

### Common Issues

1. **API key not working**
   - Ensure the API key is valid and has Places API enabled
   - Check if the API key has proper restrictions set
   - Verify the API key is not expired

2. **No results showing**
   - Check if `queryCountries` is restricting results too much
   - Verify the search query has enough characters
   - Ensure the API key has proper permissions

3. **Performance issues**
   - Increase `requiredTimeBeforeSearch` to reduce API calls
   - Increase `requiredCharactersBeforeSearch` to wait for more input
   - Implement proper error handling

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

## Performance Considerations

- **Debouncing**: Built-in debouncing prevents excessive API calls
- **Caching**: Consider implementing place caching for better performance
- **Rate Limiting**: Be mindful of Google Places API rate limits
- **Error Handling**: Always implement proper error handling
- **Memory Management**: The component cleans up debounced functions on unmount

## TypeScript

The component is fully typed with TypeScript. Import types as needed:

```tsx
import { PlacesInput } from 'react-native-chill-ui';
import type { PlacesInputProps, Place, Places, PlacesResponse } from 'react-native-chill-ui';

// For Tailwind/Hybrid versions
const MyPlacesInput: React.FC = () => (
  <PlacesInput googleApiKey="your-google-api-key" onSelect={place => console.log(place)} />
);
```

## Related Components

- **AutocompleteDropdown**: The underlying dropdown component
- **Input**: The input component used internally
- **HighlightString**: Used for highlighting search terms
- **PhoneNumberInput**: For phone number input with country selection
- **MaskedInput**: For other types of formatted input

## File Structure

```
placesInput/
├── components/
│   ├── PlacesInput.tsx       # Hybrid version (auto-detects NativeWind)
│   ├── PlacesInput.ss.tsx    # StyleSheet version
│   └── PlacesInput.tw.tsx    # Tailwind/NativeWind version
├── types/
│   ├── placesInput.types.ts      # Base types
│   ├── placesInput.ss.types.ts   # StyleSheet types
│   └── placesInput.tw.types.ts   # Tailwind types
├── index.ts                     # Exports
└── README.md                    # This file
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

This component is part of the react-native-chill-ui library. See [LICENSE](../../LICENSE.md) for details.
