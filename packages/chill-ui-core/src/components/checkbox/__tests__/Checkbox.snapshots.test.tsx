import renderer, { act } from 'react-test-renderer';

import Checkbox from '../components/Checkbox.hybrid';

// Mocks
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  isUndefined: jest.fn(value => value === undefined),
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

jest.mock('../styles/Checkbox.ss.styles', () => ({
  checkboxSv: jest.fn(() => ({})),
  styles: { container: {}, contentCheckBox: {}, isDisabled: {}, label: {}, pressable: {} },
}));

jest.mock('../styles/Checkbox.tw.styles', () => ({
  checkboxTv: jest.fn(() => ''),
  twStyles: { container: '', contentCheckBox: '', isDisabled: '', label: '', pressable: '' },
}));

afterEach(() => {
  jest.clearAllTimers();
});

describe('Checkbox Snapshots', () => {
  it('should match snapshot for basic states', () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <div>
            <Checkbox label="Basic" />
            <Checkbox label="Checked" isChecked />
            <Checkbox label="Disabled" isDisabled />
          </div>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for variants', () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <div>
            <Checkbox label="Circle" variant="circle" />
            <Checkbox label="Square" variant="square" />
          </div>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for sizes', () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <div>
            <Checkbox label="SM" size="sm" />
            <Checkbox label="MD" size="md" />
            <Checkbox label="LG" size="lg" />
          </div>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for label behavior', () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <div>
            <Checkbox label="Pressable" isLabelPressable />
            <Checkbox label="Non-Pressable" isLabelPressable={false} />
          </div>,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });
});
