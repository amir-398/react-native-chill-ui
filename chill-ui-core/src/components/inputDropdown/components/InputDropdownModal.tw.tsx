import { InputDropdownModalPropsTw } from '@types';
import { Modal, Pressable, View } from 'react-native';

import InputDropdownTw from './InputDropdown.tw';
import { twStyles } from '../styles/InputDropdownModal.tw.styles';

/**
 * Wraps an InputDropdown in a modal overlay for positioning and backdrop interaction.
 *
 * @example
 * ```tsx
 * <InputDropdownModal
 *   dropdownProps={{
 *     visible: isOpen,
 *     data: options,
 *     onSelectItem: handleSelect,
 *     maxHeight: 300,
 *     className: "bg-white rounded-lg shadow-lg"
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
export default function InputDropdownModal(props: InputDropdownModalPropsTw) {
  const { backdropPress, dropdownPosition, dropdownProps, dropdownRef, modalProps, wrapperRef } = props;

  const handleBackdropPress = () => {
    backdropPress?.();
  };

  return (
    <Modal transparent statusBarTranslucent {...modalProps}>
      <View ref={wrapperRef} className={twStyles.wrapper}>
        <Pressable className={twStyles.backdrop} onPress={handleBackdropPress} />
        <View
          ref={dropdownRef}
          style={{
            position: 'absolute',
            ...dropdownPosition,
          }}
        >
          <InputDropdownTw {...dropdownProps} />
        </View>
      </View>
    </Modal>
  );
}
