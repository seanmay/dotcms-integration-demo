export type Identity<T> = (x: T) => T;
export type Tap = <T extends any>(f: <U extends T>(x: U) => any) => Identity<T>;

export const tap: Tap = (f) => (x) => {
  f(x);
  return x;
};
