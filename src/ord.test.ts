import { clamp, fromCompare, ordString, contramap } from 'fp-ts/lib/Ord'
import { sort } from 'fp-ts/lib/Array'

describe('Ord', () => {
  describe('clamp', () => {
    test('should camp values between min and max', () => {})
  })

  describe('sort', () => {
    test('sorting array of objects by key', () => {
      type Foo = {
        foo: string
      }
      const unsorted: Array<Foo> = [
        { foo: 'a' },
        { foo: 'd' },
        { foo: 'c' },
        { foo: 'b' },
      ]
      const sorted: Array<Foo> = [
        { foo: 'a' },
        { foo: 'b' },
        { foo: 'c' },
        { foo: 'd' },
      ]

      const ordFoo = contramap((d: Foo) => d['foo'], ordString)
      const sortFoo = sort(ordFoo)
      expect(sorted).toEqual(sortFoo(unsorted))
    })
  })
})
