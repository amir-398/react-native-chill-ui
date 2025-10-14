import { Text, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import { ScalePressable } from '../components/ScalePressable';

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

describe('ScalePressable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children correctly', () => {
    const { getByText } = render(
      <ScalePressable>
        <Text>Scale Content</Text>
      </ScalePressable>,
    );
    expect(getByText('Scale Content')).toBeTruthy();
  });

  it('should handle onPress interactions', () => {
    const onPressMock = jest.fn();

    const { getByTestId } = render(
      <ScalePressable onPress={onPressMock}>
        <View testID="pressable-content">
          <Text>Pressable Content</Text>
        </View>
      </ScalePressable>,
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
      <ScalePressable onPress={onPressMock} disabled>
        <View testID="disabled-content">
          <Text>Disabled Content</Text>
        </View>
      </ScalePressable>,
    );

    const pressableElement = getByTestId('disabled-content').parent;
    if (pressableElement) {
      fireEvent.press(pressableElement);
      expect(onPressMock).not.toHaveBeenCalled();
    }
  });

  it('should handle custom scaleValue prop', () => {
    const { getByText } = render(
      <ScalePressable scaleValue={0.9}>
        <Text>Custom Scale</Text>
      </ScalePressable>,
    );

    expect(getByText('Custom Scale')).toBeTruthy();
  });

  it('should handle custom duration prop', () => {
    const { getByText } = render(
      <ScalePressable duration={200}>
        <Text>Fast Scale</Text>
      </ScalePressable>,
    );

    expect(getByText('Fast Scale')).toBeTruthy();
  });

  it('should handle accessibility props', () => {
    const { getByText } = render(
      <ScalePressable accessible accessibilityLabel="Custom button" accessibilityRole="button">
        <Text>Accessible Content</Text>
      </ScalePressable>,
    );

    expect(getByText('Accessible Content')).toBeTruthy();
  });

  it('should handle className prop', () => {
    const { getByText } = render(
      <ScalePressable className="custom-class">
        <Text>Styled Content</Text>
      </ScalePressable>,
    );

    expect(getByText('Styled Content')).toBeTruthy();
  });

  it('should handle style prop', () => {
    const { getByText } = render(
      <ScalePressable style={{ margin: 10 }}>
        <Text>Custom Style</Text>
      </ScalePressable>,
    );

    expect(getByText('Custom Style')).toBeTruthy();
  });

  it('should handle onPressIn and onPressOut events', () => {
    const { getByTestId } = render(
      <ScalePressable>
        <View testID="press-content">
          <Text>Press Events</Text>
        </View>
      </ScalePressable>,
    );

    const pressableElement = getByTestId('press-content').parent;
    if (pressableElement) {
      fireEvent(pressableElement, 'pressIn');
      fireEvent(pressableElement, 'pressOut');
      expect(getByTestId('press-content')).toBeTruthy();
    }
  });
});
