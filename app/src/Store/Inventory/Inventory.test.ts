import { InventoryModel, InventoryMST } from './Inventory.model'
import { getInventoryActions } from './Inventory.actions'

const inventoryTS = { ...(new InventoryModel()) }
const inventoryMST = InventoryMST.actions(self => getInventoryActions(self)).create(inventoryTS)

it('addItem & removeItem', () => {
  expect(inventoryMST.entities).toHaveLength(0)
  const mods = inventoryMST.addItem()
  expect(inventoryMST.entities).toHaveLength(1)
  inventoryMST.removeItem(mods[0].id)
  expect(inventoryMST.entities).toHaveLength(0)
})
