import React from 'react';
import renderer from 'react-test-renderer';
import { act } from '@testing-library/react-native';
import ButtonIcon from '../components/buttonIcon';

// Mocks
jest.mock('../../../utils', () => ({
  classNamePropsHandler: jest.fn(),
  colorVariantPropsHandler: jest.fn(),
  classNameHandler: jest.fn(() => ({})),
  styleHandler: jest.fn(() => ({})),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

jest.mock('../../../components/box', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  Icon: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

jest.mock('../../../components/loadingIndicatorsKit', () => ({
  LoadingIndicator: (props: any) => <div data-testid="loading-spinner" {...props} />,
}));

jest.mock('../../../components/ripplePressable', () => ({
  RipplePressable: ({ children, onPress }: any) => (
    <div data-testid="ripple-pressable" onClick={onPress}>
      {children}
    </div>
  ),
}));

jest.mock('../../../components/scalePressable', () => ({
  ScalePressable: ({ children, onPress }: any) => (
    <div data-testid="scale-pressable" onClick={onPress}>
      {children}
    </div>
  ),
}));

jest.mock('../styles/buttonIcon.ss.styles', () => ({
  buttonIconSv: jest.fn(() => ({})),
  styles: { pointerEventsNone: {} },
}));

jest.mock('../styles/buttonIcon.tw.styles', () => ({
  buttonIconTv: jest.fn(() => ''),
  twStyles: { pointerEventsNone: '' },
}));

describe('ButtonIcon Snapshots', () => {
  afterEach(() => {
    // Clean up any pending timers or async operations
    jest.clearAllTimers();
  });

  it('should match basic button snapshot', () => {
    let tree: any;
    act(() => {
      tree = renderer.create(<ButtonIcon iconName="heart-solid" onPress={() => {}} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match disabled button snapshot', () => {
    let tree: any;
    act(() => {
      tree = renderer.create(<ButtonIcon iconName="heart-solid" isDisabled onPress={() => {}} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match loading button snapshot', () => {
    let tree: any;
    act(() => {
      tree = renderer.create(<ButtonIcon iconName="heart-solid" isLoading onPress={() => {}} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match outlined variant snapshot', () => {
    let tree: any;
    act(() => {
      tree = renderer.create(<ButtonIcon iconName="heart-solid" variant="outlined" onPress={() => {}} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match circle shape snapshot', () => {
    let tree: any;
    act(() => {
      tree = renderer.create(<ButtonIcon iconName="heart-solid" rounded="circle" onPress={() => {}} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match ripple pressable snapshot', () => {
    let tree: any;
    act(() => {
      tree = renderer.create(<ButtonIcon iconName="heart-solid" as="ripple-pressable" onPress={() => {}} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match scale pressable snapshot', () => {
    let tree: any;
    act(() => {
      tree = renderer.create(<ButtonIcon iconName="heart-solid" as="scale-pressable" onPress={() => {}} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match primary color variant snapshot', () => {
    let tree: any;
    act(() => {
      tree = renderer.create(<ButtonIcon iconName="heart-solid" colorVariant="primary" onPress={() => {}} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match error color variant snapshot', () => {
    let tree: any;
    act(() => {
      tree = renderer.create(<ButtonIcon iconName="heart-solid" colorVariant="error" onPress={() => {}} />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should match complex combination snapshot', () => {
    let tree: any;
    act(() => {
      tree = renderer.create(
        <ButtonIcon
          iconName="settings-solid"
          variant="outlined"
          rounded="circle"
          colorVariant="primary"
          size="lg"
          onPress={() => {}}
        />,
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
