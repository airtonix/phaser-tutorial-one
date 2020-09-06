import {
  prop,
  model,
  modelAction,
  Model,
} from 'mobx-keystone'

import { Logger } from '~/Core/Logger'

import { MapLayer } from './MapLayerModel'

const log = Logger(module.id)

export const MAP_MODEL_KEY = 'Map'

export interface IMapData extends Phaser.Tilemaps.MapData {
  layers: Phaser.Tilemaps.LayerData[]
}

@model(MAP_MODEL_KEY)
export class MapModel extends Model({
  key: prop<string>(),
  tileset: prop<string>(),
  tileimage: prop<string>(),
  layers: prop<MapLayer[]>(() => [])
}) {
  onInit (): void {
    log('onInit')
  }

  @modelAction
  addLayer (layer: MapLayer): void {
    this.layers.push(layer)
  }

}
