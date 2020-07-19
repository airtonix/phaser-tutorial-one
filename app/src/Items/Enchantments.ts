import { Factory, Generate } from './Factories'
import { Chance } from 'chance'

import enchantments from '@xaroth8088/random-names/generators/miscellaneous/enchantments.mjs'

Factory('enchantment', {
    type: () => 'enchantment',
    description: () => enchantments()
})