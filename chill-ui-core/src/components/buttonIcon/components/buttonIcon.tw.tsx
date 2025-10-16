import type { ButtonIconPropsTw } from '@types';

import { cn } from '@utils';
import { IconTw } from '@components/icon';
import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressableTw } from '@components/ripplePressable';
import { LoadingIndicator } from '@components/loadingIndicatorsKit';

import { BoxTw } from '@/components/box';
import { ScalePressableTw } from '@/components/scalePressable';

import { buttonIconDefaultProps } from '../utils/defaultProps';
import { buttonIconTv, twStyles } from '../styles/buttonIcon.tw.styles';

/**
 * The `<ButtonIcon />` component provides a flexible and accessible icon button implementation.
 * Supports multiple touchable types, loading states, and icon customization using NativeWind.
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
    className: cn(buttonIconTv({ colorVariant, isDisabled, isLoading, rounded, variant }), className),
    disabled: isButtonDisabled,
    onPress: isButtonDisabled ? undefined : onPress,
    style,
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator name="spinner" {...loadingIndicatorProps} />;
    }
    return (
      <BoxTw className={twStyles.pointerEventsNone}>
        <IconTw name={iconName} size={size} color={iconColor} />
      </BoxTw>
    );
  };

  switch (as) {
    case 'ripple-pressable':
      return (
        <BoxTw>
          <RipplePressableTw {...commonProps}>{renderContent()}</RipplePressableTw>
        </BoxTw>
      );

    case 'pressable':
      return (
        <BoxTw>
          <Pressable {...commonProps}>{renderContent()}</Pressable>
        </BoxTw>
      );
    case 'scale-pressable':
      return (
        <BoxTw>
          <ScalePressableTw {...commonProps}>{renderContent()}</ScalePressableTw>
        </BoxTw>
      );
    case 'touchable-opacity':
    default:
      return (
        <BoxTw>
          <TouchableOpacity {...commonProps} activeOpacity={0.7}>
            {renderContent()}
          </TouchableOpacity>
        </BoxTw>
      );
  }
}
