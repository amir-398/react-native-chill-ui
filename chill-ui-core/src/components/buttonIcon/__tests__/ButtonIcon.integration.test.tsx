import React from 'react';
import { render } from '@testing-library/react-native';
import ButtonIcon from '../components/buttonIcon';

// Mocks
jest.mock('../../../utils', () => ({
  classNamePropsHandler: jest.fn(),
  colorVariantPropsHandler: jest.fn(),
  classNameHandler: jest.fn(() => ({})),
  styleHandler: jest.fn(() => ({})),
  cn: jest.fn((...args) => args.filter(Boolean).join(' ')),
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
    <div data-testid="ripple-pressable" onClick={onPress}>
      {children}
    </div>
  ),
}));

jest.mock('../../../components/scalePressable', () => ({
  ScalePressable: ({ children, onPress }: any) => (
    <div data-testid="scale-pressable" onClick={onPress}>
      {children}
    </div>
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
        <ButtonIcon iconName="heart-solid" onPress={() => {}} colorVariant="error" />
        <ButtonIcon iconName="share-solid" onPress={() => {}} colorVariant="info" />
        <ButtonIcon iconName="settings-solid" onPress={() => {}} colorVariant="neutral" />
      </div>,
    );
    expect(root).toBeTruthy();
  });

  it('should handle loading state with refresh', () => {
    const { root } = render(
      <ButtonIcon iconName="refresh-solid" isLoading={true} onPress={() => {}} colorVariant="primary" />,
    );
    expect(root).toBeTruthy();
  });

  it('should handle complex button combinations', () => {
    const { root } = render(
      <ButtonIcon iconName="settings-solid" variant="outlined" rounded="circle" colorVariant="primary" size="lg" />,
    );
    expect(root).toBeTruthy();
  });
});
