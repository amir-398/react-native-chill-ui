import { useState, useCallback } from 'react';
import { ToastPositionPropsSs, ToastVariantPropsSs } from '@types';

export const useToastState = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [customRender, setCustomRender] = useState<React.ReactNode>(null);
  const [variant, setVariant] = useState<ToastVariantPropsSs>('success');
  const [toastPosition, setToastPosition] = useState<ToastPositionPropsSs>('bottom');

  const resetState = useCallback(() => {
    setIsVisible(false);
    setMessage('');
    setTitle('');
    setCustomRender(null);
    setVariant('success');
    setToastPosition('bottom');
  }, []);

  const updateToastData = useCallback(
    (
      msg: string,
      variantType: ToastVariantPropsSs,
      position: ToastPositionPropsSs,
      toastTitle?: string,
      render?: React.ReactNode,
    ) => {
      setMessage(msg);
      setTitle(toastTitle || '');
      setCustomRender(render || null);
      setVariant(variantType);
      setToastPosition(position);
    },
    [],
  );

  const showToast = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    customRender,
    hideToast,
    isVisible,
    message,
    resetState,
    showToast,
    title,
    toastPosition,
    updateToastData,
    variant,
  };
};
