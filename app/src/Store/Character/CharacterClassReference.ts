import {
  detach,
  rootRef,
} from 'mobx-keystone'

import { CharacterClass, CHARACTERCLASS_MODEL_KEY } from './CharacterClassModel'

export const CharacterClassReference = rootRef<CharacterClass>(CHARACTERCLASS_MODEL_KEY, {
  onResolvedValueChange (ref, newCharacterClass, oldCharacterClass) {
    if (oldCharacterClass && !newCharacterClass) {
      detach(ref)
    }
  }
})
