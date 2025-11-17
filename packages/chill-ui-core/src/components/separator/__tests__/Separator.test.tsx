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

describe('Separator Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render basic separator correctly', () => {
    const { getByTestId } = render(<Separator />);
    expect(getByTestId('box')).toBeTruthy();
  });

  it('should render with custom className', () => {
    const { getByTestId } = render(<Separator className="custom-class" />);
    expect(getByTestId('box')).toBeTruthy();
  });

  it('should render with custom style', () => {
    const { getByTestId } = render(<Separator style={{ backgroundColor: 'blue', height: 2 }} />);
    expect(getByTestId('box')).toBeTruthy();
  });

  it('should render with both className and style', () => {
    const { getByTestId } = render(<Separator className="custom-class" style={{ height: 3 }} />);
    expect(getByTestId('box')).toBeTruthy();
  });

  it('should render with accessibility props', () => {
    const { getByTestId } = render(<Separator accessible accessibilityLabel="Content separator" testID="separator" />);
    expect(getByTestId('separator')).toBeTruthy();
  });

  it('should render with onLayout prop', () => {
    const onLayoutMock = jest.fn();
    const { getByTestId } = render(<Separator onLayout={onLayoutMock} />);
    expect(getByTestId('box')).toBeTruthy();
  });

  it('should render with margin styles', () => {
    const { getByTestId } = render(<Separator style={{ marginHorizontal: 8, marginVertical: 16 }} />);
    expect(getByTestId('box')).toBeTruthy();
  });

  it('should render with custom height and color', () => {
    const { getByTestId } = render(<Separator style={{ backgroundColor: '#3B82F6', height: 2 }} />);
    expect(getByTestId('box')).toBeTruthy();
  });

  it('should render with all props combined', () => {
    const onLayoutMock = jest.fn();
    const { getByTestId } = render(
      <Separator
        className="custom-separator"
        style={{
          backgroundColor: '#EF4444',
          borderRadius: 1,
          height: 2,
          marginVertical: 12,
          opacity: 0.8,
        }}
        accessible
        accessibilityLabel="Custom separator"
        testID="custom-separator"
        onLayout={onLayoutMock}
      />,
    );
    expect(getByTestId('custom-separator')).toBeTruthy();
  });

  it('should render with no children', () => {
    const { getByTestId } = render(<Separator />);
    const box = getByTestId('box');
    expect(box).toBeTruthy();
    expect(box.children).toHaveLength(0);
  });
});
