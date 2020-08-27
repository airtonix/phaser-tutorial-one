import { uniqueId, sample } from 'lodash'
import artifacts from '@xaroth8088/random-names/generators/miscellaneous/artifacts.mjs'
import prophecies from '@xaroth8088/random-names/generators/descriptions/prophecys.mjs'

import { ItemIcons } from '~/Config/constants'

import { Factory, Generate } from './Factories'
import { Loot } from './Loot'


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
  // TODO: Define types for loot
  .forEach((item: any) =>
    Loot.branch('/loot/artifacts')
      .add(item)
  )