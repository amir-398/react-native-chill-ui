import { render, screen } from '@testing-library/react-native';

import Avatar from '../components/Avatar';

// Mock des utilitaires hybrid pour éviter les erreurs
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

describe('Avatar Component (Hybrid)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render avatar with initials correctly', () => {
      render(
        <Avatar
          data={{
            firstname: 'John',
            lastname: 'Doe',
          }}
        />,
      );
      expect(screen.getByText('JD')).toBeTruthy();
    });

    it('should render with default props', () => {
      const { getByText } = render(
        <Avatar
          data={{
            firstname: 'Jane',
            lastname: 'Smith',
          }}
        />,
      );
      const avatarElement = getByText('JS');
      expect(avatarElement).toBeTruthy();
    });

    it('should handle single name', () => {
      render(
        <Avatar
          data={{
            firstname: 'John',
          }}
        />,
      );
      expect(screen.getByText('J')).toBeTruthy();
    });
  });

  describe('Size Variants', () => {
    const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

    sizes.forEach(size => {
      it(`should render with size ${size}`, () => {
        render(<Avatar data={{ firstname: 'J', lastname: 'D' }} size={size} />);
        expect(screen.getByText('JD')).toBeTruthy();
      });
    });
  });

  describe('Shape Variants', () => {
    const variants = ['circle', 'square'] as const;

    variants.forEach(variant => {
      it(`should render with variant ${variant}`, () => {
        render(<Avatar data={{ firstname: 'J', lastname: 'D' }} variant={variant} />);
        expect(screen.getByText('JD')).toBeTruthy();
      });
    });
  });

  describe('Color Customization', () => {
    it('should render with custom color', () => {
      render(<Avatar data={{ firstname: 'J', lastname: 'D' }} color="#FF0000" />);
      expect(screen.getByText('JD')).toBeTruthy();
    });

    it('should render with custom color using rgb', () => {
      render(<Avatar data={{ firstname: 'J', lastname: 'D' }} color="rgb(255, 0, 0)" />);
      expect(screen.getByText('JD')).toBeTruthy();
    });
  });

  describe('Touchable Interactions', () => {
    it('should handle onPress with Pressable', () => {
      const onPressMock = jest.fn();
      render(<Avatar data={{ firstname: 'J', lastname: 'D' }} onPress={onPressMock} as="pressable" />);
      expect(screen.getByText('JD')).toBeTruthy();
    });

    it('should handle onPress with touchable-opacity', () => {
      const onPressMock = jest.fn();
      render(<Avatar data={{ firstname: 'J', lastname: 'D' }} onPress={onPressMock} as="touchable-opacity" />);
      expect(screen.getByText('JD')).toBeTruthy();
    });

    it('should handle onPress with ripple-pressable', () => {
      const onPressMock = jest.fn();
      render(<Avatar data={{ firstname: 'J', lastname: 'D' }} onPress={onPressMock} as="ripple-pressable" />);
      expect(screen.getByText('JD')).toBeTruthy();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      render(<Avatar data={{ firstname: 'J', lastname: 'D' }} className="custom-class" />);
      expect(screen.getByText('JD')).toBeTruthy();
    });

    it('should apply custom style', () => {
      const customStyle = { backgroundColor: '#FF0000' };
      render(<Avatar data={{ firstname: 'J', lastname: 'D' }} style={customStyle} />);
      expect(screen.getByText('JD')).toBeTruthy();
    });

    it('should apply custom stringProps', () => {
      render(<Avatar data={{ firstname: 'J', lastname: 'D' }} stringProps={{ color: '#FFFFFF' }} />);
      expect(screen.getByText('JD')).toBeTruthy();
    });

    it('should combine multiple props', () => {
      render(
        <Avatar
          data={{ firstname: 'J', lastname: 'D' }}
          size="lg"
          color="#FF0000"
          variant="circle"
          className="combined-test"
        />,
      );
      expect(screen.getByText('JD')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data gracefully', () => {
      const component = render(<Avatar data={{}} />);
      expect(component).toBeTruthy();
    });

    it('should handle missing lastname', () => {
      render(<Avatar data={{ firstname: 'John' }} />);
      expect(screen.getByText('J')).toBeTruthy();
    });

    it('should handle missing firstname', () => {
      render(<Avatar data={{ lastname: 'Doe' }} />);
      expect(screen.getByText('D')).toBeTruthy();
    });

    it('should handle image_url in data', () => {
      render(
        <Avatar
          data={{
            firstname: 'John',
            image_url: 'https://example.com/avatar.jpg',
            lastname: 'Doe',
          }}
        />,
      );
      expect(screen.getByText('JD')).toBeTruthy();
    });
  });
});
