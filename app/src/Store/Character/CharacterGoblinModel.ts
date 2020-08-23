import { ExtendedModel, model } from 'mobx-keystone';

import { Goblin } from '~/Objects/Characters/CharacterGoblin'

import { Character } from './CharacterModel';

export const CHARACTERGOBLIN_MODEL_KEY = 'CharacterGoblin'

@model(CHARACTERGOBLIN_MODEL_KEY)
export class CharacterGoblin extends ExtendedModel(Character, {
}) {

  createGameObject (scene: Phaser.Scene): Goblin {
    const gameobject = new Goblin(scene)
    gameobject.setPosition(this.x, this.y)
    gameobject.setDepth(this.depth + 1)
    return gameobject
  }
}
