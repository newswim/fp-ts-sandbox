import { lookup, map } from 'fp-ts/lib/Record'
import { some, none } from 'fp-ts/lib/Option'
// import { record } from 'fp-ts'

describe('Record', () => {
  const rec = {
    foo: 1,
    bar: 2,
  }

  describe('lookup', () => {
    test('return a some(value) when given a valid key', () => {
      expect(lookup('foo', rec)).toEqual(some(1))
    })

    test('return none when given invalid key', () => {
      expect(lookup('baz', rec)).toEqual(none)
    })
  })

  describe('map', () => {
    test('', () => {
      expect(map(rec, v => v + 1)).toEqual({
        foo: 2,
        bar: 3,
      })
    })
  })
})
