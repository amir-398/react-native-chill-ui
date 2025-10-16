import React, { useState } from 'react';
import { render } from '@testing-library/react-native';

import { Button } from '../index';

// Mocks
jest.mock('../../../components/box', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  Icon: ({ name, onPress, ...props }: any) => <div data-testid={`icon-${name}`} onClick={onPress} {...props} />,
}));

jest.mock('../../../components/string', () => ({
  String: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));

jest.mock('../../../components/loadingIndicatorsKit', () => ({
  LoadingIndicator: ({ name, ...props }: any) => <div data-testid={`loading-${name}`} {...props} />,
}));

jest.mock('../../../components/ripplePressable', () => ({
  RipplePressable: ({ children, onPress, ...props }: any) => (
    <div data-testid="ripple-pressable" onClick={onPress} {...props}>
      {children}
    </div>
  ),
}));

jest.mock('../../../components/scalePressable', () => ({
  ScalePressable: ({ children, onPress, ...props }: any) => (
    <div data-testid="scale-pressable" onClick={onPress} {...props}>
      {children}
    </div>
  ),
}));

jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  colorVariantPropsHandler: jest.fn(),
  styleHandler: jest.fn(() => ({})),
}));

jest.mock('../styles/Button.ss.styles', () => ({
  ButtonSv: jest.fn(() => ({})),
  IconContainerSv: jest.fn(() => ({})),
  styles: { contentContainer: {}, pointerEventsNone: {}, stringContainer: {} },
}));

jest.mock('../styles/Button.tw.styles', () => ({
  ButtonTv: jest.fn(() => ''),
  IconPositionTv: jest.fn(() => ''),
  twStyles: { contentContainer: '', pointerEventsNone: '', stringContainer: '' },
}));

// Test components
function TestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 100));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div>
      <Button
        title={isSubmitting ? 'Submitting...' : 'Submit Form'}
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
        onPress={handleSubmit}
      />
      {submitted && <div data-testid="success-message">Form submitted!</div>}
    </div>
  );
}

function TestNavigation() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      <div data-testid="current-page">{currentPage}</div>
      <Button
        title="Go to Profile"
        rightIconAction={{ name: 'arrow-right-solid', size: 'md' }}
        onPress={() => setCurrentPage('profile')}
      />
      <Button
        title="Go to Settings"
        leftIconAction={{ name: 'settings-solid', size: 'md' }}
        onPress={() => setCurrentPage('settings')}
      />
    </div>
  );
}

describe('Button Integration Tests', () => {
  describe('Form Submission Flow', () => {
    it('should render form without crashing', () => {
      const { root } = render(<TestForm />);
      expect(root).toBeTruthy();
    });
  });

  describe('Navigation Flow', () => {
    it('should render navigation without crashing', () => {
      const { root } = render(<TestNavigation />);
      expect(root).toBeTruthy();
    });
  });

  describe('Complex Button Interactions', () => {
    it('should handle button with multiple icons and custom content', () => {
      const { root } = render(
        <Button
          title="Complex Button"
          leftIconAction={{ name: 'home-solid', size: 'md' }}
          rightIconAction={{ name: 'arrow-right-solid', size: 'md' }}
          variant="contained"
          colorVariant="primary"
          size="lg"
        />,
      );

      expect(root).toBeTruthy();
    });

    it('should handle custom content with icons', () => {
      const { root } = render(
        <Button
          leftIconAction={{ name: 'star-solid', size: 'md' }}
          rightIconAction={{ name: 'heart-solid', size: 'md' }}
        >
          <div data-testid="custom-content">Custom Button Content</div>
        </Button>,
      );

      expect(root).toBeTruthy();
    });

    it('should handle all touchable types', () => {
      const touchableTypes = ['touchable-opacity', 'pressable', 'ripple-pressable', 'scale-pressable'] as const;

      touchableTypes.forEach(type => {
        const { root } = render(<Button title={`${type} Button`} as={type} />);
        expect(root).toBeTruthy();
      });
    });
  });

  describe('Error Handling', () => {
    it('should render error button without crashing', () => {
      const errorOnPress = () => {
        throw new Error('Test error');
      };

      const { root } = render(<Button title="Error Button" onPress={errorOnPress} />);
      expect(root).toBeTruthy();
    });
  });
});
