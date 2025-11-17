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
 * The `<ButtonIcon />` component provides a flexible and accessible icon button implementation.
 * Supports multiple touchable types, loading states, and icon customization using StyleSheet.
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
