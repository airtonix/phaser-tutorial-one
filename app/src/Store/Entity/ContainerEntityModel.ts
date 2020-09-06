import {
  prop,
  model,
  ExtendedModel,
  Ref,
} from 'mobx-keystone'

import { ContainerChestGameObject } from '~/Objects/Containers'

import { WorldEntityModel } from './EntityModel'
import { ItemModel } from './ItemEntityModel'

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
export class ContainerModel extends ExtendedModel(WorldEntityModel, {
  size: prop<number>(Sizes.normal),
  icon: prop<string | undefined>(),
  items: prop<ItemModel[]>(() => []),
  locked: prop<boolean>(() => false),
  lockedBy: prop<Ref<ItemModel> | undefined>()
}){
  static type = 'Container'
  static GameObjectClass = ContainerChestGameObject

  createGameObject (
    scene: Phaser.Scene
  ) : ContainerChestGameObject {
    const gameobject = new ContainerChestGameObject(
      scene,
      this.x + this.width / 2,
      this.y + this.height / 2,
    )
    gameobject.setDepth(this.depth)
    return gameobject
  }
}
