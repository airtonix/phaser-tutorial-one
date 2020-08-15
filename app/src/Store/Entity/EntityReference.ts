import {
  detach,
  rootRef,
} from 'mobx-keystone'

import { Entity, ENTITY_MODEL_KEY } from './EntityModel'

export const EntityReference = rootRef<Entity>(ENTITY_MODEL_KEY, {
  onResolvedValueChange (ref, newEntity, oldEntity) {
    if (oldEntity && !newEntity) {
      detach(ref)
    }
  }
})
