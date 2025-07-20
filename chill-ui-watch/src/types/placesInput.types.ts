import type { FlatListProps, TextInputProps } from 'react-native';

import type { StringProps } from './string.types';
import type { addressComponentsTypes, PlaceInputSelectedValue } from './common.types';

/**
 * Place data structure
 */
export interface Place {
  /** Full formatted address */
  formattedAddress: string;
  /** Short formatted address */
  shortFormattedAddress: string;
  /** Location coordinates */
  location: {
    /** Latitude coordinate */
    latitude: number;
    /** Longitude coordinate */
    longitude: number;
  };
  /** Address components */
  addressComponents: {
    /** Language code */
    languageCode: string;
    /** Long text description */
    longText: string;
    /** Short text description */
    shortText: string;
    /** Types of address component */
    types: addressComponentsTypes[];
  }[];
}

/**
 * Places prediction data structure
 */
export interface Places {
  /** Place prediction information */
  placePrediction: {
    /** Unique place ID */
    placeId: string;
    /** Place name */
    place: string;
    /** Text information */
    text: {
      /** Display text */
      text: string;
    };
  };
}

/**
 * Places API response structure
 */
export interface PlacesResponse {
  /** Array of place suggestions */
  suggestions: Places[];
}

/**
 * Props for the PlacesInput component
 */
export type PlacesInputProps = {
  /** Search query */
  query?: string;
  /** Custom CSS classes for the input */
  className?: string;
  /** Whether the input is clearable */
  clearable?: boolean;
  /** Google Places API key */
  googleApiKey: string;
  /** Placeholder text */
  placeHolder?: string;
  /** Size of the loading spinner */
  spinnerSize?: number;
  /** Color of the loading spinner */
  spinnerColor?: string;
  /** Custom CSS classes for the list */
  listClassName?: string;
  /** Maximum height of the list */
  maxListHeight?: number;
  /** Countries to search in */
  queryCountries?: string[];
  /** Custom CSS classes for list items */
  listItemClassName?: string;
  /** Custom CSS classes for item text */
  itemTextClassName?: string;
  /** Custom CSS classes for the container */
  containerClassName?: string;
  /** Whether to clear query on selection */
  clearQueryOnSelect?: boolean;
  /** Props for the text input */
  textInputProps?: TextInputProps;
  /** Callback when a place is selected */
  onSelect?: (place: any) => void;
  /** Required time before search (debounce) */
  requiredTimeBeforeSearch?: number;
  /** Callback when text changes */
  onChangeText?: (text: string) => void;
  /** Header component for the list */
  listHeaderComponent?: React.ReactNode;
  /** Required characters before search */
  requiredCharactersBeforeSearch?: number;
  /** Currently selected value */
  selectedValue?: PlaceInputSelectedValue;
  /** Text variant for items */
  itemTextVariant?: StringProps['variant'];
  /** Footer component for the list */
  listFooterComponent?: React.ReactNode;
  /** Whether to show header when results exist */
  showListHeaderComponentWhenResults?: boolean;
  /** Whether to show footer when results exist */
  showListFooterComponentWhenResults?: boolean;
  /** Custom render function for list items */
  renderItem?: ({ item }: { item: Places }) => React.ReactElement;
  /** Props for the FlatList */
  flatListProps?: FlatListProps<Places>;
  /** Color of placeholder text */
  placeholderTextColor?: string;
};
