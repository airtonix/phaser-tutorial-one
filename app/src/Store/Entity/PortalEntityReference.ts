import {
  detach,
  rootRef,
} from 'mobx-keystone'

import { Portal, PORTALENTITY_MODEL_KEY } from './PortalEntityModel'

export const PortalReference = rootRef<Portal>(PORTALENTITY_MODEL_KEY, {
  onResolvedValueChange (ref, newPortal, oldPortal) {
    if (oldPortal && !newPortal) {
      detach(ref)
    }
  }
})
