import {
  detach,
  rootRef,
} from 'mobx-keystone'

import { EntityModel, ENTITY_MODEL_KEY } from './EntityModel'

export const EntityReference = rootRef<EntityModel>(ENTITY_MODEL_KEY, {
  onResolvedValueChange (ref, newEntity, oldEntity) {
    if (oldEntity && !newEntity) {
      detach(ref)
    }
  }
})
