import { useCallback, useState, useRef } from 'react';

const useSliderMeasurements = () => {
  const [allMeasured, setAllMeasured] = useState(false);
  const [containerSize, setContainerSize] = useState({ height: 0, width: 0 });
  const [thumbSize, setThumbSize] = useState({ height: 0, width: 0 });

  const containerMeasuredRef = useRef(false);
  const thumbMeasuredRef = useRef(false);

  const measureContainer = useCallback((e: any) => {
    const { height, width } = e.nativeEvent.layout;
    setContainerSize(prevSize => {
      if (prevSize.width === width && prevSize.height === height) {
        return prevSize;
      }
      containerMeasuredRef.current = width > 0 && height > 0;
      if (thumbMeasuredRef.current) {
        setAllMeasured(true);
      }
      return { height, width };
    });
  }, []);

  const measureThumb = useCallback((e: any) => {
    const { height, width } = e.nativeEvent.layout;
    setThumbSize(prevSize => {
      if (prevSize.width === width && prevSize.height === height) {
        return prevSize;
      }
      thumbMeasuredRef.current = width > 0 && height > 0;
      if (containerMeasuredRef.current) {
        setAllMeasured(true);
      }
      return { height, width };
    });
  }, []);

  // Cette mesure n'est pas critique pour le rendu,
  // elle n'a donc pas besoin de déclencher de mise à jour d'état.
  const measureTrack = useCallback((_e: any) => {}, []);

  return {
    allMeasured,
    containerSize,
    measureContainer,
    measureThumb,
    measureTrack,
    thumbSize,
  };
};

export default useSliderMeasurements;
