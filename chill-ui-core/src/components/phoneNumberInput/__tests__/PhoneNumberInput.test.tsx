import { render } from '@testing-library/react-native';

import { PhoneNumberInput } from '../components/PhoneNumberInput';

// Mocks simples
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  styleHandler: jest.fn(() => ({})),
}));

jest.mock('../../../components/box', () => ({
  Box: ({ children }: any) => children,
}));

jest.mock('../../../components/input', () => ({
  Input: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../../components/string', () => ({
  String: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  Icon: ({ name, onPress }: any) => {
    function MockIcon() {
      return <div data-testid={`icon-${name}`} onClick={onPress} />;
    }
    return <MockIcon />;
  },
}));

jest.mock('../../../components/inputDropdown', () => ({
  InputDropdownModal: ({ children }: any) => <div>{children}</div>,
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

jest.mock('../styles/PhoneNumberInput.tw.styles', () => ({
  twStyles: {},
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
    {
      code: 'GB',
      dial_code: '+44',
      en: 'United Kingdom',
      fr: 'Royaume-Uni',
      id: 'GB',
    },
  ],
}));

describe('PhoneNumberInput Component (Hybrid)', () => {
  it('should render without crashing', () => {
    const { root } = render(<PhoneNumberInput onPhoneNumberChange={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render with basic props', () => {
    const { root } = render(
      <PhoneNumberInput placeholder="Enter your phone number" defaultCountry="US" onPhoneNumberChange={jest.fn()} />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with allowed countries', () => {
    const { root } = render(<PhoneNumberInput allowedCountries={['US', 'FR']} onPhoneNumberChange={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render with language support', () => {
    const { root } = render(<PhoneNumberInput language="fr" onPhoneNumberChange={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render with validation', () => {
    const { root } = render(
      <PhoneNumberInput hasErrorOnChange errorMessage="Invalid phone number" onPhoneNumberChange={jest.fn()} />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with dropdown position', () => {
    const { root: auto } = render(<PhoneNumberInput dropdownPosition="auto" onPhoneNumberChange={jest.fn()} />);
    expect(auto).toBeTruthy();

    const { root: top } = render(<PhoneNumberInput dropdownPosition="top" onPhoneNumberChange={jest.fn()} />);
    expect(top).toBeTruthy();

    const { root: bottom } = render(<PhoneNumberInput dropdownPosition="bottom" onPhoneNumberChange={jest.fn()} />);
    expect(bottom).toBeTruthy();
  });

  it('should render with custom input props', () => {
    const { root } = render(
      <PhoneNumberInput
        inputProps={{
          placeholder: 'Custom placeholder',
          size: 'lg',
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom dropdown props', () => {
    const { root } = render(
      <PhoneNumberInput
        dropdownProps={{
          maxHeight: 300,
          minHeight: 150,
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with controlled mode', () => {
    const { root } = render(<PhoneNumberInput open={false} onOpenChange={jest.fn()} onPhoneNumberChange={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render with uncontrolled mode', () => {
    const { root } = render(<PhoneNumberInput defaultOpen onPhoneNumberChange={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render with callbacks', () => {
    const onBlurMock = jest.fn();
    const onFocusMock = jest.fn();
    const onCountryChangeMock = jest.fn();
    const onErrorMock = jest.fn();
    const onPhoneNumberChangeMock = jest.fn();
    const onOpenChangeMock = jest.fn();

    const { root } = render(
      <PhoneNumberInput
        onBlur={onBlurMock}
        onFocus={onFocusMock}
        onCountryChange={onCountryChangeMock}
        onError={onErrorMock}
        onPhoneNumberChange={onPhoneNumberChangeMock}
        onOpenChange={onOpenChangeMock}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with value', () => {
    const { root } = render(<PhoneNumberInput value="1234567890" onPhoneNumberChange={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render with disabled state', () => {
    const { root } = render(<PhoneNumberInput inputProps={{ isDisabled: true }} onPhoneNumberChange={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render with all optional props', () => {
    const { root } = render(
      <PhoneNumberInput
        allowedCountries={['US', 'FR', 'GB']}
        customDropdownItem={jest.fn()}
        defaultCountry="US"
        defaultOpen={false}
        dropdownPosition="auto"
        dropdownProps={{ hasSearch: true }}
        errorMessage="Invalid phone number"
        hasError={false}
        hasErrorOnChange
        inputProps={{ placeholder: 'Custom input' }}
        language="en"
        maxHeight={340}
        minHeight={0}
        offsetX={0}
        offsetY={5}
        onBlur={jest.fn()}
        onCountryChange={jest.fn()}
        onError={jest.fn()}
        onFocus={jest.fn()}
        onOpenChange={jest.fn()}
        onPhoneNumberChange={jest.fn()}
        open={false}
        placeholder="Enter your phone number"
        searchInputProps={{ placeholder: 'Search...' }}
        value="1234567890"
      />,
    );
    expect(root).toBeTruthy();
  });
});
