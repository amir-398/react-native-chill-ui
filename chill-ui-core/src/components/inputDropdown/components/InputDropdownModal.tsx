import { classNamePropsHandler } from '@utils';
import { InputDropdownModalProps } from '@types';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';

import InputDropdown from './InputDropdown';

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
 * @param toggleDropdown - Function to toggle the dropdown visibility
 * @param modalProps - Props to pass to the React Native Modal component
 * @param dropdownRef - Ref for the dropdown container element
 * @param wrapperRef - Ref for the modal wrapper element
 * @returns Modal-wrapped dropdown component with backdrop and positioning
 */
export default function InputDropdownModal(props: InputDropdownModalProps) {
  classNamePropsHandler(props, 'InputDropdownModal');
  const { dropdownPosition, dropdownProps, dropdownRef, modalProps, toggleDropdown, wrapperRef } = props;

  const handleBackdropPress = () => {
    if (dropdownProps?.itemClickableAs === 'none') {
      return;
    }
    toggleDropdown();
  };

  const handleDropdownPress = () => {
    if (dropdownProps?.itemClickableAs === 'none') {
      //
    }
  };

  return (
    <Modal transparent statusBarTranslucent {...modalProps}>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={{ flex: 1 }} ref={wrapperRef}>
          <TouchableWithoutFeedback onPress={handleDropdownPress}>
            <View
              ref={dropdownRef}
              style={{
                position: 'absolute',
                ...dropdownPosition,
              }}
            >
              <InputDropdown {...dropdownProps} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
