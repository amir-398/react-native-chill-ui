import type { ImageSource } from '$utils/types';

import { FormDropdownDataSetProps } from '$components/Kiwii/forms/FormDropdown';

export interface IFormAutoCompleteRef {
  open: () => void;
  blur: () => void;
  close: () => void;
  focus: () => void;
}

export interface IFormAutoCompleteProps {
  value: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSet: any[];
  disabled?: boolean;
  isLoading: boolean;
  onBlur?: () => void;
  instanceId?: string;
  isRequired?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  highlightValue?: string;
  highlightTerm?: boolean;
  emptyResultText?: string;
  footer?: React.ReactNode;
  primaryContentKey: string;
  secondaryContentKey?: string;
  suggestionsListMaxHeight?: number;
  setValue: (value: string) => void;
  position?: 'auto' | 'top' | 'bottom';
  onChangeText?: (text: string) => void;
  listFooterComponent?: React.ReactNode;
  onSelectItem?: (item: FormDropdownDataSetProps) => void;
  dropdownRenderItem?: (item: object) => React.ReactElement;
  error?: {
    value: string;
    type: 'danger' | 'information';
  };
  helpInfo?: {
    ID: string;
    onPress: () => void;
    title: string;
    description: string;
    image: ImageSource;
  };
}
