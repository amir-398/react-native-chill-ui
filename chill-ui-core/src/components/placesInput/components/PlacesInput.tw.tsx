import { debounce } from '@utils';
import { Keyboard } from 'react-native';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { AutocompleteDropdownTw } from '@components/AutocompleteDropdown';
import { PlacesInputPropsTw, PlaceTw, PlacesTw, PlacesResponseTw } from '@types';

/**
 * PlacesInput component that provides Google Places API integration for address autocomplete.
 * Features real-time search, debounced API calls, customizable rendering, and comprehensive place data.
 *
 * @example
 * ```tsx
 * // Basic usage with Google API key
 * <PlacesInput
 *   googleApiKey="your-google-api-key"
 *   placeholder="Enter your address"
 *   requiredCharactersBeforeSearch={3}
 *   requiredTimeBeforeSearch={500}
 *   clearQueryOnSelect={true}
 *   onSelect={(place) => {
 *     console.log('Selected place:', place.formattedAddress);
 *   }}
 *   onError={(error) => {
 *     console.error('Places API error:', error.message);
 *   }}
 *   onChangeText={(text) => console.log('Searching:', text)}
 * />
 * ```
 *
 * @param query - External query value to control the input
 * @param googleApiKey - Google Places API key (required)
 * @param queryCountries - Array of country codes to restrict search (e.g., ['US', 'CA'])
 * @param clearQueryOnSelect - Whether to clear the input after selection (default: false)
 * @param onSelect - Callback when a place is selected, receives Place or placePrediction object
 * @param onError - Callback when an error occurs during API calls, receives Error object
 * @param onOpenChange - Callback when open state changes
 * @param open - Controlled open state
 * @param defaultOpen - Default open state (uncontrolled)
 * @param requiredTimeBeforeSearch - Debounce delay in milliseconds before triggering search (default: 1000)
 * @param requiredCharactersBeforeSearch - Minimum characters before triggering search (default: 2)
 * @param selectedValue - Type of address component to display after selection:
 *   - 'longAddress': Full formatted address
 *   - 'shortAddress': Short formatted address
 *   - 'postal_code': Postal code only
 *   - 'locality': City/locality only
 *   - 'country': Country only
 *   - 'street_number': Street number only
 *   - 'route': Street name only
 * @param ...rest - All other props from AutocompleteDropdown component
 * @returns PlacesInput component with Google Places autocomplete
 */
