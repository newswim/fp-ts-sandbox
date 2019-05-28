import { Lens } from 'monocle-ts'

export const lensesFromRecord = <
  A extends { [key: string]: unknown },
  K extends keyof A & string,
  LensRecord extends { [P in K]: Lens<A, A[P]> },
  LensRecord_ extends { [key: string]: Lens<A, A[K]> }
>(
  x: A
): LensRecord => {
  const result = {} as LensRecord & LensRecord_

  for (const k of Object.keys(x)) {
    result[k] = Lens.fromProp<A>()(k as K)
  }

  return result
}

export function compose<A, B, C>(g: (b: B) => C, f: (a: A) => B): (a: A) => C {
  return a => g(f(a))
}
