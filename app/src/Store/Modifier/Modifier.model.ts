import { types, Instance, ModelSnapshotType, SnapshotOrInstance, SnapshotIn, SnapshotOut } from 'mobx-state-tree'
import { Guid } from 'guid-typescript'

import BaseModel from '~/Store/BaseModel'

const generatedID = Guid.create().toString()

export const ModifierMST = types.model('Modifier', {
  id: types.optional(types.identifier, generatedID),
  level: types.optional(types.number, 0), // Can be negative or positive numbers to add or minus on stats
  damage: types.optional(types.number, 0), // Can be negative or positive numbers to add or minus on stats
  defense: types.optional(types.number, 0) // Can be negative or positive numbers to add or minus on stats
})

export interface IModifier extends Instance<typeof ModifierMST> {}
export interface IModifierSnapshotIn extends SnapshotIn<typeof ModifierMST> {}
export interface IModifierSnapshotIOut extends SnapshotOut<typeof ModifierMST> {}

export class ModifierModel extends BaseModel implements IModifier {
  id = generatedID
  level = 0
  damage = 0
  defense = 0
}
