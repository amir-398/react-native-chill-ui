import { useCallback, useState } from 'react';

const useSliderMeasurements = () => {
  const [allMeasured, setAllMeasured] = useState(false);
  const [containerSize, setContainerSize] = useState({ height: 0, width: 0 });
  const [thumbSize, setThumbSize] = useState({ height: 0, width: 0 });

  const containerSizeRef = { current: { height: 0, width: 0 } };
  const thumbSizeRef = { current: { height: 0, width: 0 } };
  const trackSizeRef = { current: { height: 0, width: 0 } };

  const handleMeasure = useCallback((name: string, e: any) => {
    const { height, width } = e.nativeEvent.layout;
    const size = { height, width };

    if (name === '_containerSize') {
      const currentSize = containerSizeRef.current;
      if (currentSize && width === currentSize.width && height === currentSize.height) {
        return;
      }
      containerSizeRef.current = size;
      setContainerSize(size);
    } else if (name === '_thumbSize') {
      const currentSize = thumbSizeRef.current;
      if (currentSize && width === currentSize.width && height === currentSize.height) {
        return;
      }
      thumbSizeRef.current = size;
      setThumbSize(size);
    } else if (name === '_trackSize') {
      trackSizeRef.current = size;
    }

    if (containerSizeRef.current.width > 0 && thumbSizeRef.current.width > 0) {
      setAllMeasured(true);
    }
    // eslint-disable-next-line
  }, []);

  const measureContainer = useCallback((e: any) => handleMeasure('_containerSize', e), [handleMeasure]);
  const measureTrack = useCallback((e: any) => handleMeasure('_trackSize', e), [handleMeasure]);
  const measureThumb = useCallback((e: any) => handleMeasure('_thumbSize', e), [handleMeasure]);

  return {
    allMeasured,
    containerSize,
    containerSizeRef,
    measureContainer,
    measureThumb,
    measureTrack,
    thumbSize,
    thumbSizeRef,
    trackSizeRef,
  };
};

export default useSliderMeasurements;
