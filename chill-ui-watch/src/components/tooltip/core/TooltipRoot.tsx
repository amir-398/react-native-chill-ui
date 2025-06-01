import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Dimensions, InteractionManager, Modal, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

import cn from '../../cn';
import { Box } from '../../box';
import { Size, Rect, Point } from './models';
import styleGenerator from './TooltipStyles';
import TooltipChildrenContext from './tooltipChildren.context';
import {
  swapSizeDimmensions,
  makeChildlessRect,
  bottomGeometry,
  leftGeometry,
  topGeometry,
  rightGeometry,
  centerGeometry,
} from './utils/tooltipGeometry';

export { TooltipChildrenContext };

interface DisplayInsets {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

type Orientation = 'portrait' | 'landscape' | 'portrait-upside-down' | 'landscape-left' | 'landscape-right';

/* eslint-disable react/no-unused-prop-types */
interface TooltipProps {
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
  parentWrapperStyle?: ViewStyle;
  allowChildInteraction?: boolean;
  useInteractionManager?: boolean;
  closeOnChildInteraction?: boolean;
  closeOnContentInteraction?: boolean;
  supportedOrientations?: Orientation[];
  closeOnBackgroundInteraction?: boolean;
  displayInsets?: Partial<DisplayInsets>;
  side?: 'top' | 'left' | 'bottom' | 'right' | 'center';
}
/* eslint-enable react/no-unused-prop-types */

interface TooltipState {
  childRect: Rect;
  contentSize: Size;
  anchorPoint: Point;
  tooltipOrigin: Point;
  adjustedContentSize: Size;
  displayInsets: DisplayInsets;
  measurementsFinished: boolean;
  waitingForInteractions: boolean;
  windowDims: { width: number; height: number };
  side: 'top' | 'left' | 'bottom' | 'right' | 'center';
}

const DEFAULT_DISPLAY_INSETS: DisplayInsets = {
  bottom: 24,
  left: 24,
  right: 24,
  top: 24,
};

const computeDisplayInsets = (insetsFromProps: Partial<DisplayInsets>): DisplayInsets => ({
  ...DEFAULT_DISPLAY_INSETS,
  ...insetsFromProps,
});

const invertSide = (
  side: 'top' | 'left' | 'bottom' | 'right' | 'center',
): 'top' | 'left' | 'bottom' | 'right' | 'center' => {
  switch (side) {
    case 'top':
      return 'bottom';
    case 'bottom':
      return 'top';
    case 'right':
      return 'left';
    case 'left':
      return 'right';
    default:
      return side;
  }
};

const isEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) return false;
    if (typeof obj1[key] === 'object' && obj1[key] !== null) {
      return isEqual(obj1[key], obj2[key]);
    }
    return obj1[key] === obj2[key];
  });
};

const defaultProps: Required<TooltipProps> = {
  accessible: true,
  allowChildInteraction: true,
  arrowColor: '',
  arrowSize: new Size(16, 8),
  backgroundColor: '',
  children: null,
  className: '',
  classNameWrapper: '',
  closeOnBackgroundInteraction: true,
  closeOnChildInteraction: true,
  closeOnContentInteraction: true,
  content: <Box />,
  disableShadow: false,
  displayInsets: {},
  horizontalAdjustment: 0,
  isVisible: false,
  modalComponent: Modal,
  onClose: () => {
    // eslint-disable-next-line no-console
    console.warn('[react-native-walkthrough-tooltip] onClose prop not provided');
  },
  parentWrapperStyle: {},
  showChildInTooltip: true,
  side: 'bottom',
  sideOffset: 0,
  supportedOrientations: ['portrait', 'landscape'],
  useInteractionManager: false,
  useReactNativeModal: true,
};

