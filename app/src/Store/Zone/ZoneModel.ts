import {
  prop,
  model,
  ExtendedModel,
} from 'mobx-keystone'

import { Map } from '~/Store/Map/MapModel'
import { Entity } from '~/Store/Entity/EntityModel'

export const ZONE_MODEL_KEY = 'Zone'

@model(ZONE_MODEL_KEY)
export class Zone extends ExtendedModel(Entity, {
  map: prop<Map>(),
}) {
    static Types = {
      Dungeon: 'dungeon',
      Town: 'town',
      Shop: 'shop',
      World: 'world',
    }
}
