# String Component

A flexible and performant text component for React Native that provides consistent typography and styling options across three different styling approaches.

> **Note**: There is a typo in the filename `styleVatiants.ts` which should be `styleVariants.ts`. This will be corrected in a future version to avoid breaking changes.

## Available Versions

This component comes in three versions to match your project's styling approach. You choose the version during installation, but the import statement remains consistent across all versions:

### 1. **StyleSheet Version**

- Uses React Native's built-in StyleSheet API
- Perfect for projects that don't use CSS-in-JS libraries
- Lightweight and performant
- Install: `npm install react-native-chill-ui@stylesheet`

### 2. **Tailwind Version**

- Uses NativeWind/Tailwind CSS classes
- Ideal for projects already using Tailwind CSS
- Requires NativeWind setup and Tailwind configuration
- Install: `npm install react-native-chill-ui@tailwind`

### 3. **Hybrid Version**

- Automatically detects if NativeWind is available
- Falls back to StyleSheet if NativeWind is not installed
- Best for component libraries or projects that need flexibility
- Install: `npm install react-native-chill-ui@hybrid`

**Note**: Regardless of the version you choose, the import statement remains the same: `import { String } from 'react-native-chill-ui'`

## Features

- **Consistent Typography**: Predefined variants for size, weight, and color across all versions.
- **Multiple Styling Approaches**: Choose the version that matches your project's needs.
- **Customizable**: Easily override styles with custom colors, fonts, and more.
- **TypeScript Support**: Fully typed for a better development experience.

## Quick Start

```tsx
import { String } from 'react-native-chill-ui';

// Basic usage with default styles
<String>Hello, World!</String>

// Customized with variants
<String size="lg" colorVariant="primary" font="primaryBold">
  Welcome!
</String>

// Custom color and alignment
<String color="#FF0000" position="center" size="xl">
  Centered and Red
</String>
```

## Choosing the Right Version

Select the appropriate version during installation based on your project's needs:

| Version        | Installation Command                           | Use When                                                                                             | Pros                                                                            | Cons                                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **StyleSheet** | `npm install react-native-chill-ui@stylesheet` | • No CSS-in-JS dependencies<br/>• Maximum performance needed<br/>• Simple styling requirements       | • Lightweight<br/>• Fast performance<br/>• No external dependencies             | • Less flexible<br/>• Manual theme management         |
| **Tailwind**   | `npm install react-native-chill-ui@tailwind`   | • Already using NativeWind<br/>• Team familiar with Tailwind<br/>• Design system based on utilities  | • Consistent with web Tailwind<br/>• Powerful utility system<br/>• Easy theming | • Requires NativeWind setup<br/>• Larger bundle size  |
| **Hybrid**     | `npm install react-native-chill-ui@hybrid`     | • Building component library<br/>• Uncertain about styling approach<br/>• Want maximum compatibility | • Works in any environment<br/>• Future-proof<br/>• Automatic detection         | • Slightly larger bundle<br/>• More complex internals |

## Configuration

### For Tailwind and Hybrid Versions

When using the Tailwind or Hybrid versions, you must define your application's color palette and font families in your `tailwind.config.js` file.

### Colors

The `colorVariant` prop values (e.g., `'primary'`, `'secondary'`) correspond to the keys in the `theme.extend.colors` section of your configuration. You should define all the color variants used by the component:

```javascript
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
        primary: 'your_color',
        secondary: 'your_color',
        success: 'your_color',
        warning: 'your_color',
        error: 'your_color',
        danger: 'your_color',
        info: 'your_color',
        tertiary: 'your_color',
        dark: 'your_color',
        light: 'your_color',
        white: 'your_color',
        disabled: 'your_color',
        inverted: 'your_color',
        muted: 'your_color',
        neutral: 'your_color',
      },
    },
  },
};
```

## Custom Fonts

