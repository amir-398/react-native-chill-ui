import type { BtnPropsTw } from '@types';

import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { IconTw } from '@components/icon';
import { StringTw } from '@components/string';
import { Pressable, TouchableOpacity } from 'react-native';
import { ScalePressableTw } from '@components/scalePressable';
import { forwardRef, PropsWithChildren, useMemo } from 'react';
import { RipplePressableTw } from '@components/ripplePressable';
import { LoadingIndicator } from '@components/loadingIndicatorsKit';

import { ButtonTv, IconPositionTv, twStyles } from '../styles/Button.tw.styles';

/**
 * Maps button color variant to appropriate text color variant for the String component
 * Returns the color variant key that String component understands
 */

/**
 * Renders the button content based on loading state and props
 */
function ButtonContent({
  children,
  colorVariant,
  contentPosition,
  isLoading,
  leftIconAction,
  loadingIndicatorProps,
  rightIconAction,
  size = 'md',
  stringProps,
  title,
  variant,
}: {
  children?: React.ReactNode;
  colorVariant?: BtnPropsTw['colorVariant'];
  isLoading?: BtnPropsTw['isLoading'];
  loadingIndicatorProps?: BtnPropsTw['loadingIndicatorProps'];
  size?: BtnPropsTw['size'];
  stringProps?: BtnPropsTw['stringProps'];
  leftIconAction?: BtnPropsTw['leftIconAction'];
  rightIconAction?: BtnPropsTw['rightIconAction'];
  title?: BtnPropsTw['title'];
  variant?: BtnPropsTw['variant'];
  contentPosition?: BtnPropsTw['contentPosition'];
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

  const getTextColorVariant = useMemo(() => {
    if (variant === 'contained') {
      return `text-button-${colorVariant}-content`;
    }

    return `text-button-${colorVariant}-background`;
  }, [colorVariant, variant]);

  if (children) {
    return children;
  }

  if (isLoading) {
    return <LoadingIndicator name="spinner" size={sizingVariant} {...loadingIndicatorProps} />;
  }

  const isIconAbsolute = isTextCentered;

  const finalStringProps = {
    ...stringProps,
    className: cn(getTextColorVariant, twStyles.pointerEventsNone, stringProps?.className),
  };

  return (
    <BoxTw className={twStyles.contentContainer}>
      {leftIconAction && (
        <BoxTw
          className={cn(IconPositionTv({ isAbsolute: isIconAbsolute, position: 'left' }), twStyles.pointerEventsNone)}
        >
          {leftIconAction.customIcon || <IconTw {...leftIconAction} size={sizingVariant} />}
        </BoxTw>
      )}

      <BoxTw className={twStyles.stringContainer}>
        {title && (
          <StringTw size={sizingVariant} position={contentPosition} {...finalStringProps}>
            {title}
          </StringTw>
        )}
      </BoxTw>

      {rightIconAction && (
        <BoxTw
          className={cn(IconPositionTv({ isAbsolute: isIconAbsolute, position: 'right' }), twStyles.pointerEventsNone)}
        >
          {rightIconAction.customIcon || <IconTw {...rightIconAction} size={sizingVariant} />}
        </BoxTw>
      )}
    </BoxTw>
  );
}

/**
 * Renders the appropriate touchable component based on the 'as' prop
 */
const TouchableComponent = forwardRef<any, PropsWithChildren<BtnPropsTw>>(
  ({ as = 'touchable-opacity', children, isDisabled, isLoading, onPress, ...props }, ref) => {
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
        return <RipplePressableTw {...commonProps}>{children}</RipplePressableTw>;

      case 'scale-pressable':
        return <ScalePressableTw {...commonProps}>{children}</ScalePressableTw>;

      case 'touchable-opacity':
      default:
        return (
          <TouchableOpacity {...commonProps} activeOpacity={0.7}>
            {children}
          </TouchableOpacity>
        );
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
 * @param className - Custom CSS classes for the button container (NativeWind)
 * @param colorVariant - Button color variant: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'accent' | 'dark' | 'light' | 'danger' | 'neutral' | 'muted' | 'tertiary' | 'inverted' | 'white' (default: 'primary')
 * @param contentPosition - Content position within the button: 'left' | 'center' | 'right' (default: 'center')
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
 */
const Button = forwardRef<any, PropsWithChildren<BtnPropsTw>>((props, ref) => {
  const {
    as = 'touchable-opacity',
    children,
    className,
    colorVariant = 'primary',
    contentPosition = 'center',
    isDisabled,
    isLoading,
    leftIconAction,
    loadingIndicatorProps,
    onPress,
    position = 'center',
    rightIconAction,
    size = 'md',
    stringProps,
    style,
    title,
    variant = 'contained',
  } = props;

  const buttonContent = useMemo(
    () => (
      <ButtonContent
        colorVariant={colorVariant}
        isLoading={isLoading}
        loadingIndicatorProps={loadingIndicatorProps}
        size={size}
        stringProps={stringProps}
        leftIconAction={leftIconAction}
        rightIconAction={rightIconAction}
        title={title}
        variant={variant}
        contentPosition={contentPosition}
      />
    ),
    [
      colorVariant,
      contentPosition,
      isLoading,
      loadingIndicatorProps,
      size,
      stringProps,
      leftIconAction,
      rightIconAction,
      title,
      variant,
    ],
  );

  return (
    <TouchableComponent
      ref={ref}
      className={cn(
        ButtonTv({
          colorVariant,
          isDisabled: !!isDisabled,
          isLoading: !!isLoading,
          position,
          size,
          variant,
        }),
        className,
      )}
      style={style}
      as={as}
      onPress={onPress}
    >
      {children ?? buttonContent}
    </TouchableComponent>
  );
});

Button.displayName = 'Button';

export default Button;
