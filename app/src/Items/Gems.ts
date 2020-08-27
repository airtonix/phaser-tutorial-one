import { uniqueId, sample } from 'lodash'
import gems from '@xaroth8088/random-names/generators/miscellaneous/gemMinerals.mjs'

import { ItemIcons } from '~/Config/constants'

import { Factory, Generate } from './Factories'
import { Loot } from './Loot'


Factory('gems', {
  id: () => uniqueId('gem'),
  icon: () => ({
    ...ItemIcons.gem,
    frame: sample(ItemIcons.gem.frames),
  }),
  type: () => 'gem',
  name: () => gems(),
  value: 'number',
})

Generate('gems', 8)
  .forEach(item =>
    Loot.branch('/loot/gems')
      .add(item)
  )

