import { cn } from '@utils';
import { Pressable, TouchableOpacity } from 'react-native';

import type { ButtonIconProps } from '../../types/buttonIcon.types';

import Icon from '../icon';
import { RipplePressable } from '../ripplePressable';
import LoadingIndicator from '../loadingIndicatorsKit/LoadingIndicator';

/**
 * ButtonIcon component with support for multiple touchable types, loading states, and icon customization.
 * Provides a flexible and accessible icon button implementation with support for different interaction patterns.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ButtonIcon iconName="bell-solid" onPress={handlePress} />
 *
 * // With different touchable types
 * <ButtonIcon as="RipplePressable" iconName="home-solid" onPress={handlePress} />
 * <ButtonIcon as="Pressable" iconName="settings-solid" onPress={handlePress} />
 *
 * // With loading state
 * <ButtonIcon isLoading iconName="spinner" onPress={handlePress} />
 *
 * // With custom icon color
 * <ButtonIcon iconName="heart-solid" iconColor="#FF3B30" onPress={handlePress} />
 *
 * // With different sizes
 * <ButtonIcon size="lg" iconName="star-solid" onPress={handlePress} />
 * ```
 *
 * @param as - Type of touchable component to use (default: 'Pressable')
 * @param className - Custom CSS classes for the button container
 * @param iconColor - Color of the icon
 * @param iconName - Name of the icon to display (required)
 * @param isDisabled - Whether the button is disabled
 * @param isLoading - Whether the button is in loading state
 * @param loadingIndicatorProps - Props to pass to the loading indicator
 * @param onPress - Press callback function
 * @param size - Icon size variant (default: 'md')
 */
export default function ButtonIcon(props: ButtonIconProps) {
  const {
    as = 'Pressable',
    className,
    iconColor,
    iconName,
    isDisabled = false,
    isLoading = false,
    loadingIndicatorProps,
    onPress,
    size,
  } = props;

  const isButtonDisabled = isDisabled || isLoading;

  const commonProps = {
    className: cn(
      'bg-secondary flex-row items-center justify-center rounded-md p-2',
      isDisabled && 'opacity-50',
      className,
    ),
    disabled: isButtonDisabled,
    onPress: isButtonDisabled ? undefined : onPress,
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator name="spinner" {...loadingIndicatorProps} />;
    }
    return <Icon name={iconName} size={size} color={iconColor} />;
  };

  switch (as) {
    case 'TouchableOpacity':
      return (
        <TouchableOpacity {...commonProps} activeOpacity={0.7}>
          {renderContent()}
        </TouchableOpacity>
      );

    case 'RipplePressable':
      return (
        <RipplePressable onPress={commonProps.onPress} className={commonProps.className}>
          {renderContent()}
        </RipplePressable>
      );

    case 'Pressable':
    default:
      return (
        <Pressable {...commonProps} android_ripple={{ color: '#F6F7F8' }}>
          {renderContent()}
        </Pressable>
      );
  }
}
