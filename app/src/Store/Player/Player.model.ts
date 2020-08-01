import { types, Instance } from 'mobx-state-tree'
import { Guid } from 'guid-typescript'

import BaseModel from '~/Store/BaseModel'

const generatedID = Guid.create().toString()

export const PlayerMST = types.model('Player', {
  id: types.optional(types.identifier, generatedID),
  characters: types.optional(types.array(types.string), []),
})

export type IPlayer = Instance<typeof PlayerMST>

export class PlayerModel extends BaseModel {
  id = generatedID
  characters: string[] = []
}