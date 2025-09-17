import { Modal, TouchableWithoutFeedback, View } from 'react-native';

import InputDropdown from './InputDropdown';
import { InputDropdownModalProps } from '../../types/dropdown.types';

export default function InputDropdownModal(props: InputDropdownModalProps) {
  const { dropdownPosition, dropdownProps, dropdownRef, modalProps, toggleDropdown, wrapperRef } = props;

  const handleBackdropPress = () => {
    if (dropdownProps?.itemClickableAs === 'none') {
      return;
    }
    toggleDropdown();
  };

  const handleDropdownPress = () => {
    if (dropdownProps?.itemClickableAs === 'none') {
      // nothing to do
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
