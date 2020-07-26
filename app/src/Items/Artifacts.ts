import { uniqueId, sample } from 'lodash'
import artifacts from '@xaroth8088/random-names/generators/miscellaneous/artifacts.mjs'
import prophecies from '@xaroth8088/random-names/generators/descriptions/prophecys.mjs'
import { Factory, Generate } from './Factories'
import { Loot } from './Loot'
import { ItemIcons } from '~/constants'

Factory('artifacts', {
    id: () => uniqueId('artifact'),
    icon: () => ({
        ...ItemIcons.artifact,
        frame: sample(ItemIcons.artifact.frames),
    }),
    type: () => 'artifact',
    name: () => artifacts(),
    prophecy: () => prophecies().split('-------------------').pop().trim(),
    enchantments: () => Generate('enchantment', 2),
    value: 'number',
})

Generate('artifacts', 100)
    .forEach(item =>
        Loot.branch('/loot/artifacts')
            .add(item)
    )