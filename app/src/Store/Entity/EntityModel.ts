import {
  prop,
  model,
  Model,
  modelAction,
  ExtendedModel
} from 'mobx-keystone'
import { computed } from 'mobx'

import { Modifier } from '../Modifier/ModifierModel'

import { IPosition } from '~/Core/distance'
import { WorldEntityGameObject } from '~/Objects/WorldEntity'

export const ENTITY_MODEL_KEY = 'Entity'
export type TypeofEntityModelInstance = InstanceType<typeof EntityModel>

@model(ENTITY_MODEL_KEY)
export class EntityModel extends Model({
  type: prop<string>(),
  name: prop<string>(),
  modifiers: prop<Modifier[]>(() => []),
  durability: prop<number>(() => 100),
}) {}

export const WORLDENTITY_MODEL_KEY = 'WorldEntity'
export type TypeofWorldEntityModelInstance = InstanceType<typeof WorldEntityModel>

@model(WORLDENTITY_MODEL_KEY)
export class WorldEntityModel extends ExtendedModel(EntityModel, {
  x: prop<number>(() => 0),
  y: prop<number>(() => 0),
  depth: prop<number>(() => 0),
  width: prop<number>(() => 0),
  height: prop<number>(() => 0),
}) {

  @modelAction
  setDepth (value: number): void {
    this.depth = value
  }

  @modelAction
  setPosition (x: number, y: number): void {
    this.x = x
    this.y = y
  }

  @computed
  get position (): IPosition {
    return {
      x: this.x,
      y: this.y
    }
  }

  gameobject: WorldEntityGameObject

  createGameObject (scene: Phaser.Scene): WorldEntityGameObject {
    const gameobject = new WorldEntityGameObject(
      scene, this.x, this.y
    )
    this.gameobject = gameobject
    gameobject.model = this
    gameobject.setDepth(this.depth)
    return gameobject
  }
}
