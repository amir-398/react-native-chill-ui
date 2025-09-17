/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

const isOrientationPortrait = ({ height, width }: ScaledSize) => height >= width;
const isOrientationLandscape = ({ height, width }: ScaledSize) => width >= height;

export default function useDeviceOrientation() {
  const screen = Dimensions.get('screen');
  const initialState = {
    landscape: isOrientationLandscape(screen),
    portrait: isOrientationPortrait(screen),
  };

  const [orientation, setOrientation] = useState(initialState);

  useEffect(() => {
    const onChange = ({ screen: newScreen }: { screen: ScaledSize }) => {
      setOrientation({
        landscape: isOrientationLandscape(newScreen),
        portrait: isOrientationPortrait(newScreen),
      });
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      if (typeof subscription?.remove === 'function') {
        subscription.remove();
      }
    };
  }, []);

  return orientation.portrait ? 'PORTRAIT' : 'LANDSCAPE';
}
