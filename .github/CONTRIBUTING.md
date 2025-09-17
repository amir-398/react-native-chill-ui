# Contributing to Chill UI

Thank you for your interest in contributing to Chill UI! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Release Process](#release-process)

## 🤝 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Bun (recommended) or npm/yarn
- Git
- React Native development environment

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-native-chill-ui.git
   cd react-native-chill-ui
   ```

3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/amirmeb/react-native-chill-ui.git
   ```

## 🛠️ Development Setup

### 1. Install Dependencies

```bash
# Install root dependencies
bun install

# Install core dependencies
cd chill-ui-core
bun install
```

### 2. Build the Project

```bash
# Build all variants
bun run build
bun run build:hybrid
bun run build:tailwind
bun run build:stylesheet
```

### 3. Run Tests

```bash
cd chill-ui-core
bun run test
bun run test:coverage
```

### 4. Start Development

```bash
# Start the example app
bun run example

# Or start Storybook
cd chill-ui-core
bun run storybook
```

## 📝 Contributing Guidelines

### Types of Contributions

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🧪 **Test coverage**
- 🎨 **UI/UX improvements**
- ⚡ **Performance optimizations**
- 🔧 **Build system improvements**

### Before You Start

1. Check existing issues and PRs
2. Create an issue for significant changes
3. Discuss major changes with maintainers
4. Ensure your change aligns with project goals

## 🔄 Pull Request Process

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Follow the coding standards
- Add tests for new functionality
- Update documentation
- Ensure all tests pass

### 3. Commit Your Changes

```bash
git add .
git commit -m "feat: add new component"
```

Use conventional commit messages:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting
- `refactor:` for code refactoring
- `test:` for tests
- `chore:` for maintenance

### 4. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Create a pull request with:
- Clear title and description
- Reference related issues
- Include screenshots/videos if applicable
- Fill out the PR template

### 5. Review Process

- Maintainers will review your PR
- Address feedback promptly
- Keep your PR up to date with main branch
- Ensure CI checks pass

## 🐛 Issue Guidelines

### Bug Reports

Use the bug report template and include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Code sample (if applicable)

### Feature Requests

Use the feature request template and include:
- Clear problem statement
- Proposed solution
- Use cases and examples
- API design considerations

## 📏 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Use strict type checking
- Document complex types

### React Native

- Follow React Native best practices
- Use functional components with hooks
- Implement proper prop types
- Handle platform differences

### Code Style

- Use Prettier for formatting
- Follow ESLint rules
- Use meaningful variable names
- Write self-documenting code
- Add comments for complex logic

### File Organization

```
src/
├── components/
│   └── componentName/
│       ├── ComponentName.tsx
│       ├── ComponentName.types.ts
│       ├── ComponentName.stories.tsx
│       └── README.md
├── types/
├── utils/
└── index.ts
```

## 🧪 Testing

### Test Requirements

- Write unit tests for new components
- Test different variants (core, tailwind, stylesheet, hybrid)
- Test on different platforms (iOS, Android, Web)
- Maintain test coverage above 80%

### Running Tests

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:coverage
```

### Test Structure

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });
  
  it('should handle props correctly', () => {
    // Test implementation
  });
});
```

## 📚 Documentation

### Component Documentation

Each component should have:
- README.md with usage examples
- Props documentation
- Storybook stories
- TypeScript types

### README Template

```markdown
# ComponentName

Brief description of the component.

## Usage

```tsx
import { ComponentName } from 'chill-ui';

<ComponentName prop1="value" prop2={true} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | - | Description |
| prop2 | boolean | false | Description |

## Examples

### Basic Usage
[Example code]

### Advanced Usage
[Example code]
```

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release PR
4. Merge to main branch
5. Create and push tag
6. GitHub Actions handles the rest

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

## 📞 Getting Help

- 💬 [GitHub Discussions](https://github.com/amirmeb/chill-ui/discussions)
- 🐛 [GitHub Issues](https://github.com/amirmeb/chill-ui/issues)
- 📧 Email: amir.meb398@gmail.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Chill UI! 🙏
