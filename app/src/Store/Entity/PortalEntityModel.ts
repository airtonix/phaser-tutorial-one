import {
  prop,
  model,
  Ref,
  ExtendedModel,
} from 'mobx-keystone'

import { Entity } from './EntityModel'

export const PORTALENTITY_MODEL_KEY = 'PortalEntity'

@model(PORTALENTITY_MODEL_KEY)
export class Portal extends ExtendedModel(Entity, {
  /**
   * Name of the portal this portal sends the player to
   */
  toPortal: prop<string | undefined>(),

  /**
   * Name of the zone this portal sends the player to
   */
  toZone: prop<string | undefined>(),
}) {

  static type = 'Portal'

  getRefId (): string {
    return `${this.toZone}/${this.toPortal}`
  }

  get link () {
    return
  }
}
