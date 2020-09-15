import {
  prop,
  model,
  modelAction,
  getRootStore,
  Ref,
  ExtendedModel,
} from 'mobx-keystone'
import { computed } from 'mobx'

import { WorldEntity } from '../Entity/EntityModel'
import { Zone } from '../Zone/ZoneModel'
import { Game } from '../Game/GameModel'
import { UnknownZone } from '../Zone/Exceptions'
import { ZoneReference } from '../Zone/ZoneReference'
import { NoGameError } from '../Game/Exceptions'
import { Item } from '../Entity/ItemEntityModel'

import { CharacterClass } from './CharacterClassModel'
import { TypeOfWorldEntity } from '../Entity/Factory'

export const CHARACTER_MODEL_KEY = 'Character'

@model(CHARACTER_MODEL_KEY)
export class Character extends ExtendedModel(WorldEntity, {
  icon: prop<string>(),
  hp: prop<number>(),
  zone: prop<Ref<Zone> | undefined>(),
  class: prop<Ref<CharacterClass> | undefined>(),
  inventory: prop<Ref<Item>[]>(),
}) {

  @computed
  get currentZone (): Zone | undefined {
    return this.zone
      ? this.zone.current
      : undefined
  }

  @computed
  get classMeta (): CharacterClass | undefined {
    return this.class && this.class
      ? this.class.current
      : undefined
  }

  @modelAction
  teleportTo (zone: Zone, entity: TypeOfWorldEntity): void {
    this.setZone(zone)
    this.setPosition(entity.x, entity.y)
    this.setDepth(entity.depth + 1)
  }

  @modelAction
  setZone (zone: Zone | undefined): void {
    const rootStore = getRootStore<Game>(this)
    if (!rootStore) throw new NoGameError()

    if (zone && !rootStore.zones.includes(zone)) throw new UnknownZone(zone)

    this.zone = zone
      ? ZoneReference(zone)
      : undefined
  }

}


