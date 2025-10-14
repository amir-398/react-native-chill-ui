import { render } from '@testing-library/react-native';

import InputDropdown from '../components/InputDropdown';

// Mocks simples
jest.mock('../styles/InputDropdownBase.ss.styles', () => ({
  styles: {},
}));

jest.mock('../../../utils', () => ({
  classNamePropsHandler: jest.fn(),
  classNameHandler: jest.fn(() => ({})),
  styleHandler: jest.fn(() => ({})),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

jest.mock('../../../components/box', () => ({
  Box: ({ children }: any) => children,
}));

jest.mock('../../../components/input', () => ({
  Input: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('../../../components/animatedBox', () => ({
  AnimatedBox: ({ children }: any) => children,
}));

jest.mock('../components/InputDropdownBase', () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}));

jest.mock('../components/InputDropdownList', () => ({
  __esModule: true,
  default: ({ data }: any) => (
    <div>
      {data?.map((item: any, index: number) => (
        <div key={index}>{item.label || item.name || item}</div>
      ))}
    </div>
  ),
}));

describe('InputDropdown Component (Hybrid)', () => {
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
    const { root } = render(<InputDropdown visible={true} data={mockData} onSelectItem={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should handle empty data', () => {
    const { root } = render(<InputDropdown visible={true} data={[]} onSelectItem={jest.fn()} />);
    expect(root).toBeTruthy();
  });

  it('should handle props without crashing', () => {
    const mockData = [{ id: 1, label: 'Test' }];
    const { root } = render(
      <InputDropdown
        visible={true}
        data={mockData}
        onSelectItem={jest.fn()}
        hasAnimation={true}
        hasShadow={true}
        maxHeight={300}
        minHeight={50}
        hasSearch={true}
        isLoading={false}
        emptyText="No options"
        className="test-class"
      />,
    );
    expect(root).toBeTruthy();
  });
});
