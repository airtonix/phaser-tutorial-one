import { ExtendedModel, model } from 'mobx-keystone';

import { GoblinGameObject } from '~/Objects/Characters/CharacterGoblin'

import { CharacterModel } from './CharacterModel';

export const CHARACTERGOBLIN_MODEL_KEY = 'CharacterGoblin'

@model(CHARACTERGOBLIN_MODEL_KEY)
export class CharacterGoblinModel extends ExtendedModel(CharacterModel, {
}) {
  createGameObject (scene: Phaser.Scene): GoblinGameObject {
    const gameobject = new GoblinGameObject(scene)
    gameobject.setPosition(this.x, this.y)
    gameobject.setDepth(this.depth + 1)
    return gameobject
  }
}
