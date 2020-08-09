import {
  prop,
  model,
  modelAction,
  Model,
  Ref
} from 'mobx-keystone'
import { computed } from 'mobx'

import { ZoneReference } from '../Zone/ZoneReference'

import { Zone } from '~/Store/Zone/ZoneModel'
import { Player } from '~/Store/Player/PlayerModel'
import { UnknownZone } from '~/Store/Zone/Exceptions'

export const GAME_MODEL_KEY = 'Game'

/**
 * This is our Root Store
 */
@model(GAME_MODEL_KEY)
export class Game extends Model({
  player: prop<Player | undefined>(),
  zone: prop<Ref<Zone> | undefined>(),
  zones: prop<Zone[]>(() => [])
}) {
  @modelAction
  createPlayer (player: Player = new Player({})): void {
    this.player = player
  }

  @modelAction
  addZone (zone: Zone): void {
    this.zones.push(zone)
  }

  @computed
  get currentZone (): Zone | undefined {
    return this.zone
      ? this.zone.current
      : undefined
  }

  @modelAction
  setZone (zone: Zone | undefined): void {
    const zones = this.zones

    if (zone && !zones.includes(zone)) throw new UnknownZone

    this.zone = zone
      ? ZoneReference(zone)
      : undefined
  }
}
