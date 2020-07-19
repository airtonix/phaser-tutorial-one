import { Factory, Generate } from './Factories'
import { Chance } from 'chance'
import gems from '@xaroth8088/random-names/generators/miscellaneous/gemMinerals.mjs'

Factory('gems', {
    type: () => 'gem',
    name: () => gems(),
    value: 'number',
})

export const Gems = Generate('gems', 100)