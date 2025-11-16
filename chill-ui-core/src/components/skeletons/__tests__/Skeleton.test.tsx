import { render } from '@testing-library/react-native';

import { Skeleton } from '../components/Skeleton';

// Mock Animated
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Animated.timing = () => ({
    start: () => {},
  });
  return RN;
});

describe('Skeleton Component', () => {
  it('should render basic skeleton correctly', () => {
    const { getByTestId } = render(<Skeleton testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with rectangle variant', () => {
    const { getByTestId } = render(<Skeleton variant="rectangle" testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with circle variant', () => {
    const { getByTestId } = render(<Skeleton variant="circle" testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with square variant', () => {
    const { getByTestId } = render(<Skeleton variant="square" testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with text variant', () => {
    const { getByTestId } = render(<Skeleton variant="text" testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with xs size', () => {
    const { getByTestId } = render(<Skeleton size="xs" testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with sm size', () => {
    const { getByTestId } = render(<Skeleton size="sm" testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with md size', () => {
    const { getByTestId } = render(<Skeleton size="md" testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with lg size', () => {
    const { getByTestId } = render(<Skeleton size="lg" testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with xl size', () => {
    const { getByTestId } = render(<Skeleton size="xl" testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with custom className', () => {
    const { getByTestId } = render(<Skeleton className="custom-class" testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with custom style', () => {
    const { getByTestId } = render(<Skeleton style={{ marginBottom: 8 }} testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with both className and style', () => {
    const { getByTestId } = render(<Skeleton className="custom-class" style={{ marginBottom: 8 }} testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with children', () => {
    const { getByTestId } = render(
      <Skeleton testID="skeleton">
        <Skeleton testID="child-skeleton" />
      </Skeleton>,
    );
    expect(getByTestId('skeleton')).toBeTruthy();
    expect(getByTestId('child-skeleton')).toBeTruthy();
  });

  it('should render with testID', () => {
    const { getByTestId } = render(<Skeleton testID="skeleton-test" />);
    expect(getByTestId('skeleton-test')).toBeTruthy();
  });

  it('should render with accessibility props', () => {
    const { getByTestId } = render(<Skeleton accessible accessibilityLabel="Loading skeleton" testID="skeleton" />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with all props combined', () => {
    const { getByTestId } = render(
      <Skeleton
        variant="circle"
        size="lg"
        className="custom-class"
        style={{ marginBottom: 16 }}
        testID="skeleton"
        accessible
        accessibilityLabel="Custom skeleton"
      />,
    );
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render with no children', () => {
    const { getByTestId } = render(<Skeleton testID="skeleton" />);
    const skeleton = getByTestId('skeleton');
    expect(skeleton).toBeTruthy();
  });
});
