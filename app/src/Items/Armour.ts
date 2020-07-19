import { Factory, Generate } from './Factories'
import { Chance } from 'chance'
import gauntlets from '@xaroth8088/random-names/generators/armour/gauntlets.mjs'

Factory('armour', {
    type: () => 'armour',
    name: () => Chance().pickone([
        gauntlets
    ])(),
    enchantments: () => Generate('enchantment', 2),
    value: 'number',
})

export const Armour = Generate('armour', 100)