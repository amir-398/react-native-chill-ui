# Slider Usage Examples

## Mode non-contrôlé (Uncontrolled) - Recommandé pour la simplicité

Le slider gère son propre état en interne. Idéal pour des cas simples.

```tsx
import { Slider, SliderTrack, SliderRange, SliderThumb, SliderLabel } from 'react-native-chill-ui';

// Exemple 1: Slider basique sans props
function BasicSlider() {
  return (
    <Slider>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
}

// Exemple 2: Slider avec valeur initiale
function SliderWithDefault() {
  return (
    <Slider 
      defaultValue={50} 
      minimumValue={0} 
      maximumValue={100}
    >
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
}

// Exemple 3: Slider avec callback pour suivre les changements
function SliderWithCallback() {
  const handleChange = (values: number[]) => {
    console.log('Nouvelle valeur:', values[0]);
  };

  return (
    <Slider 
      defaultValue={0.5}
      minimumValue={0}
      maximumValue={1}
      step={0.1}
      onValueChange={handleChange}
    >
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
      <SliderLabel position="top">{Math.round(values[0] * 100)}%</SliderLabel>
    </Slider>
  );
}
```

## Mode contrôlé (Controlled) - Pour un contrôle total

Vous gérez l'état vous-même. Utile pour synchroniser avec d'autres composants.

```tsx
import { useState } from 'react';
import { Slider, SliderTrack, SliderRange, SliderThumb, SliderLabel } from 'react-native-chill-ui';

function ControlledSlider() {
  const [value, setValue] = useState([50]);

  return (
    <View>
      <Text>Valeur actuelle: {value[0]}</Text>
      
      <Slider 
        value={value}
        onValueChange={setValue}
        minimumValue={0}
        maximumValue={100}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <Button title="Reset" onPress={() => setValue([50])} />
    </View>
  );
}
```

## Range Slider (Multi-thumb)

```tsx
// Mode non-contrôlé
function RangeSlider() {
  return (
    <Slider 
      defaultValue={[20, 80]}
      minimumValue={0}
      maximumValue={100}
    >
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0} />
      <SliderThumb index={1} />
    </Slider>
  );
}

// Mode contrôlé
function ControlledRangeSlider() {
  const [range, setRange] = useState([20, 80]);

  return (
    <Slider 
      value={range}
      onValueChange={setRange}
      minimumValue={0}
      maximumValue={100}
    >
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0} />
      <SliderThumb index={1} />
      <SliderLabel index={0} position="top">{range[0]}</SliderLabel>
      <SliderLabel index={1} position="top">{range[1]}</SliderLabel>
    </Slider>
  );
}
```

## Props principales

### Slider (Root)

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `number \| number[]` | - | Valeur contrôlée (mode contrôlé) |
| `defaultValue` | `number \| number[]` | `minimumValue` | Valeur initiale (mode non-contrôlé) |
| `minimumValue` | `number` | `0` | Valeur minimum |
| `maximumValue` | `number` | `1` | Valeur maximum |
| `step` | `number` | `0` | Incrément des valeurs (0 = continu) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation du slider |
| `isDisabled` | `boolean` | `false` | Désactive le slider |
| `onValueChange` | `(values, index) => void` | - | Callback lors du changement |
| `onSlidingStart` | `(values, index) => void` | - | Callback au début du slide |
| `onSlidingComplete` | `(values, index) => void` | - | Callback à la fin du slide |

## Différences entre les deux modes

| Aspect | Non-contrôlé | Contrôlé |
|--------|--------------|----------|
| **Gestion de l'état** | Interne au composant | Externe (vous gérez) |
| **Props requises** | Aucune ou `defaultValue` | `value` + `onValueChange` |
| **Complexité** | Simple | Plus complexe |
| **Cas d'usage** | Formulaires simples | Synchronisation d'état, validation complexe |

## ⚠️ Note importante

**Vous ne pouvez pas mélanger les deux modes.** Si vous passez `value`, le slider devient contrôlé et `defaultValue` sera ignoré.
