import { isNativeWindInstalled } from './nativewindDetector';

const classNameNotSupportedErrorMessage = (componentName: string) =>
  `className is not supported in ${componentName} component when NativeWind is not installed`;

const classNamePropsDetector = (props: any) => Object.keys(props).some(key => key === 'className');

const classNamePropsHandler = (props: any, componentName: string) => {
  if (__DEV__ && classNamePropsDetector(props) && !isNativeWindInstalled()) {
    console.error(classNameNotSupportedErrorMessage(componentName));
  }
};

export { classNameNotSupportedErrorMessage, classNamePropsDetector, classNamePropsHandler };
