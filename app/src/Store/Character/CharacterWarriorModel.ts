import { ExtendedModel, model, prop } from 'mobx-keystone';

import { Warrior } from '~/Objects/Characters/CharacterWarrior';

import { Character } from './CharacterModel';

export const CHARACTERWARRIOR_MODEL_KEY = 'CharacterWarrior'

@model(CHARACTERWARRIOR_MODEL_KEY)
export class CharacterWarrior extends ExtendedModel(Character, {
}) {

  createGameObject (scene: Phaser.Scene, x: number, y: number): Warrior {
    return new Warrior(scene, x, y)
  }
}
