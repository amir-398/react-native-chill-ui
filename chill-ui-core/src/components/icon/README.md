# CustomIcon Component

Le composant CustomIcon est un système d'icônes SVG personnalisable qui fournit un rendu d'icônes optimisé avec support automatique de NativeWind et fallback vers StyleSheet.

## Fonctionnalités

- ✅ **Support NativeWind optionnel** : Détection automatique et fallback vers StyleSheet
- ✅ **Icônes SVG** : Rendu d'icônes vectorielles scalables
- ✅ **Personnalisation** : Couleur, taille et styles personnalisables
- ✅ **Performance** : Optimisé pour le rendu d'icônes
- ✅ **TypeScript** : Support complet des types
- ✅ **Flexible** : Support des props className et style

## Utilisation

### Avec NativeWind Installé

```tsx
import CustomIcon from '@/components/icon/CustomIcon';

// Icône avec classes Tailwind
<CustomIcon name="star" className="w-6 h-6 text-yellow-500" />

// Icône avec taille et couleur personnalisées
<CustomIcon name="heart" className="w-8 h-8 text-red-500" />

// Icône dans un bouton
<Button className="flex-row items-center space-x-2">
  <CustomIcon name="plus" className="w-5 h-5" />
  <String>Ajouter</String>
</Button>
```

### Sans NativeWind (Fallback StyleSheet)

```tsx
import CustomIcon from '@/components/icon/CustomIcon';

// Utilisation avec StyleSheet (fallback automatique)
<CustomIcon
  name="star"
  style={{ width: 24, height: 24 }}
  color="#F59E0B"
/>

// Icône avec styles inline
<CustomIcon
  name="heart"
  style={{ width: 32, height: 32 }}
  color="#EF4444"
/>

// Icône dans un bouton
<Button style={{ flexDirection: 'row', alignItems: 'center' }}>
  <CustomIcon name="plus" style={{ width: 20, height: 20 }} />
  <String>Ajouter</String>
</Button>
```

## Props

### IconProps

```tsx
interface IconProps {
  name: keyof TIcons;           // Nom de l'icône (requis)
  color?: string;               // Couleur de l'icône (défaut: '#fff')
  className?: string;           // Classes Tailwind CSS (avec NativeWind)
  style?: StyleProp<ViewStyle>; // Styles inline React Native
  ...SvgProps;                  // Toutes les props de react-native-svg
}
```

### Icônes Disponibles

Le composant utilise le système d'icônes défini dans `constants/ICONS.ts`. Voici quelques exemples :

```tsx
// Icônes de base
<CustomIcon name="star" />
<CustomIcon name="heart" />
<CustomIcon name="plus" />
<CustomIcon name="minus" />
<CustomIcon name="check" />
<CustomIcon name="close" />

// Icônes de navigation
<CustomIcon name="arrow-left" />
<CustomIcon name="arrow-right" />
<CustomIcon name="arrow-up" />
<CustomIcon name="arrow-down" />

// Icônes d'interface
<CustomIcon name="menu" />
<CustomIcon name="search" />
<CustomIcon name="settings" />
<CustomIcon name="user" />
```

## Exemples d'Utilisation

### Icônes dans des Boutons

```tsx
// Bouton avec icône
<Button className="flex-row items-center space-x-2 bg-blue-500">
  <CustomIcon name="plus" className="w-5 h-5 text-white" />
  <String className="text-white">Ajouter un élément</String>
</Button>

// Bouton d'action flottant
<BoxAbsolute className="bottom-4 right-4">
  <Button className="w-14 h-14 rounded-full bg-blue-500 items-center justify-center">
    <CustomIcon name="plus" className="w-6 h-6 text-white" />
  </Button>
</BoxAbsolute>
```

### Icônes dans des Listes

```tsx
// Liste avec icônes
<BoxColumn>
  {menuItems.map(item => (
    <BoxRowCenterBetween key={item.id} className="border-b border-gray-200 p-4">
      <BoxRowCenter className="space-x-3">
        <CustomIcon name={item.icon} className="h-5 w-5 text-gray-600" />
        <String>{item.title}</String>
      </BoxRowCenter>
      <CustomIcon name="arrow-right" className="h-4 w-4 text-gray-400" />
    </BoxRowCenterBetween>
  ))}
</BoxColumn>
```

### Icônes avec États

