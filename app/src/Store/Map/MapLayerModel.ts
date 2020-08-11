import {
  prop,
  model,
  modelAction,
  Model,
} from 'mobx-keystone'

import { TypeOfEntity } from '~/Store/Entity/Factory'

export const MAPLAYER_MODEL_KEY = 'MapLayer'

@model(MAPLAYER_MODEL_KEY)
export class MapLayer extends Model({
  name: prop<string>(),
  depth: prop<number | undefined>(),
  type: prop<string | undefined>(),
  entities: prop<TypeOfEntity[]>(() => [])
}){

  @modelAction
  addEntities (entities: TypeOfEntity[]) : void {
    this.entities = this.entities.concat(entities)
  }

  @modelAction
  addEntity (entity: TypeOfEntity) : void {
    this.entities.push(entity)
  }

}
