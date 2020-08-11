import { EntityLevelDataFactory, TypeOfEntity } from '../Entity/Factory'

import { ReducedAmbgiousObject, KeyValuePair } from '~/Core/framework'

import { MapLayer } from './MapLayerModel'

export function MapLayerFromLevelDataFactory (levelLayerData: Phaser.Types.Tilemaps.ObjectLayerConfig): MapLayer {

  const properties = levelLayerData.properties
    .reduce((result: ReducedAmbgiousObject, { name, value }: KeyValuePair) => ({
      ...result,
      [name]: value
    }), {})

  const maplayer = new MapLayer({
    ...properties,
    name: levelLayerData.name,
  })

  if (levelLayerData.objects) {
    levelLayerData.objects
      .map(data => EntityLevelDataFactory(data))
      .forEach((entity: TypeOfEntity) => maplayer.addEntity(entity))
  }
  return maplayer
}
