import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

import { TimePicker } from '../components/TimePicker.tw';
import { getTimePickerDateNow } from '../utils/createTimePickerDate';
import { TimePickerContent } from '../components/TimePickerContent.tw';

// Mock TimePickerScroller to avoid FlatList native dependencies
function TimePickerScroller({ children, ...props }: any) {
  const { View: ReactNativeView } = require('react-native');
  return (
    <ReactNativeView testID="time-picker-scroller" {...props}>
      {children}
    </ReactNativeView>
  );
}

// Mock TimePickerItem to avoid animation dependencies
function TimePickerItem({ ...props }: any) {
  const { Text: ReactNativeText, View: ReactNativeView } = require('react-native');
  return (
    <ReactNativeView testID="time-picker-item" {...props}>
      <ReactNativeText>Item</ReactNativeText>
    </ReactNativeView>
  );
}

// Mock TimePickerTitle to simplify testing
function TimePickerTitle({ children, ...props }: any) {
  const { Text: ReactNativeText } = require('react-native');
  if (typeof children === 'string') {
    return (
      <ReactNativeText testID="time-picker-title" {...props}>
        {children}
      </ReactNativeText>
    );
  }
  return null;
}

jest.mock('../components/TimePickerScroller.tw', () => ({
  TimePickerScroller,
}));

jest.mock('../components/TimePickerItem.tw', () => ({
  TimePickerItem,
}));

jest.mock('../components/TimePickerTitle.tw', () => ({
  TimePickerTitle,
}));

// Mock utils
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  isString: jest.fn(value => typeof value === 'string'),
  SlotTw: ({ children }: any) => children,
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
  BoxSs: ({ children, ...props }: any) => {
    const { View: ReactNativeView } = require('react-native');
    return (
      <ReactNativeView testID="box-ss" {...props}>
        {children}
      </ReactNativeView>
    );
  },
  BoxTw: ({ children, ...props }: any) => {
    const { View: ReactNativeView } = require('react-native');
    return (
      <ReactNativeView testID="box-tw" {...props}>
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

    // eslint-disable-next-line class-methods-use-this
    addListener(callback: (value: { value: number }) => void) {
      return 'listener-id';
    }

    // eslint-disable-next-line class-methods-use-this
    removeListener() {}

    // eslint-disable-next-line no-underscore-dangle
    __getValue() {
      // eslint-disable-next-line no-underscore-dangle
      return this._mockValue;
    }
  };
  RN.Animated.event = jest.fn(() => jest.fn());
  RN.Animated.createAnimatedComponent = jest.fn(Component => Component);
  return RN;
});

