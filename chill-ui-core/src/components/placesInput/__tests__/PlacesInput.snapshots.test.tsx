import { render } from '@testing-library/react-native';

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

describe('PlacesInput Snapshots', () => {
  const mockGoogleApiKey = 'test-api-key';

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('should match snapshot with basic props', () => {
    const tree = render(<PlacesInput googleApiKey={mockGoogleApiKey} />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with placeholder', () => {
    const tree = render(
      <PlacesInput googleApiKey={mockGoogleApiKey} inputProps={{ placeholder: 'Search for a location' }} />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with country restrictions', () => {
    const tree = render(<PlacesInput googleApiKey={mockGoogleApiKey} queryCountries={['US', 'CA', 'GB']} />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom styling', () => {
    const tree = render(
      <PlacesInput
        googleApiKey={mockGoogleApiKey}
        className="custom-class"
        style={{ backgroundColor: '#fff', margin: 16 }}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with all props combined', () => {
    const tree = render(
      <PlacesInput
        googleApiKey={mockGoogleApiKey}
        queryCountries={['US', 'CA']}
        selectedValue="locality"
        clearQueryOnSelect
        requiredCharactersBeforeSearch={3}
        requiredTimeBeforeSearch={500}
        defaultOpen={false}
        inputProps={{
          placeholder: 'Enter your full address',
          size: 'md',
        }}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
