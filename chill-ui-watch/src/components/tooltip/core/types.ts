import { StyleProp, ViewStyle } from 'react-native';

import Rect from './models/Rect';
import Size from './models/Size';
import Point from './models/Point';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export type TooltipAnimation = 'fadeIn' | 'scaleIn' | 'slideIn';

export interface TooltipRootProps {
  open?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
}

export interface TooltipTriggerProps {
  children: React.ReactNode;
}

export interface TooltipContentProps {
  side?: TooltipSide;
  onTap?: () => void;
  sideOffset?: number;
  borderRadius?: number;
  dismissDuration?: number;
  backgroundColor?: string;
  children: React.ReactNode;
  disableTapToDismiss?: boolean;
  presetAnimation?: TooltipAnimation;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface TooltipTextProps {
  text: string;
  style?: StyleProp<ViewStyle>;
}

export type Placement = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface DisplayInsets {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface WindowDimensions {
  width: number;
  height: number;
}

export interface GeometryParams {
  arrowSize: Size;
  childRect: Rect;
  contentSize: Size;
  sideOffset: number;
  displayInsets: DisplayInsets;
  windowDims: WindowDimensions;
}

export interface StyleParams {
  arrowSize: Size;
  anchorPoint?: Point;
  placement: Placement;
  tooltipOrigin: Point;
}

export interface TooltipProps {
  isVisible?: boolean;
  accessible?: boolean;
  onClose?: () => void;
  placement?: Placement;
  topAdjustment?: number;
  parentWrapperStyle?: any;
  content?: React.ReactNode;
  children?: React.ReactNode;
  childrenWrapperStyle?: any;
  childContentSpacing?: number;
  showChildInTooltip?: boolean;
  displayInsets?: DisplayInsets;
  horizontalAdjustment?: number;
  useReactNativeModal?: boolean;
  allowChildInteraction?: boolean;
  useInteractionManager?: boolean;
  supportedOrientations?: string[];
  closeOnChildInteraction?: boolean;
  closeOnContentInteraction?: boolean;
  closeOnBackgroundInteraction?: boolean;
  modalComponent?: React.ComponentType<any>;
  arrowSize?: { width: number; height: number };
}

export interface TooltipState {
  placement: Placement;
  displayInsets: DisplayInsets;
  measurementsFinished: boolean;
  waitingForInteractions: boolean;
  anchorPoint: { x: number; y: number };
  tooltipOrigin: { x: number; y: number };
  windowDims: { width: number; height: number };
  contentSize: { width: number; height: number };
  adjustedContentSize: { width: number; height: number };
  childRect: { x: number; y: number; width: number; height: number };
}
