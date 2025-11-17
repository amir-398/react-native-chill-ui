import { render } from '@testing-library/react-native';

import ButtonIconSs from '../components/buttonIcon.ss';

// Mocks
jest.mock('../../../components/box', () => ({
  BoxSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  IconSs: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

jest.mock('../../../components/loadingIndicatorsKit', () => ({
  LoadingIndicator: (props: any) => <div data-testid="loading-spinner" {...props} />,
}));

jest.mock('../../../components/ripplePressable', () => ({
  RipplePressableSs: ({ children, onPress }: any) => (
    <div data-testid="ripple-pressable" onClick={onPress}>
      {children}
    </div>
  ),
}));

jest.mock('../../../components/scalePressable', () => ({
  ScalePressableSs: ({ children, onPress }: any) => (
    <div data-testid="scale-pressable" onClick={onPress}>
      {children}
    </div>
  ),
}));

jest.mock('../styles/buttonIcon.ss.styles', () => ({
  buttonIconSv: jest.fn(() => ({})),
  styles: { pointerEventsNone: {} },
}));

describe('ButtonIconSs Component', () => {
  it('should render without crashing', () => {
    const { root } = render(<ButtonIconSs iconName="angle-down-solid" />);
    expect(root).toBeTruthy();
  });

  it('should render with onPress prop', () => {
    const onPressMock = jest.fn();
    const { root } = render(<ButtonIconSs iconName="angle-down-solid" onPress={onPressMock} />);
    expect(root).toBeTruthy();
  });

  it('should handle different touchable types', () => {
    const touchableTypes = ['touchable-opacity', 'pressable', 'ripple-pressable', 'scale-pressable'] as const;
    touchableTypes.forEach(type => {
      const { root } = render(<ButtonIconSs iconName="angle-down-solid" as={type} />);
      expect(root).toBeTruthy();
    });
  });

  it('should handle different variants and shapes', () => {
    const variants = ['contained', 'outlined'] as const;
    const shapes = ['circle', 'square'] as const;
    variants.forEach(variant => {
      shapes.forEach(shape => {
        const { root } = render(<ButtonIconSs iconName="angle-down-solid" variant={variant} rounded={shape} />);
        expect(root).toBeTruthy();
      });
    });
  });
});
