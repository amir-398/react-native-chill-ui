import type { BtnPropsSs } from '@types';

import { BoxSs } from '@components/box';
import { IconSs } from '@components/icon';
import { StringSs } from '@components/string';
import { Pressable, TouchableOpacity } from 'react-native';
import { ScalePressableSs } from '@components/scalePressable';
import { forwardRef, PropsWithChildren, useMemo } from 'react';
import { RipplePressableSs } from '@components/ripplePressable';
import { LoadingIndicator } from '@components/loadingIndicatorsKit';

import { buttonDefaultProps } from '../utils/defaultProps';
import { ButtonSv, IconContainerSv, styles } from '../styles/Button.ss.styles';

/**
 * Renders the button content based on loading state and props
 */
function ButtonContent({
  children,
  contentPosition,
  isLoading,
  leftIconAction,
  loadingIndicatorProps,
  rightIconAction,
  size = buttonDefaultProps.size,
  stringProps,
  title,
}: {
  children?: React.ReactNode;
  isLoading?: boolean;
  loadingIndicatorProps?: BtnPropsSs['loadingIndicatorProps'];
  size?: BtnPropsSs['size'];
  stringProps?: BtnPropsSs['stringProps'];
  leftIconAction?: BtnPropsSs['leftIconAction'];
  rightIconAction?: BtnPropsSs['rightIconAction'];
  title?: string;
  contentPosition?: BtnPropsSs['contentPosition'];
}) {
  const sizingVariant:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl' = useMemo(() => {
    switch (size) {
      case '2xl':
        return 'xl';
      case '2xs':
        return 'xs';
      case 'lg':
        return 'md';
      case 'md':
        return 'md';
      case 'sm':
        return 'sm';
      case 'xl':
        return 'lg';
      case 'xs':
        return 'sm';
      default:
        return 'md';
    }
  }, [size]);

  const isTextCentered = useMemo(
    () => stringProps?.position !== 'left' && stringProps?.position !== 'right' && contentPosition === 'center',
    [stringProps?.position, contentPosition],
  );

  if (children) {
    return children;
  }

  const isIconAbsolute = isTextCentered;

  return (
    <BoxSs style={styles.contentContainer}>
      {isLoading && (
        <BoxSs style={styles.loadingContainer}>
          <LoadingIndicator name="spinner" size={sizingVariant} {...loadingIndicatorProps} />
        </BoxSs>
      )}

      {leftIconAction && !isLoading && (
        <BoxSs
          style={[
            IconContainerSv({
              isAbsolute: isIconAbsolute,
              position: 'left',
            }),
            styles.pointerEventsNone,
          ]}
        >
          {leftIconAction.customIcon || <IconSs {...leftIconAction} size={sizingVariant} />}
        </BoxSs>
      )}

      {!isLoading && (
        <BoxSs style={styles.stringContainer}>
          {title && (
            <StringSs
              size={sizingVariant}
              position={contentPosition}
              {...stringProps}
              style={[styles.pointerEventsNone, stringProps?.style]}
            >
              {title}
            </StringSs>
          )}
        </BoxSs>
      )}

      {rightIconAction && !isLoading && (
        <BoxSs
          style={[
            IconContainerSv({
              isAbsolute: isIconAbsolute,
              position: 'right',
            }),
            styles.pointerEventsNone,
          ]}
        >
          {rightIconAction.customIcon || <IconSs {...rightIconAction} size={sizingVariant} />}
        </BoxSs>
      )}
    </BoxSs>
  );
}

/**
 * Renders the appropriate touchable component based on the 'as' prop
 */
const TouchableComponent = forwardRef<any, PropsWithChildren<BtnPropsSs>>(
  ({ as = buttonDefaultProps.as, children, isDisabled, isLoading, onPress, ...props }, ref) => {
    const isButtonDisabled = isDisabled || isLoading;

    const commonProps = {
      disabled: isButtonDisabled,
      onPress: isButtonDisabled ? undefined : onPress,
      ref,
      ...props,
    };

    switch (as) {
      case 'pressable':
        return <Pressable {...commonProps}>{children}</Pressable>;

      case 'ripple-pressable':
        return <RipplePressableSs {...commonProps}>{children}</RipplePressableSs>;

      case 'scale-pressable':
        return <ScalePressableSs {...commonProps}>{children}</ScalePressableSs>;

      case 'touchable-opacity':
      default:
        return <TouchableOpacity {...commonProps}>{children}</TouchableOpacity>;
    }
  },
);

TouchableComponent.displayName = 'TouchableComponent';

/**
 * Button component with support for multiple touchable types, loading states, and various styling options.
 *
 * Provides a flexible and accessible button implementation with support for different interaction patterns.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button title="Click me" onPress={handlePress} />
 * ```
 *
 * @param as - Type of touchable component to use: 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable' (default: 'touchable-opacity')
 * @param children - Custom content to render inside the button
 * @param isDisabled - Whether the button is disabled
 * @param leftIconAction - Left icon configuration with position support
 * @param rightIconAction - Right icon configuration with position support
 * @param isLoading - Whether the button is in loading state
 * @param loadingIndicatorProps - Props to pass to the loading indicator
 * @param onPress - Press callback function
 * @param position - Content position within the button: 'left' | 'center' | 'right' (default: 'center')
 * @param size - Button size variant: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
 * @param stringProps - Props to pass to the String component
 * @param style - Style object for the button container
 * @param title - Button title text
 * @param variant - Button style variant: 'contained' | 'outlined' | 'text' (default: 'contained')
 * @param contentPosition - Content position within the button: 'left' | 'center' | 'right' (default: 'center')
 */
const Button = forwardRef<any, PropsWithChildren<BtnPropsSs>>((props, ref) => {
  const {
    as = buttonDefaultProps.as,
    children,
    contentPosition = buttonDefaultProps.contentPosition,
    isDisabled,
    isLoading,
    leftIconAction,
    loadingIndicatorProps,
    onPress,
    position = buttonDefaultProps.position,
    rightIconAction,
    size = buttonDefaultProps.size,
    stringProps,
    style,
    title,
    variant = buttonDefaultProps.variant,
  } = props;

  const buttonContent = useMemo(
    () => (
      <ButtonContent
        isLoading={isLoading}
        loadingIndicatorProps={loadingIndicatorProps}
        size={size}
        stringProps={stringProps}
        leftIconAction={leftIconAction}
        rightIconAction={rightIconAction}
        title={title}
        contentPosition={contentPosition}
      />
    ),
    [contentPosition, isLoading, loadingIndicatorProps, size, stringProps, leftIconAction, rightIconAction, title],
  );

  return (
    <TouchableComponent
      ref={ref}
      onPress={onPress}
      style={[
        ButtonSv({
          isDisabled: !!isDisabled,
          isLoading: !!isLoading,
          position,
          size,
          variant,
        }),
        style,
      ]}
      as={as}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      {children ?? buttonContent}
    </TouchableComponent>
  );
});

Button.displayName = 'Button';

export default Button;
