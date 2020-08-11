import {
  prop,
  model,
  ExtendedModel,
  Ref,
} from 'mobx-keystone'

import { Entity } from './EntityModel'
import { Item } from './ItemEntityModel'

export const CONTAINER_MODEL_KEY = 'Container'

export enum Sizes {
  tiny = 4,
  small = 8,
  normal = 16,
  big = 32,
  large = 48,
  huge = 64,
  massive = 96
}

@model(CONTAINER_MODEL_KEY)
export class Container extends ExtendedModel(Entity, {
  size: prop<number>(Sizes.normal),
  icon: prop<string | undefined>(),
  items: prop<Item[]>(() => []),
  locked: prop<boolean>(() => false),
  lockedBy: prop<Ref<Item> | undefined>()
}){
  static type = 'Container'
}