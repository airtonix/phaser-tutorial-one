import {
    prop,
    model,
    modelAction,
    Model,
} from 'mobx-keystone'

import { Zone } from '~/Store/Zone/ZoneModel'
import { Player } from '~/Store/Player/PlayerModel'

export const GAME_MODEL_KEY = 'Game'

/**
 * This is our Root Store
 */
@model(GAME_MODEL_KEY)
export class Game extends Model({
    player: prop<Player | undefined>(),
    zone: prop <Zone | undefined>(),
}){
    @modelAction
    createPlayer (player: Player = new Player({})): void {
      this.player = player
    }

    @modelAction
    setZone (zone: Zone = new Zone({ type: 'unknown', name: 'unnamed' })): void {
        this.zone = zone
    }
}