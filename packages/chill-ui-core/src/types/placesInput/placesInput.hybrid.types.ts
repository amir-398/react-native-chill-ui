import { StrictOmit } from '../utils/StrictOmit.types';
import { AutocompleteDropdownProps } from '../autocompleteDropdown/autocompleteDropdown.hybrid.types';

/**
 * Place data structure returned by Google Places API
 * Contains detailed information about a selected place including address components,
 * coordinates, and formatted addresses.
 *
 * @example
 * ```tsx
 * onSelect={(place: Place) => {
 *   console.log('Full address:', place.formattedAddress);
 *   console.log('Coordinates:', place.location);
 *   console.log('City:', place.addressComponents.find(c => c.types.includes('locality'))?.longText);
 * }}
 * ```
 */

export type addressComponentsTypes = 'postal_code' | 'locality' | 'country' | 'street_number' | 'route';

export type PlaceInputSelectedValue = 'longAddress' | 'shortAddress' | addressComponentsTypes;

export interface Place {
  /** Full formatted address (e.g., "123 Main St, New York, NY 10001, USA") */
  formattedAddress: string;
  /** Short formatted address (e.g., "123 Main St, New York") */
  shortFormattedAddress: string;
  /** Location coordinates for mapping */
  location: {
    /** Latitude coordinate */
    latitude: number;
    /** Longitude coordinate */
    longitude: number;
  };
  /** Postal address details (optional, may contain additional postal information) */
  postalAddress?: {
    /** Postal address components */
    [key: string]: any;
  };
  /** Address components with detailed information for each part of the address */
  addressComponents: {
    /** Language code for the component text */
    languageCode: string;
    /** Long text description (e.g., "New York" for locality) */
    longText: string;
    /** Short text description (e.g., "NY" for administrative_area_level_1) */
    shortText: string;
    /** Types of address component (e.g., ['locality', 'political']) */
    types: addressComponentsTypes[];
  }[];
}

/**
 * Places prediction data structure from autocomplete API
 * Represents a place suggestion returned by the Google Places autocomplete API.
 * This is the structure used in the dropdown list before a place is selected.
 *
 * @example
 * ```tsx
 * // In renderItem function
 * renderItem={(item: Places) => (
 *   <Text>{item.placePrediction.text.text}</Text>
 * )}
 * ```
 */
export interface Places {
  /** Place prediction information containing the suggestion details */
  placePrediction: {
    /** Unique place ID used to fetch detailed place information */
    placeId: string;
    /** Place details (may be undefined for predictions, populated after selection) */
    place?: Place;
    /** Text information for display in the dropdown */
    text: {
      /** Display text shown in the autocomplete dropdown */
      text: string;
    };
  };
}

/**
 * Places API response structure
 * Response format from the Google Places autocomplete API containing
 * an array of place suggestions or error information.
 *
 * @example
 * ```tsx
 * // Success response structure
 * {
 *   suggestions: [
 *     {
 *       placePrediction: {
 *         placeId: "ChIJ...",
 *         text: { text: "New York, NY, USA" }
 *       }
 *     }
 *   ]
 * }
 *
 * // Error response structure
 * {
 *   error: {
 *     message: "API key invalid",
 *     code: 403
 *   }
 * }
 * ```
 */
export interface PlacesResponse {
  /** Array of place suggestions returned by the autocomplete API */
  suggestions?: Places[];
  /** Error information if the API call failed */
  error?: {
    /** Error message describing what went wrong */
    message: string;
    /** Error code (HTTP status code or API-specific code) */
    code?: number;
  };
}

/**
 * Props for the PlacesInput component
 *
 * @example
 * ```tsx
 * // Basic usage
 * <PlacesInput
 *   googleApiKey="your-api-key"
 *   onSelect={(place) => console.log(place)}
 * />
 *
 * // With country restriction and custom selection
 * <PlacesInput
 *   googleApiKey="your-api-key"
 *   queryCountries={['US', 'CA']}
 *   selectedValue="locality"
 *   onSelect={(place) => console.log(place)}
 *   requiredCharactersBeforeSearch={3}
 * />
 * ```
 */
export type PlacesInputProps = {
  /** External query value to control the input */
  query?: string;
  /** Google Places API key (required) */
  googleApiKey: string;
  /** Array of country codes to restrict search */
  queryCountries?: string[];
  /** Whether to clear the input after selection */
  clearQueryOnSelect?: boolean;
  /** Callback when a place is selected (with error handling) */
  onSelect?: (place: Place | Places['placePrediction']) => void;
  /** Callback when an error occurs during API calls */
  onError?: (error: Error) => void;
  /** Debounce delay in milliseconds before triggering search */
  requiredTimeBeforeSearch?: number;
  /** Minimum number of characters before triggering search */
  requiredCharactersBeforeSearch?: number;
  /** Type of address component to display after selection */
  selectedValue?: PlaceInputSelectedValue;
} & StrictOmit<AutocompleteDropdownProps<Places>, 'dataSet' | 'valueField' | 'onSelectItem'>;
