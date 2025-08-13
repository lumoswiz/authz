export const append = <T>(xs: Array<T>, extras?: ReadonlyArray<T>): Array<T> =>
  extras && extras.length ? xs.concat(extras) : xs
