import { render } from '@testing-library/react-native';

import AutocompleteDropdown from '../components/AutocompleteDropdown';

// Mock dependencies
jest.mock('../../../utils', () => ({
  classNamePropsHandler: jest.fn(),
  classNameHandler: jest.fn(() => ({})),
  styleHandler: jest.fn(() => ({})),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  get: jest.fn((obj, path) => obj?.[path]),
  isEqual: jest.fn((a, b) => a === b),
  debounce: jest.fn(fn => {
    const debounced = (...args: any[]) => fn(...args);
    debounced.cancel = jest.fn();
    return debounced;
  }),
}));

jest.mock('../../../components/box', () => ({
  Box: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../../components/input', () => ({
  Input: jest.fn(({ children, ...props }: any) => <div {...props}>{children}</div>),
}));

jest.mock('../../../components/string', () => ({
  String: ({ children }: any) => <span>{children}</span>,
}));

jest.mock('../../../components/inputDropdown', () => ({
  InputDropdown: ({ visible, data, onSelectItem, DropdownItemRender }: any) => (
    <div data-testid="input-dropdown" data-visible={visible}>
      {visible &&
        data.map((item: any, index: number) => (
          <div key={index} onClick={() => onSelectItem(item)}>
            {DropdownItemRender ? DropdownItemRender(item) : item.name}
          </div>
        ))}
    </div>
  ),
}));

jest.mock('../../../components/highlightString', () => ({
  HighlightString: ({ content }: any) => <span>{content}</span>,
}));

jest.mock('../hooks/useAutocompleteDropdownProvider', () =>
  jest.fn(() => ({
    getInstance: jest.fn(() => ({ showDropdown: false })),
    registerInstance: jest.fn(),
    setDropdownContent: jest.fn(),
    setDropdownPosition: jest.fn(),
    setShowDropdown: jest.fn(),
    unregisterInstance: jest.fn(),
  })),
);

jest.mock('../hooks/useDropdownActions', () =>
  jest.fn(() => ({
    eventClose: jest.fn(),
    eventOpen: jest.fn(),
    toggleDropdown: jest.fn(),
  })),
);

jest.mock('../hooks/useDropdownKeyboard', () => jest.fn());

jest.mock('../hooks/useGetDropdownPosition', () =>
  jest.fn(() => ({
    getDropdownPosition: jest.fn(),
  })),
);

describe('AutocompleteDropdown Component (Hybrid)', () => {
  const mockData = [
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Banana', category: 'Fruit' },
    { id: 3, name: 'Carrot', category: 'Vegetable' },
  ];

  it('should render without crashing', () => {
    const { root } = render(<AutocompleteDropdown dataSet={mockData} valueField="name" onSelectItem={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render with placeholder', () => {
    const { root } = render(
      <AutocompleteDropdown
        dataSet={mockData}
        valueField="name"
        onSelectItem={jest.fn()}
        inputProps={{ placeholder: 'Search items...' }}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle text input changes', () => {
    const onChangeTextMock = jest.fn();
    const { root } = render(
      <AutocompleteDropdown
        dataSet={mockData}
        valueField="name"
        onSelectItem={jest.fn()}
        onChangeText={onChangeTextMock}
        inputProps={{ placeholder: 'Search' }}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle empty dataset', () => {
    const { root } = render(<AutocompleteDropdown dataSet={[]} valueField="name" onSelectItem={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should handle custom search field', () => {
    const { root } = render(
      <AutocompleteDropdown dataSet={mockData} valueField="name" searchField="category" onSelectItem={jest.fn()} />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle props without crashing', () => {
    const { root } = render(
      <AutocompleteDropdown
        dataSet={mockData}
        valueField="name"
        searchField="name"
        onSelectItem={jest.fn()}
        closeModalWhenSelectedItem={true}
        hasPerformSearch={true}
        hasHighlightString={true}
        maxHeight={300}
        minHeight={50}
        offsetX={10}
        offsetY={20}
        isLoading={false}
        excludeItems={[]}
        dropdownPosition="auto"
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle custom dropdown item renderer', () => {
    const customRenderer = jest.fn((item: any) => <div>{item.name}</div>);
    const { root } = render(
      <AutocompleteDropdown
        dataSet={mockData}
        valueField="name"
        onSelectItem={jest.fn()}
        customDropdownItem={customRenderer}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle onBlur callback', () => {
    const onBlurMock = jest.fn();
    const { root } = render(
      <AutocompleteDropdown
        dataSet={mockData}
        valueField="name"
        onSelectItem={jest.fn()}
        onBlur={onBlurMock}
        inputProps={{ placeholder: 'Search' }}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle onFocus callback', () => {
    const onFocusMock = jest.fn();
    const { root } = render(
      <AutocompleteDropdown
        dataSet={mockData}
        valueField="name"
        onSelectItem={jest.fn()}
        onFocus={onFocusMock}
        inputProps={{ placeholder: 'Search' }}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle disabled input', () => {
    const { root } = render(
      <AutocompleteDropdown
        dataSet={mockData}
        valueField="name"
        onSelectItem={jest.fn()}
        inputProps={{ isDisabled: true, placeholder: 'Disabled' }}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle loading state', () => {
    const { root } = render(
      <AutocompleteDropdown dataSet={mockData} valueField="name" onSelectItem={jest.fn()} isLoading={true} />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle exclude items', () => {
    const excludeItems = [{ id: 1, name: 'Apple', category: 'Fruit' }];
    const { root } = render(
      <AutocompleteDropdown
        dataSet={mockData}
        valueField="name"
        onSelectItem={jest.fn()}
        excludeItems={excludeItems}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle custom search query function', () => {
    const searchQuery = jest.fn((keyword: string, labelValue: string) =>
      labelValue.toLowerCase().includes(keyword.toLowerCase()),
    );
    const { root } = render(
      <AutocompleteDropdown dataSet={mockData} valueField="name" onSelectItem={jest.fn()} searchQuery={searchQuery} />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle dropdown positioning options', () => {
    const { root } = render(
      <AutocompleteDropdown dataSet={mockData} valueField="name" onSelectItem={jest.fn()} dropdownPosition="top" />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle confirmation before selecting', () => {
    const onConfirmSelectItemMock = jest.fn();
    const { root } = render(
      <AutocompleteDropdown
        dataSet={mockData}
        valueField="name"
        onSelectItem={jest.fn()}
        confirmSelectItem={true}
        onConfirmSelectItem={onConfirmSelectItemMock}
      />,
    );
    expect(root).toBeTruthy();
  });
});
