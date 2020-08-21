import {
  prop,
  model,
  modelAction,
  Model,
  Ref
} from 'mobx-keystone'
import { computed } from 'mobx'

import { ZoneReference } from '../Zone/ZoneReference'
import { Character } from '../Character/CharacterModel'
import { UnknownZone } from '../Zone/Exceptions'
import { Zone, ZoneTypes } from '../Zone/ZoneModel'
import { Player } from '../Player/PlayerModel'

import { TiledTileMaps } from '~/Config/constants'

import { Library } from './LibraryModel'

export const GAME_MODEL_KEY = 'Game'

/**
 * This is our Root Store
 */
@model(GAME_MODEL_KEY)
export class Game extends Model({
  player: prop<Player | undefined>(),
  library: prop<Library | undefined>(),
  zone: prop<Ref<Zone> | undefined>(),
  zones: prop<Zone[]>(() => [])
}) {

  onInit (): void {
    this.library = new Library({ classes: [] })

    const levelOne = new Zone({
      name: 'LevelOne',
      type: ZoneTypes.Dungeon,
    })
    levelOne.addMapFromLevelData(TiledTileMaps.LevelOne)
    this.addZone(levelOne)

    const levelTwo = new Zone({
      name: 'LevelTwo',
      type: ZoneTypes.Dungeon,
    })
    levelOne.addMapFromLevelData(TiledTileMaps.LevelTwo)
    this.addZone(levelTwo)

    const levelThree = new Zone({
      name: 'LevelThree',
      type: ZoneTypes.Dungeon,
    })
    levelOne.addMapFromLevelData(TiledTileMaps.LevelThree)
    this.addZone(levelThree)
  }

  @modelAction
  startPlayer (zone: Zone): void {
    const spawn = zone.portals.find(zone => zone.name === 'PlayerStart')
    const newCharacter = new Character({
      x: spawn?.x,
      y: spawn?.y,
      depth: spawn?.depth,
      name: 'Test',
      type: 'Warrior',
      hp: 100,
      icon: '',
      zone: ZoneReference(zone)
    })

    this.createPlayer()
      .startCharacter(newCharacter)
  }

  @modelAction
  createPlayer (player: Player = new Player({})): Player {
    this.player = player
    return player
  }

  @modelAction
  addZone (zone: Zone): void {
    this.zones.push(zone)
  }

  @modelAction
  addZones (zones: Zone[]): void {
    this.zones = this.zones.concat(zones)
  }

  getStartZone (): Zone {
    return this.zones
      .find(zone => zone.isStart)
    || this.zones[0]
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

    if (zone && !zones.includes(zone)) throw new UnknownZone(zone)

    this.zone = zone
      ? ZoneReference(zone)
      : undefined
  }
}
