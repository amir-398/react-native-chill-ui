import { render } from '@testing-library/react-native';

import { WrapperSafeAreaView } from '../components/WrapperSafeAreaView.hybrid';

describe('WrapperSafeAreaView Snapshots', () => {
  it('should match snapshot with basic props', () => {
    const tree = render(<WrapperSafeAreaView>Content</WrapperSafeAreaView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with fill prop', () => {
    const tree = render(<WrapperSafeAreaView fill>Content</WrapperSafeAreaView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with grow prop', () => {
    const tree = render(<WrapperSafeAreaView grow>Content</WrapperSafeAreaView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with px prop', () => {
    const tree = render(<WrapperSafeAreaView px="md">Content</WrapperSafeAreaView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom className', () => {
    const tree = render(<WrapperSafeAreaView className="custom-class">Content</WrapperSafeAreaView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom style', () => {
    const tree = render(<WrapperSafeAreaView style={{ marginBottom: 8 }}>Content</WrapperSafeAreaView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with edges prop', () => {
    const tree = render(<WrapperSafeAreaView edges={['top', 'bottom']}>Content</WrapperSafeAreaView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with all edges', () => {
    const tree = render(<WrapperSafeAreaView edges={['top', 'left', 'right', 'bottom']}>Content</WrapperSafeAreaView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with emulateUnlessSupported prop', () => {
    const tree = render(<WrapperSafeAreaView emulateUnlessSupported>Content</WrapperSafeAreaView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with accessibility props', () => {
    const tree = render(
      <WrapperSafeAreaView accessible accessibilityLabel="Safe area container" testID="safe-area-view">
        Content
      </WrapperSafeAreaView>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with all props combined', () => {
    const tree = render(
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
    expect(tree).toMatchSnapshot();
  });
});
