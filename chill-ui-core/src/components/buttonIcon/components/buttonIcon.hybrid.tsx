import type { ButtonIconPropsTw } from '@types';

import { Box } from '@components/box';
import { Icon } from '@components/icon';
import { Pressable, TouchableOpacity } from 'react-native';
import { ScalePressable } from '@components/scalePressable';
import { RipplePressable } from '@components/ripplePressable';
import { LoadingIndicator } from '@components/loadingIndicatorsKit';
import { classNamePropsHandler, classNameHandler, cn, styleHandler, colorVariantPropsHandler } from '@utils';

import { buttonIconDefaultProps } from '../utils/defaultProps';
import { buttonIconSv, styles } from '../styles/buttonIcon.ss.styles';
import { buttonIconTv, twStyles } from '../styles/buttonIcon.tw.styles';

/**
 * The `<ButtonIcon />` component provides a flexible and accessible icon button implementation.
 * Supports multiple touchable types, loading states, and icon customization.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { ButtonIcon } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <ButtonIcon iconName="bell-solid" onPress={handlePress} />
 * ```
 *
 * @param as - Type of touchable component to use: 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable' (default: 'touchable-opacity')
 * @param className - Custom CSS classes for the button container (NativeWind)
 * @param colorVariant - Button color variant: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'accent' | 'dark' | 'light' | 'danger' | 'neutral' | 'muted' | 'tertiary' | 'inverted' | 'white' (default: 'primary')
 * @param iconColor - Color of the icon
 * @param iconName - Name of the icon to display (required)
 * @param isDisabled - Whether the button is disabled
 * @param isLoading - Whether the button is in loading state
 * @param loadingIndicatorProps - Props to pass to the loading indicator
 * @param onPress - Press callback function
 * @param rounded - Button shape: 'circle' | 'square' (default: 'square')
 * @param size - Icon size variant: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
 * @param style - Style object for the button container
 * @param variant - Button style variant: 'contained' | 'outlined' (default: 'contained')
 */
export default function ButtonIcon(props: ButtonIconPropsTw) {
  classNamePropsHandler(props, 'ButtonIcon');
  colorVariantPropsHandler(props, 'ButtonIcon');

  const {
    as = buttonIconDefaultProps.as,
    className,
    colorVariant = buttonIconDefaultProps.colorVariant,
    iconColor,
    iconName,
    isDisabled = buttonIconDefaultProps.isDisabled,
    isLoading = buttonIconDefaultProps.isLoading,
    loadingIndicatorProps,
    onPress,
    rounded = buttonIconDefaultProps.rounded,
    size,
    style,
    variant = buttonIconDefaultProps.variant,
  } = props;

  const isButtonDisabled = isDisabled || isLoading;

  const commonProps = {
    ...classNameHandler(cn(buttonIconTv({ colorVariant, isDisabled, isLoading, rounded, variant }), className)),
    ...styleHandler({ defaultStyle: buttonIconSv({ isDisabled, isLoading, rounded, variant }), style }),
    disabled: isButtonDisabled,
    onPress: isButtonDisabled ? undefined : onPress,
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator name="spinner" {...loadingIndicatorProps} />;
    }
    return (
      <Box
        {...classNameHandler(twStyles.pointerEventsNone)}
        {...styleHandler({ defaultStyle: styles.pointerEventsNone })}
      >
        <Icon name={iconName} size={size} color={iconColor} />
      </Box>
    );
  };

  switch (as) {
    case 'ripple-pressable':
      return (
        <Box>
          <RipplePressable {...commonProps}>{renderContent()}</RipplePressable>
        </Box>
      );

    case 'pressable':
      return (
        <Box>
          <Pressable {...commonProps}>{renderContent()}</Pressable>
        </Box>
      );
    case 'scale-pressable':
      return (
        <Box>
          <ScalePressable {...commonProps}>{renderContent()}</ScalePressable>
        </Box>
      );
    case 'touchable-opacity':
    default:
      return (
        <Box>
          <TouchableOpacity {...commonProps} activeOpacity={0.7}>
            {renderContent()}
          </TouchableOpacity>
        </Box>
      );
  }
}
