import { View } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';

import String from '../components/String';

// Mock des utilitaires hybrid
jest.mock('../../../utils/hybrid/classNameMissingError', () => ({
  classNamePropsHandler: jest.fn(),
}));

jest.mock('../../../utils/hybrid/colorVariantPropsHandler', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../utils/hybrid/propsHandlers', () => ({
  classNameHandler: jest.fn(className => ({ className })),
  styleHandler: jest.fn(style => ({ style: style.defaultStyle })),
}));

describe('String Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Real World Usage Scenarios', () => {
    it('should render a typical heading', () => {
      render(
        <String variant="title-1" colorVariant="primary" position="center">
          Welcome to Our App
        </String>,
      );

      expect(screen.getByText('Welcome to Our App')).toBeTruthy();
    });

    it('should render a body text with custom styling', () => {
      render(
        <String variant="body-1" colorVariant="secondary" style={{ marginVertical: 10 }}>
          This is a paragraph of body text that provides information to the user.
        </String>,
      );

      expect(screen.getByText('This is a paragraph of body text that provides information to the user.')).toBeTruthy();
    });

    it('should render an interactive text button', () => {
      const onPressMock = jest.fn();

      render(
        <String
          colorVariant="primary"
          weight="bold"
          onPress={onPressMock}
          accessibilityRole="button"
          accessibilityLabel="Click to continue"
        >
          Continue
        </String>,
      );

      const button = screen.getByText('Continue');
      fireEvent.press(button);

      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('should render error message with appropriate styling', () => {
      render(
        <String colorVariant="error" size="sm" variant="body-sm" accessibilityRole="alert">
          Please enter a valid email address
        </String>,
      );

      expect(screen.getByText('Please enter a valid email address')).toBeTruthy();
    });

    it('should render success message', () => {
      render(
        <String colorVariant="success" weight="medium" position="center">
          ✅ Account created successfully!
        </String>,
      );

      expect(screen.getByText('✅ Account created successfully!')).toBeTruthy();
    });
  });

  describe('Layout Integration', () => {
    it('should work properly within a View container', () => {
      render(
        <View testID="container">
          <String variant="title-2" position="center">
            Header
          </String>
          <String variant="body-1" colorVariant="muted">
            This is the content below the header.
          </String>
        </View>,
      );

      expect(screen.getByTestId('container')).toBeTruthy();
      expect(screen.getByText('Header')).toBeTruthy();
      expect(screen.getByText('This is the content below the header.')).toBeTruthy();
    });

    it('should handle multiple String components with different styles', () => {
      render(
        <View>
          <String variant="title-1" colorVariant="primary">
            Main Title
          </String>
          <String variant="title-2" colorVariant="secondary">
            Subtitle
          </String>
          <String variant="body-1" colorVariant="neutral">
            Body text
          </String>
          <String variant="body-sm" colorVariant="muted">
            Small text
          </String>
        </View>,
      );

      expect(screen.getByText('Main Title')).toBeTruthy();
      expect(screen.getByText('Subtitle')).toBeTruthy();
      expect(screen.getByText('Body text')).toBeTruthy();
      expect(screen.getByText('Small text')).toBeTruthy();
    });
  });

  describe('Dynamic Content', () => {
    it('should handle dynamic text content', () => {
      const userName = 'John Doe';
      const unreadCount = 5;

      render(
        <String>
          Welcome back, {userName}! You have {unreadCount} unread messages.
        </String>,
      );

      expect(screen.getByText('Welcome back, John Doe! You have 5 unread messages.')).toBeTruthy();
    });

    it('should handle conditional rendering', () => {
      const isLoggedIn = true;
      const userName = 'Alice';

      render(
        <View>
          {isLoggedIn ? (
            <String colorVariant="success">Welcome, {userName}!</String>
          ) : (
            <String colorVariant="neutral">Please log in</String>
          )}
        </View>,
      );

      expect(screen.getByText('Welcome, Alice!')).toBeTruthy();
      expect(screen.queryByText('Please log in')).toBeNull();
    });
  });

  describe('Accessibility Integration', () => {
    it('should work with screen readers', () => {
      render(
        <String accessibilityRole="header" variant="title-1">
          Main Page Title
        </String>,
      );

      const heading = screen.getByText('Main Page Title');
      expect(heading.props.accessibilityRole).toBe('header');
    });

    it('should provide proper accessibility labels for interactive text', () => {
      render(
        <String
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel="Open settings menu"
          accessibilityHint="Double tap to open the settings"
        >
          Settings
        </String>,
      );

      const button = screen.getByText('Settings');
      expect(button.props.accessibilityRole).toBe('button');
      expect(button.props.accessibilityLabel).toBe('Open settings menu');
      expect(button.props.accessibilityHint).toBe('Double tap to open the settings');
    });

    it('should handle accessibility state', () => {
      render(
        <String accessibilityRole="button" accessibilityState={{ disabled: false, selected: true }}>
          Active Tab
        </String>,
      );

      const button = screen.getByText('Active Tab');
      expect(button.props.accessibilityState).toEqual({ disabled: false, selected: true });
    });
  });

  describe('Performance Scenarios', () => {
    it('should handle long text content efficiently', () => {
      const longText = 'Lorem ipsum '.repeat(100);

      render(
        <String numberOfLines={3} ellipsizeMode="tail">
          {longText}
        </String>,
      );

      expect(screen.getByText(longText)).toBeTruthy();
    });

    it('should handle rapid re-renders', () => {
      const { rerender } = render(<String>Initial text</String>);

      for (let i = 0; i < 10; i += 1) {
        rerender(<String>Updated text {i}</String>);
      }

      expect(screen.getByText('Updated text 9')).toBeTruthy();
    });
  });

  describe('Edge Cases in Real Usage', () => {
    it('should handle empty string gracefully', () => {
      render(<String />);
      // Should not crash
    });

    it('should handle whitespace-only content', () => {
      render(<String> </String>);
      expect(screen.getByText('   ')).toBeTruthy();
    });

    it('should handle mixed content types', () => {
      const mixedContent = ['Text ', 42, ' more text ', null, ' final text'];

      render(<String>{mixedContent}</String>);
      expect(screen.getByText('Text 42 more text  final text')).toBeTruthy();
    });

    it('should handle unicode and emoji content', () => {
      render(<String>Hello 👋 World 🌍 Unicode: àáâãäå 中文 العربية</String>);

      expect(screen.getByText('Hello 👋 World 🌍 Unicode: àáâãäå 中文 العربية')).toBeTruthy();
    });
  });

  describe('Theme Integration', () => {
    it('should work with different color combinations', () => {
      const colorCombinations = [
        { colorVariant: 'primary' as const, variant: 'title-1' as const },
        { colorVariant: 'secondary' as const, variant: 'body-1' as const },
        { colorVariant: 'success' as const, variant: 'body-sm' as const },
        { colorVariant: 'error' as const, variant: 'body-xs' as const },
      ];

      render(
        <View>
          {colorCombinations.map((combo, index) => (
            <String key={index} {...combo}>
              Test {index}
            </String>
          ))}
        </View>,
      );

      colorCombinations.forEach((_, index) => {
        expect(screen.getByText(`Test ${index}`)).toBeTruthy();
      });
    });

    it('should handle font family combinations', () => {
      const fontCombinations = [
        { font: 'primaryRegular' as const, weight: 'normal' as const },
        { font: 'primaryBold' as const, weight: 'bold' as const },
        { font: 'secondaryMedium' as const, weight: 'medium' as const },
      ];

      render(
        <View>
          {fontCombinations.map((combo, index) => (
            <String key={index} {...combo}>
              Font Test {index}
            </String>
          ))}
        </View>,
      );

      fontCombinations.forEach((_, index) => {
        expect(screen.getByText(`Font Test ${index}`)).toBeTruthy();
      });
    });
  });
});
