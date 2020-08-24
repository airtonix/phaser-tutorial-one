import { Ref } from 'mobx-keystone'

import { ReducedAmbgiousObject } from '~/Core/framework'

import { Portal } from './PortalEntityModel'
import { Item } from './ItemEntityModel'
import { Entity } from './EntityModel'
import { Container } from './ContainerEntityModel'
import { PortalReference } from './PortalEntityReference'
import { ContainerReference } from './ContainerEntityReference'
import { ItemReference } from './ItemEntityReference'
import { EntityReference } from './EntityReference'


export type TypeOfEntity = Item | Portal | Container | Entity
export type TypeOfEntityReference = Ref<Item> | Ref<Portal> | Ref<Container> | Ref<Entity>
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
  const {
    type,
    properties,
    ...data
  } = entity

  const transformedEntityData = {
    ...data,
    ...propertyArrayToObject(properties)
  }

  switch (type) {
    case Item.type:
      return new Item(transformedEntityData)
    case Portal.type:
      return new Portal(transformedEntityData)
    case Container.type:
      return new Container(transformedEntityData)
    default:
      return new Entity(transformedEntityData)
  }
}

export function GetEntityTypeReference (entity: TypeOfEntity): TypeOfEntityReference {
  if (entity instanceof Portal) {
    return PortalReference(entity)
  }
  else if (entity instanceof Container) {
    return ContainerReference(entity)
  }
  else if (entity instanceof Item) {
    return ItemReference(entity)
  }
  else {
    return EntityReference(entity)
  }
}
