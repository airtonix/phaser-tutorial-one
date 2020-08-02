import { types, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree'
import { Guid } from 'guid-typescript'

import BaseModel from '~/Store/BaseModel'
import { MoveMST, IMove } from '~/Store/Move/Move.model'
import { ModifierMST, IModifier } from '~/Store/Modifier/Modifier.model'
import { InventoryMST, IInventory, InventoryModel, IInventorySnaphotIn } from '~/Store/Inventory/Inventory.model'

const generatedID = Guid.create().toString()

export const CharacterMST = types.model('Character', {
  id: types.optional(types.identifier, generatedID),
  level: types.optional(types.number, 0),
  damage: types.optional(types.number, 0),
  defense: types.optional(types.number, 0),
  indestructable: types.optional(types.boolean, false),
  hitPoints: types.optional(types.number, 100),
  modifiers: types.optional(types.array(ModifierMST), []),
  moves: types.optional(types.array(MoveMST), []),
  inventory: InventoryMST
})

export interface ICharacter extends Instance<typeof CharacterMST> {}
export interface ICharacterSnapshotIn extends SnapshotIn<typeof CharacterMST> {}
export interface ICharacterSnapshotOut extends SnapshotOut<typeof CharacterMST> {}

export class CharacterModel extends BaseModel implements ICharacterSnapshotIn {
  level = 0
  damage = 0
  defense = 0
  indestructable = false
  hitPoints = 100
  modifiers: IModifier[] = []
  moves: IMove[] = []
  inventory: IInventorySnaphotIn = {...(new InventoryModel())}
}