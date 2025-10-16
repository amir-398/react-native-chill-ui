import { render } from '@testing-library/react-native';

import { AutocompleteDropdownSs as AutocompleteDropdown } from '../index';

// Mock dependencies with StyleSheet suffixes
jest.mock('../../../utils', () => ({
  debounce: jest.fn(fn => {
    const debounced = (...args: any[]) => fn(...args);
    debounced.cancel = jest.fn();
    return debounced;
  }),
  get: jest.fn((obj, path) => obj?.[path]),
  isEqual: jest.fn((a, b) => a === b),
}));

jest.mock('../../../components/box', () => ({
  BoxSs: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../../components/input', () => ({
  InputSs: jest.fn(({ children, ...props }: any) => <div {...props}>{children}</div>),
}));

jest.mock('../../../components/string', () => ({
  StringSs: ({ children }: any) => <span>{children}</span>,
}));

jest.mock('../../../components/inputDropdown', () => ({
  InputDropdownSs: ({ data, DropdownItemRender, onSelectItem, visible }: any) => (
    <div data-testid="input-dropdown" data-visible={visible}>
      {visible &&
        data.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => onSelectItem(item)}
            onKeyDown={() => onSelectItem(item)}
            role="button"
            tabIndex={0}
          >
            {DropdownItemRender ? DropdownItemRender(item) : item.name}
          </div>
        ))}
    </div>
  ),
}));

jest.mock('../../../components/highlightString', () => ({
  HighlightStringSs: ({ content }: any) => <span>{content}</span>,
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

describe('AutocompleteDropdown Component (StyleSheet)', () => {
  const mockData = [
    { category: 'Fruit', id: 1, name: 'Apple' },
    { category: 'Fruit', id: 2, name: 'Banana' },
    { category: 'Vegetable', id: 3, name: 'Carrot' },
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

  it('should handle props with style', () => {
    const { root } = render(
      <AutocompleteDropdown
        dataSet={mockData}
        valueField="name"
        onSelectItem={jest.fn()}
        inputProps={{ style: { backgroundColor: 'white' } }}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle custom search field', () => {
    const { root } = render(
      <AutocompleteDropdown dataSet={mockData} valueField="name" searchField="category" onSelectItem={jest.fn()} />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle loading state', () => {
    const { root } = render(
      <AutocompleteDropdown dataSet={mockData} valueField="name" onSelectItem={jest.fn()} isLoading />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle dropdown item props with style', () => {
    const { root } = render(
      <AutocompleteDropdown
        dataSet={mockData}
        valueField="name"
        onSelectItem={jest.fn()}
        dropdownItemProps={{ activeBackgroundColor: '#f0f0f0' }}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle highlight string props', () => {
    const { root } = render(
      <AutocompleteDropdown
        dataSet={mockData}
        valueField="name"
        onSelectItem={jest.fn()}
        hasHighlightString
        highlightProps={{ highlightTerm: 'App' }}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle all props without crashing', () => {
    const { root } = render(
      <AutocompleteDropdown
        dataSet={mockData}
        valueField="name"
        searchField="name"
        onSelectItem={jest.fn()}
        closeModalWhenSelectedItem
        hasPerformSearch
        hasHighlightString
        maxHeight={300}
        minHeight={50}
        offsetX={10}
        offsetY={20}
        isLoading={false}
        excludeItems={[]}
        dropdownPosition="auto"
        inputProps={{ placeholder: 'Search', style: { backgroundColor: 'white' } }}
        dropdownProps={{ style: { borderRadius: 8 } }}
      />,
    );
    expect(root).toBeTruthy();
  });
});
