import { useCallback, useMemo } from 'react';
import { ToastVariantPropsTw, ToastPositionPropsTw } from '@types';

import { useToastState } from './useToastState';
import { variantTitles } from '../utils/toastConfig';
import { useToastAnimation } from './useToastAnimation';

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

  const getConfig = useCallback((variantType: ToastVariantPropsTw) => variants[variantType], [variants]);

  const showToast = useCallback(
    (
      msg: string,
      toastTitle?: string,
      render?: React.ReactNode,
      variantType: ToastVariantPropsTw = 'info',
      position: ToastPositionPropsTw = 'bottom',
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
