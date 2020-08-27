import {
  detach,
  rootRef,
} from 'mobx-keystone'

import { Character, CHARACTER_MODEL_KEY } from './CharacterModel'

export const CharacterReference = rootRef<Character>(CHARACTER_MODEL_KEY, {
  onResolvedValueChange (ref, newCharacter, oldCharacter) {
    if (oldCharacter && !newCharacter) {
      detach(ref)
    }
  }
})
