# PlacesInput

A powerful React Native component that integrates with Google Places API to provide address autocomplete functionality. Features real-time search, debounced API calls, customizable rendering, and comprehensive place data extraction.

## Features

- ✅ **Google Places Integration**: Full integration with Google Places API
- ✅ **Real-time Search**: Instant search suggestions as you type
- ✅ **Debounced API Calls**: Optimized performance with configurable delays
- ✅ **Country Restrictions**: Limit search to specific countries
- ✅ **Custom Rendering**: Fully customizable list item rendering
- ✅ **Address Components**: Extract specific address parts (city, postal code, etc.)
- ✅ **Loading States**: Built-in loading indicators
- ✅ **Keyboard Handling**: Proper keyboard interaction and dismissal
- ✅ **Accessibility**: Screen reader support and ARIA attributes
- ✅ **TypeScript**: Full type safety with detailed interfaces
- ✅ **Performance**: Optimized rendering and API calls

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
  placeHolder="Search for a location..."
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
  className="rounded-lg border-2 border-blue-500 bg-gray-100"
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
  showListHeaderComponentWhenResults={true}
  showListFooterComponentWhenResults={true}
  onSelect={place => {
    setAddress(place.formattedAddress);
    setCoordinates(place.location);
  }}
/>
```

## Place Data Structure

The `onSelect` callback receives comprehensive place data:

```tsx
interface Place {
  location: {
    latitude: number;
    longitude: number;
  };
  formattedAddress: string;
  shortFormattedAddress: string;
  postalAddress: {
    // Postal address details
  };
  addressComponents: Array<{
    longText: string;
    shortText: string;
    types: string[];
  }>;
}
```

### Address Components

Common address component types:

| Type                          | Description     | Example                 |
| ----------------------------- | --------------- | ----------------------- |
| `street_number`               | Street number   | "123"                   |
| `route`                       | Street name     | "Main Street"           |
| `locality`                    | City            | "New York"              |
| `administrative_area_level_1` | State/Province  | "New York"              |
| `postal_code`                 | ZIP/Postal code | "10001"                 |
| `country`                     | Country         | "United States"         |
| `premise`                     | Building name   | "Empire State Building" |
| `subpremise`                  | Unit/Apartment  | "Apt 4B"                |

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
    { longText: "123", shortText: "123", types: ["street_number"] },
    { longText: "Main Street", shortText: "Main St", types: ["route"] },
    { longText: "New York", shortText: "New York", types: ["locality", "political"] },
    { longText: "New York", shortText: "NY", types: ["administrative_area_level_1", "political"] },
    { longText: "10001", shortText: "10001", types: ["postal_code"] },
    { longText: "United States", shortText: "US", types: ["country", "political"] }
  ]
}
```

## Props Reference

### PlacesInputProps

