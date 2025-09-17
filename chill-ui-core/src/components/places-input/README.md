# PlacesInput

A powerful React Native component that integrates with Google Places API to provide address autocomplete functionality. Features real-time search, debounced API calls, customizable rendering, and comprehensive place data extraction.

## Features

- ✅ **Google Places Integration**: Full integration with Google Places API v1
- ✅ **Real-time Search**: Instant search suggestions as you type
- ✅ **Debounced API Calls**: Optimized performance with configurable delays
- ✅ **Country Restrictions**: Limit search to specific countries
- ✅ **Custom Rendering**: Fully customizable list item rendering
- ✅ **Address Components**: Extract specific address parts (city, postal code, etc.)
- ✅ **Loading States**: Built-in loading indicators with customizable styling
- ✅ **Keyboard Handling**: Proper keyboard interaction and dismissal
- ✅ **Accessibility**: Screen reader support and ARIA attributes
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Performance**: Optimized rendering and API calls with timeout cleanup
- ✅ **Error Handling**: Graceful error handling with fallback to prediction data

## Quick Start

```tsx
import PlacesInput from '@/components/places-input/PlacesInput';

// Basic usage
<PlacesInput
  googleApiKey="your-google-api-key"
  onSelect={(place) => console.log(place)}
/>

// With validation and styling
<PlacesInput
  googleApiKey="your-google-api-key"
  placeholder="Enter your address"
  requiredCharactersBeforeSearch={3}
  onSelect={(place) => {
    console.log('Selected place:', place.formattedAddress);
  }}
/>
```

## Examples

### Basic Usage

```tsx
import PlacesInput from '@/components/places-input/PlacesInput';

// Simple address input
<PlacesInput
  googleApiKey="your-google-api-key"
  onSelect={(place) => {
    console.log('Selected place:', place);
  }}
/>

// With custom placeholder
<PlacesInput
  googleApiKey="your-google-api-key"
  placeholder="Search for a location..."
  onSelect={(place) => {
    setAddress(place.formattedAddress);
  }}
/>
```

### Search Configuration

```tsx
// Configure search behavior
<PlacesInput
  googleApiKey="your-google-api-key"
  requiredCharactersBeforeSearch={3}
  requiredTimeBeforeSearch={500}
  onSelect={(place) => {
    console.log('Place selected after 3 chars and 500ms delay');
  }}
/>

// With country restrictions
<PlacesInput
  googleApiKey="your-google-api-key"
  queryCountries={['US', 'CA', 'MX']}
  onSelect={(place) => {
    console.log('North American place selected');
  }}
/>
```

### Custom Styling

```tsx
<PlacesInput
  googleApiKey="your-google-api-key"
  containerClassName="rounded-lg border-2 border-blue-500 bg-gray-100"
  listClassName="shadow-lg border-2 border-blue-200"
  itemTextClassName="text-gray-800"
  itemTextVariant="body-1"
  spinnerColor="#007AFF"
  spinnerSize={32}
  onSelect={place => {
    setAddress(place.formattedAddress);
  }}
/>
```

### Address Component Extraction

```tsx
// Extract specific address components
<PlacesInput
  googleApiKey="your-google-api-key"
  selectedValue="locality"
  onSelect={(place) => {
    const city = place.addressComponents.find(c => c.types.includes('locality'))?.longText;
    setCity(city);
  }}
/>

// Extract postal code
<PlacesInput
  googleApiKey="your-google-api-key"
  selectedValue="postal_code"
  onSelect={(place) => {
    const postalCode = place.addressComponents.find(c => c.types.includes('postal_code'))?.longText;
    setPostalCode(postalCode);
  }}
/>

// Extract country
<PlacesInput
  googleApiKey="your-google-api-key"
  selectedValue="country"
  onSelect={(place) => {
    const country = place.addressComponents.find(c => c.types.includes('country'))?.longText;
    setCountry(country);
  }}
/>

// Extract street number and route
<PlacesInput
  googleApiKey="your-google-api-key"
  selectedValue="street_number"
  onSelect={(place) => {
    const streetNumber = place.addressComponents.find(c => c.types.includes('street_number'))?.longText;
    const route = place.addressComponents.find(c => c.types.includes('route'))?.longText;
    setStreetAddress(`${streetNumber} ${route}`);
  }}
/>
```

