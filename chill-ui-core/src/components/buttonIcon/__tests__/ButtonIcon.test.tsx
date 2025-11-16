import { render } from '@testing-library/react-native';

import ButtonIcon from '../components/buttonIcon';

// Mocks
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  colorVariantPropsHandler: jest.fn(),
  styleHandler: jest.fn(() => ({})),
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

describe('ButtonIcon Component (Hybrid)', () => {
  it('should render without crashing', () => {
    const { root } = render(<ButtonIcon iconName="search-solid" />);
    expect(root).toBeTruthy();
  });

  it('should render with onPress prop', () => {
    const onPressMock = jest.fn();
    const { root } = render(<ButtonIcon iconName="search-solid" onPress={onPressMock} />);
    expect(root).toBeTruthy();
  });

  it('should handle different touchable types', () => {
    const touchableTypes = ['touchable-opacity', 'pressable', 'ripple-pressable', 'scale-pressable'] as const;
    touchableTypes.forEach(type => {
      const { root } = render(<ButtonIcon iconName="search-solid" as={type} />);
      expect(root).toBeTruthy();
    });
  });

  it('should handle different variants and shapes', () => {
    const variants = ['contained', 'outlined'] as const;
    const shapes = ['circle', 'square'] as const;
    variants.forEach(variant => {
      shapes.forEach(shape => {
        const { root } = render(<ButtonIcon iconName="search-solid" variant={variant} rounded={shape} />);
        expect(root).toBeTruthy();
      });
    });
  });

  it('should handle color variants (NativeWind)', () => {
    const colors = ['primary', 'secondary', 'error', 'warning', 'success', 'accent'] as const;
    colors.forEach(color => {
      const { root } = render(<ButtonIcon iconName="search-solid" colorVariant={color} />);
      expect(root).toBeTruthy();
    });
  });
});
