import React from 'react';
import { Animated } from 'react-native';
import { render, screen, act, waitFor } from '@testing-library/react-native';

import String from '../../string/components/String';
import FadeInBox from '../components/FadeInBox/FadeInBox';
import FadeInBoxSS from '../components/FadeInBox/FadeInBox.ss';
import FadeInBoxTW from '../components/FadeInBox/FadeInBox.tw';

// Mock StyleSheet styles
jest.mock('../styles/AnimatedBox.styles', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
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

describe('FadeInBox Component - All Variants', () => {
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
        <FadeInBox>
          <String>Fade In Content</String>
        </FadeInBox>,
      );
      expect(screen.getByText('Fade In Content')).toBeTruthy();
    });

    it('should render children correctly (StyleSheet)', () => {
      render(
        <FadeInBoxSS>
          <String>Fade In Content SS</String>
        </FadeInBoxSS>,
      );
      expect(screen.getByText('Fade In Content SS')).toBeTruthy();
    });

    it('should render children correctly (Tailwind)', () => {
      render(
        <FadeInBoxTW>
          <String>Fade In Content TW</String>
        </FadeInBoxTW>,
      );
      expect(screen.getByText('Fade In Content TW')).toBeTruthy();
    });

    it('should handle empty children', () => {
      const component = render(<FadeInBox />);
      expect(component).toBeTruthy();
    });
  });

  describe('Animation Props', () => {
    it('should render with custom duration', () => {
      render(
        <FadeInBox duration={2000}>
          <String>Custom Duration</String>
        </FadeInBox>,
      );
      expect(screen.getByText('Custom Duration')).toBeTruthy();
    });

    it('should render with custom delay', () => {
      render(
        <FadeInBox delay={500}>
          <String>Delayed Fade</String>
        </FadeInBox>,
      );
      expect(screen.getByText('Delayed Fade')).toBeTruthy();
    });

    it('should handle autoStart prop', () => {
      render(
        <FadeInBox autoStart>
          <String>Auto Start</String>
        </FadeInBox>,
      );
      expect(screen.getByText('Auto Start')).toBeTruthy();
    });

    it('should handle infiniteLoop prop', () => {
      render(
        <FadeInBox infiniteLoop>
          <String>Infinite Loop</String>
        </FadeInBox>,
      );
      expect(screen.getByText('Infinite Loop')).toBeTruthy();
    });
  });

  describe('Animation Behavior', () => {
    it('should start animation automatically when autoStart is true', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <FadeInBox autoStart duration={1000}>
          <String>Auto Animation</String>
        </FadeInBox>,
      );

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalled();
      });
    });

    it('should not start animation automatically when autoStart is false', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <FadeInBox autoStart={false}>
          <String>Manual Animation</String>
        </FadeInBox>,
      );

      expect(mockTiming).not.toHaveBeenCalled();
    });

    it('should use correct duration in animation', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <FadeInBox autoStart duration={2000}>
          <String>Duration Test</String>
        </FadeInBox>,
      );

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            duration: 2000,
          }),
        );
      });
    });
  });

  describe('Ref Methods', () => {
    it('should expose start and stop methods through ref', () => {
      const ref = React.createRef<any>();

      render(
        <FadeInBox ref={ref}>
          <String>Ref Test</String>
        </FadeInBox>,
      );

      expect(ref.current).toBeTruthy();
      expect(typeof ref.current?.start).toBe('function');
      expect(typeof ref.current?.stop).toBe('function');
    });

    it('should start animation when start method is called', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');
      const ref = React.createRef<any>();

      render(
        <FadeInBox ref={ref}>
          <String>Manual Start</String>
        </FadeInBox>,
      );

      act(() => {
        ref.current?.start();
      });

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalled();
      });
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className (Tailwind)', () => {
      render(
        <FadeInBoxTW className="custom-fade-class">
          <String>Custom Class</String>
        </FadeInBoxTW>,
      );
      expect(screen.getByText('Custom Class')).toBeTruthy();
    });

    it('should apply custom style (StyleSheet)', () => {
      const customStyle = { backgroundColor: '#FF0000' };
      render(
        <FadeInBoxSS style={customStyle}>
          <String>Custom Style</String>
        </FadeInBoxSS>,
      );
      expect(screen.getByText('Custom Style')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should handle accessibility props', () => {
      render(
        <FadeInBox accessible accessibilityLabel="Fade animation" accessibilityRole="none">
          <String>Accessible Fade</String>
        </FadeInBox>,
      );

      const textElement = screen.getByText('Accessible Fade');
      expect(textElement).toBeTruthy();
    });
  });

  describe('Real World Scenarios', () => {
    it('should render a welcome message with fade in', () => {
      render(
        <FadeInBox autoStart duration={1000} delay={500}>
          <String>Welcome to our app!</String>
        </FadeInBox>,
      );
      expect(screen.getByText('Welcome to our app!')).toBeTruthy();
    });

    it('should handle complex nested content', () => {
      render(
        <FadeInBox autoStart>
          <String>Title</String>
          <String>Subtitle</String>
        </FadeInBox>,
      );
      expect(screen.getByText('Title')).toBeTruthy();
      expect(screen.getByText('Subtitle')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero duration', () => {
      render(
        <FadeInBox duration={0} autoStart>
          <String>Instant Fade</String>
        </FadeInBox>,
      );
      expect(screen.getByText('Instant Fade')).toBeTruthy();
    });

    it('should handle very large duration', () => {
      render(
        <FadeInBox duration={10000} autoStart>
          <String>Slow Fade</String>
        </FadeInBox>,
      );
      expect(screen.getByText('Slow Fade')).toBeTruthy();
    });

    it('should handle multiple fade boxes simultaneously', () => {
      render(
        <>
          <FadeInBox autoStart>
            <String>Fade 1</String>
          </FadeInBox>
          <FadeInBox autoStart delay={200}>
            <String>Fade 2</String>
          </FadeInBox>
        </>,
      );
      expect(screen.getByText('Fade 1')).toBeTruthy();
      expect(screen.getByText('Fade 2')).toBeTruthy();
    });
  });
});
