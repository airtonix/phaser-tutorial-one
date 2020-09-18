import {
  prop,
  model,
  ExtendedModel,
  modelAction,
} from 'mobx-keystone'

import { PortalModel } from '../Entity/PortalEntityModel'
import { TypeOfEntity, WorldEntityModelMap, createWorldEntityModelInstance } from '../Entity/Factory'

import { Logger } from '~/Core/Logger'
import { GetLevelData } from '~/Store/Map/MapApi'
import { CreateMapModelFromLevelData } from '~/Store/Map/Factory'
import { ITiledTileMapConfig } from '~/Config/constants'
import { ItemModel } from '~/Store/Entity/ItemEntityModel'
import { ContainerModel } from '~/Store/Entity/ContainerEntityModel'
import { MapModel } from '~/Store/Map/MapModel'
import { EntityModel, TypeofWorldEntityModelInstance,  } from '~/Store/Entity/EntityModel'


const log = Logger('ZoneModel')

export const ZONE_MODEL_KEY = 'Zone'

export enum ZoneTypes {
  Dungeon = 'dungeon',
  Town = 'town',
  Shop = 'shop',
  World = 'world',
}

@model(ZONE_MODEL_KEY)
export class Zone extends ExtendedModel(EntityModel, {
  map: prop<MapModel | undefined>(),
  portals: prop<PortalModel[]>(() => []),
  items: prop<ItemModel[]>(() => []),
  containers: prop<ContainerModel[]>(() => []),
}) {

  get isStart (): boolean {
    if (!this.portals || !this.portals.length) return false

    return this.portals
      .some((portal: PortalModel) => portal.name === 'PlayerStart')
  }

  addMapFromLevelData (levelData: ITiledTileMapConfig): void {
    const {
      tileset,
      key,
      tileimage,
      url,
    } = levelData

    const map = new MapModel({
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
            .filter(entityData => entityData.type in WorldEntityModelMap)
            .forEach((entityData) => {
              const entity: TypeofWorldEntityModelInstance = createWorldEntityModelInstance(entityData)

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

  getPortalByName (portalName: string): PortalModel | undefined {
    return this.portals.find(zone => zone.name === portalName)
  }

  @modelAction
  addMap (map: MapModel): void {
    this.map = map
  }

  @modelAction
  addEntity (entity: TypeOfEntity): void {
    if (entity instanceof PortalModel) {
      entity.setZone(this)
      this.portals.push(entity)
    }
    else if (entity instanceof ContainerModel) {
      this.containers.push(entity)
    }
    else if (entity instanceof ItemModel) {
      this.items.push(entity)
    }
  }
}