### Custom Rendering

```tsx
<PlacesInput
  googleApiKey="your-google-api-key"
  renderItem={({ item, index }) => (
    <Box className="border-b border-gray-200 p-4">
      <String className="text-lg font-bold">{item.placePrediction.text.text}</String>
      {item.placePrediction.place?.formattedAddress && (
        <String className="mt-1 text-sm text-gray-500">{item.placePrediction.place.formattedAddress}</String>
      )}
      <String className="mt-1 text-xs text-blue-500">Tap to select this location</String>
    </Box>
  )}
  onSelect={place => {
    console.log('Custom rendered place selected:', place);
  }}
/>
```

### Advanced Configuration

```tsx
<PlacesInput
  googleApiKey="your-google-api-key"
  clearable={true}
  clearQueryOnSelect={false}
  maxListHeight={400}
  listHeaderComponent={
    <Box className="border-b border-gray-200 bg-gray-50 p-3">
      <String className="font-semibold">Recent searches</String>
    </Box>
  }
  listFooterComponent={
    <Box className="border-t border-gray-200 bg-gray-50 p-3">
      <String className="text-center text-gray-500">Powered by Google Places</String>
    </Box>
  }
  showListFooterComponentWhenResults={true}
  showListHeaderComponentWhenResults={true}
  onSelect={place => {
    setAddress(place.formattedAddress);
    setCoordinates(place.location);
  }}
/>
```

### Error Handling and Fallback

```tsx
<PlacesInput
  googleApiKey="your-google-api-key"
  onSelect={place => {
    // The component automatically handles API errors and falls back to prediction data
    if (place.formattedAddress) {
      // Full place data available
      setAddress(place.formattedAddress);
      setCoordinates(place.location);
    } else {
      // Fallback to prediction data
      setAddress(place.text.text);
    }
  }}
/>
```

## Place Data Structure

The `onSelect` callback receives comprehensive place data. The callback can receive either a `Place` object (when API call succeeds) or a `Places['placePrediction']` object (when API call fails and falls back to prediction data):

```tsx
interface Place {
  /** Full formatted address (e.g., "123 Main St, New York, NY 10001, USA") */
  formattedAddress: string;
  /** Short formatted address (e.g., "123 Main St, New York") */
  shortFormattedAddress: string;
  /** Location coordinates for mapping */
  location: {
    latitude: number;
    longitude: number;
  };
  /** Postal address details (optional, may contain additional postal information) */
  postalAddress?: {
    [key: string]: any;
  };
  /** Address components with detailed information for each part of the address */
  addressComponents: Array<{
    /** Language code for the component text */
    languageCode: string;
    /** Long text description (e.g., "New York" for locality) */
    longText: string;
    /** Short text description (e.g., "NY" for administrative_area_level_1) */
    shortText: string;
    /** Types of address component (e.g., ['locality', 'political']) */
    types: addressComponentsTypes[];
  }>;
}
```

### Address Components

The PlacesInput component supports the following address component types (defined in `addressComponentsTypes`):

| Type            | Description     | Example         |
| --------------- | --------------- | --------------- |
| `postal_code`   | ZIP/Postal code | "10001"         |
| `locality`      | City            | "New York"      |
| `country`       | Country         | "United States" |
| `street_number` | Street number   | "123"           |
| `route`         | Street name     | "Main Street"   |

These types can be used with the `selectedValue` prop to display specific address components after selection.

### Example Data Output

```tsx
// For "123 Main St, New York, NY 10001"
{
  location: {
    latitude: 40.7505,
    longitude: -73.9934
  },
  formattedAddress: "123 Main St, New York, NY 10001, USA",
  shortFormattedAddress: "123 Main St, New York, NY 10001",
  addressComponents: [
    {
      languageCode: "en",
      longText: "123",
      shortText: "123",
      types: ["street_number"]
    },
    {
      languageCode: "en",
      longText: "Main Street",
      shortText: "Main St",
      types: ["route"]
    },
    {
      languageCode: "en",
      longText: "New York",
      shortText: "New York",
      types: ["locality", "political"]
    },
    {
      languageCode: "en",
      longText: "New York",
      shortText: "NY",
      types: ["administrative_area_level_1", "political"]
    },
    {
      languageCode: "en",
      longText: "10001",
      shortText: "10001",
      types: ["postal_code"]
    },
    {
      languageCode: "en",
      longText: "United States",
      shortText: "US",
      types: ["country", "political"]
    }
  ]
}
```

