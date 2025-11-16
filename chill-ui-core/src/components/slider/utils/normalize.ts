import { Animated } from 'react-native';
import { SliderRootPropsTw } from '@types';

export const normalizeValue = (props: SliderRootPropsTw, value: number | number[]) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return [0];
  }
  const { maximumValue = 100, minimumValue = 0 } = props;
  const getBetweenValue = (inputValue: number) => Math.max(Math.min(inputValue, maximumValue), minimumValue);
  if (!Array.isArray(value)) {
    return [getBetweenValue(value)];
  }
  return value.map(getBetweenValue).sort((a, b) => a - b);
};

export const updateValues = ({
  values,
  newValues = values,
}: {
  values: (number | Animated.Value)[];
  newValues?: (number | Animated.Value)[];
}): (number | Animated.Value)[] => {
  if (Array.isArray(newValues) && Array.isArray(values) && newValues.length !== values.length) {
    return updateValues({
      // eslint-disable-next-line
      values: newValues.map(v => new Animated.Value(typeof v === 'number' ? v : (v as any).__getValue())),
    });
  }
  if (Array.isArray(values) && Array.isArray(newValues)) {
    return values?.map((value, index) => {
      let valueToSet = newValues[index];
      if ((value as any) instanceof Animated.Value) {
        if ((valueToSet as any) instanceof Animated.Value) {
          // eslint-disable-next-line
          valueToSet = (valueToSet as any).__getValue();
        }
        (value as any).setValue(valueToSet as number);
        return value;
      }
      if ((valueToSet as any) instanceof Animated.Value) {
        return valueToSet;
      }
      return new Animated.Value(valueToSet as number);
    });
  }
  return [new Animated.Value(0)];
};

export const indexOfLowest = (values: number[]) => {
  let lowestIndex = 0;
  values.forEach((value, index, array) => {
    if (value < array[lowestIndex]) {
      lowestIndex = index;
    }
  });
  return lowestIndex;
};
