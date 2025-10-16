import { render } from '@testing-library/react-native';

import InputDropdown from '../components/InputDropdown.ss';

// Mocks simples
jest.mock('../styles/InputDropdownBase.ss.styles', () => ({
  styles: {},
}));

jest.mock('../../../components/box', () => ({
  BoxSs: ({ children }: any) => children,
}));

jest.mock('../../../components/input', () => ({
  InputSs: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../../components/animatedBox', () => ({
  AnimatedBoxSs: ({ children }: any) => children,
}));

jest.mock('../components/InputDropdownBase.ss', () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}));

jest.mock('../components/InputDropdownList.ss', () => ({
  __esModule: true,
  default: ({ data }: any) => (
    <div>
      {data?.map((item: any, index: number) => (
        <div key={index}>{item.label || item.name || item}</div>
      ))}
    </div>
  ),
}));

describe('InputDropdown Component (StyleSheet)', () => {
  it('should render dropdown with data', () => {
    const mockData = [
      { id: 1, label: 'Option 1' },
      { id: 2, label: 'Option 2' },
    ];

    const { root } = render(<InputDropdown visible data={mockData} onSelectItem={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should render without crashing', () => {
    const { root } = render(<InputDropdown visible={false} data={[]} onSelectItem={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should handle visible prop', () => {
    const mockData = [{ id: 1, label: 'Option 1' }];
    const { root } = render(<InputDropdown visible data={mockData} onSelectItem={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should handle empty data', () => {
    const { root } = render(<InputDropdown visible data={[]} onSelectItem={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should handle props without crashing', () => {
    const mockData = [{ id: 1, label: 'Test' }];
    const { root } = render(
      <InputDropdown
        visible
        data={mockData}
        onSelectItem={jest.fn()}
        hasAnimation
        hasShadow
        maxHeight={300}
        minHeight={50}
        hasSearch
        isLoading={false}
        emptyText="No options"
        style={{ backgroundColor: 'white' }}
      />,
    );
    expect(root).toBeTruthy();
  });
});
