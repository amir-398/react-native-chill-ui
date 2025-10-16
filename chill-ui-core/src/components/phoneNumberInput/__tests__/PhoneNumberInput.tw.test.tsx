import { render } from '@testing-library/react-native';

import { PhoneNumberInput } from '../components/PhoneNumberInput.tw';

// Mocks simples
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

jest.mock('../../../components/box', () => ({
  BoxTw: ({ children }: any) => children,
}));

jest.mock('../../../components/input', () => ({
  InputTw: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../../components/string', () => ({
  StringTw: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  IconTw: ({ name, onPress }: any) => {
    function MockIcon() {
      return <div data-testid={`icon-${name}`} onClick={onPress} />;
    }
    return <MockIcon />;
  },
}));

jest.mock('../../../components/inputDropdown', () => ({
  InputDropdownModalTw: ({ children }: any) => <div>{children}</div>,
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
  ],
}));

describe('PhoneNumberInput Component (Tailwind)', () => {
  it('should render without crashing', () => {
    const { root } = render(<PhoneNumberInput onPhoneNumberChange={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render with Tailwind classes', () => {
    const { root } = render(
      <PhoneNumberInput
        inputProps={{
          className: 'custom-input-class',
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom dropdown item using Tailwind', () => {
    const customDropdownItem = jest.fn(country => (
      <div className="flex-row items-center gap-2 p-2">
        <div className="h-4 w-6">{country.en}</div>
        <div className="text-gray-500">{country.dial_code}</div>
      </div>
    ));

    const { root } = render(
      <PhoneNumberInput customDropdownItem={customDropdownItem} onPhoneNumberChange={jest.fn()} />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with Tailwind styling props', () => {
    const { root } = render(
      <PhoneNumberInput
        inputProps={{
          className: 'w-full bg-white border border-gray-300',
          size: 'lg',
        }}
        dropdownProps={{
          className: 'bg-white shadow-lg',
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with error styling using Tailwind', () => {
    const { root } = render(
      <PhoneNumberInput
        hasError
        errorMessage="Invalid phone number"
        inputProps={{
          className: 'border-red-500',
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with different sizes using Tailwind', () => {
    const { root: small } = render(<PhoneNumberInput inputProps={{ size: 'sm' }} onPhoneNumberChange={jest.fn()} />);
    expect(small).toBeTruthy();

    const { root: large } = render(<PhoneNumberInput inputProps={{ size: 'lg' }} onPhoneNumberChange={jest.fn()} />);
    expect(large).toBeTruthy();
  });

  it('should render with custom flag styling using Tailwind', () => {
    const { root } = render(
      <PhoneNumberInput
        customDropdownItem={country => (
          <div className="flex-row items-center gap-3 p-2">
            <div className="h-6 w-8 rounded border border-gray-200">{country.en}</div>
          </div>
        )}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with responsive Tailwind classes', () => {
    const { root } = render(
      <PhoneNumberInput
        inputProps={{
          className: 'w-full md:w-1/2 lg:w-1/3',
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with dark mode Tailwind classes', () => {
    const { root } = render(
      <PhoneNumberInput
        inputProps={{
          className: 'bg-gray-800 text-white border-gray-600',
        }}
        dropdownProps={{
          className: 'bg-gray-800 text-white',
        }}
        onPhoneNumberChange={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });
});