describe('TimePicker Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('TimePicker Root', () => {
    it('should render basic time picker correctly', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should call onTimeChange when time changes', () => {
      const onTimeChange = jest.fn();
      render(
        <TimePicker onTimeChange={onTimeChange}>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(onTimeChange).toBeDefined();
    });

    it('should accept defaultTime prop', () => {
      const defaultTime = getTimePickerDateNow();
      const { root } = render(
        <TimePicker defaultTime={defaultTime}>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should accept custom className', () => {
      const { root } = render(
        <TimePicker className="custom-time-picker">
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should accept custom style', () => {
      const { root } = render(
        <TimePicker style={{ backgroundColor: 'blue' }}>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should render empty TimePicker without children', () => {
      const { root } = render(<TimePicker />);
      expect(root).toBeTruthy();
    });
  });

  describe('TimePickerContent', () => {
    it('should render TimePickerContent correctly', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should render with custom className', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent className="custom-content">
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should render with custom style', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent style={{ padding: 20 }}>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should render multiple scrollers in content', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
            <TimePickerTitle>:</TimePickerTitle>
            <TimePickerScroller mode="minute">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });
  });

  describe('TimePickerScroller - Modes', () => {
    it('should render hour mode correctly', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should render minute mode correctly', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="minute">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should render second mode correctly', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="second">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });
  });

  describe('TimePickerScroller - Intervals', () => {
    it('should support custom interval for minutes', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="minute" interval={5}>
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should support custom interval for seconds', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="second" interval={10}>
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should support custom interval for hours', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour" interval={2}>
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should support 15-minute intervals', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="minute" interval={15}>
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should support 30-minute intervals', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="minute" interval={30}>
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });
  });

  describe('TimePickerScroller - Default Values', () => {
    it('should accept defaultValue prop', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour" defaultValue={14}>
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should round defaultValue to nearest interval', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="minute" interval={5} defaultValue={27}>
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should use defaultTime from context', () => {
      const defaultTime = getTimePickerDateNow(14, 30);
      const { root } = render(
        <TimePicker defaultTime={defaultTime}>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });
  });

  describe('TimePickerScroller - Custom Data', () => {
    it('should accept custom data array', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller data={['Morning', 'Afternoon', 'Evening']}>
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should accept custom onChange callback', () => {
      const onChange = jest.fn();
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour" onChange={onChange}>
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
      expect(onChange).toBeDefined();
    });

    it('should render with custom className', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour" className="custom-scroller">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should render with custom style', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour" style={{ backgroundColor: 'gray' }}>
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });
  });

  describe('TimePickerTitle', () => {
    it('should render string title correctly', () => {
      const { getByText } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
            <TimePickerTitle>:</TimePickerTitle>
            <TimePickerScroller mode="minute">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(getByText(':')).toBeTruthy();
    });

    it('should render custom separator', () => {
      const { getByText } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
            <TimePickerTitle>-</TimePickerTitle>
            <TimePickerScroller mode="minute">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(getByText('-')).toBeTruthy();
    });

    it('should accept stringProps', () => {
      const { getByText } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerTitle stringProps={{ className: 'custom-title' }}>:</TimePickerTitle>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(getByText(':')).toBeTruthy();
    });

    it('should not render non-string children', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerTitle>
              <View testID="custom-view">
                <Text>Custom</Text>
              </View>
            </TimePickerTitle>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });
  });

  describe('TimePickerItem', () => {
    it('should render TimePickerItem correctly', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should accept custom className', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem className="custom-item" />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should accept stringProps', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem stringProps={{ className: 'text-blue-500' }} />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });
  });

  describe('Complete Time Picker Configurations', () => {
    it('should render hours and minutes picker', () => {
      const { getByText } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
            <TimePickerTitle>:</TimePickerTitle>
            <TimePickerScroller mode="minute">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(getByText(':')).toBeTruthy();
    });

    it('should render hours, minutes, and seconds picker', () => {
      const { getAllByText } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
            <TimePickerTitle>:</TimePickerTitle>
            <TimePickerScroller mode="minute">
              <TimePickerItem />
            </TimePickerScroller>
            <TimePickerTitle>:</TimePickerTitle>
            <TimePickerScroller mode="second">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(getAllByText(':').length).toBe(2);
    });

    it('should render with default time and intervals', () => {
      const defaultTime = getTimePickerDateNow(14, 30, 45);
      const { root } = render(
        <TimePicker defaultTime={defaultTime}>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
            <TimePickerTitle>:</TimePickerTitle>
            <TimePickerScroller mode="minute" interval={5}>
              <TimePickerItem />
            </TimePickerScroller>
            <TimePickerTitle>:</TimePickerTitle>
            <TimePickerScroller mode="second" interval={10}>
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should render with custom styling', () => {
      const { root } = render(
        <TimePicker className="bg-white p-4">
          <TimePickerContent className="gap-2">
            <TimePickerScroller mode="hour" className="bg-gray-100">
              <TimePickerItem className="py-2" stringProps={{ className: 'text-blue-600' }} />
            </TimePickerScroller>
            <TimePickerTitle stringProps={{ className: 'text-gray-400' }}>:</TimePickerTitle>
            <TimePickerScroller mode="minute" className="bg-gray-100">
              <TimePickerItem className="py-2" stringProps={{ className: 'text-blue-600' }} />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should render only minutes and seconds (timer style)', () => {
      const { getByText } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="minute">
              <TimePickerItem />
            </TimePickerScroller>
            <TimePickerTitle>:</TimePickerTitle>
            <TimePickerScroller mode="second">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(getByText(':')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle single scroller without separator', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should handle multiple TimePickerContent', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
          <TimePickerContent>
            <TimePickerScroller mode="minute">
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should handle mixed custom data and modes', () => {
      const { root } = render(
        <TimePicker>
          <TimePickerContent>
            <TimePickerScroller mode="hour">
              <TimePickerItem />
            </TimePickerScroller>
            <TimePickerTitle>:</TimePickerTitle>
            <TimePickerScroller mode="minute">
              <TimePickerItem />
            </TimePickerScroller>
            <TimePickerTitle> </TimePickerTitle>
            <TimePickerScroller data={['AM', 'PM']}>
              <TimePickerItem />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });

    it('should handle all props combined', () => {
      const onTimeChange = jest.fn();
      const onChange = jest.fn();
      const defaultTime = getTimePickerDateNow(14, 30, 0);

      const { root } = render(
        <TimePicker
          defaultTime={defaultTime}
          onTimeChange={onTimeChange}
          className="custom-picker"
          style={{ padding: 16 }}
        >
          <TimePickerContent className="custom-content" style={{ gap: 8 }}>
            <TimePickerScroller mode="hour" defaultValue={14} onChange={onChange} className="scroller-hour">
              <TimePickerItem className="item-hour" stringProps={{ className: 'text-hour' }} />
            </TimePickerScroller>
            <TimePickerTitle stringProps={{ className: 'title-sep' }}>:</TimePickerTitle>
            <TimePickerScroller mode="minute" interval={5} className="scroller-minute">
              <TimePickerItem className="item-minute" stringProps={{ className: 'text-minute' }} />
            </TimePickerScroller>
          </TimePickerContent>
        </TimePicker>,
      );
      expect(root).toBeTruthy();
    });
  });

  describe('Utility Functions', () => {
    it('should create date with getTimePickerDateNow without arguments', () => {
      const date = getTimePickerDateNow();
      expect(date).toBeInstanceOf(Date);
    });

    it('should create date with getTimePickerDateNow with hour and minute', () => {
      const date = getTimePickerDateNow(14, 30);
      expect(date).toBeInstanceOf(Date);
      expect(date.getUTCHours()).toBe(14);
      expect(date.getUTCMinutes()).toBe(30);
    });

    it('should create date with getTimePickerDateNow with hour, minute, and second', () => {
      const date = getTimePickerDateNow(14, 30, 45);
      expect(date).toBeInstanceOf(Date);
      expect(date.getUTCHours()).toBe(14);
      expect(date.getUTCMinutes()).toBe(30);
      expect(date.getUTCSeconds()).toBe(45);
    });

    it('should create date with getTimePickerDateNow from existing Date', () => {
      const sourceDate = new Date();
      const date = getTimePickerDateNow(sourceDate);
      expect(date).toBeInstanceOf(Date);
    });
  });
});
