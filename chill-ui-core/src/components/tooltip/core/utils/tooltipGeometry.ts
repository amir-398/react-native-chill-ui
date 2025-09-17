import { Size, Rect, Point } from '../models';
import { DisplayInsets, WindowDimensions, GeometryParams } from '../../../../types/tooltip.types';

const swapSizeDimmensions = (size: Size) => new Size(size.height, size.width);

const makeChildlessRect = ({
  displayInsets,
  side,
  windowDims,
}: {
  displayInsets: DisplayInsets;
  side: string;
  windowDims: WindowDimensions;
}) => {
  switch (side) {
    case 'bottom':
      return new Rect(windowDims.width / 2, displayInsets.top, 1, 1);

    case 'right':
      return new Rect(displayInsets.left, windowDims.height / 2, 1, 1);

    case 'left':
      return new Rect(windowDims.width - displayInsets.right, windowDims.height / 2, 1, 1);
    case 'top':
    default:
      return new Rect(windowDims.width / 2, windowDims.height - displayInsets.bottom, 1, 1);
  }
};

const centerGeometry = ({ childRect, contentSize, displayInsets, windowDims }: GeometryParams) => {
  const maxWidth = windowDims.width - (displayInsets.left + displayInsets.right);
  const maxHeight = windowDims.height - (displayInsets.top + displayInsets.bottom);

  const adjustedContentSize = new Size(
    contentSize.width >= maxWidth ? maxWidth : -1,
    contentSize.height >= maxHeight ? maxHeight : -1,
  );

  const tooltipOrigin = new Point(
    adjustedContentSize.width === -1 ? (maxWidth - contentSize.width) / 2 + displayInsets.left : displayInsets.left,
    adjustedContentSize.height === -1 ? (maxHeight - contentSize.height) / 2 + displayInsets.top : displayInsets.top,
  );

  const anchorPoint = new Point(childRect.x + childRect.width / 2.0, childRect.y);

  return {
    adjustedContentSize,
    anchorPoint,
    side: 'center',
    tooltipOrigin,
  };
};

const topGeometry = ({ arrowSize, childRect, contentSize, displayInsets, sideOffset, windowDims }: GeometryParams) => {
  const maxWidth = windowDims.width - (displayInsets.left + displayInsets.right);

  const adjustedContentSize = new Size(Math.min(maxWidth, contentSize.width), contentSize.height);

  const tooltipOrigin = new Point(
    contentSize.width >= maxWidth
      ? displayInsets.left
      : Math.max(displayInsets.left, childRect.x + (childRect.width - adjustedContentSize.width) / 2),
    Math.max(displayInsets.top - sideOffset, childRect.y - contentSize.height - arrowSize.height - sideOffset),
  );

  const anchorPoint = new Point(childRect.x + childRect.width / 2.0, childRect.y - sideOffset);

  // make sure arrow does not extend beyond displayInsets
  if (anchorPoint.x + arrowSize.width > windowDims.width - displayInsets.right) {
    anchorPoint.x = windowDims.width - displayInsets.right - Math.abs(arrowSize.width - arrowSize.height) - 8;
  } else if (anchorPoint.x - arrowSize.width < displayInsets.left) {
    anchorPoint.x = displayInsets.left + Math.abs(arrowSize.width - arrowSize.height) + 8;
  }

  const topPlacementBottomBound = anchorPoint.y - arrowSize.height;

  if (tooltipOrigin.y + contentSize.height > topPlacementBottomBound) {
    adjustedContentSize.height = topPlacementBottomBound - tooltipOrigin.y;
  }

  if (tooltipOrigin.x + contentSize.width > maxWidth) {
    tooltipOrigin.x = windowDims.width - displayInsets.right - adjustedContentSize.width;
  }

  return {
    adjustedContentSize,
    anchorPoint,
    side: 'top',
    tooltipOrigin,
  };
};

const bottomGeometry = ({
  arrowSize,
  childRect,
  contentSize,
  displayInsets,
  sideOffset,
  windowDims,
}: GeometryParams) => {
  const maxWidth = windowDims.width - (displayInsets.left + displayInsets.right);

  const adjustedContentSize = new Size(Math.min(maxWidth, contentSize.width), contentSize.height);

  const tooltipOrigin = new Point(
    contentSize.width >= maxWidth
      ? displayInsets.left
      : Math.max(displayInsets.left, childRect.x + (childRect.width - adjustedContentSize.width) / 2),
    Math.min(
      windowDims.height - displayInsets.bottom + sideOffset,
      childRect.y + childRect.height + arrowSize.height + sideOffset,
    ),
  );
  const anchorPoint = new Point(childRect.x + childRect.width / 2.0, childRect.y + childRect.height + sideOffset);

  // make sure arrow does not extend beyond displayInsets
  if (anchorPoint.x + arrowSize.width > windowDims.width - displayInsets.right) {
    anchorPoint.x = windowDims.width - displayInsets.right - Math.abs(arrowSize.width - arrowSize.height) - 8;
  } else if (anchorPoint.x - arrowSize.width < displayInsets.left) {
    anchorPoint.x = displayInsets.left + Math.abs(arrowSize.width - arrowSize.height) + 8;
  }

  if (tooltipOrigin.y + contentSize.height > windowDims.height - displayInsets.bottom) {
    adjustedContentSize.height = windowDims.height - displayInsets.bottom - tooltipOrigin.y;
  }

  if (tooltipOrigin.x + contentSize.width > maxWidth) {
    tooltipOrigin.x = windowDims.width - displayInsets.right - adjustedContentSize.width;
  }

  return {
    adjustedContentSize,
    anchorPoint,
    side: 'bottom',
    tooltipOrigin,
  };
};

