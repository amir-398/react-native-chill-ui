/**
 * Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned.
 * @param obj The object to query
 * @param path The path of the property to get
 * @param defaultValue The value returned for undefined resolved values
 */
export const get = (obj: any, path: string | string[] | number | symbol, defaultValue?: any): any => {
  if (obj == null) return defaultValue;

  const pathArray = Array.isArray(path)
    ? path
    : String(path)
        .split(/[,[\].]+?/)
        .filter(Boolean);

  return (
    pathArray.reduce((result, key) => {
      if (result == null) return defaultValue;
      return result[key];
    }, obj) ?? defaultValue
  );
};

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 */
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): T & { cancel: () => void } => {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    return new Promise<ReturnType<T>>(resolve => {
      timeout = setTimeout(() => {
        const result = func(...args);
        resolve(result);
      }, wait);
    });
  };

  // Add cancel method to match lodash's debounce
  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced as T & { cancel: () => void };
};

/**
 * Assigns own enumerable properties of source objects to the destination object
 * @param obj The destination object
 * @param sources The source objects
 */
export const assign = <T extends object>(obj: T, ...sources: Partial<T>[]): T => Object.assign({}, obj, ...sources);

/**
 * Performs a deep comparison between two values to determine if they are equivalent
 * @param value The value to compare
 * @param other The other value to compare
 */
export const isEqual = (value: any, other: any): boolean => {
  if (value === other) return true;
  if (value == null || other == null) return false;
  if (typeof value !== 'object' || typeof other !== 'object') return false;

  const keysA = Object.keys(value);
  const keysB = Object.keys(other);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(key => {
    if (!Object.prototype.hasOwnProperty.call(other, key)) return false;
    return isEqual(value[key], other[key]);
  });
};

/**
 * Returns the index of the first element predicate returns truthy for
 * @param sourceArray The array to search
 * @param predicate The function invoked per iteration
 */
export const findIndex = <T>(sourceArray: T[], predicate: (value: T, index: number, array: T[]) => boolean): number =>
  sourceArray.findIndex(predicate);

/**
 * Creates an array of array values not included in the other given arrays using a custom comparator
 * @param array The array to inspect
 * @param values The values to exclude
 * @param comparator The custom comparator
 */
export const differenceWith = <T>(sourceArray: T[], values: T[], comparator: (arrVal: T, othVal: T) => boolean): T[] =>
  sourceArray.filter(arrVal => !values.some(othVal => comparator(arrVal, othVal)));

export const isBoolean = (value: any): value is boolean => typeof value === 'boolean';

export const isUndefined = (value: any): value is undefined => value === undefined;
