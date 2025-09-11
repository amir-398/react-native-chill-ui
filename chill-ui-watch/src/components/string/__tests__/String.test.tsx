import { TextStyle } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';

import String from '../components/String';
import StringSS from '../components/String.ss';
import StringTW from '../components/String.tw';

// Mocks pour StyleSheet
jest.mock('../styles/String.styles', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

// Mocks pour Hybrid
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

// Mocks pour Tailwind
jest.mock('../../../utils/tw/cn', () => ({
  __esModule: true,
  default: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

describe('String Component - All Variants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render text content correctly (Hybrid)', () => {
      render(<String>Hello World</String>);
      expect(screen.getByText('Hello World')).toBeTruthy();
    });

    it('should render text content correctly (StyleSheet)', () => {
      render(<StringSS>Hello World</StringSS>);
      expect(screen.getByText('Hello World')).toBeTruthy();
    });

    it('should render text content correctly (Tailwind)', () => {
      render(<StringTW>Hello World</StringTW>);
      expect(screen.getByText('Hello World')).toBeTruthy();
    });

    it('should handle empty children', () => {
      const component = render(<String />);
      expect(component).toBeTruthy();
    });
  });

  describe('Essential Props', () => {
    it('should render with different sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      sizes.forEach(size => {
        render(<String size={size}>Size {size}</String>);
        expect(screen.getByText(`Size ${size}`)).toBeTruthy();
      });
    });

    it('should render with color variants', () => {
      const colors = ['primary', 'secondary', 'success', 'error'] as const;

      colors.forEach(color => {
        render(<String colorVariant={color}>Color {color}</String>);
        expect(screen.getByText(`Color ${color}`)).toBeTruthy();
      });
    });

    it('should render with text variants', () => {
      const variants = ['body-1', 'title-1', 'title-2'] as const;

      variants.forEach(variant => {
        render(<String variant={variant}>Variant {variant}</String>);
        expect(screen.getByText(`Variant ${variant}`)).toBeTruthy();
      });
    });

    it('should render with positions', () => {
      const positions = ['left', 'center', 'right'] as const;

      positions.forEach(position => {
        render(<String position={position}>Position {position}</String>);
        expect(screen.getByText(`Position ${position}`)).toBeTruthy();
      });
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom color with Tailwind', () => {
      const { getByText } = render(<StringTW color="#FF0000">Custom Color</StringTW>);
      const textElement = getByText('Custom Color');
      expect(textElement.props.style).toEqual(expect.objectContaining({ color: '#FF0000' }));
    });

    it('should apply custom style with StyleSheet', () => {
      const customStyle = { fontSize: 20, fontWeight: 'bold' } as TextStyle;
      const { getByText } = render(<StringSS style={customStyle}>Custom Style</StringSS>);
      const textElement = getByText('Custom Style');
      expect(textElement.props.style).toEqual(expect.arrayContaining([expect.any(Object), customStyle]));
    });

    it('should combine multiple styles with Tailwind', () => {
      const customStyle = { fontWeight: 'bold' } as TextStyle;
      const { getByText } = render(
        <StringTW size="lg" color="#FF0000" style={customStyle}>
          Combined Styles
        </StringTW>,
      );
      const textElement = getByText('Combined Styles');
      expect(textElement.props.style).toEqual(
        expect.objectContaining({
          color: '#FF0000',
          fontWeight: 'bold',
        }),
      );
    });
  });

  describe('React Native Props', () => {
    it('should handle onPress and other Text props', () => {
      const onPressMock = jest.fn();
      render(
        <String onPress={onPressMock} numberOfLines={2} ellipsizeMode="tail" testID="string-test">
          Interactive Text
        </String>,
      );

      const textElement = screen.getByText('Interactive Text');
      fireEvent.press(textElement);

      expect(onPressMock).toHaveBeenCalledTimes(1);
      expect(textElement.props.numberOfLines).toBe(2);
      expect(textElement.props.ellipsizeMode).toBe('tail');
      expect(textElement.props.testID).toBe('string-test');
    });
  });

  describe('Accessibility', () => {
    it('should handle accessibility props', () => {
      render(
        <String accessible accessibilityLabel="Test label" accessibilityRole="button">
          Accessible Text
        </String>,
      );

      const textElement = screen.getByText('Accessible Text');
      expect(textElement.props.accessibilityRole).toBe('button');
      expect(textElement.props.accessibilityLabel).toBe('Test label');
    });
  });

  describe('Real World Scenarios', () => {
    it('should render a typical heading', () => {
      render(
        <String variant="title-1" colorVariant="primary" position="center">
          Welcome to Our App
        </String>,
      );
      expect(screen.getByText('Welcome to Our App')).toBeTruthy();
    });

    it('should render an error message', () => {
      render(
        <String colorVariant="error" size="sm" variant="body-sm">
          Please enter a valid email address
        </String>,
      );
      expect(screen.getByText('Please enter a valid email address')).toBeTruthy();
    });

    it('should handle dynamic content', () => {
      const userName = 'John Doe';
      const unreadCount = 5;

      render(
        <String>
          Welcome back, {userName}! You have {unreadCount} unread messages.
        </String>,
      );

      expect(screen.getByText('Welcome back, John Doe! You have 5 unread messages.')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null and undefined children', () => {
      expect(() => render(<String>{null}</String>)).not.toThrow();
      expect(() => render(<String>{undefined}</String>)).not.toThrow();
    });

    it('should handle number children', () => {
      render(<String>{42}</String>);
      expect(screen.getByText('42')).toBeTruthy();
    });

    it('should handle unicode and emoji content', () => {
      render(<String>Hello 👋 World 🌍</String>);
      expect(screen.getByText('Hello 👋 World 🌍')).toBeTruthy();
    });
  });

  describe('StyleSheet Specific', () => {
    it('should call StringSv with correct parameters', () => {
      const mockStringSv = require('../styles/String.styles').default;

      render(
        <StringSS font="primaryBold" position="center" variant="title-1">
          Styled Text
        </StringSS>,
      );

      expect(mockStringSv).toHaveBeenCalledWith({
        font: 'primaryBold',
        position: 'center',
        variant: 'title-1',
      });
    });
  });

  describe('Tailwind Specific', () => {
    it('should generate correct classes with cn utility', () => {
      const mockCn = require('../../../utils/tw/cn').default;

      render(<StringTW className="custom-class">Test</StringTW>);

      // Vérifier que cn a été appelé avec les bons arguments
      expect(mockCn).toHaveBeenCalledWith(expect.stringContaining('flex-shrink'), 'custom-class');
    });
  });
});