const leftGeometry = ({ arrowSize, childRect, contentSize, displayInsets, sideOffset, windowDims }: GeometryParams) => {
  const maxHeight = windowDims.height - (displayInsets.top + displayInsets.bottom);

  const adjustedContentSize = new Size(contentSize.width, Math.min(maxHeight, contentSize.height));

  const tooltipOrigin = new Point(
    Math.max(displayInsets.left - sideOffset, childRect.x - contentSize.width - arrowSize.width - sideOffset),
    contentSize.height >= maxHeight
      ? displayInsets.top
      : Math.max(displayInsets.top, childRect.y + (childRect.height - adjustedContentSize.height) / 2),
  );

  const anchorPoint = new Point(childRect.x - sideOffset, childRect.y + childRect.height / 2.0);

  // make sure arrow does not extend beyond displayInsets
  if (anchorPoint.y + arrowSize.width > windowDims.height - displayInsets.bottom) {
    anchorPoint.y = windowDims.height - displayInsets.bottom - Math.abs(arrowSize.height - arrowSize.width) - 8;
  } else if (anchorPoint.y - arrowSize.height < displayInsets.top) {
    anchorPoint.y = displayInsets.top + Math.abs(arrowSize.height - arrowSize.width) + 8;
  }

  const leftPlacementRightBound = anchorPoint.x - arrowSize.width;

  if (tooltipOrigin.x + contentSize.width > leftPlacementRightBound) {
    adjustedContentSize.width = leftPlacementRightBound - tooltipOrigin.x;
  }

  if (tooltipOrigin.y + contentSize.height > maxHeight) {
    tooltipOrigin.y = windowDims.height - displayInsets.bottom - adjustedContentSize.height;
  }

  return {
    adjustedContentSize,
    anchorPoint,
    side: 'left',
    tooltipOrigin,
  };
};

const rightGeometry = ({
  arrowSize,
  childRect,
  contentSize,
  displayInsets,
  sideOffset,
  windowDims,
}: GeometryParams) => {
  const maxHeight = windowDims.height - (displayInsets.top + displayInsets.bottom);

  const adjustedContentSize = new Size(contentSize.width, Math.min(maxHeight, contentSize.height));

  const tooltipOrigin = new Point(
    Math.min(
      windowDims.width - displayInsets.right + sideOffset,
      childRect.x + childRect.width + arrowSize.width + sideOffset,
    ),
    contentSize.height >= maxHeight
      ? displayInsets.top
      : Math.max(displayInsets.top, childRect.y + (childRect.height - adjustedContentSize.height) / 2),
  );

  const anchorPoint = new Point(childRect.x + childRect.width + sideOffset, childRect.y + childRect.height / 2.0);

  // make sure arrow does not extend beyond displayInsets
  if (anchorPoint.y + arrowSize.width > windowDims.height - displayInsets.bottom) {
    anchorPoint.y = windowDims.height - displayInsets.bottom - Math.abs(arrowSize.height - arrowSize.width) - 8;
  } else if (anchorPoint.y - arrowSize.height < displayInsets.top) {
    anchorPoint.y = displayInsets.top + Math.abs(arrowSize.height - arrowSize.width) + 8;
  }

  if (tooltipOrigin.x + contentSize.width > windowDims.width - displayInsets.right) {
    adjustedContentSize.width = windowDims.width - displayInsets.right - tooltipOrigin.x;
  }

  if (tooltipOrigin.y + contentSize.height > maxHeight) {
    tooltipOrigin.y = windowDims.height - displayInsets.bottom - adjustedContentSize.height;
  }

  return {
    adjustedContentSize,
    anchorPoint,
    side: 'right',
    tooltipOrigin,
  };
};

export {
  centerGeometry,
  bottomGeometry,
  leftGeometry,
  rightGeometry,
  makeChildlessRect,
  swapSizeDimmensions,
  topGeometry,
};
