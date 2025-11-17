import { render } from '@testing-library/react-native';

// Mock NativeWind detector before importing components
jest.mock('../../../utils/hybrid/nativewindDetector', () => ({
  isNativeWindInstalled: jest.fn(() => false),
  resetNativeWindDetection: jest.fn(),
}));

import InputDropdown from '../components/InputDropdown.hybrid';

// Mocks simples
jest.mock('../styles/InputDropdownBase.ss.styles', () => ({
  styles: {},
}));

jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  styleHandler: jest.fn(() => ({})),
  debounce: jest.fn(fn => {
    const debounced = (...args: any[]) => fn(...args);
    debounced.cancel = jest.fn();
    return debounced;
  }),
  sv: jest.fn(config => (options?: any) => {
    const styles = {} as any;
    if (config.base) {
      Object.assign(styles, config.base);
    }
    if (config.variants && options) {
      Object.keys(config.variants).forEach(key => {
        if (options[key] && config.variants[key][options[key]]) {
          Object.assign(styles, config.variants[key][options[key]]);
        }
      });
    }
    return styles;
  }),
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

jest.mock('../../../components/string', () => ({
  String: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../components/InputDropdownList.hybrid', () => ({
  __esModule: true,
  default: ({ data }: any) => (
    <div>
      {data?.map((item: any, index: number) => (
        <div key={index}>{item.label || item.name || item}</div>
      ))}
    </div>
  ),
}));

describe('InputDropdown Component Snapshots', () => {
  const mockData = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
  ];

  it('should match snapshot for basic dropdown', () => {
    const tree = render(<InputDropdown visible data={mockData} onSelectItem={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for dropdown with search', () => {
    const tree = render(
      <InputDropdown
        visible
        data={mockData}
        hasSearch
        searchInputProps={{ placeholder: 'Search options' }}
        onSelectItem={jest.fn()}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for dropdown with loading', () => {
    const tree = render(<InputDropdown visible data={[]} isLoading onSelectItem={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for dropdown with empty state', () => {
    const tree = render(<InputDropdown visible data={[]} emptyText="No options available" onSelectItem={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for dropdown with all props', () => {
    const tree = render(
      <InputDropdown
        visible
        data={mockData}
        hasSearch
        hasAnimation
        hasShadow
        maxHeight={300}
        minHeight={50}
        className="custom-dropdown"
        emptyText="No items"
        onSelectItem={jest.fn()}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for hidden dropdown', () => {
    const tree = render(<InputDropdown visible={false} data={mockData} onSelectItem={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });
});
