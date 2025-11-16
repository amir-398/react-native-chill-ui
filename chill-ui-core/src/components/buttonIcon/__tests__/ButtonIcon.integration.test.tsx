import { render } from '@testing-library/react-native';

import ButtonIcon from '../components/buttonIcon.hybrid';

// Mocks
jest.mock('../../../utils', () => ({
  classNameHandler: jest.fn(() => ({})),
  classNamePropsHandler: jest.fn(),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
  colorVariantPropsHandler: jest.fn(),
  styleHandler: jest.fn(() => ({})),
}));

jest.mock('../../../components/box', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../../components/icon', () => ({
  Icon: ({ name, ...props }: any) => <div data-testid={`icon-${name}`} {...props} />,
}));

jest.mock('../../../components/loadingIndicatorsKit', () => ({
  LoadingIndicator: (props: any) => <div data-testid="loading-spinner" {...props} />,
}));

jest.mock('../../../components/ripplePressable', () => ({
  RipplePressable: ({ children, onPress }: any) => (
    <button data-testid="ripple-pressable" type="button" onClick={onPress}>
      {children}
    </button>
  ),
}));

jest.mock('../../../components/scalePressable', () => ({
  ScalePressable: ({ children, onPress }: any) => (
    <button data-testid="scale-pressable" type="button" onClick={onPress}>
      {children}
    </button>
  ),
}));

jest.mock('../styles/buttonIcon.ss.styles', () => ({
  buttonIconSv: jest.fn(() => ({})),
  styles: { pointerEventsNone: {} },
}));

jest.mock('../styles/buttonIcon.tw.styles', () => ({
  buttonIconTv: jest.fn(() => ''),
  twStyles: { pointerEventsNone: '' },
}));

describe('ButtonIcon Integration Tests', () => {
  it('should handle toolbar with multiple buttons', () => {
    const { root } = render(
      <div>
        <ButtonIcon iconName="angle-down-solid" onPress={() => {}} colorVariant="error" />
        <ButtonIcon iconName="angle-up-solid" onPress={() => {}} colorVariant="info" />
        <ButtonIcon iconName="arrow-left-solid" onPress={() => {}} colorVariant="neutral" />
      </div>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle loading state with refresh', () => {
    const { root } = render(
      <ButtonIcon iconName="arrow-left-solid" isLoading onPress={() => {}} colorVariant="primary" />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle complex button combinations', () => {
    const { root } = render(
      <ButtonIcon iconName="angle-down-solid" variant="outlined" rounded="circle" colorVariant="primary" size="lg" />,
    );
    expect(root).toBeTruthy();
  });
});
