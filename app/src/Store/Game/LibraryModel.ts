import {
  prop,
  model,
  Model,
} from 'mobx-keystone'

import { CharacterClass, CHARACTER_CLASSES } from '../Character/CharacterClassModel'

export const LIBRARY_MODEL_KEY = 'Library'

  /**
   * This is our Root Store
   */
  @model(LIBRARY_MODEL_KEY)
export class Library extends Model({
  classes: prop<CharacterClass[]>(() => []),
  // weapons,
  // currency,
  // spells,
  // effects,
}) {
  onInit (): void {
    this.classes = Object.keys(CHARACTER_CLASSES)
      .map(name => new CharacterClass({ name }))
  }
}
