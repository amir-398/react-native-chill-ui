import { render } from '@testing-library/react-native';

import { Separator } from '../components/Separator';

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
    const tree = render(<Separator style={{ height: 2, backgroundColor: '#3B82F6' }} />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with thick separator', () => {
    const tree = render(<Separator style={{ height: 4, backgroundColor: '#10B981' }} />);
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
          height: 2,
          backgroundColor: '#8B5CF6',
          marginVertical: 8,
          borderRadius: 1,
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
          height: 2,
          backgroundColor: '#F59E0B',
          marginVertical: 12,
          borderRadius: 1,
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
