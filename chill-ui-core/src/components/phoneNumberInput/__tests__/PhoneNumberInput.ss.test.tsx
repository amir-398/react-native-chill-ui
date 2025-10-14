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
    const MockIcon = () => <div data-testid={`icon-${name}`} onClick={onPress} />;
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
  applyMaskPhoneNumber: jest.fn((countryCode, phoneNumber) => phoneNumber),
  getPhoneNumberWithSuffix: jest.fn((countryCode, phoneNumber) => phoneNumber),
  isValidNumber: jest.fn(() => true),
}));

jest.mock('../flags', () => ({
  us: 'us-flag.png',
  fr: 'fr-flag.png',
  gb: 'gb-flag.png',
}));

jest.mock('../utils/countryCodes', () => ({
  countryCodes: [
    {
      id: 'US',
      code: 'US',
      dial_code: '+1',
      en: 'United States',
      fr: 'États-Unis',
    },
    {
      id: 'FR',
      code: 'FR',
      dial_code: '+33',
      en: 'France',
      fr: 'France',
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
      <div style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
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
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
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
        hasError={true}
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
          <div style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 8 }}>
            <div
              style={{
                height: 24,
                width: 32,
                borderRadius: 4,
                borderColor: '#D9D9D9',
                borderWidth: 1,
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
            width: '100%',
            minWidth: 200,
            maxWidth: 400,
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
            color: '#FFFFFF',
            borderColor: '#374151',
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
            transform: [{ scale: 1.02 }],
            opacity: 0.9,
          },
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });
});
