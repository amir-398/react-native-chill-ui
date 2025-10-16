import { render } from '@testing-library/react-native';

import { Chip, ChipSs, ChipTw } from '../index';

// Mocks
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  colorVariantPropsHandler: jest.fn(),
  isString: jest.fn(value => typeof value === 'string'),
  styleHandler: jest.fn(() => ({})),
}));

jest.mock('../../../components/box', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  BoxSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  BoxTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  Icon: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
  IconSs: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
  IconTw: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

jest.mock('../../../components/string', () => ({
  String: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  StringSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  StringTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/ripplePressable', () => ({
  RipplePressable: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  RipplePressableSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  RipplePressableTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/scalePressable', () => ({
  ScalePressable: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  ScalePressableSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  ScalePressableTw: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../styles/Chip.ss.styles', () => ({
  chipSv: jest.fn(() => ({})),
  chipTextSv: jest.fn(() => ({})),
  styles: { chip: {}, chipWithIcons: {}, iconLeft: {}, iconRight: {}, pointerEventsNone: {} },
}));

jest.mock('../styles/Chip.tw.styles', () => ({
  chipTextTv: jest.fn(() => ''),
  chipTv: jest.fn(() => ''),
  twStyles: { chip: '', chipWithIcons: '', iconLeft: '', iconRight: '', pointerEventsNone: '' },
}));

describe('Chip Component (Integration)', () => {
  it('should export all versions', () => {
    expect(Chip).toBeDefined();
    expect(ChipSs).toBeDefined();
    expect(ChipTw).toBeDefined();
  });

  it('should render all three versions', () => {
    const { root: hybrid } = render(<Chip>Hybrid</Chip>);
    expect(hybrid).toBeTruthy();

    const { root: ss } = render(<ChipSs>StyleSheet</ChipSs>);
    expect(ss).toBeTruthy();

    const { root: tw } = render(<ChipTw>Tailwind</ChipTw>);
    expect(tw).toBeTruthy();
  });

  it('should handle multiple chips together', () => {
    const { root } = render(
      <div>
        <Chip variant="contained" colorVariant="primary">
          Primary
        </Chip>
        <Chip variant="outlined" colorVariant="secondary">
          Secondary
        </Chip>
        <Chip leftIconAction={{ name: 'star-solid' }}>With Icon</Chip>
      </div>,
    );
    expect(root).toBeTruthy();
  });
});
