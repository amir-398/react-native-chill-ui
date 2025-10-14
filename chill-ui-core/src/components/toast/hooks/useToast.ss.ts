import { useCallback, useMemo } from 'react';
import { ToastVariantPropsSs, ToastPositionPropsSs } from '@types';

import { useToastState } from './useToastState.tw';
import { useToastAnimation } from './useToastAnimation';
import { variantTitles, variantConfig } from '../utils/toastConfig.tw';

export const useToast = (variants: any) => {
  const {
    customRender,
    hideToast: hideToastState,
    isVisible,
    message,
    resetState,
    showToast: showToastState,
    title,
    toastPosition,
    updateToastData,
    variant,
  } = useToastState();

  const {
    hideToast: hideToastAnimation,
    opacityAnim,
    progressWidthAnim,
    scaleAnim,
    showToast: showToastAnimation,
    translateYAnim,
  } = useToastAnimation();

  const getConfig = useCallback(
    (variantType: ToastVariantPropsSs) => {
      const defaultConfig = variantConfig[variantType];
      const customConfig = variants[variantType];

      if (!customConfig) {
        return defaultConfig;
      }

      if (!defaultConfig) {
        return customConfig;
      }
      return {
        ...defaultConfig,
        ...customConfig,
        iconProps: {
          ...defaultConfig.iconProps,
          ...customConfig.iconProps,
        },
        messageStringProps: {
          ...defaultConfig.messageStringProps,
          ...customConfig.messageStringProps,
        },
        titleStringProps: {
          ...defaultConfig.titleStringProps,
          ...customConfig.titleStringProps,
        },
      };
    },
    [variants],
  );

  const showToast = useCallback(
    (
      msg: string,
      toastTitle?: string,
      render?: React.ReactNode,
      variantType: ToastVariantPropsSs = 'info',
      position: ToastPositionPropsSs = 'bottom',
      duration: number = 3000,
    ) => {
      resetState();

      updateToastData(msg, variantType, position, toastTitle || variantTitles[variantType], render);

      setTimeout(() => {
        showToastState();
        showToastAnimation(position, duration).then(() => {
          hideToastAnimation(position).then(() => {
            hideToastState();
          });
        });
      }, 0);
    },
    [resetState, updateToastData, showToastState, showToastAnimation, hideToastAnimation, hideToastState],
  );

  const config = useMemo(() => getConfig(variant), [variant, getConfig]);

  return {
    config,
    customRender,
    isVisible,
    message,
    opacityAnim,
    progressWidthAnim,
    scaleAnim,
    showToast,
    title,
    toastPosition,
    translateYAnim,
    variant,
  };
};
