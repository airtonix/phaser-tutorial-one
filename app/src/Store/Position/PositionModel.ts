import {
  prop,
  model,
  Model,
  Ref,
} from 'mobx-keystone'

import { Zone } from '../Zone/ZoneModel'

export const POSITION_MODEL_KEY = 'Position'

@model(POSITION_MODEL_KEY)
export class Position extends Model({
  /**
   * The kind of position, currently we only have one type.
   */
  type: prop<string>(),

  /**
   * The zone that this position describes
   */
  zone: prop<Ref<Zone> | undefined>(),

  /**
   * X co-ordinate
   */
  x: prop<number>(0),

  /**
   * Y co-ordinate
   */
  y: prop<number>(0)
}) {
}
