import {
  prop,
  model,
  modelAction,
  Model,
} from 'mobx-keystone'

import { Logger } from '~/Core/Logger'

import { MapLayer } from './MapLayerModel'
import { GetLevelData } from './MapApi'
import { MapLayerFromLevelDataFactory } from './Factory'

const log = Logger(module.id)

export const MAP_MODEL_KEY = 'Map'

export interface IMapData extends Phaser.Tilemaps.MapData {
  layers: Phaser.Tilemaps.LayerData[]
}

@model(MAP_MODEL_KEY)
export class Map extends Model({
  key: prop<string>(),
  url: prop<string>(),
  tileset: prop<string>(),
  tileimage: prop<string>(),
  layers: prop<MapLayer[]>(() => [])
}) {
  onInit (): void {
    log('onInit')
    GetLevelData(this.url)
      .then((MapData) => {
        const {
          layers
        } = MapData
        layers.forEach(LayerData => {
          const layer = MapLayerFromLevelDataFactory(LayerData)
          this.addLayer(layer)
        }, {})
        log('created')
      })
  }

  @modelAction
  addLayer (layer: MapLayer): void {
    this.layers.push(layer)
  }

}
