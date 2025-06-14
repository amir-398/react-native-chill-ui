import { useLayoutEffect, useState } from 'react';
import { MeasuredDimensions } from 'react-native-screens';

import cn from '../cn';
import { Box } from '../box';
import { OverlayProps } from '../utils/types';
import { Dialog, DialogContent } from '../dialog';

export default function Overlay({
  children,
  position = 'bottom center',
  setVisible,
  triggerRef,
  visible,
}: OverlayProps) {
  const [viewPosition, setViewPosition] = useState<{
    top?: number;
    left?: number;
    width?: number;
    bottom?: number;
  }>({});

  const getPosition = (measureValues: MeasuredDimensions) => {
    const { height, width, x, y } = measureValues;
    switch (position) {
      case 'bottom center':
        return {
          left: x,
          top: y + height,
        };
      case 'bottom left':
        return {
          left: x - width,
          top: y + height,
        };
      case 'bottom right':
        return {
          left: x + width,
          top: y + height,
        };
      case 'top center':
        return {
          bottom: y + height - 15,
          left: x,
        };
      case 'top left':
        return {
          bottom: y + height - 15,
          left: x - width,
        };
      case 'top right':
        return {
          bottom: y + height - 15,
          left: x + width,
        };
      case 'left center':
        return {
          left: x - width * 2,
          top: y + height / 2,
        };
      case 'left top':
        return {
          bottom: y + height - 15,
          left: x - width,
        };
      case 'left bottom':
        return {
          left: x - width,
          top: y + height,
        };
      case 'right center':
        return {
          left: x + width,
          top: y + height / 2,
        };
      case 'right top':
        return {
          bottom: y + height - 15,
          left: x + width,
        };
      case 'right bottom':
        return {
          left: x + width,
          top: y + height,
        };
      default:
        return {
          left: x,
          top: y,
        };
    }
  };

  useLayoutEffect(() => {
    if (triggerRef?.current) {
      triggerRef.current.measureInWindow(
        (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
          const measureValues = { height, pageX, pageY, width, x, y };

          setViewPosition(getPosition(measureValues));
        },
      );
    }
  }, [triggerRef?.current]);

  return (
    <Dialog>
      <DialogContent container={false} visible={visible} setVisible={() => setVisible(!visible)} overlay={true}>
        <Box
          style={{
            position: 'absolute',
            ...viewPosition,
          }}
          className={cn({
            // 'transform -translate-x-1/2': true,
            '-translate-y-1/2 transform': position === 'left center' || position === 'right center',
          })}
        >
          {children}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
