import { Modal, TouchableWithoutFeedback } from 'react-native';

import { Box } from '../box';
import InputDropdown from './InputDropdown';
import { InputDropdownModalProps } from '../../types';

export default function InputDropdownModal(props: InputDropdownModalProps) {
  const { dropdownPosition, dropdownProps, modalProps, toggleDropdown } = props;
  if (!dropdownPosition) return null;

  return (
    <Modal transparent statusBarTranslucent {...modalProps}>
      <TouchableWithoutFeedback onPress={toggleDropdown}>
        <Box className="flex-1">
          <Box
            style={{
              position: 'absolute',
              ...dropdownPosition,
            }}
          >
            <InputDropdown {...dropdownProps} />
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
