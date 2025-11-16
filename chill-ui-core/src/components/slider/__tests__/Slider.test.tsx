import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { Slider } from '../components/Slider';
import { SliderTrack } from '../components/SliderTrack';
import { SliderRange } from '../components/SliderRange';
import { SliderThumb } from '../components/SliderThumb';
import { SliderLabel } from '../components/SliderLabel';

// Mock utils
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  isString: jest.fn(value => typeof value === 'string'),
  styleHandler: jest.fn(() => ({})),
  sv: jest.fn(() => jest.fn(() => ({}))),
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

// Mock Box
jest.mock('../../../components/box', () => ({
  Box: ({ children, ...props }: any) => {
    const { View: ReactNativeView } = require('react-native');
    return (
      <ReactNativeView testID="box" {...props}>
        {children}
      </ReactNativeView>
    );
  },
}));

// Mock String
jest.mock('../../../components/string', () => ({
  String: ({ children, ...props }: any) => {
    const { Text: ReactNativeText } = require('react-native');
    return (
      <ReactNativeText testID="string" {...props}>
        {children}
      </ReactNativeText>
    );
  },
}));

// Mock Animated
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Animated.timing = () => ({
    start: () => {},
  });
  RN.Animated.Value = class MockAnimatedValue {
    _mockValue: number;

    constructor(mockValue: number) {
      // eslint-disable-next-line no-underscore-dangle
      this._mockValue = mockValue;
    }

    interpolate() {
      return this;
    }

    // eslint-disable-next-line class-methods-use-this
    setValue() {}

    // eslint-disable-next-line no-underscore-dangle
    __getValue() {
      // eslint-disable-next-line no-underscore-dangle
      return this._mockValue;
    }
  };
  RN.Animated.add = (a: any, b: any) => ({ a, b });
  RN.Animated.multiply = (a: any, b: any) => ({ a, b });
  return RN;
});

describe('Slider Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render basic slider correctly', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with default value', () => {
    const { root } = render(
      <Slider minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with single value', () => {
    const { root } = render(
      <Slider value={25} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with multiple values (range slider)', () => {
    const { root } = render(
      <Slider value={[25, 75]} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0} />
        <SliderThumb index={1} />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom step value', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100} step={10}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle disabled state', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100} isDisabled>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with vertical orientation', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100} orientation="vertical">
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with horizontal orientation (default)', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100} orientation="horizontal">
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle onValueChange callback', () => {
    const onValueChangeMock = jest.fn();

    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100} onValueChange={onValueChangeMock}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle onSlidingStart callback', () => {
    const onSlidingStartMock = jest.fn();

    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100} onSlidingStart={onSlidingStartMock}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle onSlidingComplete callback', () => {
    const onSlidingCompleteMock = jest.fn();

    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100} onSlidingComplete={onSlidingCompleteMock}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render slider track with custom className', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack className="custom-track">
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render slider track with custom style', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack style={{ backgroundColor: 'gray' }}>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render slider range with custom className', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange className="custom-range" />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render slider range with custom style', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange style={{ backgroundColor: 'blue' }} />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render slider thumb with custom className', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb className="custom-thumb" />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render slider thumb with custom style', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb style={{ backgroundColor: 'red' }} />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render slider thumb with custom touch size', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb touchSize={60} />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render slider thumb with scale animation type', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb animationType="scale" />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render slider thumb with extend animation type', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb animationType="extend" />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render slider thumb with no animation', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb animationType="none" />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render slider label with text content', () => {
    const { getByText } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="top">50%</SliderLabel>
      </Slider>,
    );
    expect(getByText('50%')).toBeTruthy();
  });

  it('should render slider label with custom content', () => {
    const { getByText } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="top">
          <Text>Custom Label</Text>
        </SliderLabel>
      </Slider>,
    );
    expect(getByText('Custom Label')).toBeTruthy();
  });

  it('should render slider label at bottom position', () => {
    const { getByText } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="bottom">50%</SliderLabel>
      </Slider>,
    );
    expect(getByText('50%')).toBeTruthy();
  });

  it('should render slider label with custom className', () => {
    const { getByText } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="top" className="custom-label">
          50%
        </SliderLabel>
      </Slider>,
    );
    expect(getByText('50%')).toBeTruthy();
  });

  it('should render slider label with custom style', () => {
    const { getByText } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="top" style={{ backgroundColor: 'green' }}>
          50%
        </SliderLabel>
      </Slider>,
    );
    expect(getByText('50%')).toBeTruthy();
  });

  it('should render slider label with custom stringProps', () => {
    const { getByText } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
        <SliderLabel position="top" stringProps={{ size: 'sm' }}>
          50%
        </SliderLabel>
      </Slider>,
    );
    expect(getByText('50%')).toBeTruthy();
  });

  it('should render multiple labels for multiple thumbs', () => {
    const { getByText } = render(
      <Slider value={[25, 75]} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0} />
        <SliderThumb index={1} />
        <SliderLabel position="top" index={0}>
          25%
        </SliderLabel>
        <SliderLabel position="top" index={1}>
          75%
        </SliderLabel>
      </Slider>,
    );
    expect(getByText('25%')).toBeTruthy();
    expect(getByText('75%')).toBeTruthy();
  });

  it('should render track with clickable prop', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack clickable>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render track with non-clickable prop', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack clickable={false}>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom right padding', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100} trackRightPadding={20}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with animate transitions disabled', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100} animateTransitions={false}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with spring animation type', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100} animationType="spring">
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with timing animation type', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100} animationType="timing">
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom animation config', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100} animationConfig={{ duration: 300 }}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render without any children', () => {
    const { root } = render(<Slider value={50} minimumValue={0} maximumValue={100} />);
    expect(root).toBeTruthy();
  });

  it('should render with only track', () => {
    const { root } = render(
      <Slider value={50} minimumValue={0} maximumValue={100}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
      </Slider>,
    );
    expect(root).toBeTruthy();
  });

  it('should render with all props combined', () => {
    const onValueChangeMock = jest.fn();
    const onSlidingStartMock = jest.fn();
    const onSlidingCompleteMock = jest.fn();

    const { getByText } = render(
      <Slider
        value={[30, 70]}
        minimumValue={0}
        maximumValue={100}
        step={5}
        isDisabled={false}
        orientation="horizontal"
        animateTransitions
        animationType="timing"
        animationConfig={{ duration: 250 }}
        trackRightPadding={15}
        onValueChange={onValueChangeMock}
        onSlidingStart={onSlidingStartMock}
        onSlidingComplete={onSlidingCompleteMock}
        className="custom-slider"
        style={{ margin: 10 }}
      >
        <SliderTrack clickable className="custom-track" style={{ height: 6 }}>
          <SliderRange className="custom-range" style={{ backgroundColor: 'blue' }} />
        </SliderTrack>
        <SliderThumb index={0} touchSize={50} animationType="scale" className="thumb-1" />
        <SliderThumb index={1} touchSize={50} animationType="extend" className="thumb-2" />
        <SliderLabel position="top" index={0} className="label-1">
          30%
        </SliderLabel>
        <SliderLabel position="bottom" index={1} className="label-2">
          70%
        </SliderLabel>
      </Slider>,
    );
    expect(getByText('30%')).toBeTruthy();
    expect(getByText('70%')).toBeTruthy();
  });
});
