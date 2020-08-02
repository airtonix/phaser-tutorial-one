import { EntityModel } from '../Entity/Entity.model'

import { IInventory } from './Inventory.model'

export const getInventoryActions = <T extends IInventory>(self: T) => ({
  addItem (entity = new EntityModel()): EntityModel[] {
    self.entities.push({...entity})
    return self.entities.slice()
  },
  removeItem (entityId: string): EntityModel[] {
    const filtered = self.entities.slice()
      .filter(entity => entity.id !== entityId)
    self.entities.replace(filtered)
    return self.entities.slice()
  }
})

