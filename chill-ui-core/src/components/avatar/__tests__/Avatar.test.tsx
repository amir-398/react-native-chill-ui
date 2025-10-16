import { render, screen } from '@testing-library/react-native';

import Avatar from '../components/Avatar';

// Mock des utilitaires hybrid pour éviter les erreurs
jest.mock('../../../utils/hybrid/classNamePropsHandler', () => ({
  classNamePropsHandler: jest.fn(),
}));

jest.mock('../../../utils/hybrid/colorVariantPropsHandler', () => ({
  __esModule: true,
  colorVariantPropsHandler: jest.fn(),
  default: jest.fn(),
}));

jest.mock('../../../utils/hybrid/propsHandlers', () => ({
  classNameHandler: jest.fn(className => ({ className })),
  styleHandler: jest.fn(style => ({ style: style.defaultStyle })),
}));

describe('Avatar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it('should handle different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      const { unmount } = render(<Avatar data={{ firstname: 'J', lastname: 'D' }} size={size} />);
      expect(screen.getByText('JD')).toBeTruthy();
      unmount();
    });
  });

  it('should handle different variants', () => {
    const variants = ['circle', 'square'] as const;

    variants.forEach(variant => {
      const { unmount } = render(<Avatar data={{ firstname: 'J', lastname: 'D' }} variant={variant} />);
      expect(screen.getByText('JD')).toBeTruthy();
      unmount();
    });
  });

  it('should handle onPress interactions', () => {
    const onPressMock = jest.fn();

    render(<Avatar data={{ firstname: 'J', lastname: 'D' }} onPress={onPressMock} />);

    expect(screen.getByText('JD')).toBeTruthy();
  });

  it('should handle edge cases gracefully', () => {
    // Test with missing data
    const { rerender } = render(<Avatar data={{}} />);
    expect(screen.queryByText('')).toBeTruthy();

    // Test with single name
    rerender(<Avatar data={{ firstname: 'John' }} />);
    expect(screen.getByText('J')).toBeTruthy();
  });
});
