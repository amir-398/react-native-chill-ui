// Mock du composant CustomIcon
jest.mock(
  '../components/CustomIcon.ss',
  () =>
    function MockCustomIcon({ color, name, style }: any) {
      return (
        <div style={style} data-color={color}>
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

describe('Icon Component (Stylesheet)', () => {
  it('should have at least one test', () => {
    expect(true).toBe(true);
  });
});
