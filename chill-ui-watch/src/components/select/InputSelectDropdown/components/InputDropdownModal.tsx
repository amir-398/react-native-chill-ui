import { Modal, ModalProps, TouchableWithoutFeedback } from 'react-native';

import { Box } from '../../../box';
import InputDropdown from '../../../inputDrodown';
import { InputDropdownPropsBis } from '../../../../types';

type InputDropdownModalProps = {
  modalProps: ModalProps;
  inputDropdownProps: InputDropdownPropsBis;
  dropdownPosition?: {
    left: number;
    top: number;
    width: number;
  } | null;
  toggleDropdown: () => void;
};

export default function InputDropdownModal(props: InputDropdownModalProps) {
  const { dropdownPosition, inputDropdownProps, modalProps, toggleDropdown } = props;
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
            <InputDropdown {...inputDropdownProps} />
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
