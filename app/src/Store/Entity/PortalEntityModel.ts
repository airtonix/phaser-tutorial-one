import {
  prop,
  model,
  Ref,
  ExtendedModel,
  modelAction,
  findParent,
} from 'mobx-keystone'
import { computed } from 'mobx'

import { Zone } from '~/Store/Zone/ZoneModel'
import { ZoneReference } from '~/Store/Zone/ZoneReference'
import { Game } from '~/Store/Game/GameModel'
import { PortalWorldEntity } from '~/Objects/PortalWorldEntity'

import { PortalReference } from './PortalEntityReference'
import { WorldEntity } from './EntityModel'

export const PORTALENTITY_MODEL_KEY = 'PortalEntity'

@model(PORTALENTITY_MODEL_KEY)
export class Portal extends ExtendedModel(WorldEntity, {
  zone: prop<Ref<Zone>>(),

  /**
   * Name of the portal this portal sends the player to
   */
  toPortal: prop<string | undefined>(),

  /**
   * Name of the zone this portal sends the player to
   */
  toZone: prop<string | undefined>(),

  /**
   * Which portal does this portal link to?
   */
  linksTo: prop<Ref<Portal> | undefined>()
}) {

  static type = 'Portal'

  static GameObjectClass = PortalWorldEntity

  @modelAction
  setZone (zone: Zone): void {
    this.zone = ZoneReference(zone)
  }

  @modelAction
  setLinksTo (portal: Portal): void {
    this.linksTo = PortalReference(portal)
  }

  get fromZone (): Zone | undefined {
    return this.zone?.current
      ? this.zone.current
      : undefined
  }

  getRootStore (): Game | undefined {
    return findParent<Game>(this, parentNode => parentNode instanceof Game)
  }

  getTargetZone (): Zone | undefined {
    const gameStore = this.getRootStore()
    if (!gameStore) return

    const zone = gameStore.zones
      .find(zone => zone.name == this.toZone)

    return zone
  }

  getTargetPortal (): Portal | undefined {
    const zone = this.getTargetZone()
    if (!zone) return

    const portal = zone.portals.find(portal =>
      portal.name == this.toPortal
    )
    return portal
  }

  /**
   * Return a reference of the portal that this portal linkes to
   *
   * @return  {Portal}  Portal Model
   */
  @computed
  get target (): Portal | undefined {
    return this.getTargetPortal()
  }

  createGameObject (scene: Phaser.Scene): PortalWorldEntity {
    const gameobject = new PortalWorldEntity(
      scene,
      this.x, this.y, this.width, this.height
    )
    gameobject.setDepth(this.depth)
    gameobject.model = this
    return gameobject
  }

}