The `String` component is designed to work seamlessly with custom fonts across all versions. The setup process involves loading the fonts into your application and, depending on your version choice, additional configuration.

### Step 1: Loading Fonts with Expo Font

For all versions (StyleSheet, Tailwind, and Hybrid), you must first load your custom fonts using a library like `expo-font`.

The `String` component uses the `font` prop to select the correct font family and weight combination. To make this work, you must follow a specific naming convention for the keys when you load your fonts: `{font-name}_{weight}_font`.

For example, if you want to use `<String font="primaryBold">`, you must load a font with the key `primary_bold_font`.

### Available Font Options

**Font options** (for the `font` prop):

**Primary fonts:**

- `primaryRegular`
- `primaryLight`
- `primaryMedium`
- `primarySemiBold`
- `primaryBold`
- `primaryExtraLight`
- `primaryExtraBold`
- `primaryThin`
- `primaryItalic`

**Secondary fonts:**

- `secondaryRegular`
- `secondaryLight`
- `secondaryMedium`
- `secondarySemiBold`
- `secondaryBold`
- `secondaryExtraLight`
- `secondaryExtraBold`
- `secondaryThin`
- `secondaryItalic`

**Tertiary fonts:**

- `tertiaryRegular`
- `tertiaryLight`
- `tertiaryMedium`
- `tertiarySemiBold`
- `tertiaryBold`
- `tertiaryExtraLight`
- `tertiaryExtraBold`
- `tertiaryThin`
- `tertiaryItalic`

Here is an example of how to load fonts in your `App.tsx`:

```tsx
import { useFonts } from 'expo-font';
import { String } from 'react-native-chill-ui';

export default function App() {
  const [fontsLoaded] = useFonts({
    // Primary Font
    primary_regular_font: require('./assets/fonts/YourPrimary-Regular.ttf'),
    primary_bold_font: require('./assets/fonts/YourPrimary-Bold.ttf'),
    primary_light_font: require('./assets/fonts/YourPrimary-Light.ttf'),

    // Secondary Font
    secondary_regular_font: require('./assets/fonts/YourSecondary-Regular.ttf'),
    secondary_medium_font: require('./assets/fonts/YourSecondary-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  return (
    <>
      <String font="primaryBold">Primary Bold Font</String>

      <String font="secondaryMedium">Secondary Medium Font</String>
    </>
  );
}
```

### Step 2: Additional Configuration for Tailwind and Hybrid Versions

If you are using the **Tailwind** or **Hybrid** versions and want to apply your custom fonts using utility classes (e.g., `className="font-primary_bold_font"`), you must also define them in your `tailwind.config.js` file. The names in the configuration must match the keys you used with `expo-font`.

**Note**: This step is not required for the **StyleSheet** version.

Here's an example configuration:

```javascript
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      fontFamily: {
        // Primary font
        primary_regular_font: ['YourPrimaryFont-Regular'],
        primary_bold_font: ['YourPrimaryFont-Bold'],

        // Secondary font
        secondary_regular_font: ['YourSecondaryFont-Regular'],
        secondary_medium_font: ['YourSecondaryFont-Medium'],
      },
    },
  },
};
```

## Colors

### Color Variants (NativeWind only)

The `colorVariant` prop is only available for **Tailwind** and **Hybrid** versions when NativeWind is installed:

`primary`, `secondary`, `tertiary`, `success`, `warning`, `error`, `danger`, `info`, `dark`, `light`, `white`, `disabled`, `inverted`, `muted`, `neutral`

These must be defined in your `tailwind.config.js` file.

### For All Versions

All versions support the `color` prop to set custom colors directly:

```tsx
<String color="#FF0000">Red text</String>
<String color="rgb(255, 0, 0)">Red text</String>
```

## Text Variants and Sizes

The String component supports two types of variants: **body** and **title** variants. Each variant has predefined font sizes:

### Body Variants

