import { ToastVariantTypePropsSs } from '@types';

export const variantConfig: ToastVariantTypePropsSs = {
  error: {
    iconProps: { color: '#FFFFFF', name: 'xmark-circle-solid' },
    messageStringProps: { color: '#FFFFFF', size: 'sm' },
    progressBarColor: '#FFFFFF',
    style: { backgroundColor: '#F44336' },
    titleStringProps: { color: '#FFFFFF', variant: 'body-2' },
  },
  info: {
    iconProps: { color: '#FFFFFF', name: 'circle-info-solid' },
    messageStringProps: { color: '#FFFFFF', size: 'sm' },
    progressBarColor: '#FFFFFF',
    style: { backgroundColor: '#2196F3' },
    titleStringProps: { color: '#FFFFFF', variant: 'body-2' },
  },
  success: {
    iconProps: { color: '#FFFFFF', name: 'check-circle-solid' },
    messageStringProps: { color: '#FFFFFF', size: 'sm' },
    progressBarColor: '#FFFFFF',
    style: { backgroundColor: '#4CAF50' },
    titleStringProps: { color: '#FFFFFF' },
  },
  warning: {
    iconProps: { color: '#FFFFFF', name: 'warning-solid' },
    messageStringProps: { color: '#FFFFFF', size: 'sm' },
    progressBarColor: '#FFFFFF',
    style: { backgroundColor: '#FF9800' },
    titleStringProps: { color: '#FFFFFF', variant: 'body-2' },
  },
};

export const variantTitles: Record<keyof ToastVariantTypePropsSs, string> = {
  error: 'Erreur !',
  info: 'Information !',
  success: 'Succès !',
  warning: 'Attention !',
};

export const PROGRESS_BAR_HEIGHT = 4;
