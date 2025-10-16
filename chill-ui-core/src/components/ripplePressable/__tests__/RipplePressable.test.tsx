import { Text, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import RipplePressable from '../components/RipplePressable';

// Mock utils
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  colorVariantPropsHandler: jest.fn(),
  isString: jest.fn(value => typeof value === 'string'),
  styleHandler: jest.fn(() => ({})),
}));

// Mock AnimatedBox
jest.mock('../../../components/animatedBox', () => ({
  AnimatedBox: ({ children, ...props }: any) => {
    const { View: ReactNativeView } = require('react-native');
    return (
      <ReactNativeView testID="animated-box" {...props}>
        {children}
      </ReactNativeView>
    );
  },
}));

describe('RipplePressable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children correctly', () => {
    const { getByText } = render(
      <RipplePressable>
        <Text>Ripple Content</Text>
      </RipplePressable>,
    );
    expect(getByText('Ripple Content')).toBeTruthy();
  });

  it('should handle onPress interactions', () => {
    const onPressMock = jest.fn();

    const { getByTestId } = render(
      <RipplePressable onPress={onPressMock}>
        <View testID="pressable-content">
          <Text>Pressable Content</Text>
        </View>
      </RipplePressable>,
    );

    const pressableElement = getByTestId('pressable-content').parent;
    if (pressableElement) {
      fireEvent.press(pressableElement);
      expect(onPressMock).toHaveBeenCalled();
    }
  });

  it('should handle disabled state', () => {
    const onPressMock = jest.fn();

    const { getByTestId } = render(
      <RipplePressable onPress={onPressMock} disabled>
        <View testID="disabled-content">
          <Text>Disabled Content</Text>
        </View>
      </RipplePressable>,
    );

    const pressableElement = getByTestId('disabled-content').parent;
    if (pressableElement) {
      fireEvent.press(pressableElement);
      expect(onPressMock).not.toHaveBeenCalled();
    }
  });

  it('should handle custom effectColor prop', () => {
    const { getByText } = render(
      <RipplePressable effectColor="#FF0000">
        <Text>Custom Ripple</Text>
      </RipplePressable>,
    );

    expect(getByText('Custom Ripple')).toBeTruthy();
  });

  it('should handle custom speed prop', () => {
    const { getByText } = render(
      <RipplePressable speed={300}>
        <Text>Fast Ripple</Text>
      </RipplePressable>,
    );

    expect(getByText('Fast Ripple')).toBeTruthy();
  });

  it('should handle accessibility props', () => {
    const { getByText } = render(
      <RipplePressable accessible accessibilityLabel="Custom button" accessibilityRole="button">
        <Text>Accessible Content</Text>
      </RipplePressable>,
    );

    expect(getByText('Accessible Content')).toBeTruthy();
  });

  it('should handle className prop', () => {
    const { getByText } = render(
      <RipplePressable className="custom-class">
        <Text>Styled Content</Text>
      </RipplePressable>,
    );

    expect(getByText('Styled Content')).toBeTruthy();
  });

  it('should handle style prop', () => {
    const { getByText } = render(
      <RipplePressable style={{ margin: 10 }}>
        <Text>Custom Style</Text>
      </RipplePressable>,
    );

    expect(getByText('Custom Style')).toBeTruthy();
  });
});
