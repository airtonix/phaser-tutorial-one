import {
  prop,
  model,
  Model,
} from 'mobx-keystone'

import { CharacterClass } from '../Character/CharacterClass'

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
    this.classes = CharacterClass.classes
      .map(name => new CharacterClass({ name }))
  }
}