export function PlacesInput(props: PlacesInputPropsTw) {
  const {
    clearQueryOnSelect = false,
    defaultOpen = false,
    googleApiKey,
    onChangeText,
    onError,
    onOpenChange,
    onSelect,
    open,
    query = '',
    queryCountries,
    requiredCharactersBeforeSearch = 2,
    requiredTimeBeforeSearch = 1000,
    selectedValue,
    ...rest
  } = props;
  const [localQuery, setLocalQuery] = useState(query);
  const [places, setPlaces] = useState<PlacesTw[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetches places from Google Places API with debouncing
   * @param input - The search query text
   */
  const fetchPlaces = useCallback(
    async (input: string) => {
      if (!input || input.length < requiredCharactersBeforeSearch) {
        setPlaces([]);
        return;
      }
      setIsLoading(true);
      try {
        const requestData = {
          includedRegionCodes: queryCountries || [],
          input,
        };
        const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
          body: JSON.stringify(requestData),
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': googleApiKey,
            'X-Goog-FieldMask': [
              'suggestions.placePrediction.placeId',
              'suggestions.placePrediction.place',
              'suggestions.placePrediction.text.text',
            ].join(','),
          },
          method: 'POST',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
          if (onError) {
            onError(new Error(errorMessage));
          }
          setPlaces([]);
          return;
        }

        const data = (await response.json()) as PlacesResponseTw;
        if (data.error) {
          if (onError) {
            onError(data.error instanceof Error ? data.error : new Error(data.error.message || 'API Error'));
          }
          setPlaces([]);
          return;
        }

        setPlaces(data.suggestions || []);
      } catch (error) {
        if (onError) {
          onError(error instanceof Error ? error : new Error('Failed to fetch places'));
        }
        setPlaces([]);
      } finally {
        setIsLoading(false);
      }
    },
    [googleApiKey, queryCountries, requiredCharactersBeforeSearch, onError],
  );

  // Debounced function to fetch places with delay
  const debouncedFetchPlaces = useMemo(
    () => debounce(fetchPlaces, requiredTimeBeforeSearch),
    [fetchPlaces, requiredTimeBeforeSearch],
  );

  useEffect(() => {
    if (query !== localQuery) {
      setLocalQuery(query);
      debouncedFetchPlaces(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Cleanup debounce on unmount
  useEffect(
    () => () => {
      debouncedFetchPlaces.cancel();
    },
    [debouncedFetchPlaces],
  );

  /**
   * Handles text input changes with debounced search
   * @param text - The input text value
   */
  const handleChangeText = useCallback(
    (text: string) => {
      setLocalQuery(text);
      debouncedFetchPlaces(text);
      if (onChangeText) onChangeText(text);
    },
    [debouncedFetchPlaces, onChangeText],
  );

  /**
   * Handles place selection and fetches detailed place information
   * @param item - The place item to select
   */
  const handlePlaceSelect = useCallback(
    async (item: PlacesTw) => {
      const id = item.placePrediction.placeId;
      const passedPlace = item.placePrediction;
      setIsLoading(true);
      try {
        const response = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': googleApiKey,
            'X-Goog-FieldMask': [
              'location',
              'formattedAddress',
              'postalAddress',
              'shortFormattedAddress',
              'addressComponents',
            ].join(','),
          },
          method: 'GET',
        });

        // Vérifier si la réponse HTTP est OK
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
          if (onError) {
            onError(new Error(errorMessage));
          }
          setLocalQuery(passedPlace.text.text);
          if (onSelect) onSelect(passedPlace);
          return;
        }

        const data = (await response.json()) as PlaceTw;

        setIsLoading(false);

        if (selectedValue) {
          if (selectedValue === 'longAddress') {
            setLocalQuery(data.formattedAddress);
          } else if (selectedValue === 'shortAddress') {
            setLocalQuery(data.shortFormattedAddress);
          } else if (selectedValue === 'postal_code') {
            setLocalQuery(
              data.addressComponents.find(component => component.types.includes('postal_code'))?.longText || '',
            );
          } else if (selectedValue === 'locality') {
            setLocalQuery(
              data.addressComponents.find(component => component.types.includes('locality'))?.longText || '',
            );
          } else if (selectedValue === 'country') {
            setLocalQuery(
              data.addressComponents.find(component => component.types.includes('country'))?.longText || '',
            );
          } else if (selectedValue === 'street_number') {
            setLocalQuery(
              data.addressComponents.find(component => component.types.includes('street_number'))?.longText || '',
            );
          } else if (selectedValue === 'route') {
            setLocalQuery(data.addressComponents.find(component => component.types.includes('route'))?.longText || '');
          } else {
            setLocalQuery(
              data.addressComponents.find(component => component.types.includes(selectedValue))?.longText || '',
            );
          }
        } else {
          setLocalQuery(clearQueryOnSelect ? '' : (data && data.formattedAddress) || data.shortFormattedAddress);
        }
        if (onSelect) onSelect(data);
        Keyboard.dismiss();
      } catch (error) {
        setIsLoading(false);
        setLocalQuery(passedPlace.text.text);
        if (onError) {
          onError(error instanceof Error ? error : new Error('Failed to fetch place details'));
        }
        if (onSelect) onSelect(passedPlace);
      }
    },
    [clearQueryOnSelect, googleApiKey, onError, onSelect, selectedValue],
  );

  return (
    <AutocompleteDropdownTw
      {...rest}
      dataSet={places}
      valueField="placePrediction.text.text"
      onChangeText={handleChangeText}
      hasPerformSearch={false}
      onSelectItem={handlePlaceSelect}
      isLoading={isLoading}
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    />
  );
}

PlacesInput.displayName = 'PlacesInput';
