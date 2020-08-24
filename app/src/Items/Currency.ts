import { uniqueId, sample } from 'lodash'
import names from '@xaroth8088/random-names/generators/miscellaneous/currencys.mjs'

import { Factory, Generate } from './Factories'
import { Loot } from './Loot'

import { ItemIcons } from '~/Config/constants'

Factory('currency', {
    id: () => uniqueId('currency'),
    icon: () => ({
        ...ItemIcons.currency,
        frame: sample(ItemIcons.currency.frames),
    }),
    type: () => 'currency',
    name: () => names(),
    value: 'number',
})

export const Currency = Generate('currency', 2)
const CurrencyBranch = Loot.branch('/loot/currency')
Currency.forEach(item => CurrencyBranch.add(item))
