# Wrapper Components

Une collection de composants wrapper flexibles pour gérer différents scénarios de layout et de clavier.

## Composants disponibles

### 1. `Wrapper` - Conteneur de base

Conteneur flexible de base avec styling par défaut.

```tsx
import { Wrapper } from '@components/wrapper';

<Wrapper className="bg-gray-100 p-4">
  <String>Content</String>
</Wrapper>;
```

### 2. `WrapperScrollView` - ScrollView avec gestion du clavier

Conteneur scrollable avec gestion automatique du clavier.

```tsx
import { WrapperScrollView } from '@components/wrapper';

<WrapperScrollView contentContainerClassName="p-4" nestedScrollEnabled={false} keyboardShouldPersistTaps="always">
  <String>Scrollable content</String>
</WrapperScrollView>;
```

### 3. `WrapperSafeAreaView` - Gestion des zones sécurisées

Conteneur avec gestion automatique des safe areas (notch, home indicator, etc.).

```tsx
import { WrapperSafeAreaView } from '@components/wrapper';

<WrapperSafeAreaView edges={['top', 'bottom']}>
  <String>Safe area content</String>
</WrapperSafeAreaView>;
```

**Dépendance requise:** `react-native-safe-area-context`

### 4. `WrapperKeyboardAvoidingView` - Évitement du clavier

Conteneur qui ajuste automatiquement sa position pour éviter le clavier.

```tsx
import { WrapperKeyboardAvoidingView } from '@components/wrapper';

<WrapperKeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
  <Input placeholder="Type here" />
</WrapperKeyboardAvoidingView>;
```

**Dépendance requise:** `react-native-keyboard-controller`

### 5. `WrapperKeyboardAwareScrollView` - Scroll intelligent avec clavier

ScrollView intelligent qui gère automatiquement le scroll lors de l'apparition du clavier.

```tsx
import { WrapperKeyboardAwareScrollView } from '@components/wrapper';

<WrapperKeyboardAwareScrollView bottomOffset={20} keyboardShouldPersistTaps="handled">
  <Input placeholder="Type here" />
</WrapperKeyboardAwareScrollView>;
```

**Dépendance requise:** `react-native-keyboard-controller`

## Composition

Les composants peuvent être composés ensemble pour des cas d'usage complexes :

```tsx
<WrapperSafeAreaView edges={['top']}>
  <WrapperKeyboardAwareScrollView bottomOffset={20}>
    <Input placeholder="First input" />
    <Input placeholder="Second input" />
  </WrapperKeyboardAwareScrollView>
</WrapperSafeAreaView>
```

## Variantes

Chaque composant existe en 3 variantes :

### Hybrid (Recommandé)

Auto-détecte NativeWind et utilise StyleSheet en fallback.

```tsx
import { Wrapper } from '@components/wrapper';
```

### StyleSheet uniquement

```tsx
import { WrapperSs } from '@components/wrapper';
```

### NativeWind uniquement

```tsx
import { WrapperTw } from '@components/wrapper';
```

## Props communes

### Wrapper

- `className` (string): Classes CSS personnalisées (TailwindCSS/NativeWind)

### WrapperScrollView

- `className` (string): Classes CSS pour le ScrollView
- `contentContainerClassName` (string): Classes CSS pour le container de contenu
- `nestedScrollEnabled` (boolean): Active le scroll imbriqué
- `keyboardShouldPersistTaps` ('always' | 'never' | 'handled'): Comportement du clavier

### WrapperSafeAreaView

- `className` (string): Classes CSS personnalisées
- `edges` (Array<'top' | 'right' | 'bottom' | 'left'>): Bords à protéger

### WrapperKeyboardAvoidingView

- `className` (string): Classes CSS personnalisées
- `behavior` ('height' | 'position' | 'padding'): Type d'évitement
- `keyboardVerticalOffset` (number): Offset vertical (défaut: 10)

### WrapperKeyboardAwareScrollView

- `className` (string): Classes CSS pour le ScrollView
- `contentContainerClassName` (string): Classes CSS pour le container
- `bottomOffset` (number): Offset du bas (défaut: 20)
- `keyboardShouldPersistTaps` ('always' | 'never' | 'handled'): Comportement du clavier

## Dépendances optionnelles

Certains composants nécessitent des dépendances supplémentaires :

```bash
# Pour WrapperSafeAreaView
npm install react-native-safe-area-context

# Pour WrapperKeyboardAvoidingView et WrapperKeyboardAwareScrollView
npm install react-native-keyboard-controller
```

Si une dépendance n'est pas installée, le composant affichera un avertissement et utilisera un fallback approprié.
