import {
  prop,
  model,
  ExtendedModel,
  modelAction,
} from 'mobx-keystone'

import { Portal } from '../Entity/PortalEntityModel'
import { TypeOfEntity } from '../Entity/Factory'

import { Map } from '~/Store/Map/MapModel'
import { Entity } from '~/Store/Entity/EntityModel'

export const ZONE_MODEL_KEY = 'Zone'

export enum ZoneTypes {
  Dungeon = 'dungeon',
  Town = 'town',
  Shop = 'shop',
  World = 'world',
}

@model(ZONE_MODEL_KEY)
export class Zone extends ExtendedModel(Entity, {
  map: prop<Map | undefined>(),
}) {

  get portals (): Portal[] | undefined {
    if (!this.map || !this.map.layers) return

    const objectLayer = this.map.layers
      .find(layer => layer.name === 'Entities')

    if(!objectLayer) return

    return objectLayer?.entities
      .filter(function (entity: TypeOfEntity) : entity is Portal {
        return entity instanceof Portal
      })

  }

  get isStart (): boolean {
    if (!this.portals || !this.portals.length) return false

    return this.portals
      .some((portal: Portal) => portal.name === 'PlayerStart')
  }

  @modelAction
  addMap (map: Map): void {
    this.map = map
  }
}
