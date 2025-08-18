# Migration Guide: NativeWind Compatibility

Ce guide explique comment utiliser la nouvelle fonctionnalité de compatibilité NativeWind/StyleSheet dans la librairie Chill UI.

## Vue d'ensemble

La librairie Chill UI supporte maintenant automatiquement les deux approches de styling :

- **NativeWind** : Utilisation des classes Tailwind CSS
- **StyleSheet** : Utilisation des styles React Native traditionnels

Les composants détectent automatiquement la disponibilité de NativeWind et s'adaptent en conséquence.

## Composants Compatibles

Actuellement, les composants suivants supportent cette fonctionnalité :

- ✅ **Avatar** : Détection automatique NativeWind/StyleSheet
- 🔄 **Autres composants** : En cours d'implémentation

## Utilisation

### Avec NativeWind Installé

```tsx
import Avatar from '@/components/avatar/Avatar';

// Utilisation normale avec NativeWind
<Avatar data={{ firstname: 'John', lastname: 'Doe' }} className="border-4 border-blue-500 shadow-lg" size="lg" />;
```

### Sans NativeWind

```tsx
import Avatar from '@/components/avatar/Avatar';

// Utilisation avec StyleSheet (fallback automatique)
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  backgroundColor="#3B82F6" // Utilise les props de style
  size="lg"
/>;
```

## Migration depuis une Version Précédente

### Si vous utilisez déjà NativeWind

**Aucun changement requis !** Vos composants continueront de fonctionner normalement.

```tsx
// ✅ Continue de fonctionner
<Avatar data={{ firstname: 'John', lastname: 'Doe' }} className="border-2 border-blue-500" size="lg" />
```

### Si vous n'utilisez pas NativeWind

**Aucun changement requis !** Les composants utilisent automatiquement StyleSheet.

```tsx
// ✅ Continue de fonctionner avec StyleSheet
<Avatar data={{ firstname: 'John', lastname: 'Doe' }} backgroundColor="#3B82F6" size="lg" />
```

## Ajout de NativeWind à un Projet Existant

Si vous souhaitez ajouter NativeWind à votre projet :

### 1. Installation

```bash
npm install nativewind
npm install --save-dev tailwindcss
```

### 2. Configuration

Créez un fichier `tailwind.config.js` :

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 3. Configuration Babel

Mettez à jour votre `babel.config.js` :

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
  };
};
```

### 4. Types TypeScript

Ajoutez les types NativeWind à votre `tsconfig.json` :

```json
{
  "compilerOptions": {
    "types": ["nativewind/types"]
  }
}
```

### 5. Migration Graduelle

Vous pouvez migrer progressivement vos styles :

```tsx
// Avant (StyleSheet)
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  backgroundColor="#3B82F6"
  size="lg"
/>

// Après (NativeWind)
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  className="bg-blue-500"
  size="lg"
/>
```

## API des Composants

### Avatar

| Prop              | Avec NativeWind | Sans NativeWind | Description                |
| ----------------- | --------------- | --------------- | -------------------------- |
| `className`       | ✅ Utilisé      | ❌ Ignoré       | Classes Tailwind CSS       |
| `backgroundColor` | ✅ Utilisé      | ✅ Utilisé      | Couleur de fond            |
| `style`           | ✅ Utilisé      | ✅ Utilisé      | Styles inline              |
| Autres props      | ✅ Utilisées    | ✅ Utilisées    | Fonctionnalités identiques |

### Exemples de Migration

#### Migration Simple

```tsx
// Avant
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  backgroundColor="#3B82F6"
  size="lg"
/>

// Après (avec NativeWind)
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  className="bg-blue-500"
  size="lg"
/>
```

#### Migration avec Styles Complexes

```tsx
// Avant (StyleSheet)
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  backgroundColor="#3B82F6"
  style={{
    borderWidth: 2,
    borderColor: '#1E40AF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }}
  size="lg"
/>

// Après (NativeWind)
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  className="bg-blue-500 border-2 border-blue-700 shadow-lg"
  size="lg"
/>
```

## Détection Automatique

La détection de NativeWind se fait automatiquement via l'utilitaire `nativewind-detector` :

```tsx
import { isNativeWindInstalled } from '@/utils/nativewind-detector';

// Vérifier si NativeWind est disponible
if (isNativeWindInstalled()) {
  console.log('NativeWind est disponible');
} else {
  console.log("NativeWind n'est pas disponible, utilisation de StyleSheet");
}
```

## Tests

Pour tester la compatibilité dans vos tests :

```tsx
import { isNativeWindInstalled, resetNativeWindDetection } from '@/utils/nativewind-detector';

// Mock pour tester sans NativeWind
jest.mock('@/utils/nativewind-detector', () => ({
  isNativeWindInstalled: jest.fn(() => false),
  resetNativeWindDetection: jest.fn(),
}));

// Mock pour tester avec NativeWind
jest.mock('@/utils/nativewind-detector', () => ({
  isNativeWindInstalled: jest.fn(() => true),
  resetNativeWindDetection: jest.fn(),
}));
```

## Bonnes Pratiques

### 1. Utilisation Cohérente

```tsx
// ✅ Bon : Utilisez une approche cohérente dans votre app
const MyComponent = () => {
  return (
    <Box>
      <Avatar className="bg-blue-500" data={userData} />
      <Avatar className="bg-green-500" data={userData2} />
    </Box>
  );
};

// ❌ Évitez : Mélange d'approches
const MyComponent = () => {
  return (
    <Box>
      <Avatar className="bg-blue-500" data={userData} />
      <Avatar backgroundColor="#10B981" data={userData2} />
    </Box>
  );
};
```

### 2. Fallback Graceful

```tsx
// ✅ Bon : Fournissez des fallbacks
<Avatar
  data={{ firstname: 'John', lastname: 'Doe' }}
  className="bg-blue-500" // Avec NativeWind
  backgroundColor="#3B82F6" // Fallback sans NativeWind
  size="lg"
/>
```

### 3. Tests de Compatibilité

```tsx
// Testez les deux modes
describe('Avatar Component', () => {
  it('should work with NativeWind', () => {
    // Mock NativeWind disponible
    // Test avec className
  });

  it('should work without NativeWind', () => {
    // Mock NativeWind non disponible
    // Test avec backgroundColor
  });
});
```

## Dépannage

### Problème : Les styles ne s'appliquent pas

**Solution :** Vérifiez que NativeWind est correctement configuré :

```bash
# Vérifiez l'installation
npm list nativewind

# Vérifiez la configuration
npx tailwindcss --help
```

### Problème : Erreurs TypeScript

**Solution :** Ajoutez les types NativeWind :

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["nativewind/types"]
  }
}
```

### Problème : Styles incohérents

**Solution :** Utilisez une approche cohérente :

```tsx
// Utilisez soit className, soit backgroundColor, pas les deux
<Avatar
  data={userData}
  className="bg-blue-500" // Avec NativeWind
  // backgroundColor="#3B82F6" // Évitez de mélanger
/>
```

## Support

Pour toute question ou problème :

1. Consultez la documentation du composant spécifique
2. Vérifiez les exemples dans le dossier `stories/`
3. Ouvrez une issue sur GitHub avec les détails de votre environnement

## Roadmap

- [ ] Extension de la compatibilité à tous les composants
- [ ] Outils de migration automatique
- [ ] Documentation interactive
- [ ] Exemples de projets complets
