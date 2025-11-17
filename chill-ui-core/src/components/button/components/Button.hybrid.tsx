import type { BtnPropsTw } from '@types';

import { Box } from '@components/box';
import { Icon } from '@components/icon';
import { String } from '@components/string';
import { Pressable, TouchableOpacity } from 'react-native';
import { ScalePressable } from '@components/scalePressable';
import { RipplePressable } from '@components/ripplePressable';
import { forwardRef, PropsWithChildren, useMemo } from 'react';
import { LoadingIndicator } from '@components/loadingIndicatorsKit';
import { cn, classNamePropsHandler, classNameHandler, styleHandler, colorVariantPropsHandler } from '@utils';

import { buttonDefaultProps } from '../utils/defaultProps';
import { ButtonSv, IconContainerSv, styles } from '../styles/Button.ss.styles';
import { ButtonTv, IconPositionTv, twStyles } from '../styles/Button.tw.styles';

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

  const isIconAbsolute = isTextCentered;

  const finalStringProps = {
    ...stringProps,
    ...classNameHandler(cn(getTextColorVariant, twStyles.pointerEventsNone, stringProps?.className)),
  };

  return (
    <Box
      {...classNameHandler(cn(twStyles.contentContainer))}
      {...styleHandler({ defaultStyle: styles.contentContainer })}
    >
      {isLoading && (
        <Box
          {...classNameHandler(cn(twStyles.loadingContainer))}
          {...styleHandler({ defaultStyle: styles.loadingContainer })}
        >
          <LoadingIndicator name="spinner" size={sizingVariant} {...loadingIndicatorProps} />
        </Box>
      )}

      {leftIconAction && !isLoading && (
        <Box
          {...classNameHandler(
            cn(
              IconPositionTv({
                isAbsolute: isIconAbsolute,
                position: 'left',
              }),
              twStyles.pointerEventsNone,
            ),
          )}
          {...styleHandler({
            defaultStyle: [
              IconContainerSv({
                isAbsolute: isIconAbsolute,
                position: 'left',
              }),
              styles.pointerEventsNone,
            ],
          })}
        >
          {leftIconAction.customIcon ||
            (leftIconAction.name && <Icon name={leftIconAction.name} size={sizingVariant} {...leftIconAction} />)}
        </Box>
      )}

      {!isLoading && (
        <Box
          {...classNameHandler(cn(twStyles.stringContainer))}
          {...styleHandler({ defaultStyle: styles.stringContainer })}
        >
          {title && (
            <String
              size={sizingVariant}
              position={contentPosition}
              {...styleHandler({ defaultStyle: styles.pointerEventsNone, style: stringProps?.style })}
              {...finalStringProps}
            >
              {title}
            </String>
          )}
        </Box>
      )}

      {rightIconAction && !isLoading && (
        <Box
          {...classNameHandler(
            cn(
              IconPositionTv({
                isAbsolute: isIconAbsolute,
                position: 'right',
              }),
              twStyles.pointerEventsNone,
            ),
          )}
          {...styleHandler({
            defaultStyle: [
              IconContainerSv({
                isAbsolute: isIconAbsolute,
                position: 'right',
              }),
              styles.pointerEventsNone,
            ],
          })}
        >
          {rightIconAction.customIcon ||
            (rightIconAction.name && <Icon name={rightIconAction.name} size={sizingVariant} {...rightIconAction} />)}
        </Box>
      )}
    </Box>
  );
}

/**
 * Renders the appropriate touchable component based on the 'as' prop
 */
const TouchableComponent = forwardRef<any, PropsWithChildren<BtnPropsTw>>(
  ({ as = buttonDefaultProps.as, children, className, isDisabled, isLoading, onPress, style, ...props }, ref) => {
    const isButtonDisabled = isDisabled || isLoading;
    const commonProps = {
      disabled: isButtonDisabled,
      onPress: isButtonDisabled ? undefined : onPress,
      ref,
      ...props,
    };

    switch (as) {
      case 'pressable':
        return (
          <Pressable {...commonProps} {...classNameHandler(className)} {...styleHandler({ style })}>
            {children}
          </Pressable>
        );

      case 'ripple-pressable':
        return (
          <RipplePressable {...commonProps} {...classNameHandler(className)} {...styleHandler({ style })}>
            {children}
          </RipplePressable>
        );

      case 'scale-pressable':
        return (
          <ScalePressable {...commonProps} {...classNameHandler(className)} {...styleHandler({ style })}>
            {children}
          </ScalePressable>
        );

      case 'touchable-opacity':
      default:
        return (
          <TouchableOpacity {...commonProps} {...classNameHandler(className)} {...styleHandler({ style })}>
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
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button title="Click me" onPress={handlePress} />
 * ```
 *
 * @param as - Type of touchable component to use: 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable' (default: 'touchable-opacity')
 * @param children - Custom content to render inside the button
 * @param className - (only NativeWind) Custom CSS classes for the button container
 * @param colorVariant - (only NativeWind) Button color variant: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'accent' | 'dark' | 'light' | 'danger' | 'neutral' | 'muted' | 'tertiary' | 'inverted' | 'white' (default: 'primary')
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
  classNamePropsHandler(props, 'Button');
  colorVariantPropsHandler(props, 'Button');
  const {
    as = buttonDefaultProps.as,
    children,
    className,
    colorVariant = buttonDefaultProps.colorVariant,
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
      onPress={onPress}
      as={as}
      isDisabled={isDisabled}
      isLoading={isLoading}
      {...classNameHandler(
        cn(
          ButtonTv({
            colorVariant,
            isDisabled: !!isDisabled,
            isLoading: !!isLoading,
            position,
            size,
            variant,
          }),
          className,
        ),
      )}
      {...styleHandler({
        defaultStyle: ButtonSv({
          isDisabled: !!isDisabled,
          isLoading: !!isLoading,
          position,
          size,
          variant,
        }),
        style,
      })}
    >
      {children ?? buttonContent}
    </TouchableComponent>
  );
});

Button.displayName = 'Button';

export default Button;