## Props Reference

### PlacesInputProps

| Prop                             | Type                                                  | Default | Description                                             |
| -------------------------------- | ----------------------------------------------------- | ------- | ------------------------------------------------------- |
| `query`                          | `string`                                              | -       | External query value to control the input               |
| `googleApiKey`                   | `string`                                              | -       | Google Places API key (required)                        |
| `queryCountries`                 | `string[]`                                            | -       | Array of country codes to restrict search               |
| `clearQueryOnSelect`             | `boolean`                                             | `false` | Whether to clear the input after selection              |
| `onSelect`                       | `(place: Place \| Places['placePrediction']) => void` | -       | Callback when a place is selected (with error handling) |
| `requiredTimeBeforeSearch`       | `number`                                              | `1000`  | Debounce delay in milliseconds before triggering search |
| `requiredCharactersBeforeSearch` | `number`                                              | `2`     | Minimum number of characters before triggering search   |
| `selectedValue`                  | `PlaceInputSelectedValue`                             | -       | Type of address component to display after selection    |
| `...rest`                        | `AutocompleteDropdownProps<Places>`                   | -       | All other props from AutocompleteDropdown component     |

### PlaceInputSelectedValue

The `selectedValue` prop accepts the following values:

| Value             | Description             | Example Output                         |
| ----------------- | ----------------------- | -------------------------------------- |
| `'longAddress'`   | Full formatted address  | "123 Main St, New York, NY 10001, USA" |
| `'shortAddress'`  | Short formatted address | "123 Main St, New York, NY 10001"      |
| `'postal_code'`   | Postal code only        | "10001"                                |
| `'locality'`      | City/locality only      | "New York"                             |
| `'country'`       | Country only            | "United States"                        |
| `'street_number'` | Street number only      | "123"                                  |
| `'route'`         | Street name only        | "Main Street"                          |

## Best Practices

### 1. API Key Security

```tsx
// ✅ Good - Use environment variables
<PlacesInput
  googleApiKey={process.env.GOOGLE_PLACES_API_KEY}
  onSelect={handlePlaceSelect}
/>

// ❌ Avoid - Hardcode API key
<PlacesInput
  googleApiKey="AIzaSyC..." // Never do this
  onSelect={handlePlaceSelect}
/>
```

### 2. Search Optimization

```tsx
// ✅ Good - Appropriate search thresholds
<PlacesInput
  googleApiKey={apiKey}
  requiredCharactersBeforeSearch={3}
  requiredTimeBeforeSearch={500}
  onSelect={handlePlaceSelect}
/>

// ❌ Avoid - Too aggressive search
<PlacesInput
  googleApiKey={apiKey}
  requiredCharactersBeforeSearch={1}
  requiredTimeBeforeSearch={100}
  onSelect={handlePlaceSelect}
/>
```

### 3. Country Restrictions

```tsx
// ✅ Good - Limit to relevant countries
<PlacesInput
  googleApiKey={apiKey}
  queryCountries={['US', 'CA']} // North America only
  onSelect={handlePlaceSelect}
/>

// ❌ Avoid - No restrictions for specific use case
<PlacesInput
  googleApiKey={apiKey}
  // No country restrictions when you only need US addresses
  onSelect={handlePlaceSelect}
/>
```

### 4. Error Handling

```tsx
// ✅ Good - Handle API errors gracefully
<PlacesInput
  googleApiKey={apiKey}
  onSelect={(place) => {
    try {
      if ('formattedAddress' in place) {
        // Full Place object with complete data
        setAddress(place.formattedAddress);
        setCoordinates(place.location);
      } else {
        // Fallback to prediction data (placePrediction object)
        setAddress(place.text.text);
      }
    } catch (error) {
      console.error('Error processing place:', error);
      showError('Unable to process selected location');
    }
  }}
/>

// ❌ Avoid - No error handling
<PlacesInput
  googleApiKey={apiKey}
  onSelect={(place) => {
    setAddress(place.formattedAddress); // May fail if API call failed
  }}
/>
```

