import {
  detach,
  rootRef,
} from 'mobx-keystone'

import { Item, ITEM_MODEL_KEY } from './ItemEntityModel'

export const ItemReference = rootRef<Item>(ITEM_MODEL_KEY, {
  onResolvedValueChange (ref, newItem, oldItem) {
    if (oldItem && !newItem) {
      detach(ref)
    }
  }
})
