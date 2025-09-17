import type { Modal, TextProps } from 'react-native';

import type { StringProps } from './string/string.ss.types';
import type { Size, Side, Orientation } from './common.types';

export type WindowDimensions = {
  width: number;
  height: number;
};

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DisplayInsets = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type GeometryParams = {
  arrowSize: Size;
  childRect: Rect;
  contentSize: Size;
  displayInsets: DisplayInsets;
  sideOffset: number;
  windowDims: WindowDimensions;
};

/**
 * Props for the TooltipRoot component
 */
export interface TooltipRootProps {
  /** Side where the tooltip appears */
  side?: Side;
  /** Size of the arrow */
  arrowSize?: Size;
  /** Custom CSS classes for the tooltip */
  className?: string;
  /** Color of the arrow */
  arrowColor?: string;
  /** Whether the tooltip is visible */
  isVisible?: boolean;
  /** Offset from the side */
  sideOffset?: number;
  /** Callback when tooltip closes */
  onClose?: () => void;
  /** Whether the tooltip is accessible */
  accessible?: boolean;
  /** Whether to disable shadow */
  disableShadow?: boolean;
  /** Background color of the tooltip */
  backgroundColor?: string;
  /** Custom content for the tooltip */
  content?: React.ReactNode;
  /** Custom CSS classes for the wrapper */
  classNameWrapper?: string;
  /** Child component that triggers the tooltip */
  children?: React.ReactNode;
  /** Whether to show child in tooltip */
  showChildInTooltip?: boolean;
  /** Horizontal adjustment for positioning */
  horizontalAdjustment?: number;
  /** Whether to use React Native Modal */
  useReactNativeModal?: boolean;
  /** Custom modal component */
  modalComponent?: typeof Modal;
  /** Whether to allow child interaction */
  allowChildInteraction?: boolean;
  /** Whether to use interaction manager */
  useInteractionManager?: boolean;
  /** Whether to close on child interaction */
  closeOnChildInteraction?: boolean;
  /** Whether to close on content interaction */
  closeOnContentInteraction?: boolean;
  /** Supported orientations */
  supportedOrientations?: Orientation[];
  /** Whether to close on background interaction */
  closeOnBackgroundInteraction?: boolean;
  /** Display insets configuration */
  displayInsets?: Partial<DisplayInsets>;
  /** Overlay color */
  overlayColor?: TextProps['selectionColor'];
}

/**
 * Props for the Tooltip component
 */
export interface TooltipProps
  extends Omit<
    TooltipRootProps,
    'isVisible' | 'onClose' | 'closeOnChildInteraction' | 'closeOnContentInteraction' | 'closeOnBackgroundInteraction'
  > {
  /** Title text for the tooltip */
  title: string;
  /** Color of the text */
  textColor?: string;
  /** Size of the text */
  textSize?: StringProps['size'];
}