### 5. Performance Optimization

```tsx
// ✅ Good - Memoize callbacks
const handlePlaceSelect = useCallback((place) => {
  setAddress(place.formattedAddress);
}, []);

<PlacesInput
  googleApiKey={apiKey}
  onSelect={handlePlaceSelect}
/>

// ❌ Avoid - Inline functions
<PlacesInput
  googleApiKey={apiKey}
  onSelect={(place) => setAddress(place.formattedAddress)} // Recreated on every render
/>
```

## Advanced Usage

### Form Integration

```tsx
const [formData, setFormData] = useState({
  address: '',
  city: '',
  postalCode: '',
  coordinates: null,
});

const handlePlaceSelect = place => {
  if ('formattedAddress' in place) {
    // Full Place object
    setFormData({
      address: place.formattedAddress,
      city: place.addressComponents.find(c => c.types.includes('locality'))?.longText || '',
      postalCode: place.addressComponents.find(c => c.types.includes('postal_code'))?.longText || '',
      coordinates: place.location,
    });
  } else {
    // Fallback to prediction data
    setFormData({
      address: place.text.text,
      city: '',
      postalCode: '',
      coordinates: null,
    });
  }
};

<PlacesInput googleApiKey={apiKey} onSelect={handlePlaceSelect} selectedValue="locality" />;
```

### Custom Validation

```tsx
const [isValidAddress, setIsValidAddress] = useState(false);

const handlePlaceSelect = place => {
  if ('formattedAddress' in place) {
    // Full Place object - can validate address components
    const hasStreetNumber = place.addressComponents.some(c => c.types.includes('street_number'));
    const hasRoute = place.addressComponents.some(c => c.types.includes('route'));

    setIsValidAddress(hasStreetNumber && hasRoute);

    if (hasStreetNumber && hasRoute) {
      setAddress(place.formattedAddress);
    } else {
      showError('Please select a complete street address');
    }
  } else {
    // Fallback to prediction data - limited validation possible
    setIsValidAddress(false);
    setAddress(place.text.text);
    showError('Please select a complete address from the list');
  }
};

<PlacesInput googleApiKey={apiKey} onSelect={handlePlaceSelect} />;
```

### Multi-step Address Selection

```tsx
const [addressStep, setAddressStep] = useState('country');
const [selectedCountry, setSelectedCountry] = useState('');
const [selectedCity, setSelectedCity] = useState('');

const handlePlaceSelect = place => {
  if (addressStep === 'country') {
    const country = place.addressComponents.find(c => c.types.includes('country'))?.longText;
    setSelectedCountry(country);
    setAddressStep('city');
  } else if (addressStep === 'city') {
    const city = place.addressComponents.find(c => c.types.includes('locality'))?.longText;
    setSelectedCity(city);
    setAddressStep('street');
  }
};

<PlacesInput
  googleApiKey={apiKey}
  selectedValue={addressStep === 'country' ? 'country' : 'locality'}
  queryCountries={addressStep === 'country' ? undefined : [selectedCountry]}
  onSelect={handlePlaceSelect}
  placeholder={addressStep === 'country' ? 'Select country...' : 'Select city...'}
/>;
```

### Real-time Address Validation

```tsx
const [addressValidation, setAddressValidation] = useState({
  isValid: false,
  message: '',
});

const handlePlaceSelect = async place => {
  try {
    if ('formattedAddress' in place) {
      // Full Place object - can validate complete address
      const response = await validateAddress(place.formattedAddress);

      if (response.isValid) {
        setAddressValidation({ isValid: true, message: 'Address verified' });
        setAddress(place.formattedAddress);
      } else {
        setAddressValidation({ isValid: false, message: response.error });
      }
    } else {
      // Fallback to prediction data - limited validation
      setAddressValidation({ isValid: false, message: 'Address verification unavailable' });
      setAddress(place.text.text);
    }
  } catch (error) {
    setAddressValidation({ isValid: false, message: 'Unable to verify address' });
  }
};

<PlacesInput googleApiKey={apiKey} onSelect={handlePlaceSelect} />;
{
  addressValidation.message && (
    <String className={addressValidation.isValid ? 'text-green-600' : 'text-red-600'}>
      {addressValidation.message}
    </String>
  );
}
```

