/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback } from 'react';
import { FlatList, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import cn from '../cn';
import Icon from '../icon';
import { Box } from '../box';
import String from '../string';
import { Spinner } from '../loadingIndicatorsKit';
import { Place, Places, PlacesInputProps, PlacesResponse } from '../../types';

/**
 * PlacesInput component that provides Google Places API integration for address autocomplete.
 * Features real-time search, debounced API calls, customizable rendering, and comprehensive place data.
 *
 * @example
 * ```tsx
 * // Basic usage with Google API key
 * <PlacesInput
 *   googleApiKey="your-google-api-key"
 *   onSelect={(place) => console.log(place)}
 * />
 *
 * // With custom styling and validation
 * <PlacesInput
 *   googleApiKey="your-google-api-key"
 *   placeholder="Enter your address"
 *   requiredCharactersBeforeSearch={3}
 *   requiredTimeBeforeSearch={500}
 *   onSelect={(place) => {
 *     console.log('Selected place:', place.formattedAddress);
 *   }}
 *   onChangeText={(text) => console.log('Searching:', text)}
 * />
 *
 * // With country restrictions and custom rendering
 * <PlacesInput
 *   googleApiKey="your-google-api-key"
 *   queryCountries={['US', 'CA']}
 *   selectedValue="locality"
 *   clearQueryOnSelect={true}
 *   renderItem={({ item }) => (
 *     <Box className="p-3 border-b border-gray-200">
 *       <String className="font-bold">{item.placePrediction.text.text}</String>
 *       <String className="text-gray-500 text-sm">
 *         {item.placePrediction.place?.formattedAddress}
 *       </String>
 *     </Box>
 *   )}
 *   onSelect={(place) => {
 *     setSelectedCity(place.addressComponents.find(c => c.types.includes('locality'))?.longText);
 *   }}
 * />
 *
 * // With custom styling and loading states
 * <PlacesInput
 *   googleApiKey="your-google-api-key"
 *   className="bg-gray-100 border-2 border-blue-500"
 *   listClassName="shadow-lg border-2 border-blue-200"
 *   spinnerColor="#007AFF"
 *   spinnerSize={32}
 *   maxListHeight={400}
 *   listHeaderComponent={<String className="p-3 bg-gray-50">Recent searches</String>}
 *   listFooterComponent={<String className="p-3 bg-gray-50">Powered by Google Places</String>}
 *   onSelect={(place) => {
 *     setAddress(place.formattedAddress);
 *     setCoordinates(place.location);
 *   }}
 * />
 * ```
 *
 * @param className - Custom CSS classes for the input field
 * @param clearable - Whether to show a clear button when input has text
 * @param clearQueryOnSelect - Whether to clear the input after selection
 * @param containerClassName - Custom CSS classes for the container
 * @param emptyListText - Text to show when no results are found
 * @param flatListProps - Props to pass to the FlatList component
 * @param googleApiKey - Google Places API key (required)
 * @param itemTextClassName - Custom CSS classes for item text
 * @param itemTextVariant - Text variant for item text
 * @param listClassName - Custom CSS classes for the dropdown list
 * @param listFooterComponent - Component to render at the bottom of the list
 * @param listHeaderComponent - Component to render at the top of the list
 * @param listItemClassName - Custom CSS classes for list items
 * @param maxListHeight - Maximum height of the dropdown list
 * @param onChangeText - Callback when input text changes
 * @param onSelect - Callback when a place is selected
 * @param placeHolder - Placeholder text for the input
 * @param placeholderTextColor - Color of the placeholder text
 * @param query - External query value to control the input
 * @param queryCountries - Array of country codes to restrict search
 * @param renderItem - Custom render function for list items
 * @param requiredCharactersBeforeSearch - Minimum characters before API call
 * @param requiredTimeBeforeSearch - Debounce delay in milliseconds
 * @param selectedValue - Type of address component to display after selection
 * @param showListFooterComponentWhenResults - Whether to show footer when results exist
 * @param showListHeaderComponentWhenResults - Whether to show header when results exist
 * @param spinnerColor - Color of the loading spinner
 * @param spinnerSize - Size of the loading spinner
 * @param textInputProps - Props to pass to the TextInput component
 * @returns PlacesInput component with Google Places autocomplete
 */
function PlacesInput(props: PlacesInputProps) {
  const {
    className,
    clearable = true,
    clearQueryOnSelect = false,
    containerClassName,
    emptyListText = 'no results',
    flatListProps,
    googleApiKey,
    itemTextClassName,
    itemTextVariant = 'body-2',
    listClassName,
    listFooterComponent,
    listHeaderComponent,
    listItemClassName,
    maxListHeight,
    onChangeText,
    onSelect,
    placeHolder = 'Search a place...',
    placeholderTextColor = 'grey',
    query = '',
    queryCountries,
    renderItem: customRenderItem,
    requiredCharactersBeforeSearch = 2,
    requiredTimeBeforeSearch = 1000,
    selectedValue,
    showListFooterComponentWhenResults = true,
    showListHeaderComponentWhenResults = true,
    spinnerColor = '#d9d9d9',
    spinnerSize = 24,
    textInputProps,
  } = props;
  const [localQuery, setLocalQuery] = useState(query);
  const [places, setPlaces] = useState<Places[]>([]);
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<TextInput>(null);

  // Cleanup du timeout au unmount
  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  /**
   * Fetches places from Google Places API with debouncing
   * @param input - The search query text
   */
  const fetchPlaces = useCallback(
    async (input: string) => {
      if (!input || input.length < requiredCharactersBeforeSearch) {
        setPlaces([]);
        setShowList(false);
        return;
      }
      setIsLoading(true);
      setShowList(true);
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
        const data = (await response.json()) as PlacesResponse;
        setPlaces(data.suggestions || []);
      } finally {
        setIsLoading(false);
      }
    },
    [googleApiKey, queryCountries, requiredCharactersBeforeSearch],
  );

  /**
   * Debounced function to fetch places with delay
   * @param input - The search query text
   */
  const debouncedFetchPlaces = useCallback(
    (input: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fetchPlaces(input);
      }, requiredTimeBeforeSearch);
    },
    [fetchPlaces, requiredTimeBeforeSearch],
  );

  // Rafraîchir la query externe
  useEffect(() => {
    if (query !== localQuery) {
      setLocalQuery(query);
      debouncedFetchPlaces(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (localQuery.length === 0) setShowList(false);
  }, [localQuery]);

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
   * @param id - The place ID from Google Places API
   * @param passedPlace - The place prediction object
   */
  const handlePlaceSelect = useCallback(
    async (id: string, passedPlace: Places['placePrediction']) => {
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
        const data = (await response.json()) as Place;

        setShowList(false);
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
      } catch {
        setIsLoading(false);
        setShowList(false);
        setLocalQuery(passedPlace.text.text);
        if (onSelect) onSelect(passedPlace);
      }
    },
    [clearQueryOnSelect, googleApiKey, onSelect, selectedValue],
  );

  /**
   * Handles input blur with delayed list hiding
   */
  const handleBlur = useCallback(() => {
    setTimeout(() => setShowList(false), 150);
  }, []);

  /**
   * Default render function for list items
   * @param item - The place item to render
   * @param index - The index of the item in the list
   */
  const renderItem = useCallback(
    ({ index, item }: { item: Places; index: number }) => (
      <TouchableOpacity
        key={item.placePrediction.placeId}
        className={cn(
          index !== places.length - 1 && 'border-b-[0.5px] border-[rgba(0,0,0,0.1)]',
          'p-4',
          listItemClassName,
        )}
        onPress={() => handlePlaceSelect(item.placePrediction.placeId || '', item.placePrediction)}
        activeOpacity={0.7}
      >
        <String variant={itemTextVariant} className={itemTextClassName}>
          {item.placePrediction.text.text}
        </String>
      </TouchableOpacity>
    ),
    [handlePlaceSelect, itemTextVariant, itemTextClassName, listItemClassName, places.length],
  );

  return (
    <Box className={cn('relative z-50 rounded-lg', containerClassName)}>
      <Box className="justify-center">
        <TextInput
          {...textInputProps}
          ref={inputRef}
          placeholder={placeHolder}
          className={cn('border-dark/10 text-dark rounded-lg border py-3 pl-3 pr-12', className)}
          onChangeText={handleChangeText}
          value={localQuery}
          onFocus={() => setShowList(true)}
          onBlur={handleBlur}
          placeholderTextColor={placeholderTextColor}
        />
        {clearable && localQuery.length > 0 && (
          <Box className="absolute bottom-0 right-3 top-0 flex justify-center">
            <Icon name="xmark-solid" size="xs" hasPressEffect onPress={() => setLocalQuery('')} />
          </Box>
        )}
      </Box>
      {showList && (
        <Box
          className={cn(
            'border-dark/5 absolute top-full mt-0.5 max-h-96 w-full overflow-hidden rounded-lg border bg-white',
            listClassName,
          )}
          style={{
            ...(maxListHeight && { maxHeight: maxListHeight }),
            shadowColor: '#000',
            shadowOffset: { height: 2, width: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          {!showListHeaderComponentWhenResults && listHeaderComponent}
          {isLoading && places.length === 0 && (
            <Box className="flex items-center justify-center py-1">
              <Spinner color={spinnerColor} size={spinnerSize} />
            </Box>
          )}
          <FlatList
            {...flatListProps}
            data={places}
            renderItem={customRenderItem ?? renderItem}
            keyExtractor={item => item.placePrediction.placeId}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              !isLoading && localQuery.length >= requiredCharactersBeforeSearch ? (
                <Box className="items-center p-4">
                  <String variant={itemTextVariant} className={itemTextClassName}>
                    {emptyListText}
                  </String>
                </Box>
              ) : null
            }
          />
          {!showListFooterComponentWhenResults && listFooterComponent}
        </Box>
      )}
    </Box>
  );
}

export default PlacesInput;