- `body-xs`: 12px
- `body-sm`: 14px
- `body-1`: 16px (default)
- `body-2`: 18px
- `body-3`: 20px

### Title Variants

- `title-1`: 24px
- `title-2`: 30px
- `title-3`: 36px
- `title-4`: 48px
- `title-5`: 60px
- `title-6`: 72px
- `title-7`: 96px
- `title-8`: 128px

Title variants automatically use bold font weight, while body variants use regular weight by default (unless overridden with the `weight` prop).

## Usage Examples

### Basic Text Display

```tsx
import { String } from 'react-native-chill-ui';

// Simple text
<String>Hello, World!</String>

// With size variant
<String size="lg">Large Text</String>

// With title variant
<String variant="title-1">Page Title</String>
```

### Styling with Colors

```tsx
// Using color variants
<String colorVariant="primary">Primary Color</String>
<String colorVariant="success">Success Message</String>
<String colorVariant="error">Error Message</String>

// Using custom colors
<String color="#FF5733">Custom Color</String>
<String color="rgb(100, 150, 200)">RGB Color</String>
```

### Font and Weight Customization

```tsx
// Using different fonts
<String font="primaryBold">Bold Primary Font</String>
<String font="secondaryRegular">Regular Secondary Font</String>

// Using weight prop
<String weight="bold">Bold Text</String>
<String weight="light">Light Text</String>
```

### Text Alignment

```tsx
// Left aligned (default)
<String position="left">Left Aligned</String>

// Center aligned
<String position="center">Center Aligned</String>

// Right aligned
<String position="right">Right Aligned</String>
```

### Combined Props

```tsx
// Multiple props together
<String
  variant="title-2"
  colorVariant="primary"
  font="primaryBold"
  position="center"
>
  Styled Title
</String>

// With custom styles
<String
  size="xl"
  color="#1E90FF"
  style={{ marginBottom: 16, lineHeight: 24 }}
>
  Customized Text
</String>
```

## Props

| Prop           | Type                                                                                                                                                                                    | Default     | Description                                              |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------- |
| `children`     | `ReactNode`                                                                                                                                                                             | -           | Text content to display.                                 |
| `className`    | `string`                                                                                                                                                                                | -           | Custom CSS classes (used with NativeWind).               |
| `color`        | `string`                                                                                                                                                                                | -           | Custom text color (e.g., hex, rgb).                      |
| `colorVariant` | `'primary' \| 'secondary' \| 'tertiary' \| 'success' \| 'warning' \| 'error' \| 'danger' \| 'info' \| 'dark' \| 'light' \| 'white' \| 'disabled' \| 'inverted' \| 'muted' \| 'neutral'` | `'primary'` | Predefined color variant.                                |
| `font`         | `'primary' \| 'secondary' \| 'tertiary'`                                                                                                                                                | `'primary'` | Font family to use.                                      |
| `position`     | `'left' \| 'center' \| 'right'`                                                                                                                                                         | `'left'`    | Text alignment.                                          |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl' \| '6xl' \| '7xl' \| '8xl' \| '9xl'`                                                                          | `'md'`      | Text size variant.                                       |
| `style`        | `StyleProp<TextStyle>`                                                                                                                                                                  | -           | Additional inline styles.                                |
| `variant`      | `'body-1' \| 'body-2' \| 'body-3' \| 'body-sm' \| 'body-xs' \| 'title-1' \| 'title-2' \| 'title-3' \| 'title-4' \| 'title-5' \| 'title-6' \| 'title-7' \| 'title-8'`                    | `'body-1'`  | Predefined text variant for special styling.             |
| `weight`       | `'regular' \| 'light' \| 'medium' \| 'semiBold' \| 'bold' \| 'extraLight' \| 'extraBold' \| 'thin' \| 'italic'`                                                                         | `'regular'` | Font weight.                                             |
| `...rest`      | `TextProps`                                                                                                                                                                             | -           | Any other props accepted by the native `Text` component. |
