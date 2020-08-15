import {
  prop,
  model,
  ExtendedModel,
  Ref,
} from 'mobx-keystone'

import { LootChestThing } from '~/Objects'

import { WorldEntity } from './EntityModel'
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
export class Container extends ExtendedModel(WorldEntity, {
  size: prop<number>(Sizes.normal),
  icon: prop<string | undefined>(),
  items: prop<Item[]>(() => []),
  locked: prop<boolean>(() => false),
  lockedBy: prop<Ref<Item> | undefined>()
}){
  static type = 'Container'
  static GameObjectClass = LootChestThing

  createGameObject (scene: Phaser.Scene) : LootChestThing {
    const gameobject = new LootChestThing(
      scene,
      this.x + this.width / 2,
      this.y + this.height / 2,
    )
    gameobject.setDepth(this.depth)
    return gameobject
  }
}
