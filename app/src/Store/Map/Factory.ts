
import { KeyValuePair, ReducedAmbgiousObject } from '~/Core/framework'

import { MapLayer } from './MapLayerModel'

export function CreateMapModelFromLevelData (levelLayerData: Phaser.Types.Tilemaps.ObjectLayerConfig): MapLayer {
  const properties = levelLayerData.properties
    .reduce((result: ReducedAmbgiousObject, { name, value }: KeyValuePair) => ({
      ...result,
      [name]: value
    }), {})

  const maplayer = new MapLayer({
    ...properties,
    name: levelLayerData.name,
  })

  return maplayer
}
