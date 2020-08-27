import {
  detach,
  rootRef,
} from 'mobx-keystone'

import { Container, CONTAINER_MODEL_KEY } from './ContainerEntityModel'

export const ContainerReference = rootRef<Container>(CONTAINER_MODEL_KEY, {
  onResolvedValueChange (ref, newContainer, oldContainer) {
    if (oldContainer && !newContainer) {
      detach(ref)
    }
  }
})
