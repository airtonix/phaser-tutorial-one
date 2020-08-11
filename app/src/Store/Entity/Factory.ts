import { KeyValuePair, ReducedAmbgiousObject } from '~/Core/framework'

import { Portal } from './PortalEntityModel'
import { Item } from './ItemEntityModel'
import { Entity } from './EntityModel'
import { Container } from './ContainerEntityModel'


export type TypeOfEntity = Item | Portal | Container | Entity
export type maybeTypeOfEntity = TypeOfEntity | Phaser.Types.Tilemaps.ObjectLayerConfig | undefined

export interface ObjectLayerProperty {
  name: string
  value: any
  type: string
}

export function propertyArrayToObject (propertyArray: ObjectLayerProperty[] = []): ReducedAmbgiousObject {
  return propertyArray.reduce((result, item: ObjectLayerProperty) => {
    return { ...result, [item.name]: item.value }
  }, {})
}

export function EntityLevelDataFactory (entity: any): TypeOfEntity {
  const { type } = entity

  switch (type) {
    case Item.type:
      return new Item(entity)
      break;

    case Portal.type:
      const {
        properties,
        ...data
      } = entity
      return new Portal({
        ...data,
        ...propertyArrayToObject(properties)
      })
      break;

    case Container.type:
      return new Container(entity)
      break;

    default:
      return new Entity(entity)
  }
}