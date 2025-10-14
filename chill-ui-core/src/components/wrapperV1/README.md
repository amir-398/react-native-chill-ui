# Wrapper Component

Le composant Wrapper fournit une fonctionnalité de conteneur flexible avec plusieurs options de comportement. Il supporte la gestion des zones sécurisées, l'évitement du clavier, le défilement et le style personnalisable.

## Structure

Le composant Wrapper est maintenant organisé en trois variantes :

### 1. Wrapper (Hybrid) - `/components/Wrapper.tsx`

- **Auto-détection** : Détecte automatiquement la disponibilité de NativeWind et utilise StyleSheet en fallback
- **Utilisation** : Composant par défaut, recommandé pour la plupart des cas d'usage
- **Import** : `import Wrapper from '@components/wrapper'`

### 2. WrapperSs (StyleSheet) - `/components/Wrapper.ss.tsx`

- **StyleSheet uniquement** : Utilise uniquement StyleSheet de React Native
- **Utilisation** : Pour les projets qui n'utilisent pas NativeWind
- **Import** : `import { WrapperSs } from '@components/wrapper'`

### 3. WrapperTw (NativeWind) - `/components/Wrapper.tw.tsx`

- **NativeWind uniquement** : Utilise uniquement les classes Tailwind
- **Utilisation** : Pour les projets qui utilisent exclusivement NativeWind
- **Import** : `import { WrapperTw } from '@components/wrapper'`

## Styles

Les styles sont organisés dans le dossier `/styles/` :

- **Wrapper.ss.styles.ts** : Styles StyleSheet
- **Wrapper.tw.styles.ts** : Classes Tailwind

## Utilisation

### Wrapper (Hybrid) - Recommandé

```tsx
import Wrapper from '@components/wrapper';

// Avec NativeWind (si disponible)
<Wrapper className="bg-gray-100">
  <String>Content</String>
</Wrapper>

// Avec StyleSheet (fallback)
<Wrapper style={{ backgroundColor: '#f0f0f0' }}>
  <String>Content</String>
</Wrapper>
```

### WrapperSs (StyleSheet uniquement)

```tsx
import { WrapperSs } from '@components/wrapper';

<WrapperSs style={{ backgroundColor: '#f0f0f0' }}>
  <String>Content</String>
</WrapperSs>;
```

### WrapperTw (NativeWind uniquement)

```tsx
import { WrapperTw } from '@components/wrapper';

<WrapperTw className="bg-gray-100">
  <String>Content</String>
</WrapperTw>;
```

## Fonctionnalités

- **Safe Area** : Support des zones sécurisées avec `hasSafeAreaView`
- **Keyboard Avoidance** : Évitement du clavier avec `hasKeyboardAvoidingView`
- **Keyboard Aware Scroll** : Défilement intelligent avec `hasKeyboardAwareScrollView`
- **Scroll View** : Défilement standard avec `hasScrollView`
- **Custom Styling** : Support des styles personnalisés via `className` ou `style`

## Props

```tsx
interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  hasSafeAreaView?: boolean;
  hasKeyboardAvoidingView?: boolean;
  hasKeyboardAwareScrollView?: boolean;
  hasScrollView?: boolean;
  nestedScrollEnabled?: boolean;
  edges?: Edge[];
}
```
