import { array } from 'fp-ts/lib/Array'
import { getMonoid } from 'fp-ts/lib/Applicative'
import { monoidSum, monoidString } from 'fp-ts/lib/Monoid'
import { getApplicative } from 'fp-ts/lib/Const'

describe('Applicative', () => {
  describe('of', () => {
    test('array.of', () => {
      expect(array.of(3)).toEqual([3])
      expect(array.of('foo')).toEqual(['foo'])
    })

    test('string as monoid', () => {
      const stringApplicative = getApplicative(monoidString)
      const M = getMonoid(stringApplicative, monoidSum)()
      expect(M.empty).toEqual({ value: '' })
    })
  })
})
