import { types, Instance, SnapshotIn } from 'mobx-state-tree'
import { Guid } from 'guid-typescript'

import { EntityMST, IEntitySnapshotIn } from '~/Store/Entity/Entity.model'
import { BaseModel } from '~/Store/BaseModel'

const generatedID = Guid.create().toString()

export const InventoryMST = types.model('Inventory', {
  id: types.optional(types.identifier, generatedID),
  entities: types.array(EntityMST)
})

export interface IInventory extends Instance<typeof InventoryMST> {}
export interface IInventorySnaphotIn extends SnapshotIn<typeof InventoryMST> {}

export class InventoryModel extends BaseModel implements IInventorySnaphotIn {
  id = generatedID
  entities: IEntitySnapshotIn[] = []
}