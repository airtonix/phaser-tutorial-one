import {
  prop,
  model,
  ExtendedModel,
} from 'mobx-keystone'

import { WorldEntity } from './EntityModel'

export const ITEM_MODEL_KEY = 'Item'

@model(ITEM_MODEL_KEY)
export class Item extends ExtendedModel(WorldEntity, {
  value: prop<number>(),
  icon: prop<string>(),
}){
  static type = 'Item'
}
