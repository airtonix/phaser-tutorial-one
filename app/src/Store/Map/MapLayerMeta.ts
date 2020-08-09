import {
  prop,
  model,
  Model,
} from 'mobx-keystone'

export const MAPLAYERMETA_MODEL_KEY = 'MapLayerMeta'

@model(MAPLAYERMETA_MODEL_KEY)
export class MapLayerMeta extends Model({
  key: prop<string>(),
  value: prop<any>(),
}){
}
