import { Ref } from 'mobx-keystone'

import { ReducedAmbgiousObject } from '~/Core/framework'

import { PortalModel } from './PortalEntityModel'
import { ItemModel } from './ItemEntityModel'
import { EntityModel, TypeofWorldEntityModelInstance } from './EntityModel'
import { ContainerModel } from './ContainerEntityModel'
import { PortalReference } from './PortalEntityReference'
import { ContainerReference } from './ContainerEntityReference'
import { ItemReference } from './ItemEntityReference'
import { EntityReference } from './EntityReference'
import { NoAvailableEntityConstructorError } from './Exceptions'


export type TypeOfEntity = ItemModel | PortalModel | ContainerModel | EntityModel
export type TypeOfEntityReference = Ref<ItemModel> | Ref<PortalModel> | Ref<ContainerModel> | Ref<EntityModel>
export type maybeTypeOfEntity = TypeOfEntity | Phaser.Types.Tilemaps.ObjectLayerConfig | undefined

export interface ObjectLayerProperty {
  name: string
  value: string | number | boolean
  type: string
}

export const WorldEntityModelMap = {
  [ItemModel.type]: ItemModel,
  [PortalModel.type]: PortalModel,
  [ContainerModel.type]: ContainerModel,
}

export function propertyArrayToObject (propertyArray: ObjectLayerProperty[] = []): ReducedAmbgiousObject {
  return propertyArray.reduce((result, item: ObjectLayerProperty) => {
    return { ...result, [item.name]: item.value }
  }, {})
}

export function createWorldEntityModelInstance (entity: any): TypeofWorldEntityModelInstance {
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
  if (entity instanceof PortalModel) {
    return PortalReference(entity)
  }
  else if (entity instanceof ContainerModel) {
    return ContainerReference(entity)
  }
  else if (entity instanceof ItemModel) {
    return ItemReference(entity)
  }
  else {
    return EntityReference(entity)
  }
}
