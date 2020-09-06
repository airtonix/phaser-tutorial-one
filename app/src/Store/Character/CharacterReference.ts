import {
  detach,
  rootRef,
} from 'mobx-keystone'

import { CharacterModel, CHARACTER_MODEL_KEY } from './CharacterModel'

export const CharacterReference = rootRef<CharacterModel>(CHARACTER_MODEL_KEY, {
  onResolvedValueChange (ref, newCharacter, oldCharacter) {
    if (oldCharacter && !newCharacter) {
      detach(ref)
    }
  }
})
