import { Platform, PixelRatio, Dimensions } from 'react-native';

import useDeviceOrientation from './useDeviceOrientation';

export interface IUseDetectDevice {
  isIOS: boolean;
  isTablet: boolean;
  isAndroid: boolean;
}

const { height, width } = Dimensions.get('window');

const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  }
  return pixelDensity === 2 && (adjustedWidth >= 1824 || adjustedHeight >= 1824);
};

const useDetectDevice: IUseDetectDevice = {
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
  isTablet: isTablet(),
};

export { useDetectDevice, useDeviceOrientation };
export * from './dropdownHelpers';
