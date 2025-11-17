import { InputDropdownModalProps } from '@types';
import { Modal, Pressable, View } from 'react-native';
import { classNameHandler, classNamePropsHandler, styleHandler } from '@utils';

import InputDropdown from './InputDropdown.hybrid';
import { styles } from '../styles/InputDropdownModal.ss.styles';
import { twStyles } from '../styles/InputDropdownModal.tw.styles';

/**
 * Wraps an InputDropdown in a modal overlay for positioning and backdrop interaction.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <InputDropdownModal
 *   dropdownProps={{
 *     visible: isOpen,
 *     data: options,
 *     onSelectItem: handleSelect,
 *     maxHeight: 300
 *   }}
 *   dropdownPosition={{ top: 100, left: 20, width: 200 }}
 *   toggleDropdown={() => setIsOpen(!isOpen)}
 *   modalProps={{ animationType: 'fade' }}
 * />
 * ```
 *
 * @param dropdownProps - Props to pass to the underlying InputDropdown component
 * @param dropdownPosition - Position and dimensions for the dropdown (top, left, width, height)
 * @param backdropPress - Function to handle backdrop press
 * @param modalProps - Props to pass to the React Native Modal component
 * @param dropdownRef - Ref for the dropdown container element
 * @param wrapperRef - Ref for the modal wrapper element
 * @returns Modal-wrapped dropdown component with backdrop and positioning
 */
export default function InputDropdownModal(props: InputDropdownModalProps) {
  classNamePropsHandler(props, 'InputDropdownModal');
  const { backdropPress, dropdownPosition, dropdownProps, dropdownRef, modalProps, wrapperRef } = props;

  const handleBackdropPress = () => {
    backdropPress?.();
  };

  return (
    <Modal transparent statusBarTranslucent {...modalProps}>
      <View
        {...classNameHandler(twStyles.wrapper)}
        {...styleHandler({ defaultStyle: styles.wrapper })}
        ref={wrapperRef}
      >
        <Pressable
          {...classNameHandler(twStyles.backdrop)}
          {...styleHandler({ defaultStyle: styles.backdrop })}
          onPress={handleBackdropPress}
        />
        <View
          ref={dropdownRef}
          style={{
            position: 'absolute',
            ...dropdownPosition,
          }}
        >
          <InputDropdown {...dropdownProps} />
        </View>
      </View>
    </Modal>
  );
}
