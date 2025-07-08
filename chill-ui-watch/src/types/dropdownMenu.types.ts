import { ReactNode } from 'react';
import { ModalProps, StyleProp, ViewStyle } from 'react-native';

import { TIcons } from '../constants/ICONS';
import { DropdownItemProps } from './dropdown.types';

export interface DropdownMenuItemProps {
  id: string;
  label: string;
  disabled?: boolean;
  onPress?: () => void;
  leftIcon?: keyof TIcons;
  rightIcon?: keyof TIcons;
  customLeftIcon?: ReactNode;
  customRightIcon?: ReactNode;
  customRender?: () => ReactNode;
}

export interface DropdownMenuProps {
  /**
   * Classe CSS du dropdown
   */
  className?: string;

  /**
   * Props pour le dropdown item
   */
  dropdownItemProps?: DropdownItemProps;

  /**
   * Le contenu qui déclenchera l'ouverture du menu (ex: icon, bouton)
   */
  children: ReactNode;

  /**
   * Afficher l'animation du dropdown
   */
  hasAnimation?: boolean;

  /**
   * Les éléments du menu
   */
  items: DropdownMenuItemProps[];

  /**
   * Élément actuellement sélectionné (pour l'auto-scroll)
   */
  selectedItem?: DropdownMenuItemProps;

  /**
   * Position du dropdown par rapport au trigger
   */
  dropdownPosition?: 'top' | 'bottom' | 'auto';

  /**
   * Position horizontale du dropdown par rapport au trigger
   */
  horizontalPosition?: 'left' | 'right' | 'center' | 'auto';

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
  triggerStyle?: StyleProp<ViewStyle>;

  /**
   * Classe CSS du trigger
   */
  triggerClassName?: string;

  /**
   * Callback appelé quand un élément est sélectionné
   */
  onSelectItem?: (item: DropdownMenuItemProps) => void;

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
   * Activer/désactiver le scroll dans la liste
   */
  hasScroll?: boolean;

  /**
   * Personnaliser le rendu des éléments
   */
  customItemRender?: (item: DropdownMenuItemProps) => ReactNode;

  /**
   * Props pour le modal
   */
  modalProps?: Partial<ModalProps>;
}
