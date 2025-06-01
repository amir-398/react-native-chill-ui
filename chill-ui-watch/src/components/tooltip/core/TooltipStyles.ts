import { StyleSheet } from 'react-native';

import { Point, Size } from './models';

interface StyleGeneratorProps {
  arrowSize: Size;
  anchorPoint: Point;
  sideOffset?: number;
  tooltipOrigin: Point;
  adjustedContentSize: Size;
  measurementsFinished: boolean;
  side: 'top' | 'bottom' | 'left' | 'right' | 'center';
  displayInsets: { top: number; bottom: number; left: number; right: number };
  ownProps: {
    contentStyle?: any;
    arrowStyle?: any;
    tooltipStyle?: any;
    disableShadow?: boolean;
  };
}

const styles = StyleSheet.create({
  arrow: {
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    position: 'absolute',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0,
    zIndex: 500,
  },
  containerVisible: {
    opacity: 1,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
    padding: 8,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  tooltip: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
});

const arrowRotationForPlacement = (side: 'top' | 'bottom' | 'left' | 'right' | 'center'): string => {
  switch (side) {
    case 'bottom':
      return '180deg';
    case 'left':
      return '-90deg';
    case 'right':
      return '90deg';
    default:
      return '0deg';
  }
};

const arrowPlacementStyles = ({
  anchorPoint,
  arrowSize,
  side,
  tooltipOrigin,
}: {
  anchorPoint: Point;
  arrowSize: Size;
  side: 'top' | 'bottom' | 'left' | 'right' | 'center';
  tooltipOrigin: Point;
}) => {
  // Create the arrow from a rectangle with the appropriate borderXWidth set
  // A rotation is then applied dependending on the placement
  // Also make it slightly bigger
  // to fix a visual artifact when the tooltip is animated with a scale
  const width = arrowSize.width + 2;
  const height = arrowSize.height * 2 + 2;
  let marginTop = 0;
  let marginLeft = 0;

  if (side === 'bottom') {
    marginTop = arrowSize.height;
  } else if (side === 'right') {
    marginLeft = arrowSize.height;
  }

  return {
    borderBottomWidth: height / 2,
    borderLeftWidth: width / 2,
    borderRightWidth: width / 2,
    borderTopWidth: height / 2,
    height,
    left: anchorPoint.x - tooltipOrigin.x - (width / 2 - marginLeft),
    top: anchorPoint.y - tooltipOrigin.y - (height / 2 - marginTop),
    width,
  };
};

const getArrowRotation = (arrowStyle: any, side: 'top' | 'bottom' | 'left' | 'right' | 'center') => {
  // prevent rotation getting incorrectly overwritten
  const arrowRotation = arrowRotationForPlacement(side);
  const transform = (StyleSheet.flatten(arrowStyle).transform || []).slice(0);
  transform.unshift({ rotate: arrowRotation });

  return { transform };
};

const tooltipPlacementStyles = ({
  arrowSize,
  side,
  tooltipOrigin,
}: {
  arrowSize: Size;
  side: 'top' | 'bottom' | 'left' | 'right' | 'center';
  tooltipOrigin: Point;
}) => {
  const { height } = arrowSize;

  switch (side) {
    case 'bottom':
      return {
        left: tooltipOrigin.x,
        paddingTop: height,
        top: tooltipOrigin.y - height,
      };
    case 'top':
      return {
        left: tooltipOrigin.x,
        paddingBottom: height,
        top: tooltipOrigin.y,
      };
    case 'right':
      return {
        left: tooltipOrigin.x - height,
        paddingLeft: height,
        top: tooltipOrigin.y,
      };
    case 'left':
      return {
        left: tooltipOrigin.x,
        paddingRight: height,
        top: tooltipOrigin.y,
      };
    case 'center':
    default:
      return {
        left: tooltipOrigin.x,
        top: tooltipOrigin.y,
      };
  }
};

const styleGenerator = (styleGeneratorProps: StyleGeneratorProps) => {
  const { adjustedContentSize, displayInsets, ownProps, side, sideOffset } = styleGeneratorProps;

  const { height, width } = adjustedContentSize;

  const contentStyle = [height > 0 && { height }, width > 0 && { width }, ownProps.contentStyle];

  const arrowStyle = [arrowPlacementStyles(styleGeneratorProps), ownProps.arrowStyle];

  return {
    arrowStyle: [...arrowStyle, getArrowRotation(arrowStyle, side)],
    backgroundStyle: [
      {
        paddingBottom: displayInsets.bottom,
        paddingLeft: displayInsets.left,
        paddingRight: displayInsets.right,
        paddingTop: displayInsets.top,
      },
    ],
    contentStyle,
    SideOffsetStyle: [
      sideOffset !== 0 && {
        top: sideOffset,
      },
    ],
    tooltipStyle: [
      StyleSheet.compose(styles.tooltip, ownProps.disableShadow ? {} : styles.shadow),
      tooltipPlacementStyles(styleGeneratorProps),
      ownProps.tooltipStyle,
    ],
  };
};

export default styleGenerator;
