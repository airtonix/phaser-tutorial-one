import {
  prop,
  model,
  ExtendedModel,
  modelAction,
} from 'mobx-keystone'

import { Portal } from '../Entity/PortalEntityModel'
import { TypeOfEntity, EntityLevelDataFactory } from '../Entity/Factory'
import { GetLevelData } from '../Map/MapApi'
import { CreateMapModelFromLevelData } from '../Map/Factory'
import { Item } from '../Entity/ItemEntityModel'
import { Container } from '../Entity/ContainerEntityModel'

import { Logger } from '~/Core/Logger'
import { Map } from '~/Store/Map/MapModel'
import { Entity } from '~/Store/Entity/EntityModel'
import { ITiledTileMapConfig } from '~/Config/constants'


const log = Logger('ZoneModel')

export const ZONE_MODEL_KEY = 'Zone'

export enum ZoneTypes {
  Dungeon = 'dungeon',
  Town = 'town',
  Shop = 'shop',
  World = 'world',
}

@model(ZONE_MODEL_KEY)
export class Zone extends ExtendedModel(Entity, {
  map: prop<Map | undefined>(),
  portals: prop<Portal[]>(() => []),
  items: prop<Item[]>(() => []),
  containers: prop<Container[]>(() => []),
}) {

  get isStart (): boolean {
    if (!this.portals || !this.portals.length) return false

    return this.portals
      .some((portal: Portal) => portal.name === 'PlayerStart')
  }

  addMapFromLevelData (levelData: ITiledTileMapConfig): void {
    const {
      tileset,
      key,
      tileimage,
      url,
    } = levelData

    const map = new Map({
      tileimage,
      tileset,
      key,
    })

    GetLevelData(url)
      .then((MapData) => {
        const {
          layers
        } = MapData

        layers.forEach((layerData: Phaser.Types.Tilemaps.ObjectLayerConfig) => {
          const {
            objects = [],
            ...data
          } = layerData
          log('CreateMapModelFromLevelData.data', data)
          log('CreateMapModelFromLevelData.object', objects)

          const layer = CreateMapModelFromLevelData(data)

          objects
            .forEach((entityData) => {
              const entity: TypeOfEntity = EntityLevelDataFactory(entityData)

              if (layer.depth) {
                entity.setDepth(layer.depth)
              }

              // add the entity to the zone
              this.addEntity(entity)

              // add reference to the entity to its layer
              layer.addEntityReference(entity)
            })

          map.addLayer(layer)
        }, {})

        this.addMap(map)
      })
  }

  @modelAction
  addMap (map: Map): void {
    this.map = map
  }

  @modelAction
  addEntity (entity: TypeOfEntity): void {
    if (entity instanceof Portal) {
      entity.setZone(this)
      this.portals.push(entity)
    }
    else if (entity instanceof Container) {
      this.containers.push(entity)
    }
    else if (entity instanceof Item) {
      this.items.push(entity)
    }
  }
}
