import {
  detach,
  rootRef,
} from 'mobx-keystone'

import { ContainerModel, CONTAINER_MODEL_KEY } from './ContainerEntityModel'

export const ContainerReference = rootRef<ContainerModel>(CONTAINER_MODEL_KEY, {
  onResolvedValueChange (ref, newContainer, oldContainer) {
    if (oldContainer && !newContainer) {
      detach(ref)
    }
  }
})
