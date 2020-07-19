import { Factory, Generate } from './Factories'
import { Chance } from 'chance'
import names from '@xaroth8088/random-names/generators/miscellaneous/currencys.mjs'

Factory('currency', {
    type: () => 'currency',
    name: () => names(),
    value: 'number',
})

export const Currency = Generate('currency', 10)