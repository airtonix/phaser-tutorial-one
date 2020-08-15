import {
  prop,
  model,
  modelAction,
  getRootStore,
  ExtendedModel,
} from 'mobx-keystone'
import { Ref } from 'react';

import { Entity, WorldEntity } from '../Entity/EntityModel';
import { Zone } from '../Zone/ZoneModel';
import { Game } from '../Game/GameModel';
import { UnknownZone } from '../Zone/Exceptions';
import { ZoneReference } from '../Zone/ZoneReference';
import { NoGameError } from '../Game/Excpetions';

export const CHARACTER_MODEL_KEY = 'Character'

@model(CHARACTER_MODEL_KEY)
export class Character extends ExtendedModel(WorldEntity, {
  icon: prop<string>(),
  hp: prop<number>(),
  zone: prop<Ref<Zone> | undefined>()
}) {

  get currentZone (): Zone | undefined {
    return this.zone
      ? this.zone.current
      : undefined
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
