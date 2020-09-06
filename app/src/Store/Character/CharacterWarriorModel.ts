import { ExtendedModel, model, prop } from 'mobx-keystone';

import { WarriorGameObject } from '~/Objects/Characters/CharacterWarrior';

import { CharacterModel } from './CharacterModel';

export const CHARACTERWARRIOR_MODEL_KEY = 'CharacterWarrior'

@model(CHARACTERWARRIOR_MODEL_KEY)
export class CharacterWarriorModel extends ExtendedModel(CharacterModel, {
}) {

  createGameObject (scene: Phaser.Scene): WarriorGameObject {
    const gameobject = new WarriorGameObject(scene)
    gameobject.setPosition(this.x, this.y)
    gameobject.setDepth(this.depth + 1)
    return gameobject
  }
}
