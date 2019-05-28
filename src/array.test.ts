import {
  array,
  comprehension,
  filter,
  head,
  traverse,
  lookup,
  uniq,
} from 'fp-ts/lib/Array'
import { identity } from 'fp-ts/lib/function'
import { Option, option, none, some, isSome } from 'fp-ts/lib/Option'
import { Lens, fromTraversable } from 'monocle-ts'
import { indexArray } from 'monocle-ts/lib/Index/Array'
import { setoidString } from 'fp-ts/lib/Setoid'

// You have an option
// You have an array of options
// You have an optional array
// You have an optional array of options

// Do finding (match)
// Do set
// Do map
// Do sequence
// Do traverse

interface Name {
  first: string
  last: string
}
interface User {
  streetAddress: string
  name: Name
}

const user0: Option<User> = some({
  name: { first: 'Jane', last: 'Doe' },
  streetAddress: '123 Traversable ST',
})

const user1: Option<User> = none

const user2: Option<User> = some({
  name: { first: 'John', last: 'Smith' },
  streetAddress: '999 FP-TS BLVD',
})

function compose<A, B, C>(g: (b: B) => C, f: (a: A) => B): (a: A) => C {
  return a => g(f(a))
}

it('Arrays of Options', () => {
  it('array.sequence(option) filters out none', () => {
    const userOptions: Array<Option<User>> = [user0, user1, user2]
    const result = array.sequence(option)(userOptions)
    expect(result).toEqual(none)
  })

  it('', () => {
    const userOptions: Array<Option<User>> = [user0, user2]
    const result = array.sequence(option)(userOptions)

    expect(result.getOrElse([]).length).toEqual(2)
  })

  it('how to filter out nones', () => {
    const userOptions = [user0, user1, user2]
    const result1 = filter(userOptions, isSome)
    const result2 = array.compact(userOptions)

    expect(result1.length).toEqual(2)
    expect(result2.length).toEqual(2)
  })
})

describe('Array utility functions', () => {
  describe('lens into an array', () => {
    test('traversable lens', () => {
      type SpecInfo = {
        key: string
        version: number
      }
      type Configuration = {
        name: string
        versions: Array<SpecInfo>
      }

      const nameLens = Lens.fromProp<Configuration>()('name')
      const versLens = Lens.fromProp<Configuration>()('versions')
      const specInfoTraversable = fromTraversable(array)<SpecInfo>()
      const keyLens = Lens.fromProp<SpecInfo>()('key')
      const verLens = Lens.fromProp<SpecInfo>()('version')
      const composedVersionLens = versLens
        .composeTraversal(specInfoTraversable)
        .composeLens(verLens)

      const configurations: Array<Configuration> = [
        {
          name: 'Foo1',
          versions: [
            {
              key: '5c69fa09512a37000e000000',
              version: 1,
            },
          ],
        },
        {
          name: 'Foo2',
          versions: [
            {
              key: '5c66db8e0c5c0d000e000000',
              version: 1,
            },
            {
              key: '5c8da8ac85fe97000e000000',
              version: 2,
            },
          ],
        },
        {
          name: 'Foo3',
          versions: [
            {
              key: '5c64ca857f6f61000e000000',
              version: 1,
            },
            {
              key: '5c69572273bf9b000e000000',
              version: 2,
            },
            {
              key: '5c69579073bf9b000e000001',
              version: 3,
            },
          ],
        },
      ]

      const result = head(configurations)
        .chain(c => head(c.versions))
        .chain(keyLens.asOptional().getOption)

      expect(result).toEqual(some('5c69fa09512a37000e000000'))
    })
  })

  describe('uniq', () => {
    test('should return an array with dupes removed', () => {
      const arr = ['foo', 'bar', 'bar']
      const result = ['foo', 'bar']
      const uniqueStringArr = uniq(setoidString)
      const uniqArr = uniqueStringArr(arr)

      expect(uniqArr).toEqual(result)
    })
  })
})

// sequence is the same as traverse given the identity function
// const result = array.traverse(option)(userOptions, identity)
