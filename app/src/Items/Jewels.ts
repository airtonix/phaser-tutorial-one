import { uniqueId, sample } from 'lodash'
import gems from '@xaroth8088/random-names/generators/miscellaneous/gemMinerals.mjs'
import jewels from '@xaroth8088/random-names/generators/miscellaneous/jewelrys.mjs'

import { Factory, Generate } from './Factories'
import { Loot } from './Loot'

import { ItemIcons } from '~/Config/constants'

Factory('jewellry', {
    id: () => uniqueId('jewel'),
    icon: () => ({
        ...ItemIcons.jewellery,
        frame: sample(ItemIcons.jewellery.frames),
    }),
    type: () => 'jewellery',
    name: () => `${gems()} ${jewels()}`,
    enchantments: () => Generate('enchantment', 1),
    value: 'number',
})

Generate('jewellry', 100)
    .forEach(item =>
        Loot.branch('/loot/jewellry')
            .add(item)
    )