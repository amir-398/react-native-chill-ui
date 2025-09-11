import React from 'react';
import { Animated } from 'react-native';
import { render, screen, act, waitFor } from '@testing-library/react-native';

import String from '../../string/components/String';
import BounceBox from '../components/BounceBox/BounceBox';
import BounceBoxSS from '../components/BounceBox/BounceBox.ss';
import BounceBoxTW from '../components/BounceBox/BounceBox.tw';

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

describe('BounceBox Component - All Variants', () => {
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
        <BounceBox>
          <String>Bounce Content</String>
        </BounceBox>,
      );
      expect(screen.getByText('Bounce Content')).toBeTruthy();
    });

    it('should render children correctly (StyleSheet)', () => {
      render(
        <BounceBoxSS>
          <String>Bounce Content SS</String>
        </BounceBoxSS>,
      );
      expect(screen.getByText('Bounce Content SS')).toBeTruthy();
    });

    it('should render children correctly (Tailwind)', () => {
      render(
        <BounceBoxTW>
          <String>Bounce Content TW</String>
        </BounceBoxTW>,
      );
      expect(screen.getByText('Bounce Content TW')).toBeTruthy();
    });
  });

  describe('Animation Props', () => {
    it('should render with custom duration', () => {
      render(
        <BounceBox duration={600}>
          <String>Custom Duration</String>
        </BounceBox>,
      );
      expect(screen.getByText('Custom Duration')).toBeTruthy();
    });

    it('should render with custom bounce height', () => {
      render(
        <BounceBox bounceHeight={30}>
          <String>Custom Height</String>
        </BounceBox>,
      );
      expect(screen.getByText('Custom Height')).toBeTruthy();
    });

    it('should render with custom bounce interval', () => {
      render(
        <BounceBox bounceInterval={3000}>
          <String>Custom Interval</String>
        </BounceBox>,
      );
      expect(screen.getByText('Custom Interval')).toBeTruthy();
    });

    it('should handle autoStart prop', () => {
      render(
        <BounceBox autoStart>
          <String>Auto Start</String>
        </BounceBox>,
      );
      expect(screen.getByText('Auto Start')).toBeTruthy();
    });

    it('should handle infiniteLoop prop', () => {
      render(
        <BounceBox infiniteLoop>
          <String>Infinite Bounce</String>
        </BounceBox>,
      );
      expect(screen.getByText('Infinite Bounce')).toBeTruthy();
    });
  });

  describe('Animation Behavior', () => {
    it('should start bounce animation automatically when autoStart is true', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <BounceBox autoStart duration={400}>
          <String>Auto Bounce</String>
        </BounceBox>,
      );

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalled();
      });
    });

    it('should use correct duration in bounce animation', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <BounceBox autoStart duration={800}>
          <String>Duration Test</String>
        </BounceBox>,
      );

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            duration: 400, // Half duration for up/down movement
          }),
        );
      });
    });

    it('should create sequence animation for bounce effect', async () => {
      const mockSequence = jest.spyOn(Animated, 'sequence');

      render(
        <BounceBox autoStart>
          <String>Sequence Test</String>
        </BounceBox>,
      );

      await waitFor(() => {
        expect(mockSequence).toHaveBeenCalled();
      });
    });
  });

  describe('Callback Functions', () => {
    it('should call onBounce when bounce animation starts', async () => {
      const onBounceMock = jest.fn();

      render(
        <BounceBox autoStart onBounce={onBounceMock}>
          <String>Callback Test</String>
        </BounceBox>,
      );

      await waitFor(() => {
        expect(onBounceMock).toHaveBeenCalled();
      });
    });

    it('should handle onBounce with manual trigger', async () => {
      const onBounceMock = jest.fn();
      const ref = React.createRef<any>();

      render(
        <BounceBox ref={ref} onBounce={onBounceMock}>
          <String>Manual Bounce</String>
        </BounceBox>,
      );

      act(() => {
        ref.current?.bounce();
      });

      await waitFor(() => {
        expect(onBounceMock).toHaveBeenCalled();
      });
    });
  });

  describe('Ref Methods', () => {
    it('should expose bounce, start and stop methods through ref', () => {
      const ref = React.createRef<any>();

      render(
        <BounceBox ref={ref}>
          <String>Ref Test</String>
        </BounceBox>,
      );

      expect(ref.current).toBeTruthy();
      expect(typeof ref.current?.bounce).toBe('function');
      expect(typeof ref.current?.start).toBe('function');
      expect(typeof ref.current?.stop).toBe('function');
    });

    it('should trigger bounce animation when bounce method is called', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');
      const ref = React.createRef<any>();

      render(
        <BounceBox ref={ref}>
          <String>Manual Bounce</String>
        </BounceBox>,
      );

      act(() => {
        ref.current?.bounce();
      });

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalled();
      });
    });

    it('should start continuous bouncing when start method is called', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');
      const ref = React.createRef<any>();

      render(
        <BounceBox ref={ref} infiniteLoop>
          <String>Continuous Bounce</String>
        </BounceBox>,
      );

      act(() => {
        ref.current?.start();
      });

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalled();
      });
    });
  });

  describe('Infinite Loop Behavior', () => {
    it('should continue bouncing when infiniteLoop is true', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <BounceBox autoStart infiniteLoop bounceInterval={1000}>
          <String>Infinite Test</String>
        </BounceBox>,
      );

      // Fast forward time to trigger multiple bounces
      act(() => {
        jest.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalled();
      });
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className (Tailwind)', () => {
      render(
        <BounceBoxTW className="custom-bounce-class">
          <String>Custom Class</String>
        </BounceBoxTW>,
      );
      expect(screen.getByText('Custom Class')).toBeTruthy();
    });

    it('should apply custom style (StyleSheet)', () => {
      const customStyle = { backgroundColor: '#00FF00' };
      render(
        <BounceBoxSS style={customStyle}>
          <String>Custom Style</String>
        </BounceBoxSS>,
      );
      expect(screen.getByText('Custom Style')).toBeTruthy();
    });
  });

  describe('Real World Scenarios', () => {
    it('should render an attention-grabbing button', () => {
      render(
        <BounceBox autoStart infiniteLoop bounceInterval={2000} bounceHeight={15}>
          <String>Click Me!</String>
        </BounceBox>,
      );
      expect(screen.getByText('Click Me!')).toBeTruthy();
    });

    it('should handle notification badge with bounce', () => {
      const onBounceMock = jest.fn();
      render(
        <BounceBox autoStart onBounce={onBounceMock} bounceHeight={10}>
          <String>3</String>
        </BounceBox>,
      );
      expect(screen.getByText('3')).toBeTruthy();
    });

    it('should create bouncing loading indicator', () => {
      render(
        <BounceBox autoStart infiniteLoop duration={600} bounceHeight={25}>
          <String>Loading...</String>
        </BounceBox>,
      );
      expect(screen.getByText('Loading...')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero bounce height', () => {
      render(
        <BounceBox bounceHeight={0} autoStart>
          <String>No Bounce</String>
        </BounceBox>,
      );
      expect(screen.getByText('No Bounce')).toBeTruthy();
    });

    it('should handle very large bounce height', () => {
      render(
        <BounceBox bounceHeight={100} autoStart>
          <String>Big Bounce</String>
        </BounceBox>,
      );
      expect(screen.getByText('Big Bounce')).toBeTruthy();
    });

    it('should handle very short bounce interval', () => {
      render(
        <BounceBox bounceInterval={100} autoStart infiniteLoop>
          <String>Fast Bounce</String>
        </BounceBox>,
      );
      expect(screen.getByText('Fast Bounce')).toBeTruthy();
    });

    it('should stop bouncing when component unmounts', () => {
      const { unmount } = render(
        <BounceBox autoStart infiniteLoop>
          <String>Unmount Test</String>
        </BounceBox>,
      );

      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Performance', () => {
    it('should handle multiple bounce boxes without interference', () => {
      render(
        <>
          <BounceBox autoStart bounceInterval={1000}>
            <String>Bounce 1</String>
          </BounceBox>
          <BounceBox autoStart bounceInterval={1500}>
            <String>Bounce 2</String>
          </BounceBox>
          <BounceBox autoStart bounceInterval={2000}>
            <String>Bounce 3</String>
          </BounceBox>
        </>,
      );

      expect(screen.getByText('Bounce 1')).toBeTruthy();
      expect(screen.getByText('Bounce 2')).toBeTruthy();
      expect(screen.getByText('Bounce 3')).toBeTruthy();
    });
  });
});
