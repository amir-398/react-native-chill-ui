import { ReactNode } from 'react';
import { ModalProps, StyleProp, ViewStyle } from 'react-native';

import { TIcons } from '../constants/ICONS';
import { DropdownItemProps, InputDropdownListProps } from './inputDropdown/inputDropdown.tw.types';

export type DropdownMenuTriggerType =
  | 'TouchableOpacity'
  | 'TouchableHighlight'
  | 'Pressable'
  | 'RipplePressable'
  | 'none';

export interface DropdownMenuRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

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
   * Props pour la liste du dropdown
   */
  dropdownListProps?: InputDropdownListProps['dropdownListProps'];

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
  dataSet: DropdownMenuItemProps[];

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

  /**
   * Type de composant cliquable à utiliser pour les éléments du menu
   */
  itemClickableAs?: InputDropdownListProps['itemClickableAs'];

  /**
   * Type de composant à utiliser pour le trigger du menu
   */
  triggerAs?: DropdownMenuTriggerType;

  /**
   * Fermer le modal quand un élément est sélectionné
   */
  closeDropdownWhenSelectedItem?: boolean;
}
