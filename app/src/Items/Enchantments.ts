import enchantments from '@xaroth8088/random-names/generators/miscellaneous/enchantments.mjs'

import { Factory, Generate } from './Factories'
import { Loot } from './Loot'


Factory('enchantment', {
  // id: 'id',
  type: () => 'enchantment',
  description: () => enchantments()
})