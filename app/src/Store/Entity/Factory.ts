import { Ref } from 'mobx-keystone'

import { ReducedAmbgiousObject } from '~/Core/framework'

import { Portal } from './PortalEntityModel'
import { Item } from './ItemEntityModel'
import { Entity, WorldEntity } from './EntityModel'
import { Container } from './ContainerEntityModel'
import { PortalReference } from './PortalEntityReference'
import { ContainerReference } from './ContainerEntityReference'
import { ItemReference } from './ItemEntityReference'
import { EntityReference } from './EntityReference'


export type TypeOfEntity = InstanceType<typeof Entity>
export type TypeOfWorldEntity = InstanceType<typeof WorldEntity>
export type TypeOfEntityReference = Ref<Item | Portal | Container | Entity>
export type maybeTypeOfEntity = TypeOfEntity | Phaser.Types.Tilemaps.ObjectLayerConfig | undefined

export interface ObjectLayerProperty {
  name: string
  value: any
  type: string
}

export const WorldEntityModelMap = {
  [Item.type]: Item,
  [Portal.type]: Portal,
  [Container.type]: Container,
}

export function propertyArrayToObject (propertyArray: ObjectLayerProperty[] = []): ReducedAmbgiousObject {
  return propertyArray.reduce((result, item: ObjectLayerProperty) => {
    return { ...result, [item.name]: item.value }
  }, {})
}

export function createWorldEntityModelInstance (entity: any): TypeOfWorldEntity {
  const {
    type,
    properties,
    ...data
  } = entity

  const transformedEntityData = {
    ...data,
    ...propertyArrayToObject(properties)
  }
  const WorldEntityTypeModel = WorldEntityModelMap[type]
  return new WorldEntityTypeModel(transformedEntityData)
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
