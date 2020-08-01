import { uniqueId, sample } from 'lodash'
import swords from '@xaroth8088/random-names/generators/weapons/swords.mjs'
import spears from '@xaroth8088/random-names/generators/weapons/spears.mjs'
import bows from '@xaroth8088/random-names/generators/weapons/bows.mjs'
import daggers from '@xaroth8088/random-names/generators/weapons/daggers.mjs'
import staffs from '@xaroth8088/random-names/generators/weapons/staffs.mjs'
import abilities from '@xaroth8088/random-names/generators/miscellaneous/weaponAbilities.mjs'

import { Factory, Generate } from './Factories'
import { Loot } from './Loot'

import { ItemIcons } from '~/Config/constants'


Factory('swords', {
    id: () => uniqueId('sword'),
    icon: () => ({
        ...ItemIcons.sword,
        frame: sample(ItemIcons.sword.frames),
    }),
    type: () => 'weapon',
    name: () => swords(),
    abilities: () => abilities(),
    enchantments: () => Generate('enchantment', 2),
    value: 'number',
})
Factory('spears', {
    id: () => uniqueId('spear'),
    icon: () => ({
        ...ItemIcons.spear,
        frame: sample(ItemIcons.spear.frames),
    }),
    type: () => 'weapon',
    name: () => spears(),
    abilities: () => abilities(),
    enchantments: () => Generate('enchantment', 2),
    value: 'number',
})
Factory('bows', {
    id: () => uniqueId('bow'),
    icon: () => ({
        ...ItemIcons.bow,
        frame: sample(ItemIcons.bow.frames),
    }),
    type: () => 'bow',
    name: () => bows(),
    abilities: () => abilities(),
    enchantments: () => Generate('enchantment', 2),
    value: 'number',
})

Generate('swords', 4)
    .forEach(item =>
        Loot
            .branch('/loot/weapons/swords')
            .add(item)
    )

Generate('spears', 4)
    .forEach(item =>
        Loot
            .branch('/loot/weapons/spears')
            .add(item)
    )

Generate('bows', 4)
    .forEach(item =>
        Loot
            .branch('/loot/weapons/bows')
            .add(item)
    )