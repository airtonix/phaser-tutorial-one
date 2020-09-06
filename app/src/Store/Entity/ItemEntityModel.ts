import {
  prop,
  model,
  ExtendedModel,
} from 'mobx-keystone'

import { WorldEntityModel } from './EntityModel'

export const ITEM_MODEL_KEY = 'Item'

@model(ITEM_MODEL_KEY)
export class ItemModel extends ExtendedModel(WorldEntityModel, {
  value: prop<number>(),
  icon: prop<string>(),
}){
  static type = 'Item'
}
