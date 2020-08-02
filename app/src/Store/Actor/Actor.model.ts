import { types, Instance, SnapshotIn } from 'mobx-state-tree'
import { Guid } from 'guid-typescript'

import BaseModel from '~/Store/BaseModel'

const generatedID = Guid.create().toString()

export const ActorMST = types.model('Actor', {
  id: types.optional(types.identifier, generatedID),
  level: types.optional(types.number, 0),
  damage: types.optional(types.number, 0),
  defense: types.optional(types.number, 0),
  indestructable: types.optional(types.boolean, false),
  hitPoints: types.optional(types.number, 100)
})

export interface IActor extends Instance<typeof ActorMST> {}
export interface IActorSnapshotIn extends SnapshotIn<typeof ActorMST> {}

export class ActorModel extends BaseModel implements IActorSnapshotIn {
  id = generatedID
  hitPoints = 100
  indestructable = false
  level = 0
  damage = 0
  defense = 0
}