```tsx
// Icône avec état actif/inactif
function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <Button onPress={onToggle} className="p-2">
      <CustomIcon name="heart" className={`h-6 w-6 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`} />
    </Button>
  );
}

// Icône avec animation
function AnimatedIcon() {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSpring(0.8, { duration: 100 });
    setTimeout(() => {
      scale.value = withSpring(1, { duration: 100 });
    }, 100);
  };

  return (
    <AnimatedView style={{ transform: [{ scale: scale.value }] }} onPress={handlePress}>
      <CustomIcon name="star" className="h-8 w-8 text-yellow-500" />
    </AnimatedView>
  );
}
```

### Icônes dans des Cartes

```tsx
// Carte avec icône
<Box className="rounded-lg bg-white p-4 shadow-sm">
  <BoxRowCenterBetween>
    <BoxRowCenter className="space-x-3">
      <CustomIcon name="user" className="h-8 w-8 text-blue-500" />
      <BoxColumn>
        <String className="font-semibold">John Doe</String>
        <String className="text-gray-500">En ligne</String>
      </BoxColumn>
    </BoxRowCenter>
    <CustomIcon name="more" className="h-5 w-5 text-gray-400" />
  </BoxRowCenterBetween>
</Box>
```

## Performance

### Optimisations

- **SVG Natif** : Utilise react-native-svg pour un rendu optimal
- **Détection NativeWind** : Cache le résultat de la détection
- **Props Conditionnelles** : Évite les props inutiles selon le mode
- **Rendu Optimisé** : Minimise les re-rendus

### Comparaison de Performance

| Approche                    | Performance | Bundle Size | Compatibilité     |
| --------------------------- | ----------- | ----------- | ----------------- |
| **CustomIcon + NativeWind** | ⭐⭐⭐⭐⭐  | Minimal     | NativeWind requis |
| **CustomIcon + StyleSheet** | ⭐⭐⭐⭐    | Minimal     | Universel         |
| **Icon Font**               | ⭐⭐⭐      | Standard    | Universel         |
| **Image Icons**             | ⭐⭐        | Plus grand  | Universel         |

## Migration

### Depuis une Version Précédente

Si vous utilisez déjà CustomIcon, **aucun changement n'est requis**. Le composant continue de fonctionner normalement.

### Ajout de NativeWind

Si vous souhaitez ajouter NativeWind à votre projet :

1. **Installation** :

```bash
npm install nativewind
npm install --save-dev tailwindcss
```

2. **Configuration** :

```javascript
// tailwind.config.js
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: { extend: {} },
  plugins: [],
};
```

3. **Migration progressive** :

```tsx
// Avant (StyleSheet)
<CustomIcon
  name="star"
  style={{ width: 24, height: 24 }}
  color="#F59E0B"
/>

// Après (NativeWind)
<CustomIcon name="star" className="w-6 h-6 text-yellow-500" />
```

## Compatibilité

- ✅ React Native 0.70+
- ✅ Expo SDK 48+
- ✅ TypeScript 4.9+
- ✅ NativeWind 2.0+ (optionnel)
- ✅ react-native-svg 13.0+
- ✅ iOS 12+
- ✅ Android API 21+

## Bonnes Pratiques

### 1. Utilisez des Tailles Cohérentes

```tsx
// ✅ Bon : Tailles standardisées
<CustomIcon name="star" className="w-5 h-5" />
<CustomIcon name="heart" className="w-6 h-6" />
<CustomIcon name="plus" className="w-8 h-8" />

// ❌ Évitez : Tailles arbitraires
<CustomIcon name="star" className="w-4.5 h-4.5" />
```

### 2. Utilisez des Couleurs Sémantiques

```tsx
// ✅ Bon : Couleurs avec signification
<CustomIcon name="check" className="text-green-500" />
<CustomIcon name="close" className="text-red-500" />
<CustomIcon name="warning" className="text-yellow-500" />

// ❌ Évitez : Couleurs arbitraires
<CustomIcon name="check" className="text-purple-300" />
```

### 3. Optimisez pour l'Accessibilité

```tsx
// ✅ Bon : Accessibilité
<Button onPress={handleFavorite} accessibilityLabel="Ajouter aux favoris">
  <CustomIcon name="heart" className="w-6 h-6" />
</Button>

// ✅ Bon : États visuels clairs
<CustomIcon
  name="star"
  className={`w-6 h-6 ${isRated ? 'text-yellow-500' : 'text-gray-300'}`}
/>
```

### 4. Utilisez des Icônes Appropriées

```tsx
// ✅ Bon : Icônes sémantiques
<CustomIcon name="user" /> // Pour les profils
<CustomIcon name="settings" /> // Pour les paramètres
<CustomIcon name="search" /> // Pour la recherche

// ❌ Évitez : Icônes génériques
<CustomIcon name="circle" /> // Trop générique
```
