import React from 'react';
import { Animated } from 'react-native';
import { render, screen, act, waitFor } from '@testing-library/react-native';

import String from '../../string/components/String';
import SlideInBox from '../components/SlideInBox/SlideInBox';
import SlideInBoxSS from '../components/SlideInBox/SlideInBox.ss';
import SlideInBoxTW from '../components/SlideInBox/SlideInBox.tw';

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

describe('SlideInBox Component - All Variants', () => {
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
        <SlideInBox>
          <String>Slide Content</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Slide Content')).toBeTruthy();
    });

    it('should render children correctly (StyleSheet)', () => {
      render(
        <SlideInBoxSS>
          <String>Slide Content SS</String>
        </SlideInBoxSS>,
      );
      expect(screen.getByText('Slide Content SS')).toBeTruthy();
    });

    it('should render children correctly (Tailwind)', () => {
      render(
        <SlideInBoxTW>
          <String>Slide Content TW</String>
        </SlideInBoxTW>,
      );
      expect(screen.getByText('Slide Content TW')).toBeTruthy();
    });
  });

  describe('Direction Props', () => {
    const directions = ['left', 'right', 'up', 'down'] as const;

    directions.forEach(direction => {
      it(`should render with ${direction} direction`, () => {
        render(
          <SlideInBox direction={direction}>
            <String>Slide {direction}</String>
          </SlideInBox>,
        );
        expect(screen.getByText(`Slide ${direction}`)).toBeTruthy();
      });
    });

    it('should default to left direction when not specified', () => {
      render(
        <SlideInBox>
          <String>Default Direction</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Default Direction')).toBeTruthy();
    });
  });

  describe('Animation Props', () => {
    it('should render with custom duration', () => {
      render(
        <SlideInBox duration={800}>
          <String>Custom Duration</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Custom Duration')).toBeTruthy();
    });

    it('should render with custom distance', () => {
      render(
        <SlideInBox distance={150}>
          <String>Custom Distance</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Custom Distance')).toBeTruthy();
    });

    it('should render with custom delay', () => {
      render(
        <SlideInBox delay={300}>
          <String>Delayed Slide</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Delayed Slide')).toBeTruthy();
    });

    it('should handle autoStart prop', () => {
      render(
        <SlideInBox autoStart>
          <String>Auto Start</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Auto Start')).toBeTruthy();
    });

    it('should handle infiniteLoop prop', () => {
      render(
        <SlideInBox infiniteLoop>
          <String>Infinite Slide</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Infinite Slide')).toBeTruthy();
    });
  });

  describe('Animation Behavior', () => {
    it('should start slide animation automatically when autoStart is true', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <SlideInBox autoStart duration={500}>
          <String>Auto Slide</String>
        </SlideInBox>,
      );

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalled();
      });
    });

    it('should use correct duration in slide animation', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      render(
        <SlideInBox autoStart duration={1200}>
          <String>Duration Test</String>
        </SlideInBox>,
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
        <SlideInBox ref={ref}>
          <String>Ref Test</String>
        </SlideInBox>,
      );

      expect(ref.current).toBeTruthy();
      expect(typeof ref.current?.start).toBe('function');
      expect(typeof ref.current?.stop).toBe('function');
    });

    it('should reset position when stop method is called', async () => {
      const mockValue = { setValue: jest.fn() };
      jest.spyOn(Animated, 'Value').mockReturnValue(mockValue as any);
      const ref = React.createRef<any>();

      render(
        <SlideInBox ref={ref} direction="left" distance={100}>
          <String>Manual Stop</String>
        </SlideInBox>,
      );

      act(() => {
        ref.current?.stop();
      });

      expect(mockValue.setValue).toHaveBeenCalledWith(-100);
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className (Tailwind)', () => {
      render(
        <SlideInBoxTW className="custom-slide-class">
          <String>Custom Class</String>
        </SlideInBoxTW>,
      );
      expect(screen.getByText('Custom Class')).toBeTruthy();
    });

    it('should apply custom style (StyleSheet)', () => {
      const customStyle = { backgroundColor: '#0000FF' };
      render(
        <SlideInBoxSS style={customStyle}>
          <String>Custom Style</String>
        </SlideInBoxSS>,
      );
      expect(screen.getByText('Custom Style')).toBeTruthy();
    });
  });

  describe('Real World Scenarios', () => {
    it('should create slide-in notification', () => {
      render(
        <SlideInBox direction="right" autoStart duration={300} distance={200}>
          <String>New message received!</String>
        </SlideInBox>,
      );
      expect(screen.getByText('New message received!')).toBeTruthy();
    });

    it('should create slide-in menu', () => {
      render(
        <SlideInBox direction="left" autoStart duration={400}>
          <String>Menu Item 1</String>
          <String>Menu Item 2</String>
          <String>Menu Item 3</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Menu Item 1')).toBeTruthy();
      expect(screen.getByText('Menu Item 2')).toBeTruthy();
      expect(screen.getByText('Menu Item 3')).toBeTruthy();
    });

    it('should create slide-in modal', () => {
      render(
        <SlideInBox direction="up" autoStart duration={500} distance={300}>
          <String>Modal Title</String>
          <String>Modal content goes here</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Modal Title')).toBeTruthy();
      expect(screen.getByText('Modal content goes here')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero distance', () => {
      render(
        <SlideInBox distance={0} autoStart>
          <String>No Distance</String>
        </SlideInBox>,
      );
      expect(screen.getByText('No Distance')).toBeTruthy();
    });

    it('should handle very large distance', () => {
      render(
        <SlideInBox distance={1000} autoStart>
          <String>Large Distance</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Large Distance')).toBeTruthy();
    });

    it('should handle negative distance', () => {
      render(
        <SlideInBox distance={-50} autoStart>
          <String>Negative Distance</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Negative Distance')).toBeTruthy();
    });

    it('should handle zero duration', () => {
      render(
        <SlideInBox duration={0} autoStart>
          <String>Instant Slide</String>
        </SlideInBox>,
      );
      expect(screen.getByText('Instant Slide')).toBeTruthy();
    });
  });

  describe('Multiple Directions Simultaneously', () => {
    it('should handle multiple slide boxes with different directions', () => {
      render(
        <>
          <SlideInBox direction="left" autoStart>
            <String>From Left</String>
          </SlideInBox>
          <SlideInBox direction="right" autoStart delay={100}>
            <String>From Right</String>
          </SlideInBox>
          <SlideInBox direction="up" autoStart delay={200}>
            <String>From Up</String>
          </SlideInBox>
          <SlideInBox direction="down" autoStart delay={300}>
            <String>From Down</String>
          </SlideInBox>
        </>,
      );

      expect(screen.getByText('From Left')).toBeTruthy();
      expect(screen.getByText('From Right')).toBeTruthy();
      expect(screen.getByText('From Up')).toBeTruthy();
      expect(screen.getByText('From Down')).toBeTruthy();
    });
  });
});
