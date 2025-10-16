import React from 'react';
import { render } from '@testing-library/react-native';
import { WrapperSafeAreaView } from '../components/WrapperSafeAreaView';

describe('WrapperSafeAreaView Component', () => {
  it('should render basic safe area view correctly', () => {
    const { getByTestId } = render(<WrapperSafeAreaView testID="safe-area-view">Content</WrapperSafeAreaView>);
    expect(getByTestId('safe-area-view')).toBeTruthy();
  });

  it('should render with fill prop', () => {
    const { getByTestId } = render(
      <WrapperSafeAreaView fill testID="safe-area-view">
        Content
      </WrapperSafeAreaView>,
    );
    expect(getByTestId('safe-area-view')).toBeTruthy();
  });

  it('should render with grow prop', () => {
    const { getByTestId } = render(
      <WrapperSafeAreaView grow testID="safe-area-view">
        Content
      </WrapperSafeAreaView>,
    );
    expect(getByTestId('safe-area-view')).toBeTruthy();
  });

  it('should render with px prop', () => {
    const { getByTestId } = render(
      <WrapperSafeAreaView px="md" testID="safe-area-view">
        Content
      </WrapperSafeAreaView>,
    );
    expect(getByTestId('safe-area-view')).toBeTruthy();
  });

  it('should render with custom className', () => {
    const { getByTestId } = render(
      <WrapperSafeAreaView className="custom-class" testID="safe-area-view">
        Content
      </WrapperSafeAreaView>,
    );
    expect(getByTestId('safe-area-view')).toBeTruthy();
  });

  it('should render with custom style', () => {
    const { getByTestId } = render(
      <WrapperSafeAreaView style={{ marginBottom: 8 }} testID="safe-area-view">
        Content
      </WrapperSafeAreaView>,
    );
    expect(getByTestId('safe-area-view')).toBeTruthy();
  });

  it('should render with edges prop', () => {
    const { getByTestId } = render(
      <WrapperSafeAreaView edges={['top', 'bottom']} testID="safe-area-view">
        Content
      </WrapperSafeAreaView>,
    );
    expect(getByTestId('safe-area-view')).toBeTruthy();
  });

  it('should render with all edges', () => {
    const { getByTestId } = render(
      <WrapperSafeAreaView edges={['top', 'left', 'right', 'bottom']} testID="safe-area-view">
        Content
      </WrapperSafeAreaView>,
    );
    expect(getByTestId('safe-area-view')).toBeTruthy();
  });

  it('should render with emulateUnlessSupported prop', () => {
    const { getByTestId } = render(
      <WrapperSafeAreaView emulateUnlessSupported testID="safe-area-view">
        Content
      </WrapperSafeAreaView>,
    );
    expect(getByTestId('safe-area-view')).toBeTruthy();
  });

  it('should render with children', () => {
    const { getByTestId } = render(
      <WrapperSafeAreaView testID="safe-area-view">
        <WrapperSafeAreaView testID="child-safe-area-view">Child content</WrapperSafeAreaView>
      </WrapperSafeAreaView>,
    );
    expect(getByTestId('safe-area-view')).toBeTruthy();
    expect(getByTestId('child-safe-area-view')).toBeTruthy();
  });

  it('should render with testID', () => {
    const { getByTestId } = render(<WrapperSafeAreaView testID="safe-area-view-test">Content</WrapperSafeAreaView>);
    expect(getByTestId('safe-area-view-test')).toBeTruthy();
  });

  it('should render with accessibility props', () => {
    const { getByTestId } = render(
      <WrapperSafeAreaView accessible accessibilityLabel="Safe area container" testID="safe-area-view">
        Content
      </WrapperSafeAreaView>,
    );
    expect(getByTestId('safe-area-view')).toBeTruthy();
  });

  it('should render with all props combined', () => {
    const { getByTestId } = render(
      <WrapperSafeAreaView
        fill
        grow
        px="lg"
        className="custom-class"
        style={{ marginBottom: 16 }}
        edges={['top', 'bottom']}
        emulateUnlessSupported
        testID="safe-area-view"
        accessible
        accessibilityLabel="Custom safe area view"
      >
        Content
      </WrapperSafeAreaView>,
    );
    expect(getByTestId('safe-area-view')).toBeTruthy();
  });

  it('should render with no children', () => {
    const { getByTestId } = render(<WrapperSafeAreaView testID="safe-area-view" />);
    const safeAreaView = getByTestId('safe-area-view');
    expect(safeAreaView).toBeTruthy();
  });
});
