import { Instance, types } from 'mobx-state-tree'
import { Guid } from 'guid-typescript'

import BaseModel from '~/Core/Store/BaseModel'
import { IModifier } from '~/Core/Store/Modifier/Modifier.model'

const generatedID = Guid.create().toString()

export const MoveMST = types.model('Move', {
  cooldown: types.optional(types.number, 0),
  id: types.optional(types.identifier, generatedID),
  isReaction: types.optional(types.boolean, false),
  modifiers: types.optional(types.array(types.string), []),
})

export type IMove = Instance<typeof MoveMST>

export class MoveModel extends BaseModel {
  cooldown = 0
  id = generatedID
  isReaction = false
  modifiers: IModifier[] = []
}
