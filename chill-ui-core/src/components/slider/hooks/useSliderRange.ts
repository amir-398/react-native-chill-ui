import { useSliderActions } from '../context/SliderContext';

export const useSliderRange = () => {
  const { getMinimumTrackStyle } = useSliderActions();
  const minimumTrackStyle = getMinimumTrackStyle();

  return { minimumTrackStyle };
};
