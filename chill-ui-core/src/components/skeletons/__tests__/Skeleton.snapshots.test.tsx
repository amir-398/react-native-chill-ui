import React from 'react';
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

describe('Skeleton Snapshots', () => {
  it('should match snapshot with basic props', () => {
    const tree = render(<Skeleton />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with rectangle variant', () => {
    const tree = render(<Skeleton variant="rectangle" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with circle variant', () => {
    const tree = render(<Skeleton variant="circle" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with square variant', () => {
    const tree = render(<Skeleton variant="square" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with text variant', () => {
    const tree = render(<Skeleton variant="text" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with xs size', () => {
    const tree = render(<Skeleton size="xs" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with sm size', () => {
    const tree = render(<Skeleton size="sm" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with md size', () => {
    const tree = render(<Skeleton size="md" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with lg size', () => {
    const tree = render(<Skeleton size="lg" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with xl size', () => {
    const tree = render(<Skeleton size="xl" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom className', () => {
    const tree = render(<Skeleton className="custom-class" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom style', () => {
    const tree = render(<Skeleton style={{ marginBottom: 8 }} />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with accessibility props', () => {
    const tree = render(<Skeleton accessible accessibilityLabel="Loading skeleton" testID="skeleton" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with all props combined', () => {
    const tree = render(
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
    expect(tree).toMatchSnapshot();
  });
});
