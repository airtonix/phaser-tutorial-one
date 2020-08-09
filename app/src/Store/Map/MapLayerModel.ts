import {
  prop,
  model,
  Model,
} from 'mobx-keystone'

import { Entity } from '~/Store/Entity/EntityModel'

export const MAPLAYER_MODEL_KEY = 'MapLayer'

@model(MAPLAYER_MODEL_KEY)
export class MapLayer extends Model({
  name: prop<string>(),
  depth: prop<number | undefined>(),
  entities: prop<Entity[]>(() => [])
}){
}
