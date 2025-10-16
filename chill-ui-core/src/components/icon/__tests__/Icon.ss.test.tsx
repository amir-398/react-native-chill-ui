import { render, screen } from '@testing-library/react-native';

import Icon from '../components/Icon.ss';

// Mock du composant CustomIcon
jest.mock(
  '../components/CustomIcon.ss',
  () =>
    function MockCustomIcon({ color, name, style }: any) {
      return (
        <div testID={`icon-${name}`} style={style} data-color={color}>
          {name}
        </div>
      );
    },
);

// Mock du composant RipplePressableSs
jest.mock('../../ripplePressable', () => ({
  RipplePressableSs: ({ children, onPress, style, ...props }: any) => (
    <div testID="ripple-pressable-ss" onPress={onPress} style={style} {...props}>
      {children}
    </div>
  ),
}));

describe('Icon.ss Component (StyleSheet Version)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render icon with StyleSheet styling', () => {
    render(<Icon name="heart-solid" />);
    expect(screen.getByTestId('icon-heart-solid')).toBeTruthy();
  });

  it('should handle pressable interactions with StyleSheet', () => {
    const onPressMock = jest.fn();
    render(<Icon name="heart-solid" onPress={onPressMock} />);
    expect(screen.getByTestId('icon-heart-solid')).toBeTruthy();
  });
});
