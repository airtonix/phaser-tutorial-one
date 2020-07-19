import { Factory, Generate } from './Factories'
import { Chance } from 'chance'
import swords from '@xaroth8088/random-names/generators/weapons/swords.mjs'
import spears from '@xaroth8088/random-names/generators/weapons/spears.mjs'
import whips from '@xaroth8088/random-names/generators/weapons/whips.mjs'
import axes from '@xaroth8088/random-names/generators/weapons/battleAxes.mjs'
import bows from '@xaroth8088/random-names/generators/weapons/bows.mjs'
import daggers from '@xaroth8088/random-names/generators/weapons/daggers.mjs'
import staffs from '@xaroth8088/random-names/generators/weapons/staffs.mjs'
import hammers from '@xaroth8088/random-names/generators/weapons/warHammers.mjs'
import thrown from '@xaroth8088/random-names/generators/weapons/throwingWeapons.mjs'

import abilities from '@xaroth8088/random-names/generators/miscellaneous/weaponAbilities.mjs'

const types = {
    swords,
    spears,
    whips,
    axes,
    bows,
    daggers,
    staffs,
    hammers,
    thrown
}

Factory('weapons', {
    type: () => 'weapon',
    name: () => Chance().pickone(Object.values(types))(),
    abilities: () => abilities(),
    enchantments: () => Generate('enchantment', 2),
    value: 'number',
})

export const Weapons = Generate('weapons', 100)