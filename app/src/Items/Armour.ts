import { sample } from 'lodash'
import gauntlets from '@xaroth8088/random-names/generators/armour/gauntlets.mjs'

import { ItemIcons } from '~/Config/constants'

import { Factory, Generate } from './Factories'
import { Loot } from './Loot'


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
// TODO: Define types for loot
Armour.forEach((item: any) =>
  ArmourBranch.add(item))