### External Query Control

```tsx
const [externalQuery, setExternalQuery] = useState('');

// Control the input from external state
<PlacesInput googleApiKey={apiKey} query={externalQuery} onSelect={handlePlaceSelect} />;

// Update query programmatically
const handleButtonPress = () => {
  setExternalQuery('New York');
};
```

## Performance Considerations

- **Debounced API calls**: Prevents excessive API requests
- **Memoized callbacks**: Reduces unnecessary re-renders
- **Optimized rendering**: FlatList for large result sets
- **Timeout cleanup**: Prevents memory leaks with proper cleanup
- **Conditional rendering**: Only renders list when needed
- **Error fallback**: Graceful degradation when API fails

## Accessibility

The PlacesInput component includes comprehensive accessibility features:

- **Screen reader support**: Proper labeling and announcements
- **Keyboard navigation**: Full keyboard support for list items
- **Focus management**: Proper focus handling
- **ARIA attributes**: Correct semantic markup

### Accessibility Best Practices

```tsx
// Always provide accessibility labels
<PlacesInput
  googleApiKey={apiKey}
  textInputProps={{
    accessible: true,
    accessibilityLabel: "Address search input",
    accessibilityHint: "Type to search for addresses",
  }}
  onSelect={handlePlaceSelect}
/>

// Provide context for screen readers
<PlacesInput
  googleApiKey={apiKey}
  onSelect={(place) => {
    setAddress(place.formattedAddress);
    // Announce selection to screen reader
    AccessibilityInfo.announceForAccessibility(`Selected ${place.formattedAddress}`);
  }}
/>
```

## Troubleshooting

### Common Issues

1. **API key errors**: Ensure Google Places API is enabled and key is valid
2. **No results**: Check country restrictions and API quotas
3. **Performance issues**: Adjust debounce settings
4. **Styling issues**: Verify CSS classes and Tailwind configuration
5. **Memory leaks**: Component automatically cleans up timeouts

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

<PlacesInput
  googleApiKey={apiKey}
  onChangeText={text => {
    setDebugInfo(prev => ({ ...prev, searchText: text }));
  }}
  onSelect={place => {
    const placeType = 'formattedAddress' in place ? 'Full Place' : 'Prediction';
    setDebugInfo(prev => ({
      ...prev,
      selectedPlace: place,
      placeType,
      timestamp: new Date().toISOString(),
    }));
  }}
/>;

{
  debugInfo.searchText && (
    <Box className="rounded bg-gray-100 p-4">
      <String>Debug Info:</String>
      <String>Place Type: {debugInfo.placeType}</String>
      <String>{JSON.stringify(debugInfo, null, 2)}</String>
    </Box>
  );
}
```

## Migration from Other Libraries

### From react-native-google-places

```tsx
// Old (react-native-google-places)
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

<GooglePlacesAutocomplete
  placeholder="Search"
  onPress={(data, details = null) => {
    console.log(data, details);
  }}
  query={{
    key: 'your-api-key',
    language: 'en',
  }}
/>

// New (PlacesInput)
<PlacesInput
  googleApiKey="your-api-key"
  placeholder="Search"
  onSelect={(place) => {
    console.log(place);
  }}
/>
```

### From react-native-google-places-autocomplete

```tsx
// Old (react-native-google-places-autocomplete)
<GooglePlacesAutocomplete
  placeholder="Enter an address"
  fetchDetails={true}
  onPress={(data, details = null) => {
    console.log(data, details);
  }}
  query={{
    key: 'your-api-key',
    components: 'country:us',
  }}
/>

// New (PlacesInput)
<PlacesInput
  googleApiKey="your-api-key"
  placeholder="Enter an address"
  queryCountries={['US']}
  onSelect={(place) => {
    console.log(place);
  }}
/>
```

## Changelog

### Latest Updates

- **Enhanced error handling**: Automatic fallback to prediction data when API fails
- **Improved timeout management**: Proper cleanup to prevent memory leaks
- **Better TypeScript support**: More comprehensive type definitions
- **Performance optimizations**: Optimized re-renders and API calls
- **Enhanced documentation**: More examples and best practices
