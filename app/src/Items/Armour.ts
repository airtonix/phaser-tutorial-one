import { uniqueId, sample } from 'lodash'
import gauntlets from '@xaroth8088/random-names/generators/armour/gauntlets.mjs'

import { Factory, Generate } from './Factories'
import { Loot } from './Loot'

import { ItemIcons } from '~/Config/constants'

Factory('armour', {
    // id: 'id',
    type: () => 'armour',
    name: () => gauntlets(),
    icon: () => ({
        ...ItemIcons.armour,
        frame: sample(ItemIcons.armour.frames),
    }),
    enchantments: () => Generate('enchantment', 2),
    value: 'number',
})

export const Armour = Generate('armour', 100)
const ArmourBranch = Loot.branch('/loot/armour')
Armour.forEach(item => ArmourBranch.add(item))