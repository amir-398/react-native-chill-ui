import { isNativeWindInstalled } from './nativewindDetector';

const HAS_NATIVEWIND = isNativeWindInstalled();

const classNameNotSupportedErrorMessage = (componentName: string) =>
  `className is not supported in ${componentName} component when NativeWind is not installed`;

const classNamePropsDetector = (props: any) =>
  Object.keys(props).some(key => key === 'className' || key.toLowerCase().includes('classname'));

const classNamePropsHandler = (props: any, componentName: string) => {
  if (!__DEV__) return;
  if (classNamePropsDetector(props) && !HAS_NATIVEWIND) {
    console.error(classNameNotSupportedErrorMessage(componentName));
  }
};

export { classNameNotSupportedErrorMessage, classNamePropsDetector, classNamePropsHandler };
