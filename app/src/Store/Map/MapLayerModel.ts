import {
  prop,
  model,
  modelAction,
  Model,
} from 'mobx-keystone'

import { TypeOfEntity, GetEntityTypeReference, TypeOfEntityReference} from '~/Store/Entity/Factory'

export const MAPLAYER_MODEL_KEY = 'MapLayer'

@model(MAPLAYER_MODEL_KEY)
export class MapLayer extends Model({
  name: prop<string>(),
  depth: prop<number | undefined>(),
  type: prop<string | undefined>(),
  entities: prop<TypeOfEntityReference[]>(() => [])
}){

  @modelAction
  addEntityReference (entity: TypeOfEntity): void {
    const reference = GetEntityTypeReference(entity)
    this.entities.push(reference)
  }
}
