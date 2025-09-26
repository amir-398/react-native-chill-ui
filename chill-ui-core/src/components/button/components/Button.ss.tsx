import { BtnPropsTw } from '@types';
import Icon from '@components/icon';
import { Box } from '@components/box';
import { tv } from 'tailwind-variants';
import { String } from '@components/string';
import { ScalePressable } from '@components/scalePressable';
import { RipplePressable } from '@components/ripplePressable';
import { forwardRef, PropsWithChildren, useMemo } from 'react';
import { LoadingIndicator } from '@components/loadingIndicatorsKit';
import { classNamePropsHandler, cn, isNativeWindInstalled } from '@utils';
import { Pressable, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import styles from '../styles/Button.styles';
import { btnVariant, btnColorVariant, heightVr, opacityVariant, positionVr } from '../styles/Button.variants';

/**
 * Maps button size to loading indicator size
 */
const getLoadingIconSize = (size: string): number => {
  const sizeMap: Record<string, number> = {
    '2xl': 24,
    '2xs': 14,
    lg: 20,
    md: 18,
    sm: 16,
    xl: 22,
    xs: 15,
  };

  return sizeMap[size] || 18;
};

/**
 * Maps button color variant to appropriate text color variant for the String component
 * Returns the color variant key that String component understands
 */
const getTextColorVariant = (colorVariant: string, variant: string): string => {
  // For contained and text variants, use the text-button-{color}-background pattern for text variants
  if (variant === 'text') {
    // These will return keys like text-button-primary-background, text-button-danger-background, etc.
    return `text-button-${colorVariant}-background`;
  }

  // For contained variants, use the text color variants
  if (variant === 'contained') {
    return `text-button-${colorVariant}-text`;
  }

  // For outlined variant, use the same color as the button background
  if (variant === 'outlined') {
    return `text-button-${colorVariant}-background`;
  }

  return 'primary'; // Default fallback
};

/**
 * Gets StyleSheet styles for button without NativeWind
 */
const getButtonStyles = (
  variant: string,
  colorVariant: string,
  size: string,
  position: string,
  isDisabled?: boolean,
  isLoading?: boolean,
) => {
  const baseStyles = [styles.buttonBase];

  // Add size styles
  const sizeStyleMap: Record<string, any> = {
    '2xl': styles.height2xl,
    '2xs': styles.height2xs,
    lg: styles.heightLg,
    md: styles.heightMd,
    sm: styles.heightSm,
    xl: styles.heightXl,
    xs: styles.heightXs,
  };

  if (sizeStyleMap[size]) {
    baseStyles.push(sizeStyleMap[size]);
  }

  // Add variant styles (contained/outlined/text)
  const variantStyleMap: Record<string, any> = {
    contained: styles.variantContained,
    outlined: styles.variantOutlined,
    text: styles.variantText,
  };

  if (variantStyleMap[variant]) {
    baseStyles.push(variantStyleMap[variant]);
  }

  // Add color variant styles (only primary without NativeWind)
  // Don't apply background color for outlined and text variants
  if (variant === 'contained') {
    const colorVariantStyleMap: Record<string, any> = {
      primary: styles.colorPrimary,
    };

    if (colorVariantStyleMap[colorVariant]) {
      baseStyles.push(colorVariantStyleMap[colorVariant]);
    }
  }

  // Add compound styles for outlined/text variants with colors
  if (variant === 'outlined') {
    const outlinedStyleKey =
      `outlined${colorVariant.charAt(0).toUpperCase() + colorVariant.slice(1)}` as keyof typeof styles;
    if (styles[outlinedStyleKey]) {
      baseStyles.push(styles[outlinedStyleKey] as any);
    }
  }

  // Add position styles
  const positionStyleMap: Record<string, any> = {
    center: styles.positionCenter,
    left: styles.positionLeft,
    right: styles.positionRight,
  };

  if (positionStyleMap[position]) {
    baseStyles.push(positionStyleMap[position]);
  }

  // Add state styles by creating an object that includes opacity
  let finalStyles = baseStyles;

  if (isDisabled || isLoading) {
    // Create a flattened style object that includes opacity
    const baseStyle = StyleSheet.flatten(baseStyles);
    const stateStyle = isDisabled ? styles.disabled : styles.loading;
    finalStyles = [{ ...baseStyle, ...stateStyle }];
  }

  return finalStyles;
};

/**
 * Gets StyleSheet styles for content container without NativeWind
 */
const getContentContainerStyles = (isTextCentered: boolean, iconPosition: string) => {
  if (isTextCentered) {
    return [styles.contentContainer, styles.iconPositionCenter];
  }

  if (iconPosition === 'left') {
    return [styles.contentContainer, styles.iconPositionLeft];
  }

  if (iconPosition === 'right') {
    return [styles.contentContainer, styles.iconPositionRight];
  }

  return [styles.contentContainer];
};

/**
 * Gets StyleSheet styles for icon container without NativeWind
 */
const getIconContainerStyles = (isAbsolute: boolean, iconPosition: string) => {
  const styles_array = [];

  if (isAbsolute) {
    styles_array.push(styles.iconAbsolute);
    if (iconPosition === 'left') {
      styles_array.push(styles.iconAbsoluteLeft);
    } else if (iconPosition === 'right') {
      styles_array.push(styles.iconAbsoluteRight);
    }
  } else if (iconPosition === 'left') {
    styles_array.push(styles.iconMarginRight);
  } else if (iconPosition === 'right') {
    styles_array.push(styles.iconMarginLeft);
  }

  return styles_array;
};

/**
 * Gets StyleSheet styles for text container without NativeWind
 */
const getTextContainerStyles = (isTextCentered: boolean, iconPosition: string) => {
  if (isTextCentered) {
    return [styles.textContainer, styles.textContainerCenter];
  }

  if (iconPosition === 'right') {
    return [styles.textContainer, styles.textContainerEnd];
  }

  return [styles.textContainer, styles.textContainerStart];
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
  colorVariant,
  contentPosition,
  iconAction,
  isLoading,
  loadingIndicatorProps,
  size = 'md',
  stringProps,
  title,
  variant,
}: {
  children?: React.ReactNode;
  colorVariant?: string;
  isLoading?: boolean;
  loadingIndicatorProps?: any;
  size?: string;
  stringProps?: any;
  iconAction?: BtnPropsTw['iconAction'];
  title?: string;
  variant?: string;
  contentPosition?: string;
}) {
  const textSize = useMemo(() => {
    switch (size) {
      case '2xl':
        return 'xl';
      case '2xs':
        return '2xs';
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

  if (children) {
    return children;
  }

  if (isLoading) {
    return <LoadingIndicator name="spinner" {...loadingIndicatorProps} />;
  }

  const isTextCentered = stringProps?.position === 'center';
  const iconPosition = iconAction?.position || 'left';
  const isIconAbsolute = isTextCentered;

  // Get the appropriate text color based on button variant and colorVariant
  const textColorVariant = getTextColorVariant(colorVariant || 'primary', variant || 'contained');

  // Merge stringProps with the computed color
  const finalStringProps = {
    ...stringProps,
    colorVariant: stringProps?.colorVariant || textColorVariant,
  };

  return isNativeWindInstalled() ? (
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
          <String weight="semiBold" size={textSize} position={contentPosition} {...finalStringProps}>
            {title}
          </String>
        )}
      </Box>

      {iconAction && iconPosition === 'right' && (
        <Box className="ml-2">{iconAction.customIcon || <Icon {...iconAction} />}</Box>
      )}
    </Box>
  ) : (
    <Box style={getContentContainerStyles(isTextCentered, iconPosition)}>
      {iconAction && iconPosition === 'left' && (
        <Box style={getIconContainerStyles(isIconAbsolute, iconPosition)}>
          {iconAction.customIcon || <Icon {...iconAction} />}
        </Box>
      )}

      <Box style={getTextContainerStyles(isTextCentered, iconPosition)}>
        {title && (
          <String weight="semiBold" size={textSize} position={contentPosition} {...finalStringProps}>
            {title}
          </String>
        )}
      </Box>

      {iconAction && iconPosition === 'right' && (
        <Box style={getIconContainerStyles(isIconAbsolute, iconPosition)}>
          {iconAction.customIcon || <Icon {...iconAction} />}
        </Box>
      )}
    </Box>
  );
}

/**
 * Renders the appropriate touchable component based on the 'as' prop
 */
const TouchableComponent = forwardRef<any, PropsWithChildren<BtnPropsTw>>(
  ({ as = 'TouchableOpacity', children, className, isDisabled, isLoading, onPress, style, ...props }, ref) => {
    const isButtonDisabled = isDisabled || isLoading;

    const commonProps = {
      disabled: isButtonDisabled,
      onPress: isButtonDisabled ? undefined : onPress,
      ref,
      ...props,
    };

    if (isNativeWindInstalled()) {
      switch (as) {
        case 'Pressable':
          return (
            // @ts-ignore
            <Pressable {...commonProps} className={className} style={style}>
              {children}
            </Pressable>
          );

        case 'RipplePressable':
          return (
            <RipplePressable {...commonProps} className={className} style={style as ViewStyle}>
              {children}
            </RipplePressable>
          );

        case 'ScalePressable':
          return (
            <ScalePressable {...commonProps} className={className} style={style}>
              {children}
            </ScalePressable>
          );

        case 'TouchableOpacity':
        default:
          return (
            // @ts-ignore
            <TouchableOpacity {...commonProps} className={className} style={style} activeOpacity={0.7}>
              {children}
            </TouchableOpacity>
          );
      }
    } else {
      switch (as) {
        case 'Pressable':
          return (
            <Pressable {...commonProps} style={style}>
              {children}
            </Pressable>
          );

        case 'RipplePressable':
          return (
            <RipplePressable {...commonProps} style={style as ViewStyle}>
              {children}
            </RipplePressable>
          );

        case 'ScalePressable':
          return (
            <ScalePressable {...commonProps} style={style}>
              {children}
            </ScalePressable>
          );

        case 'TouchableOpacity':
        default:
          return (
            <TouchableOpacity {...commonProps} style={style} activeOpacity={0.7}>
              {children}
            </TouchableOpacity>
          );
      }
    }
  },
);

TouchableComponent.displayName = 'TouchableComponent';

/**
 * Button component with support for multiple touchable types, loading states, and various styling options.
 * Provides a flexible and accessible button implementation with support for different interaction patterns.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button title="Click me" onPress={handlePress} />
 *
 * // With different variants and colors
 * <Button variant="contained" colorVariant="primary" title="Contained Primary" onPress={handlePress} />
 * <Button variant="outlined" colorVariant="error" title="Outlined Error" onPress={handlePress} />
 * <Button variant="text" colorVariant="success" title="Text Success" onPress={handlePress} />
 *
 * // With different touchable types
 * <Button as="RipplePressable" title="Ripple effect" onPress={handlePress} />
 * <Button as="ScalePressable" title="Scale effect" onPress={handlePress} />
 * <Button as="Pressable" title="Native ripple" onPress={handlePress} />
 *
 * // With loading state
 * <Button isLoading title="Loading..." onPress={handlePress} />
 *
 * ```
 *
 * @param as - Type of touchable component to use: 'TouchableOpacity' | 'Pressable' | 'RipplePressable' | 'ScalePressable' (default: 'TouchableOpacity')
 * @param children - Custom content to render inside the button
 * @param className - Custom CSS classes for the button container (NativeWind)
 * @param isDisabled - Whether the button is disabled
 * @param iconAction - Icon configuration with position support (left/right/center)
 * @param isLoading - Whether the button is in loading state
 * @param loadingIndicatorProps - Props to pass to the loading indicator
 * @param onPress - Press callback function
 * @param position - Content position within the button (default: 'center')
 * @param size - Button size variant (default: 'md')
 * @param stringProps - Props to pass to the String component
 * @param title - Button title text
 * @param variant - Button style variant: 'contained' | 'outlined' | 'text' (default: 'contained')
 * @param colorVariant - Button color variant: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'accent' | 'dark' | 'light' | 'danger' | 'neutral' | 'muted' | 'tertiary' | 'inverted' | 'white' (default: 'primary')
 * @param contentPosition - Content position within the button (default: 'center') 'left' | 'center' | 'right'
 */
const Button = forwardRef<any, PropsWithChildren<BtnPropsTw>>((props, ref) => {
  classNamePropsHandler(props, 'Button');

  const {
    children,
    className,
    colorVariant = 'primary',
    contentPosition = 'center',
    iconAction,
    isDisabled,
    isLoading,
    loadingIndicatorProps,
    position = 'center',
    size = 'md',
    stringProps,
    style,
    title,
    variant = 'contained',
  } = props;

  // Limite les variantes de couleur aux utilisateurs avec NativeWind
  let finalColorVariant = colorVariant;
  if (__DEV__ && !isNativeWindInstalled() && colorVariant !== 'primary') {
    console.error('Color variants are only available with NativeWind. Falling back to primary variant.');
    finalColorVariant = 'primary';
  }

  const buttonStyles = useMemo(() => {
    if (isNativeWindInstalled()) {
      return cn(
        btnVariant({ variant }),
        btnColorVariant({ colorVariant: finalColorVariant, variant }),
        heightVr({ size }),
        positionVr({ position }),
        opacityVariant({ disabled: isDisabled, loading: isLoading }),
        'w-full items-center justify-center rounded-lg',
        className,
      );
    }
    return undefined;
  }, [variant, finalColorVariant, size, position, isDisabled, isLoading, className]);

  const styleSheetStyles = useMemo(() => {
    if (!isNativeWindInstalled()) {
      return getButtonStyles(variant, finalColorVariant, size, position, isDisabled, isLoading);
    }
    return undefined;
  }, [variant, finalColorVariant, size, position, isDisabled, isLoading]);

  const buttonContent = useMemo(
    () => (
      <ButtonContent
        colorVariant={finalColorVariant}
        isLoading={isLoading}
        loadingIndicatorProps={{
          ...loadingIndicatorProps,
          size: getLoadingIconSize(size),
        }}
        size={size}
        stringProps={stringProps}
        iconAction={iconAction}
        title={title}
        variant={variant}
        contentPosition={contentPosition}
      />
    ),
    [
      finalColorVariant,
      contentPosition,
      isLoading,
      loadingIndicatorProps,
      size,
      stringProps,
      iconAction,
      title,
      variant,
    ],
  );

  const combinedStyle = isNativeWindInstalled() ? style : [styleSheetStyles, style];

  return (
    <TouchableComponent ref={ref} {...props} className={buttonStyles} style={combinedStyle}>
      {children ?? buttonContent}
    </TouchableComponent>
  );
});

Button.displayName = 'Button';

export default Button;
