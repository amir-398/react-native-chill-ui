# Chip Component

Le composant Chip affiche des éléments compacts qui représentent une entrée, un attribut ou une action. Inspiré des composants Chip de [Material-UI](https://mui.com/material-ui/react-chip/).

## Variants

### Contained (par défaut)

Chip avec fond coloré et texte blanc.

```tsx
<Chip variant="contained" size="md" rounded="md">
  New
</Chip>
```

### Outlined

Chip avec bordure colorée et fond transparent.

```tsx
<Chip variant="outlined" size="lg" rounded="full">
  Custom
</Chip>
```

## Color Variants

Le composant Chip supporte plusieurs variantes de couleurs prédéfinies :

```tsx
// Variantes de base
<Chip colorVariant="primary">Primary</Chip>
<Chip colorVariant="secondary">Secondary</Chip>
<Chip colorVariant="accent">Accent</Chip>
<Chip colorVariant="danger">Danger</Chip>
<Chip colorVariant="error">Error</Chip>
<Chip colorVariant="warning">Warning</Chip>
<Chip colorVariant="info">Info</Chip>
<Chip colorVariant="neutral">Neutral</Chip>
<Chip colorVariant="muted">Muted</Chip>
<Chip colorVariant="light">Light</Chip>
<Chip colorVariant="dark">Dark</Chip>
<Chip colorVariant="inverted">Inverted</Chip>
<Chip colorVariant="white">White</Chip>
<Chip colorVariant="disabled">Disabled</Chip>

// Variantes outlined
<Chip variant="outlined" colorVariant="primary">Primary Outlined</Chip>
<Chip variant="outlined" colorVariant="danger">Danger Outlined</Chip>
```

## Props

| Prop           | Type                                                                                                                                                                     | Défaut        | Description                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ----------------------------------------------------- |
| `variant`      | `'contained' \| 'outlined'`                                                                                                                                              | `'contained'` | Style du chip                                         |
| `colorVariant` | `'primary' \| 'secondary' \| 'accent' \| 'danger' \| 'error' \| 'warning' \| 'info' \| 'neutral' \| 'muted' \| 'light' \| 'dark' \| 'inverted' \| 'white' \| 'disabled'` | `'primary'`   | Variante de couleur du chip                           |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '2xs' \| '3xl'`                                                                                                        | `'md'`        | Taille du chip                                        |
| `rounded`      | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| 'full'`                                                                                                               | `'full'`      | Rayon de bordure                                      |
| `color`        | `string`                                                                                                                                                                 | -             | Couleur personnalisée du fond/bordure                 |
| `iconActions`  | `ChipIconAction[]`                                                                                                                                                       | `[]`          | Configuration des icônes avec position                |
| `stringProps`  | `StringProps`                                                                                                                                                            | -             | Props pour le composant string/text                   |
| `children`     | `ReactNode`                                                                                                                                                              | -             | Contenu du chip                                       |
| `title`        | `string`                                                                                                                                                                 | -             | Titre à afficher dans le chip (priorité sur children) |
| `position`     | `'left' \| 'center' \| 'right'`                                                                                                                                          | `'left'`      | Position du chip dans son conteneur                   |
| `className`    | `string`                                                                                                                                                                 | -             | Classes CSS personnalisées (NativeWind uniquement)    |

## Icon Actions

Le composant Chip supporte maintenant les icônes avec une configuration flexible et positionnelle :

```tsx
// Icône gauche
<Chip
  iconActions={[{
    iconName: 'star-solid',
    iconColor: '#FFD700',
    iconSize: 'sm',
    position: 'left'
  }]}
>
  Favori
</Chip>

// Icône droite personnalisée
<Chip
  iconActions={[{
    customIcon: <CustomIconComponent />,
    position: 'right'
  }]}
>
  Personnalisé
</Chip>

// Plusieurs icônes
<Chip
  iconActions={[
    {
      iconName: 'check-solid',
      iconColor: '#10B981',
      position: 'left'
    },
    {
      iconName: 'xmark-solid',
      iconColor: '#EF4444',
      position: 'right'
    }
  ]}
>
  Avec icônes
</Chip>

// Icône au centre
<Chip
  iconActions={[{
    iconName: 'info-solid',
    iconColor: '#6366F1',
    position: 'center'
  }]}
>
  Information
</Chip>
```

## Exemples

### Chip avec variante de couleur

```tsx
<Chip colorVariant="success" size="md">
  Success
</Chip>

<Chip colorVariant="warning" variant="outlined" size="md">
  Warning
</Chip>
```

### Chip avec icônes

```tsx
<Chip
  iconActions={[
    {
      iconName: 'star-solid',
      iconColor: '#FFD700',
      position: 'left',
    },
  ]}
  size="lg"
  rounded="full"
>
  Favori
</Chip>
```

### Chip personnalisé

```tsx
<Chip variant="outlined" color="#3B82F6" size="lg" rounded="full">
  Custom
</Chip>
```

### Chip avec différentes tailles

```tsx
<Stack direction="row" spacing={2}>
  <Chip size="sm">Small</Chip>
  <Chip size="md">Medium</Chip>
  <Chip size="lg">Large</Chip>
</Stack>
```

### Chip avec position

```tsx
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <Chip position="left">Gauche</Chip>
  <Chip position="center">Centre</Chip>
  <Chip position="right">Droite</Chip>
</View>
```

## Support NativeWind

Le composant détecte automatiquement la disponibilité de NativeWind et utilise :

- **NativeWind** : Classes Tailwind CSS avec variants et colorVariants
- **StyleSheet** : Styles React Native en fallback

## Inspiration

Ce composant s'inspire des composants Chip de [Material-UI](https://mui.com/material-ui/react-chip/) avec une adaptation pour React Native et NativeWind.
