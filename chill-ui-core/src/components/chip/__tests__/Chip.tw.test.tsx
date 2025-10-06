import { render } from '@testing-library/react-native';
import Chip from '../components/Chip.tw';

// Mocks
jest.mock('../../../utils', () => ({
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  isString: jest.fn(value => typeof value === 'string'),
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

jest.mock('../../../components/ripplePressable', () => ({
  RipplePressableTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/scalePressable', () => ({
  ScalePressableTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../styles/Chip.tw.styles', () => ({
  chipTv: jest.fn(() => ''),
  chipTextTv: jest.fn(() => ''),
  twStyles: { chip: '', chipWithIcons: '', iconLeft: '', iconRight: '', pointerEventsNone: '' },
}));

describe('Chip Component (Tailwind)', () => {
  it('should render without crashing', () => {
    const { root } = render(<Chip>Test</Chip>);
    expect(root).toBeTruthy();
  });

  it('should render with title and children', () => {
    const { root: withTitle } = render(<Chip title="Title">Children</Chip>);
    expect(withTitle).toBeTruthy();

    const { root: withChildren } = render(<Chip>Children Only</Chip>);
    expect(withChildren).toBeTruthy();
  });

  it('should render with variants', () => {
    const { root: contained } = render(<Chip variant="contained">Contained</Chip>);
    expect(contained).toBeTruthy();

    const { root: outlined } = render(<Chip variant="outlined">Outlined</Chip>);
    expect(outlined).toBeTruthy();
  });

  it('should render with different sizes', () => {
    const { root: xs } = render(<Chip size="xs">XS</Chip>);
    expect(xs).toBeTruthy();

    const { root: md } = render(<Chip size="md">MD</Chip>);
    expect(md).toBeTruthy();

    const { root: lg } = render(<Chip size="lg">LG</Chip>);
    expect(lg).toBeTruthy();
  });

  it('should render with icons', () => {
    const { root: leftIcon } = render(<Chip leftIconAction={{ name: 'star-solid' }}>Left Icon</Chip>);
    expect(leftIcon).toBeTruthy();

    const { root: rightIcon } = render(<Chip rightIconAction={{ name: 'close-solid' }}>Right Icon</Chip>);
    expect(rightIcon).toBeTruthy();

    const { root: bothIcons } = render(
      <Chip leftIconAction={{ name: 'star-solid' }} rightIconAction={{ name: 'close-solid' }}>
        Both Icons
      </Chip>,
    );
    expect(bothIcons).toBeTruthy();
  });

  it('should render with Tailwind classes', () => {
    const { root } = render(
      <Chip variant="outlined" colorVariant="primary" size="md" className="custom-class">
        Custom
      </Chip>,
    );
    expect(root).toBeTruthy();
  });
});
