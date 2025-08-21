# String Component

A flexible and performant text component for React Native that provides consistent typography and styling options.

## Features

- **Consistent Typography**: Predefined variants for size, weight, and color.
- **StyleSheet and NativeWind Support**: Automatically detects if NativeWind is installed and uses the appropriate styling engine.
- **Customizable**: Easily override styles with custom colors, fonts, and more.
- **TypeScript Support**: Fully typed for a better development experience.

## Quick Start

```tsx
import String from './String';

// Basic usage with default styles
<String>Hello, World!</String>

// Customized with variants
<String size="lg" colorVariant="primary" weight="bold">
  Welcome!
</String>

// Custom color and alignment
<String color="#FF0000" position="center" size="xl">
  Centered and Red
</String>
```

## Configuration with NativeWind

When using the `String` component with NativeWind, you must define your application's color palette and font families in your `tailwind.config.js` file.

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

The `String` component is designed to work seamlessly with custom fonts. The setup process involves loading the fonts into your application and, if you're using NativeWind, configuring them in your Tailwind CSS setup.

### Step 1: Loading Fonts with Expo Font

Regardless of whether you use NativeWind, you must first load your custom fonts using a library like `expo-font`.

The `String` component combines the `font` and `weight` props to select the correct font family. To make this work, you must follow a specific naming convention for the keys when you load your fonts: `{font-name}_{weight}_font`.

For example, if you want to use `<String font="primary" weight="bold">`, you must load a font with the key `primary_bold_font`.

The available `weight` options are: `'normal'`, `'medium'`, `'semibold'`, `'bold'`, `'light'`, `'thin'`, `'extraLight'`, `'extraBold'`, `'italic'`, and `'regular'`.

Here is an example of how to load fonts in your `App.tsx`:

```tsx
import { useFonts } from 'expo-font';
import String from './path/to/String';

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
      <String font="primary" weight="bold">
        Primary Bold Font
      </String>

      <String font="secondary" weight="medium">
        Secondary Medium Font
      </String>
    </>
  );
}
```

### Step 2: Configuring for NativeWind (Optional)

If you are using NativeWind and want to apply your custom fonts using utility classes (e.g., `className="font-primary_bold_font"`), you must also define them in your `tailwind.config.js` file. The names in the configuration must match the keys you used with `expo-font`.

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

## Default Color Variants

If you are not using NativeWind, the `String` component falls back to a predefined set of colors. The following table lists the available `colorVariant` options and their default hex color codes:

| Variant     | Color     |
| ----------- | --------- |
| `primary`   | `#000000` |
| `secondary` | `#CBD2D9` |
| `success`   | `#86EFAC` |
| `warning`   | `#FCD34D` |
| `error`     | `#FF0000` |
| `danger`    | `#FF0000` |
| `info`      | `#6EE7B7` |
| `tertiary`  | `#8B5CF6` |
| `dark`      | `#323F4B` |
| `light`     | `#F5F7FA` |
| `white`     | `#FFFFFF` |

## Props

| Prop           | Type                                                            | Default     | Description                                              |
| -------------- | --------------------------------------------------------------- | ----------- | -------------------------------------------------------- |
| `children`     | `ReactNode`                                                     | -           | Text content to display.                                 |
| `className`    | `string`                                                        | -           | Custom CSS classes (used with NativeWind).               |
| `color`        | `string`                                                        | -           | Custom text color (e.g., hex, rgb).                      |
| `colorVariant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Predefined color variant.                                |
| `font`         | `'primary' \| 'secondary' \| 'tertiary'`                        | `'primary'` | Font family to use.                                      |
| `position`     | `'left' \| 'center' \| 'right' \| 'justify'`                    | `'left'`    | Text alignment.                                          |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'`        | `'sm'`      | Text size variant.                                       |
| `style`        | `StyleProp<TextStyle>`                                          | -           | Additional inline styles.                                |
| `variant`      | `string`                                                        | `'body-1'`  | Predefined text variant for special styling.             |
| `weight`       | `'normal' \| 'medium' \| 'semibold' \| 'bold'`                  | -           | Font weight.                                             |
| `...rest`      | `TextProps`                                                     | -           | Any other props accepted by the native `Text` component. |
