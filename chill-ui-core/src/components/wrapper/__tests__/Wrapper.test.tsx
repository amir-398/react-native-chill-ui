import React from 'react';
import { render } from '@testing-library/react-native';
import { Wrapper } from '../components/Wrapper';

describe('Wrapper Component', () => {
  it('should render basic wrapper correctly', () => {
    const { getByTestId } = render(<Wrapper testID="wrapper">Content</Wrapper>);
    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('should render with fill prop', () => {
    const { getByTestId } = render(
      <Wrapper fill testID="wrapper">
        Content
      </Wrapper>,
    );
    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('should render with grow prop', () => {
    const { getByTestId } = render(
      <Wrapper grow testID="wrapper">
        Content
      </Wrapper>,
    );
    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('should render with px prop', () => {
    const { getByTestId } = render(
      <Wrapper px="md" testID="wrapper">
        Content
      </Wrapper>,
    );
    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('should render with custom className', () => {
    const { getByTestId } = render(
      <Wrapper className="custom-class" testID="wrapper">
        Content
      </Wrapper>,
    );
    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('should render with custom style', () => {
    const { getByTestId } = render(
      <Wrapper style={{ marginBottom: 8 }} testID="wrapper">
        Content
      </Wrapper>,
    );
    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('should render with both className and style', () => {
    const { getByTestId } = render(
      <Wrapper className="custom-class" style={{ marginBottom: 8 }} testID="wrapper">
        Content
      </Wrapper>,
    );
    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('should render with hasSafeArea prop', () => {
    const { getByTestId } = render(
      <Wrapper hasSafeArea edges={['top', 'bottom']} testID="wrapper">
        Content
      </Wrapper>,
    );
    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('should render with edges prop', () => {
    const { getByTestId } = render(
      <Wrapper hasSafeArea edges={['top', 'left', 'right', 'bottom']} testID="wrapper">
        Content
      </Wrapper>,
    );
    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('should render with children', () => {
    const { getByTestId } = render(
      <Wrapper testID="wrapper">
        <Wrapper testID="child-wrapper">Child content</Wrapper>
      </Wrapper>,
    );
    expect(getByTestId('wrapper')).toBeTruthy();
    expect(getByTestId('child-wrapper')).toBeTruthy();
  });

  it('should render with testID', () => {
    const { getByTestId } = render(<Wrapper testID="wrapper-test">Content</Wrapper>);
    expect(getByTestId('wrapper-test')).toBeTruthy();
  });

  it('should render with accessibility props', () => {
    const { getByTestId } = render(
      <Wrapper accessible accessibilityLabel="Wrapper container" testID="wrapper">
        Content
      </Wrapper>,
    );
    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('should render with all props combined', () => {
    const { getByTestId } = render(
      <Wrapper
        fill
        grow
        px="lg"
        className="custom-class"
        style={{ marginBottom: 16 }}
        hasSafeArea
        edges={['top', 'bottom']}
        testID="wrapper"
        accessible
        accessibilityLabel="Custom wrapper"
      >
        Content
      </Wrapper>,
    );
    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('should render with no children', () => {
    const { getByTestId } = render(<Wrapper testID="wrapper" />);
    const wrapper = getByTestId('wrapper');
    expect(wrapper).toBeTruthy();
  });
});
