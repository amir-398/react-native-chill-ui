import { render } from '@testing-library/react-native';

import ButtonIconTw from '../components/buttonIcon.tw';

// Mocks
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

jest.mock('../../../components/box', () => ({
  BoxTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  IconTw: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

jest.mock('../../../components/loadingIndicatorsKit', () => ({
  LoadingIndicator: (props: any) => <div data-testid="loading-spinner" {...props} />,
}));

jest.mock('../../../components/ripplePressable', () => ({
  RipplePressableTw: ({ children, onPress }: any) => (
    <div data-testid="ripple-pressable" onClick={onPress}>
      {children}
    </div>
  ),
}));

jest.mock('../../../components/scalePressable', () => ({
  ScalePressableTw: ({ children, onPress }: any) => (
    <div data-testid="scale-pressable" onClick={onPress}>
      {children}
    </div>
  ),
}));

jest.mock('../styles/buttonIcon.tw.styles', () => ({
  buttonIconTv: jest.fn(() => ''),
  twStyles: { pointerEventsNone: '' },
}));

describe('ButtonIconTw Component', () => {
  it('should render without crashing', () => {
    const { root } = render(<ButtonIconTw iconName="angle-down-solid" />);
    expect(root).toBeTruthy();
  });

  it('should render with onPress prop', () => {
    const onPressMock = jest.fn();
    const { root } = render(<ButtonIconTw iconName="angle-down-solid" onPress={onPressMock} />);
    expect(root).toBeTruthy();
  });

  it('should handle different touchable types', () => {
    const touchableTypes = ['touchable-opacity', 'pressable', 'ripple-pressable', 'scale-pressable'] as const;
    touchableTypes.forEach(type => {
      const { root } = render(<ButtonIconTw iconName="angle-down-solid" as={type} />);
      expect(root).toBeTruthy();
    });
  });

  it('should handle different variants and shapes', () => {
    const variants = ['contained', 'outlined'] as const;
    const shapes = ['circle', 'square'] as const;
    variants.forEach(variant => {
      shapes.forEach(shape => {
        const { root } = render(<ButtonIconTw iconName="angle-down-solid" variant={variant} rounded={shape} />);
        expect(root).toBeTruthy();
      });
    });
  });

  it('should handle color variants', () => {
    const colors = ['primary', 'secondary', 'error', 'warning', 'success', 'accent'] as const;
    colors.forEach(color => {
      const { root } = render(<ButtonIconTw iconName="angle-down-solid" colorVariant={color} />);
      expect(root).toBeTruthy();
    });
  });
});
