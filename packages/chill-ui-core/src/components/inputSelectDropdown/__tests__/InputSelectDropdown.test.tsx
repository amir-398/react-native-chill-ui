import { render } from '@testing-library/react-native';

import { InputSelectDropdown } from '../index';

// Mocks
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  get: jest.fn((obj, path) => obj[path]),
  isEqual: jest.fn((a, b) => a === b),
  styleHandler: jest.fn(() => ({})),
}));

jest.mock('../../../components/box', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/input', () => ({
  Input: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/string', () => ({
  String: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/highlightString', () => ({
  HighlightString: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/inputDropdown', () => ({
  InputDropdownModal: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../hooks', () => ({
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

jest.mock('../styles/InputSelectDropdown.ss.styles', () => ({
  styles: { defaultDropdownItemRender: {} },
}));

jest.mock('../styles/InputSelectDropdown.tw.styles', () => ({
  twStyles: { defaultDropdownItemRender: '' },
}));

jest.mock('../utils/defaultProps', () => ({
  inputSelectDropdownDefaultProps: {
    closeModalWhenSelectedItem: true,
    dataSet: [],
    dropdownPosition: 'auto',
    excludeItems: [],
    excludeSearchItems: [],
    hasHighlightString: false,
    hasSearch: false,
    maxHeight: 200,
    minHeight: 100,
    offsetX: 0,
    offsetY: 4,
  },
}));

const mockDataSet = [
  { email: 'john@example.com', id: 1, name: 'John Doe' },
  { email: 'jane@example.com', id: 2, name: 'Jane Smith' },
  { email: 'bob@example.com', id: 3, name: 'Bob Johnson' },
];

describe('InputSelectDropdown Component (Hybrid)', () => {
  it('should render without crashing', () => {
    const { root } = render(<InputSelectDropdown dataSet={mockDataSet} valueField="name" onSelectItem={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render with basic props', () => {
    const onSelectItemMock = jest.fn();
    const { root } = render(
      <InputSelectDropdown dataSet={mockDataSet} valueField="name" onSelectItem={onSelectItemMock} />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with search functionality', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        searchField="email"
        hasSearch
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with highlighting', () => {
    const { root } = render(
      <InputSelectDropdown dataSet={mockDataSet} valueField="name" hasHighlightString onSelectItem={jest.fn()} />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom dropdown item', () => {
    const customDropdownItem = jest.fn((item, _selected) => <div>{item.name}</div>);
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        customDropdownItem={customDropdownItem}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom search input', () => {
    const customSearchInput = <div>Custom Search</div>;
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        customSearchInput={customSearchInput}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with different dropdown positions', () => {
    const { root: auto } = render(
      <InputSelectDropdown dataSet={mockDataSet} valueField="name" dropdownPosition="auto" onSelectItem={jest.fn()} />,
    );
    expect(auto).toBeTruthy();

    const { root: top } = render(
      <InputSelectDropdown dataSet={mockDataSet} valueField="name" dropdownPosition="top" onSelectItem={jest.fn()} />,
    );
    expect(top).toBeTruthy();

    const { root: bottom } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        dropdownPosition="bottom"
        onSelectItem={jest.fn()}
      />,
    );
    expect(bottom).toBeTruthy();
  });

  it('should render with exclude items', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        excludeItems={[mockDataSet[0]]}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with exclude search items', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        excludeSearchItems={[mockDataSet[0]]}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom input props', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        inputProps={{
          isDisabled: true,
          placeholder: 'Custom placeholder',
        }}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom search input props', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        searchInputProps={{
          placeholder: 'Search...',
        }}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with highlight props', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        hasHighlightString
        highlightProps={{
          highlightTerm: 'test',
        }}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with dropdown item props', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        dropdownItemProps={{
          activeBackgroundColor: '#FF0000',
          className: 'custom-class',
        }}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with dropdown props', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        dropdownProps={{
          maxHeight: 300,
          minHeight: 150,
        }}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom search query', () => {
    const searchQuery = jest.fn((keyword, labelValue) => labelValue.includes(keyword));
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        searchQuery={searchQuery}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with offset positioning', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        offsetX={10}
        offsetY={20}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with height constraints', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        maxHeight={400}
        minHeight={200}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with close modal behavior', () => {
    const { root: closeModal } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        closeModalWhenSelectedItem
        onSelectItem={jest.fn()}
      />,
    );
    expect(closeModal).toBeTruthy();

    const { root: keepOpen } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        closeModalWhenSelectedItem={false}
        onSelectItem={jest.fn()}
      />,
    );
    expect(keepOpen).toBeTruthy();
  });

  it('should render with callbacks', () => {
    const onBlurMock = jest.fn();
    const onFocusMock = jest.fn();
    const onSelectItemMock = jest.fn();

    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        onBlur={onBlurMock}
        onFocus={onFocusMock}
        onSelectItem={onSelectItemMock}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with empty dataset', () => {
    const { root } = render(<InputSelectDropdown dataSet={[]} valueField="name" onSelectItem={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render with complex data structure', () => {
    const complexDataSet = [
      { id: 1, user: { profile: { firstName: 'John', lastName: 'Doe' } } },
      { id: 2, user: { profile: { firstName: 'Jane', lastName: 'Smith' } } },
    ];

    const { root } = render(
      <InputSelectDropdown dataSet={complexDataSet} valueField="user.profile.firstName" onSelectItem={jest.fn()} />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with all search features enabled', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        searchField="email"
        hasSearch
        hasHighlightString
        searchInputProps={{ placeholder: 'Search users...' }}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom styling props', () => {
    const { root } = render(<InputSelectDropdown dataSet={mockDataSet} valueField="name" onSelectItem={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render with forwardRef', () => {
    const ref = { current: null };
    const { root } = render(
      <InputSelectDropdown ref={ref} dataSet={mockDataSet} valueField="name" onSelectItem={jest.fn()} />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle controlled input value', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        inputProps={{ value: 'John Doe' }}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with disabled input', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        inputProps={{ isDisabled: true }}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with all optional props', () => {
    const { root } = render(
      <InputSelectDropdown
        dataSet={mockDataSet}
        valueField="name"
        searchField="email"
        hasSearch
        hasHighlightString
        closeModalWhenSelectedItem={false}
        dropdownPosition="top"
        offsetX={5}
        offsetY={10}
        maxHeight={300}
        minHeight={150}
        excludeItems={[mockDataSet[0]]}
        excludeSearchItems={[mockDataSet[1]]}
        customDropdownItem={item => <div>{item.name}</div>}
        customSearchInput={<div>Custom Search</div>}
        inputProps={{ placeholder: 'Select user' }}
        searchInputProps={{ placeholder: 'Search...' }}
        highlightProps={{ highlightTerm: 'test' }}
        dropdownItemProps={{ className: 'custom-item' }}
        searchQuery={(keyword, value) => value.includes(keyword)}
        onBlur={jest.fn()}
        onFocus={jest.fn()}
        onSelectItem={jest.fn()}
      />,
    );
    expect(root).toBeTruthy();
  });
});
