import { tv } from 'tailwind-variants';
import { forwardRef, useMemo } from 'react';
import { TouchableOpacity, Pressable } from 'react-native';

import cn from '../cn';
import { Box } from '../box';
import String from '../string';
import Icon from '../icon/Icon';
import { BtnProps } from '../../types';
import RipplePressable from '../ripple-pressable';
import LoadingIndicator from '../loadingIndicatorsKit/LoadingIndicator';
import { btnVariant, heightVr, opacityVariant, positionVr } from './styleVariants';

/**
 * Maps button size to loading indicator size
 */
const getLoadingIconSize = (size: string): number => {
  const sizeMap: Record<string, number> = {
    '2xs': 20,
    lg: 36,
    md: 32,
    sm: 28,
    xs: 24,
  };

  return sizeMap[size] || 32;
};

const iconPositionVariants = tv({
  variants: {
    flexPosition: {
      center: 'justify-center',
      left: 'justify-start',
      right: 'justify-end',
    },
    isAbsolute: {
      false: '',
      true: 'absolute',
    },
    position: {
      center: 'left-3',
      left: 'left-3',
      right: 'right-3',
    },
  },
});

/**
 * Renders the button content based on loading state and props
 */
function ButtonContent({
  children,
  iconAction,
  isLoading,
  loadingIndicatorProps,
  size = 'md',
  stringProps,
  title,
}: {
  children?: React.ReactNode;
  isLoading?: boolean;
  loadingIndicatorProps?: any;
  size?: string;
  stringProps?: any;
  iconAction?: BtnProps['iconAction'];
  title?: string;
}) {
  if (children) {
    return children;
  }

  if (isLoading) {
    return <LoadingIndicator name="spinner" {...loadingIndicatorProps} />;
  }

  const isTextCentered = stringProps?.position === 'center';
  const iconPosition = iconAction?.position || 'left';

  const isIconAbsolute = isTextCentered;

  return (
    <Box
      className={cn(
        'w-full flex-row items-center px-3',
        iconPositionVariants({
          flexPosition: isTextCentered ? 'center' : iconPosition,
          isAbsolute: isIconAbsolute,
        }),
      )}
    >
      {iconAction && iconPosition === 'left' && (
        <Box
          className={cn(
            isIconAbsolute
              ? iconPositionVariants({
                  isAbsolute: true,
                  position: iconPosition,
                })
              : 'mr-2',
          )}
        >
          {iconAction.customIcon || <Icon {...iconAction} />}
        </Box>
      )}

      <Box
        className={cn('flex-1', {
          'justify-center': isTextCentered,
          'justify-end': !isTextCentered && iconPosition === 'right',
          'justify-start': !isTextCentered && iconPosition === 'left',
        })}
      >
        {title && (
          <String weight="bold" size={size} position="center" {...stringProps}>
            {title}
          </String>
        )}
      </Box>

      {iconAction && iconPosition === 'right' && (
        <Box className="ml-2">{iconAction.customIcon || <Icon {...iconAction} />}</Box>
      )}
    </Box>
  );
}

/**
 * Renders the appropriate touchable component based on the 'as' prop
 */
const TouchableComponent = forwardRef<any, BtnProps>(
  ({ as = 'TouchableOpacity', children, className, isDisabled, isLoading, onPress, ...props }, ref) => {
    const isButtonDisabled = isDisabled || isLoading;

    const commonProps = {
      className,
      disabled: isButtonDisabled,
      onPress: isButtonDisabled ? undefined : onPress,
      ref,
      ...props,
    };

    switch (as) {
      case 'Pressable':
        return (
          <Pressable {...commonProps} android_ripple={{ color: '#F6F7F8' }}>
            {children}
          </Pressable>
        );

      case 'RipplePressable':
        return (
          <RipplePressable onPress={commonProps.onPress} className={commonProps.className}>
            {children}
          </RipplePressable>
        );

      case 'TouchableOpacity':
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
 * Provides a flexible and accessible button implementation with support for different interaction patterns.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button title="Click me" onPress={handlePress} />
 *
 * // With different touchable types
 * <Button as="RipplePressable" title="Ripple effect" onPress={handlePress} />
 * <Button as="Pressable" title="Native ripple" onPress={handlePress} />
 *
 * // With loading state
 * <Button isLoading title="Loading..." onPress={handlePress} />
 *
 * ```
 *
 * @param as - Type of touchable component to use (default: 'TouchableOpacity')
 * @param children - Custom content to render inside the button
 * @param className - Custom CSS classes for the button container
 * @param isDisabled - Whether the button is disabled

 * @param iconAction - Icon configuration with position support (left/right/center)
 * @param isLoading - Whether the button is in loading state
 * @param loadingIndicatorProps - Props to pass to the loading indicator
 * @param onPress - Press callback function
 * @param position - Content position within the button (default: 'center')
 * @param size - Button size variant (default: 'md')
 * @param stringProps - Props to pass to the String component
 * @param title - Button title text
 * @param variant - Button style variant (default: 'primary')
 */
const Button = forwardRef<any, BtnProps>(
  (
    {
      as = 'TouchableOpacity',
      children,
      className,
      iconAction,
      isDisabled,
      isLoading,
      loadingIndicatorProps,
      onPress,
      position = 'center',
      size = 'md',
      stringProps,
      title,
      variant = 'primary',
      ...props
    },
    ref,
  ) => {
    // Memoize the button styles to avoid unnecessary recalculations
    const buttonStyles = useMemo(
      () =>
        cn(
          btnVariant({ variant }),
          heightVr({ size }),
          positionVr({ position }),
          opacityVariant({ disabled: isDisabled, loading: isLoading }),
          'w-full items-center justify-center rounded-lg',
          className,
        ),
      [variant, size, position, isDisabled, isLoading, className],
    );

    // Memoize the content to avoid unnecessary re-renders
    const buttonContent = useMemo(
      () => (
        <ButtonContent
          isLoading={isLoading}
          loadingIndicatorProps={{
            ...loadingIndicatorProps,
            size: getLoadingIconSize(size),
          }}
          size={size}
          stringProps={stringProps}
          iconAction={iconAction}
          title={title}
        />
      ),
      [isLoading, loadingIndicatorProps, size, stringProps, iconAction, title],
    );

    return (
      <TouchableComponent
        ref={ref}
        as={as}
        className={buttonStyles}
        isDisabled={isDisabled}
        isLoading={isLoading}
        onPress={onPress}
        {...props}
      >
        {children || buttonContent}
      </TouchableComponent>
    );
  },
);

Button.displayName = 'Button';

export default Button;
