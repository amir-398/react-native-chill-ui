// Check if the value is a string
export const isString = (value: any): value is string => typeof value === 'string';

export const isNumber = (value: any): value is number => typeof value === 'number';

export const getStringLength = (value: string) => value.length;

export const limitStringLength = (value: string, limit: number) => {
  const newValue = value.slice(0, limit);
  if (getStringLength(value) > limit) {
    return `${newValue}...`;
  }
  return value;
};

export const formatToLowerCase = (value: string) => value.toLowerCase();

export const formatToUpperCase = (value: string) => value.toUpperCase();

export const formatToCapitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
