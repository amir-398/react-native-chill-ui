# 🧊 ChillUI

<div align="center">

**A modern, flexible React Native UI component library with dual styling support**

[![npm version](https://img.shields.io/npm/v/chillui.svg)](https://www.npmjs.com/package/chillui)
[![npm downloads](https://img.shields.io/npm/dm/chillui.svg)](https://www.npmjs.com/package/chillui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

[Documentation](#-documentation) • [Components](#-components) • [Installation](#-installation) • [Contributing](./github/CONTRIBUTING.md)

</div>

---

## ✨ Features

- 🎨 **Dual Styling System** - Choose between NativeWind/Tailwind or React Native StyleSheet
- 📦 **32+ Production-Ready Components** - From basic inputs to complex carousels
- 🎯 **TypeScript First** - Full type safety and IntelliSense support
- 🌐 **Cross-Platform** - Works seamlessly on iOS, Android, and Web
- ♿ **Accessible** - Built with accessibility in mind
- 🎭 **Customizable** - Extensive theming and styling options
- 📱 **Responsive** - Adapts to different screen sizes
- ⚡ **Performant** - Optimized for smooth 60fps animations
- 🧪 **Well Tested** - Comprehensive test coverage

## 📦 Packages

ChillUI is available in two flavors to match your styling preference:

| Package | Description | Bundle Size |
|---------|-------------|-------------|
| [`chillui`](https://www.npmjs.com/package/chillui) | **Tailwind/NativeWind variant** - Modern utility-first styling | ![npm bundle size](https://img.shields.io/bundlephobia/minzip/chillui) |
| [`chillui-native`](https://www.npmjs.com/package/chillui-native) | **StyleSheet variant** - React Native's built-in styling | ![npm bundle size](https://img.shields.io/bundlephobia/minzip/chillui-native) |

Both packages provide the same components with identical APIs - just different styling approaches.

## 🚀 Quick Start

### Installation

Choose the package that matches your styling preference:

#### Option 1: Tailwind/NativeWind (Recommended)

```bash
# npm
npm install chillui react-native-svg

# yarn
yarn add chillui react-native-svg

# bun
bun add chillui react-native-svg
```

#### Option 2: React Native StyleSheet

```bash
# npm
npm install chillui-native react-native-svg

# yarn
yarn add chillui-native react-native-svg

# bun
bun add chillui-native react-native-svg
```



## 🎨 Components

### Layout & Structure
- **Box** - Flexible container with layout utilities
- **Wrapper** - Safe area and keyboard-aware containers
- **Separator** - Visual dividers

### Inputs & Forms
- **Input** - Text input with validation
- **MaskedInput** - Formatted input (phone, credit card, etc.)
- **PhoneNumberInput** - International phone number input with country picker
- **PlacesInput** - Google Places autocomplete
- **Checkbox** - Checkbox with custom styling
- **Toggle** - Switch/toggle component
- **Slider** - Range slider with single/dual handles
- **TimePicker** - Time selection component
- **InputDropdown** - Dropdown with search
- **InputSelectDropdown** - Select dropdown
- **AutocompleteDropdown** - Autocomplete with suggestions

### Buttons & Actions
- **Button** - Primary action button
- **ButtonIcon** - Icon-only button
- **RipplePressable** - Material Design ripple effect
- **ScalePressable** - Scale animation on press

### Display & Feedback
- **Avatar** - User profile image
- **Chip** - Tag/badge component
- **Icon** - Icon component with custom SVG support
- **String/Text** - Styled text component
- **Skeleton** - Loading placeholder
- **LoadingIndicatorsKit** - 10+ loading animations (Spinner, Pulse, Bounce, Chase, etc.)
- **Toast** - Notification toast
- **HighlightString** - Text highlighting

### Navigation & Organization
- **Accordion** - Collapsible content sections
- **Carousel** - Image/content carousel
- **SegmentedControl** - Tab-like segmented control
- **DropdownMenu** - Context menu dropdown

### Overlays & Modals
- **Dialog** - Modal dialog

### Animation
- **AnimatedBox** - Base animated container
- **FadeInBox** - Fade in animation
- **SlideInBox** - Slide in animation
- **ScaleInBox** - Scale in animation
- **BounceBox** - Bounce animation
- **RotatingBox** - Rotation animation

## 📖 Documentation

### Component Documentation

Each component has detailed documentation with:
- Props API reference
- Usage examples
- Styling guide
- Accessibility notes

Find component READMEs in:
```
packages/chill-ui-core/src/components/<component-name>/README.md
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.

MIT © [Amir Meberbeche](https://github.com/amir-398)

## 🙏 Acknowledgments

Built with:
- [React Native](https://reactnative.dev/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [NativeWind](https://www.nativewind.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

- 🐛 [Report a Bug](https://github.com/chillui/chill-ui/issues/new?template=bug_report.md)
- 💡 [Request a Feature](https://github.com/chillui/chill-ui/issues/new?template=feature_request.md)
- 💬 [Discussions](https://github.com/chillui/chill-ui/discussions)
- 📧 Email: amir.398@hotmail.fr

---

<div align="center">

**Made with ❤️ by [Amir Meberbeche](https://github.com/amir-398)**

If you find this library useful, please consider giving it a ⭐️!

</div>
