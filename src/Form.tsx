import { Either, left, right } from 'fp-ts/lib/Either'

const minLength = (s: string): Either<string, string> =>
  s.length >= 6 ? right(s) : left('at least 6 characters')

const oneCapital = (s: string): Either<string, string> =>
  /[A-Z]/g.test(s) ? right(s) : left('at least one capital letter')

const oneNumber = (s: string): Either<string, string> =>
  /[0-9]/g.test(s) ? right(s) : left('at least one number')

const validatePassword = (s: string): Either<string, string> =>
  minLength(s)
    .chain(oneCapital)
    .chain(oneNumber)

const exhaustiveCheck = (_: never): void => {}

type Fruit = 'banana' | 'apple' | 'orange'

export const exhaustive = (fr: Fruit) => {
  switch (fr) {
    case 'banana':
      return 'smash'
    // default:
    //   exhaustiveCheck(fr)
  }
}
