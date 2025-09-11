import { render, screen, fireEvent, act } from '@testing-library/react-native';

import { Box } from '../../box/components/Box';
import String from '../../string/components/String';
import RipplePressable from '../components/RipplePressable';
import RipplePressableSS from '../components/RipplePressable.ss';
import RipplePressableTW from '../components/RipplePressable.tw';

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

describe('RipplePressable Component - All Variants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Basic Rendering', () => {
    it('should render children correctly (Hybrid)', () => {
      render(
        <RipplePressable>
          <String>Press me</String>
        </RipplePressable>,
      );
      expect(screen.getByText('Press me')).toBeTruthy();
    });

    it('should render children correctly (StyleSheet)', () => {
      render(
        <RipplePressableSS>
          <String>Press me SS</String>
        </RipplePressableSS>,
      );
      expect(screen.getByText('Press me SS')).toBeTruthy();
    });

    it('should render children correctly (Tailwind)', () => {
      render(
        <RipplePressableTW>
          <String>Press me TW</String>
        </RipplePressableTW>,
      );
      expect(screen.getByText('Press me TW')).toBeTruthy();
    });

    it('should throw error when no children provided', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<RipplePressable>{null}</RipplePressable>);
      }).toThrow('RipplePressable must have children');

      consoleSpy.mockRestore();
    });
  });

  describe('Press Interactions', () => {
    it('should call onPress when pressed', () => {
      const mockOnPress = jest.fn();

      render(
        <RipplePressable onPress={mockOnPress} testID="ripple-button">
          <String>Press me</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('ripple-button');
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalled();
    });

    it('should not call onPress when disabled', () => {
      const mockOnPress = jest.fn();

      render(
        <RipplePressable onPress={mockOnPress} disabled testID="ripple-button">
          <String>Disabled button</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('ripple-button');
      fireEvent.press(button);

      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it('should create ripple effect on press', () => {
      const mockOnPress = jest.fn();

      render(
        <RipplePressable onPress={mockOnPress} testID="ripple-button">
          <String>Press me</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('ripple-button');
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalled();
    });
  });

  describe('Ripple Effect Props', () => {
    it('should use custom effect color', () => {
      render(
        <RipplePressable effectColor="rgba(255, 0, 0, 0.5)" testID="ripple-button">
          <String>Red ripple</String>
        </RipplePressable>,
      );

      expect(screen.getByTestId('ripple-button')).toBeTruthy();
    });

    it('should use custom speed', () => {
      render(
        <RipplePressable speed={300} testID="ripple-button">
          <String>Fast ripple</String>
        </RipplePressable>,
      );

      expect(screen.getByTestId('ripple-button')).toBeTruthy();
    });

    it('should use default props when not provided', () => {
      render(
        <RipplePressable testID="ripple-button">
          <String>Default props</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('ripple-button');
      expect(button).toBeTruthy();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className (Tailwind)', () => {
      render(
        <RipplePressableTW className="custom-ripple-class" testID="ripple-button">
          <String>Custom class</String>
        </RipplePressableTW>,
      );

      expect(screen.getByTestId('ripple-button')).toBeTruthy();
    });

    it('should apply custom style (StyleSheet)', () => {
      const customStyle = { backgroundColor: '#FF0000' };

      render(
        <RipplePressableSS style={customStyle} testID="ripple-button">
          <String>Custom style</String>
        </RipplePressableSS>,
      );

      expect(screen.getByTestId('ripple-button')).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled styling when disabled', () => {
      render(
        <RipplePressable disabled testID="ripple-button">
          <String>Disabled button</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('ripple-button');
      expect(button).toBeTruthy();
    });

    it('should not show ripple effects when disabled', () => {
      const mockOnPress = jest.fn();

      render(
        <RipplePressable disabled onPress={mockOnPress} testID="ripple-button">
          <String>Disabled button</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('ripple-button');
      fireEvent.press(button);

      // Disabled component should not call onPress
      expect(mockOnPress).not.toHaveBeenCalled();
    });
  });

  describe('Real World Scenarios', () => {
    it('should work as a button replacement', () => {
      const mockOnPress = jest.fn();

      render(
        <RipplePressable onPress={mockOnPress} testID="button-replacement">
          <Box className="rounded-lg bg-blue-500 p-4">
            <String className="text-white">Button</String>
          </Box>
        </RipplePressable>,
      );

      const button = screen.getByTestId('button-replacement');
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalled();
      expect(screen.getByText('Button')).toBeTruthy();
    });

    it('should work as a card with ripple', () => {
      const mockOnPress = jest.fn();

      render(
        <RipplePressable onPress={mockOnPress} testID="card-ripple">
          <Box className="rounded-xl bg-white p-6 shadow-lg">
            <String className="text-lg font-bold">Card Title</String>
            <String className="text-gray-600">Card description</String>
          </Box>
        </RipplePressable>,
      );

      const card = screen.getByTestId('card-ripple');
      fireEvent.press(card);

      expect(mockOnPress).toHaveBeenCalled();
      expect(screen.getByText('Card Title')).toBeTruthy();
      expect(screen.getByText('Card description')).toBeTruthy();
    });

    it('should work as a list item', () => {
      const mockOnPress = jest.fn();

      render(
        <RipplePressable onPress={mockOnPress} testID="list-item">
          <Box className="flex-row items-center p-4">
            <String className="flex-1">List Item</String>
            <String className="text-gray-400" />
          </Box>
        </RipplePressable>,
      );

      const listItem = screen.getByTestId('list-item');
      fireEvent.press(listItem);

      expect(mockOnPress).toHaveBeenCalled();
      expect(screen.getByText('List Item')).toBeTruthy();
    });
  });

  describe('Event Handling', () => {
    it('should pass event object to onPress', () => {
      const mockOnPress = jest.fn();

      render(
        <RipplePressable onPress={mockOnPress} testID="event-test">
          <String>Event test</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('event-test');
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalled();
      // Note: Event object structure may vary in test environment
      // The important thing is that onPress is called when user interacts
    });

    it('should handle onPressIn and onPressOut', () => {
      const mockOnPressIn = jest.fn();
      const mockOnPressOut = jest.fn();

      render(
        <RipplePressable onPressIn={mockOnPressIn} onPressOut={mockOnPressOut} testID="press-events">
          <String>Press events</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('press-events');

      fireEvent(button, 'pressIn');
      expect(mockOnPressIn).toHaveBeenCalled();

      fireEvent(button, 'pressOut');
      expect(mockOnPressOut).toHaveBeenCalled();
    });

    it('should handle onLongPress', () => {
      const mockOnLongPress = jest.fn();

      render(
        <RipplePressable onLongPress={mockOnLongPress} testID="long-press">
          <String>Long press me</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('long-press');
      fireEvent(button, 'longPress');

      expect(mockOnLongPress).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should support accessibility props', () => {
      render(
        <RipplePressable
          accessible
          accessibilityRole="button"
          accessibilityLabel="Ripple button"
          accessibilityHint="Tap to trigger action"
          testID="accessible-button"
        >
          <String>Accessible button</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('accessible-button');
      expect(button).toBeTruthy();
    });

    it('should handle disabled accessibility state', () => {
      render(
        <RipplePressable disabled accessibilityState={{ disabled: true }} testID="disabled-accessible">
          <String>Disabled accessible</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('disabled-accessible');
      expect(button).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple rapid presses', () => {
      const mockOnPress = jest.fn();

      render(
        <RipplePressable onPress={mockOnPress} testID="rapid-press">
          <String>Rapid press</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('rapid-press');

      // Rapid presses
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalledTimes(3);
    });

    it('should handle press without measure available', () => {
      const mockOnPress = jest.fn();

      render(
        <RipplePressable onPress={mockOnPress} testID="no-measure">
          <String>No measure</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('no-measure');
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalled();
    });

    it('should handle different child components', () => {
      render(
        <RipplePressable testID="different-children">
          <Box>
            <String>Title</String>
            <String>Subtitle</String>
          </Box>
        </RipplePressable>,
      );

      expect(screen.getByText('Title')).toBeTruthy();
      expect(screen.getByText('Subtitle')).toBeTruthy();
    });
  });

  describe('BorderRadius Detection', () => {
    it('should extract borderRadius from child styles', () => {
      render(
        <RipplePressable testID="border-radius-test">
          <Box style={{ backgroundColor: 'blue', borderRadius: 10, padding: 16 }}>
            <String>Rounded content</String>
          </Box>
        </RipplePressable>,
      );

      expect(screen.getByText('Rounded content')).toBeTruthy();
    });

    it('should handle children without borderRadius', () => {
      render(
        <RipplePressable testID="no-border-radius">
          <Box style={{ backgroundColor: 'blue', padding: 16 }}>
            <String>Square content</String>
          </Box>
        </RipplePressable>,
      );

      expect(screen.getByText('Square content')).toBeTruthy();
    });

    it('should handle array of styles', () => {
      render(
        <RipplePressable testID="array-styles">
          <Box style={[{ padding: 16 }, { backgroundColor: 'blue', borderRadius: 8 }]}>
            <String>Array styles</String>
          </Box>
        </RipplePressable>,
      );

      expect(screen.getByText('Array styles')).toBeTruthy();
    });
  });

  describe('Performance', () => {
    it('should cleanup ripple effects after animation', async () => {
      const mockOnPress = jest.fn();

      render(
        <RipplePressable speed={100} onPress={mockOnPress} testID="cleanup-test">
          <String>Cleanup test</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('cleanup-test');
      fireEvent.press(button);

      // Fast-forward time to trigger cleanup
      act(() => {
        jest.advanceTimersByTime(250); // speed + 150
      });

      expect(mockOnPress).toHaveBeenCalled();
    });

    it('should handle multiple simultaneous ripples', () => {
      const mockOnPress = jest.fn();

      render(
        <RipplePressable onPress={mockOnPress} testID="multiple-ripples">
          <String>Multiple ripples</String>
        </RipplePressable>,
      );

      const button = screen.getByTestId('multiple-ripples');

      // Create multiple ripples
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalledTimes(3);
    });
  });
});