| Prop                                 | Type                                                    | Default               | Description                              |
| ------------------------------------ | ------------------------------------------------------- | --------------------- | ---------------------------------------- |
| `className`                          | `string`                                                | -                     | Custom CSS classes for the input field   |
| `clearable`                          | `boolean`                                               | `true`                | Whether to show a clear button           |
| `clearQueryOnSelect`                 | `boolean`                                               | `false`               | Whether to clear input after selection   |
| `containerClassName`                 | `string`                                                | -                     | Custom CSS classes for the container     |
| `emptyListText`                      | `string`                                                | `'no results'`        | Text when no results found               |
| `flatListProps`                      | `FlatListProps`                                         | -                     | Props for the FlatList component         |
| `googleApiKey`                       | `string`                                                | -                     | Google Places API key (required)         |
| `itemTextClassName`                  | `string`                                                | -                     | Custom CSS classes for item text         |
| `itemTextVariant`                    | `string`                                                | `'body-2'`            | Text variant for item text               |
| `listClassName`                      | `string`                                                | -                     | Custom CSS classes for the dropdown list |
| `listFooterComponent`                | `ReactNode`                                             | -                     | Component at bottom of list              |
| `listHeaderComponent`                | `ReactNode`                                             | -                     | Component at top of list                 |
| `listItemClassName`                  | `string`                                                | -                     | Custom CSS classes for list items        |
| `maxListHeight`                      | `number`                                                | -                     | Maximum height of dropdown list          |
| `onChangeText`                       | `(text: string) => void`                                | -                     | Callback when input text changes         |
| `onSelect`                           | `(place: Place \| Places['placePrediction']) => void`   | -                     | Callback when place is selected          |
| `placeHolder`                        | `string`                                                | `'Search a place...'` | Placeholder text                         |
| `placeholderTextColor`               | `string`                                                | `'grey'`              | Color of placeholder text                |
| `query`                              | `string`                                                | -                     | External query value                     |
| `queryCountries`                     | `string[]`                                              | -                     | Country codes to restrict search         |
| `renderItem`                         | `(props: { item: Places; index: number }) => ReactNode` | -                     | Custom render function                   |
| `requiredCharactersBeforeSearch`     | `number`                                                | `2`                   | Min chars before API call                |
| `requiredTimeBeforeSearch`           | `number`                                                | `1000`                | Debounce delay in ms                     |
| `selectedValue`                      | `string`                                                | -                     | Address component type to display        |
| `showListFooterComponentWhenResults` | `boolean`                                               | `true`                | Show footer when results exist           |
| `showListHeaderComponentWhenResults` | `boolean`                                               | `true`                | Show header when results exist           |
| `spinnerColor`                       | `string`                                                | `'#d9d9d9'`           | Color of loading spinner                 |
| `spinnerSize`                        | `number`                                                | `24`                  | Size of loading spinner                  |
| `textInputProps`                     | `TextInputProps`                                        | -                     | Props for TextInput component            |

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
      setAddress(place.formattedAddress);
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
    setAddress(place.formattedAddress); // May fail
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
  setFormData({
    address: place.formattedAddress,
    city: place.addressComponents.find(c => c.types.includes('locality'))?.longText || '',
    postalCode: place.addressComponents.find(c => c.types.includes('postal_code'))?.longText || '',
    coordinates: place.location,
  });
};

<PlacesInput googleApiKey={apiKey} onSelect={handlePlaceSelect} selectedValue="locality" />;
```

### Custom Validation

```tsx
const [isValidAddress, setIsValidAddress] = useState(false);

const handlePlaceSelect = place => {
  const hasStreetNumber = place.addressComponents.some(c => c.types.includes('street_number'));
  const hasRoute = place.addressComponents.some(c => c.types.includes('route'));

  setIsValidAddress(hasStreetNumber && hasRoute);

  if (hasStreetNumber && hasRoute) {
    setAddress(place.formattedAddress);
  } else {
    showError('Please select a complete street address');
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
  placeHolder={addressStep === 'country' ? 'Select country...' : 'Select city...'}
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
    // Additional validation logic
    const response = await validateAddress(place.formattedAddress);

    if (response.isValid) {
      setAddressValidation({ isValid: true, message: 'Address verified' });
      setAddress(place.formattedAddress);
    } else {
      setAddressValidation({ isValid: false, message: response.error });
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

## Performance Considerations

- **Debounced API calls**: Prevents excessive API requests
- **Memoized callbacks**: Reduces unnecessary re-renders
- **Optimized rendering**: FlatList for large result sets
- **Timeout cleanup**: Prevents memory leaks
- **Conditional rendering**: Only renders list when needed

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

### Debug Example

```tsx
const [debugInfo, setDebugInfo] = useState({});

<PlacesInput
  googleApiKey={apiKey}
  onChangeText={text => {
    setDebugInfo(prev => ({ ...prev, searchText: text }));
  }}
  onSelect={place => {
    setDebugInfo(prev => ({
      ...prev,
      selectedPlace: place,
      timestamp: new Date().toISOString(),
    }));
  }}
/>;

{
  debugInfo.searchText && (
    <Box className="rounded bg-gray-100 p-4">
      <String>Debug Info:</String>
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
  placeHolder="Search"
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
  placeHolder="Enter an address"
  queryCountries={['US']}
  onSelect={(place) => {
    console.log(place);
  }}
/>
```
