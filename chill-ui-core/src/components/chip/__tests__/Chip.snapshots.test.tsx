import { render } from '@testing-library/react-native';

import Chip from '../components/Chip';

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
}));

jest.mock('../../../components/icon', () => ({
  Icon: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

jest.mock('../../../components/string', () => ({
  String: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/ripplePressable', () => ({
  RipplePressable: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/scalePressable', () => ({
  ScalePressable: ({ children, ...props }: any) => <div {...props}>{children}</div>,
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

describe('Chip Snapshots', () => {
  it('should match snapshot for basic variants', () => {
    const tree = render(
      <div>
        <Chip variant="contained">Contained</Chip>
        <Chip variant="outlined">Outlined</Chip>
      </div>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for sizes', () => {
    const tree = render(
      <div>
        <Chip size="xs">XS</Chip>
        <Chip size="md">MD</Chip>
        <Chip size="lg">LG</Chip>
      </div>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for icons', () => {
    const tree = render(
      <div>
        <Chip leftIconAction={{ name: 'star-solid' }}>Left Icon</Chip>
        <Chip rightIconAction={{ name: 'close-solid' }}>Right Icon</Chip>
      </div>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for positions', () => {
    const tree = render(
      <div>
        <Chip position="left">Left</Chip>
        <Chip position="center">Center</Chip>
        <Chip position="right">Right</Chip>
      </div>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
