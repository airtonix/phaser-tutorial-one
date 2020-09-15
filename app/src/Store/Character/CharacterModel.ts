import {
  prop,
  model,
  Ref,
  modelAction,
  getRootStore,
  ExtendedModel,
} from 'mobx-keystone'
import { computed } from 'mobx'

import { WorldEntityModel } from '../Entity/EntityModel'
import { Zone } from '../Zone/ZoneModel'
import { Game } from '../Game/GameModel'
import { UnknownZone } from '../Zone/Exceptions'
import { ZoneReference } from '../Zone/ZoneReference'
import { NoGameError } from '../Game/Exceptions'
import { ItemModel } from '../Entity/ItemEntityModel'
import { CharacterGameObject } from '~/Objects/Characters/Character'
import { CharacterClassModel } from './CharacterClassModel'

export const CHARACTER_MODEL_KEY = 'Character'

@model(CHARACTER_MODEL_KEY)
export class CharacterModel extends ExtendedModel(WorldEntityModel, {
  icon: prop<string>(),
  hp: prop<number>(),
  zone: prop<Ref<Zone> | undefined>(),
  class: prop<Ref<CharacterClassModel> | undefined>(),
  inventory: prop<Ref<ItemModel>[]>(),
  followers: prop<Ref<CharacterModel>[]>(() => [])
}) {

  @computed
  get hasFollowers (): Boolean {
    return this.followers && this.followers.length > 0
  }

  @computed
  get currentZone (): Zone| undefined {
    return this.zone
      ? this.zone.current
      : undefined
  }

  @computed
  get classMeta (): CharacterClassModel | undefined {
    return this.class
      ? this.class.current
      : undefined
  }

  @modelAction
  teleportTo (zone: Zone, entity: WorldEntityModel): void {
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


  public createGameObject (scene: Phaser.Scene): CharacterGameObject {
    const gameobject = new CharacterGameObject(scene)
    gameobject.setPosition(this.x, this.y)
    gameobject.setDepth(this.depth + 1)
    return gameobject
  }
}


