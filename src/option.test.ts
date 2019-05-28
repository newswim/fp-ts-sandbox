import { Optional } from 'monocle-ts'
import { lensesFromInterface } from 'io-ts-types/lib/monocle-ts/lensesFromInterface'
import { Option, some, none, option, fromNullable } from 'fp-ts/lib/Option'
import { string as s } from 'io-ts'
import { findFirst } from 'fp-ts/lib/Array'

const firstLetter = new Optional<string, string>(
  s => (s.length > 0 ? some(s[0]) : none),
  a => s => a + s.substring(1)
)

// console.log(firstLetter.getOption('what').getOrElse(''))

const a = fromNullable(null)

const e = fromNullable(Error('no!'))

// console.log('e', e)

// console.log('some(null)', a.isSome())

// console.log(option.alt(a, some('nah')))

const optObj = some({})

// console.log('optObj', optObj)

const optNull = some(null)

// console.log('optNull', optNull)

// console.log('none', none)

// console.log({}.nonExistentField == null)

// console.log(s)

// const someValue: Option<string> = some('foo')
// const emptyValue: Option<string> = none

// const head = (as: Array<string>): Option<string> => {
//   return as.length > 0 ? some(as[0]) : none
// }

// const v1 = head(['foo', 'bar'])
// const v2 = head([])

// console.log(v1.getOrElse('null I guess?'))
// console.log(v2.getOrElse('null I guess?'))

describe('Option', () => {
  describe('fromNullable', () => {
    test('null returns none', () => {
      const result = fromNullable(null)
      expect(result).toBe(none)
    })

    test('undefined returns none', () => {
      const result = fromNullable(undefined)
      expect(result).toBe(none)
    })

    test('false returns some(false)', () => {
      const result = fromNullable(false)
      expect(result).toEqual(some(false))
    })
  })

  describe('mapping over two possible options', () => {
    type ExternalSubnetPlanError = 'noMapping' | 'mappingNotInDeploymentTarget'
    type NetworkDeviceType = 'vmxnet3'

    type VmPlanError =
      | 'noTemplateSpecified'
      | {
          invalidTemplate: string
        }
      | 'needMgmtVmProvisionedToRedeploy'

    type VmSpecError =
      | {
          networkDeviceTypeNotSupportedByHypervisor: NetworkDeviceType
        }
      | 'tooManyNetworkDevices'
    type DeploymentSpecError =
      | 'noSimspaceMgmtVm'
      | 'mgmtVmNeedsProvisioning'
      | {
          simYamlError: string
        }
      | {
          expansionError: string
        }

    type PlanErrors = {
      vms: {
        val: VmPlanError[]
        key: {
          repetitionGroup: string
          index: number
        }
      }[]
      externalSubnets: {
        val: ExternalSubnetPlanError[]
        key: string
      }[]
    }
    type SpecErrors = {
      deployment: DeploymentSpecError[]
      vms: {
        val: VmSpecError[]
        key: {
          repetitionGroup: string
          index: number
        }
      }[]
    }

    // const overridesOption = some([{ key: 'bar', val: 'foo' }])

    // const getFilteredErrorsOption = (opt: Option<PlanErrors | SpecErrors>) =>
    //   opt.chain(errors =>
    //     some(errors).refine(e => {
    //       const key = e.key.index
    //       return overridesOption
    //         .chain(overrides =>
    //           findFirst(overrides, o => o.key === key && o.val !== 'skip')
    //         )
    //         .isSome()
    //     })
    //   )

    // const getFiltersErrorsOptionApply = (
    //   opt: Option<PlanErrors | SpecErrors>
    // ) => opt.filter
  })

  describe('Dealing with nested options', () => {
    const nested = some({
      foo: 'foo',
      bar: some('bar'),
      none: none,
    })

    test('removing nones', () => {
      nested
    })
  })
})
