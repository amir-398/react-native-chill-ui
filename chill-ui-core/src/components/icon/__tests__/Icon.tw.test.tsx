import { render, screen } from '@testing-library/react-native';

import Icon from '../components/Icon.tw';

// Mock du composant CustomIcon
jest.mock('../components/CustomIcon.tw', () => {
  return function MockCustomIcon({ name, color, style, className }: any) {
    return (
      <div testID={`icon-${name}`} style={style} className={className} data-color={color}>
        {name}
      </div>
    );
  };
});

// Mock du composant RipplePressable
jest.mock('../../ripplePressable', () => ({
  RipplePressable: ({ children, onPress, style, className, ...props }: any) => (
    <div testID="ripple-pressable-tw" onPress={onPress} style={style} className={className} {...props}>
      {children}
    </div>
  ),
}));

describe('Icon.tw Component (Tailwind Version)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render icon with Tailwind styling', () => {
    render(<Icon name="heart-solid" />);
    expect(screen.getByTestId('icon-heart-solid')).toBeTruthy();
  });

  it('should handle className prop for Tailwind', () => {
    render(<Icon name="heart-solid" className="custom-class" />);
    const icon = screen.getByTestId('icon-heart-solid');
    expect(icon).toBeTruthy();
    expect(icon).toHaveProp('className', expect.stringContaining('custom-class'));
  });

  it('should handle pressable interactions with Tailwind', () => {
    const onPressMock = jest.fn();
    render(<Icon name="heart-solid" onPress={onPressMock} />);
    expect(screen.getByTestId('icon-heart-solid')).toBeTruthy();
  });
});
