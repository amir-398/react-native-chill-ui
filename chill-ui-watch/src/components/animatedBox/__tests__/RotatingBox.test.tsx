import React from 'react';
import { Animated } from 'react-native';
import { render, screen, act, waitFor } from '@testing-library/react-native';

import String from '../../string/components/String';
import RotatingBox from '../components/RotatingBox/RotatingBox';
import RotatingBoxSS from '../components/RotatingBox/RotatingBox.ss';
import RotatingBoxTW from '../components/RotatingBox/RotatingBox.tw';

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

describe('RotatingBox Component - All Variants', () => {
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
        <RotatingBox>
          <String>Rotating Content</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Rotating Content')).toBeTruthy();
    });

    it('should render children correctly (StyleSheet)', () => {
      render(
        <RotatingBoxSS>
          <String>Rotating Content SS</String>
        </RotatingBoxSS>,
      );
      expect(screen.getByText('Rotating Content SS')).toBeTruthy();
    });

    it('should render children correctly (Tailwind)', () => {
      render(
        <RotatingBoxTW>
          <String>Rotating Content TW</String>
        </RotatingBoxTW>,
      );
      expect(screen.getByText('Rotating Content TW')).toBeTruthy();
    });
  });

  describe('Rotation Props', () => {
    it('should render with custom duration', () => {
      render(
        <RotatingBox duration={800}>
          <String>Custom Duration</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Custom Duration')).toBeTruthy();
    });

    it('should render with custom delay', () => {
      render(
        <RotatingBox delay={300}>
          <String>Delayed Rotation</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Delayed Rotation')).toBeTruthy();
    });

    it('should handle autoStart prop', () => {
      render(
        <RotatingBox autoStart>
          <String>Auto Start</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Auto Start')).toBeTruthy();
    });

    it('should handle infiniteLoop prop', () => {
      render(
        <RotatingBox infiniteLoop>
          <String>Infinite Rotation</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Infinite Rotation')).toBeTruthy();
    });

    it('should handle continuous rotation', () => {
      render(
        <RotatingBox continuous>
          <String>Continuous Rotation</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Continuous Rotation')).toBeTruthy();
    });
  });

  describe('Animation Behavior', () => {
    it('should start rotation animation automatically when autoStart is true', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <RotatingBox autoStart duration={500}>
          <String>Auto Rotation</String>
        </RotatingBox>,
      );

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalled();
      });
    });

    it('should use correct duration in rotation animation', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <RotatingBox autoStart duration={1200}>
          <String>Duration Test</String>
        </RotatingBox>,
      );

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            duration: 1200,
          }),
        );
      });
    });
  });

  describe('Ref Methods', () => {
    it('should expose start and stop methods through ref', () => {
      const ref = React.createRef<any>();

      render(
        <RotatingBox ref={ref}>
          <String>Ref Test</String>
        </RotatingBox>,
      );

      expect(ref.current).toBeTruthy();
      expect(typeof ref.current?.start).toBe('function');
      expect(typeof ref.current?.stop).toBe('function');
    });

    it('should reset rotation when stop method is called', async () => {
      const ref = React.createRef<any>();

      render(
        <RotatingBox ref={ref}>
          <String>Manual Stop</String>
        </RotatingBox>,
      );

      act(() => {
        ref.current?.stop();
      });

      // Component should still be rendered after stop
      expect(screen.getByText('Manual Stop')).toBeTruthy();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className (Tailwind)', () => {
      render(
        <RotatingBoxTW className="custom-rotate-class">
          <String>Custom Class</String>
        </RotatingBoxTW>,
      );
      expect(screen.getByText('Custom Class')).toBeTruthy();
    });

    it('should apply custom style (StyleSheet)', () => {
      const customStyle = { backgroundColor: '#00FF00' };
      render(
        <RotatingBoxSS style={customStyle}>
          <String>Custom Style</String>
        </RotatingBoxSS>,
      );
      expect(screen.getByText('Custom Style')).toBeTruthy();
    });
  });

  describe('Real World Scenarios', () => {
    it('should create rotating loading spinner', () => {
      render(
        <RotatingBox continuous autoStart duration={1000}>
          <String>⟳</String>
        </RotatingBox>,
      );
      expect(screen.getByText('⟳')).toBeTruthy();
    });

    it('should create rotating icon button', () => {
      render(
        <RotatingBox autoStart duration={300}>
          <String>🔄</String>
        </RotatingBox>,
      );
      expect(screen.getByText('🔄')).toBeTruthy();
    });

    it('should create rotating card reveal', () => {
      render(
        <RotatingBox autoStart duration={600} delay={200}>
          <String>Card Front</String>
          <String>Card Back</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Card Front')).toBeTruthy();
      expect(screen.getByText('Card Back')).toBeTruthy();
    });

    it('should create rotating logo', () => {
      render(
        <RotatingBox continuous infiniteLoop autoStart duration={2000}>
          <String>LOGO</String>
        </RotatingBox>,
      );
      expect(screen.getByText('LOGO')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero duration', () => {
      render(
        <RotatingBox duration={0} autoStart>
          <String>Instant Rotation</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Instant Rotation')).toBeTruthy();
    });

    it('should handle very long duration', () => {
      render(
        <RotatingBox duration={10000} autoStart>
          <String>Slow Rotation</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Slow Rotation')).toBeTruthy();
    });

    it('should handle very short duration', () => {
      render(
        <RotatingBox duration={50} autoStart>
          <String>Fast Rotation</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Fast Rotation')).toBeTruthy();
    });

    it('should handle continuous without infiniteLoop', () => {
      render(
        <RotatingBox continuous autoStart>
          <String>Single Continuous</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Single Continuous')).toBeTruthy();
    });
  });

  describe('Multiple Rotation Animations', () => {
    it('should handle multiple rotating boxes with different speeds', () => {
      render(
        <>
          <RotatingBox autoStart duration={500}>
            <String>Fast Rotation</String>
          </RotatingBox>
          <RotatingBox autoStart duration={1000} delay={100}>
            <String>Medium Rotation</String>
          </RotatingBox>
          <RotatingBox autoStart duration={2000} delay={200}>
            <String>Slow Rotation</String>
          </RotatingBox>
        </>,
      );

      expect(screen.getByText('Fast Rotation')).toBeTruthy();
      expect(screen.getByText('Medium Rotation')).toBeTruthy();
      expect(screen.getByText('Slow Rotation')).toBeTruthy();
    });
  });

  describe('Continuous Rotation Behavior', () => {
    it('should handle continuous rotation with infiniteLoop', () => {
      render(
        <RotatingBox continuous infiniteLoop autoStart duration={1000}>
          <String>Endless Rotation</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Endless Rotation')).toBeTruthy();
    });

    it('should handle non-continuous rotation', () => {
      render(
        <RotatingBox continuous={false} autoStart duration={500}>
          <String>Single Rotation</String>
        </RotatingBox>,
      );
      expect(screen.getByText('Single Rotation')).toBeTruthy();
    });
  });

  describe('Performance', () => {
    it('should handle rapid start/stop calls', async () => {
      const ref = React.createRef<any>();

      render(
        <RotatingBox ref={ref}>
          <String>Performance Test</String>
        </RotatingBox>,
      );

      // Rapid start/stop calls shouldn't crash
      act(() => {
        ref.current?.start();
        ref.current?.stop();
        ref.current?.start();
        ref.current?.stop();
      });

      expect(screen.getByText('Performance Test')).toBeTruthy();
    });

    it('should handle multiple simultaneous continuous rotations', () => {
      render(
        <>
          <RotatingBox continuous infiniteLoop autoStart duration={500}>
            <String>Spinner 1</String>
          </RotatingBox>
          <RotatingBox continuous infiniteLoop autoStart duration={750}>
            <String>Spinner 2</String>
          </RotatingBox>
          <RotatingBox continuous infiniteLoop autoStart duration={1000}>
            <String>Spinner 3</String>
          </RotatingBox>
        </>,
      );

      expect(screen.getByText('Spinner 1')).toBeTruthy();
      expect(screen.getByText('Spinner 2')).toBeTruthy();
      expect(screen.getByText('Spinner 3')).toBeTruthy();
    });
  });
});
