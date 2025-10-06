import type { ButtonIconPropsSs } from '@types';

import { BoxSs } from '@components/box';
import { IconSs } from '@components/icon';
import { Pressable, TouchableOpacity } from 'react-native';
import { ScalePressableSs } from '@components/scalePressable';
import { RipplePressableSs } from '@components/ripplePressable';
import { LoadingIndicator } from '@components/loadingIndicatorsKit';

import { buttonIconDefaultProps } from '../utils/defaultProps';
import { buttonIconSv, styles } from '../styles/buttonIcon.ss.styles';

/**
 * ButtonIcon component with support for multiple touchable types, loading states, and icon customization.
 * Provides a flexible and accessible icon button implementation with support for different interaction patterns.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ButtonIcon iconName="bell-solid" onPress={handlePress} />
 *
 * // With different variants
 * <ButtonIcon iconName="heart-solid" variant="outlined" onPress={handlePress} />
 * <ButtonIcon iconName="star-solid" rounded="circle" onPress={handlePress} />
 *
 * // With different touchable types
 * <ButtonIcon iconName="settings-solid" as="ripple-pressable" onPress={handlePress} />
 * <ButtonIcon iconName="home-solid" as="scale-pressable" onPress={handlePress} />
 *
 * // With loading state
 * <ButtonIcon iconName="refresh-solid" isLoading onPress={handlePress} />
 * ```
 *
 * @param as - Type of touchable component to use: 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable' (default: 'touchable-opacity')
 * @param iconColor - Color of the icon
 * @param iconName - Name of the icon to display (required)
 * @param isDisabled - Whether the button is disabled
 * @param isLoading - Whether the button is in loading state
 * @param loadingIndicatorProps - Props to pass to the loading indicator
 * @param onPress - Press callback function
 * @param rounded - Button shape: 'circle' | 'square' (default: 'square')
 * @param size - Icon size variant (default: 'md')
 * @param style - Style object for the button container
 * @param variant - Button style variant: 'contained' | 'outlined' (default: 'contained')
 */
export default function ButtonIcon(props: ButtonIconPropsSs) {
  const {
    as = buttonIconDefaultProps.as,
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
    disabled: isButtonDisabled,
    onPress: isButtonDisabled ? undefined : onPress,
    style: [buttonIconSv({ isDisabled, isLoading, rounded, variant }), style],
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator name="spinner" {...loadingIndicatorProps} />;
    }
    return (
      <BoxSs style={styles.pointerEventsNone}>
        <IconSs name={iconName} size={size} color={iconColor} />
      </BoxSs>
    );
  };

  switch (as) {
    case 'ripple-pressable':
      return (
        <BoxSs>
          <RipplePressableSs {...commonProps}>{renderContent()}</RipplePressableSs>
        </BoxSs>
      );

    case 'pressable':
      return (
        <BoxSs>
          <Pressable {...commonProps}>{renderContent()}</Pressable>
        </BoxSs>
      );
    case 'scale-pressable':
      return (
        <BoxSs>
          <ScalePressableSs {...commonProps}>{renderContent()}</ScalePressableSs>
        </BoxSs>
      );
    case 'touchable-opacity':
    default:
      return (
        <BoxSs>
          <TouchableOpacity {...commonProps} activeOpacity={0.7}>
            {renderContent()}
          </TouchableOpacity>
        </BoxSs>
      );
  }
}
