import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { PlacesInput } from '../components/PlacesInput';

// Mocks
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  colorVariantPropsHandler: jest.fn(),
  debounce: jest.fn(fn => {
    const debouncedFn = jest.fn(fn);
    debouncedFn.cancel = jest.fn();
    return debouncedFn;
  }),
  isString: jest.fn(value => typeof value === 'string'),
  styleHandler: jest.fn(() => ({})),
}));

jest.mock('../../../components/AutocompleteDropdown', () => {
  const React = require('react');
  const { Text, TextInput, TouchableOpacity, View } = require('react-native');

  function MockAutocompleteDropdown({ children, onChangeText, onSelectItem, ...props }: any) {
    return (
      <View testID="autocomplete-dropdown" {...props}>
        <TextInput
          testID="places-input"
          onChangeText={onChangeText}
          placeholder={props.inputProps?.placeholder || 'Enter your address'}
        />
        {children}
        <TouchableOpacity
          testID="select-place"
          onPress={() =>
            onSelectItem &&
            onSelectItem({
              placePrediction: {
                placeId: 'test-place-id',
                text: { text: 'Test Address' },
              },
            })
          }
        >
          <Text>Select Place</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return {
    AutocompleteDropdown: MockAutocompleteDropdown,
    AutocompleteDropdownSs: MockAutocompleteDropdown,
    AutocompleteDropdownTw: MockAutocompleteDropdown,
  };
});

// Mock fetch globally
global.fetch = jest.fn();

describe('PlacesInput Component', () => {
  const mockGoogleApiKey = 'test-api-key';
  const mockOnSelect = jest.fn();
  const mockOnError = jest.fn();
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('should render without crashing', () => {
    const { getByTestId } = render(<PlacesInput googleApiKey={mockGoogleApiKey} />);
    expect(getByTestId('autocomplete-dropdown')).toBeTruthy();
  });

  it('should render with placeholder', () => {
    const { getByPlaceholderText } = render(
      <PlacesInput googleApiKey={mockGoogleApiKey} inputProps={{ placeholder: 'Enter your address' }} />,
    );
    expect(getByPlaceholderText('Enter your address')).toBeTruthy();
  });

  it('should handle text input changes', () => {
    const { getByTestId } = render(<PlacesInput googleApiKey={mockGoogleApiKey} onChangeText={mockOnChangeText} />);

    const input = getByTestId('places-input');
    fireEvent.changeText(input, 'New York');

    expect(mockOnChangeText).toHaveBeenCalledWith('New York');
  });

  it('should respect requiredCharactersBeforeSearch', async () => {
    const { getByTestId } = render(<PlacesInput googleApiKey={mockGoogleApiKey} requiredCharactersBeforeSearch={3} />);

    const input = getByTestId('places-input');
    fireEvent.changeText(input, 'NY'); // Only 2 characters

    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it('should fetch places when query meets minimum length', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ suggestions: [] }),
      ok: true,
    });

    const { getByTestId } = render(<PlacesInput googleApiKey={mockGoogleApiKey} requiredCharactersBeforeSearch={2} />);

    const input = getByTestId('places-input');
    fireEvent.changeText(input, 'New York');

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://places.googleapis.com/v1/places:autocomplete',
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Goog-Api-Key': mockGoogleApiKey,
          }),
          method: 'POST',
        }),
      );
    });
  });

  it('should handle country restrictions', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ suggestions: [] }),
      ok: true,
    });

    const { getByTestId } = render(<PlacesInput googleApiKey={mockGoogleApiKey} queryCountries={['US', 'CA']} />);

    const input = getByTestId('places-input');
    fireEvent.changeText(input, 'New York');

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://places.googleapis.com/v1/places:autocomplete',
        expect.objectContaining({
          body: JSON.stringify({
            includedRegionCodes: ['US', 'CA'],
            input: 'New York',
          }),
        }),
      );
    });
  });

  it('should handle controlled open state', () => {
    const { getByTestId } = render(<PlacesInput googleApiKey={mockGoogleApiKey} open onOpenChange={jest.fn()} />);

    expect(getByTestId('autocomplete-dropdown')).toBeTruthy();
  });

  it('should handle defaultOpen prop', () => {
    const { getByTestId } = render(<PlacesInput googleApiKey={mockGoogleApiKey} defaultOpen />);

    expect(getByTestId('autocomplete-dropdown')).toBeTruthy();
  });

  it('should pass through additional props to AutocompleteDropdown', () => {
    const { getByTestId } = render(
      <PlacesInput
        googleApiKey={mockGoogleApiKey}
        data-testid="custom-places-input"
        inputProps={{ placeholder: 'Custom placeholder' }}
      />,
    );

    const dropdown = getByTestId('autocomplete-dropdown');
    expect(dropdown).toBeTruthy();
    expect(dropdown.props['data-testid']).toBe('custom-places-input');
  });
});
