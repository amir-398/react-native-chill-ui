import { render } from '@testing-library/react-native';

import Button from '../components/Button.tw';

// Mocks
jest.mock('../../../utils', () => ({
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
}));

jest.mock('../../../components/box', () => ({
  BoxTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  IconTw: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

jest.mock('../../../components/string', () => ({
  StringTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/loadingIndicatorsKit', () => ({
  LoadingIndicator: (props: any) => <div data-testid="loading-spinner" {...props} />,
}));

jest.mock('../../../components/ripplePressable', () => ({
  RipplePressableTw: ({ children, onPress }: any) => (
    <div data-testid="ripple-pressable" onClick={onPress}>
      {children}
    </div>
  ),
}));

jest.mock('../../../components/scalePressable', () => ({
  ScalePressableTw: ({ children, onPress }: any) => (
    <div data-testid="scale-pressable" onClick={onPress}>
      {children}
    </div>
  ),
}));

jest.mock('../styles/Button.tw.styles', () => ({
  ButtonTv: jest.fn(() => ''),
  IconPositionTv: jest.fn(() => ''),
  twStyles: { contentContainer: '', pointerEventsNone: '', stringContainer: '' },
}));

describe('Button Component (Tailwind)', () => {
  it('should render without crashing', () => {
    const { root } = render(<Button title="Test Button" />);
    expect(root).toBeTruthy();
  });

  it('should render with title prop', () => {
    const { root } = render(<Button title="Test Button" />);
    expect(root).toBeTruthy();
  });

  it('should render with onPress prop', () => {
    const onPressMock = jest.fn();
    const { root } = render(<Button title="Test Button" onPress={onPressMock} />);
    expect(root).toBeTruthy();
  });

  it('should render with disabled state', () => {
    const { root } = render(<Button title="Disabled Button" isDisabled />);
    expect(root).toBeTruthy();
  });

  it('should render with loading state', () => {
    const { root } = render(<Button title="Loading Button" isLoading />);
    expect(root).toBeTruthy();
  });

  it('should render with left icon', () => {
    const { root } = render(<Button title="Button with Icon" leftIconAction={{ name: 'home-solid', size: 'md' }} />);
    expect(root).toBeTruthy();
  });

  it('should render with right icon', () => {
    const { root } = render(
      <Button title="Button with Icon" rightIconAction={{ name: 'arrow-right-solid', size: 'md' }} />,
    );
    expect(root).toBeTruthy();
  });

  it('should render as ripple pressable', () => {
    const { root } = render(<Button title="Ripple Button" as="ripple-pressable" />);
    expect(root).toBeTruthy();
  });

  it('should render as scale pressable', () => {
    const { root } = render(<Button title="Scale Button" as="scale-pressable" />);
    expect(root).toBeTruthy();
  });

  it('should handle different variants', () => {
    const { root: contained } = render(<Button title="Contained" variant="contained" />);
    expect(contained).toBeTruthy();

    const { root: outlined } = render(<Button title="Outlined" variant="outlined" />);
    expect(outlined).toBeTruthy();

    const { root: text } = render(<Button title="Text" variant="text" />);
    expect(text).toBeTruthy();
  });

  it('should handle different sizes', () => {
    const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
    sizes.forEach(size => {
      const { root } = render(<Button title={`${size} Button`} size={size} />);
      expect(root).toBeTruthy();
    });
  });

  it('should handle color variants', () => {
    const colors = [
      'primary',
      'secondary',
      'tertiary',
      'error',
      'warning',
      'info',
      'success',
      'accent',
      'dark',
      'light',
      'danger',
      'neutral',
      'muted',
      'inverted',
      'white',
    ] as const;
    colors.forEach(color => {
      const { root } = render(<Button title={`${color} Button`} colorVariant={color} />);
      expect(root).toBeTruthy();
    });
  });

  it('should handle custom className', () => {
    const { root } = render(<Button title="Custom Class" className="custom-class" />);
    expect(root).toBeTruthy();
  });

  it('should handle custom content', () => {
    const { root } = render(
      <Button>
        <div data-testid="custom-content">Custom Content</div>
      </Button>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle custom icon in leftIconAction', () => {
    function CustomIcon() {
      return <div data-testid="custom-left-icon" />;
    }
    const { root } = render(
      <Button title="Custom Left Icon" leftIconAction={{ customIcon: <CustomIcon />, size: 'md' }} />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle custom icon in rightIconAction', () => {
    function CustomIcon() {
      return <div data-testid="custom-right-icon" />;
    }
    const { root } = render(
      <Button title="Custom Right Icon" rightIconAction={{ customIcon: <CustomIcon />, size: 'md' }} />,
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