export default function TooltipRoot(props: TooltipProps): React.ReactElement {
  const mergedProps = useMemo(() => ({ ...defaultProps, ...props }), [props]);
  const {
    accessible,
    allowChildInteraction,
    arrowColor,
    arrowSize,
    backgroundColor,
    children,
    className,
    classNameWrapper,
    closeOnBackgroundInteraction,
    closeOnChildInteraction,
    closeOnContentInteraction,
    content,
    disableShadow,
    displayInsets: displayInsetsProp,
    horizontalAdjustment,
    isVisible,
    modalComponent,
    onClose,
    parentWrapperStyle,
    showChildInTooltip,
    side: sideProp,
    sideOffset,
    supportedOrientations,
    useInteractionManager,
    useReactNativeModal,
  } = mergedProps;

  const [state, setState] = useState<TooltipState>({
    adjustedContentSize: new Size(0, 0),
    anchorPoint: new Point(0, 0),
    childRect: new Rect(0, 0, 0, 0),
    contentSize: new Size(0, 0),
    displayInsets: computeDisplayInsets(displayInsetsProp),
    measurementsFinished: false,
    side: React.Children.count(children) === 0 ? invertSide(sideProp) : sideProp,
    tooltipOrigin: new Point(0, 0),
    waitingForInteractions: Boolean(isVisible && useInteractionManager),
    windowDims: Dimensions.get('window'),
  });

  const isMeasuringChild = useRef(false);
  const interactionPromise = useRef<{ cancel: () => void } | null>(null);
  const childWrapper = useRef<View | null>(null);
  const contextValue = { tooltipDuplicate: true };

  const computeGeometry = useCallback(
    (childRect: Rect, contentSize: Size): void => {
      const options = {
        arrowSize: state.side === 'top' || state.side === 'bottom' ? arrowSize : swapSizeDimmensions(arrowSize),
        childRect,
        contentSize,
        displayInsets: state.displayInsets,
        sideOffset,
        windowDims: state.windowDims,
      };

      let geom = topGeometry(options);

      if (state.side === 'center' && React.Children.count(children) === 0) {
        geom = centerGeometry(options);
      } else {
        switch (state.side) {
          case 'bottom':
            geom = bottomGeometry(options);
            break;
          case 'left':
            geom = leftGeometry(options);
            break;
          case 'right':
            geom = rightGeometry(options);
            break;
          case 'top':
          default:
            break;
        }
      }

      const { adjustedContentSize, anchorPoint, tooltipOrigin } = geom;
      setState(prevState => ({
        ...prevState,
        adjustedContentSize,
        anchorPoint,
        measurementsFinished: true,
        tooltipOrigin,
      }));
    },
    [state, arrowSize, sideOffset, children],
  );

  const measureContent = (e: { nativeEvent: { layout: { height: number; width: number } } }): void => {
    const { height, width } = e.nativeEvent.layout;
    const contentSize = new Size(width, height);
    setState(prevState => {
      const newState = { ...prevState, contentSize };
      if (prevState.childRect.width) {
        computeGeometry(prevState.childRect, contentSize);
      }
      return newState;
    });
  };

  const onChildMeasurementComplete = useCallback(
    (rect: Rect): void => {
      setState(prevState => {
        const newState = {
          ...prevState,
          childRect: rect,
          waitingForInteractions: false,
        };
        if (prevState.contentSize.width) {
          computeGeometry(rect, prevState.contentSize);
        }
        return newState;
      });
      isMeasuringChild.current = false;
    },
    [computeGeometry],
  );

  const doChildlessPlacement = useCallback((): void => {
    const { displayInsets, side, windowDims } = state;
    onChildMeasurementComplete(
      makeChildlessRect({
        displayInsets,
        side,
        windowDims,
      }),
    );
  }, [state, onChildMeasurementComplete]);

  const measureChildRect = useCallback((): void => {
    const doMeasurement = (): void => {
      if (!isMeasuringChild.current) {
        isMeasuringChild.current = true;
        if (childWrapper.current && typeof childWrapper.current.measure === 'function') {
          childWrapper.current.measure(
            (_: number, __: number, width: number, height: number, pageX: number, pageY: number) => {
              const childRect = new Rect(pageX, pageY, width, height);
              if (Object.values(childRect).every(value => value !== undefined)) {
                onChildMeasurementComplete(childRect);
              } else {
                doChildlessPlacement();
              }
            },
          );
        } else {
          doChildlessPlacement();
        }
      }
    };

    if (useInteractionManager) {
      if (interactionPromise.current) {
        interactionPromise.current.cancel();
      }
      interactionPromise.current = InteractionManager.runAfterInteractions(() => {
        doMeasurement();
      });
    } else {
      doMeasurement();
    }
  }, [useInteractionManager, doChildlessPlacement, onChildMeasurementComplete]);

  const updateWindowDims = useCallback(
    (dims: { window: { width: number; height: number } }): void => {
      setState(prevState => ({
        ...prevState,
        adjustedContentSize: new Size(0, 0),
        anchorPoint: new Point(0, 0),
        childRect: new Rect(0, 0, 0, 0),
        contentSize: new Size(0, 0),
        measurementsFinished: false,
        tooltipOrigin: new Point(0, 0),
        windowDims: dims.window,
      }));
      setTimeout(() => {
        measureChildRect();
      }, 500);
    },
    [measureChildRect],
  );

  const renderChildInTooltip = (): React.ReactNode => {
    const {
      childRect: { height, width, x, y },
    } = state;

    let adjustedX = x;
    if (horizontalAdjustment) {
      adjustedX += horizontalAdjustment;
    }

    const onTouchEnd = (): void => {
      if (closeOnChildInteraction) {
        onClose?.();
      }
    };

    return (
      <TooltipChildrenContext.Provider value={contextValue}>
        <View
          onTouchEnd={onTouchEnd}
          pointerEvents={allowChildInteraction ? 'box-none' : 'none'}
          style={[
            {
              height,
              left: adjustedX,
              top: y,
              width,
            },
          ]}
          className={cn(classNameWrapper, 'absolute items-center justify-center')}
        >
          {children}
        </View>
      </TooltipChildrenContext.Provider>
    );
  };

  const renderContentForTooltip = (): React.ReactNode => {
    const { adjustedContentSize, anchorPoint, displayInsets, measurementsFinished, side, tooltipOrigin } = state;

    const generatedStyles = styleGenerator({
      adjustedContentSize,
      anchorPoint,
      arrowSize,
      displayInsets,
      measurementsFinished,
      ownProps: {
        arrowStyle: {},
        contentStyle: {},
        disableShadow,
        tooltipStyle: {},
      },
      side,
      sideOffset,
      tooltipOrigin,
    });

    const hasChildren = React.Children.count(children) > 0;

    const onPressBackground = (): void => {
      if (closeOnBackgroundInteraction) {
        onClose?.();
      }
    };

    const onPressContent = (): void => {
      if (closeOnContentInteraction) {
        onClose?.();
      }
    };

    return (
      <TouchableWithoutFeedback onPress={onPressBackground} accessible={accessible}>
        <Box className="z-50 h-screen w-screen bg-black/50">
          <Box style={generatedStyles.tooltipStyle}>
            {hasChildren ? (
              <Box
                style={[
                  generatedStyles.arrowStyle,
                  { ...((backgroundColor || arrowColor) && { borderTopColor: arrowColor || backgroundColor }) },
                ]}
                className="absolute border-b-transparent border-l-transparent border-r-transparent border-t-white"
              />
            ) : null}
            <Box
              className={cn('rounded-md bg-white p-1', className)}
              onLayout={measureContent}
              style={[generatedStyles.contentStyle, { ...(backgroundColor && { backgroundColor }) }]}
            >
              <TouchableWithoutFeedback onPress={onPressContent} accessible={accessible}>
                {content}
              </TouchableWithoutFeedback>
            </Box>
          </Box>

          {hasChildren && showChildInTooltip ? renderChildInTooltip() : null}
        </Box>
      </TouchableWithoutFeedback>
    );
  };

  useEffect(() => {
    const dimensionsSubscription = Dimensions.addEventListener('change', updateWindowDims);
    return () => {
      if (dimensionsSubscription?.remove) {
        dimensionsSubscription.remove();
      } else if (dimensionsSubscription) {
        (Dimensions as any).removeEventListener('change', updateWindowDims);
      }
      if (interactionPromise.current) {
        interactionPromise.current.cancel();
      }
    };
  }, [updateWindowDims]);

  useEffect(() => {
    const { content: prevContent, isVisible: prevIsVisible } = mergedProps;
    const { displayInsets: prevDisplayInsets } = state;

    const contentChanged = !isEqual(prevContent, content);
    const sideChanged = sideProp !== state.side;
    const becameVisible = isVisible && !prevIsVisible;
    const insetsChanged = !isEqual(prevDisplayInsets, computeDisplayInsets(displayInsetsProp));

    if (contentChanged || sideChanged || becameVisible || insetsChanged) {
      setTimeout(() => {
        measureChildRect();
      });
    }
  }, [content, sideProp, isVisible, displayInsetsProp, measureChildRect, mergedProps, state]);

  useEffect(() => {
    const nextPlacement = React.Children.count(children) === 0 ? invertSide(sideProp) : sideProp;
    if (nextPlacement !== state.side) {
      setState(prevState => ({ ...prevState, side: nextPlacement }));
    }

    const nextDisplayInsets = computeDisplayInsets(displayInsetsProp);
    if (!isEqual(nextDisplayInsets, state.displayInsets)) {
      setState(prevState => ({ ...prevState, displayInsets: nextDisplayInsets }));
    }

    if (state.measurementsFinished && !isVisible) {
      setState(prevState => ({
        ...prevState,
        adjustedContentSize: new Size(0, 0),
        measurementsFinished: false,
      }));
    }
  }, [children, sideProp, displayInsetsProp, isVisible, mergedProps, state]);

  const hasChildren = React.Children.count(children) > 0;
  const showTooltip = isVisible && !state.waitingForInteractions;
  const ModalComponent = modalComponent || Modal;

  return (
    <>
      {useReactNativeModal ? (
        <ModalComponent
          transparent
          visible={showTooltip}
          onRequestClose={onClose}
          supportedOrientations={supportedOrientations}
        >
          {renderContentForTooltip()}
        </ModalComponent>
      ) : null}

      {hasChildren ? (
        <View ref={childWrapper} onLayout={measureChildRect} style={parentWrapperStyle}>
          {children}
        </View>
      ) : null}

      {!useReactNativeModal && showTooltip ? renderContentForTooltip() : null}
    </>
  );
}

(TooltipRoot as any).defaultProps = defaultProps;
