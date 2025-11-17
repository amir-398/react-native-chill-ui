import { render } from '@testing-library/react-native';

import { PhoneNumberInput } from '../components/PhoneNumberInput.ss';

// Mocks simples
jest.mock('../../../utils', () => ({
  styleHandler: jest.fn(() => ({})),
}));

jest.mock('../../../components/box', () => ({
  BoxSs: ({ children }: any) => children,
}));

jest.mock('../../../components/input', () => ({
  InputSs: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../../components/string', () => ({
  StringSs: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  IconSs: ({ name, onPress }: any) => {
    function MockIcon() {
      return <div data-testid={`icon-${name}`} onClick={onPress} />;
    }
    return <MockIcon />;
  },
}));

jest.mock('../../../components/inputDropdown', () => ({
  InputDropdownModalSs: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../inputSelectDropdown/hooks', () => ({
  useInputSelectDropdown: jest.fn(() => ({
    dropdownRef: { current: null },
    dropdownStyles: {},
    handleSelectItem: jest.fn(),
    inputRef: { current: null },
    setSearchText: jest.fn(),
    state: {
      currentValue: null,
      listData: [],
      searchText: '',
      visible: false,
    },
    toggleDropdown: jest.fn(),
    wrapperRef: { current: null },
  })),
}));

jest.mock('../styles/PhoneNumberInput.ss.styles', () => ({
  styles: {},
}));

jest.mock('../utils/defaultProps', () => ({
  phoneNumberInputDefaultProps: {
    defaultCountry: 'US',
    defaultErrorMessage: 'the phone number is invalid',
    defaultLanguage: 'en',
    defaultOpen: false,
    dropdownPosition: 'auto',
    dropdownProps: { hasSearch: true },
    hasErrorOnChange: true,
    inputPlaceholder: 'Enter your phone number',
    inputSearchPlaceholder: 'Search a country...',
    itemAsClickable: 'touchable-opacity',
    maxHeight: 340,
    minHeight: 0,
    offsetY: 5,
  },
}));

jest.mock('../utils/phone', () => ({
  applyMaskPhoneNumber: jest.fn((_countryCode, phoneNumber) => phoneNumber),
  getPhoneNumberWithSuffix: jest.fn((_countryCode, phoneNumber) => phoneNumber),
  isValidNumber: jest.fn(() => true),
}));

jest.mock('../flags', () => ({
  fr: 'fr-flag.png',
  gb: 'gb-flag.png',
  us: 'us-flag.png',
}));

jest.mock('../utils/countryCodes', () => ({
  countryCodes: [
    {
      code: 'US',
      dial_code: '+1',
      en: 'United States',
      fr: 'États-Unis',
      id: 'US',
    },
    {
      code: 'FR',
      dial_code: '+33',
      en: 'France',
      fr: 'France',
      id: 'FR',
    },
  ],
}));

describe('PhoneNumberInput Component (StyleSheet)', () => {
  it('should render without crashing', () => {
    const { root } = render(<PhoneNumberInput onPhoneNumberChange={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render with StyleSheet styles', () => {
    const { root } = render(
      <PhoneNumberInput
        inputProps={{
          style: { backgroundColor: '#FFFFFF' },
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom dropdown item using StyleSheet', () => {
    const customDropdownItem = jest.fn(country => (
      <div style={{ alignItems: 'center', flexDirection: 'row', gap: 8 }}>
        <div style={{ height: 16, width: 24 }}>{country.en}</div>
        <div style={{ color: '#666' }}>{country.dial_code}</div>
      </div>
    ));

    const { root } = render(
      <PhoneNumberInput customDropdownItem={customDropdownItem} onPhoneNumberChange={jest.fn()} />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with StyleSheet styling props', () => {
    const { root } = render(
      <PhoneNumberInput
        inputProps={{
          style: {
            backgroundColor: '#FFFFFF',
            borderColor: '#D1D5DB',
            borderRadius: 8,
          },
        }}
        dropdownProps={{
          style: {
            backgroundColor: '#FFFFFF',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { height: 2, width: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with error styling using StyleSheet', () => {
    const { root } = render(
      <PhoneNumberInput
        errorMessage="Invalid phone number"
        inputProps={{
          style: {
            borderColor: '#EF4444',
            borderWidth: 2,
          },
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with different sizes using StyleSheet', () => {
    const { root: small } = render(
      <PhoneNumberInput
        inputProps={{
          style: {
            fontSize: 14,
            paddingVertical: 8,
          },
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(small).toBeTruthy();

    const { root: large } = render(
      <PhoneNumberInput
        inputProps={{
          style: {
            fontSize: 18,
            paddingVertical: 14,
          },
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(large).toBeTruthy();
  });

  it('should render with custom flag styling using StyleSheet', () => {
    const { root } = render(
      <PhoneNumberInput
        customDropdownItem={country => (
          <div style={{ alignItems: 'center', flexDirection: 'row', gap: 12, padding: 8 }}>
            <div
              style={{
                borderColor: '#D9D9D9',
                borderRadius: 4,
                borderWidth: 1,
                height: 24,
                width: 32,
              }}
            >
              {country.en}
            </div>
          </div>
        )}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with responsive StyleSheet styles', () => {
    const { root } = render(
      <PhoneNumberInput
        inputProps={{
          style: {
            maxWidth: 400,
            minWidth: 200,
            width: '100%',
          },
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with dark mode StyleSheet styles', () => {
    const { root } = render(
      <PhoneNumberInput
        inputProps={{
          style: {
            backgroundColor: '#1F2937',
            borderColor: '#374151',
            color: '#FFFFFF',
          },
        }}
        dropdownProps={{
          style: {
            backgroundColor: '#1F2937',
            borderColor: '#374151',
          },
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom font styles', () => {
    const { root } = render(
      <PhoneNumberInput
        inputProps={{
          style: {
            fontFamily: 'System',
            fontWeight: '600',
            letterSpacing: 0.5,
          },
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom animation styles', () => {
    const { root } = render(
      <PhoneNumberInput
        inputProps={{
          style: {
            opacity: 0.9,
            transform: [{ scale: 1.02 }],
          },
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });
});
