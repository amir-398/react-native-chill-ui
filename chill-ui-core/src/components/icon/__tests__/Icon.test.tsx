import { render, screen } from '@testing-library/react-native';

import Icon from '../components/Icon.hybrid';

// Mock des utilitaires hybrid pour éviter les erreurs
jest.mock('../../../utils/hybrid/classNamePropsHandler', () => ({
  classNamePropsHandler: jest.fn(),
}));

jest.mock('../../../utils/hybrid/colorVariantPropsHandler', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../utils/hybrid/propsHandlers', () => ({
  classNameHandler: jest.fn(className => ({ className })),
  styleHandler: jest.fn(style => ({ style: style.defaultStyle })),
}));

// Mock du composant CustomIcon
jest.mock(
  '../components/CustomIcon',
  () =>
    function MockCustomIcon({ className, color, name, style }: any) {
      return (
        <div style={style} className={className} data-color={color}>
          {name}
        </div>
      );
    },
);

// Mock du composant RipplePressable
jest.mock('../../ripplePressable', () => ({
  RipplePressable: ({ children, className, onPress, style, ...props }: any) => (
    <div testID="ripple-pressable" onPress={onPress} style={style} className={className} {...props}>
      {children}
    </div>
  ),
}));

describe('Icon Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render icon with required name prop', () => {
    render(<Icon name="heart-solid" />);
    expect(screen.getByTestId('icon-heart-solid')).toBeTruthy();
  });

  it('should handle different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { unmount } = render(<Icon name="heart-solid" size={size} />);
      expect(screen.getByTestId('icon-heart-solid')).toBeTruthy();
      unmount();
    });
  });

  it('should handle onPress interactions', () => {
    const onPressMock = jest.fn();
    render(<Icon name="heart-solid" onPress={onPressMock} />);
    expect(screen.getByTestId('icon-heart-solid')).toBeTruthy();
  });

  it('should handle different pressable components', () => {
    const onPressMock = jest.fn();
    const { rerender } = render(<Icon name="heart-solid" onPress={onPressMock} />);
    expect(screen.getByTestId('icon-heart-solid')).toBeTruthy();

    rerender(<Icon name="heart-solid" onPress={onPressMock} as="touchable-opacity" />);
    expect(screen.getByTestId('icon-heart-solid')).toBeTruthy();
  });
});
