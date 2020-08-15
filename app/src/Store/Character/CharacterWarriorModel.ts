import { ExtendedModel, model, prop } from 'mobx-keystone';

import { Character } from './CharacterModel';

export const CHARACTERWARRIOR_MODEL_KEY = 'CharacterWarrior'

@model(CHARACTERWARRIOR_MODEL_KEY)
export class CharacterWarrior extends ExtendedModel(Character, {
}) {
  class = 'Warrior'
}
