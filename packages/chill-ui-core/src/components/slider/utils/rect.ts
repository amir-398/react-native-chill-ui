const Rect = ({ height, width, x, y }: { height: number; width: number; x: number; y: number }) => ({
  containsPoint: (nativeX: number, nativeY: number) =>
    nativeX >= x && nativeY >= y && nativeX <= x + width && nativeY <= y + height,
  height,
  trackDistanceToPoint: (nativeX: number) => {
    if (nativeX < x) {
      return x - nativeX;
    }
    if (nativeX > x + width) {
      return nativeX - (x + width);
    }
    return 0;
  },
  width,
  x,
  y,
});

export default Rect;
