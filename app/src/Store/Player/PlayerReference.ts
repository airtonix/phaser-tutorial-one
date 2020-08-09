import {
  detach,
  rootRef,
} from 'mobx-keystone'

import { Player, PLAYER_MODEL_KEY } from './PlayerModel'

export const PlayerReference = rootRef<Player>(PLAYER_MODEL_KEY, {
  onResolvedValueChange (ref, newPlayer, oldPlayer) {
    if (oldPlayer && !newPlayer) {
      detach(ref)
    }
  }
})
