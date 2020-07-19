import artifacts from '@xaroth8088/random-names/generators/miscellaneous/artifacts.mjs'
import prophecies from '@xaroth8088/random-names/generators/descriptions/prophecys.mjs'
import { Factory, Generate } from './Factories'

Factory('artifacts', {
    type: () => 'artifact',
    name: () => artifacts(),
    prophecy: () => prophecies().split('-------------------').pop().trim(),
    enchantments: () => Generate('enchantment', 2),
    value: 'number',
})

export const Artifacts = Generate('artifacts', 100)