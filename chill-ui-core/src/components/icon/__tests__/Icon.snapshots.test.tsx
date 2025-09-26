import { render } from '@testing-library/react-native';

import Icon from '../components/Icon';

// Mock du composant CustomIcon
jest.mock('../components/CustomIcon', () => {
  return function MockCustomIcon({ name, color, style }: any) {
    return (
      <div testID={`icon-${name}`} style={style} data-color={color}>
        {name}
      </div>
    );
  };
});

// Mock du composant RipplePressable
jest.mock('../../ripplePressable', () => ({
  RipplePressable: ({ children, onPress, style, className, ...props }: any) => (
    <div testID="ripple-pressable" onPress={onPress} style={style} className={className} {...props}>
      {children}
    </div>
  ),
}));

describe('Icon Component Snapshots', () => {
  it('should match snapshot for basic icon', () => {
    const tree = render(<Icon name="heart-solid" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for icon with size', () => {
    const tree = render(<Icon name="star-solid" size="lg" />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for pressable icon', () => {
    const tree = render(<Icon name="heart-solid" onPress={() => {}} />);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for icon with custom color', () => {
    const tree = render(<Icon name="star-solid" color="#FF6B6B" />);
    expect(tree).toMatchSnapshot();
  });
});
