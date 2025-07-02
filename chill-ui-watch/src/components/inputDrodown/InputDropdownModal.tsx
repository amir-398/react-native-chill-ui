import { Modal, TouchableWithoutFeedback, View } from 'react-native';

import InputDropdown from './InputDropdown';
import { InputDropdownModalProps } from '../../types';

export default function InputDropdownModal(props: InputDropdownModalProps) {
  const { dropdownPosition, dropdownProps, dropdownRef, modalProps, toggleDropdown, wrapperRef } = props;

  return (
    <Modal transparent statusBarTranslucent {...modalProps}>
      <TouchableWithoutFeedback onPress={toggleDropdown}>
        <View className="flex-1" ref={wrapperRef}>
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
      </TouchableWithoutFeedback>
    </Modal>
  );
}
