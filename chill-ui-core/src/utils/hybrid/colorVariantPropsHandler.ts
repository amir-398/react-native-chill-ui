import { propsDetector } from './propsDetector';
import { isNativeWindInstalled } from './nativewindDetector';

const colorVariantPropsHandler = (props: any, componentName: string) => {
  if (__DEV__ && !isNativeWindInstalled() && propsDetector(props, 'colorVariant')) {
    console.error(
      `ColorVariants props in ${componentName} are only available with NativeWind. Falling back to primary variant.`,
    );
  }
};

export { colorVariantPropsHandler };
