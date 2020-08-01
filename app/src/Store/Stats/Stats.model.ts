import { types, Instance } from 'mobx-state-tree'
import { Guid } from 'guid-typescript'

import BaseModel from '~/Store/BaseModel'

const generatedID = Guid.create().toString()

export const StatsMST = types.model('Stats', {
  id: types.optional(types.string, generatedID),
  level: types.optional(types.number, 0),
  damage: types.optional(types.number, 0),
  defense: types.optional(types.number, 0)
})

export type IStats = Instance<typeof StatsMST>

export class Stats extends BaseModel implements IStats {
  id = generatedID
  level = 0
  damage = 0
  defense = 0
}
