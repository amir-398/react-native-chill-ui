import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

import { TIcons } from '../constants/ICONS';

export interface DropdownMenuItem {
  id: string;
  label: string;
  disabled?: boolean;
  icon?: keyof TIcons;
  onPress?: () => void;
  customRender?: () => ReactNode;
}

export interface DropdownMenuProps {
  /**
   * Le contenu qui déclenchera l'ouverture du menu (ex: icon, bouton)
   */
  children: ReactNode;

  /**
   * Les éléments du menu
   */
  items: DropdownMenuItem[];

  /**
   * Position du dropdown par rapport au trigger
   */
  dropdownPosition?: 'top' | 'bottom' | 'auto';

  /**
   * Position horizontale du dropdown par rapport au trigger
   */
  horizontalPosition?: 'left' | 'right' | 'auto';

  /**
   * Décalage horizontal
   */
  offsetX?: number;

  /**
   * Décalage vertical
   */
  offsetY?: number;

  /**
   * Largeur du dropdown
   */
  width?: number;

  /**
   * Hauteur maximale du dropdown
   */
  maxHeight?: number;

  /**
   * Hauteur minimale du dropdown
   */
  minHeight?: number;

  /**
   * Style du container trigger
   */
  triggerStyle?: ViewStyle;

  /**
   * Classe CSS du trigger
   */
  triggerClassName?: string;

  /**
   * Callback appelé quand un élément est sélectionné
   */
  onSelectItem?: (item: DropdownMenuItem) => void;

  /**
   * Callback appelé quand le menu s'ouvre
   */
  onOpen?: () => void;

  /**
   * Callback appelé quand le menu se ferme
   */
  onClose?: () => void;

  /**
   * Désactiver le dropdown
   */
  disabled?: boolean;

  /**
   * Personnaliser le rendu des éléments
   */
  customItemRender?: (item: DropdownMenuItem) => ReactNode;

  /**
   * Props pour le modal
   */
  modalProps?: any;
}
