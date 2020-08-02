import { Instance, types, SnapshotIn } from 'mobx-state-tree'
import { Guid } from 'guid-typescript'

import BaseModel from '~/Store/BaseModel'
import { IModifier, ModifierMST } from '~/Store/Modifier/Modifier.model'

const generatedID = Guid.create().toString()

export const MoveMST = types.model('Move', {
  cooldown: types.optional(types.number, 0),
  id: types.optional(types.identifier, generatedID),
  isReaction: types.optional(types.boolean, false),
  modifiers: types.optional(types.array(ModifierMST), []),
})

export interface IMove extends Instance<typeof MoveMST> {}
export interface IMoveSnapshotIn extends SnapshotIn<typeof MoveMST> {}

export class MoveModel extends BaseModel implements IMoveSnapshotIn {
  cooldown = 0
  id = generatedID
  isReaction = false
  modifiers: IModifier[] = []
}
