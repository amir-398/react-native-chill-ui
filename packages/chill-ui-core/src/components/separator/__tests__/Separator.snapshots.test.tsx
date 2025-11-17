import { render } from '@testing-library/react-native';

import { Separator } from '../components/Separator.hybrid.tsx';

// Mock utils
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  styleHandler: jest.fn(() => ({})),
}));

// Mock Box
jest.mock('../../../components/box', () => ({
  Box: ({ children, ...props }: any) => {
    const { View: ReactNativeView } = require('react-native');
    return (
      <ReactNativeView testID="box" {...props}>
        {children}
      </ReactNativeView>
    );
  },
}));

describe('Separator Snapshots', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot with basic props', () => {
    const tree = render(<Separator />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom className', () => {
    const tree = render(<Separator className="h-0.5 bg-gray-300" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom style', () => {
    const tree = render(<Separator style={{ backgroundColor: '#3B82F6', height: 2 }} />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with thick separator', () => {
    const tree = render(<Separator style={{ backgroundColor: '#10B981', height: 4 }} />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom color', () => {
    const tree = render(<Separator style={{ backgroundColor: '#EF4444' }} />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom styling', () => {
    const tree = render(
      <Separator
        style={{
          backgroundColor: '#8B5CF6',
          borderRadius: 1,
          height: 2,
          marginVertical: 8,
        }}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with accessibility props', () => {
    const tree = render(<Separator accessible accessibilityLabel="Content separator" testID="separator" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with all props combined', () => {
    const tree = render(
      <Separator
        className="custom-separator"
        style={{
          backgroundColor: '#F59E0B',
          borderRadius: 1,
          height: 2,
          marginVertical: 12,
          opacity: 0.8,
        }}
        accessible
        accessibilityLabel="Custom separator"
        testID="custom-separator"
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
