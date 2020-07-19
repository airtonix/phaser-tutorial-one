import { Factory, Generate } from './Factories'
import { Chance } from 'chance'
import gems from '@xaroth8088/random-names/generators/miscellaneous/gemMinerals.mjs'
import jewels from '@xaroth8088/random-names/generators/miscellaneous/jewelrys.mjs'

Factory('jewellry', {
    type: () => 'jewellry',
    name: () => `${gems()} ${jewels()}`,
    enchantments: () => Generate('enchantment', 1),
    value: 'number',
})

export const Jewellry = Generate('jewellry', 100)