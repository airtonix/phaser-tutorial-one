import {
  prop,
  model,
  Model,
  modelAction,
  ExtendedModel
} from 'mobx-keystone'

import { Modifier } from '../Modifier/ModifierModel'

import { LootChestThing } from '~/Objects'
import { NotImplementedError } from '~/Core/exceptions'

export const ENTITY_MODEL_KEY = 'Entity'

@model(ENTITY_MODEL_KEY)
export class Entity extends Model({
  type: prop<string>(),
  name: prop<string>(),
  modifiers: prop<Modifier[]>(() => []),
  durability: prop<number>(() => 100),
}) {

}

export const WORLDENTITY_MODEL_KEY = 'WorldEntity'

@model(WORLDENTITY_MODEL_KEY)
export class WorldEntity extends ExtendedModel(Entity, {
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

  createGameObject (scene: Phaser.Scene) : Phaser.GameObjects.GameObject {
    throw new NotImplementedError(`createGameobject type: ${this.$modelType}`)
  }
}

