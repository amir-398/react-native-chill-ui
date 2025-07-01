import type { Modal, TextProps } from 'react-native';

import type { StringProps } from './string.types';
import type { Size, DisplayInsets, Side, Orientation } from './common.types';

export interface TooltipRootProps {
  side?: Side;
  arrowSize?: Size;
  className?: string;
  arrowColor?: string;
  isVisible?: boolean;
  sideOffset?: number;
  onClose?: () => void;
  accessible?: boolean;
  disableShadow?: boolean;
  backgroundColor?: string;
  content?: React.ReactNode;
  classNameWrapper?: string;
  children?: React.ReactNode;
  showChildInTooltip?: boolean;
  horizontalAdjustment?: number;
  useReactNativeModal?: boolean;
  modalComponent?: typeof Modal;
  allowChildInteraction?: boolean;
  useInteractionManager?: boolean;
  closeOnChildInteraction?: boolean;
  closeOnContentInteraction?: boolean;
  supportedOrientations?: Orientation[];
  closeOnBackgroundInteraction?: boolean;
  displayInsets?: Partial<DisplayInsets>;
  overlayColor?: TextProps['selectionColor'];
}

export interface TooltipProps
  extends Omit<
    TooltipRootProps,
    'isVisible' | 'onClose' | 'closeOnChildInteraction' | 'closeOnContentInteraction' | 'closeOnBackgroundInteraction'
  > {
  title: string;
  textColor?: string;
  textSize?: StringProps['size'];
}
