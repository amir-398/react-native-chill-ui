import React from 'react';
import { render } from '@testing-library/react-native';
import { Wrapper } from '../components/Wrapper';

describe('Wrapper Snapshots', () => {
  it('should match snapshot with basic props', () => {
    const tree = render(<Wrapper>Content</Wrapper>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with fill prop', () => {
    const tree = render(<Wrapper fill>Content</Wrapper>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with grow prop', () => {
    const tree = render(<Wrapper grow>Content</Wrapper>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with px prop', () => {
    const tree = render(<Wrapper px="md">Content</Wrapper>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom className', () => {
    const tree = render(<Wrapper className="custom-class">Content</Wrapper>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom style', () => {
    const tree = render(<Wrapper style={{ marginBottom: 8 }}>Content</Wrapper>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with hasSafeArea prop', () => {
    const tree = render(
      <Wrapper hasSafeArea edges={['top', 'bottom']}>
        Content
      </Wrapper>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with edges prop', () => {
    const tree = render(
      <Wrapper hasSafeArea edges={['top', 'left', 'right', 'bottom']}>
        Content
      </Wrapper>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with accessibility props', () => {
    const tree = render(
      <Wrapper accessible accessibilityLabel="Wrapper container" testID="wrapper">
        Content
      </Wrapper>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with all props combined', () => {
    const tree = render(
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
    expect(tree).toMatchSnapshot();
  });
});
