import { Modal, ModalProps, TouchableWithoutFeedback } from 'react-native';

import { Box } from '../box';
import InputDropdown from './InputDropdown';
import { InputDropdownProps } from '../../types';

type InputDropdownModalProps = {
  modalProps: ModalProps;
  dropdownProps: InputDropdownProps;
  dropdownPosition?: {
    left: number;
    top: number;
    width: number;
  } | null;
  toggleDropdown: () => void;
};

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
