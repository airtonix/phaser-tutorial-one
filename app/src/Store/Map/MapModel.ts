import {
  prop,
  model,
  modelAction,
  Model,
} from 'mobx-keystone'

import { Logger } from '~/Core/Logger'

import { MapLayer } from './MapLayerModel'
import { GetLevelData } from './MapApi'
import { MapLayerMeta } from './MapLayerMeta'

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
          const layer = this.createMapLayerFromLevelData(LayerData)
          this.addLayer(layer)
        }, {})
        log('created')
      })
  }

  createMapLayerFromLevelData (levelLayerData: Phaser.Tilemaps.LayerData): MapLayer {
    const properties = levelLayerData.properties
      .reduce((result, { name, value }: any) => ({
        ...result,
        [name]: value
      }), {})

    return new MapLayer({
      ...properties,
      name: levelLayerData.name,
    })
  }

  @modelAction
  addLayer (layer: MapLayer): void {
    this.layers.push(layer)
  }

}
