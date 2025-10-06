import { render } from '@testing-library/react-native';
import Checkbox from '../components/Checkbox.ss';

// Mocks
jest.mock('../../../utils', () => ({
  isUndefined: jest.fn(value => value === undefined),
}));

jest.mock('../../../components/box', () => ({
  BoxSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  IconSs: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

jest.mock('../../../components/string', () => ({
  StringSs: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../styles/Checkbox.ss.styles', () => ({
  checkboxSv: jest.fn(() => ({})),
  styles: { container: {}, contentCheckBox: {}, isDisabled: {}, label: {}, pressable: {} },
}));

describe('Checkbox Component (StyleSheet)', () => {
  it('should render without crashing', () => {
    const { root } = render(<Checkbox />);
    expect(root).toBeTruthy();
  });

  it('should render with label and controlled mode', () => {
    const onCheckedChangeMock = jest.fn();
    const { root } = render(<Checkbox label="Controlled" isChecked={true} onCheckedChange={onCheckedChangeMock} />);
    expect(root).toBeTruthy();
  });

  it('should render with disabled and checked states', () => {
    const { root: disabled } = render(<Checkbox label="Disabled" isDisabled={true} />);
    expect(disabled).toBeTruthy();

    const { root: checked } = render(<Checkbox label="Checked" isChecked={true} />);
    expect(checked).toBeTruthy();
  });

  it('should handle variants and sizes', () => {
    const { root: circle } = render(<Checkbox label="Circle" variant="circle" size="lg" />);
    expect(circle).toBeTruthy();

    const { root: square } = render(<Checkbox label="Square" variant="square" size="sm" />);
    expect(square).toBeTruthy();
  });

  it('should render with custom colors and label behavior', () => {
    const { root } = render(<Checkbox label="Custom" checkedColor="#FF0000" isLabelPressable={true} />);
    expect(root).toBeTruthy();
  });

  it('should render with custom style', () => {
    const { root } = render(<Checkbox label="Custom" checkedStyle={{ borderWidth: 2 }} isChecked={true} />);
    expect(root).toBeTruthy();
  });
});
