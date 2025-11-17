import { InputDropdownModalPropsSs } from '@types';
import { Modal, Pressable, View } from 'react-native';

import InputDropdownSs from './InputDropdown.ss';
import { styles } from '../styles/InputDropdownModal.ss.styles';

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
export default function InputDropdownModal(props: InputDropdownModalPropsSs) {
  const { backdropPress, dropdownPosition, dropdownProps, dropdownRef, modalProps, wrapperRef } = props;

  const handleBackdropPress = () => {
    backdropPress?.();
  };

  return (
    <Modal transparent statusBarTranslucent {...modalProps}>
      <View style={styles.wrapper} ref={wrapperRef}>
        <Pressable style={styles.backdrop} onPress={handleBackdropPress} />
        <View
          ref={dropdownRef}
          style={{
            position: 'absolute',
            ...dropdownPosition,
          }}
        >
          <InputDropdownSs {...dropdownProps} />
        </View>
      </View>
    </Modal>
  );
}
