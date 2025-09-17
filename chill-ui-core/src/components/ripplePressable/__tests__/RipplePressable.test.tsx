import { render, screen, fireEvent } from '@testing-library/react-native';

import String from '../../string/components/String';
import RipplePressable from '../components/RipplePressable';

// Mock StyleSheet styles
jest.mock('../styles/RipplePressable.styles', () => ({
  __esModule: true,
  default: {
    container: {},
    disabled: { opacity: 0.5 },
  },
}));

// Mock Tailwind utilities
jest.mock('../../../utils/tw/cn', () => ({
  __esModule: true,
  default: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

// Mock Hybrid utilities
jest.mock('../../../utils/hybrid/propsHandlers', () => ({
  classNameHandler: jest.fn(className => ({ className })),
  styleHandler: jest.fn(style => ({ style: style?.defaultStyle || style })),
}));

jest.mock('../../../utils/hybrid/classNameMissingError', () => ({
  classNamePropsHandler: jest.fn(),
}));

// Mock AnimatedBox
jest.mock(
  '../../animatedBox/components/animatedBox/AnimatedBox',
  () =>
    function MockAnimatedBox({ children, style, ...props }: any) {
      return (
        <div data-testid="animated-box" style={style} {...props}>
          {children}
        </div>
      );
    },
);

describe('RipplePressable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children correctly', () => {
    render(
      <RipplePressable>
        <String>Ripple Content</String>
      </RipplePressable>,
    );
    expect(screen.getByText('Ripple Content')).toBeTruthy();
  });

  it('should handle onPress interactions', () => {
    const onPressMock = jest.fn();

    render(
      <RipplePressable onPress={onPressMock}>
        <String>Pressable Content</String>
      </RipplePressable>,
    );

    const pressableElement = screen.getByText('Pressable Content');
    fireEvent.press(pressableElement);

    expect(onPressMock).toHaveBeenCalled();
  });

  it('should handle disabled state', () => {
    const onPressMock = jest.fn();

    render(
      <RipplePressable onPress={onPressMock} disabled>
        <String>Disabled Content</String>
      </RipplePressable>,
    );

    const pressableElement = screen.getByText('Disabled Content');
    fireEvent.press(pressableElement);

    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('should handle ripple effect props', () => {
    render(
      <RipplePressable effectColor="#FF0000">
        <String>Custom Ripple</String>
      </RipplePressable>,
    );

    expect(screen.getByText('Custom Ripple')).toBeTruthy();
  });

  it('should handle accessibility props', () => {
    render(
      <RipplePressable accessible accessibilityLabel="Custom button" accessibilityRole="button">
        <String>Accessible Content</String>
      </RipplePressable>,
    );

    expect(screen.getByText('Accessible Content')).toBeTruthy();
  });
});
