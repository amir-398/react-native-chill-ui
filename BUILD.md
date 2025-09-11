# 📦 Multi-Build System

Ce projet utilise un système de build automatisé qui génère **3 versions différentes** de la librairie UI :

## 🎯 Versions disponibles

### 1. **Hybride** (par défaut) - `chill-ui`

- **Détection automatique** de NativeWind
- **Fallback** vers StyleSheet si NativeWind n'est pas disponible
- **Compatible** avec tous les projets React Native

```tsx
import { Avatar } from 'chill-ui';
```

### 2. **TailwindCSS Only** - `chill-ui/tailwind`

- **Uniquement NativeWind/TailwindCSS**
- **Plus léger** (pas de code StyleSheet)
- **Optimisé** pour les projets utilisant NativeWind

```tsx
import { Avatar } from 'chill-ui/tailwind';
```

### 3. **StyleSheet Only** - `chill-ui/stylesheet`

- **Uniquement React Native StyleSheet**
- **Plus léger** (pas de code TailwindCSS)
- **Compatible** avec tous les projets React Native classiques

```tsx
import { Avatar } from 'chill-ui/stylesheet';
```

## 🚀 Scripts de build

### Build automatisé (recommandé)

```bash
bun run build
```

Génère les 3 versions automatiquement dans :

- `lib/` - Version hybride
- `lib-tw/` - Version TailwindCSS only
- `lib-ss/` - Version StyleSheet only

### Builds individuels

```bash
bun run build:hybrid      # Version hybride
bun run build:tailwind    # Version TailwindCSS only
bun run build:stylesheet  # Version StyleSheet only
```

### Nettoyage

```bash
bun run clean  # Supprime tous les dossiers de build
```

## 🏗️ Architecture des composants

Chaque composant suit cette structure :

```
src/components/avatar/
├── components/
│   ├── Avatar.tsx     # Version hybride (auto-detect)
│   ├── Avatar.tw.tsx  # Version TailwindCSS pure
│   └── Avatar.ss.tsx  # Version StyleSheet pure
├── index.ts           # Export hybride
└── styles/
    ├── Avatar.styles.ts   # StyleSheet styles
    └── Avatar.variants.ts # TailwindCSS variants
```

## 📤 Points d'entrée

### Fichiers d'index principaux :

- `src/index.ts` - Point d'entrée hybride
- `src/index.tw.ts` - Point d'entrée TailwindCSS only
- `src/index.ss.ts` - Point d'entrée StyleSheet only

### Exports des composants :

- `src/components/index.ts` - Exports hybrides
- `src/components/index.tw.ts` - Exports TailwindCSS only
- `src/components/index.ss.ts` - Exports StyleSheet only

## 🔧 Configuration

### Package.json exports

Les exports conditionnels permettent d'importer les bonnes versions :

```json
{
  "exports": {
    ".": "./lib/module/index.js", // Hybride
    "./tailwind": "./lib-tw/module/index.js", // TW only
    "./stylesheet": "./lib-ss/module/index.js" // SS only
  }
}
```

### React Native Builder Bob

Utilise des configurations dynamiques pour chaque build avec des points d'entrée différents.

## 📋 Checklist pour ajouter un nouveau composant

1. ✅ Créer `Component.tsx` (version hybride)
2. ✅ Créer `Component.tw.tsx` (version TailwindCSS)
3. ✅ Créer `Component.ss.tsx` (version StyleSheet)
4. ✅ Ajouter les exports dans `components/index.ts`
5. ✅ Ajouter l'export TW dans `components/index.tw.ts`
6. ✅ Ajouter l'export SS dans `components/index.ss.ts`
7. ✅ Tester avec `bun run build`

## 🎨 Avantages

- **Flexibilité** : Les utilisateurs choisissent leur approche de styling
- **Performance** : Versions optimisées sans code inutile + builds ultra-rapides avec Bun
- **Compatibilité** : Support de tous les projets React Native
- **Maintenance** : Un seul repo pour 3 distributions
- **Rapidité** : Builds 3-5x plus rapides grâce à Bun

## ⚡ Pourquoi Bun ?

- **Builds ultra-rapides** : Bun est significativement plus rapide que npm/yarn
- **Gestion des packages** : Installation et exécution des dépendances optimisées
- **Compatibilité** : 100% compatible avec l'écosystème npm
- **Simplicité** : Une seule commande `bun run build` pour tout automatiser
