import {
  detach,
  rootRef,
} from 'mobx-keystone'

import { CharacterClassModel, CHARACTERCLASS_MODEL_KEY } from './CharacterClassModel'

export const CharacterClassReference = rootRef<CharacterClassModel>(CHARACTERCLASS_MODEL_KEY, {
  onResolvedValueChange (ref, newCharacterClass, oldCharacterClass) {
    if (oldCharacterClass && !newCharacterClass) {
      detach(ref)
    }
  }
})
