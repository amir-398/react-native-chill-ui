import { render } from '@testing-library/react-native';

import Checkbox from '../components/Checkbox';

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

describe('Checkbox Component (Hybrid)', () => {
  it('should render without crashing', () => {
    const { root } = render(<Checkbox />);
    expect(root).toBeTruthy();
  });

  it('should render with label and controlled mode', () => {
    const onCheckedChangeMock = jest.fn();
    const { root } = render(<Checkbox label="Controlled" isChecked onCheckedChange={onCheckedChangeMock} />);
    expect(root).toBeTruthy();
  });

  it('should render with disabled and checked states', () => {
    const { root: disabled } = render(<Checkbox label="Disabled" isDisabled />);
    expect(disabled).toBeTruthy();

    const { root: checked } = render(<Checkbox label="Checked" isChecked />);
    expect(checked).toBeTruthy();
  });

  it('should handle variants and sizes', () => {
    const { root: circle } = render(<Checkbox label="Circle" variant="circle" size="lg" />);
    expect(circle).toBeTruthy();

    const { root: square } = render(<Checkbox label="Square" variant="square" size="sm" />);
    expect(square).toBeTruthy();
  });

  it('should render with custom colors and label behavior', () => {
    const { root } = render(<Checkbox label="Custom" checkedColor="#FF0000" isLabelPressable />);
    expect(root).toBeTruthy();
  });

  it('should render with custom props (NativeWind)', () => {
    const { root } = render(
      <Checkbox label="Custom" className="custom-class" checkedClassName="checked-class" isChecked />,
    );
    expect(root).toBeTruthy();
  });
});
