import { types, Instance } from 'mobx-state-tree'
import { Guid } from 'guid-typescript'

import BaseModel from '~/Core/Store/BaseModel'
import { MoveModel } from '~/Core/Store/Move/Move.model'
import { ModifierModel, ModifierMST } from '~/Core/Store/Modifier/Modifier.model'

const generatedID = Guid.create().toString()

export const CharacterMST = types.model('Character', {
  id: types.optional(types.identifier, generatedID),
  level: types.optional(types.number, 0),
  damage: types.optional(types.number, 0),
  defense: types.optional(types.number, 0),
  indestructable: types.optional(types.boolean, false),
  hitPoints: types.optional(types.number, 100),
  modifiers: types.optional(types.array(types.string), []),
  moves: types.optional(types.array(types.string), [])
})

export type ICharacter = Instance<typeof CharacterMST>

export class CharacterModel extends BaseModel {
  id = generatedID
  hitPoints = 100
  indestructable = false
  level = 0
  damage = 0
  defense = 0
  modifiers: string[] = []
  moves: string[] = []
}