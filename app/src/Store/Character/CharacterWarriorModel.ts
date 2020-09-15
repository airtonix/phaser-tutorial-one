import { ExtendedModel, model, prop } from 'mobx-keystone';

import { Warrior } from '~/Objects/Characters/CharacterWarrior';

import { Character } from './CharacterModel';

export const CHARACTERWARRIOR_MODEL_KEY = 'CharacterWarrior'

@model(CHARACTERWARRIOR_MODEL_KEY)
export class CharacterWarrior extends ExtendedModel(Character, {
}) {

  createGameObject (scene: Phaser.Scene): Warrior {
    const gameobject = new Warrior(scene, this.x, this.y)
    gameobject.setPosition(this.x, this.y)
    gameobject.setDepth(this.depth + 1)
    return gameobject
  }
}
