import { useState, useCallback } from 'react';
import { ToastPositionPropsTw, ToastVariantPropsTw } from '@types';

export const useToastState = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [customRender, setCustomRender] = useState<React.ReactNode>(null);
  const [variant, setVariant] = useState<ToastVariantPropsTw>('success');
  const [toastPosition, setToastPosition] = useState<ToastPositionPropsTw>('bottom');

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
      variantType: ToastVariantPropsTw,
      position: ToastPositionPropsTw,
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
