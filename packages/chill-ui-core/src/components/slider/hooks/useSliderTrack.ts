import { useEffect } from 'react';

import { useSliderActions } from '../context/SliderContext';

export const useSliderTrack = (clickable: boolean) => {
  const { measureTrack, setTrackClickable } = useSliderActions();

  useEffect(() => {
    setTrackClickable(clickable);
  }, [clickable, setTrackClickable]);

  return { measureTrack };
};
