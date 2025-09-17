# GitHub Actions CI/CD Configuration

Ce répertoire contient la configuration complète de CI/CD pour le projet Chill UI avec GitHub Actions.

## 🚀 Workflows Disponibles

### 1. CI (Continuous Integration) - `ci.yml`
**Déclenchement :** Push sur `main`, `develop`, `tests-branch` et Pull Requests

**Fonctionnalités :**
- Tests sur Node.js 18 et 20
- Validation TypeScript
- Linting ESLint
- Tests unitaires avec couverture
- Build de toutes les variantes
- Upload des artefacts de build

### 2. Build - `build.yml`
**Déclenchement :** Push sur `main`, `develop`, tags `v*` et déclenchement manuel

**Fonctionnalités :**
- Build de toutes les variantes (core, hybrid, tailwind, stylesheet)
- Vérification des sorties de build
- Tests d'import des bibliothèques construites
- Validation des définitions TypeScript
- Upload des artefacts de build

### 3. Release - `release.yml`
**Déclenchement :** Tags `v*` et déclenchement manuel

**Fonctionnalités :**
- Publication automatique sur NPM
- Création de releases GitHub
- Génération de changelog
- Upload des assets de release
- Création de PR de release

### 4. Pull Request - `pr.yml`
**Déclenchement :** Ouverture et synchronisation de PR

**Fonctionnalités :**
- Vérifications de qualité du code
- Build de prévisualisation
- Scan de sécurité
- Commentaires automatiques sur les PR
- Upload d'artefacts de build pour les PR

### 5. Documentation - `docs.yml`
**Déclenchement :** Changements dans la documentation

**Fonctionnalités :**
- Validation de la documentation
- Vérification des liens cassés
- Validation des stories Storybook
- Génération de documentation API

### 6. Labels - `labels.yml`
**Déclenchement :** Changements dans `labels.yml` et déclenchement manuel

**Fonctionnalités :**
- Synchronisation automatique des labels GitHub
- Création/mise à jour/suppression des labels

## 🔧 Configuration

### Secrets Requis

Pour que les workflows fonctionnent correctement, vous devez configurer les secrets suivants dans votre repository GitHub :

1. **NPM_TOKEN** - Token NPM pour la publication
   - Générer sur [npmjs.com](https://www.npmjs.com/settings/tokens)
   - Permissions : `Automation` ou `Publish`

2. **GITHUB_TOKEN** - Automatiquement fourni par GitHub Actions
   - Permissions : `contents: write`, `packages: write`, `id-token: write`

### Variables d'Environnement

Les workflows utilisent les variables d'environnement suivantes :

- `NODE_VERSION`: Version de Node.js (par défaut: 20)
- `BUN_VERSION`: Version de Bun (par défaut: latest)

## 📋 Templates

### Issues
- **Bug Report** (`bug_report.yml`) - Template pour signaler des bugs
- **Feature Request** (`feature_request.yml`) - Template pour demander des fonctionnalités
- **Config** (`config.yml`) - Configuration des templates d'issues

### Pull Requests
- **PR Template** (`pull_request_template.md`) - Template pour les PR avec checklist complète

## 🏷️ Labels

Le système de labels est configuré dans `labels.yml` et synchronisé automatiquement :

### Catégories de Labels
- **Priority** : critical, high, medium, low
- **Type** : bug, enhancement, documentation, question
- **Component** : box, button, input, dialog, etc.
- **Variant** : core, tailwind, stylesheet, hybrid
- **Status** : needs-triage, in-progress, blocked, etc.
- **Size** : xs, s, m, l, xl
- **Platform** : ios, android, web, cross-platform

## 🔄 Dependabot

Configuration automatique des mises à jour de dépendances :

- **NPM** : Mises à jour hebdomadaires le lundi à 9h
- **GitHub Actions** : Mises à jour hebdomadaires
- **Limite** : 10 PR ouvertes maximum
- **Reviewers** : Assignation automatique

## 🚦 Statuts des Workflows

### Badges de Statut
Vous pouvez ajouter ces badges à votre README principal :

```markdown
![CI](https://github.com/amirmeb/chill-ui/workflows/CI/badge.svg)
![Build](https://github.com/amirmeb/chill-ui/workflows/Build/badge.svg)
![Release](https://github.com/amirmeb/chill-ui/workflows/Release/badge.svg)
```

### Statuts Possibles
- ✅ **Success** - Tous les tests passent
- ❌ **Failure** - Au moins un test échoue
- ⚠️ **Warning** - Tests passent avec des avertissements
- 🔄 **In Progress** - Workflow en cours d'exécution

## 🛠️ Maintenance

### Mise à Jour des Workflows
1. Modifier les fichiers `.yml` dans `.github/workflows/`
2. Tester les changements sur une branche de test
3. Merger sur `main` pour activer les changements

### Monitoring
- Surveiller les logs des workflows dans l'onglet "Actions"
- Vérifier les artefacts générés
- Contrôler les releases automatiques

### Dépannage
- Vérifier les secrets configurés
- Contrôler les permissions du repository
- Examiner les logs détaillés en cas d'échec

## 📚 Ressources

- [Documentation GitHub Actions](https://docs.github.com/en/actions)
- [Documentation Dependabot](https://docs.github.com/en/code-security/dependabot)
- [Documentation NPM Publishing](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [Documentation Release-it](https://github.com/release-it/release-it)
