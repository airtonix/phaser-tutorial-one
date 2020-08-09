import {
  detach,
  rootRef,
} from 'mobx-keystone'

import { ZONE_MODEL_KEY, Zone } from './ZoneModel'

export const ZoneReference = rootRef<Zone>(ZONE_MODEL_KEY, {
  onResolvedValueChange (ref, newTodo, oldTodo) {
    if (oldTodo && !newTodo) {
      detach(ref)
    }
  },
})