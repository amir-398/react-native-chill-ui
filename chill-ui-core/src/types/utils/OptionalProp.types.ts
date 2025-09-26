/**
 * Makes a specific property optional in a type
 * @template T - The original type
 * @template K - The key(s) to make optional
 * @example
 * type User = { name: string; age: number; email: string };
 * type UserWithOptionalName = OptionalProp<User, 'name'>; // { name?: string; age: number; email: string }
 * type UserWithOptionalNameAndAge = OptionalProp<User, 'name' | 'age'>; // { name?: string; age?: number; email: string }
 */
export type OptionalProp<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
