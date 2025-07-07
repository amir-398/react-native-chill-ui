# DropdownMenu Component

Le composant `DropdownMenu` permet de créer un menu déroulant avec un trigger personnalisé. Il est basé sur la même logique que le `PhoneNumberInput` et utilise le hook `useInputSelectDropdown`.

## Caractéristiques

- **Trigger personnalisable** : Vous pouvez utiliser n'importe quel élément (icon, bouton, etc.) comme déclencheur
- **Éléments de menu avec icônes** : Chaque élément peut avoir une icône optionnelle
- **Gestion des éléments désactivés** : Possibilité de désactiver certains éléments
- **Callbacks pour les actions** : Callbacks individuels par élément et callback global
- **Positionnement intelligent** : Le menu se positionne automatiquement selon l'espace disponible
- **Positionnement horizontal** : Support pour aligner le menu à gauche ou à droite du trigger
- **Render personnalisé** : Possibilité de personnaliser le rendu des éléments
- **Largeur configurable** : Possibilité de définir une largeur fixe pour le menu

## Installation

Le composant est déjà intégré dans la librairie. Il suffit de l'importer :

```tsx
import { DropdownMenu } from '@/components';
```

## Utilisation de base

```tsx
import { DropdownMenu, Icon } from '@/components';

const items = [
  {
    id: '1',
    label: 'Accueil',
    icon: 'home-solid',
    onPress: () => console.log('Accueil cliqué'),
  },
  {
    id: '2',
    label: 'Profil',
    icon: 'user-solid',
    onPress: () => console.log('Profil cliqué'),
  },
  {
    id: '3',
    label: 'Paramètres',
    icon: 'home-solid',
    disabled: true,
    onPress: () => console.log('Paramètres cliqué'),
  },
];

function MyComponent() {
  return (
    <DropdownMenu
      items={items}
      onSelectItem={item => console.log('Item sélectionné:', item)}
      width={200}
      horizontalPosition="auto"
    >
      <Icon name="home-solid" size="md" color="black" />
    </DropdownMenu>
  );
}
```

## Props

### DropdownMenuProps

| Prop                 | Type                                    | Description                      | Défaut   |
| -------------------- | --------------------------------------- | -------------------------------- | -------- |
| `children`           | `ReactNode`                             | Le contenu du trigger            | -        |
| `items`              | `DropdownMenuItem[]`                    | Les éléments du menu             | -        |
| `dropdownPosition`   | `'top' \| 'bottom' \| 'auto'`           | Position verticale du dropdown   | `'auto'` |
| `horizontalPosition` | `'left' \| 'right' \| 'auto'`           | Position horizontale du dropdown | `'auto'` |
| `offsetX`            | `number`                                | Décalage horizontal              | `0`      |
| `offsetY`            | `number`                                | Décalage vertical                | `5`      |
| `width`              | `number`                                | Largeur du dropdown              | `200`    |
| `maxHeight`          | `number`                                | Hauteur maximale du dropdown     | `200`    |
| `minHeight`          | `number`                                | Hauteur minimale du dropdown     | `50`     |
| `triggerStyle`       | `ViewStyle`                             | Style du container trigger       | -        |
| `triggerClassName`   | `string`                                | Classe CSS du trigger            | -        |
| `onSelectItem`       | `(item: DropdownMenuItem) => void`      | Callback global de sélection     | -        |
| `onOpen`             | `() => void`                            | Callback à l'ouverture           | -        |
| `onClose`            | `() => void`                            | Callback à la fermeture          | -        |
| `disabled`           | `boolean`                               | Désactiver le dropdown           | `false`  |
| `customItemRender`   | `(item: DropdownMenuItem) => ReactNode` | Rendu personnalisé des éléments  | -        |
| `modalProps`         | `any`                                   | Props pour le modal              | -        |

### DropdownMenuItem

| Prop           | Type              | Description        |
| -------------- | ----------------- | ------------------ |
| `id`           | `string`          | Identifiant unique |
| `label`        | `string`          | Texte affiché      |
| `icon`         | `keyof TIcons`    | Icône optionnelle  |
| `disabled`     | `boolean`         | Élément désactivé  |
| `onPress`      | `() => void`      | Action à exécuter  |
| `customRender` | `() => ReactNode` | Rendu personnalisé |

## Exemples avancés

### Trigger personnalisé avec style

```tsx
<DropdownMenu items={items} triggerClassName="bg-blue-500 p-3 rounded-lg">
  <Box className="flex-row items-center gap-2">
    <Icon name="user-solid" size="sm" color="white" />
    <String className="font-medium text-white">Mon compte</String>
    <Icon name="angle-down-solid" size="xs" color="white" />
  </Box>
</DropdownMenu>
```

### Rendu personnalisé des éléments

```tsx
<DropdownMenu
  items={items}
  customItemRender={item => (
    <Box className="flex-row items-center gap-3 border-b border-gray-200 bg-gray-50 p-4">
      <Icon name={item.icon!} size="md" color="blue" />
      <Box className="flex-1">
        <String className="font-semibold text-gray-800">{item.label}</String>
        <String className="text-sm text-gray-500">Description</String>
      </Box>
      <Icon name="angle-right-solid" size="xs" color="gray" />
    </Box>
  )}
>
  <Icon name="home-solid" size="md" color="black" />
</DropdownMenu>
```

### Position spécifique

```tsx
<DropdownMenu items={items} dropdownPosition="top" offsetY={10}>
  <Icon name="home-solid" size="md" color="black" />
</DropdownMenu>
```

## Positionnement horizontal

Le composant supporte maintenant le positionnement horizontal pour mieux gérer les cas où l'icône est proche des bords de l'écran :

### Modes de positionnement

- **`left`** : Le coin gauche du menu s'aligne avec le coin gauche du trigger
- **`right`** : Le coin droit du menu s'aligne avec le coin droit du trigger
- **`auto`** : Détecte automatiquement la meilleure position selon l'espace disponible

### Exemples

```tsx
// Menu aligné à gauche (pour icône à gauche de l'écran)
<DropdownMenu
  items={items}
  horizontalPosition="left"
  width={200}
>
  <Icon name="home-solid" size="md" color="black" />
</DropdownMenu>

// Menu aligné à droite (pour icône à droite de l'écran)
<DropdownMenu
  items={items}
  horizontalPosition="right"
  width={200}
>
  <Icon name="home-solid" size="md" color="black" />
</DropdownMenu>

// Mode auto (recommandé)
<DropdownMenu
  items={items}
  horizontalPosition="auto"
  width={200}
>
  <Icon name="home-solid" size="md" color="black" />
</DropdownMenu>
```

## Notes

- Le composant utilise maintenant un système de positionnement avancé avec support horizontal
- Le modal se ferme automatiquement lors du clic sur un élément (configurable)
- Les éléments désactivés sont filtrés automatiquement de la liste affichée
- Le composant gère automatiquement le clavier sur mobile
- Le mode `auto` pour le positionnement horizontal est recommandé pour une expérience utilisateur optimale
