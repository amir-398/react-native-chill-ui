import React from 'react';
import { Animated } from 'react-native';
import { render, screen, waitFor } from '@testing-library/react-native';

import { Box } from '../../box/components/Box';
import String from '../../string/components/String';
import FadeInBox from '../components/FadeInBox/FadeInBox';
import BounceBox from '../components/BounceBox/BounceBox';
import SlideInBox from '../components/SlideInBox/SlideInBox';
import ScaleInBox from '../components/ScaleInBox/ScaleInBox';
import RotatingBox from '../components/RotatingBox/RotatingBox';

// Mock all style dependencies
jest.mock('../styles/AnimatedBox.styles', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

jest.mock('../../string/styles/String.styles', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

jest.mock('../../box/styles/Box.styles', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

// Mock utilities
jest.mock('../../../utils/tw/cn', () => ({
  __esModule: true,
  default: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

jest.mock('../../../utils/hybrid/propsHandlers', () => ({
  classNameHandler: jest.fn(className => ({ className })),
  styleHandler: jest.fn(style => ({ style: style?.defaultStyle || style })),
}));

describe('AnimatedBox Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Real World UI Scenarios', () => {
    it('should create a welcome screen with sequential animations', async () => {
      function WelcomeScreen() {
        return (
          <Box>
            <FadeInBox autoStart duration={800}>
              <String>Welcome to Our App</String>
            </FadeInBox>
            <SlideInBox direction="up" autoStart delay={500} duration={600}>
              <String>Get started with amazing features</String>
            </SlideInBox>
            <ScaleInBox autoStart delay={1000}>
              <String>Let&apos;s begin!</String>
            </ScaleInBox>
          </Box>
        );
      }

      render(<WelcomeScreen />);

      expect(screen.getByText('Welcome to Our App')).toBeTruthy();
      expect(screen.getByText('Get started with amazing features')).toBeTruthy();
      expect(screen.getByText("Let's begin!")).toBeTruthy();
    });

    it('should create an attention-grabbing notification system', async () => {
      function NotificationSystem() {
        return (
          <Box>
            <SlideInBox direction="right" autoStart duration={400}>
              <BounceBox autoStart bounceHeight={5} infiniteLoop bounceInterval={2000}>
                <String>🔔 New notification!</String>
              </BounceBox>
            </SlideInBox>
          </Box>
        );
      }

      render(<NotificationSystem />);
      expect(screen.getByText('🔔 New notification!')).toBeTruthy();
    });

    it('should create a loading screen with multiple animations', async () => {
      function LoadingScreen() {
        return (
          <Box>
            <FadeInBox autoStart duration={500}>
              <String>Loading...</String>
            </FadeInBox>
            <RotatingBox autoStart infiniteLoop continuous duration={1000}>
              <String>⚙️</String>
            </RotatingBox>
            <BounceBox autoStart infiniteLoop bounceInterval={800}>
              <String>Please wait</String>
            </BounceBox>
          </Box>
        );
      }

      render(<LoadingScreen />);

      expect(screen.getByText('Loading...')).toBeTruthy();
      expect(screen.getByText('⚙️')).toBeTruthy();
      expect(screen.getByText('Please wait')).toBeTruthy();
    });

    it('should create a game UI with multiple interactive elements', async () => {
      function GameUI() {
        return (
          <Box>
            <ScaleInBox autoStart>
              <String>Score: 1000</String>
            </ScaleInBox>
            <BounceBox autoStart bounceHeight={10} infiniteLoop bounceInterval={1500}>
              <String>🏆</String>
            </BounceBox>
            <SlideInBox direction="left" autoStart delay={100}>
              <String>Level 5</String>
            </SlideInBox>
            <FadeInBox autoStart delay={800}>
              <String>New Achievement!</String>
            </FadeInBox>
          </Box>
        );
      }

      render(<GameUI />);

      expect(screen.getByText('Score: 1000')).toBeTruthy();
      expect(screen.getByText('🏆')).toBeTruthy();
      expect(screen.getByText('Level 5')).toBeTruthy();
      expect(screen.getByText('New Achievement!')).toBeTruthy();
    });
  });

  describe('Performance and Memory', () => {
    it('should handle many animated components without performance issues', () => {
      function ManyAnimations() {
        return (
          <Box>
            {Array.from({ length: 10 }, (_, i) => (
              <FadeInBox key={`fade-${i}`} autoStart delay={i * 100}>
                <String>Fade {i + 1}</String>
              </FadeInBox>
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <SlideInBox key={`slide-${i}`} direction="left" autoStart delay={i * 150}>
                <String>Slide {i + 1}</String>
              </SlideInBox>
            ))}
          </Box>
        );
      }

      const { unmount } = render(<ManyAnimations />);

      // Verify all components render
      for (let i = 1; i <= 10; i += 1) {
        expect(screen.getByText(`Fade ${i}`)).toBeTruthy();
      }
      for (let i = 1; i <= 5; i += 1) {
        expect(screen.getByText(`Slide ${i}`)).toBeTruthy();
      }

      // Should unmount without errors
      expect(() => unmount()).not.toThrow();
    });

    it('should properly clean up animations on unmount', () => {
      function AnimatedComponent() {
        return (
          <Box>
            <BounceBox autoStart infiniteLoop>
              <String>Bouncing</String>
            </BounceBox>
            <RotatingBox autoStart infiniteLoop>
              <String>Rotating</String>
            </RotatingBox>
          </Box>
        );
      }

      const { unmount } = render(<AnimatedComponent />);

      expect(screen.getByText('Bouncing')).toBeTruthy();
      expect(screen.getByText('Rotating')).toBeTruthy();

      // Should clean up without throwing errors
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Nested Animations', () => {
    it('should handle nested animated components correctly', () => {
      function NestedAnimations() {
        return (
          <FadeInBox autoStart duration={500}>
            <SlideInBox direction="up" autoStart delay={300}>
              <ScaleInBox autoStart delay={600}>
                <String>Deeply Nested Content</String>
              </ScaleInBox>
            </SlideInBox>
          </FadeInBox>
        );
      }

      render(<NestedAnimations />);
      expect(screen.getByText('Deeply Nested Content')).toBeTruthy();
    });

    it('should handle animation within animation containers', () => {
      function ComplexLayout() {
        return (
          <Box>
            <FadeInBox autoStart>
              <Box>
                <String>Container Title</String>
                <BounceBox autoStart>
                  <String>Bouncing inside fade</String>
                </BounceBox>
              </Box>
            </FadeInBox>
            <SlideInBox direction="right" autoStart delay={200}>
              <Box>
                <RotatingBox autoStart delay={300}>
                  <String>Rotating inside slide</String>
                </RotatingBox>
              </Box>
            </SlideInBox>
          </Box>
        );
      }

      render(<ComplexLayout />);

      expect(screen.getByText('Container Title')).toBeTruthy();
      expect(screen.getByText('Bouncing inside fade')).toBeTruthy();
      expect(screen.getByText('Rotating inside slide')).toBeTruthy();
    });
  });

  describe('Animation Coordination', () => {
    it('should coordinate multiple animations with refs', async () => {
      function CoordinatedAnimations() {
        const fadeRef = React.useRef<any>(null);
        const slideRef = React.useRef<any>(null);
        const bounceRef = React.useRef<any>(null);

        React.useEffect(() => {
          // Start animations in sequence
          fadeRef.current?.start();
          setTimeout(() => slideRef.current?.start(), 300);
          setTimeout(() => bounceRef.current?.start(), 600);
        }, []);

        return (
          <Box>
            <FadeInBox ref={fadeRef}>
              <String>First Animation</String>
            </FadeInBox>
            <SlideInBox ref={slideRef} direction="left">
              <String>Second Animation</String>
            </SlideInBox>
            <BounceBox ref={bounceRef}>
              <String>Third Animation</String>
            </BounceBox>
          </Box>
        );
      }

      render(<CoordinatedAnimations />);

      expect(screen.getByText('First Animation')).toBeTruthy();
      expect(screen.getByText('Second Animation')).toBeTruthy();
      expect(screen.getByText('Third Animation')).toBeTruthy();
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle mixed animation states gracefully', () => {
      function MixedStates() {
        return (
          <Box>
            <FadeInBox autoStart>
              <String>Auto Start</String>
            </FadeInBox>
            <SlideInBox autoStart={false}>
              <String>Manual Start</String>
            </SlideInBox>
            <BounceBox infiniteLoop>
              <String>Infinite Loop</String>
            </BounceBox>
            <RotatingBox autoStart infiniteLoop>
              <String>Auto Infinite</String>
            </RotatingBox>
          </Box>
        );
      }

      render(<MixedStates />);

      expect(screen.getByText('Auto Start')).toBeTruthy();
      expect(screen.getByText('Manual Start')).toBeTruthy();
      expect(screen.getByText('Infinite Loop')).toBeTruthy();
      expect(screen.getByText('Auto Infinite')).toBeTruthy();
    });

    it('should handle rapid mount/unmount cycles', () => {
      function RapidComponent() {
        return (
          <FadeInBox autoStart infiniteLoop>
            <String>Rapid Test</String>
          </FadeInBox>
        );
      }

      // Mount and unmount rapidly
      for (let i = 0; i < 5; i += 1) {
        const { unmount } = render(<RapidComponent />);
        expect(screen.getByText('Rapid Test')).toBeTruthy();
        unmount();
      }
    });
  });

  describe('Accessibility Integration', () => {
    it('should maintain accessibility while animating', () => {
      function AccessibleAnimations() {
        return (
          <Box>
            <FadeInBox autoStart accessible accessibilityLabel="Welcome message" accessibilityRole="text">
              <String>Welcome!</String>
            </FadeInBox>
            <SlideInBox
              direction="up"
              autoStart
              delay={300}
              accessible
              accessibilityLabel="Call to action"
              accessibilityRole="button"
            >
              <String>Get Started</String>
            </SlideInBox>
          </Box>
        );
      }

      render(<AccessibleAnimations />);

      expect(screen.getByText('Welcome!')).toBeTruthy();
      expect(screen.getByText('Get Started')).toBeTruthy();
    });
  });

  describe('Animation Timing and Synchronization', () => {
    it('should handle synchronized animation start times', async () => {
      const mockTiming = jest.spyOn(Animated, 'timing');

      function SynchronizedAnimations() {
        return (
          <Box>
            <FadeInBox autoStart duration={1000}>
              <String>Sync 1</String>
            </FadeInBox>
            <SlideInBox autoStart duration={1000}>
              <String>Sync 2</String>
            </SlideInBox>
            <ScaleInBox autoStart>
              <String>Sync 3</String>
            </ScaleInBox>
          </Box>
        );
      }

      render(<SynchronizedAnimations />);

      await waitFor(() => {
        expect(mockTiming).toHaveBeenCalled();
      });

      expect(screen.getByText('Sync 1')).toBeTruthy();
      expect(screen.getByText('Sync 2')).toBeTruthy();
      expect(screen.getByText('Sync 3')).toBeTruthy();
    });

    it('should handle staggered animation delays', () => {
      function StaggeredAnimations() {
        return (
          <Box>
            {Array.from({ length: 5 }, (_, i) => (
              <FadeInBox key={i} autoStart delay={i * 200}>
                <String>Item {i + 1}</String>
              </FadeInBox>
            ))}
          </Box>
        );
      }

      render(<StaggeredAnimations />);

      for (let i = 1; i <= 5; i += 1) {
        expect(screen.getByText(`Item ${i}`)).toBeTruthy();
      }
    });
  });
});
