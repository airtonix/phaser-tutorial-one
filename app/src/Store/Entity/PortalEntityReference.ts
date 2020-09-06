import {
  detach,
  rootRef,
} from 'mobx-keystone'

import { PortalModel, PORTALENTITY_MODEL_KEY } from './PortalEntityModel'

export const PortalReference = rootRef<PortalModel>(PORTALENTITY_MODEL_KEY, {
  onResolvedValueChange (ref, newPortal, oldPortal) {
    if (oldPortal && !newPortal) {
      detach(ref)
    }
  }
})
