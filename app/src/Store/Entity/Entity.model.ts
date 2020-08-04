import { types, Instance, SnapshotIn } from 'mobx-state-tree'
import { Guid } from 'guid-typescript'

import { BaseModel } from '~/Store/BaseModel'

const generatedID = Guid.create().toString()

export const EntityMST = types.model('Entity', {
  id: types.optional(types.identifier, generatedID),
  level: types.optional(types.number, 0),
  damage: types.optional(types.number, 0),
  defense: types.optional(types.number, 0),
  indestructable: types.optional(types.boolean, false)
})

export interface IEntity extends Instance<typeof EntityMST> {}
export interface IEntitySnapshotIn extends SnapshotIn<typeof EntityMST> {}

export class EntityModel extends BaseModel implements IEntitySnapshotIn {
  id = generatedID
  indestructable = false
  level = 0
  damage = 0
  defense = 0
}
