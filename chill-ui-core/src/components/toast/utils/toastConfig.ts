import { ToastVariantTypePropsTw } from '@/types';

export const variantConfig: ToastVariantTypePropsTw = {
  error: {
    backgroundColor: '#F44336',
    contentColor: '#FFFFFF',
    icon: 'xmark-circle-solid',
    progressBarColor: '#FFFFFF',
    titleColor: '#FFFFFF',
  },
  info: {
    backgroundColor: '#2196F3',
    contentColor: '#FFFFFF',
    icon: 'circle-info-solid',
    progressBarColor: '#FFFFFF',
    titleColor: '#FFFFFF',
  },
  success: {
    backgroundColor: '#4CAF50',
    contentColor: '#FFFFFF',
    icon: 'check-circle-solid',
    progressBarColor: '#FFFFFF',
    titleColor: '#FFFFFF',
  },
  warning: {
    backgroundColor: '#FF9800',
    contentColor: '#FFFFFF',
    icon: 'warning-solid',
    progressBarColor: '#FFFFFF',
    titleColor: '#FFFFFF',
  },
};

export const variantTitles: Record<keyof ToastVariantTypePropsTw, string> = {
  error: 'Erreur !',
  info: 'Information !',
  success: 'Succès !',
  warning: 'Attention !',
};

export const PROGRESS_BAR_HEIGHT = 4;
