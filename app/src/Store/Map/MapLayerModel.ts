import {
  prop,
  model,
  modelAction,
  Model,
} from 'mobx-keystone'

import { Entity } from '~/Store/Entity/EntityModel'

export const MAPLAYER_MODEL_KEY = 'MapLayer'

@model(MAPLAYER_MODEL_KEY)
export class MapLayer extends Model({
  name: prop<string>(),
  depth: prop<number | undefined>(),
  type: prop<string | undefined>(),
  entities: prop<Entity[]>(() => [])
}){

  @modelAction
  addEntities (entities: Entity[]) : void {
    this.entities = this.entities.concat(entities)
  }

  @modelAction
  addEntity (entity: Entity) : void {
    this.entities.push(entity)
  }
}
