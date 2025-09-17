import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { Box } from '../../box/components/Box';
import String from '../../string/components/String';
import FadeInBox from '../components/FadeInBox/FadeInBox';
import BounceBox from '../components/BounceBox/BounceBox';
import SlideInBox from '../components/SlideInBox/SlideInBox';
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
    it('should create a welcome screen with sequential animations', () => {
      render(
        <Box>
          <FadeInBox autoStart duration={1000}>
            <String>Welcome!</String>
          </FadeInBox>
          <SlideInBox autoStart direction="up" delay={500}>
            <String>Get started</String>
          </SlideInBox>
        </Box>,
      );

      expect(screen.getByText('Welcome!')).toBeTruthy();
      expect(screen.getByText('Get started')).toBeTruthy();
    });

    it('should create a loading screen with multiple animations', () => {
      render(
        <Box>
          <RotatingBox autoStart infiniteLoop>
            <String>Loading...</String>
          </RotatingBox>
          <BounceBox autoStart infiniteLoop>
            <String>Please wait</String>
          </BounceBox>
        </Box>,
      );

      expect(screen.getByText('Loading...')).toBeTruthy();
      expect(screen.getByText('Please wait')).toBeTruthy();
    });
  });

  describe('Performance and Memory', () => {
    it('should handle many animated components without performance issues', () => {
      const components = Array.from({ length: 5 }, (_, i) => (
        <FadeInBox key={i} autoStart delay={i * 100}>
          <String>Component {i + 1}</String>
        </FadeInBox>
      ));

      render(<Box>{components}</Box>);

      expect(screen.getByText('Component 1')).toBeTruthy();
      expect(screen.getByText('Component 5')).toBeTruthy();
    });
  });

  describe('Animation Coordination', () => {
    it('should coordinate multiple animations with refs', () => {
      const fadeRef = React.createRef<any>();
      const slideRef = React.createRef<any>();

      render(
        <Box>
          <FadeInBox ref={fadeRef}>
            <String>Fade Component</String>
          </FadeInBox>
          <SlideInBox ref={slideRef}>
            <String>Slide Component</String>
          </SlideInBox>
        </Box>,
      );

      expect(fadeRef.current).toBeTruthy();
      expect(slideRef.current).toBeTruthy();
      expect(typeof fadeRef.current?.start).toBe('function');
      expect(typeof slideRef.current?.start).toBe('function');
    });
  });
});
